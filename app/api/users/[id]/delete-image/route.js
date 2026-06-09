// api/users/[id]/delete-image/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { deleteImageDbAndFirebase } from "@/lib/deleteImageDbAndFirebase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      console.log("❌ Unauthorized: No session found");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    await dbConnect();
    const { id } = await params;
    const { imageUrl, field } = await req.json();

    const updatedUser = await deleteImageDbAndFirebase(
      User,
      id,
      imageUrl,
      field,
    );

    return NextResponse.json(
      { success: true, message: "Image deleted", user: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
