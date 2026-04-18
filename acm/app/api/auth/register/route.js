/**
 * app/api/auth/register/route.js
 * Validates email against AllowedLeader collection in MongoDB.
 */
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Leader from '@/models/Leader';
import AllowedLeader from '@/models/AllowedLeader';

export async function POST(request) {
    try {
        const { teamName, email, password, confirmPassword } = await request.json();

        if (!teamName?.trim() || !email?.trim() || !password?.trim() || !confirmPassword?.trim())
            return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 });

        if (password.trim() !== confirmPassword.trim())
            return NextResponse.json({ success: false, error: 'Passwords do not match.' }, { status: 400 });

        if (password.trim().length < 6)
            return NextResponse.json({ success: false, error: 'Password must be at least 6 characters.' }, { status: 400 });

        const normalEmail = email.trim().toLowerCase();

        await connectMongoDB();

        // ── Whitelist check (from MongoDB) ─────────────────────────────────
        const allowed = await AllowedLeader.findOne({ email: normalEmail }).lean();
        if (!allowed)
            return NextResponse.json(
                { success: false, error: 'This email is not registered for this event.' },
                { status: 403 }
            );

        // ── Already registered? ────────────────────────────────────────────
        const existing = await Leader.findOne({ email: normalEmail }).lean();
        if (existing)
            return NextResponse.json(
                { success: false, error: 'This email is already registered. Please login.' },
                { status: 409 }
            );

        await Leader.create({ teamName: teamName.trim(), email: normalEmail, password: password.trim() });

        return NextResponse.json({ success: true, message: 'Registration successful! Please login.' });
    } catch (err) {
        console.error('[auth/register]', err);
        return NextResponse.json({ success: false, error: 'Server error.' }, { status: 500 });
    }
}
