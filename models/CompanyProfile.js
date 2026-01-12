// models/CompanyProfile.js
import mongoose from "mongoose";
import { autoIncrement } from "@/plugins/autoIncrement.js";
import { slugifyField } from "@/plugins/slugifyField.js";

const CompanyProfileSchema = new mongoose.Schema(
  {
    id: { type: Number, unique: true, index: true },
    company: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, unique: true, index: true }, // ✅ clean URL
    description: { type: String },
    software: { type: String, default: "Figma" },
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false },
    thumbnail: {
      type: String,
    },
    sliderImages: [{ type: String }],
  },
  { timestamps: true }
);

// ✅ apply plugins
CompanyProfileSchema.plugin(autoIncrement, { modelName: "CompanyProfile" });
CompanyProfileSchema.plugin(slugifyField, {
  field: "title",
  slugField: "slug",
});

export default mongoose.models.CompanyProfile ||
  mongoose.model("CompanyProfile", CompanyProfileSchema);
