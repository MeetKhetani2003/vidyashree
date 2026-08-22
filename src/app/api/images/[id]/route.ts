import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const db = mongoose.connection.db;

    if (!db) {
      return new NextResponse("Database not connected", { status: 500 });
    }

    const bucket = new GridFSBucket(db, { bucketName: "photos" });
    const objId = new mongoose.Types.ObjectId(id);

    const files = await bucket.find({ _id: objId }).toArray();
    if (files.length === 0) {
      return new NextResponse("File not found", { status: 404 });
    }

    const file = files[0];
    const downloadStream = bucket.openDownloadStream(objId);

    const stream = new ReadableStream({
      start(controller) {
        downloadStream.on("data", (chunk) => controller.enqueue(chunk));
        downloadStream.on("end", () => controller.close());
        downloadStream.on("error", (err) => controller.error(err));
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": (file as any).contentType || file.metadata?.["contentType"] || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("Error serving image:", error);
    return new NextResponse("Error serving image", { status: 500 });
  }
}
