import type { Metadata } from "next";
import { defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Upload",
  description:
    "Upload your photos, choose a bundle tier, and start secure checkout for professional hand-edited retouching.",
  keywords: [
    "upload photos for editing",
    "secure photo editing checkout",
    "photo retouching order form",
    "online photo editing service",
  ],
  alternates: {
    canonical: "/upload",
  },
  openGraph: {
    title: "Upload Photos for Editing",
    description: "Upload your photos and start secure checkout for hand-edited professional retouching.",
    url: "/upload",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upload Photos for Editing",
    description: "Upload your photos and start secure checkout for hand-edited professional retouching.",
    images: [defaultOgImage],
  },
};

export default function UploadLayout({ children }: { children: React.ReactNode }) {
  const uploadFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does upload photo editing cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Pricing starts at $1 per photo. Bundle discounts apply every 10 photos: 10 = $7, 20 = $14, 30 = $21.",
        },
      },
      {
        "@type": "Question",
        name: "How do I submit photos for editing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Choose your upload tier, add your files, include edit notes, and proceed through secure checkout.",
        },
      },
      {
        "@type": "Question",
        name: "Do you use AI retouching tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Every photo is edited by hand to keep results natural, controlled, and consistent.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(uploadFaqSchema) }} />
      {children}
    </>
  );
}
