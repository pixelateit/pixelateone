// api/posters/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Poster from "@/models/Posters";
import { adminStorage } from "@/lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";

// helper: upload file to Firebase
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

// POST - create poster
export async function POST(req) {
  try {
    await dbConnect();

    const formData = await req.formData();
    const posterName = formData.get("posterName");
    const software = formData.get("software") || "Figma";
    const file = formData.get("posterImage");

    if (!posterName || !file) {
      return NextResponse.json(
        { success: false, message: "Poster name and image are required" },
        { status: 400 }
      );
    }

    // upload image to Firebase
    const imageUrl = await uploadFileToFirebase(file, "posters");

    // save to MongoDB
    const poster = await Poster.create({
      posterName,
      posterImage: imageUrl,
      software,
    });

    return NextResponse.json({ success: true, data: poster });
  } catch (error) {
    console.error("Error creating poster:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

// GET - fetch all posters
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const software = searchParams.get("software");
    const isActive = searchParams.get("isActive");

    const limit = parseInt(searchParams.get("limit")) || 10; // default 10
    const skip = parseInt(searchParams.get("skip")) || 0; // default 0

    let filter = {};
    if (software && software !== "All") {
      filter.software = software;
    }
    if (isActive === "true") {
      filter.isActive = true;
    } else if (isActive === "false") {
      filter.isActive = false;
    }

    const posters = await Poster.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalCount = await Poster.countDocuments(filter);

    return NextResponse.json({ posters, totalCount }, { status: 200 });
  } catch (error) {
    console.error("Error fetching posters:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
