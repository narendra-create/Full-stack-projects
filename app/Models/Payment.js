import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const PaymentSchema = new Schema({
    creator_id: { type: String },
    name: { type: String, required: true },
    to_user: { type: String, required: true },
    oid: { type: String, required: true },
    message: { type: String },
    method: { type: String },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    Payment_id: { type: String },
    done: { type: Boolean, default: false },
});

const Payment = models.Payment || model("Payment", PaymentSchema);
export default Payment;