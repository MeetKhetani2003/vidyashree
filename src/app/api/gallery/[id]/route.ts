import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { GalleryItem } from "@/models/GalleryItem";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const item = await GalleryItem.findById(id);
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    if (item.type === "image" && item.gridFsId) {
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

    await GalleryItem.findByIdAndDelete(id);

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete gallery item:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
