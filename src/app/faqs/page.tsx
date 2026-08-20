import Link from "next/link";
import { CtaStrip } from "@/components/cta-strip";
import { IconArrowUpRight } from "@/components/icons";
import { FaqList } from "@/components/faq-list";
import { PageHero } from "@/components/page-hero";
import { faqs } from "@/data/faqs";

export default function FaqsPage() {
  return <main>
    <PageHero eyebrow="Good questions welcome" current="FAQs" title={<>The answers before you <em>begin.</em></>} text="Choosing a learning environment is a big decision. Here are a few of the things families ask us most often." image="/images/features/doubt-solving.jpg" imageAlt="Students discussing a science problem" action={{ label: "Ask a new question", href: "/contact" }} />
    <section className="page-section"><div className="shell faq-layout"><aside className="faq-side"><p className="eyebrow">Still wondering?</p><h2>There is no such thing as a <em>silly</em> question.</h2><p>If you do not see what you are looking for, send us a note. We will answer directly and without the jargon.</p><Link href="/contact" className="text-button">Talk to the team <IconArrowUpRight size={16} /></Link></aside><FaqList items={faqs} /></div></section>
    <CtaStrip title="Prefer a real conversation?" text="We are happy to talk through the practical details, the academic goals and the questions you have not found words for yet." action="Contact Vidyashree" href="/contact" />
  </main>;
}
