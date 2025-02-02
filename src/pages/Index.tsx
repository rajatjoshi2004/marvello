import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Benefits from "@/components/landing/Benefits";
import Features from "@/components/landing/Features";
import About from "@/components/landing/About";
import UseCases from "@/components/landing/UseCases";
import HowItWorks from "@/components/landing/HowItWorks";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <Hero />
      <Benefits />
      <Features />
      <About />
      <UseCases />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </div>
  );
}