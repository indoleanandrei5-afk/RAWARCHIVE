import type { Metadata } from "next";
import PricingSection from "@/components/PricingSection";
import { brandName, defaultOgImage, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple and transparent photo editing pricing. Pay $1 per photo with automatic bundle discounts at 10, 20, 30 photos and every next block of 10.",
  keywords: [
    "photo editing pricing",
    "professional retouching cost",
    "how much does photo editing cost",
    "cinematic photo editing service",
    "retouching price per photo",
    "batch photo editing pricing",
  ],
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Photo Editing Pricing",
    description: "Transparent pricing with bundle discounts and secure checkout.",
    url: "/pricing",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Editing Pricing",
    description: "Transparent pricing with bundle discounts and secure checkout.",
    images: [defaultOgImage],
  },
};

export default function PricingPage() {
  const faqItems = [
    {
      question: "How much is professional photo editing per image?",
      answer: "One photo is $1. At 10, the total becomes $7; at 20, $14; at 30, $21. The discount appears automatically, so there is no code to hunt for.",
    },
    {
      question: "What editing style do you deliver?",
      answer: "Believable color, controlled contrast, natural skin, and enough mood to feel intentional—not enough to announce that someone discovered presets yesterday.",
    },
    {
      question: "How do I send my photos for editing?",
      answer: "Upload the files, leave me a note, and check out securely. If your entire brief is ‘the lighting feels weird,’ that is still useful.",
    },
    {
      question: "Is every photograph edited by hand?",
      answer: "Yes. I edit every frame myself. The photograph stays real; it simply comes back with better manners.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/pricing/#service`,
    name: "Professional Photo Editing",
    description: metadata.description,
    serviceType: "Photo Editing Service",
    areaServed: "Worldwide",
    provider: { "@id": `${siteUrl}/#organization`, name: brandName },
    url: `${siteUrl}/pricing`,
    offers: [
      { "@type": "Offer", name: "1 Photo", price: "1", priceCurrency: "USD", url: `${siteUrl}/upload` },
      { "@type": "Offer", name: "10 Photos", price: "7", priceCurrency: "USD", url: `${siteUrl}/upload` },
      { "@type": "Offer", name: "20 Photos", price: "14", priceCurrency: "USD", url: `${siteUrl}/upload` },
      { "@type": "Offer", name: "30 Photos", price: "21", priceCurrency: "USD", url: `${siteUrl}/upload` },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Pricing", item: `${siteUrl}/pricing` },
    ],
  };

  return (
    <main className="page-wrap relative overflow-hidden text-white">
      <div className="page-overlay" />
      <div className="ambient-orb right-[10%] top-[16%] h-40 w-40 bg-[radial-gradient(circle,rgba(221,214,201,0.28),transparent_70%)]" />
      <div className="ambient-orb left-[8%] top-[58%] h-32 w-32 bg-[radial-gradient(circle,rgba(187,178,162,0.22),transparent_70%)]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="relative z-10">
        <div className="pt-24">
          <PricingSection />
        </div>
        <section className="px-5 pb-20 sm:px-6 sm:pb-24">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="section-shell rounded-3xl p-6 sm:p-8 lg:sticky lg:top-28">
              <p className="eyebrow">No fine print gymnastics</p>
              <h2 className="mt-5 text-3xl font-medium text-white sm:text-4xl">The useful questions</h2>
              <p className="pro-subtitle mt-4 text-sm sm:text-base">
                The short version: the number you see is the number you pay. Refreshing, I know.
              </p>
              <div className="mt-8 space-y-3">
                <div className="pro-panel p-4 sm:p-5">
                  <p className="tone-faint text-[11px] uppercase tracking-[0.18em]">At a glance</p>
                  <p className="tone-soft mt-3 text-sm sm:text-base">$1 per photo to start. Every group of 10 quietly removes $3 from the total.</p>
                </div>
                <div className="pro-panel p-4 sm:p-5">
                  <p className="tone-faint text-[11px] uppercase tracking-[0.18em]">Who this fits</p>
                  <p className="tone-soft mt-3 text-sm sm:text-base">Portrait sessions, event galleries, travel sets, and camera rolls with too many ‘almost perfect’ frames.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <article
                  key={item.question}
                  className={`pro-panel p-5 sm:p-6 ${index === 0 ? "section-shell" : ""}`}
                >
                  <h3 className="text-lg font-medium text-white sm:text-xl">{item.question}</h3>
                  <p className="pro-subtitle mt-3 text-sm sm:text-base">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
