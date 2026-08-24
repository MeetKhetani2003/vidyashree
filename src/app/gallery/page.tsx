"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CtaStrip } from "@/components/cta-strip";
import { IconArrowUpRight, IconPlay } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

type GalleryItem = {
  _id: string;
  title: string;
  type: "image" | "video";
  url?: string;
  gridFsId?: string;
  category: string;
};

function getYouTubeId(url: string) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&]{11})/);
  return match ? match[1] : null;
}

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "photos" | "videos">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Failed to fetch gallery:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "photos") return item.type === "image";
    if (activeTab === "videos") return item.type === "video";
    return true;
  });

  return (
    <main>
      <PageHero eyebrow="A glimpse of the everyday" current="Gallery" title={<>The little moments that make a <em>place.</em></>} text="A quiet desk. A difficult problem finally solved. A room full of questions. This is the rhythm of learning at Vidyashree." image="/images/gallery/classroom-01.jpg" imageAlt="Students studying together in a bright room" />
      
      <section className="page-section">
        <div className="shell">
          <SectionHeading eyebrow="From around campus" title={<>Come in. Look <em>closer.</em></>} text="Our gallery is a collection of ordinary moments that feel extraordinary when you are the one learning." />
          
          <div className="flex justify-center gap-4 mt-12 mb-10">
            <button onClick={() => setActiveTab("all")} className={`px-6 py-2 rounded-full font-bold transition-colors ${activeTab === "all" ? "bg-red-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>All</button>
            <button onClick={() => setActiveTab("photos")} className={`px-6 py-2 rounded-full font-bold transition-colors ${activeTab === "photos" ? "bg-red-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>Photos</button>
            <button onClick={() => setActiveTab("videos")} className={`px-6 py-2 rounded-full font-bold transition-colors ${activeTab === "videos" ? "bg-red-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>Videos</button>
          </div>

          {isLoading ? (
            <div className="text-center py-20 text-slate-500">Loading gallery...</div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-20 text-slate-500 bg-slate-50 rounded-2xl">No items to display yet.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <article className="group cursor-pointer rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 bg-white" key={item._id}>
                  <div className="aspect-[4/3] relative bg-slate-100 overflow-hidden">
                    {item.type === "image" ? (
                      <Image src={`/api/images/${item.gridFsId}`} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <>
                        <Image src={`https://img.youtube.com/vi/${getYouTubeId(item.url || "")}/maxresdefault.jpg`} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-red-600/90 text-white p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                            <IconPlay size={24} />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-widest">{item.category}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2">{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
          )}
          
          <div className="gallery-note mt-16"><span>Every image tells a small part of the story. The best part is still waiting for you.</span><Link href="/contact" className="button button-outline">Visit the campus <IconArrowUpRight size={16} /></Link></div>
        </div>
      </section>
      
      <section className="page-section warm"><div className="shell split-grid"><div className="split-copy"><p className="eyebrow">The atmosphere matters</p><h2>Focus feels different when the room feels <em>right.</em></h2><p>We want students to remember their time here not only for what they learned, but for how it felt to be encouraged, challenged and part of something.</p><Link href="/facilities" className="button button-red">Explore campus life <IconArrowUpRight size={17} /></Link></div><div className="split-image"><Image src="/images/about/teacher-students.jpg" alt="Teacher speaking with students in a classroom" fill sizes="(max-width: 760px) 100vw, 50vw" /></div></div></section>
      <CtaStrip title="Want to see it in person?" text="Pictures can only go so far. Come by the institute and experience the room for yourself." action="Plan a visit" href="/contact" />
    </main>
  );
}
