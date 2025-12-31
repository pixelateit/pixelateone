// app/api/profiles/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CompanyProfile from "@/models/CompanyProfile";
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

    const deletedProfile = await CompanyProfile.findByIdAndDelete(id);

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

    // Delete sliderImages (multiple)
    if (deletedProfile.sliderImages && deletedProfile.sliderImages.length > 0) {
      for (const imgUrl of deletedProfile.sliderImages) {
        const path = getPathFromUrl(imgUrl);
        if (path) {
          await adminStorage
            .file(path)
            .delete()
            .catch((err) => {
              console.warn("Error deleting slider image:", err.message);
            });
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Profile deleted from DB and Firebase!",
        profile: deletedProfile,
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

    // --- Text fields ---
    for (const [key, value] of formData.entries()) {
      if (key !== "thumbnail" && key !== "sliderImages") {
        updates[key] = value;
      }
    }

    const profile = await CompanyProfile.findById(id);
    if (!profile) {
      return NextResponse.json(
        { success: false, error: "Profile not found" },
        { status: 404 }
      );
    }

    // --- Thumbnail (single) ---
    const incomingThumbnail = formData.get("thumbnail");

    if (incomingThumbnail && incomingThumbnail.name) {
      // Delete old thumbnail if exists
      if (profile.thumbnail) {
        const oldPath = getPathFromUrl(profile.thumbnail);
        if (oldPath) {
          await adminStorage
            .file(oldPath)
            .delete()
            .catch(() => {});
        }
      }
      updates.thumbnail = await uploadFileToFirebase(
        incomingThumbnail,
        "profiles"
      );
    } else if (incomingThumbnail === "") {
      if (profile.thumbnail) {
        const oldPath = getPathFromUrl(profile.thumbnail);
        if (oldPath) {
          await adminStorage
            .file(oldPath)
            .delete()
            .catch(() => {});
        }
      }
      updates.thumbnail = null;
    } else {
      // Keep existing
      updates.thumbnail = profile.thumbnail;
    }

    // --- Slider Images (multiple) ---
    let finalSliderImages = [];

    // 1) Keep existing image URLs (frontend sends these raw strings)
    const existingImages = formData.getAll("sliderImages");
    finalSliderImages.push(...existingImages);

    // 2) Upload new images (frontend sends actual File objects in sliderImages_new)
    const newFiles = formData.getAll("sliderImages_new");

    for (const file of newFiles) {
      if (file && file.name) {
        const url = await uploadFileToFirebase(file, "profiles/sliderImages");
        finalSliderImages.push(url);
      }
    }

    updates.sliderImages = finalSliderImages;

    const profileUpdates = await CompanyProfile.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      { success: true, message: "Profile updated", profile: profileUpdates },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update profile",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(_req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const profile = await CompanyProfile.findById(id);

    if (!profile) {
      return NextResponse.json(
        { success: false, message: "Profile not found!" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, profile }, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile!",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
