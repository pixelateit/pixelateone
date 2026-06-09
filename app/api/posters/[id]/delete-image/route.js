import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Posters from "@/models/Posters";
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
    const { id } = params;
    const { imageUrl, field } = await req.json();

    const poster = await deleteImageDbAndFirebase(Posters, id, imageUrl, field);

    return NextResponse.json({ success: true, poster });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 },
    );
  }
}
