// lib/dbConnect.js
import mongoose from "mongoose";

let isConnected = false; // Track connection state

export default async function dbConnect() {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    isConnected = conn.connections[0].readyState === 1;

    console.log("✅ MongoDB connected:", conn.connection.host);
  } catch (err) {
    console.error("❌ MongoDB connection error:", {
      message: err.message,
      name: err.name,
      code: err.code,
      reason: err.reason,
    });

    // Re-throw so API route returns 500
    throw new Error("MongoDB connection failed. Check logs above.");
  }
}
