// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String }, // only required for credentials-based accounts
    profilePicture: {
      type: String,
      // default: "https://placehold.co/400/png", // ✅ PNG placeholder
    },
    isGoogleAccount: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
