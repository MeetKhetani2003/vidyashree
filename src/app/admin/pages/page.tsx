"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

type PageSection = {
  _id: string;
  pageSlug: string;
  order: number;
  type: string;
  title: string;
  eyebrow: string;
  content: string;
  gridFsId?: string;
  imageUrl?: string;
  isHidden: boolean;
};

const PAGES = [
  { slug: "home", label: "Home Page" },
  { slug: "about", label: "About Page" },
  { slug: "courses", label: "Courses Page" },
  { slug: "why-us", label: "Why Us Page" },
  { slug: "facilities", label: "Campus Life / Facilities" },
];

export default function AdminPagesPage() {
  const [selectedSlug, setSelectedSlug] = useState("home");
  const [sections, setSections] = useState<PageSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PageSection>>({});
  const [editFile, setEditFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSections = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/page-sections?pageSlug=${selectedSlug}`);
      const data = await res.json();
      setSections(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selectedSlug]);

  useEffect(() => {
    fetchSections();
    setEditingId(null);
  }, [fetchSections]);

  const handleToggleHide = async (id: string, currentIsHidden: boolean) => {
    await fetch(`/api/page-sections/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isHidden: !currentIsHidden }),
    });
    fetchSections();
  };

  const startEdit = (section: PageSection) => {
    setEditingId(section._id);
    setEditForm({ ...section });
    setEditFile(null);
  };

  const cancelEdit = () => { setEditingId(null); setEditForm({}); setEditFile(null); };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setIsSaving(true);
    try {
      let gridFsId = editForm.gridFsId;
      if (editFile) {
        const formData = new FormData();
        formData.append("file", editFile);
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const uploadData = await uploadRes.json();
        if (uploadData.error) throw new Error(uploadData.error);
        gridFsId = uploadData.gridFsId;
      }
      await fetch(`/api/page-sections/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editForm, gridFsId }),
      });
      cancelEdit();
      fetchSections();
    } catch (err) {
      alert("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const currentPageLabel = PAGES.find(p => p.slug === selectedSlug)?.label || selectedSlug;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">Website Page Manager</h1>
      <p className="text-slate-500 mb-8">Edit the content, images, and visibility of sections on each page of your website.</p>

      {/* Page Selector */}
      <div className="flex flex-wrap gap-2 mb-10">
        {PAGES.map(page => (
          <button
            key={page.slug}
            onClick={() => setSelectedSlug(page.slug)}
            className={`px-5 py-2.5 rounded-full font-semibold transition-all ${
              selectedSlug === page.slug
                ? "bg-slate-900 text-white shadow-md"
                : "bg-white text-slate-600 border border-slate-200 hover:border-slate-400"
            }`}
          >
            {page.label}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-700">{currentPageLabel} — Sections</h2>
        <span className="text-sm text-slate-400">{sections.length} section{sections.length !== 1 ? "s" : ""}</span>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-slate-400">Loading sections...</div>
      ) : sections.length === 0 ? (
        <div className="text-center py-20 text-slate-400 bg-white rounded-xl border border-dashed border-slate-200">
          No editable sections found for this page yet.
        </div>
      ) : (
        <div className="space-y-5">
          {sections.map((section) => (
            <div
              key={section._id}
              className={`bg-white rounded-xl border transition-all ${
                section.isHidden ? "border-dashed border-slate-200 opacity-60" : "border-slate-200 shadow-sm"
              }`}
            >
              {editingId === section._id ? (
                <form onSubmit={saveEdit} className="p-6 grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Eyebrow Text</label>
                      <input type="text" value={editForm.eyebrow || ""} onChange={(e) => setEditForm({ ...editForm, eyebrow: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Title (HTML allowed)</label>
                      <input type="text" value={editForm.title || ""} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm" />
                    </div>
                    {section.type !== "director-message" && (
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Replace Image</label>
                        <input type="file" accept="image/*" onChange={(e) => setEditFile(e.target.files?.[0] || null)} className="w-full text-sm text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700" />
                        {(editForm.imageUrl || editForm.gridFsId) && (
                          <p className="text-xs text-slate-400 mt-1">Current image: {editForm.gridFsId ? "Uploaded photo" : editForm.imageUrl}</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Content / Body Text (HTML)</label>
                      <textarea value={editForm.content || ""} onChange={(e) => setEditForm({ ...editForm, content: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-sm font-mono h-40" />
                    </div>
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                    <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 font-medium text-sm transition-colors">Cancel</button>
                    <button type="submit" disabled={isSaving} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm">
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-5 flex gap-5">
                  {/* Thumbnail */}
                  <div className="w-28 h-24 bg-slate-100 rounded-lg flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                    {section.gridFsId ? (
                      <Image src={`/api/images/${section.gridFsId}`} alt={section.title} fill className="object-cover" />
                    ) : section.imageUrl ? (
                      <Image src={section.imageUrl} alt={section.title} fill className="object-cover" />
                    ) : (
                      <span className="text-xs text-slate-400 text-center px-2">No Image</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-2">
                      <div className="min-w-0">
                        {section.eyebrow && <p className="text-xs font-bold text-red-500 uppercase tracking-widest mb-0.5">{section.eyebrow}</p>}
                        <h3 className="text-base font-bold text-slate-800 truncate" dangerouslySetInnerHTML={{ __html: section.title || "" }} />
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => handleToggleHide(section._id, section.isHidden)} className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors ${section.isHidden ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                          {section.isHidden ? "Show" : "Hide"}
                        </button>
                        <button onClick={() => startEdit(section)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
                          Edit
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2" dangerouslySetInnerHTML={{ __html: section.content?.replace(/<[^>]*>/g, ' ').slice(0, 160) || "" }} />
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-mono">{section.type}</span>
                      {section.isHidden && <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded font-bold">HIDDEN</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
