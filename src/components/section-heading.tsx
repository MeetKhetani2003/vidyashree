import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, text, align = "left", light = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${align === "center" ? "center" : ""} ${light ? "light" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-heading-text">{text}</p>}
    </div>
  );
}
