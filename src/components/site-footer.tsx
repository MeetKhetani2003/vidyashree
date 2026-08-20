import Image from "next/image";
import Link from "next/link";
import { navigation, school } from "@/data/site";
import { IconArrowUpRight, IconMail, IconMapPin, IconPhone } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand-col">
          <Link href="/" className="brand footer-brand">
            <Image src="/logo.png" alt="Vidyashree Science Classes logo" width={76} height={76} className="brand-logo" />
            <span className="brand-copy"><strong>Vidyashree</strong><small>Science Classes</small></span>
          </Link>
          <p>Helping young minds find clarity, confidence and a direction they can feel proud of.</p>
          <Link href="/enquiry" className="footer-small-link">Make an enquiry <IconArrowUpRight size={15} /></Link>
        </div>
        <div className="footer-nav-col">
          <p className="footer-label">Explore</p>
          <div className="footer-links">
            {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
            <Link href="/achievements">Achievements</Link>
            <Link href="/faqs">FAQs</Link>
          </div>
        </div>
        <div className="footer-contact-col">
          <p className="footer-label">Come say hello</p>
          <a href={school.phoneHref}><IconPhone size={17} /> {school.phone}</a>
          <a href={school.emailHref}><IconMail size={17} /> {school.email}</a>
          <span><IconMapPin size={17} /> {school.location}</span>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Vidyashree Science Classes</span>
        <span>Built for curious minds in Baragada</span>
        <Link href="/contact">Find us <IconArrowUpRight size={14} /></Link>
      </div>
    </footer>
  );
}
