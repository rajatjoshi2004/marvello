
import { useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, IndianRupee } from "lucide-react";

export default function Pricing() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.title = "Pricing - Marvello";
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-brand-yellow">Transparent. Flexible. Hassle-Free.</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
            We keep our pricing straightforward, so you know exactly what you're getting. All prices are inclusive of 18% GST—no hidden fees or surprises.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Basic Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-brand-yellow">Digital Plan</h2>
                <div className="flex items-center text-brand-yellow">
                  <IndianRupee className="w-5 h-5" />
                  <span className="text-3xl font-bold">499</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Ideal for those who want a quick, budget-friendly way to start collecting and managing Google reviews.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Digital QR Code for print materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Lifetime Access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Full Dashboard Access</span>
                </li>
              </ul>
              <Button className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-yellow-foreground" onClick={handleGetStarted}>Get Started</Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-2 border-brand-yellow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-brand-yellow">Physical Plan</h2>
                <div className="flex items-center text-brand-yellow">
                  <IndianRupee className="w-5 h-5" />
                  <span className="text-3xl font-bold">999</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">Perfect for businesses wanting a polished, hands-free way to invite reviews and elevate customer engagement.</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Physical QR Stand (NFC Enabled)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">NFC Technology Integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Lifetime Access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-brand-yellow mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Full Dashboard Access</span>
                </li>
              </ul>
              <Button className="w-full bg-brand-yellow hover:bg-brand-yellow/90 text-brand-yellow-foreground" onClick={handleGetStarted}>Get Started</Button>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8 border border-brand-yellow">
            <h3 className="text-xl font-bold mb-4 text-brand-yellow">Upgrading from 499 to 999?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No problem! Only pay the difference of INR 500 (plus any applicable delivery charges) and enjoy the additional benefits of the physical QR stand.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
