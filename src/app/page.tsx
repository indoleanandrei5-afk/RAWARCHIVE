import Hero from "@/components/Hero";
import FeaturedWork from "@/components/FeaturedWork";
import WhyChooseUs from "@/components/WhyChooseUs";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";

function SoftDivider() {
  return (
    <div className="mx-auto h-px w-[min(92%,78rem)] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  );
}

export default function Home() {
  return (
    <main className="bg-black text-white">
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
