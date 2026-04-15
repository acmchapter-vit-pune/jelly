/**
 * app/api/admin/allowed-leaders/route.js
 *
 * GET    ?secret=  — list all allowed emails
 * POST   ?secret=  — add emails { emails: ['a@b.com', ...] }
 * DELETE ?secret=  — remove one email { email: 'a@b.com' }
 */
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import AllowedLeader from '@/models/AllowedLeader';

const guard = (req) => {
    const { searchParams } = new URL(req.url);
    return searchParams.get('secret') !== process.env.ADMIN_SECRET;
};

export async function GET(request) {
    if (guard(request)) return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    await connectMongoDB();
    const list = await AllowedLeader.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: list });
}

export async function POST(request) {
    if (guard(request)) return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    const { emails } = await request.json();
    if (!Array.isArray(emails) || emails.length === 0)
        return NextResponse.json({ success: false, error: 'Provide a non-empty emails array.' }, { status: 400 });

    await connectMongoDB();
    const ops = emails
        .map(e => e.trim().toLowerCase())
        .filter(Boolean)
        .map(email => ({
            updateOne: {
                filter: { email },
                update: { $setOnInsert: { email } },
                upsert: true,
            },
        }));

    const result = await AllowedLeader.bulkWrite(ops);
    return NextResponse.json({ success: true, inserted: result.upsertedCount, total: ops.length });
}

export async function DELETE(request) {
    if (guard(request)) return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    const { email } = await request.json();
    if (!email) return NextResponse.json({ success: false, error: 'Email required.' }, { status: 400 });
    await connectMongoDB();
    await AllowedLeader.deleteOne({ email: email.trim().toLowerCase() });
    return NextResponse.json({ success: true });
}
