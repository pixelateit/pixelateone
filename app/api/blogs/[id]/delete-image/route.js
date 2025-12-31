import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { deleteImageDbAndFirebase } from "@/lib/deleteImageDbAndFirebase";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const { imageUrl, field } = await req.json();

    const blog = await deleteImageDbAndFirebase(Blog, id, imageUrl, field);

    return NextResponse.json({ success: true, blog });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
