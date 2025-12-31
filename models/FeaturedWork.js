import mongoose from "mongoose";
const { Schema } = mongoose;

const FeaturedWorkSchema = new Schema(
  {
    featuredTitle: { type: String },
    industry: { type: String },
    isfeatured: { type: Boolean, default: false },
    featuredImages: [{ type: String }],
    bgColor: { type: String, default: "orange" },
    workId: {
      type: Schema.Types.ObjectId,
      ref: "Work",
    },
  },
  { timestamps: true }
);

/**
 * Middleware: When a FeaturedWork is created, set hasFeaturedWork = true
 */
// FeaturedWorkSchema.post("save", async function (doc) {
//   try {
//     await mongoose.model("Work").findByIdAndUpdate(doc.workId, {
//       $set: { hasFeaturedWork: true },
//     });
//   } catch (err) {
//     console.error("Error updating Work.hasFeaturedWork on save:", err);
//   }
// });

/**
 * Middleware: When a FeaturedWork is deleted, set hasFeaturedWork = false
 */
// FeaturedWorkSchema.post("findOneAndDelete", async function (doc) {
//   try {
//     if (doc) {
//       await mongoose.model("Work").findByIdAndUpdate(doc.workId, {
//         $set: { hasFeaturedWork: false },
//       });
//     }
//   } catch (err) {
//     console.error("Error updating Work.hasFeaturedWork on delete:", err);
//   }
// });

export default mongoose.models.FeaturedWork ||
  mongoose.model("FeaturedWork", FeaturedWorkSchema);
