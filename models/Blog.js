// models/Blog.js
import mongoose from "mongoose";
import { slugifyField } from "@/plugins/slugifyField.js";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true }, // ✅ stores HTML content
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    thumbnail: { type: String },
    tags: [{ type: String }],
    slug: { type: String, unique: true, index: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    metaTitle: { type: String },
    metaDescription: { type: String },
    readingTime: { type: Number }, // in minutes
  },
  { timestamps: true }
);

BlogSchema.plugin(slugifyField, {
  field: "title",
  slugField: "slug",
});

BlogSchema.pre("save", function (next) {
  const words = this.content.replace(/<[^>]*>/g, "").split(/\s+/).length;
  this.readingTime = Math.ceil(words / 200);
  next();
});

BlogSchema.index({ title: "text", tags: "text", content: "text" });

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
