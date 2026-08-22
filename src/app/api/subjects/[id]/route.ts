import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Subject } from "@/models/Subject";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await req.json();
    const updated = await Subject.findByIdAndUpdate(id, { $set: body }, { new: true });
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const item = await Subject.findById(id);
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (item.gridFsId) {
      const db = mongoose.connection.db;
      if (db) {
        const bucket = new GridFSBucket(db, { bucketName: "photos" });
        try { await bucket.delete(new mongoose.Types.ObjectId(item.gridFsId)); } catch {}
      }
    }
    await Subject.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
