import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { brandHandle, brandName, defaultKeywords, defaultOgImage, siteUrl } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Professional Photo Editing | RAW ARCHIVE PHOTOS",
    template: "%s | RAW ARCHIVE PHOTOS",
  },
  description:
    "Professional hand-edited photo retouching and color refinement for portraits, brands, and creators. Fast delivery, consistent tone, and cinematic quality.",
  applicationName: brandName,
  category: "photography",
  creator: brandName,
  publisher: brandName,
  manifest: "/manifest.webmanifest",
  keywords: defaultKeywords,
  alternates: {
    canonical: "/",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? {
          "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION,
        }
      : undefined,
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Professional Photo Editing | RAW ARCHIVE PHOTOS",
    description:
      "Professional hand-edited photo retouching and color refinement with natural skin tones, clean contrast, and cinematic consistency.",
    siteName: brandName,
    locale: "en_US",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "RAW ARCHIVE PHOTOS cinematic photo editing showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Photo Editing | RAW ARCHIVE PHOTOS",
    description:
      "Professional hand-edited retouching for portraits and creative work. Fast turnaround and consistent cinematic results.",
    creator: brandHandle,
    images: [defaultOgImage],
  },
  other: {
    "instagram:site": brandHandle,
    "tiktok:site": brandHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={
          {
            "--font-body": '"Avenir Next", "Segoe UI", sans-serif',
            "--font-display": '"Times New Roman", serif',
          } as React.CSSProperties
        }
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
