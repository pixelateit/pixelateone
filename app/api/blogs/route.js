// api/blogs/route.js

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { adminStorage } from "@/lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/User";

async function uploadFileToFirebase(file, folder) {
  const fileName = `${folder}/${Date.now()}-${uuidv4()}-${file.name}`;
  const fileRef = adminStorage.file(fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await fileRef.save(buffer, {
    metadata: { contentType: file.type },
    resumable: false,
  });

  const [url] = await fileRef.getSignedUrl({
    action: "read",
    expires: "03-09-2099",
  });

  return url;
}

// --------------------
// POST - Create Blog
// --------------------
export async function POST(req) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      console.log("❌ Unauthorized: No session found");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const textFields = {};
    const fileMap = { thumbnail: "blogs" }; // Firebase folder name

    // Separate files and text fields
    for (const [key, value] of formData.entries()) {
      if (fileMap[key] && typeof value !== "string") {
        const uploadedUrl = await uploadFileToFirebase(value, fileMap[key]);
        textFields[key] = uploadedUrl;
      } else {
        textFields[key] = value;
      }
    }

    let parsedTags = [];
    try {
      parsedTags = textFields.tags ? JSON.parse(textFields.tags) : [];
    } catch {
      parsedTags = textFields.tags?.split(",").map((t) => t.trim()) || [];
    }

    // Create new blog
    const newBlog = await Blog.create({
      title: textFields.title,
      content: textFields.content,
      thumbnail: textFields.thumbnail,
      tags: parsedTags,
      status: textFields.status || "draft",
      metaTitle: textFields.metaTitle || textFields.title,
      metaDescription: textFields.metaDescription || "",
      author: session.user.id || session.user._id,
    });

    return NextResponse.json({ success: true, blog: newBlog }, { status: 201 });
  } catch (err) {
    console.error("Error creating blog:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

// --------------------
// GET - Fetch Blogs
// --------------------
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const fields = searchParams.get("fields");
    const statusParam = searchParams.get("status"); //
    const limit = parseInt(searchParams.get("limit")) || 10; // default 10
    const skip = parseInt(searchParams.get("skip")) || 0; // default 0

    const filter = {};
    if (statusParam === "published") filter.status = "published";

    // ✅ Mongoose projection
    let projection = null;
    if (fields) {
      projection = fields.split(",").join(" ");
    }

    // ✅ Query with optional limit and sorting
    const query = Blog.find(filter, projection)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const blogs = await query.lean();

    const authorsCache = {};

    await Promise.all(
      blogs.map(async (blog) => {
        blog._id = blog._id.toString();
        const authorId = blog.author ? blog.author.toString() : null;

        if (authorId) {
          if (!authorsCache[authorId]) {
            const user = await User.findById(authorId).select("name").lean();
            authorsCache[authorId] = user ? user.name : "Unknown";
          }
          blog.author = authorsCache[authorId];
        } else {
          blog.author = "Unknown";
        }
      })
    );

    const total = await Blog.countDocuments(filter);

    return NextResponse.json({ success: true, blogs, total }, { status: 200 });
  } catch (err) {
    console.error("❌ Error fetching blogs:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
