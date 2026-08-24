import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight, IconAtom, IconCalculator, IconFlask, IconLeaf } from "@/components/icons";
import type { CSSProperties } from "react";
import type { features } from "@/data/features";
import type { subjects } from "@/data/subjects";

type Subject = (typeof subjects)[number];
type Feature = (typeof features)[number];

function SubjectIcon({ name }: { name: string }) {
  if (name === "flask") return <IconFlask size={25} />;
  if (name === "leaf") return <IconLeaf size={25} />;
  if (name === "calculator") return <IconCalculator size={25} />;
  return <IconAtom size={25} />;
}

export function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <article className="subject-card" style={{ "--card-accent": subject.accent } as React.CSSProperties}>
      <div className="subject-card-image"><Image src={subject.image} alt={`${subject.title} learning at Vidyashree`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 25vw" /></div>
      <div className="subject-card-body">
        <div className="subject-icon"><SubjectIcon name={subject.icon} /></div>
        <p className="card-eyebrow">{subject.eyebrow}</p>
        <h3>{subject.title}</h3>
        <p>{subject.description}</p>
        <Link href={`/subjects#${subject.slug}`} className="card-link">Explore subject <IconArrowUpRight size={16} /></Link>
      </div>
    </article>
  );
}

export function FeatureCard({ feature, index = 0 }: { feature: Feature; index?: number }) {
  return (
    <article className={`group bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 transition-all duration-300 hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 ${index % 2 === 1 ? "md:mt-6" : ""}`}>
      <div className="relative h-56 overflow-hidden">
        <Image src={feature.image} alt={feature.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 800px) 100vw, 33vw" />
        <div className="absolute -bottom-5 right-6 bg-red-600 text-white font-serif text-lg w-12 h-12 flex items-center justify-center rounded-full border-4 border-white shadow-md z-10">
          {feature.number}
        </div>
      </div>
      <div className="p-8 pt-10 relative">
        <p className="text-red-600 text-[10px] font-extrabold uppercase tracking-widest mb-3">{feature.tag}</p>
        <h3 className="text-slate-900 font-serif text-xl font-bold mb-3">{feature.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{feature.text}</p>
      </div>
    </article>
  );
}
