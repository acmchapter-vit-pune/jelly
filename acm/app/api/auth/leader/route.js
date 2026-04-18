/**
 * app/api/auth/leader/route.js
 *
 * POST   /api/auth/leader  — login  (validate MongoDB credentials, create session)
 * GET    /api/auth/leader  — validate current session from cookie
 * DELETE /api/auth/leader  — logout (clear session + cookie)
 *
 * Redis keys:
 *   user:{email}       = sessionId  (TTL 24hr) — newest session per email
 *   session:{sid}      = email      (TTL 24hr) — reverse lookup
 *
 * New login from any device OVERWRITES user:{email}, invalidating old sessions.
 */
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Leader from '@/models/Leader';
import redis from '@/lib/redis';

const SESSION_TTL = 86400;
const COOKIE_NAME = 'sid';

const cookieOpts = {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   SESSION_TTL,
    path:     '/',
};

// ── POST — login ──────────────────────────────────────────────────────────────
export async function POST(request) {
    try {
        const { email, password } = await request.json();

        if (!email?.trim() || !password?.trim()) {
            return NextResponse.json(
                { valid: false, error: 'Email and password are required.' },
                { status: 400 }
            );
        }

        const normalEmail = email.trim().toLowerCase();

        // Validate against MongoDB
        await connectMongoDB();
        const leader = await Leader.findOne({ email: normalEmail }).lean();
        if (!leader) {
            return NextResponse.json(
                { valid: false, error: 'Email not registered. Please register first.' },
                { status: 401 }
            );
        }
        if (leader.password !== password.trim()) {
            return NextResponse.json(
                { valid: false, error: 'Incorrect password.' },
                { status: 401 }
            );
        }

        // Generate new session ID
        const sessionId = crypto.randomUUID();

        // Invalidate any previous session for this email
        const prevSid = await redis.get(`user:${normalEmail}`);
        if (prevSid) {
            await redis.pipeline()
                .del(`session:${prevSid}`)
                .del(`session:${prevSid}:name`)
                .exec();
        }

        // Store new session (both directions) + teamName cache — all in one round-trip
        await redis.pipeline()
            .set(`user:${normalEmail}`,         sessionId,          { ex: SESSION_TTL })
            .set(`session:${sessionId}`,        normalEmail,        { ex: SESSION_TTL })
            .set(`session:${sessionId}:name`,   leader.teamName,    { ex: SESSION_TTL })
            .exec();

        const response = NextResponse.json({
            valid:    true,
            email:    normalEmail,
            teamName: leader.teamName,
        });
        response.cookies.set(COOKIE_NAME, sessionId, cookieOpts);
        return response;


    } catch (err) {
        console.error('[auth/leader POST]', err);
        return NextResponse.json({ valid: false, error: 'Server error.' }, { status: 500 });
    }
}

// ── GET — validate session ────────────────────────────────────────────────────
export async function GET(request) {
    try {
        const sid = request.cookies.get(COOKIE_NAME)?.value;
        if (!sid) return NextResponse.json({ valid: false }, { status: 401 });

        // Pipeline both Redis lookups in one round-trip (~80ms instead of ~160ms)
        const [email, teamName] = await redis.pipeline()
            .get(`session:${sid}`)
            .get(`session:${sid}:name`)
            .exec();

        if (!email) return NextResponse.json({ valid: false }, { status: 401 });

        // Confirm this is still the active session (not replaced by another login)
        const activeSid = await redis.get(`user:${email}`);
        if (activeSid !== sid) {
            return NextResponse.json(
                { valid: false, error: 'session_replaced', message: 'You were logged in from another device.' },
                { status: 401 }
            );
        }

        // teamName served from Redis cache (set at login). Only falls back to
        // MongoDB if the cache key is missing (e.g. first login after deploy).
        let resolvedName = teamName || '';
        if (!resolvedName) {
            await connectMongoDB();
            const leader = await Leader.findOne({ email }).select('teamName').lean();
            resolvedName = leader?.teamName || '';
        }

        return NextResponse.json({ valid: true, email, teamName: resolvedName });
    } catch (err) {
        console.error('[auth/leader GET]', err);
        return NextResponse.json({ valid: false }, { status: 500 });
    }
}


// ── DELETE — logout ───────────────────────────────────────────────────────────
export async function DELETE(request) {
    try {
        const sid = request.cookies.get(COOKIE_NAME)?.value;
        if (sid) {
            const email = await redis.get(`session:${sid}`);
            if (email) {
                await redis.del(`user:${email}`);
                await redis.del(`session:${sid}`);
            }
        }
        const response = NextResponse.json({ success: true });
        response.cookies.set(COOKIE_NAME, '', { ...cookieOpts, maxAge: 0 });
        return response;
    } catch (err) {
        console.error('[auth/leader DELETE]', err);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
