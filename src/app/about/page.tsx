import Image from "next/image";
import Link from "next/link";
import { CtaStrip } from "@/components/cta-strip";
import { IconArrowUpRight, IconCheck } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { StatBand } from "@/components/stat-band";
import { values } from "@/data/site";

export default function AboutPage() {
  return <main>
    <PageHero eyebrow="The story behind the work" current="About us" title={<>A good place to learn is a good place to <em>grow.</em></>} text="Vidyashree began with a simple belief: when students feel seen, they become more willing to ask, practise and discover what they are capable of." image="/images/about/teacher-students.jpg" imageAlt="Teacher guiding students around a lab table" action={{ label: "Start a conversation", href: "/enquiry" }} />
    <StatBand />
    <section className="page-section"><div className="shell split-grid"><div className="split-image"><Image src="/images/about/classroom.jpg" alt="A bright Vidyashree classroom" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="split-copy"><p className="eyebrow">Our beginning</p><h2>Teaching that starts with <em>attention.</em></h2><p>For more than a decade, Vidyashree has been a steady academic home for students in Baragada and the wider Bhubaneswar community. We keep the rooms focused, the groups personal and the conversation around learning honest.</p><p>That means celebrating a strong result, of course. It also means celebrating a brave question, a better method and the moment a student stops waiting for an answer and starts looking for one.</p><div className="copy-rule">The Vidyashree promise</div><ul className="intro-points"><li><IconCheck size={17} /> We explain without rushing</li><li><IconCheck size={17} /> We challenge with care</li><li><IconCheck size={17} /> We keep families close</li><li><IconCheck size={17} /> We notice the next step</li></ul></div></div></section>
    <section className="page-section warm"><div className="shell"><SectionHeading eyebrow="What guides us" title={<>The values behind every <em>lesson.</em></>} text="A clear academic standard feels better when it is held with humanity. These are the principles we return to every day." /><div className="values-grid">{values.map((value) => <article className="value-card" key={value.number}><span className="value-number">{value.number}</span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></div></section>
    <section className="page-section white"><div className="shell split-grid"><div className="split-copy"><p className="eyebrow">A living community</p><h2>Small enough to know you. Serious enough to <em>stretch you.</em></h2><p>Students grow faster when they know who to ask and where to begin. Our teachers, mentors and support team work as one circle around each learner.</p><Link href="/why-us" className="button button-outline">See what makes us different <IconArrowUpRight size={17} /></Link></div><div className="split-image"><Image src="/images/hero/students-study.jpg" alt="Students studying together" fill sizes="(max-width: 760px) 100vw, 50vw" /></div></div></section>
    <CtaStrip title="Come see what learning can feel like." text="A conversation is the best place to begin. Tell us a little about your student and we’ll take it from there." />
  </main>;
}
