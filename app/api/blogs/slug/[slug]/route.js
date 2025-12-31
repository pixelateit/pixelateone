import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import User from "@/models/User";

export async function GET(_req, { params }) {
  try {
    await dbConnect();
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "Slug is required" },
        { status: 400 }
      );
    }

    // Find blog by slug
    const blog = await Blog.findOne({ slug }).lean();

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Populate author name if exists
    if (blog.author) {
      const user = await User.findById(blog.author).select("name").lean();
      blog.author = user ? user.name : "Unknown";
    } else {
      blog.author = "Unknown";
    }

    return NextResponse.json({ success: true, blog });
  } catch (err) {
    console.error("❌ Error fetching blog by slug:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
