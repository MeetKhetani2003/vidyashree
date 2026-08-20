import Image from "next/image";
import Link from "next/link";
import { CtaStrip } from "@/components/cta-strip";
import { IconArrowUpRight } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { gallery } from "@/data/gallery";

export default function GalleryPage() {
  return <main>
    <PageHero eyebrow="A glimpse of the everyday" current="Gallery" title={<>The little moments that make a <em>place.</em></>} text="A quiet desk. A difficult problem finally solved. A room full of questions. This is the rhythm of learning at Vidyashree." image="/images/gallery/students-01.jpg" imageAlt="Students studying together in a bright room" />
    <section className="page-section"><div className="shell"><SectionHeading eyebrow="From around campus" title={<>Come in. Look <em>closer.</em></>} text="Our gallery is a collection of ordinary moments that feel extraordinary when you are the one learning." /><div className="gallery-grid">{gallery.map((item) => <article className={`gallery-card ${item.size}`} key={item.title}><Image src={item.image} alt={item.title} fill sizes="(max-width: 760px) 50vw, 33vw" /><div className="gallery-card-copy"><span>{item.category}</span><h3>{item.title}</h3></div></article>)}</div><div className="gallery-note"><span>Every image tells a small part of the story. The best part is still waiting for you.</span><Link href="/contact" className="button button-outline">Visit the campus <IconArrowUpRight size={16} /></Link></div></div></section>
    <section className="page-section warm"><div className="shell split-grid"><div className="split-copy"><p className="eyebrow">The atmosphere matters</p><h2>Focus feels different when the room feels <em>right.</em></h2><p>We want students to remember their time here not only for what they learned, but for how it felt to be encouraged, challenged and part of something.</p><Link href="/facilities" className="button button-red">Explore campus life <IconArrowUpRight size={17} /></Link></div><div className="split-image"><Image src="/images/about/teacher-students.jpg" alt="Teacher speaking with students in a classroom" fill sizes="(max-width: 760px) 100vw, 50vw" /></div></div></section>
    <CtaStrip title="Want to see it in person?" text="Pictures can only go so far. Come by the institute and experience the room for yourself." action="Plan a visit" href="/contact" />
  </main>;
}
