import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vidyashreeScienceclasses.in"),
  title: {
    default: "Vidyashree Science Classes | Best +2 Science Coaching in Bhubaneswar",
    template: "%s | Vidyashree Science Classes",
  },
  description: "Join Vidyashree Science Classes in Baragada, Bhubaneswar for the best +2 Science coaching. Expert faculty, comprehensive study material, and clear concepts for CHSE, CBSE, JEE, and NEET preparation.",
  keywords: [
    "Vidyashree Science Classes",
    "+2 Science Coaching Bhubaneswar",
    "Best Science Coaching in Baragada",
    "CHSE Science Coaching Bhubaneswar",
    "CBSE Science Coaching",
    "JEE Coaching Bhubaneswar",
    "NEET Coaching Bhubaneswar",
    "+2 Science College Baragada",
  ],
  authors: [{ name: "Vidyashree Science Classes" }],
  creator: "Vidyashree Science Classes",
  publisher: "Vidyashree Science Classes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vidyashree Science Classes | Best +2 Science Coaching in Bhubaneswar",
    description: "Join Vidyashree Science Classes in Baragada, Bhubaneswar for the best +2 Science coaching. Expert faculty, comprehensive study material, and clear concepts for CHSE, CBSE, JEE, and NEET preparation.",
    url: "https://vidyashreeScienceclasses.in",
    siteName: "Vidyashree Science Classes",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vidyashree Science Classes | Best +2 Science Coaching in Bhubaneswar",
    description: "Join Vidyashree Science Classes in Baragada, Bhubaneswar for the best +2 Science coaching.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body><SiteHeader />{children}<SiteFooter /></body>
    </html>
  );
}
