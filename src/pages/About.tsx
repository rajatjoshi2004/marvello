import { useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Rocket, Users, Heart, CheckCircle2, Star, Gauge } from "lucide-react";

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
          <h1 className="text-4xl font-bold text-center mb-8 text-primary">Welcome to Marvello</h1>
          <p className="text-4xl font-bold text-center mb-12 text-black dark:text-gray-300">Your Ultimate Tool for Business Growth</p>

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

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We noticed a big gap in the market—collecting and managing customer reviews was time-consuming, often yielding limited results. Determined to provide a seamless, automated solution, our team at Webbicles LLP combined expertise in marketing, software development, and customer experience to create Marvello.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We believe every business, whether it's a cozy café or a large enterprise, should have the tools needed to excel in today's digital age. Positive customer reviews are crucial for building trust and credibility, and Marvello is designed to simplify and accelerate that process.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Why Marvello?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Automated Customer Engagement</h3>
                    <p className="text-gray-600 dark:text-gray-300">Our proprietary QR code system helps you gather reviews effortlessly and continuously, making customer feedback collection a breeze.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Reputation Management</h3>
                    <p className="text-gray-600 dark:text-gray-300">Funnel positive reviews directly to Google, while catching less-than-perfect feedback privately for immediate resolution.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Gauge className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">User-Friendly Dashboard</h3>
                    <p className="text-gray-600 dark:text-gray-300">Access all your reviews in one centralized location with our intuitive dashboard, making business management effortless.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Rocket className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Real-Time Analytics</h3>
                    <p className="text-gray-600 dark:text-gray-300">Get valuable insights into your customer feedback with detailed analytics and reporting features.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <p className="text-gray-600 dark:text-gray-300 text-center">
            At Webbicles LLP, we're passionate about seeing our clients thrive. We're always innovating and adding new features to ensure you stay ahead of the competition in a fast-paced world.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
