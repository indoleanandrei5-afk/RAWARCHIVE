import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Photo Editing Prices",
  description:
    "View RAW ARCHIVE PHOTOS pricing for professional photo retouching, color grading, and hand-edited image refinement.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Photo Editing Prices | RAW ARCHIVE PHOTOS",
    description:
      "Simple pricing for professional hand-edited photo retouching and color refinement.",
    url: "/pricing",
    type: "website",
  },
};

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
