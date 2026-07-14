import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact RAW ARCHIVE PHOTOS for professional photo editing, portrait retouching, and custom image refinement.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | RAW ARCHIVE PHOTOS",
    description:
      "Get in touch about professional hand-edited photo services.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
