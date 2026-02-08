import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function getBlogBySlug(slug) {
  await dbConnect();
  return await Blog.findOne({ slug }).lean();
}
