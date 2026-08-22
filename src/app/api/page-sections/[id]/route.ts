import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { PageSection } from "@/models/PageSection";
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
    const updated = await PageSection.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
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
    const item = await PageSection.findById(id);
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (item.gridFsId) {
      const db = mongoose.connection.db;
      if (db) {
        const bucket = new GridFSBucket(db, { bucketName: "photos" });
        try {
          await bucket.delete(new mongoose.Types.ObjectId(item.gridFsId));
        } catch {}
      }
    }

    await PageSection.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
