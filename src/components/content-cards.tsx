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
    <article className={`feature-card ${index % 2 === 1 ? "feature-card-offset" : ""}`}>
      <div className="feature-image"><Image src={feature.image} alt={feature.title} fill sizes="(max-width: 800px) 100vw, 25vw" /></div>
      <div className="feature-body"><div className="feature-number">{feature.number}</div><p className="feature-tag">{feature.tag}</p><h3>{feature.title}</h3><p>{feature.text}</p></div>
    </article>
  );
}
