import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Posters from "@/models/Posters";
import { deleteImageDbAndFirebase } from "@/lib/deleteImageDbAndFirebase";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const { imageUrl, field } = await req.json();

    const poster = await deleteImageDbAndFirebase(Posters, id, imageUrl, field);

    return NextResponse.json({ success: true, poster });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
