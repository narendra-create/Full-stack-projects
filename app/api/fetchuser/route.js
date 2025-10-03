import dbConnect from "@/lib/dbconnect";
import User from "@/app/Models/User";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const usermail = searchParams.get("email");

    if (!usermail) {
        return new Response(JSON.stringify({ error: "Email required" }), { status: 400 });
    }

    try {
        await dbConnect();
        
        const user = await User.findOne({ email: usermail });

        if (!user) {
            return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
        }

        const userData = user.toObject({ flattenObjectIds: true });
        return new Response(JSON.stringify(userData), { status: 200 });

    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
