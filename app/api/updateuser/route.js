import dbConnect from "@/lib/dbconnect";
import User from "@/app/Models/User";
import Payment from "@/app/Models/Payment";

export async function POST(req) {
    try {
        await dbConnect();

        const body = await req.json();
        const { creator_id, ...ndata } = body;

        // Check if username already exists (only if username is being changed)
        if (creator_id !== ndata.creator_id) {
            const existingUser = await User.findOne({ creator_id: ndata.creator_id });
            if (existingUser) {
                return new Response(
                    JSON.stringify({ success: false, message: "Username already exists!" }),
                    { status: 400 }
                );
            }
        }

        // Update user by creator_id (use the original creator_id for filtering)
        const updateResult = await User.updateOne({ creator_id: creator_id }, ndata);
        
        // Update related payments if username changed
        if (creator_id !== ndata.creator_id) {
            await Payment.updateMany({ creator_id: creator_id }, { 
                creator_id: ndata.creator_id,
                to_user: ndata.username 
            });
        } else {
            await Payment.updateMany({ creator_id: creator_id }, { to_user: ndata.username });
        }

        if (updateResult.matchedCount === 0) {
            return new Response(
                JSON.stringify({ success: false, message: "User not found" }),
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify({ success: true, message: "User updated successfully" }),
            { status: 200 }
        );

    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ success: false, message: "Internal Server Error" }),
            { status: 500 }
        );
    }
}
