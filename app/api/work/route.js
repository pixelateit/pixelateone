// app/api/work/route.js

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { adminStorage } from "@/lib/firebaseAdmin";
import dbConnect from "@/lib/dbConnect"; // your Mongo connection helper
import WorkSchema from "@/models/Work"; // your Mongoose model
import { v4 as uuidv4 } from "uuid";
import FeaturedWork from "@/models/FeaturedWork";
import User from "@/models/User";

export async function POST(req) {
  try {
    await dbConnect();

    // ---- Auth check ----
    const session = await getServerSession(authOptions);
    if (!session?.user?.id && !session?.user?._id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    // ---- Separate text fields & files ----
    const textFields = {};
    const fileMap = {
      logo: "works",
      thumbnail: "works",
      typography: "works",
      banner: "works",
      logoDesignImg: "works",
      designProcessImg: "works",
      slider1: "works/slider1",
      slider2: "works/slider2",
      featuredImages: "works/featuredImages",
    };

    // Collect text values
    for (const [key, value] of formData.entries()) {
      if (!fileMap[key]) {
        textFields[key] = value;
      }
    }

    // Inject createdBy securely
    textFields.createdBy = session.user.id || session.user._id;
    // textFields.dateCreated = new Date();

    // Collect files
    const uploads = [];
    const uploadedUrls = { slider1: [], slider2: [], featuredImages: [] };

    for (const [key, value] of formData.entries()) {
      if (fileMap[key] && typeof value !== "string") {
        const folder = fileMap[key];
        const fileName = `${folder}/${Date.now()}-${uuidv4()}-${value.name}`;
        const fileRef = adminStorage.file(fileName);

        // buffer
        const buffer = Buffer.from(await value.arrayBuffer());

        // upload task
        const uploadPromise = fileRef
          .save(buffer, {
            metadata: { contentType: value.type },
            resumable: false,
          })
          .then(async () => {
            const [url] = await fileRef.getSignedUrl({
              action: "read",
              expires: "03-09-2099",
            });

            // if multi-file
            if (["slider1", "slider2", "featuredImages"].includes(key)) {
              uploadedUrls[key].push(url);
            } else {
              uploadedUrls[key] = url;
            }
          });

        uploads.push(uploadPromise);
      }
    }

    // ---- Upload all files simultaneously ----
    await Promise.all(uploads);

    // ---- Merge all data ----
    const newWork = await WorkSchema.create({
      ...textFields,
      ...uploadedUrls,
    });

    // if featured work, also create FeaturedWork entry
    if (
      textFields.hasFeaturedWork === "true" ||
      textFields.hasFeaturedWork === true
    ) {
      await FeaturedWork.create({
        featuredTitle: textFields.featuredTitle,
        industry: textFields.industry,
        isfeatured: textFields.isfeatured,
        featuredImages: uploadedUrls.featuredImages || [],
        workId: newWork._id,
      });
    }

    return NextResponse.json({ success: true, work: newWork }, { status: 201 });
  } catch (err) {
    console.error("Error uploading work:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const fields = searchParams.get("fields"); // e.g. ?fields=title,description
    const showWork = searchParams.get("showWork"); // e.g. ?showWork=true

    let filter = {};
    if (showWork === "true") {
      filter = { showWork: true };
    }

    let projection = null;
    if (fields) {
      projection = fields.split(",").join(" "); // mongoose projection
    }

    // fetch works
    const works = await WorkSchema.find(filter, projection).lean();

    const createdByUserNames = {}; // cache for user names

    // Resolve all user lookups in parallel
    await Promise.all(
      works.map(async (work) => {
        // ensure _id and createdBy are strings
        work._id = work._id.toString();
        const createdById = work.createdBy ? work.createdBy.toString() : null;

        if (createdById) {
          if (!createdByUserNames[createdById]) {
            const user = await User.findById(createdById).select("name").lean();
            createdByUserNames[createdById] = user ? user.name : "Unknown";
          }
          work.createdBy = createdByUserNames[createdById];
        } else {
          work.createdBy = "Unknown";
        }
      })
    );

    // fetch featured works linked to those works
    const featuredWorks = await FeaturedWork.find({
      workId: { $in: works.map((w) => w._id) },
    })
      .lean()
      .exec();

    // attach featuredWork to each work
    const worksWithFeatured = works.map((work) => {
      const featured = featuredWorks.find(
        (fw) => fw.workId.toString() === work._id.toString()
      );
      return { ...work, featuredWork: featured || null };
    });

    return NextResponse.json(
      { success: true, works: worksWithFeatured },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching works:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
