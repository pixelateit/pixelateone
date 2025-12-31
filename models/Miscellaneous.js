// models/Miscellaneous.js
import mongoose from "mongoose";

const MiscellaneousSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
    thumbnail: {
      type: String,
      default: "https://placehold.co/600/png",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Miscellaneous ||
  mongoose.model("Miscellaneous", MiscellaneousSchema);
