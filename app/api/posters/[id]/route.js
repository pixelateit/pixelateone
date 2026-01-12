// api/posters/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Posters from "@/models/Posters";
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

/**
 * GET /api/posters/[id]
 */
export async function GET(_req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const poster = await Posters.findById(id);
    if (!poster) {
      return NextResponse.json(
        { success: false, error: "Poster not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, poster }, { status: 200 });
  } catch (err) {
    console.error("GET /api/posters/[id] failed:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/posters/[id]
 */
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const formData = await req.formData();
    let updates = {};

    // Add text fields
    for (const [key, value] of formData.entries()) {
      if (key !== "posterImage") updates[key] = value;
    }

    const incomingImage = formData.get("posterImage"); // can be File, empty string, or null

    const poster = await Posters.findById(id);
    if (!poster) {
      return NextResponse.json(
        { success: false, error: "Poster not found" },
        { status: 404 }
      );
    }

    // ----------------------------
    // CASE A: User uploaded a new file
    // ----------------------------
    if (incomingImage && incomingImage.name) {
      // delete old
      if (poster.posterImage) {
        const oldPath = getFilePathFromUrl(poster.posterImage);
        if (oldPath) {
          await adminStorage
            .file(oldPath)
            .delete()
            .catch(() => {});
        }
      }

      // upload new
      const newUrl = await uploadFileToFirebase(incomingImage, "posters");
      updates.posterImage = newUrl;
    }

    // ----------------------------
    // CASE B: User removed image (incoming value = "")
    // ----------------------------
    else if (incomingImage === "") {
      if (poster.posterImage) {
        const oldPath = getFilePathFromUrl(poster.posterImage);
        if (oldPath) {
          await adminStorage
            .file(oldPath)
            .delete()
            .catch(() => {});
        }
      }
      updates.posterImage = null;
    }

    // ----------------------------
    // CASE C: User did NOT upload or delete image
    // -> keep existing
    // ----------------------------
    else {
      updates.posterImage = poster.posterImage;
    }

    const updatedPoster = await Posters.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      { success: true, poster: updatedPoster },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT /api/posters/[id] failed:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/posters/[id]
 */
export async function DELETE(_req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const poster = await Posters.findById(id);
    if (!poster) {
      return NextResponse.json(
        { success: false, error: "Poster not found" },
        { status: 404 }
      );
    }

    // Delete image from Firebase
    if (poster.posterImage) {
      const filePath = getFilePathFromUrl(poster.posterImage);
      if (filePath) {
        try {
          await adminStorage.file(filePath).delete();
          console.log(`Deleted poster image: ${filePath}`);
        } catch (err) {
          console.error("Failed to delete poster image:", err.message);
        }
      }
    }

    // Delete MongoDB document
    await Posters.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "Poster deleted" },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /api/posters/[id] failed:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
