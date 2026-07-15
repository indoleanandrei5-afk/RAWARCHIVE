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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
    ],
  };

  return (
    <main className="page-wrap relative overflow-hidden px-4 py-16 text-white sm:px-6 sm:py-20">
      <div className="page-overlay" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="page-container">
        <div className="pro-shell p-7 text-center sm:p-10">
          <p className="eyebrow">What I edit</p>
          <h1 className="pro-title mt-5">Three kinds of chaos I know how to fix.</h1>
          <p className="pro-subtitle mx-auto mt-4 max-w-3xl text-base sm:text-lg">
            Portraits, landscapes, events. Different problems, same goal: make them look better without making them look fake.
          </p>
        </div>

        <section className="mt-8 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {servicePages.map((service) => (
            <article key={service.slug} className="section-shell rounded-3xl p-6 sm:p-7">
              <p className="tone-faint text-[11px] uppercase tracking-[0.2em]">This one is for</p>
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
                  See how I handle it
                </Link>
                <Link
                  href="/upload"
                  className="btn-primary inline-flex px-5 py-2.5 text-xs uppercase tracking-[0.12em] transition"
                >
                  Send a set
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
