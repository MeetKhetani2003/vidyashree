import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { PageSection } from "@/models/PageSection";

export async function GET(req: Request) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const pageSlug = url.searchParams.get("pageSlug");
    const visibleOnly = url.searchParams.get("visibleOnly") === "true";

    const query: Record<string, any> = {};
    if (pageSlug) query.pageSlug = pageSlug;
    if (visibleOnly) query.isHidden = false;

    const items = await PageSection.find(query).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const newItem = await PageSection.create(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
