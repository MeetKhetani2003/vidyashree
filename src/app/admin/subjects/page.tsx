"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Subject = {
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
};

const ICON_OPTIONS = [
  { value: "flask", label: "⚗️ Flask (Chemistry)" },
  { value: "atom", label: "⚛️ Atom (Physics)" },
  { value: "leaf", label: "🌿 Leaf (Biology)" },
  { value: "book", label: "📚 Book (English)" },
  { value: "award", label: "🏆 Award (IT/General)" },
  { value: "calculator", label: "🧮 Calculator (Maths)" },
];

const BLANK_FORM = {
  title: "",
  eyebrow: "",
  description: "",
  accent: "#167878",
  icon: "flask",
  topics: [""],
};

export default function AdminSubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ ...BLANK_FORM });
  const [addFile, setAddFile] = useState<File | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Subject>>({});
  const [editFile, setEditFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/subjects");
      const data = await res.json();
      setSubjects(Array.isArray(data) ? data : []);
    } catch { } finally { setIsLoading(false); }
  };

  useEffect(() => { fetchSubjects(); }, []);

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    return data.gridFsId as string;
  };

  const updateAddTopic = (i: number, v: string) => { const t = [...addForm.topics]; t[i] = v; setAddForm({ ...addForm, topics: t }); };
  const addAddTopic = () => setAddForm({ ...addForm, topics: [...addForm.topics, ""] });
  const removeAddTopic = (i: number) => setAddForm({ ...addForm, topics: addForm.topics.filter((_, idx) => idx !== i) });

  const updateEditTopic = (i: number, v: string) => { const t = [...(editForm.topics || [])]; t[i] = v; setEditForm({ ...editForm, topics: t }); };
  const addEditTopic = () => setEditForm({ ...editForm, topics: [...(editForm.topics || []), ""] });
  const removeEditTopic = (i: number) => setEditForm({ ...editForm, topics: (editForm.topics || []).filter((_, idx) => idx !== i) });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      let gridFsId = undefined;
      if (addFile) gridFsId = await uploadFile(addFile);
      await fetch("/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...addForm,
          topics: addForm.topics.filter(t => t.trim()),
          gridFsId,
          order: subjects.length,
        }),
      });
      setAddForm({ ...BLANK_FORM });
      setAddFile(null);
      setShowAddForm(false);
      fetchSubjects();
    } catch { alert("Failed to add subject"); } finally { setIsAdding(false); }
  };

  const handleToggleHide = async (id: string, current: boolean) => {
    await fetch(`/api/subjects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isHidden: !current }),
    });
    fetchSubjects();
  };

  const startEdit = (s: Subject) => { setEditingId(s._id); setEditForm({ ...s }); setEditFile(null); };
  const cancelEdit = () => { setEditingId(null); setEditForm({}); setEditFile(null); };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setIsSaving(true);
    try {
      let gridFsId = editForm.gridFsId;
      if (editFile) gridFsId = await uploadFile(editFile);
      await fetch(`/api/subjects/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editForm, gridFsId, topics: (editForm.topics || []).filter(t => t.trim()) }),
      });
      cancelEdit();
      fetchSubjects();
    } catch { alert("Failed to save"); } finally { setIsSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this subject?")) return;
    await fetch(`/api/subjects/${id}`, { method: "DELETE" });
    fetchSubjects();
  };

  const inputClass = "w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500";
  const labelClass = "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1";

  const renderTopicsEditor = (topics: string[], onUpdate: (i: number, v: string) => void, onAdd: () => void, onRemove: (i: number) => void) => (
    <div className="space-y-2">
      {topics.map((topic, i) => (
        <div key={i} className="flex gap-2">
          <input type="text" value={topic} onChange={e => onUpdate(i, e.target.value)} className={inputClass} placeholder={`Topic ${i + 1}`} />
          {topics.length > 1 && <button type="button" onClick={() => onRemove(i)} className="px-3 text-red-500 hover:bg-red-50 rounded-lg text-sm font-bold">✕</button>}
        </div>
      ))}
      <button type="button" onClick={onAdd} className="text-blue-600 text-sm font-semibold hover:underline">+ Add topic</button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Subjects</h1>
          <p className="text-slate-500 mt-1">Manage subjects displayed on the Subjects page and Homepage.</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${showAddForm ? "bg-slate-200 text-slate-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
          {showAddForm ? "Cancel" : "+ Add Subject"}
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl border border-blue-200 shadow-sm p-6 mb-8">
          <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">NEW</span> Add Subject
          </h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>Subject Name *</label>
              <input required type="text" value={addForm.title} onChange={e => setAddForm({ ...addForm, title: e.target.value })} className={inputClass} placeholder="e.g. Chemistry" />
            </div>
            <div>
              <label className={labelClass}>Eyebrow (tagline)</label>
              <input type="text" value={addForm.eyebrow} onChange={e => setAddForm({ ...addForm, eyebrow: e.target.value })} className={inputClass} placeholder="e.g. Reactions · patterns · precision" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClass}>Description *</label>
              <textarea required value={addForm.description} onChange={e => setAddForm({ ...addForm, description: e.target.value })} className={`${inputClass} h-20`} placeholder="Short description of the subject..." />
            </div>
            <div>
              <label className={labelClass}>Icon</label>
              <select value={addForm.icon} onChange={e => setAddForm({ ...addForm, icon: e.target.value })} className={inputClass}>
                {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Accent Colour</label>
              <div className="flex gap-2 items-center">
                <input type="color" value={addForm.accent} onChange={e => setAddForm({ ...addForm, accent: e.target.value })} className="h-10 w-14 rounded border border-slate-300 cursor-pointer" />
                <input type="text" value={addForm.accent} onChange={e => setAddForm({ ...addForm, accent: e.target.value })} className={`${inputClass} flex-1`} placeholder="#167878" />
              </div>
            </div>
            <div>
              <label className={labelClass}>Subject Photo</label>
              <input type="file" accept="image/*" onChange={e => setAddFile(e.target.files?.[0] || null)} className="w-full text-sm text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700" />
            </div>
            <div>
              <label className={labelClass}>Topics Covered</label>
              {renderTopicsEditor(addForm.topics, updateAddTopic, addAddTopic, removeAddTopic)}
            </div>
          </div>
          <div className="flex justify-end pt-4 mt-4 border-t border-slate-100">
            <button type="submit" disabled={isAdding} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 text-sm">
              {isAdding ? "Adding..." : "Add Subject"}
            </button>
          </div>
        </form>
      )}

      {/* Subjects List */}
      {isLoading ? (
        <div className="text-center py-20 text-slate-400">Loading subjects...</div>
      ) : (
        <div className="space-y-4">
          {subjects.map((subject) => (
            <div key={subject._id} className={`bg-white rounded-xl border transition-all ${subject.isHidden ? "border-dashed border-slate-200 opacity-60" : "border-slate-200 shadow-sm"}`}>
              {editingId === subject._id ? (
                <form onSubmit={saveEdit} className="p-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Subject Name</label>
                      <input type="text" value={editForm.title || ""} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Eyebrow (tagline)</label>
                      <input type="text" value={editForm.eyebrow || ""} onChange={e => setEditForm({ ...editForm, eyebrow: e.target.value })} className={inputClass} />
                    </div>
                    <div className="md:col-span-2">
                      <label className={labelClass}>Description</label>
                      <textarea value={editForm.description || ""} onChange={e => setEditForm({ ...editForm, description: e.target.value })} className={`${inputClass} h-20`} />
                    </div>
                    <div>
                      <label className={labelClass}>Icon</label>
                      <select value={editForm.icon || "flask"} onChange={e => setEditForm({ ...editForm, icon: e.target.value })} className={inputClass}>
                        {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Accent Colour</label>
                      <div className="flex gap-2 items-center">
                        <input type="color" value={editForm.accent || "#167878"} onChange={e => setEditForm({ ...editForm, accent: e.target.value })} className="h-10 w-14 rounded border border-slate-300 cursor-pointer" />
                        <input type="text" value={editForm.accent || ""} onChange={e => setEditForm({ ...editForm, accent: e.target.value })} className={`${inputClass} flex-1`} />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Replace Photo</label>
                      <input type="file" accept="image/*" onChange={e => setEditFile(e.target.files?.[0] || null)} className="w-full text-sm text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700" />
                      <p className="text-xs text-slate-400 mt-1">Current: {subject.gridFsId ? "Uploaded photo" : subject.imageUrl}</p>
                    </div>
                    <div>
                      <label className={labelClass}>Topics Covered</label>
                      {renderTopicsEditor(editForm.topics || [], updateEditTopic, addEditTopic, removeEditTopic)}
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-slate-100">
                    <button type="button" onClick={cancelEdit} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Cancel</button>
                    <button type="submit" disabled={isSaving} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 text-sm">
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-5 flex gap-4">
                  {/* Subject thumbnail */}
                  <div className="w-24 h-24 rounded-lg flex-shrink-0 relative overflow-hidden" style={{ background: `${subject.accent}22`, border: `2px solid ${subject.accent}44` }}>
                    {subject.gridFsId ? (
                      <Image src={`/api/images/${subject.gridFsId}`} alt={subject.title} fill className="object-cover" />
                    ) : subject.imageUrl ? (
                      <Image src={subject.imageUrl} alt={subject.title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-2xl">📚</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 inset-x-0 h-1" style={{ background: subject.accent }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: subject.accent }}>{subject.eyebrow}</p>
                        <h3 className="font-bold text-slate-800 text-lg">{subject.title}</h3>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => handleToggleHide(subject._id, subject.isHidden)} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${subject.isHidden ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                          {subject.isHidden ? "Show" : "Hide"}
                        </button>
                        <button onClick={() => startEdit(subject)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200">Edit</button>
                        <button onClick={() => handleDelete(subject._id)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-100 text-red-700 hover:bg-red-200">Delete</button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 line-clamp-2">{subject.description}</p>
                    {subject.topics?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {subject.topics.map((t, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full border text-slate-600" style={{ borderColor: `${subject.accent}66`, background: `${subject.accent}11` }}>{t}</span>
                        ))}
                      </div>
                    )}
                    {subject.isHidden && <span className="mt-2 inline-block text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded font-bold">HIDDEN</span>}
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
