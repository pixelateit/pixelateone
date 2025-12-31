import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Miscellaneous from "@/models/Miscellaneous";
import { deleteImageDbAndFirebase } from "@/lib/deleteImageDbAndFirebase";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    const { imageUrl, field } = await req.json();

    const misc = await deleteImageDbAndFirebase(
      Miscellaneous,
      id,
      imageUrl,
      field
    );

    return NextResponse.json({ success: true, misc });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
