"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type AboutSection = {
  _id: string;
  order: number;
  type: string;
  title: string;
  eyebrow: string;
  content: string;
  gridFsId?: string;
  imageUrl?: string;
  isHidden: boolean;
};

export default function AdminAboutPage() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Edit State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<AboutSection>>({});
  const [editFile, setEditFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSections = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/about-sections");
      const data = await res.json();
      setSections(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const handleToggleHide = async (id: string, currentIsHidden: boolean) => {
    try {
      const res = await fetch(`/api/about-sections/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isHidden: !currentIsHidden }),
      });
      if (res.ok) fetchSections();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (section: AboutSection) => {
    setEditingId(section._id);
    setEditForm({ ...section });
    setEditFile(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
    setEditFile(null);
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setIsSaving(true);

    try {
      let gridFsId = editForm.gridFsId;
      
      if (editFile) {
        const formData = new FormData();
        formData.append("file", editFile);
        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.error) throw new Error(uploadData.error);
        gridFsId = uploadData.gridFsId;
      }

      const res = await fetch(`/api/about-sections/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...editForm,
          gridFsId,
        }),
      });

      if (res.ok) {
        cancelEdit();
        fetchSections();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update section");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Manage About Page Sections</h1>
      
      {isLoading ? (
        <div className="text-center py-10 text-slate-500">Loading sections...</div>
      ) : sections.length === 0 ? (
        <div className="text-center py-10 text-slate-500 bg-white rounded-lg border border-slate-200">No sections found.</div>
      ) : (
        <div className="space-y-6">
          {sections.map((section) => (
            <div key={section._id} className={`bg-white rounded-lg shadow-sm border ${section.isHidden ? 'border-dashed border-slate-300 opacity-70' : 'border-slate-200'}`}>
              
              {editingId === section._id ? (
                <form onSubmit={saveEdit} className="p-6 grid md:grid-cols-2 gap-6 bg-slate-50 rounded-lg">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Eyebrow</label>
                      <input type="text" value={editForm.eyebrow || ""} onChange={(e) => setEditForm({...editForm, eyebrow: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Title</label>
                      <input type="text" required value={editForm.title || ""} onChange={(e) => setEditForm({...editForm, title: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-1">Content (HTML allowed)</label>
                      <textarea required value={editForm.content || ""} onChange={(e) => setEditForm({...editForm, content: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500 h-32 font-mono text-sm" />
                    </div>
                    {section.type !== 'values-grid' && (
                      <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Replace Image</label>
                        <input type="file" accept="image/*" onChange={(e) => setEditFile(e.target.files?.[0] || null)} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                    <button type="button" onClick={cancelEdit} className="px-4 py-2 rounded font-medium text-slate-600 hover:bg-slate-200 transition-colors">Cancel</button>
                    <button type="submit" disabled={isSaving} className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-6 flex gap-6">
                  <div className="w-32 h-32 bg-slate-100 rounded flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                    {section.gridFsId ? (
                      <Image src={`/api/images/${section.gridFsId}`} alt={section.title} fill className="object-cover" />
                    ) : section.imageUrl ? (
                      <Image src={section.imageUrl} alt={section.title} fill className="object-cover" />
                    ) : (
                      <span className="text-xs text-slate-400">No Image</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-xs font-bold text-red-600 uppercase tracking-widest">{section.eyebrow}</p>
                        <h3 className="text-xl font-bold text-slate-800" dangerouslySetInnerHTML={{ __html: section.title }} />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => handleToggleHide(section._id, section.isHidden)} className={`px-3 py-1.5 text-xs font-bold rounded ${section.isHidden ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                          {section.isHidden ? "Show" : "Hide"}
                        </button>
                        <button onClick={() => startEdit(section)} className="px-3 py-1.5 text-xs font-bold rounded bg-blue-100 text-blue-700 hover:bg-blue-200">
                          Edit Content & Image
                        </button>
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 line-clamp-3 bg-slate-50 p-3 rounded font-mono" dangerouslySetInnerHTML={{ __html: section.content }} />
                    <div className="mt-3 flex gap-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-mono">{section.type}</span>
                      {section.isHidden && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold">HIDDEN</span>}
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
