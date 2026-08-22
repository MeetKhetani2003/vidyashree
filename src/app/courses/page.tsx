"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CtaStrip } from "@/components/cta-strip";
import { IconArrowRight, IconArrowUpRight, IconCheck } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";

type Course = {
  _id: string;
  title: string;
  subtitle: string;
  text: string;
  points: string[];
  href: string;
  isHidden: boolean;
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    fetch("/api/courses")
      .then(r => r.json())
      .then(data => setCourses(Array.isArray(data) ? data.filter((c: Course) => !c.isHidden) : []));
  }, []);

  return <main>
    <PageHero eyebrow="Choose your pace" current="Courses" title={<>The right structure for your <em>next step.</em></>} text="Thoughtfully designed programmes for Class XI, Class XII and the summer in between — with enough structure to keep you moving and enough space to make learning yours." image="/images/hero/students-study.jpg" imageAlt="Two students studying science together" action={{ label: "Find your fit", href: "/enquiry" }} />
    
    <section className="page-section">
      <div className="shell">
        <SectionHeading eyebrow="Our programmes" title={<>A clear plan, without the <em>pressure.</em></>} text="Every track combines concept classes, guided practice and personal check-ins. The difference is where you are starting from." />
        <div className="course-list">
          {courses.map((course, index) => (
            <article className="course-card" key={course._id}>
              <div>
                <p className="eyebrow">0{index + 1} / programme</p>
                <h3>{course.title}</h3>
                <p className="course-subtitle">{course.subtitle}</p>
              </div>
              <p>{course.text}</p>
              <div>
                <ul className="course-points">
                  {course.points.map((point) => (
                    <li key={point}><IconCheck size={15} /> {point}</li>
                  ))}
                </ul>
                <Link href={course.href} className="course-link">Ask about this track <IconArrowRight size={16} /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="page-section warm"><div className="shell method-grid"><div className="method-intro"><p className="eyebrow eyebrow-light">Inside every programme</p><h2>How progress becomes a <em>habit.</em></h2><p>Good results are rarely one big leap. We help students build a rhythm they can return to, week after week.</p></div><div className="method-steps"><article className="method-step"><span>01</span><h3>Learn</h3><p>Meet the idea through stories, models and clear explanations.</p></article><article className="method-step"><span>02</span><h3>Practise</h3><p>Work through carefully sequenced questions with support nearby.</p></article><article className="method-step"><span>03</span><h3>Review</h3><p>See what worked, what didn't and what to try differently next.</p></article><article className="method-step"><span>04</span><h3>Own it</h3><p>Apply the concept independently in class and exam-style settings.</p></article></div></div></section>
    <section className="page-section white"><div className="shell split-grid"><div className="split-image"><Image src="/images/features/exam-preparation.jpg" alt="Exam preparation materials in a classroom" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="split-copy"><p className="eyebrow">A calmer exam season</p><h2>Preparation that leaves room for <em>confidence.</em></h2><p>Our revision plans make the workload visible. Students know what is coming, how to practise and where their mentor can help — so preparation feels like progress, not panic.</p><Link href="/enquiry" className="button button-red">Talk through your options <IconArrowUpRight size={17} /></Link></div></div></section>
    <CtaStrip title="Not sure which programme is right?" text="That is exactly what a counselling conversation is for. We'll listen first, then recommend a thoughtful starting point." />
  </main>;
}

