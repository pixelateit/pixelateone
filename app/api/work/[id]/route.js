//app/api/work/[id]/route.js
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import WorkSchema from "@/models/Work";
import FeaturedWork from "@/models/FeaturedWork";
import { adminStorage } from "@/lib/firebaseAdmin";
import { v4 as uuidv4 } from "uuid";
import User from "@/models/User";

/**
 * Utility: Upload a single file to Firebase
 */
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

function getFilePathFromUrl(url) {
  try {
    const match = url.match(/\/([^?]+)\?/);
    return match ? decodeURIComponent(match[1]) : null;
  } catch (e) {
    console.error("Failed to extract file path from URL:", url, e);
    return null;
  }
}

/**
 * GET /api/work/[id]?fields=title,description&featuredOnly=true
 */
export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const { searchParams } = new URL(req.url);
    const fields = searchParams.get("fields");
    const hasFeaturedWork = searchParams.get("hasFeaturedWork") === "true";

    let projection = null;
    if (fields) {
      projection = fields.split(",").join(" "); // mongoose projection string
    }

    const work = await WorkSchema.findById(id, projection).lean();
    if (!work) {
      return NextResponse.json(
        { success: false, error: "Work not found" },
        { status: 404 }
      );
    }

    // Resolve createdBy user
    // if (work.createdBy) {
    //   const user = await User.findById(work.createdBy).select("name").lean();
    //   work.createdBy = user ? user.name : "Unknown";
    // } else {
    //   work.createdBy = "Unknown";
    // }

    const featuredWork = await FeaturedWork.findOne({
      workId: work._id,
    }).lean();

    if (hasFeaturedWork && !featuredWork) {
      return NextResponse.json(
        { success: false, error: "Work has no featured entry" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, work: { ...work, featuredWork: featuredWork || null } },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/work/[id] failed:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/work/[id] - supports file uploads & featured work
 */
export async function PUT(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const formData = await req.formData();

    // File field mapping
    const fileMap = {
      logo: "works",
      thumbnail: "works",
      banner: "works",
      typography: "works",
      logoDesignImg: "works",
      designProcessImg: "works",
      slider1: "works/slider1",
      slider2: "works/slider2",
      featuredImages: "works/featuredImages",
    };

    const textFields = {};
    for (const [key, value] of formData.entries()) {
      if (!fileMap[key]) textFields[key] = value;
    }

    // Upload new files
    const uploadedUrls = {};
    const uploads = [];

    for (const [key, value] of formData.entries()) {
      if (fileMap[key] && typeof value !== "string") {
        uploads.push(
          uploadFileToFirebase(value, fileMap[key]).then((url) => {
            if (["slider1", "slider2", "featuredImages"].includes(key)) {
              uploadedUrls[key] = uploadedUrls[key] || [];
              uploadedUrls[key].push(url);
            } else {
              uploadedUrls[key] = url;
            }
          })
        );
      }
    }

    await Promise.all(uploads);

    const {
      hasFeaturedWork,
      featuredTitle,
      industry,
      isfeatured,
      bgColor,
      ...workUpdates
    } = textFields;

    const existingWork = await WorkSchema.findById(id);
    if (!existingWork) {
      return NextResponse.json(
        { success: false, error: "Work not found" },
        { status: 404 }
      );
    }

    const existingFeatured = await FeaturedWork.findOne({ workId: id });

    if (
      Object.keys(workUpdates).length === 0 &&
      Object.keys(uploadedUrls).length === 0 &&
      hasFeaturedWork === undefined
    ) {
      return NextResponse.json(
        { success: true, work: existingWork },
        { status: 200 }
      );
    }

    /** ✅ Merge Work image arrays */
    ["slider1", "slider2"].forEach((field) => {
      if (uploadedUrls[field]?.length) {
        uploadedUrls[field] = [
          ...(existingWork[field] || []),
          ...uploadedUrls[field],
        ];
      } else {
        delete uploadedUrls[field];
      }
    });

    const updatedWork = await WorkSchema.findByIdAndUpdate(
      id,
      {
        ...workUpdates,
        ...uploadedUrls,
        hasFeaturedWork: hasFeaturedWork === "true" || hasFeaturedWork === true,
      },
      { new: true, runValidators: true }
    );

    let updatedFeatured = null;

    if (hasFeaturedWork === "true" || hasFeaturedWork === true) {
      const featuredUpdate = {
        featuredTitle,
        industry,
        bgColor,
        isfeatured: isfeatured === "true" || isfeatured === true,
        workId: id,
      };

      if (uploadedUrls.featuredImages?.length) {
        featuredUpdate.featuredImages = [
          ...(existingFeatured?.featuredImages || []),
          ...uploadedUrls.featuredImages,
        ];
      }

      updatedFeatured = await FeaturedWork.findOneAndUpdate(
        { workId: id },
        featuredUpdate,
        { upsert: true, new: true, runValidators: true }
      );
    } else {
      await FeaturedWork.findOneAndDelete({ workId: id });
    }

    return NextResponse.json(
      { success: true, work: updatedWork, featuredWork: updatedFeatured },
      { status: 200 }
    );
  } catch (err) {
    console.error("PUT /api/work/[id] failed:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/work/[id]
 */
export async function DELETE(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    // 1️⃣ Get the Work before deletion
    const work = await WorkSchema.findById(id);
    if (!work) {
      return NextResponse.json(
        { success: false, error: "Work not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Collect Work file URLs
    const fileUrls = [];
    if (work.thumbnail) fileUrls.push(work.thumbnail);
    if (work.slider1?.length) fileUrls.push(...work.slider1);
    if (work.slider2?.length) fileUrls.push(...work.slider2);
    if (work.featuredImages?.length) fileUrls.push(...work.featuredImages);
    if (work.logo) fileUrls.push(work.logo);
    if (work.banner) fileUrls.push(work.banner);
    if (work.logoDesignImg) fileUrls.push(work.logoDesignImg);
    if (work.designProcessImg) fileUrls.push(work.designProcessImg);

    // 3️⃣ Delete Work files from Firebase
    await Promise.all(
      fileUrls.map(async (url) => {
        const filePath = getFilePathFromUrl(url);
        if (filePath) {
          try {
            await adminStorage.file(filePath).delete();
            console.log(`Deleted Work file: ${filePath}`);
          } catch (err) {
            console.error(
              `Failed to delete Work file ${filePath}:`,
              err.message
            );
          }
        }
      })
    );

    // 4️⃣ Check for associated FeaturedWork
    const featuredWork = await FeaturedWork.findOne({ workId: id });
    if (featuredWork) {
      const fwUrls = [];
      if (featuredWork.featuredImages?.length) {
        fwUrls.push(...featuredWork.featuredImages);
      }

      // Delete FeaturedWork images from Firebase
      await Promise.all(
        fwUrls.map(async (url) => {
          const filePath = getFilePathFromUrl(url);
          if (filePath) {
            try {
              await adminStorage.file(filePath).delete();
              console.log(`Deleted FeaturedWork file: ${filePath}`);
            } catch (err) {
              console.error(
                `Failed to delete FeaturedWork file ${filePath}:`,
                err.message
              );
            }
          }
        })
      );

      // Delete FeaturedWork (middleware will update Work.hasFeaturedWork)
      await FeaturedWork.findOneAndDelete({ workId: id });
    }

    // 5️⃣ Delete Work document
    await WorkSchema.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        message: "Work and related FeaturedWork (with files) deleted",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE /api/work/[id] failed:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
