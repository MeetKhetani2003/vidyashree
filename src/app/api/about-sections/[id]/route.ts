import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { AboutSection } from "@/models/AboutSection";
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

    const updatedItem = await AboutSection.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updatedItem) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    return NextResponse.json(updatedItem);
  } catch (error: any) {
    console.error("Failed to update about section:", error);
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

    const item = await AboutSection.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Section not found" }, { status: 404 });
    }

    if (item.gridFsId) {
      const db = mongoose.connection.db;
      if (db) {
        const bucket = new GridFSBucket(db, { bucketName: "photos" });
        try {
          await bucket.delete(new mongoose.Types.ObjectId(item.gridFsId));
        } catch (err) {
          console.error("Error deleting from GridFS:", err);
        }
      }
    }

    await AboutSection.findByIdAndDelete(id);

    return NextResponse.json({ message: "Section deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete about section:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
