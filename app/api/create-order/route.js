import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbconnect";
import Payment from "@/app/Models/Payment";
import User from "@/app/Models/User";

export async function POST(req) {
    try {
        // Check if required environment variables are set
        if (!process.env.CASHFREE_APP_ID || !process.env.CASHFREE_SECRET_KEY) {
            throw new Error("Cashfree credentials not configured. Please set CASHFREE_APP_ID and CASHFREE_SECRET_KEY environment variables.");
        }

        if (!process.env.NEXT_PUBLIC_URL) {
            throw new Error("NEXT_PUBLIC_URL environment variable is not set.");
        }

        const { amount, name, creatorid, customerId, customerEmail, customerPhone, message, userCashfreeId, userCashfreeSecret } = await req.json();

        // Validate required fields
        if (!amount || !customerId || !customerEmail || !customerPhone || !message || !userCashfreeId || !userCashfreeSecret || !creatorid) {
            throw new Error("Missing required fields: amount, message, name");
        }

        const orderId = "order_" + Date.now(); // unique order id

        console.log("Creating order with ID:", orderId);

        const response = await fetch("https://sandbox.cashfree.com/pg/orders", {
            method: "POST",
            headers: {
                "x-client-id": userCashfreeId,
                "x-client-secret": userCashfreeSecret,
                "x-api-version": "2022-09-01",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order_id: orderId,
                order_amount: amount,
                order_currency: "INR",
                order_note: `Coffee for ${customerId}`,
                customer_details: {
                    customer_id: customerId,
                    customer_email: customerEmail,
                    customer_phone: customerPhone,
                },
                order_meta: {
                    // notify_url: `${process.env.NEXT_PUBLIC_URL}/api/webhook`,      ----use this when using webhook to verify payment
                    return_url: `${process.env.NEXT_PUBLIC_URL}/payment-local?order_id={order_id}`,
                    business_name: `${customerId}'s Page`,
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Cashfree API error:", data);
            throw new Error(data.message || `Cashfree API error: ${response.status}`);
        }

        console.log("Order created successfully:", orderId);
        console.log("this is creator id from createorder", creatorid)

        await dbConnect();
        await Payment.create({
            creator_id: creatorid,
            name: name,
            to_user: customerId,
            oid: orderId,
            amount: amount,
            done: false,
            message: message,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // return only what frontend needs
        return NextResponse.json({
            orderId,
            payment_session_id: data.payment_session_id,
        });

    } catch (err) {
        console.error("Create order error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}