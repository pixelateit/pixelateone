// api/users/[id]/delete-image/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { deleteImageDbAndFirebase } from "@/lib/deleteImageDbAndFirebase";

export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { imageUrl, field } = await req.json();

    const updatedUser = await deleteImageDbAndFirebase(
      User,
      id,
      imageUrl,
      field
    );

    return NextResponse.json(
      { success: true, message: "Image deleted", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
