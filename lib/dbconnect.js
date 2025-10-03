import mongoose from "mongoose";

// Your MongoDB URL from .env
const MONGO_URI = process.env.MONGO_URI;

async function dbConnect() {
  // If already connected, do nothing
  if (mongoose.connections[0].readyState) {
    return;
  }

  // Else, connect to DB
  await mongoose.connect(MONGO_URI);
}

export default dbConnect;
