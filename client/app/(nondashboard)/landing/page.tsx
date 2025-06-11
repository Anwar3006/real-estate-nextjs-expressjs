import React from "react";
import HeroSection from "./_components/HeroSection";
import FeaturesSection from "./_components/FeaturesSection";
import DiscoverSection from "./_components/DiscoverSection";
import HotPicks from "./_components/HotPicks";
import CTASection from "./_components/CTASection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Landing Page",
  description: "Welcome to the landing page of our application.",
};

const LandingPage = async () => {
  return (
    <div className="relative min-h-screen">
      <HeroSection />

      {/* Fixed responsive spacing */}
      <div className="relative z-10 -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-32 mb-2">
        <FeaturesSection />
      </div>

      <div className="relative z-10">
        <HotPicks />
      </div>

      <div className="relative z-10">
        <DiscoverSection />
      </div>

      <div className="relative z-10 bg-secondary-300">
        <CTASection />
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
