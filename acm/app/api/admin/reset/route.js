/**
 * app/api/admin/reset/route.js
 *
 * DELETE /api/admin/reset?secret=<ADMIN_SECRET>&target=all|selections|leaders|redis
 *
 * target=all        — clears everything (default)
 * target=selections — clears only PS selections + Redis PS counts
 * target=leaders    — clears only registered leaders + Redis sessions
 * target=redis      — clears only Redis keys
 */
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Selection from '@/models/Selection';
import Leader from '@/models/Leader';
import AllowedLeader from '@/models/AllowedLeader';
import redis from '@/lib/redis';
import { PROBLEM_STATEMENTS } from '@/lib/psData';

async function clearSelections() {
    await connectMongoDB();
    const result = await Selection.deleteMany({});

    // Reset all PS slot counters in Redis
    const keys = PROBLEM_STATEMENTS.map(ps => `ps:${ps.id}:count`);
    if (keys.length) await Promise.all(keys.map(k => redis.del(k)));

    return { selections: result.deletedCount, redisCounters: keys.length };
}

async function clearLeaders() {
    await connectMongoDB();
    const result = await Leader.deleteMany({});

    // Clear all session keys
    const sessionKeys = await redis.keys('session:*');
    const userKeys    = await redis.keys('user:*');
    const allKeys     = [...sessionKeys, ...userKeys];
    if (allKeys.length) await redis.del(...allKeys);

    return { leaders: result.deletedCount, redisSessions: allKeys.length };
}

async function clearRedis() {
    const patterns = ['ps:*:count', 'user:*', 'session:*'];
    let total = 0;
    for (const p of patterns) {
        const keys = await redis.keys(p);
        if (keys.length) { await redis.del(...keys); total += keys.length; }
    }
    return { redisKeys: total };
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);

    if (searchParams.get('secret') !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const target = searchParams.get('target') || 'all';

    try {
        let result = {};

        if (target === 'all' || target === 'selections') {
            result.selections = await clearSelections();
        }
        if (target === 'all' || target === 'leaders') {
            result.leaders = await clearLeaders();
        }
        if (target === 'redis') {
            result.redis = await clearRedis();
        }

        return NextResponse.json({ success: true, cleared: target, result });
    } catch (err) {
        console.error('[admin/reset]', err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
