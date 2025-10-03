//use this page for webhook status not for localhost but for https site


// import dbConnect from "@/lib/dbconnect";
// import Payment from "@/app/Models/Payment";
// import { NextResponse } from "next/server";
// import mongoose, { Schema, models, model } from "mongoose";

// export async function GET(req) {
//     console.log("payment status page top")
//     await dbConnect();

//     const { searchParams } = new URL(req.url);
//     const orderId = searchParams.get("order_id");
//     console.log(`searchparams ${orderId}`)

//     if (!orderId) {
//         return NextResponse.json({ success: false, message: "Missing order_id" });
//     }

//     // Only fetch the "done" field
//     const payment = await Payment.findOne({ oid: orderId }, { done: 1, _id: 0 }).lean();

//     if (!payment) {
//         return NextResponse.json({ success: false, done: false });
//     }

//     return NextResponse.json({ success: true, done: payment.done });
// }

