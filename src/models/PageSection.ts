import mongoose from "mongoose";

export interface IPageSection {
  _id: string;
  pageSlug: string;
  order: number;
  type: string;
  title: string;
  eyebrow: string;
  content: string;
  gridFsId?: string;
  imageUrl?: string;
  imageAlt?: string;
  isHidden: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PageSectionSchema = new mongoose.Schema(
  {
    pageSlug: { type: String, required: true, index: true },
    order: { type: Number, default: 0 },
    type: { type: String, required: true, default: "split-grid" },
    title: { type: String },
    eyebrow: { type: String },
    content: { type: String },
    gridFsId: { type: String }, // For uploaded images
    imageUrl: { type: String }, // For static seeded images
    imageAlt: { type: String },
    isHidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const PageSection =
  mongoose.models.PageSection || mongoose.model("PageSection", PageSectionSchema);
