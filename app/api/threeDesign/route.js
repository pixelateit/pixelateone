// app/api/threeDesign/route.js
import { NextResponse } from "next/server";
import { adminStorage } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const [files] = await adminStorage.getFiles({ prefix: "three-design/" });

    const fileUrls = await Promise.all(
      files.map(async (file) => {
        const [url] = await file.getSignedUrl({
          action: "read",
          expires: "01-01-2030",
        });
        return { name: file.name.replace("three-design/", "").trim(), url };
      })
    );

    return NextResponse.json({ success: true, files: fileUrls });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
