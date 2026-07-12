import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import WhyChooseUs from "@/components/WhyChooseUs";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Professional Photo Editing Services",
  description:
    "Professional hand-edited photo retouching for photographers and brands. Fast turnaround, cinematic tone, and clean delivery.",
  alternates: {
    canonical: "/",
  },
};

function SoftDivider() {
  return (
    <div className="mx-auto h-px w-[min(92%,78rem)] bg-linear-to-r from-transparent via-white/20 to-transparent" />
  );
}

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "RAW ARCHIVE PHOTOS",
    url: "https://rawarchive.vercel.app",
    image: "https://rawarchive.vercel.app/images/image1.jpg",
    description:
      "Professional hand-edited photo retouching for photographers and brands with cinematic, refined results.",
    areaServed: "Worldwide",
    serviceType: "Photo Editing Service",
    sameAs: ["https://instagram.com/andrframes"],
  };

  return (
    <main className="bg-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <Hero />
      <SoftDivider />
      <FeaturedWork />
      <SoftDivider />
      <WhyChooseUs />
      <SoftDivider />
      <PricingSection />
      <Footer />
    </main>
  );
}
