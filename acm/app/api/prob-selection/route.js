// // app/api/submit/route.js
// import { NextResponse } from 'next/server';
//
// export async function POST(request) {
//     try {
//         // 1. Parse the incoming JSON body
//         const body = await request.json();
//         const { name, email, message } = body;
//
//         // 2. Perform Backend Logic (e.g., Database save)
//         console.log("Received data:", { name, email, message });
//
//         // 3. Return a JSON response
//         return NextResponse.json({
//             success: true,
//             message: "Form submitted successfully!"
//         }, { status: 200 });
//
//     } catch (error) {
//         return NextResponse.json({
//             success: false,
//             error: "Failed to process request"
//         }, { status: 500 });
//     }
// }
