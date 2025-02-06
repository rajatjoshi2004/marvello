
import { useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Rocket, Users, Heart } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header onGetStarted={handleGetStarted} />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <article className="max-w-4xl mx-auto">
          <div className="text-4xl font-bold text-center mb-8">
            <span className="text-primary">Welcome to Marvello</span>
            <br />
            <span className="text-black dark:text-white">Your Ultimate Tool for Business Growth</span>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Rocket className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">Constantly evolving to meet your business needs</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">Building strong relationships with our clients</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <Heart className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Dedication</h3>
              <p className="text-center text-gray-600 dark:text-gray-300">Committed to your business success</p>
            </div>
          </div>

          <section className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
              We noticed a big gap in the market—collecting and managing customer reviews was time-consuming, often yielding limited results. Determined to provide a seamless, automated solution, our team at Marvello combined expertise in marketing, software development, and customer experience to create Marvello.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-center">
              We believe every business, whether it's a cozy café or a large enterprise, should have the tools needed to excel in today's digital age. Positive customer reviews are crucial for building trust and credibility, and Marvello is designed to simplify and accelerate that process.
            </p>
          </section>

          <p className="text-gray-600 dark:text-gray-300 text-center">
            At Marvello, we're passionate about seeing our clients thrive. We're always innovating and adding new features to ensure you stay ahead of the competition in a fast-paced world.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
