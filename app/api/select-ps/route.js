/**
 * app/api/select-ps/route.js — Atomic PS slot allocation
 *
 * POST /api/select-ps
 * Body: { psId }
 *
 * Auth: Reads HTTP-only session cookie (sid) → validates against Redis.
 * No email/password in request body — cookie is sent automatically.
 *
 * Concurrency safety:
 *   1. Cookie → session validation → email lookup from Redis
 *   2. MongoDB: already selected? (idempotency)
 *   3. Redis INCR — atomic, prevents > MAX_TEAMS_PER_PS
 *   4. MongoDB save — duplicate key (11000) rolls back Redis
 *   5. Socket.IO broadcast
 */
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Selection from '@/models/Selection';
import redis from '@/lib/redis';
import { PROBLEM_STATEMENTS, MAX_TEAMS_PER_PS } from '@/lib/psData';

const COOKIE_NAME = 'sid';

export async function POST(request) {
    try {
        // ── Validate session cookie ────────────────────────────────────────
        const sid = request.cookies.get(COOKIE_NAME)?.value;
        if (!sid) {
            return NextResponse.json(
                { success: false, error: 'session_missing', message: 'Please login to select a PS.' },
                { status: 401 }
            );
        }

        const email = await redis.get(`session:${sid}`);
        if (!email) {
            return NextResponse.json(
                { success: false, error: 'session_expired', message: 'Your session has expired. Please login again.' },
                { status: 401 }
            );
        }

        // Confirm this is still the active session (not replaced by another login)
        const activeSid = await redis.get(`user:${email}`);
        if (activeSid !== sid) {
            return NextResponse.json(
                { success: false, error: 'session_replaced', message: 'You were logged in from another device. Please login again.' },
                { status: 401 }
            );
        }

        // ── Validate PS ID ─────────────────────────────────────────────────
        const { psId } = await request.json();
        if (!psId?.trim()) {
            return NextResponse.json(
                { success: false, error: 'PS ID is required.' },
                { status: 400 }
            );
        }

        const validPS = PROBLEM_STATEMENTS.find(p => p.id === psId.trim());
        if (!validPS) {
            return NextResponse.json(
                { success: false, error: 'Invalid problem statement ID.' },
                { status: 400 }
            );
        }

        // ── MongoDB: idempotency check ─────────────────────────────────────
        await connectMongoDB();
        const existing = await Selection.findOne({ email }).lean();
        if (existing) {
            if (existing.psId === psId) {
                return NextResponse.json({
                    success: false,
                    error: 'already_selected_same',
                    message: 'Your team has already locked this problem statement.',
                }, { status: 409 });
            }
            return NextResponse.json({
                success: false,
                error: 'already_selected_other',
                message: `Your team has already locked ${existing.psId}. Selections are final.`,
                lockedPsId: existing.psId,
            }, { status: 409 });
        }

        // ── Redis INCR — atomic slot allocation ────────────────────────────
        const redisKey = `ps:${psId}:count`;
        const count    = await redis.incr(redisKey);

        if (count > MAX_TEAMS_PER_PS) {
            await redis.decr(redisKey);
            return NextResponse.json({
                success: false,
                error: 'ps_full',
                message: 'This PS just filled up. Please choose another.',
            }, { status: 429 });
        }

        // ── MongoDB save ───────────────────────────────────────────────────
        try {
            await Selection.create({ email, psId: psId.trim() });
        } catch (mongoErr) {
            if (mongoErr.code === 11000) {
                await redis.decr(redisKey);
                return NextResponse.json({
                    success: false,
                    error: 'already_selected_other',
                    message: 'Your team has already locked a PS.',
                }, { status: 409 });
            }
            await redis.decr(redisKey);
            throw mongoErr;
        }

        // ── Socket.IO broadcast ────────────────────────────────────────────
        const remaining = MAX_TEAMS_PER_PS - count;
        const io = global._io;
        if (io) {
            io.emit('ps-update', { psId, remaining, count });
            if (count >= MAX_TEAMS_PER_PS) io.emit('ps-closed', { psId });
        }

        return NextResponse.json({
            success: true,
            message: `Successfully locked "${validPS.title}".`,
            psId,
            remaining,
        });

    } catch (error) {
        console.error('[select-ps] Error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
    }
}
