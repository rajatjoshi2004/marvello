
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
          <h1 className="text-4xl font-bold text-center mb-4 text-primary">Transparent. Flexible. Hassle-Free.</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
            All prices are inclusive.<br />
            No hidden fees or surprises.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Basic Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Basic Plan</h2>
                <div className="flex items-center">
                  <IndianRupee className="w-5 h-5" />
                  <span className="text-3xl font-bold">499</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Digital QR Code for print materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Lifetime Access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Full Dashboard Access</span>
                </li>
              </ul>
              <Button className="w-full" onClick={handleGetStarted}>Get Started</Button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-2 border-primary">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Pro Plan</h2>
                <div className="flex items-center">
                  <IndianRupee className="w-5 h-5" />
                  <span className="text-3xl font-bold">999</span>
                </div>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Physical QR Stand (NFC Enabled)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">NFC Technology Integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Lifetime Access</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300">Full Dashboard Access</span>
                </li>
              </ul>
              <Button className="w-full" onClick={handleGetStarted}>Get Started</Button>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Upgrading from Basic Plan to Pro Plan?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No problem! Only pay the difference of INR 500 and enjoy the additional benefits of the physical QR stand.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
