import Image from "next/image";
import Link from "next/link";
import { CtaStrip } from "@/components/cta-strip";
import { IconArrowRight, IconArrowUpRight, IconAward, IconBook, IconCheck, IconPlay, IconUsers } from "@/components/icons";
import { SectionHeading } from "@/components/section-heading";
import { StatBand } from "@/components/stat-band";
import { SubjectCard } from "@/components/content-cards";
import { courseTracks } from "@/data/subjects";
import { subjects } from "@/data/subjects";
import { testimonials } from "@/data/site";

export default function HomePage() {
  return (
    <main>
      <section className="home-hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">A better way to learn science</p>
            <h1 className="hero-title">Where <em>curiosity</em> becomes confidence.</h1>
            <p className="hero-text">Thoughtful +2 Science coaching for students who want to understand deeply, ask freely and walk into every exam prepared.</p>
            <div className="hero-actions"><Link href="/enquiry" className="button button-red">Begin your journey <IconArrowUpRight size={17} /></Link><Link href="/about" className="hero-play"><IconPlay size={22} /> See how we teach</Link></div>
          </div>
          <div className="hero-image-panel"><Image src="/images/hero/science-classroom.jpg" alt="Students learning science in a Vidyashree classroom" fill sizes="(max-width: 760px) 100vw, 50vw" priority /><div className="hero-caption">A room where every question has room to grow<small>Vidyashree · Baragada</small></div></div>
        </div>
      </section>

      <StatBand />

      <section className="home-intro">
        <div className="shell intro-grid">
          <div className="intro-image-wrap"><div className="intro-image"><Image src="/images/about/teacher-students.jpg" alt="Teacher mentoring students in a science classroom" fill sizes="(max-width: 760px) 100vw, 35vw" /></div><div className="intro-note">Learning is a relationship.<small>Our belief</small></div></div>
          <div className="intro-copy"><p className="eyebrow">More than a classroom</p><h2>Built around the student, not just the <em>syllabus.</em></h2><p>At Vidyashree, science is not a stack of chapters to get through. It is a way to look closer, make connections and trust your own thinking. Our teachers create the space and structure students need to do exactly that.</p><ul className="intro-points"><li><IconCheck size={17} /> Small, focused batches</li><li><IconCheck size={17} /> Mentors who notice</li><li><IconCheck size={17} /> Practice with purpose</li><li><IconCheck size={17} /> Progress you can see</li></ul><Link href="/about" className="button button-outline">Meet Vidyashree <IconArrowUpRight size={17} /></Link></div>
        </div>
      </section>

      <section className="home-programs">
        <div className="shell"><div className="program-header"><SectionHeading eyebrow="Find your starting point" title={<>A path for where you are <em>now.</em></>} /><p>Whether you are beginning Class XI or making your final year count, we meet you with a clear plan and the right kind of support.</p></div><div className="program-grid">{courseTracks.map((course, index) => { const Icon = index === 0 ? IconBook : index === 1 ? IconAward : IconUsers; return <article className="program-card" key={course.title}><div className="program-card-top"><span className="program-card-number">0{index + 1}</span><Icon className="program-card-icon" size={27} /></div><div><h3>{course.title}</h3><p>{course.text}</p></div><Link href={course.href} className="program-card-link">{course.subtitle}<IconArrowRight size={17} /></Link></article>; })}</div></div>
      </section>

      <section className="subjects-home">
        <div className="shell"><SectionHeading eyebrow="The science desk" title={<>Four subjects. One habit of <em>thinking.</em></>} text="Strong fundamentals are built one honest question at a time. Explore the subjects at the heart of our +2 Science programme." /><div className="subject-grid">{subjects.map((subject) => <SubjectCard key={subject.slug} subject={subject} />)}</div><div style={{ textAlign: "center", marginTop: "44px" }}><Link href="/subjects" className="text-button">See our subject approach <IconArrowUpRight size={16} /></Link></div></div>
      </section>

      <section className="learning-section"><div className="shell learning-grid"><div className="learning-copy"><p className="eyebrow eyebrow-light">The Vidyashree way</p><h2>Less rush. More <em>real learning.</em></h2><p>We combine the warmth of a neighbourhood institute with the discipline of a serious academic programme — so students have a place to belong and a standard to reach.</p><ul className="learning-points"><li><IconCheck size={17} /> Learn the idea first</li><li><IconCheck size={17} /> Practise in small steps</li><li><IconCheck size={17} /> Review without blame</li><li><IconCheck size={17} /> Keep moving forward</li></ul><Link href="/why-us" className="button button-cream" style={{ marginTop: "32px" }}>Why families choose us <IconArrowUpRight size={17} /></Link></div><div className="learning-image-wrap"><div className="learning-image"><Image src="/images/hero/students-study.jpg" alt="Students studying together at Vidyashree" fill sizes="(max-width: 760px) 100vw, 45vw" /></div><div className="learning-label">Make it make sense.<small>Then make it yours.</small></div></div></div></section>

      <section className="testimonials"><div className="shell"><SectionHeading align="center" eyebrow="In their own words" title={<>What changes when learning <em>clicks.</em></>} /><div className="testimonial-grid">{testimonials.map((testimonial) => <figure className="testimonial-card" key={testimonial.name}><blockquote>“{testimonial.quote}”</blockquote><cite>{testimonial.name}<span>{testimonial.detail}</span></cite></figure>)}</div></div></section>
      <CtaStrip title="Ready to find a clearer way forward?" text="Tell us where the student is today. We’ll help you understand what the next step could look like." />
    </main>
  );
}
