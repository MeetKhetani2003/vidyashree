"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CtaStrip } from "@/components/cta-strip";
import { IconArrowUpRight, IconCheck } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

type Subject = {
  _id: string;
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  imageUrl?: string;
  gridFsId?: string;
  accent: string;
  topics: string[];
};

function SubjectCardDynamic({ subject }: { subject: Subject }) {
  const imgSrc = subject.gridFsId ? `/api/images/${subject.gridFsId}` : subject.imageUrl || "";
  return (
    <article className="subject-card" style={{ "--accent": subject.accent } as React.CSSProperties}>
      <div className="subject-card-image">
        {imgSrc && <Image src={imgSrc} alt={subject.title} fill sizes="(max-width: 760px) 100vw, 33vw" className="object-cover" />}
      </div>
      <div className="subject-card-body">
        <p className="subject-eyebrow">{subject.eyebrow}</p>
        <h3>{subject.title}</h3>
        <p>{subject.description}</p>
        <ul className="subject-topics">
          {subject.topics.map(t => <li key={t}><span>{t}</span></li>)}
        </ul>
      </div>
    </article>
  );
}

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    fetch("/api/subjects")
      .then(r => r.json())
      .then(data => setSubjects(Array.isArray(data) ? data.filter((s: any) => !s.isHidden) : []));
  }, []);

  return <main>
    <PageHero eyebrow="The science desk" current="Subjects" title={<>Go deeper. See the <em>connection.</em></>} text="Physics, Chemistry, Biology and Mathematics taught as living ideas — not isolated chapters to memorise and forget." image="/images/subjects/physics.jpg" imageAlt="Physics equipment on a dark desk" action={{ label: "Ask about subjects", href: "/enquiry" }} />
    <section className="page-section"><div className="shell"><SectionHeading eyebrow="Our subjects" title={<>Where every subject opens a <em>door.</em></>} text="Different subjects ask different questions. Together, they give students a richer way to look at the world and a stronger foundation for what comes next." /><div className="subject-grid">{subjects.map((subject) => <div id={subject.slug} key={subject._id}><SubjectCardDynamic subject={subject} /></div>)}</div></div></section>
    <section className="page-section warm"><div className="shell split-grid"><div className="split-copy"><p className="eyebrow">One connected way of learning</p><h2>The best science is <em>interdisciplinary.</em></h2><p>Mathematics helps Physics speak clearly. Biology borrows Chemistry's language. Every subject becomes more memorable when students can see the connections between them.</p><ul className="numbered-list"><li className="numbered-item"><b>01</b><div><strong>Ask better questions</strong><p>Start from curiosity, then build the language to describe it.</p></div></li><li className="numbered-item"><b>02</b><div><strong>Use more than one lens</strong><p>Move between diagrams, equations, experiments and examples.</p></div></li><li className="numbered-item"><b>03</b><div><strong>Make knowledge useful</strong><p>Practise applying an idea before it becomes a fact to recall.</p></div></li></ul></div><div className="split-image"><Image src="/images/subjects/chemistry.jpg" alt="Chemistry glassware and a molecular model" fill sizes="(max-width: 760px) 100vw, 50vw" /></div></div></section>
    <section className="page-section white"><div className="shell split-grid"><div className="split-image"><Image src="/images/subjects/biology.jpg" alt="Microscope and botanical specimen" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="split-copy"><p className="eyebrow">The outcome we want</p><h2>Not just answers. A mind that knows <em>how to look.</em></h2><p>Students leave with a better understanding of each subject and a more useful habit: pause, observe, make a connection, then try.</p><ul className="intro-points"><li><IconCheck size={17} /> Clearer foundations</li><li><IconCheck size={17} /> Better problem solving</li><li><IconCheck size={17} /> Stronger recall</li><li><IconCheck size={17} /> More independent study</li></ul><Link href="/enquiry" className="button button-outline">Build a subject plan <IconArrowUpRight size={17} /></Link></div></div></section>
    <CtaStrip title="Let's make the difficult part clearer." text="Tell us which subject feels exciting, difficult or both. We'll help you find the right support." />
  </main>;
}

