import type { Metadata } from "next";
import PricingSection from "@/components/PricingSection";
import { defaultOgImage } from "@/lib/seo";

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
      answer: "It starts at $1 per photo. Once you hit 10 images, the bundle discount kicks in automatically: 10 = $7, 20 = $14, 30 = $21. If you are between tiers, the total follows the normal count.",
    },
    {
      question: "What editing style do you deliver?",
      answer: "Clean tone, balanced contrast, natural skin, and a cinematic finish that still feels like your work.",
    },
    {
      question: "How do I send my photos for editing?",
      answer: "Head to the upload page, add your files, leave your notes, and complete checkout securely.",
    },
    {
      question: "Do you use AI for photo editing?",
      answer: "No. Everything is adjusted manually so the final result feels considered, consistent, and actually yours.",
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

  return (
    <main className="page-wrap relative overflow-hidden text-white">
      <div className="page-overlay" />
      <div className="ambient-orb right-[10%] top-[16%] h-40 w-40 bg-[radial-gradient(circle,rgba(221,214,201,0.28),transparent_70%)]" />
      <div className="ambient-orb left-[8%] top-[58%] h-32 w-32 bg-[radial-gradient(circle,rgba(187,178,162,0.22),transparent_70%)]" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="relative z-10">
        <div className="pt-24">
          <PricingSection />
        </div>
        <section className="px-5 pb-20 sm:px-6 sm:pb-24">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div className="section-shell rounded-3xl p-6 sm:p-8 lg:sticky lg:top-28">
              <p className="eyebrow">Pricing Notes</p>
              <h2 className="mt-5 text-3xl font-medium text-white sm:text-4xl">The useful questions</h2>
              <p className="pro-subtitle mt-4 text-sm sm:text-base">
                The short version: clear pricing, automatic bundle discounts, and no surprise line items waiting at checkout.
              </p>
              <div className="mt-8 space-y-3">
                <div className="pro-panel p-4 sm:p-5">
                  <p className="tone-faint text-[11px] uppercase tracking-[0.18em]">At a glance</p>
                  <p className="tone-soft mt-3 text-sm sm:text-base">$1 per photo to start. Every 10 images automatically removes $3 from the total.</p>
                </div>
                <div className="pro-panel p-4 sm:p-5">
                  <p className="tone-faint text-[11px] uppercase tracking-[0.18em]">Who this fits</p>
                  <p className="tone-soft mt-3 text-sm sm:text-base">Portrait sets, event galleries, and anyone who wants clear pricing without unnecessary complexity.</p>
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
