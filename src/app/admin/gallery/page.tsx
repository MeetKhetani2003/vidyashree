"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type GalleryItem = {
  _id: string;
  title: string;
  type: "image" | "video";
  url?: string;
  gridFsId?: string;
  category: string;
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Calculate unique existing categories
  const uniqueCategories = Array.from(new Set(items.map(i => i.category)));

  // Upload Photo State
  const [file, setFile] = useState<File | null>(null);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoCategory, setPhotoCategory] = useState("Classroom");
  const [isUploading, setIsUploading] = useState(false);

  // Add Video State
  const [videoTitle, setVideoTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoCategory, setVideoCategory] = useState("Events");
  const [isAddingVideo, setIsAddingVideo] = useState(false);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleUploadPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !photoTitle) return;

    setIsUploading(true);
    try {
      // 1. Upload the file to GridFS
      const formData = new FormData();
      formData.append("file", file);
      
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const uploadData = await uploadRes.json();
      
      if (uploadData.error) throw new Error(uploadData.error);
      
      // 2. Save the metadata to the gallery DB
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: photoTitle,
          type: "image",
          gridFsId: uploadData.gridFsId,
          category: photoCategory,
        }),
      });
      
      if (res.ok) {
        setFile(null);
        setPhotoTitle("");
        fetchItems();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to upload photo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoTitle || !videoUrl) return;

    setIsAddingVideo(true);
    try {
      // Basic extraction of youtube ID if needed, or just save the URL
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: videoTitle,
          type: "video",
          url: videoUrl,
          category: videoCategory,
        }),
      });
      
      if (res.ok) {
        setVideoTitle("");
        setVideoUrl("");
        fetchItems();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add video");
    } finally {
      setIsAddingVideo(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    
    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchItems();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Manage Gallery</h1>
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Upload Photo Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Upload Photo</h2>
          <form onSubmit={handleUploadPhoto} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Title</label>
              <input type="text" required value={photoTitle} onChange={(e) => setPhotoTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500" placeholder="E.g. A room full of questions" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Category</label>
              <input type="text" list="categoryOptions" required value={photoCategory} onChange={(e) => setPhotoCategory(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500" placeholder="Type or select a category" />
              <datalist id="categoryOptions">
                <option value="Classroom" />
                <option value="Students" />
                <option value="Campus life" />
                <option value="Events" />
                <option value="Lectures" />
                <option value="Testimonials" />
                {uniqueCategories.map(cat => <option key={`photo-${cat}`} value={cat} />)}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Select File</label>
              <input type="file" required accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
            </div>
            <button type="submit" disabled={isUploading} className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors w-full">
              {isUploading ? "Uploading..." : "Upload Photo"}
            </button>
          </form>
        </div>

        {/* Add Video Form */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Add YouTube Video</h2>
          <form onSubmit={handleAddVideo} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Title</label>
              <input type="text" required value={videoTitle} onChange={(e) => setVideoTitle(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500" placeholder="E.g. Science Exhibition Highlights" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Category</label>
              <input type="text" list="categoryOptions" required value={videoCategory} onChange={(e) => setVideoCategory(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500" placeholder="Type or select a category" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">YouTube URL</label>
              <input type="url" required value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500" placeholder="https://www.youtube.com/watch?v=..." />
            </div>
            <button type="submit" disabled={isAddingVideo} className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700 disabled:opacity-50 transition-colors w-full">
              {isAddingVideo ? "Adding..." : "Add Video"}
            </button>
          </form>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-800 mb-6">Existing Items</h2>
      
      {isLoading ? (
        <div className="text-center py-10 text-slate-500">Loading gallery items...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-slate-500 bg-white rounded-lg border border-slate-200">No items found. Add some above!</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200 relative group">
              <div className="aspect-[4/3] bg-slate-100 relative">
                {item.type === "image" ? (
                  <Image src={`/api/images/${item.gridFsId}`} alt={item.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-white">
                    <span className="text-sm font-bold bg-red-600 px-2 py-1 rounded">YOUTUBE</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-blue-600 mb-1">{item.category}</p>
                <h3 className="text-sm font-bold text-slate-800 truncate">{item.title}</h3>
              </div>
              <button onClick={() => handleDelete(item._id)} className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
