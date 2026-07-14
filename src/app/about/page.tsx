import type { Metadata } from "next";
import { brandName, contactEmail, defaultOgImage, siteUrl, socialLinks } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about RAW ARCHIVE PHOTOS, a one-man studio focused on hand-edited cinematic retouching, natural skin tones, and consistent visual quality.",
  keywords: [
    "about RAW ARCHIVE PHOTOS",
    "hand edited photo studio",
    "no ai photo editing",
    "professional retoucher",
  ],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About RAW ARCHIVE PHOTOS",
    description: "A one-man hand-editing studio focused on cinematic and natural photo finishing.",
    url: "/about",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "About RAW ARCHIVE PHOTOS",
    description: "A one-man hand-editing studio focused on cinematic and natural photo finishing.",
    images: [defaultOgImage],
  },
};

export default function About() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brandName,
    url: `${siteUrl}/about`,
    description:
      "One-man photo editing studio delivering hand-refined, cinematic results with consistent color and natural skin tones.",
    email: contactEmail,
    sameAs: socialLinks,
    serviceType: "Photo Editing Service",
    areaServed: "Worldwide",
  };

  return (
    <main className="page-wrap relative overflow-hidden px-4 py-16 sm:px-6 sm:py-20">
      <div className="page-overlay" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <div className="page-container">
        <div className="max-w-5xl pro-shell px-6 py-10 sm:px-10 sm:py-12">
          <p className="eyebrow">About</p>
          <h1 className="pro-title mt-5">About RAW ARCHIVE PHOTOS</h1>
          <p className="pro-subtitle mt-5 max-w-3xl text-base sm:text-lg">
            RAW ARCHIVE PHOTOS is a boutique editing studio focused on refined color, balanced contrast, and visual storytelling that still feels human.
          </p>
          <p className="pro-subtitle mt-4 max-w-3xl text-base sm:text-lg">
            I am Andrei, the person behind every delivery. I am a medicine student in Romania and I built this studio around one principle: treat every image with the same focus, care, and precision I bring to my studies.
          </p>
          <p className="pro-subtitle mt-4 max-w-3xl text-base sm:text-lg">
            My weeks usually split between too much coffee and late-night color work. Some days I am acing exams, other days I am acing skin tones.
          </p>
          <p className="pro-subtitle mt-4 max-w-3xl text-base sm:text-lg">
            I do not use or support AI editing workflows. Every image is retouched by hand for natural skin, clean tone, and consistent cinematic character.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <a
            href="https://instagram.com/rawarchivephotos"
            target="_blank"
            rel="noopener noreferrer"
            className="pro-panel group flex items-center justify-between px-5 py-4 text-sm text-white/90 transition duration-300 hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/8"
          >
            <span className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white/85 transition group-hover:border-white/30 group-hover:bg-white/14">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.6">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.16em] text-white/52">Instagram</span>
                <span className="block text-white">@rawarchivephotos</span>
              </span>
            </span>
            <span className="text-white/45 transition group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
          </a>
          <a
            href="https://tiktok.com/@rawarchivephotos"
            target="_blank"
            rel="noopener noreferrer"
            className="pro-panel group flex items-center justify-between px-5 py-4 text-sm text-white/90 transition duration-300 hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/8"
          >
            <span className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white/85 transition group-hover:border-white/30 group-hover:bg-white/14">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-none stroke-current"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 4v9.3a3.8 3.8 0 1 1-2.4-3.5" />
                  <path d="M14 6.2c.8 1.6 2.1 2.7 4 3.1" />
                </svg>
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.16em] text-white/52">TikTok</span>
                <span className="block text-white">@rawarchivephotos</span>
              </span>
            </span>
            <span className="text-white/45 transition group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
          </a>
          <a
            href="mailto:indoleanandrei5@gmail.com"
            className="pro-panel group flex items-center justify-between px-5 py-4 text-sm text-white/90 transition duration-300 hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/8"
          >
            <span className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white/85 transition group-hover:border-white/30 group-hover:bg-white/14">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.6">
                  <rect x="3.5" y="6" width="17" height="12" rx="2" />
                  <path d="m5 8 7 5 7-5" />
                </svg>
              </span>
              <span>
                <span className="block text-[11px] uppercase tracking-[0.16em] text-white/52">Email</span>
                <span className="block text-white">indoleanandrei5@gmail.com</span>
              </span>
            </span>
            <span className="text-white/45 transition group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
          </a>
          </div>
        </div>
      </div>
    </main>
  );
}
