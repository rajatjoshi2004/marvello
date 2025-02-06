
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Benefits from "@/components/landing/Benefits";
import Features from "@/components/landing/Features";
import About from "@/components/landing/About";
import UseCases from "@/components/landing/UseCases";
import HowItWorks from "@/components/landing/HowItWorks";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/shared/Footer";

export default function Index() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    checkAuth();
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header onGetStarted={handleGetStarted} language={language} />
      <Hero onGetStarted={handleGetStarted} language={language} />
      <Benefits language={language} />
      <Features language={language} />
      <About language={language} />
      <UseCases language={language} />
      <HowItWorks language={language} />
      <CallToAction onGetStarted={handleGetStarted} language={language} />
      <Footer language={language} onLanguageChange={setLanguage} />
    </div>
  );
}
