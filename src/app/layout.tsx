import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://rawarchive.vercel.app").replace(/\/$/, "");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "RAW ARCHIVE PHOTOS",
    template: "%s | RAW ARCHIVE PHOTOS",
  },
  description: "Professional photo editing with hand-refined, cinematic results for photographers and brands.",
  keywords: [
    "photo editing",
    "professional photo retouching",
    "raw photo editing",
    "portrait editing",
    "color grading",
    "RAW ARCHIVE PHOTOS",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "RAW ARCHIVE PHOTOS",
    description: "Professional photo editing with hand-refined, cinematic results for photographers and brands.",
    siteName: "RAW ARCHIVE PHOTOS",
    images: [
      {
        url: "/images/image1.jpg",
        width: 1200,
        height: 630,
        alt: "RAW ARCHIVE PHOTOS showcase image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RAW ARCHIVE PHOTOS",
    description: "Professional photo editing with hand-refined, cinematic results for photographers and brands.",
    images: ["/images/image1.jpg"],
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
