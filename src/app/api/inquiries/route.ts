import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";

export async function GET() {
  try {
    await connectDB();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    if (!body.student || !body.parent || !body.mobile || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const inquiry = await Inquiry.create({
      student: body.student,
      parent: body.parent,
      mobile: body.mobile,
      email: body.email || "",
      className: body.className || "",
      stream: body.stream || "",
      message: body.message,
      isRead: false,
    });
    return NextResponse.json(inquiry, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
