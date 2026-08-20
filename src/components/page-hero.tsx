import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowUpRight } from "@/components/icons";

type PageHeroProps = {
  eyebrow: string;
  title: ReactNode;
  text: string;
  image: string;
  imageAlt: string;
  current: string;
  action?: { label: string; href: string };
};

export function PageHero({ eyebrow, title, text, image, imageAlt, current, action }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="shell page-hero-grid">
        <div className="page-hero-copy">
          <div className="breadcrumbs"><Link href="/">Home</Link><span>/</span><span>{current}</span></div>
          <p className="eyebrow eyebrow-light">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="page-hero-text">{text}</p>
          {action && <Link href={action.href} className="button button-red page-hero-button">{action.label}<IconArrowUpRight size={17} /></Link>}
        </div>
        <div className="page-hero-image">
          <Image src={image} alt={imageAlt} fill sizes="(max-width: 800px) 100vw, 50vw" priority />
          <div className="image-stamp"><span>VS</span><small>Learn with purpose</small></div>
        </div>
      </div>
    </section>
  );
}
