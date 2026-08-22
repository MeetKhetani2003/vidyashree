import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Subject } from "@/models/Subject";

export async function GET() {
  try {
    await connectDB();
    const subjects = await Subject.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(subjects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    if (!body.title || !body.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const slug = body.slug || body.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const subject = await Subject.create({ ...body, slug });
    return NextResponse.json(subject, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
