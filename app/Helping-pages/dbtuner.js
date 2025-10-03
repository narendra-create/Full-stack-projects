import mongoose from "mongoose";
import dbConnect from "@/lib/dbconnect";
import Payment from "../Models/Payment";

const tunedata = async (ordernumber, status) => {
    await dbConnect();
    if (status === 'PAID') {
        await Payment.updateOne({ oid: ordernumber, done: false }, { $set: { done: true } });
        console.log("Updated done:true successfully !")
    }
    else {
        let del = await Payment.deleteOne({ oid: ordernumber })
        console.log("Deleted the Pending order")
    }
}

export default tunedata