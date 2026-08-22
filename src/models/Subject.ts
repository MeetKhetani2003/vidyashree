import mongoose from "mongoose";

export interface ISubject {
  _id: string;
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  imageUrl?: string;
  gridFsId?: string;
  accent: string;
  icon: string;
  topics: string[];
  order: number;
  isHidden: boolean;
}

const SubjectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    title: { type: String, required: true },
    eyebrow: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    gridFsId: { type: String },
    accent: { type: String, default: "#167878" },
    icon: { type: String, default: "flask" },
    topics: [{ type: String }],
    order: { type: Number, default: 0 },
    isHidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Subject =
  mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
