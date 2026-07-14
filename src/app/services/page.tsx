import Link from "next/link";
import type { Metadata } from "next";
import { brandName, defaultOgImage, siteUrl } from "@/lib/seo";
import { servicePages } from "@/lib/servicePages";

export const metadata: Metadata = {
  title: "Photo Editing Services",
  description:
    "Explore specialized photo editing services for portraits, landscapes, and events.",
  keywords: [
    "photo editing services",
    "portrait editing service",
    "landscape photo editing service",
    "event photo editing service",
    "professional photo retouching service",
  ],
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Photo Editing Services",
    description: "Specialized hand-edited services for portraits, landscapes, and events.",
    url: "/services",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Editing Services",
    description: "Specialized hand-edited services for portraits, landscapes, and events.",
    images: [defaultOgImage],
  },
};

export default function ServicesHubPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${brandName} Service Guides`,
    itemListElement: servicePages.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: `${siteUrl}/services/${item.slug}`,
    })),
  };

  return (
    <main className="page-wrap relative overflow-hidden px-4 py-16 text-white sm:px-6 sm:py-20">
      <div className="page-overlay" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      <div className="page-container">
        <div className="pro-shell p-7 text-center sm:p-10">
          <p className="eyebrow">What I Edit</p>
          <h1 className="pro-title mt-5">Specialized Photo Editing Services</h1>
          <p className="pro-subtitle mx-auto mt-4 max-w-3xl text-base sm:text-lg">
            Different shoots need different handling. Pick the one that fits, and I will take it from there.
          </p>
        </div>

        <section className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {servicePages.map((service) => (
            <article key={service.slug} className="section-shell rounded-3xl p-6 sm:p-7">
              <p className="tone-faint text-[11px] uppercase tracking-[0.2em]">Focus</p>
              <h2 className="mt-3 text-2xl font-medium text-white">{service.shortTitle}</h2>
              <p className="pro-subtitle mt-3 text-sm sm:text-base">{service.description}</p>
              <ul className="tone-soft mt-4 space-y-2 text-sm">
                {service.points.map((point) => (
                  <li key={point}>• {point}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/services/${service.slug}`}
                  className="btn-secondary inline-flex px-5 py-2.5 text-xs uppercase tracking-[0.12em] transition hover:bg-white/12"
                >
                  Read service page
                </Link>
                <Link
                  href="/upload"
                  className="btn-primary inline-flex px-5 py-2.5 text-xs uppercase tracking-[0.12em] transition"
                >
                  Start upload
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}