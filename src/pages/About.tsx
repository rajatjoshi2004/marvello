
import { useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Rocket, Users, Heart, Star } from "lucide-react";

export default function About() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.title = "About Us - Marvello";
  }, []);

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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Header onGetStarted={handleGetStarted} />
      
      <main className="flex-grow container mx-auto px-4 py-12 md:py-16">
        <article className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-brand-yellow bg-clip-text text-transparent">
              Welcome to Marvello
            </h1>
            <p className="text-2xl font-medium text-gray-600 dark:text-gray-300">
              Your Ultimate Tool for Business Growth
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group hover:scale-105 transition-all duration-300 flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
                <Rocket className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">Constantly evolving to meet your business needs</p>
            </div>
            <div className="group hover:scale-105 transition-all duration-300 flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">Building strong relationships with our clients</p>
            </div>
            <div className="group hover:scale-105 transition-all duration-300 flex flex-col items-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="p-4 rounded-full bg-primary/10 dark:bg-primary/20 mb-6">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Dedication</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">Committed to your business success</p>
            </div>
          </div>

          <div className="space-y-16">
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl font-bold inline-flex items-center justify-center gap-3">
                  <Star className="w-8 h-8 text-primary" />
                  <span className="bg-gradient-to-r from-primary to-brand-yellow bg-clip-text text-transparent">Our Story</span>
                </h2>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  We noticed a big gap in the market—collecting and managing customer reviews was time-consuming, often yielding limited results. Determined to provide a seamless, automated solution, our team at Marvello combined expertise in marketing, software development, and customer experience to create Marvello.
                </p>
              </div>
            </section>

            <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 dark:border-gray-700">
              <div className="max-w-3xl mx-auto text-center space-y-6">
                <h2 className="text-3xl font-bold inline-flex items-center justify-center gap-3">
                  <Rocket className="w-8 h-8 text-primary" />
                  <span className="bg-gradient-to-r from-primary to-brand-yellow bg-clip-text text-transparent">Our Vision</span>
                </h2>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  We believe every business, whether it's a cozy café or a large enterprise, should have the tools needed to excel in today's digital age. Positive customer reviews are crucial for building trust and credibility, and Marvello is designed to simplify and accelerate that process.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 italic">
              At Marvello, we're passionate about seeing our clients thrive. We're always innovating and adding new features to ensure you stay ahead of the competition in a fast-paced world.
            </p>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
