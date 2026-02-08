import { dbConnect } from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export async function getBlogs() {
  await dbConnect();
  return Blog.find().lean();
}
