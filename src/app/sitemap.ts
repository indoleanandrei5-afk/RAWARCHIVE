import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/servicePages";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rawarchivephotos.com").replace(/\/$/, "");
// Content publication dates should only change when the page itself changes.
// Using the build time here makes every URL look newly updated on every deploy.
const contentUpdatedAt = new Date("2026-07-16T00:00:00.000Z");

const portfolioImages = [
  "portfolio/film-portrait-street.jpeg",
  "image16.webp",
  "portfolio/film-portrait-dinner.jpeg",
  "portfolio/film-travel-coast.jpeg",
  "portfolio/film-portrait-motion.jpeg",
  "image6.webp",
  "image3.webp",
  "portfolio/film-travel-beach.jpeg",
  "image13.webp",
  "image4.webp",
  "image7.webp",
  "image8.webp",
  "image14.webp",
  "image10.webp",
].map((path) => `${siteUrl}/images/${path}`);

const comparisonImages = [3, 4, 7, 10, 13, 16].flatMap((imageNum) => [
  `${siteUrl}/images/before/image${imageNum}.webp`,
  `${siteUrl}/images/image${imageNum}.webp`,
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes: MetadataRoute.Sitemap = servicePages.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: contentUpdatedAt,
    changeFrequency: "monthly",
    priority: 0.82,
  }));

  return [
    {
      url: `${siteUrl}`,
      lastModified: contentUpdatedAt,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${siteUrl}/images/image1.webp`,
        `${siteUrl}/images/image6.webp`,
        `${siteUrl}/images/image13.webp`,
      ],
    },
    {
      url: `${siteUrl}/before-after`,
      lastModified: contentUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.92,
      images: comparisonImages,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: contentUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.95,
      images: portfolioImages,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: contentUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: contentUpdatedAt,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${siteUrl}/upload`,
      lastModified: contentUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: contentUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: contentUpdatedAt,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...["privacy", "terms", "refunds"].map((route) => ({
      url: `${siteUrl}/${route}`,
      lastModified: contentUpdatedAt,
      changeFrequency: "yearly" as const,
      priority: 0.35,
    })),
    ...serviceRoutes,
  ];
}
