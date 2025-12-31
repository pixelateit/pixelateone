// api/miscs/route.js

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

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();

    // ---- Separate text fields & files ----
    const textFields = {};
    const fileMap = {
      thumbnail: "miscs",
    };
    // Collect text values
    for (const [key, value] of formData.entries()) {
      if (!fileMap[key]) {
        textFields[key] = value;
      }
    }

    if (!textFields.title) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }
    // Collect files
    const uploads = [];
    const uploadedUrls = {};
    for (const [key, value] of formData.entries()) {
      if (fileMap[key] && typeof value !== "string") {
        const folder = fileMap[key];
        // single file
        uploads.push(
          (async () => {
            const url = await uploadFileToFirebase(value, folder);
            uploadedUrls[key] = url;
          })()
        );
      }
    }
    await Promise.all(uploads);
    // Merge text fields and uploaded file URLs
    const newMiscsData = { ...textFields, ...uploadedUrls };
    // Create new Misc project document
    const newMiscs = new Miscellaneous(newMiscsData);
    await newMiscs.save();
    return NextResponse.json(
      {
        success: true,
        message: "Misc project created",
        miscs: newMiscs,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/miscs:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create misc project",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const fieldsParam = searchParams.get("fields");
    const isActive = searchParams.get("isActive");

    let fields = null;
    if (fieldsParam) {
      fields = fieldsParam.split(",").join(" ");
    }

    let filter = {};
    if (isActive === "true") {
      filter.isActive = true;
    } else if (isActive === "false") {
      filter.isActive = false;
    }

    const miscs = await Miscellaneous.find(filter, fields).sort({
      createdAt: -1,
    });
    return NextResponse.json({ miscs }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/miscs:", error);
    return NextResponse.json(
      { error: "Failed to fetch misc projects", details: error.message },
      { status: 500 }
    );
  }
}
