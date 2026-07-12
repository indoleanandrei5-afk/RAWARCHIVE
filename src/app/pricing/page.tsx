import type { Metadata } from "next";
import PricingSection from "@/components/PricingSection";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple photo editing pricing from RAW ARCHIVE PHOTOS. Upload your photos and pay per image.",
  alternates: {
    canonical: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="pt-24">
        <PricingSection />
      </div>
    </main>
  );
}
