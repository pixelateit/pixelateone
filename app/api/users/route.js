// app/api/users/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
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
    const users = await User.find({}).select("-password");

    return NextResponse.json(users);
  } catch (err) {
    console.error("GET users error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Server error" },
      { status: 500 },
    );
  }
}
