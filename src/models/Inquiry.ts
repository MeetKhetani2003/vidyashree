import mongoose from 'mongoose';

export interface IInquiry {
  _id: string;
  student: string;
  parent: string;
  mobile: string;
  email?: string;
  className?: string;
  stream?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

const InquirySchema = new mongoose.Schema(
  {
    student: { type: String, required: true },
    parent: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String },
    className: { type: String },
    stream: { type: String },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Inquiry =
  mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);

