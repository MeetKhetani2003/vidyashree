"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CtaStrip } from "@/components/cta-strip";
import { IconArrowUpRight, IconCheck } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { values } from "@/data/site";

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

export default function AboutPage() {
  const [sections, setSections] = useState<AboutSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch("/api/about-sections?visibleOnly=true");
        const data = await res.json();
        setSections(data);
      } catch (err) {
        console.error("Failed to fetch about sections:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSections();
  }, []);

  return (
    <main>
      <PageHero eyebrow="The story behind the work" current="About us" title={<>A good place to learn is a good place to <em>grow.</em></>} text="Vidyashree began with a simple belief: when students feel seen, they become more willing to ask, practise and discover what they are capable of." image="/images/about/teacher-students.jpg" imageAlt="Teacher guiding students around a lab table" action={{ label: "Start a conversation", href: "/enquiry" }} />
      
      {/* Dynamic Sections from Admin Panel */}
      {!isLoading && sections.map((section, index) => {
        if (section.type === "director-message") {
          return (
            <section key={section._id} className="py-24 bg-white border-y border-slate-200">
              <div className="shell">
                <div className="bg-slate-50 rounded-3xl shadow-lg overflow-hidden border border-slate-200">
                  <div className="grid md:grid-cols-5 items-stretch">
                    <div className="md:col-span-2 relative min-h-[400px]">
                      {section.gridFsId ? (
                        <Image src={`/api/images/${section.gridFsId}`} alt={section.title} fill className="object-cover object-top" />
                      ) : section.imageUrl ? (
                        <Image src={section.imageUrl} alt={section.title} fill className="object-cover object-top" />
                      ) : (
                        <div className="w-full h-full bg-slate-200"></div>
                      )}
                    </div>
                    <div className="md:col-span-3 p-10 md:p-14 flex flex-col justify-center">
                      <p className="text-red-600 font-bold uppercase tracking-widest text-sm mb-4">{section.eyebrow}</p>
                      <h2 className="text-3xl font-serif font-bold text-blue-950 mb-6">{section.title}</h2>
                      
                      <div className="prose prose-lg text-gray-600 mb-8 space-y-4" dangerouslySetInnerHTML={{ __html: section.content }} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (section.type === "values-grid") {
          return (
            <section key={section._id} className="page-section warm">
              <div className="shell">
                <SectionHeading eyebrow={section.eyebrow} title={<span dangerouslySetInnerHTML={{ __html: section.title }} />} text={section.content} />
                <div className="values-grid">
                  {values.map((value) => (
                    <article className="value-card" key={value.number}>
                      <span className="value-number">{value.number}</span>
                      <h3>{value.title}</h3>
                      <p>{value.text}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        // Default to split-grid
        const isEven = index % 2 === 0;
        return (
          <section key={section._id} className={`page-section ${isEven ? '' : 'white'}`}>
            <div className="shell split-grid">
              {!isEven && (
                <div className="split-copy">
                  <p className="eyebrow">{section.eyebrow}</p>
                  <h2 dangerouslySetInnerHTML={{ __html: section.title }} />
                  <div className="prose text-slate-600" dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
              )}
              
              <div className="split-image">
                {section.gridFsId ? (
                  <Image src={`/api/images/${section.gridFsId}`} alt={section.title} fill sizes="(max-width: 760px) 100vw, 50vw" className="object-cover" />
                ) : section.imageUrl ? (
                  <Image src={section.imageUrl} alt={section.title} fill sizes="(max-width: 760px) 100vw, 50vw" className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-slate-200"></div>
                )}
              </div>

              {isEven && (
                <div className="split-copy">
                  <p className="eyebrow">{section.eyebrow}</p>
                  <h2 dangerouslySetInnerHTML={{ __html: section.title }} />
                  <div className="prose text-slate-600" dangerouslySetInnerHTML={{ __html: section.content }} />
                </div>
              )}
            </div>
          </section>
        );
      })}

      <CtaStrip title="Come see what learning can feel like." text="A conversation is the best place to begin. Tell us a little about your student and we’ll take it from there." action="Plan a visit" href="/contact" />
    </main>
  );
}
