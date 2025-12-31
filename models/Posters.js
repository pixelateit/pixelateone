// models/Poster.js
import mongoose from "mongoose";
import { autoIncrement } from "@/plugins/autoIncrement.js";

const PosterSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true }, // auto-incremented
    posterName: { type: String, required: true },
    posterImage: { type: String, default: "https://placehold.co/980x1360/png" },
    software: { type: String, default: "Figma" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

PosterSchema.plugin(autoIncrement, { modelName: "Poster" });

export default mongoose.models.Poster || mongoose.model("Poster", PosterSchema);
