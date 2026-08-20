import Link from "next/link";
import { IconArrowUpRight, IconSparkles } from "@/components/icons";

type CtaStripProps = { eyebrow?: string; title: string; text: string; action?: string; href?: string };

export function CtaStrip({ eyebrow = "Your next chapter starts here", title, text, action = "Talk to our team", href = "/enquiry" }: CtaStripProps) {
  return (
    <section className="cta-strip">
      <div className="cta-pattern" />
      <div className="shell cta-inner">
        <div className="cta-mark"><IconSparkles size={27} /></div>
        <div><p className="eyebrow eyebrow-light">{eyebrow}</p><h2>{title}</h2><p>{text}</p></div>
        <Link href={href} className="button button-cream">{action}<IconArrowUpRight size={17} /></Link>
      </div>
    </section>
  );
}
