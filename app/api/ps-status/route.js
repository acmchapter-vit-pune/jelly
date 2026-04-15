/**
 * app/api/ps-status/route.js — Current PS slot counts
 *
 * GET /api/ps-status?email=<leaderEmail>  (optional)
 *
 * Returns all PS enriched with live slot data from Upstash Redis.
 * If email is provided, also returns that leader's existing selection
 * (used by psRevealPage to restore state after a refresh — future use).
 *
 * NOTE on @upstash/redis pipeline:
 *   pipeline.exec() returns values directly as an array: [val1, val2, ...]
 *   This differs from ioredis which returns [[err, val], [err, val], ...]
 *
 * On server restart: Redis counters may be zero/missing.
 * This endpoint re-hydrates Redis from MongoDB if all keys are null.
 */
import { NextResponse } from 'next/server';
import redis from '@/lib/redis';
import connectMongoDB from '@/lib/mongodb';
import Selection from '@/models/Selection';
import { PROBLEM_STATEMENTS, MAX_TEAMS_PER_PS } from '@/lib/psData';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get('email');

        // ── Fetch all slot counts in one pipeline round-trip ───────────────
        const pipeline = redis.pipeline();
        for (const ps of PROBLEM_STATEMENTS) {
            pipeline.get(`ps:${ps.id}:count`);
        }
        const redisValues = await pipeline.exec(); // [val0, val1, ...] (null if key missing)

        // ── Server-restart recovery: re-hydrate Redis from MongoDB ─────────
        const allNull = redisValues.every((v) => v === null);
        if (allNull) {
            await connectMongoDB();
            const selections = await Selection.aggregate([
                { $group: { _id: '$psId', count: { $sum: 1 } } },
            ]);
            if (selections.length > 0) {
                const rehydrate = redis.pipeline();
                for (const s of selections) {
                    rehydrate.set(`ps:${s._id}:count`, s.count);
                }
                await rehydrate.exec();
                console.log('[ps-status] Redis re-hydrated from MongoDB.');
                // Re-fetch after re-hydration
                const refetch = redis.pipeline();
                for (const ps of PROBLEM_STATEMENTS) {
                    refetch.get(`ps:${ps.id}:count`);
                }
                const refetched = await refetch.exec();
                refetched.forEach((v, i) => { redisValues[i] = v; });
            }
        }

        // ── Build enriched PS status array ─────────────────────────────────
        const psStatus = PROBLEM_STATEMENTS.map((ps, i) => {
            const count = parseInt(redisValues[i] ?? '0', 10);
            return {
                ...ps,
                count,
                remaining: Math.max(0, MAX_TEAMS_PER_PS - count),
                isClosed: count >= MAX_TEAMS_PER_PS,
            };
        });

        // ── Check if this email already made a selection (optional) ────────
        let teamSelection = null;
        if (email) {
            await connectMongoDB();
            const sel = await Selection.findOne({ email: email.trim().toLowerCase() }).lean();
            if (sel) teamSelection = sel.psId;
        }

        return NextResponse.json({
            success: true,
            data: psStatus,
            teamSelection,
            maxTeams: MAX_TEAMS_PER_PS,
        });
    } catch (error) {
        console.error('[ps-status] Error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error.' },
            { status: 500 }
        );
    }
}
