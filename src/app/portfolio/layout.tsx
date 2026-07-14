import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Editing Portfolio",
  description:
    "Explore professional portrait retouching, cinematic color grading, and hand-edited photography by RAW ARCHIVE PHOTOS.",
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title: "Photo Editing Portfolio | RAW ARCHIVE PHOTOS",
    description:
      "View selected professional photo editing and cinematic color refinement work.",
    url: "/portfolio",
    type: "website",
  },
};

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
