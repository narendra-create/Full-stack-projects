import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/dbconnect";
import Payment from "@/app/Models/Payment";

export async function POST(req) {
    console.log("you are at webhook top now!")
    try {
        // Get raw request body for signature verification
        // const rawBody = await req.text();                               //this is neccesory part
        console.log("this is body", rawBody)
        // const signature = req.headers.get("x-webhook-signature");
        // console.log("and this is signature", signature)
        console.log("skipping signature to test mongo")
        // Verify Cashfree signature
        // const computedSignature = crypto
        //     .createHmac("sha256", process.env.CASHFREE_SECRET_KEY)
        //     .update(rawBody)
        //     .digest("base64");


        // if (computedSignature !== signature) {
        //     return new NextResponse("Invalid signature", { status: 400 });
        // }

        // Parse the body AFTER verification

        // const body = JSON.parse(rawBody);                              //this is neccasory part to use webhook
        console.log("Webhook type:", body.type)

        if (body.type === "PAYMENT_SUCCESS_WEBHOOK") {
            await dbConnect();

            const exists = await Payment.findOne({ oid: body.data.order?.order_id });
            if (exists) {
                console.log("now we are inside if statement of updating db", exists)
                exists.done = true;
                exists.method = body.data.payment_method;
                exists.updatedAt = new Date();
                exists.payment_id = body.data.payment_id;
                await exists.save();
            } else {
                console.log('inside the else statement to create new doc in db')
                await Payment.create({
                    name: body.data.customer_details?.customer_email,
                    to_user: body.data.customer_details?.customer_id,
                    oid: body.data.order_id,
                    amount: body.data.payment?.payment_amount || body.data.order?.order_amount || 0,
                    method: body.data.payment_method,
                    payment_id: body.data.payment_id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    done: true,
                });
            }
        }
        else if (
            body.type === "PAYMENT_FAILED_WEBHOOK" ||
            body.type === "PAYMENT_USER_DROPPED" ||
            body.type === "PAYMENT_CANCELLED_WEBHOOK"
        ) {
            await dbConnect();

            const exists = await Payment.findOne({ oid: body.data.order_id });
            if (exists) {
                exists.done = false;
                exists.updatedAt = new Date();
                await exists.save();
            } else {
                await Payment.create({
                    name: body.data.customer_details.customer_email,
                    to_user: body.data.customer_details.customer_id,
                    oid: body.data.order_id,
                    amount: body.data.order_amount,
                    method: body.data.payment_method || "N/A",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    done: false,
                });
            }
        }


        return NextResponse.json({ success: true });
    } catch (err) {
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 500 });
    }
}
