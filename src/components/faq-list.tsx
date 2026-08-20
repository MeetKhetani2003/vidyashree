"use client";

import { useState } from "react";
import { IconArrowDown } from "@/components/icons";
import type { faqs } from "@/data/faqs";

type Faq = (typeof faqs)[number];

export function FaqList({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div className={`faq-item ${isOpen ? "open" : ""}`} key={item.question}>
            <button className="faq-question" type="button" onClick={() => setOpen(isOpen ? -1 : index)} aria-expanded={isOpen}>
              <span><b>{String(index + 1).padStart(2, "0")}</b>{item.question}</span><IconArrowDown size={18} />
            </button>
            {isOpen && <div className="faq-answer"><p>{item.answer}</p></div>}
          </div>
        );
      })}
    </div>
  );
}
