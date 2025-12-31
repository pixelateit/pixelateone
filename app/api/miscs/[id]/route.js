// app/api/miscs/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Miscellaneous from "@/models/Miscellaneous";
import { adminStorage } from "@/lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";

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

// helper: extract Firebase path from URL
function getPathFromUrl(url) {
  const match = url.match(/\/([^?]+)\?/);
  return match ? decodeURIComponent(match[1]) : null;
}

export async function DELETE(_req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const deletedProfile = await Miscellaneous.findByIdAndDelete(id);

    if (!deletedProfile) {
      return NextResponse.json(
        { success: false, message: "Profile not found!" },
        { status: 404 }
      );
    }

    // Delete thumbnail
    if (deletedProfile.thumbnail) {
      const path = getPathFromUrl(deletedProfile.thumbnail);
      if (path) {
        await adminStorage
          .file(path)
          .delete()
          .catch((err) => {
            console.warn(
              "Error deleting thumbnail from Firebase:",
              err.message
            );
          });
      }
    }

    await Miscellaneous.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Profile deleted from DB and Firebase!",
        // profile: deletedProfile,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting profile:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete profile!",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const formData = await req.formData();

    const updates = {};

    // Add text fields
    for (const [key, value] of formData.entries()) {
      if (key !== "thumbnail") updates[key] = value;
    }

    const incomingThumbnail = formData.get("thumbnail"); // can be File, empty string, or null

    const miscs = await Miscellaneous.findById(id);
    if (!miscs) {
      return NextResponse.json(
        { success: false, error: "Profile not found" },
        { status: 404 }
      );
    }

    if (incomingThumbnail && incomingThumbnail.name) {
      // delete old
      if (miscs.thumbnail) {
        const oldPath = getPathFromUrl(miscs.thumbnail);
        if (oldPath) {
          await adminStorage
            .file(oldPath)
            .delete()
            .catch(() => {});
        }
      }
      updates.thumbnail = await uploadFileToFirebase(
        incomingThumbnail,
        "miscs"
      );
    } else if (incomingThumbnail === "") {
      // User removed the thumbnail
      if (miscs.thumbnail) {
        const oldPath = getPathFromUrl(miscs.thumbnail);
        if (oldPath) {
          await adminStorage
            .file(oldPath)
            .delete()
            .catch(() => {});
        }
      }
      updates.thumbnail = null;
    } else {
      // keep existing
      updates.thumbnail = miscs.thumbnail;
    }

    const updatedMiscs = await Miscellaneous.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      { success: true, miscs: updatedMiscs },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating misc project:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(_req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const miscs = await Miscellaneous.findById(id);

    if (!miscs) {
      return NextResponse.json(
        { success: false, message: "Profile not found!" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, miscs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching miscs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch miscs!",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
