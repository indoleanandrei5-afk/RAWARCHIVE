import type { Metadata } from "next";
import ImageGallery from "@/components/ImageGallery";
import { defaultOgImage } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse the complete RAW ARCHIVE PHOTOS portfolio featuring hand-edited portraits and landscapes with clean cinematic finishing.",
  keywords: [
    "photo editing portfolio",
    "before and after photo retouching examples",
    "cinematic portrait editing portfolio",
    "professional photo retouch gallery",
  ],
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Photo Editing Portfolio",
    description: "Hand-edited portraits and landscapes with cinematic, natural finishing.",
    url: "/portfolio",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Editing Portfolio",
    description: "Hand-edited portraits and landscapes with cinematic, natural finishing.",
    images: [defaultOgImage],
  },
};

const portfolioImages = Array.from({ length: 16 }, (_, i) => {
  const num = i + 1;
  const ext = num === 14 ? '.png' : '.jpg';
  return {
    src: `/images/image${num}${ext}`,
    alt: `Portfolio photo ${num}`,
  };
});

export default function Portfolio() {
  const faqItems = [
    {
      question: "What type of images are in your portfolio?",
      answer:
        "Portraits, lifestyle frames, and landscapes, all finished by hand with clean tone and a cinematic edge.",
    },
    {
      question: "Do these edits use AI tools?",
      answer: "No. Every example shown is manually retouched for tone, contrast, and detail control.",
    },
    {
      question: "Can I request a similar style for my own photos?",
      answer:
        "Yes. Leave notes, share references, and I will shape the edit around the direction you want while keeping the set consistent.",
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
    <main className="page-wrap relative overflow-hidden px-4 py-18 text-white sm:px-6 sm:py-22">
      <div className="page-overlay" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="page-container">
        <div className="pro-shell mb-10 px-5 py-8 text-center sm:mb-14 sm:px-8 sm:py-10">
          <p className="tone-faint text-xs uppercase tracking-[0.2em] max-[390px]:text-[10px] max-[390px]:tracking-[0.14em] sm:text-sm sm:tracking-[0.3em]">Portfolio</p>
          <h1 className="mt-4 text-3xl font-medium sm:text-5xl md:text-6xl">Complete Gallery</h1>
          <p className="pro-subtitle mx-auto mt-5 max-w-3xl text-base sm:text-lg">
            The work, properly presented. No clutter, no rush, just enough room to actually look.
          </p>
          <p className="tone-faint mt-4 text-xs uppercase tracking-[0.16em] max-[390px]:tracking-[0.12em] sm:text-sm sm:tracking-[0.25em]">16 images</p>
        </div>

        <ImageGallery images={portfolioImages} columns="grid gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3" />

        <section className="pro-shell mt-8 p-6 sm:mt-10 sm:p-8">
          <h2 className="text-2xl font-medium text-white sm:text-3xl">Portfolio FAQ</h2>
          <div className="mt-5 space-y-4">
            {faqItems.map((item) => (
              <article key={item.question} className="pro-panel p-5 sm:p-6">
                <h3 className="text-base font-medium text-white sm:text-lg">{item.question}</h3>
                <p className="pro-subtitle mt-3 text-sm sm:text-base">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
