import type { Metadata } from "next";
import PricingSection from "@/components/PricingSection";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple photo editing pricing from RAW ARCHIVE PHOTOS. Upload your photos and pay per image.",
  keywords: [
    "photo editing pricing",
    "professional retouching cost",
    "how much does photo editing cost",
    "cinematic photo editing service",
  ],
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  const faqItems = [
    {
      question: "How much is professional photo editing per image?",
      answer: "RAW ARCHIVE PHOTOS starts at $1 per image, with value bundles for 10 and 30+ photos.",
    },
    {
      question: "What editing style do you deliver?",
      answer: "Every image is edited by hand for balanced contrast, natural skin tones, and a cinematic finish.",
    },
    {
      question: "How do I send my photos for editing?",
      answer: "Use the upload page, add your files, include edit notes, and complete checkout securely.",
    },
    {
      question: "Do you use AI for photo editing?",
      answer: "No. Edits are completed manually to preserve quality, consistency, and artistic control.",
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
    <main className="min-h-screen bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="pt-24">
        <PricingSection />
      </div>
      <section className="px-5 pb-20 text-white sm:px-6 sm:pb-24">
        <div className="mx-auto max-w-4xl rounded-4xl border border-white/10 bg-white/5 p-6 sm:p-10">
          <h2 className="text-3xl font-semibold sm:text-4xl">Photo Editing FAQ</h2>
          <div className="mt-8 space-y-6">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-3xl border border-white/10 bg-black/25 p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-white sm:text-xl">{item.question}</h3>
                <p className="mt-3 text-sm text-gray-200 sm:text-base">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
