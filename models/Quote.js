// models/Quote.js
import mongoose from "mongoose";

const QuoteSchema = new mongoose.Schema(
  {
    quote: { type: String, required: true },
    quotee: { type: String },
    image: { type: String, default: "https://placehold.co/600x400/png" },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Quote || mongoose.model("Quote", QuoteSchema);
