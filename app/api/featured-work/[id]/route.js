// app/api/featured-work/[id]/route.js

import { NextResponse } from "next/server";
import {
  getFeaturedById,
  updateFeaturedById,
  deleteFeaturedById,
} from "@/lib/featuredWorkService";

// GET one featured work by FeaturedWork ID
export async function GET(req, { params }) {
  try {
    const featured = await getFeaturedById(params.id, true);
    if (!featured)
      return NextResponse.json(
        { error: "Featured Work not found" },
        { status: 404 }
      );
    return NextResponse.json(featured);
  } catch (err) {
    console.error("GET /api/featured-work/:id failed:", err);
    return NextResponse.json(
      { error: "Failed to fetch featured work" },
      { status: 500 }
    );
  }
}

// PUT update featured work
export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const updated = await updateFeaturedById(params.id, body);
    if (!updated)
      return NextResponse.json(
        { error: "Featured Work not found" },
        { status: 404 }
      );
    return NextResponse.json(updated);
  } catch (err) {
    console.error("PUT /api/featured-work/:id failed:", err);
    return NextResponse.json(
      { error: "Failed to update featured work" },
      { status: 500 }
    );
  }
}

// DELETE featured work
export async function DELETE(req, { params }) {
  try {
    const deleted = await deleteFeaturedById(params.id);
    if (!deleted)
      return NextResponse.json(
        { error: "Featured Work not found" },
        { status: 404 }
      );
    return NextResponse.json({ message: "Featured Work deleted successfully" });
  } catch (err) {
    console.error("DELETE /api/featured-work/:id failed:", err);
    return NextResponse.json(
      { error: "Failed to delete featured work" },
      { status: 500 }
    );
  }
}
