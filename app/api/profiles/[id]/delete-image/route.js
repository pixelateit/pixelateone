import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CompanyProfile from "@/models/CompanyProfile";
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

    const profile = await deleteImageDbAndFirebase(
      CompanyProfile,
      id,
      imageUrl,
      field,
    );

    return NextResponse.json({ success: true, profile });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
