import mongoose from "mongoose";

export interface ICourse {
  _id: string;
  title: string;
  subtitle: string;
  text: string;
  points: string[];
  href: string;
  order: number;
  isHidden: boolean;
}

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    text: { type: String, required: true },
    points: [{ type: String }],
    href: { type: String, default: "/enquiry" },
    order: { type: Number, default: 0 },
    isHidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Course =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);
