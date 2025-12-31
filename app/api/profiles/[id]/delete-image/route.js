import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CompanyProfile from "@/models/CompanyProfile";
import { deleteImageDbAndFirebase } from "@/lib/deleteImageDbAndFirebase";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { imageUrl, field } = await req.json();

    const profile = await deleteImageDbAndFirebase(
      CompanyProfile,
      id,
      imageUrl,
      field
    );

    return NextResponse.json({ success: true, profile });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
