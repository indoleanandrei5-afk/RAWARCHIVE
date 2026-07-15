import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { brandName, defaultOgImage, siteUrl } from "@/lib/seo";
import { servicePages } from "@/lib/servicePages";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const serviceBySlug = new Map(servicePages.map((service) => [service.slug, service]));

const legacyServiceRedirects = new Map<string, string>([
  ["wedding-photo-editing", "/services/event-photo-editing"],
  ["brand-content-photo-editing", "/services/event-photo-editing"],
  ["ecommerce-product-photo-editing", "/services/portrait-photo-editing"],
]);

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const legacyRedirect = legacyServiceRedirects.get(slug);
  const resolvedSlug = legacyRedirect ? legacyRedirect.replace("/services/", "") : slug;
  const service = serviceBySlug.get(resolvedSlug);

  if (!service) {
    return {
      title: "Service",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: service.title,
    description: service.description,
    keywords: service.keywords,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: service.title,
      description: service.description,
      url: `/services/${service.slug}`,
      type: "website",
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: service.title,
      description: service.description,
      images: [defaultOgImage],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const legacyRedirect = legacyServiceRedirects.get(slug);

  if (legacyRedirect) {
    redirect(legacyRedirect);
  }

  const service = serviceBySlug.get(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    provider: {
      "@type": "ProfessionalService",
      name: brandName,
      url: siteUrl,
    },
    areaServed: "Worldwide",
    serviceType: "Photo Editing Service",
    description: service.description,
    url: `${siteUrl}/services/${service.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "1",
      description: "Base rate starts at $1 per photo with bundle discounts.",
      url: `${siteUrl}/upload`,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Services", item: `${siteUrl}/services` },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `${siteUrl}/services/${service.slug}`,
      },
    ],
  };

  return (
    <main className="page-wrap relative overflow-hidden px-4 py-16 text-white sm:px-6 sm:py-20">
      <div className="page-overlay" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="page-container">
        <div className="max-w-5xl">
        <section className="pro-shell p-7 sm:p-10">
          <p className="eyebrow">The honest version</p>
          <h1 className="pro-title mt-5">{service.title}</h1>
          <p className="pro-subtitle mt-5 text-base sm:text-lg">{service.intro}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {service.points.map((point) => (
              <article key={point} className="section-shell rounded-3xl p-4 sm:p-5">
                <p className="tone-soft text-sm">{point}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/upload"
              className="btn-primary inline-flex px-6 py-3 text-xs uppercase tracking-[0.12em] transition"
            >
              Send me a set
            </Link>
            <Link
              href="/pricing"
              className="btn-secondary inline-flex px-6 py-3 text-xs uppercase tracking-[0.12em] transition"
            >
              Check the price
            </Link>
          </div>
        </section>

        <section className="section-shell mt-6 rounded-3xl p-7 sm:p-10">
          <h2 className="text-2xl font-medium text-white sm:text-3xl">A few useful questions</h2>
          <div className="mt-6 space-y-4">
            {service.faqs.map((item) => (
              <article key={item.question} className="pro-panel p-5 sm:p-6">
                <h3 className="text-base font-medium text-white sm:text-lg">{item.question}</h3>
                <p className="pro-subtitle mt-3 text-sm sm:text-base">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
        </div>
      </div>
    </main>
  );
}
