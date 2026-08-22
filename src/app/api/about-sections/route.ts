import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { AboutSection } from "@/models/AboutSection";

export async function GET(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const visibleOnly = url.searchParams.get("visibleOnly") === "true";

    const query = visibleOnly ? { isHidden: false } : {};
    const items = await AboutSection.find(query).sort({ order: 1, createdAt: 1 });
    
    return NextResponse.json(items);
  } catch (error: any) {
    console.error("Failed to fetch about sections:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newItem = await AboutSection.create({
      order: body.order || 0,
      type: body.type || "split-grid",
      title: body.title,
      eyebrow: body.eyebrow,
      content: body.content,
      gridFsId: body.gridFsId,
      imageUrl: body.imageUrl,
      imageAlt: body.imageAlt,
      isHidden: body.isHidden || false,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create about section:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
