import type { Metadata } from "next";
import Link from "next/link";
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

const portfolioImages = [
  { src: "/images/portfolio/film-portrait-street.jpeg", alt: "Portrait in warm evening light on a city street", width: 721, height: 1088, category: "Portrait" },
  { src: "/images/portfolio/film-portrait-motion.jpeg", alt: "Candid flash portrait with deliberate motion", width: 721, height: 1088, category: "Editorial" },
  { src: "/images/portfolio/film-portrait-dinner.jpeg", alt: "Flash portrait at a dinner table", width: 1444, height: 2178, category: "Portrait" },
  { src: "/images/portfolio/film-travel-beach.jpeg", alt: "Woman in a sunhat facing the sea", width: 721, height: 1088, category: "Travel" },
  { src: "/images/portfolio/film-travel-coast.jpeg", alt: "Coastal city and blue sea viewed from above", width: 2178, height: 1444, category: "Travel" },
  { src: "/images/image6.webp", alt: "Architectural photograph with refined natural contrast", width: 722, height: 1088, category: "Architecture" },
  { src: "/images/image8.webp", alt: "Travel photograph with balanced color", width: 722, height: 1088, category: "Travel" },
  { src: "/images/image3.webp", alt: "Portrait of two people beside a car", width: 1444, height: 2178, category: "Portrait" },
  { src: "/images/image14.webp", alt: "Portrait photograph with hand-finished tonal balance", width: 2075, height: 3129, category: "Portrait" },
  { src: "/images/image13.webp", alt: "Editorial photograph with a restrained finish", width: 1444, height: 2178, category: "Editorial" },
  { src: "/images/image7.webp", alt: "Low-light portrait with balanced color", width: 2075, height: 3130, category: "Portrait" },
  { src: "/images/image4.webp", alt: "Landscape-format architectural photograph", width: 2178, height: 1444, category: "Architecture" },
  { src: "/images/image10.webp", alt: "Portrait with natural skin tone editing", width: 1444, height: 2178, category: "Portrait" },
  { src: "/images/image16.webp", alt: "Wide coastal photograph with refined color", width: 3130, height: 2075, category: "Editorial" },
];

const portfolioItemClasses = portfolioImages.map(
  () => "mb-4 w-full break-inside-avoid lg:mb-5",
);

export default function Portfolio() {
  const faqItems = [
    {
      question: "What type of images are in your portfolio?",
      answer:
        "Portraits, places, low light, difficult light, and one or two frames that needed a firm conversation with the color sliders.",
    },
    {
      question: "Are these real photographs?",
      answer: "Yes. Real photographs, edited one by one. What you see in the frame was there when the shutter clicked.",
    },
    {
      question: "Can I request a similar style for my own photos?",
      answer:
        "Yes. Send a reference or simply tell me what feels wrong. I can work with both detailed art direction and ‘please fix this weird green light.’",
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
    <main className="page-wrap relative overflow-hidden px-4 py-20 text-white sm:px-6 sm:py-28">
      <div className="page-overlay" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="page-container">
        <div className="mb-14 border-y border-white/10 py-10 sm:mb-16 sm:py-14">
          <p className="eyebrow">A small, honest selection</p>
          <div className="mt-7 grid gap-8 md:grid-cols-[1.25fr_0.75fr] md:items-end md:gap-14">
            <div>
              <h1 className="pro-title max-w-3xl">Real photographs. Properly finished.</h1>
              <p className="pro-subtitle mt-6 max-w-2xl text-base sm:text-lg">
                No mockups and no stock-photo parade. Just real frames I edited and still like looking at.
              </p>
            </div>
            <p className="tone-faint text-xs uppercase leading-6 tracking-[0.18em] md:text-right">
              Original proportions. Nothing squeezed into a fashionable little box.
            </p>
          </div>
        </div>

        <section>
          <div className="mb-8 sm:mb-10">
            <p className="eyebrow">The archive</p>
            <h2 className="mt-5 max-w-3xl text-3xl font-medium sm:text-5xl">Browse by subject. Or take the long way around.</h2>
          </div>
          <ImageGallery
            images={portfolioImages}
            columns="columns-1 gap-4 sm:columns-2 lg:columns-3 lg:gap-5"
            itemClassNames={portfolioItemClasses}
            showFilters
          />
        </section>

        <section className="mt-16 flex flex-col gap-7 border-y border-white/10 py-10 sm:mt-20 sm:flex-row sm:items-center sm:justify-between sm:py-12">
          <div>
            <p className="eyebrow">Your turn</p>
            <h2 className="mt-5 text-3xl font-medium sm:text-4xl">Have a set that needs this kind of attention?</h2>
          </div>
          <Link href="/upload" className="btn-primary cta-sheen px-8 py-4 text-sm font-semibold uppercase tracking-[0.15em]">
            Send me the photos
          </Link>
        </section>

        <section className="mt-16 border-t border-white/10 pt-10 sm:mt-20 sm:pt-12">
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
