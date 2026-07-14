import type { MetadataRoute } from "next";
import { servicePages } from "@/lib/servicePages";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rawarchive.vercel.app").replace(/\/$/, "");
const now = new Date();

const portfolioImages = Array.from({ length: 16 }, (_, i) => {
  const imageNum = i + 1;
  const ext = imageNum === 14 ? "png" : "jpg";
  return `${siteUrl}/images/image${imageNum}.${ext}`;
});

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes: MetadataRoute.Sitemap = servicePages.map((service) => ({
    url: `${siteUrl}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.82,
  }));

  return [
    {
      url: `${siteUrl}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${siteUrl}/images/image1.jpg`,
        `${siteUrl}/images/image6.jpg`,
        `${siteUrl}/images/image13.jpg`,
      ],
    },
    {
      url: `${siteUrl}/before-after`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.92,
      images: portfolioImages,
    },
    {
      url: `${siteUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      images: portfolioImages,
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${siteUrl}/upload`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...serviceRoutes,
  ];
}
