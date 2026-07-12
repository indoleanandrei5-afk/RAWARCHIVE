import type { MetadataRoute } from "next";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rawarchive.vercel.app").replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

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
      url: `${siteUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
      images: Array.from({ length: 13 }, (_, i) => `${siteUrl}/images/image${i + 1}.jpg`),
    },
    {
      url: `${siteUrl}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
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
  ];
}
