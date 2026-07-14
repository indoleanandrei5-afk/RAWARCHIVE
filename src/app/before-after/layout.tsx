import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Before & After",
  description:
    "Compare before and after photo transformations with hand-edited retouching, balanced color, natural skin tones, and cinematic finishing.",
  keywords: [
    "before and after photo editing",
    "photo retouching examples",
    "cinematic color grading before after",
    "hand edited photo transformations",
  ],
  alternates: {
    canonical: "/before-after",
  },
  openGraph: {
    title: "Before & After Photo Transformations",
    description: "Interactive before and after examples of professional hand-edited retouching.",
    url: "/before-after",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Before & After Photo Transformations",
    description: "Interactive before and after examples of professional hand-edited retouching.",
    images: [defaultOgImage],
  },
};

export default function BeforeAfterLayout({ children }: { children: React.ReactNode }) {
  return children;
}