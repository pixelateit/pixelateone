// app/api/featured-work/route.js

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Work from "@/models/Work";
import FeaturedWork from "@/models/FeaturedWork";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const fields = searchParams.get("fields");
    const isfeatured = searchParams.get("isfeatured") === "true";

    // Prepare mongoose projection if `fields` query param provided
    let projection = null;
    if (fields) {
      projection = fields.split(",").join(" "); // e.g. ?fields=featuredTitle,industry
    }

    // Build query condition
    const query = {};
    if (isfeatured) query.isfeatured = true;

    // Fetch featured works and populate related work
    const featuredWorks = await FeaturedWork.find(query, projection)
      .populate({
        path: "workId",
        select: "weblink logo timeline deliverables description clientName", // pick only few fields
      })
      .lean();

    if (!featuredWorks || featuredWorks.length === 0) {
      return NextResponse.json(
        { success: false, error: "No featured works found" },
        { status: 404 }
      );
    }

    // Flatten the data: combine featured and work fields
    const mergedData = featuredWorks.map((item) => ({
      _id: item._id,
      featuredTitle: item.featuredTitle,
      industry: item.industry,
      isfeatured: item.isfeatured,
      featuredImages: item.featuredImages,
      bgColor: item.bgColor,
      createdAt: item.createdAt,
      work: item.workId, // keep populated work data under `work`
    }));

    return NextResponse.json(mergedData, { status: 200 });
  } catch (err) {
    console.error("GET /api/featured-work failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch featured works" },
      { status: 500 }
    );
  }
}

// POST create featured work
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const featured = await FeaturedWork.create(body);
    return NextResponse.json(featured, { status: 201 });
  } catch (err) {
    console.error("POST /api/featured-work failed:", err);
    return NextResponse.json(
      { error: "Failed to create featured work" },
      { status: 500 }
    );
  }
}
