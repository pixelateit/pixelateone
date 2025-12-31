import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import CompanyProfile from "@/models/CompanyProfile";
import { adminStorage } from "@/lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";

async function uploadFileToFirebase(file, folder) {
  const fileName = `${folder}/${Date.now()}-${uuidv4()}-${file.name}`;
  const fileRef = adminStorage.file(fileName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await fileRef.save(buffer, {
    metadata: { contentType: file.type },
    resumable: false,
  });

  const [url] = await fileRef.getSignedUrl({
    action: "read",
    expires: "03-09-2099",
  });

  return url;
}

export async function POST(req) {
  try {
    await dbConnect();
    const formData = await req.formData();

    // ---- Separate text fields & files ----
    const textFields = {};
    const fileMap = {
      thumbnail: "profiles",
      sliderImages: "profiles/sliderImages",
    };
    // Collect text values
    for (const [key, value] of formData.entries()) {
      if (!fileMap[key]) {
        textFields[key] = value;
      }
    }
    // Collect files
    const uploads = [];
    const uploadedUrls = { sliderImages: [] };
    for (const [key, value] of formData.entries()) {
      if (fileMap[key] && typeof value !== "string") {
        const folder = fileMap[key];
        if (key === "sliderImages") {
          // multiple files
          uploads.push(
            (async () => {
              const url = await uploadFileToFirebase(value, folder);
              uploadedUrls.sliderImages.push(url);
            })()
          );
        } else {
          // single file
          uploads.push(
            (async () => {
              const url = await uploadFileToFirebase(value, folder);
              uploadedUrls[key] = url;
            })()
          );
        }
      }
    }
    await Promise.all(uploads);
    // Merge text fields and uploaded file URLs
    const newProfileData = { ...textFields, ...uploadedUrls };
    // Create new CompanyProfile document
    const newProfile = new CompanyProfile(newProfileData);
    await newProfile.save();
    return NextResponse.json(
      {
        success: true,
        message: "Company profile created",
        profile: newProfile,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/profiles:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create company profile",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// GET Company Profiles
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const fieldsParam = searchParams.get("fields");
    const software = searchParams.get("software");
    const isActive = searchParams.get("isActive");

    const limit = parseInt(searchParams.get("limit")) || 10; // default 10
    const skip = parseInt(searchParams.get("skip")) || 0; // default 0

    let filter = {};
    if (software && software !== "All") {
      filter.software = software;
    }
    if (isActive === "true") {
      filter.isActive = true;
    } else if (isActive === "false") {
      filter.isActive = false;
    }

    let projection = null;
    if (fieldsParam) {
      projection = fieldsParam.split(",").join(" ");
    }

    const profiles = await CompanyProfile.find(filter, projection)
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    const totalCount = await CompanyProfile.countDocuments(filter);

    return NextResponse.json({ profiles, totalCount }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/profiles:", error);
    return NextResponse.json(
      { error: "Failed to fetch profiles", details: error.message },
      { status: 500 }
    );
  }
}
