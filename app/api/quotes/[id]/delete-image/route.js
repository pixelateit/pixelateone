// app/api/quotes/[id]/delete-image/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Quote from "@/models/Quote";
import { deleteImageDbAndFirebase } from "@/lib/deleteImageDbAndFirebase";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const { imageUrl, field } = await req.json();

    const quote = await deleteImageDbAndFirebase(Quote, id, imageUrl, field);

    return NextResponse.json({ success: true, quote });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
