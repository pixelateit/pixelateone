// api/work/[id]/delete-image/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Work from "@/models/Work";
import { deleteImageDbAndFirebase } from "@/lib/deleteImageDbAndFirebase";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { imageUrl, field } = await req.json();

    const work = await deleteImageDbAndFirebase(Work, id, imageUrl, field);

    return NextResponse.json({ success: true, work });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
