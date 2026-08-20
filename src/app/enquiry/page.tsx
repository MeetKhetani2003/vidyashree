import Image from "next/image";
import { CtaStrip } from "@/components/cta-strip";
import { IconClock, IconMail, IconMapPin, IconPhone } from "@/components/icons";
import { EnquiryForm } from "@/components/enquiry-form";
import { PageHero } from "@/components/page-hero";
import { school } from "@/data/site";

export default function EnquiryPage() {
  return <main>
    <PageHero eyebrow="A thoughtful first step" current="Enquiry" title={<>Let’s make the next step feel <em>clear.</em></>} text="Tell us a little about the student, what they are working towards and where they need support. We’ll take it from there." image="/images/hero/students-study.jpg" imageAlt="Students studying together with notebooks" />
    <section className="page-section"><div className="shell enquiry-layout"><aside className="enquiry-side"><p className="eyebrow">Start here</p><h2>A good conversation changes the <em>question.</em></h2><p>There is no pressure to decide on the spot. This is simply a chance to understand your student’s goals, share how we work and find a sensible next step.</p><div className="enquiry-contact"><a href={school.phoneHref}><IconPhone size={17} /> {school.phone}</a><a href={school.emailHref}><IconMail size={17} /> {school.email}</a><span><IconClock size={17} /> {school.hours}</span><span><IconMapPin size={17} /> {school.location}</span></div></aside><div className="form-shell"><EnquiryForm /></div></div></section>
    <section className="page-section warm"><div className="shell split-grid"><div className="split-image"><Image src="/images/features/student-guidance.jpg" alt="A student receiving personal guidance" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="split-copy"><p className="eyebrow">What happens next</p><h2>Simple, personal and <em>useful.</em></h2><p>After you submit, a member of our academic team will get in touch. We can answer questions, recommend a programme and arrange a campus visit if it feels right.</p></div></div></section>
    <CtaStrip title="We are looking forward to meeting you." text="Bring your questions. We will bring time, attention and an honest recommendation." action="Contact us" href="/contact" />
  </main>;
}
