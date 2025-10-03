import dbConnect from "@/lib/dbconnect";
import Payment from "@/app/Models/Payment";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const creator = searchParams.get("creator_id");


    if (!creator) {
        return new Response(JSON.stringify({ error: "creator id required" }), { status: 400 });
    }

    await dbConnect();
    const payments = await Payment.find({ creator_id: creator }).sort({ amount: -1 }).lean();


    return new Response(JSON.stringify(payments), { status: 200 });
}
