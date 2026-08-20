import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vidyashree Science Classes | Baragada",
    template: "%s | Vidyashree Science Classes",
  },
  description: "A thoughtful +2 Science learning experience in Baragada, Bhubaneswar — clarity in every concept, confidence in every step.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}
