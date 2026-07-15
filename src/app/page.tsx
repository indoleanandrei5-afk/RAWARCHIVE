import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import WhyChooseUs from "@/components/WhyChooseUs";
import EditingBoundaries from "@/components/EditingBoundaries";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import SoftDivider from "@/components/SoftDivider";
import { brandName, contactEmail, defaultOgImage, siteUrl, socialLinks } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Professional Photo Editing Services",
  description:
    "Professional hand-edited photo retouching for photographers and brands. Fast turnaround, cinematic tone, and clean delivery.",
  keywords: [
    "professional photo editing services",
    "hand edited photo retouching",
    "cinematic portrait editing",
    "raw photo retouching service",
    "photo color correction service",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Professional Photo Editing Services",
    description:
      "Hand-edited cinematic photo retouching with natural skin tones, balanced color, and professional consistency.",
    url: "/",
    type: "website",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Photo Editing Services",
    description: "Hand-edited cinematic photo retouching with fast delivery and consistent quality.",
    images: [defaultOgImage],
  },
};

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandName,
    url: siteUrl,
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brandName,
    url: siteUrl,
    image: defaultOgImage,
    description:
      "Professional hand-edited photo retouching for photographers and brands with cinematic, refined results.",
    areaServed: "Worldwide",
    serviceType: "Photo Editing Service",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Photo Editing Packages",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Single Photo Edit",
          },
          price: "1",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "10-Photo Bundle Edit",
          },
          price: "7",
          priceCurrency: "USD",
        },
      ],
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: contactEmail,
      availableLanguage: ["English"],
    },
    sameAs: socialLinks,
  };

  return (
    <main className="page-wrap text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <Hero />
      <SoftDivider />
      <FeaturedWork />
      <SoftDivider />
      <WhyChooseUs />
      <SoftDivider />
      <EditingBoundaries />
      <SoftDivider />
      <HowItWorks />
      <SoftDivider />
      <PricingSection variant="home" />
      <Footer />
    </main>
  );
}
