import mongoose from "mongoose";
const { Schema } = mongoose;

const WorkSchema = new Schema(
  {
    title: { type: String, required: true },
    logo: { type: String },
    thumbnail: { type: String },
    showWork: { type: Boolean, default: false },
    weblink: { type: String },
    hasFeaturedWork: { type: Boolean, default: false },
    timeline: { type: String },
    clientName: { type: String },
    deliverables: { type: String },
    banner: { type: String },
    description: { type: String },
    projectDetails: { type: String },
    teamMembers: { type: String },
    logoDesign: { type: String },
    logoDesignImg: { type: String },
    slider1: [{ type: String }],
    typography: { type: String },
    designProcess: { type: String },
    designProcessImg: { type: String },
    isfeatured: { type: Boolean, default: false },
    slider2: [{ type: String }],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

/**
 * Middleware: When a Work is deleted, clean up its FeaturedWork
 */
WorkSchema.post("findOneAndDelete", async function (doc) {
  try {
    if (doc) {
      await mongoose
        .model("FeaturedWork")
        .findOneAndDelete({ workId: doc._id });
    }
  } catch (err) {
    console.error("Error cleaning up FeaturedWork when Work deleted:", err);
  }
});

export default mongoose.models.Work || mongoose.model("Work", WorkSchema);
