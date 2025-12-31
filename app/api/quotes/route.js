import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { adminStorage } from "@/lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";
import Quote from "@/models/Quote";

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
    const textFields = {};
    // Collect text values
    for (const [key, value] of formData.entries()) {
      if (key !== "image" && typeof value === "string") {
        textFields[key] = value;
      }
    }
    // Handle file upload
    let imageUrl = "";
    const imageFile = formData.get("image");
    if (imageFile && typeof imageFile !== "string") {
      imageUrl = await uploadFileToFirebase(imageFile, "quotes");
    }
    // Create new Quote document
    const newQuote = new Quote({
      ...textFields,
      image: imageUrl,
    });
    await newQuote.save();
    return NextResponse.json(
      { success: true, message: "Quote created successfully", quote: newQuote },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating quote:", error);
    return NextResponse.json(
      { error: "Failed to create quote" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const fieldsParam = searchParams.get("fields");
    const isActiveParam = searchParams.get("active");

    // Build projection based on fieldsParam
    const filter = {};
    if (isActiveParam === "true") {
      filter.active = true;
    } else if (isActiveParam === "false") {
      filter.active = false;
    }

    let projection = null;
    if (fieldsParam) {
      projection = fieldsParam.split(",").join(" ");
    }

    const quotes = await Quote.find(filter, projection).sort({ createdAt: -1 });
    return NextResponse.json({ quotes }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quotes:", error);
    return NextResponse.json(
      { error: "Failed to fetch quotes" },
      { status: 500 }
    );
  }
}
