/**
 * app/api/admin/selections/route.js
 *
 * GET  /api/admin/selections?secret=<ADMIN_SECRET>  — list all selections
 * DELETE /api/admin/reset?secret=<ADMIN_SECRET>     — wipe all (see reset/route.js)
 */
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Selection from '@/models/Selection';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    if (searchParams.get('secret') !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectMongoDB();
    const all = await Selection.find({}).lean();

    return NextResponse.json({
        count: all.length,
        selections: all,
    });
}
