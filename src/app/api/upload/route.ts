import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();
    const db = mongoose.connection.db;

    if (!db) {
      return NextResponse.json({ error: "Database not connected" }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Create GridFS bucket
    const bucket = new GridFSBucket(db, {
      bucketName: "photos"
    });

    // Upload the file buffer to GridFS
    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: { contentType: file.type },
    });

    const fileId = uploadStream.id;
    uploadStream.end(buffer);

    // Wait for the stream to finish
    await new Promise((resolve, reject) => {
      uploadStream.on("finish", resolve);
      uploadStream.on("error", reject);
    });

    return NextResponse.json({ 
      message: "File uploaded successfully",
      gridFsId: fileId.toString()
    });

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
