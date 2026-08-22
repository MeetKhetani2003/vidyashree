import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { GalleryItem } from "@/models/GalleryItem";

export async function GET() {
  try {
    await connectDB();
    const items = await GalleryItem.find({}).sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (error: any) {
    console.error("Failed to fetch gallery items:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    
    // For videos, 'url' is required. For images, 'gridFsId' is passed.
    if (!body.title || !body.type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newItem = await GalleryItem.create({
      title: body.title,
      type: body.type,
      url: body.url,
      gridFsId: body.gridFsId,
      category: body.category || "General",
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create gallery item:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
