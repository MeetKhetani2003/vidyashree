import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Course } from "@/models/Course";

export async function GET() {
  try {
    await connectDB();
    const courses = await Course.find({}).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(courses);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    if (!body.title || !body.subtitle || !body.text) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const course = await Course.create({
      title: body.title,
      subtitle: body.subtitle,
      text: body.text,
      points: body.points || [],
      href: body.href || "/enquiry",
      order: body.order ?? 0,
      isHidden: false,
    });
    return NextResponse.json(course, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
