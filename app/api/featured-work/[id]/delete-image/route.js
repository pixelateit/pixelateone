import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import FeaturedWork from "@/models/FeaturedWork";
import { adminStorage } from "@/lib/firebaseAdmin";

// Extract Firebase path
function getPathFromUrl(url) {
  try {
    const decoded = decodeURIComponent(url);
    const u = new URL(
      decoded.startsWith("http") ? decoded : `https://${decoded}`
    );

    let path = "";

    if (u.hostname === "storage.googleapis.com") {
      const [, ...rest] = u.pathname.split("/").filter(Boolean);
      path = rest.join("/");
    } else {
      path = u.pathname
        .split("/")
        .filter(Boolean)
        .filter((p) => !p.includes("firebasestorage.app"))
        .join("/");
    }

    // 🔥 CRITICAL FIX — convert encoded filename to real Firebase object name
    return path.replace(/%20/g, " ");
  } catch (err) {
    console.error("Invalid Firebase URL:", url);
    return null;
  }
}

export async function DELETE(req, { params }) {
  try {
    await dbConnect();

    const { id } = await params; // THIS is your custom workId, not _id
    const { imageUrl, field } = await req.json();

    if (!imageUrl || !field) {
      return NextResponse.json(
        { success: false, error: "Missing imageUrl or field" },
        { status: 400 }
      );
    }

    // ❗ Correct way: find by custom field workId
    const work = await FeaturedWork.findOne({ workId: id });

    if (!work) {
      return NextResponse.json(
        { success: false, error: "Featured work not found" },
        { status: 404 }
      );
    }

    // Delete from Firebase
    const filePath = getPathFromUrl(imageUrl);
    if (filePath) {
      try {
        await adminStorage.file(filePath).delete();
      } catch (err) {
        console.warn("Firebase delete failed:", err.message);
      }
    }

    // Remove from MongoDB
    if (Array.isArray(work[field])) {
      work[field] = work[field].filter((url) => url !== imageUrl);
    } else if (work[field] === imageUrl) {
      work[field] = null;
    }

    await work.save();

    return NextResponse.json(
      { success: true, message: "Image deleted", work },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
