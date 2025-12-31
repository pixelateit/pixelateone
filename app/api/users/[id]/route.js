// app/api/users/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
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

// ✅ Get user details
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params; // no await here
    const user = await User.findById(id).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("GET user error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 }
    );
  }
}

// ✅ Update user
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const formData = await req.formData();
    let updates = {};

    // Add text fields
    for (const [key, value] of formData.entries()) {
      if (key !== "profilePicture") updates[key] = value;
    }

    const incomingImage = formData.get("profilePicture");

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 🚫 block Google accounts from editing
    if (user.isGoogleAccount) {
      return NextResponse.json(
        {
          success: false,
          message: "Google-auth accounts cannot update profile.",
        },
        { status: 403 }
      );
    }

    // Case A: New file uploaded
    if (incomingImage && incomingImage.name) {
      // Delete old picture if exists
      if (user.profilePicture) {
        const oldFilePath = getPathFromUrl(user.profilePicture);
        if (oldFilePath) {
          await adminStorage
            .file(oldFilePath)
            .delete()
            .catch(() => {});
        }
      }

      // Upload new picture
      const uploadedUrl = await uploadFileToFirebase(
        incomingImage,
        "profile-pictures"
      );
      updates.profilePicture = uploadedUrl;
    }

    // Case B: User removed picture (incoming value = "")
    else if (incomingImage === "") {
      if (user.profilePicture) {
        const oldFilePath = getPathFromUrl(user.profilePicture);
        if (oldFilePath) {
          await adminStorage
            .file(oldFilePath)
            .delete()
            .catch(() => {});
        }
      }
      updates.profilePicture = null;
    }

    // Case C: No change to picture
    else {
      updates.profilePicture = user.profilePicture;
    }

    // Apply updates
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Profile updated successfully!",
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT /api/users/[id] failed:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ✅ Delete user
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "User ID is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 🚫 Block Google accounts
    if (user.isGoogleAccount) {
      return NextResponse.json(
        {
          success: false,
          message: "Google accounts cannot be deleted from here",
        },
        { status: 403 }
      );
    }

    // 🧹 Delete profile picture from Firebase if exists
    if (user.profilePicture) {
      const filePath = getPathFromUrl(user.profilePicture);
      if (filePath) {
        try {
          await adminStorage.file(filePath).delete();
          console.log(`🗑️ Deleted profile picture for user ${id}`);
        } catch (err) {
          console.warn("⚠️ Failed to delete profile picture:", err.message);
        }
      }
    }

    // 🧹 Delete user record
    await User.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "User and profile picture deleted successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Delete error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
