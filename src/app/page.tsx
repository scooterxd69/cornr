import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TransformSection from "@/components/landing/TransformSection";
import ModeComparison from "@/components/landing/ModeComparison";
import ExamplesGallery from "@/components/landing/ExamplesGallery";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TransformSection />
      <ModeComparison />
      <ExamplesGallery />
      <Features />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </>
  );
}
