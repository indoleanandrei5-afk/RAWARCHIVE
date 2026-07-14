import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about RAW ARCHIVE PHOTOS and our approach to natural, hand-edited photo retouching and cinematic color refinement.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | RAW ARCHIVE PHOTOS",
    description:
      "Discover the editing philosophy behind RAW ARCHIVE PHOTOS.",
    url: "/about",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
