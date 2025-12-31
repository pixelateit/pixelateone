// app/api/quotes/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Quote from "@/models/Quote";
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
    const deletedQuote = await Quote.findByIdAndDelete(id);

    if (!deletedQuote) {
      return NextResponse.json(
        { success: false, message: "Quote not found!" },
        { status: 404 }
      );
    }
    // Delete image
    if (deletedQuote.image) {
      const path = getPathFromUrl(deletedQuote.image);
      if (path) {
        await adminStorage
          .file(path)
          .delete()
          .catch((err) => {
            console.warn("Error deleting image from Firebase:", err.message);
          });
      }
    }
    return NextResponse.json(
      { success: true, message: "Quote deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting quote:", error);
    return NextResponse.json(
      { error: "Failed to delete quote" },
      { status: 500 }
    );
  }
}

export async function GET(_req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const quote = await Quote.findById(id);

    if (!quote) {
      return NextResponse.json(
        { success: false, message: "Quote not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, quote }, { status: 200 });
  } catch (error) {
    console.error("Error fetching quote:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch quote" },
      { status: 500 }
    );
  }
}

// Quote Update Handler: PUT /api/quotes/:id
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const formData = await req.formData();
    const updateFields = {};

    // Add text fields
    for (const [key, value] of formData.entries()) {
      if (key !== "image") updateFields[key] = value;
    }

    const incomingImage = formData.get("image"); // can be File, empty string, or null
    const existingQuote = await Quote.findById(id);

    if (!existingQuote) {
      return NextResponse.json(
        { success: false, message: "Quote not found!" },
        { status: 404 }
      );
    }

    // ----------------------------
    // CASE A: User uploaded a new file
    // ----------------------------
    if (incomingImage && incomingImage.name) {
      // delete old
      if (existingQuote.image) {
        const oldPath = getPathFromUrl(existingQuote.image);
        if (oldPath) {
          await adminStorage
            .file(oldPath)
            .delete()
            .catch(() => {});
        }
      }

      // upload new
      const newUrl = await uploadFileToFirebase(incomingImage, "quotes");
      updateFields.image = newUrl;
    }

    // ----------------------------
    // CASE B: User removed image (incoming value = "")
    // ----------------------------
    else if (incomingImage === "") {
      if (existingQuote.image) {
        const oldPath = getPathFromUrl(existingQuote.image);
        if (oldPath) {
          await adminStorage
            .file(oldPath)
            .delete()
            .catch(() => {});
        }
      }
      updateFields.image = null;
    }

    // ----------------------------
    // CASE C: User did NOT upload or delete image
    // -> keep existing
    // ----------------------------
    else {
      updateFields.image = existingQuote.image;
    }

    const updatedQuote = await Quote.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Quote updated successfully",
        quote: updatedQuote,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating quote:", error);
    return NextResponse.json(
      { error: "Failed to update quote" },
      { status: 500 }
    );
  }
}
