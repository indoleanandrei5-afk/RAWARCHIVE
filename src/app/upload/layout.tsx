import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload",
  description: "Upload your photos and start professional hand-edited retouching with secure checkout.",
  alternates: {
    canonical: "/upload",
  },
};

export default function UploadLayout({ children }: { children: React.ReactNode }) {
  return children;
}
