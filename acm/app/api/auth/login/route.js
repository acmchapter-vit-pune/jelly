// import { NextResponse } from 'next/server';
// import connectDB from '@/lib/db'; // Your DB config
// import User from '@/lib/models/User'; // Your Mongoose model
//
// export async function POST(req) {
//     await connectDB();
//     const { email, password } = await req.json();
//
//     // Controller logic here
//     const user = await User.findOne({ email });
//
//     return NextResponse.json({ message: "Success", user }, { status: 200 });
// }
