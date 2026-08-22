import mongoose from "mongoose";

export interface IAboutSection {
  _id: string;
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

const AboutSectionSchema = new mongoose.Schema(
  {
    order: { type: Number, default: 0 },
    type: { type: String, required: true, default: "split-grid" },
    title: { type: String, required: true },
    eyebrow: { type: String },
    content: { type: String, required: true },
    gridFsId: { type: String }, // For uploaded images
    imageUrl: { type: String }, // For static seeded images
    imageAlt: { type: String },
    isHidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AboutSection =
  mongoose.models.AboutSection || mongoose.model("AboutSection", AboutSectionSchema);
