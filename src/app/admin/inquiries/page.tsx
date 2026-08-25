"use client";

import { useState, useEffect } from "react";

type Inquiry = {
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
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/inquiries");
      const data = await res.json();
      setInquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this inquiry?")) return;
    await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
    fetchInquiries();
  };

  const handleWhatsApp = (inquiry: Inquiry) => {
    const text = `Hi ${inquiry.student}, regarding your inquiry:\n"${inquiry.message}"\nWe would like to connect!`;
    const whatsappUrl = `https://wa.me/${inquiry.mobile.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Inquiries</h1>
          <p className="text-slate-500 mt-1">View and manage form inquiries from students and parents.</p>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-slate-400">Loading inquiries...</div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-20 text-slate-400 bg-white border border-slate-200 rounded-xl shadow-sm">
          No inquiries found.
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((inquiry, idx) => (
            <div key={inquiry._id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{inquiry.student}</h3>
                  <p className="text-sm text-slate-500">Parent: {inquiry.parent}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => handleWhatsApp(inquiry)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-green-100 text-green-700 hover:bg-green-200">
                    Reply on WhatsApp
                  </button>
                  <button onClick={() => handleDelete(inquiry._id)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-100 text-red-700 hover:bg-red-200">
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                <div>
                  <p><strong>Mobile:</strong> {inquiry.mobile}</p>
                  <p><strong>Email:</strong> {inquiry.email || "N/A"}</p>
                </div>
                <div>
                  <p><strong>Class:</strong> {inquiry.className || "N/A"}</p>
                  <p><strong>Stream:</strong> {inquiry.stream || "N/A"}</p>
                </div>
              </div>
              <div className="mt-4 bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-700 font-medium">Message:</p>
                <p className="text-sm text-slate-600 mt-1 whitespace-pre-wrap">{inquiry.message}</p>
              </div>
              <p className="text-xs text-slate-400 mt-4">
                Received: {new Date(inquiry.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
