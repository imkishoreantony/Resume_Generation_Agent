import HomeNavbar from "../components/HomeNavbar";
import HeroSection from "../components/HeroSection";
import TechStackSection from "../components/TechStackSection";
import FeaturesSection from "../components/FeaturesSection";
import StatsSection from "../components/StatsSection";
import HowItWorksSection from "../components/HowItWorksSection";
import TestimonialsSection from "../components/TestimonialsSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";

function Home() {
  return (
    <div className="min-h-screen bg-white">

      <HomeNavbar />

      <main>

        <HeroSection />

        <TechStackSection />

        <FeaturesSection />

        <StatsSection />

        <HowItWorksSection />

        <TestimonialsSection />

        <CTASection />

      </main>

      <Footer />

      <ScrollToTopButton />

    </div>
  );
}

export default Home;