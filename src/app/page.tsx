import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import WhyChooseUs from "@/components/WhyChooseUs";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <FeaturedWork />
      <WhyChooseUs />
      <PricingSection />
      <Footer />
    </main>
  );
}
