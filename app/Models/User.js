import mongoose from "mongoose";

const { Schema, models, model } = mongoose;

const UserSchema = new Schema({
    creator_id: { type: String },
    email: { type: String, required: true },
    name: { type: String },
    username: { type: String, required: true },
    profilepic: { type: String },
    coverpic: { type: String },
    Cashfreeid: { type: String },
    Cashfreesecret: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export default User;