import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Payment Successful",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
