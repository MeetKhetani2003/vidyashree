import mongoose from "mongoose";

export interface IGalleryItem {
  _id: string;
  title: string;
  type: "image" | "video";
  url?: string;
  gridFsId?: string;
  category: string;
  createdAt: Date;
}

const GalleryItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["image", "video"], required: true },
    url: { type: String }, // For video links (YouTube)
    gridFsId: { type: String }, // For uploaded images
    category: { type: String, default: "General" },
  },
  { timestamps: true }
);

// If the model exists, use it, otherwise create a new one
export const GalleryItem =
  mongoose.models.GalleryItem || mongoose.model("GalleryItem", GalleryItemSchema);
