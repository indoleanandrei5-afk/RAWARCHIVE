import type { Metadata } from "next";
import { brandName, contactEmail, defaultOgImage, siteUrl, socialLinks } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About & Contact",
  description:
    "Contact RAW ARCHIVE PHOTOS for professional hand-edited photo retouching. Reach out for portrait, creative, and commercial editing requests.",
  keywords: [
    "contact photo editor",
    "hire photo retoucher",
    "professional photo editing contact",
    "raw archive photos contact",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact RAW ARCHIVE PHOTOS",
    description: "Reach out for hand-edited cinematic photo retouching and consistent professional delivery.",
    url: "/contact",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact RAW ARCHIVE PHOTOS",
    description: "Reach out for hand-edited cinematic photo retouching and consistent professional delivery.",
    images: [defaultOgImage],
  },
};

export default function Contact() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `About and Contact ${brandName}`,
    url: `${siteUrl}/contact`,
    mainEntity: {
      "@type": "ProfessionalService",
      name: brandName,
      email: contactEmail,
      sameAs: socialLinks,
    },
  };

  return (
    <main className="page-wrap relative overflow-hidden px-6 py-20 sm:py-24">
      <div className="page-overlay" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <div className="page-container">
        <div className="max-w-4xl">
          <p className="eyebrow">About & Contact</p>
          <h1 className="pro-title mt-6">One editor. One vision. Very many coffees.</h1>
          <p className="pro-subtitle mt-6 text-base sm:text-lg">
            I am a one-man editing studio, a medicine student in Romania, and a full-time believer that good photos deserve great finishing.
          </p>
          <p className="pro-subtitle mt-4 text-base sm:text-lg">
            Most weeks are split between too much coffee and editing sessions. Some days I am acing exams, other days I am acing skin tones.
          </p>

          <div className="pro-shell mt-12 grid gap-6 p-7 sm:p-9 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-6">
            <div>
              <p className="field-label">About Me</p>
              <p className="pro-subtitle mt-3 text-base">
                RAW ARCHIVE PHOTOS is just me. No agency layers, no outsourced shortcuts, and absolutely no AI editing. I do not use or support AI retouching tools. Each image is refined manually to keep skin tones natural, contrast controlled, and the mood true to your story.
              </p>
            </div>

            <div>
              <p className="field-label">Why Clients Come Back</p>
              <p className="pro-subtitle mt-3 text-base">
                Sharp eye, steady style, clear communication, and clean delivery without shortcuts.
              </p>
            </div>

            <div>
              <p className="field-label">Contact Channels</p>
              <div className="mt-3 grid gap-3">
                <a
                  href="mailto:indoleanandrei5@gmail.com"
                  className="pro-panel group flex items-center justify-between px-4 py-3 text-sm text-white/90 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/8 hover:shadow-[0_12px_28px_rgba(0,0,0,0.2)]"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white/85 transition-all duration-500 ease-out group-hover:border-white/30 group-hover:bg-white/14">
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
                  <span className="text-white/45 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
                </a>
                <a
                  href="https://instagram.com/rawarchivephotos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pro-panel group flex items-center justify-between px-4 py-3 text-sm text-white/90 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/8 hover:shadow-[0_12px_28px_rgba(0,0,0,0.2)]"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white/85 transition-all duration-500 ease-out group-hover:border-white/30 group-hover:bg-white/14">
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
                  <span className="text-white/45 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
                </a>
                <a
                  href="https://tiktok.com/@rawarchivephotos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pro-panel group flex items-center justify-between px-4 py-3 text-sm text-white/90 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-white/28 hover:bg-white/8 hover:shadow-[0_12px_28px_rgba(0,0,0,0.2)]"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/8 text-white/85 transition-all duration-500 ease-out group-hover:border-white/30 group-hover:bg-white/14">
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
                  <span className="text-white/45 transition-all duration-500 ease-out group-hover:translate-x-0.5 group-hover:text-white/70">↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pro-panel p-7 sm:p-8">
            <p className="field-label">Need Something Fast?</p>
            <p className="pro-subtitle mt-4 text-base sm:text-lg">
              Upload your photos, complete payment, and leave clear notes on the look you want. I will handle the rest, personally.
            </p>
            <p className="mt-6 text-sm text-white/56">
              Tell me what you need: clean and bright, moody and cinematic, soft and natural, or please rescue what I edited at 2 AM.
            </p>
            <a
              href="/upload"
              className="mt-10 inline-flex rounded-full border border-white/16 bg-white/8 px-8 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:border-white/28 hover:bg-white/12"
            >
              Send photos over
            </a>
          </div>
          </div>

          <section className="mt-14 border-y border-white/10 py-10 sm:mt-18 sm:py-12">
            <p className="eyebrow">Before you send a brief</p>
            <h2 className="mt-6 text-3xl font-medium sm:text-4xl">A clear starting point.</h2>
            <div className="mt-8 grid gap-7 sm:grid-cols-3">
              <div className="border-t border-white/14 pt-5">
                <p className="field-label">Turnaround</p>
                <p className="pro-subtitle mt-3 text-sm">Typical delivery is 2–3 business days, depending on volume and complexity.</p>
              </div>
              <div className="border-t border-white/14 pt-5">
                <p className="field-label">Privacy</p>
                <p className="pro-subtitle mt-3 text-sm">Your files stay private unless you explicitly approve portfolio or social sharing.</p>
              </div>
              <div className="border-t border-white/14 pt-5">
                <p className="field-label">What to include</p>
                <p className="pro-subtitle mt-3 text-sm">Photo count, deadline, intended use, and one clear reference for the finish you want.</p>
              </div>
            </div>
            <a
              href="mailto:indoleanandrei5@gmail.com?subject=Project%20brief%20for%20RAW%20ARCHIVE%20PHOTOS"
              className="btn-secondary mt-9 inline-flex px-7 py-4 text-sm uppercase tracking-[0.14em]"
            >
              Email a project brief
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}
