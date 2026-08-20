"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, school } from "@/data/site";
import { IconArrowUpRight, IconMenu, IconX, IconPhone } from "@/components/icons";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <div className="topline">
        <div className="shell topline-inner">
          <span className="topline-note"><span className="live-dot" /> Admissions open for 2025–26</span>
          <span className="topline-detail">Class XI & XII Science · Baragada, Bhubaneswar</span>
          <a className="topline-call" href={school.phoneHref}><IconPhone size={14} /> {school.phone}</a>
        </div>
      </div>
      <header className="site-header sticky top-0 z-50">
        <div className="shell header-inner">
          <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label="Vidyashree Science Classes home">
            <Image src="/logo.png" alt="Vidyashree Science Classes logo" width={72} height={72} className="brand-logo" priority />
            <span className="brand-copy"><strong>Vidyashree</strong><small>Science Classes</small></span>
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={isActive(item.href) ? "nav-link active" : "nav-link"}>{item.label}</Link>
            ))}
          </nav>
          <Link href="/enquiry" className="header-cta">Start a conversation <IconArrowUpRight size={16} /></Link>
          <button className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <IconX size={23} /> : <IconMenu size={23} />}
          </button>
        </div>
        {open && (
          <div className="mobile-nav">
            <div className="shell mobile-nav-inner">
              {[...navigation, { label: "Achievements", href: "/achievements" }, { label: "FAQs", href: "/faqs" }, { label: "Contact", href: "/contact" }].map((item) => (
                <Link key={item.href} href={item.href} className={isActive(item.href) ? "mobile-nav-link active" : "mobile-nav-link"} onClick={() => setOpen(false)}>{item.label}<IconArrowUpRight size={16} /></Link>
              ))}
              <Link href="/enquiry" className="button button-red mobile-cta" onClick={() => setOpen(false)}>Book a counselling call <IconArrowUpRight size={17} /></Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
