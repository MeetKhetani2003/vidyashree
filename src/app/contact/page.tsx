import Image from "next/image";
import Link from "next/link";
import { CtaStrip } from "@/components/cta-strip";
import { IconArrowUpRight, IconClock, IconMail, IconMapPin, IconPhone } from "@/components/icons";
import { PageHero } from "@/components/page-hero";
import { school } from "@/data/site";

export default function ContactPage() {
  return <main>
    <PageHero eyebrow="We are easy to find" current="Contact" title={<>Let’s meet in <em>Baragada.</em></>} text="Come for a conversation, a campus visit or simply a better answer to the question on your mind." image="/images/contact/institute.jpg" imageAlt="Vidyashree Science Classes institute" action={{ label: "Send an enquiry", href: "/enquiry" }} />
    <section id="visit" className="page-section"><div className="shell contact-grid"><div className="contact-copy"><p className="eyebrow">Get in touch</p><h2>There is always room for one more <em>question.</em></h2><p>Reach out in the way that is easiest for you. Our team will help you find the right person and the right next step.</p><div className="contact-list"><div className="contact-detail"><IconPhone size={21} /><div><strong>Call us</strong><a href={school.phoneHref}>{school.phone}</a></div></div><div className="contact-detail"><IconMail size={21} /><div><strong>Email us</strong><a href={school.emailHref}>{school.email}</a></div></div><div className="contact-detail"><IconMapPin size={21} /><div><strong>Find us</strong><span>{school.address}</span></div></div><div className="contact-detail"><IconClock size={21} /><div><strong>Opening hours</strong><span>{school.hours}</span></div></div></div></div><div className="contact-image-wrap"><div className="contact-image"><Image src="/images/contact/institute.jpg" alt="The Vidyashree institute in Baragada" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className="contact-map-card"><strong>Visit the campus.</strong><p>We are on Vidyashree Lane, close to the main Baragada road.</p><a href="#visit">Open directions <IconArrowUpRight size={15} /></a></div></div></div></section>
    <section className="page-section warm"><div className="shell split-grid"><div className="split-copy"><p className="eyebrow">Before you come</p><h2>Bring the question that is taking up <em>space.</em></h2><p>Is your student choosing a stream? Finding a subject difficult? Preparing for the final stretch? A first conversation does not need a perfect plan.</p><Link href="/enquiry" className="button button-red">Make an enquiry <IconArrowUpRight size={17} /></Link></div><div className="split-image"><Image src="/images/gallery/classroom-01.jpg" alt="Students learning in a Vidyashree classroom" fill sizes="(max-width: 760px) 100vw, 50vw" /></div></div></section>
    <CtaStrip title="We would love to welcome you in." text="Call, email or send an enquiry and let’s find a time that works." action="Start a conversation" href="/enquiry" />
  </main>;
}
