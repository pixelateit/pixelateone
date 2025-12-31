// app/api/auth/register/route.js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { adminStorage } from "@/lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const file = formData.get("profilePicture");

    if (!name || !email || !password)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    if (await User.findOne({ email }))
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 10);
    let profilePictureUrl = "https://placehold.co/400/png";

    if (file && file.size > 0) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());
        const bucket = adminStorage.bucket();
        const fileName = `profile-pictures/${uuidv4()}-${file.name}`;
        const bucketFile = bucket.file(fileName);

        await bucketFile.save(buffer, {
          metadata: {
            contentType: file.type,
            firebaseStorageDownloadTokens: uuidv4(),
          },
        });

        profilePictureUrl = `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURIComponent(fileName)}?alt=media`;
      } catch (uploadErr) {
        console.error("Profile picture upload failed:", uploadErr);
      }
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePicture: profilePictureUrl,
      isGoogleAccount: false,
    });

    const { password: _, ...safeUser } = user.toObject();

    return NextResponse.json(
      { message: "User registered successfully", user: safeUser },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
