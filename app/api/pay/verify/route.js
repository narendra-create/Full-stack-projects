import { NextResponse } from "next/server";
import tunedata from "@/app/Helping-pages/dbtuner";

export async function POST(req) {
  try {
    const { orderId } = await req.json();

    // Cashfree sandbox/live credentials
    const clientId = process.env.CASHFREE_APP_ID;
    const clientSecret = process.env.CASHFREE_SECRET_KEY;
    const baseUrl = "https://sandbox.cashfree.com/pg/orders";
    // use "https://api.cashfree.com/pg/orders" for production

    const res = await fetch(`${baseUrl}/${orderId}`, {
      method: "GET",
      headers: {
        "x-client-id": clientId,
        "x-client-secret": clientSecret,
        "x-api-version": "2022-09-01",
      },
    });

    const data = await res.json();

    await tunedata(orderId, data.order_status);

    return NextResponse.json({ status: data.order_status, data });
  } catch (err) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
