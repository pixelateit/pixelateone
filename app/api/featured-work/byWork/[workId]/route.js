// app/api/featured-work/byWork/[workId]/route.js

import { NextResponse } from "next/server";
import {
  getFeaturedByWorkId,
  updateFeaturedByWorkId,
  deleteFeaturedByWorkId,
  createFeaturedForWork,
} from "@/lib/featuredWorkService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET featured work by workId
export async function GET(req, { params }) {
  try {
    const featured = await getFeaturedByWorkId(params.workId, true);
    if (!featured)
      return NextResponse.json(
        { error: "Featured Work not found" },
        { status: 404 },
      );
    return NextResponse.json(featured);
  } catch (err) {
    console.error("GET /api/featured-work/byWork/:workId failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch featured work" },
      { status: 500 },
    );
  }
}

// PUT update featured work by workId
export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      console.log("❌ Unauthorized: No session found");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const updated = await updateFeaturedByWorkId(params.workId, body);
    if (!updated)
      return NextResponse.json(
        { error: "Featured Work not found" },
        { status: 404 },
      );
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/featured-work/byWork/:workId failed:", err);
    return NextResponse.json(
      { error: "Failed to update featured work" },
      { status: 500 },
    );
  }
}

// DELETE featured work by workId
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

    const deleted = await deleteFeaturedByWorkId(params.workId);
    if (!deleted)
      return NextResponse.json(
        { error: "Featured Work not found" },
        { status: 404 },
      );
    return NextResponse.json({ message: "Featured Work deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/featured-work/byWork/:workId failed:", err);
    return NextResponse.json(
      { error: "Failed to delete featured work" },
      { status: 500 },
    );
  }
}

// POST create featured work for a workId
export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      console.log("❌ Unauthorized: No session found");
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await req.json();
    const created = await createFeaturedForWork(params.workId, body);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("POST /api/featured-work/byWork/:workId failed:", err);
    return NextResponse.json(
      { error: "Failed to create featured work" },
      { status: 500 },
    );
  }
}
