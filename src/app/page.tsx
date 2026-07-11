import Hero from "@/components/Hero";
import HomeGallery from "@/components/HomeGallery";
import FeaturedWork from "@/components/FeaturedWork";
import WhyChooseUs from "@/components/WhyChooseUs";
import PricingSection from "@/components/PricingSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <HomeGallery />
      <FeaturedWork />
      <WhyChooseUs />
      <PricingSection />
      <HowItWorks />
      <Footer />
    </main>
  );
}
