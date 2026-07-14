import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload Photos",
  description:
    "Upload your photos securely for professional hand-edited retouching, color grading, and cinematic photo editing.",
  alternates: {
    canonical: "/upload",
  },
  openGraph: {
    title: "Upload Photos | RAW ARCHIVE PHOTOS",
    description:
      "Securely upload your photos for professional hand-edited retouching and color refinement.",
    url: "/upload",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Upload Photos | RAW ARCHIVE PHOTOS",
    description:
      "Securely upload your photos for professional editing by RAW ARCHIVE PHOTOS.",
  },
};

export default function UploadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
