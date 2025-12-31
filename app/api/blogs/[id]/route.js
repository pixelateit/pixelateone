import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";
import { adminStorage } from "@/lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";

// 🔑 Upload helper
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

// 🔑 Extract file path from Firebase URL
function getFilePathFromUrl(url) {
  try {
    const decodedUrl = decodeURIComponent(url.split("?")[0]);
    const parts = decodedUrl.split("/");
    const bucketIndex = parts.findIndex((p) => p.includes("appspot.com"));
    return parts.slice(bucketIndex + 1).join("/");
  } catch (e) {
    console.error("Failed to extract file path from URL:", url, e);
    return null;
  }
}

export async function GET(_req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const blog = await Blog.findById(id).lean();
    if (!blog)
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );

    // ✅ Fetch author name if available
    if (blog.author) {
      const user = await User.findById(blog.author).select("name").lean();
      blog.author = user ? user.name : "Unknown";
    } else {
      blog.author = "Unknown";
    }

    return NextResponse.json({ success: true, blog });
  } catch (err) {
    console.error("Error fetching blog:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const updates = {};

    // --- Handle tags ---
    const tagsValue = formData.get("tags") || "";
    let parsedTags = [];

    try {
      parsedTags = JSON.parse(tagsValue);
    } catch {
      parsedTags = tagsValue
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    }
    updates.tags = parsedTags;

    // --- Handle image (thumbnail) ---
    if (formData.has("thumbnail")) {
      const file = formData.get("thumbnail");
      if (file instanceof File) {
        // Find existing blog to delete old image
        const existingBlog = await Blog.findById(params.id);
        if (existingBlog?.thumbnail) {
          const oldPath = getFilePathFromUrl(existingBlog.thumbnail);
          if (oldPath) {
            try {
              await adminStorage.file(oldPath).delete();
              console.log(`🗑 Deleted old thumbnail: ${oldPath}`);
            } catch (err) {
              console.error("⚠️ Failed to delete old thumbnail:", err.message);
            }
          }
        }
        updates.thumbnail = await uploadFileToFirebase(file, "blogs");
      }
    } else if (formData.has("thumbnail_existing")) {
      updates.thumbnail = formData.get("thumbnail_existing"); // keep existing
    }

    // --- Handle other text fields ---
    const fields = [
      "title",
      "content",
      "status",
      "metaTitle",
      "metaDescription",
    ];

    fields.forEach((field) => {
      if (formData.has(field)) {
        updates[field] = formData.get(field);
      }
    });

    // --- Author ---
    updates.author = session.user.id;

    // --- Perform update ---
    const updatedBlog = await Blog.findByIdAndUpdate(params.id, updates, {
      new: true,
    });

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, blog: updatedBlog });
  } catch (err) {
    console.error("❌ Error updating blog:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function DELETE(_req, { params }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.id)
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );

    const { id } = params;

    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog)
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );

    // Delete thumbnail
    if (deletedBlog.thumbnail) {
      const path = getFilePathFromUrl(deletedBlog.thumbnail);
      if (path) {
        try {
          await adminStorage.file(path).delete();
        } catch (err) {
          console.warn("⚠️ Error deleting thumbnail:", err.message);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
      deletedId: id,
    });
  } catch (err) {
    console.error("Error deleting blog:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
