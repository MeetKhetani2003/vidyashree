"use client";

import { useState, useEffect } from "react";

type Course = {
  _id: string;
  title: string;
  subtitle: string;
  text: string;
  points: string[];
  href: string;
  order: number;
  isHidden: boolean;
};

const BLANK_FORM = { title: "", subtitle: "", text: "", points: [""], href: "/enquiry" };

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ ...BLANK_FORM });
  const [isAdding, setIsAdding] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Course>>({});
  const [isSaving, setIsSaving] = useState(false);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchCourses(); }, []);

  // Points helpers
  const updateAddPoint = (index: number, value: string) => {
    const points = [...addForm.points];
    points[index] = value;
    setAddForm({ ...addForm, points });
  };
  const addPoint = () => setAddForm({ ...addForm, points: [...addForm.points, ""] });
  const removeAddPoint = (index: number) => setAddForm({ ...addForm, points: addForm.points.filter((_, i) => i !== index) });

  const updateEditPoint = (index: number, value: string) => {
    const points = [...(editForm.points || [])];
    points[index] = value;
    setEditForm({ ...editForm, points });
  };
  const addEditPoint = () => setEditForm({ ...editForm, points: [...(editForm.points || []), ""] });
  const removeEditPoint = (index: number) => setEditForm({ ...editForm, points: (editForm.points || []).filter((_, i) => i !== index) });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...addForm, points: addForm.points.filter(p => p.trim()), order: courses.length }),
      });
      if (res.ok) {
        setAddForm({ ...BLANK_FORM });
        setShowAddForm(false);
        fetchCourses();
      }
    } catch (err) {
      alert("Failed to add course");
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleHide = async (id: string, current: boolean) => {
    await fetch(`/api/courses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isHidden: !current }),
    });
    fetchCourses();
  };

  const startEdit = (course: Course) => { setEditingId(course._id); setEditForm({ ...course }); };
  const cancelEdit = () => { setEditingId(null); setEditForm({}); };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingId) return;
    setIsSaving(true);
    try {
      await fetch(`/api/courses/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editForm, points: (editForm.points || []).filter(p => p.trim()) }),
      });
      cancelEdit();
      fetchCourses();
    } catch {
      alert("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Permanently delete this course?")) return;
    await fetch(`/api/courses/${id}`, { method: "DELETE" });
    fetchCourses();
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Course Tracks</h1>
          <p className="text-slate-500 mt-1">Add, edit, or hide programmes displayed on the Courses page.</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors ${showAddForm ? "bg-slate-200 text-slate-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
          {showAddForm ? "Cancel" : "+ Add Course"}
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="bg-white rounded-xl border border-blue-200 shadow-sm p-6 mb-8 space-y-5">
          <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">NEW</span> Add Course Track
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Programme Name *</label>
              <input required type="text" value={addForm.title} onChange={e => setAddForm({ ...addForm, title: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" placeholder="e.g. Foundation · Class XI" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Subtitle *</label>
              <input required type="text" value={addForm.subtitle} onChange={e => setAddForm({ ...addForm, subtitle: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" placeholder="e.g. Start with a strong first step" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Description *</label>
            <textarea required value={addForm.text} onChange={e => setAddForm({ ...addForm, text: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 h-24" placeholder="Describe what this programme offers..." />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Bullet Points (Features)</label>
            <div className="space-y-2">
              {addForm.points.map((point, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={point} onChange={e => updateAddPoint(i, e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" placeholder={`Feature ${i + 1}`} />
                  {addForm.points.length > 1 && (
                    <button type="button" onClick={() => removeAddPoint(i)} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm font-bold">✕</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addPoint} className="text-blue-600 text-sm font-semibold hover:underline">+ Add point</button>
            </div>
          </div>
          <div className="flex justify-end pt-2 border-t border-slate-100">
            <button type="submit" disabled={isAdding} className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 text-sm transition-colors">
              {isAdding ? "Adding..." : "Add Course Track"}
            </button>
          </div>
        </form>
      )}

      {/* Courses List */}
      {isLoading ? (
        <div className="text-center py-20 text-slate-400">Loading courses...</div>
      ) : (
        <div className="space-y-4">
          {courses.map((course, idx) => (
            <div key={course._id} className={`bg-white rounded-xl border transition-all ${course.isHidden ? "border-dashed border-slate-200 opacity-60" : "border-slate-200 shadow-sm"}`}>
              {editingId === course._id ? (
                <form onSubmit={saveEdit} className="p-6 space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Programme Name</label>
                      <input type="text" value={editForm.title || ""} onChange={e => setEditForm({ ...editForm, title: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Subtitle</label>
                      <input type="text" value={editForm.subtitle || ""} onChange={e => setEditForm({ ...editForm, subtitle: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Description</label>
                    <textarea value={editForm.text || ""} onChange={e => setEditForm({ ...editForm, text: e.target.value })} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 h-20" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Bullet Points</label>
                    <div className="space-y-2">
                      {(editForm.points || []).map((point, i) => (
                        <div key={i} className="flex gap-2">
                          <input type="text" value={point} onChange={e => updateEditPoint(i, e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                          <button type="button" onClick={() => removeEditPoint(i)} className="px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg text-sm font-bold">✕</button>
                        </div>
                      ))}
                      <button type="button" onClick={addEditPoint} className="text-blue-600 text-sm font-semibold hover:underline">+ Add point</button>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                    <button type="button" onClick={cancelEdit} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium">Cancel</button>
                    <button type="submit" disabled={isSaving} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 text-sm">
                      {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-5 flex gap-4">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-slate-800">{course.title}</h3>
                        <p className="text-sm text-slate-500">{course.subtitle}</p>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => handleToggleHide(course._id, course.isHidden)} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${course.isHidden ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                          {course.isHidden ? "Show" : "Hide"}
                        </button>
                        <button onClick={() => startEdit(course)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200">Edit</button>
                        <button onClick={() => handleDelete(course._id)} className="px-3 py-1.5 text-xs font-bold rounded-lg bg-red-100 text-red-700 hover:bg-red-200">Delete</button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-2 line-clamp-2">{course.text}</p>
                    {course.points?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {course.points.map((pt, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded">{pt}</span>
                        ))}
                      </div>
                    )}
                    {course.isHidden && <span className="mt-2 inline-block text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded font-bold">HIDDEN</span>}
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
