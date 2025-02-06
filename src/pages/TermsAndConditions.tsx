
import { useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export default function TermsAndConditions() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.title = "Terms & Conditions - Marvello";
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
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <article className="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms & Conditions</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              By accessing or using Marvello (the "Service"), owned and operated by Webbicles LLP, you agree to be bound by these Terms & Conditions ("Terms"). If you do not agree with these Terms, you must not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. The Service</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Marvello provides tools for businesses to generate QR codes that facilitate the collection and management of customer reviews. Users can choose between:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>INR 499 Plan: Provides a digital QR code (image format).</li>
              <li>INR 999 Plan: Provides a physical QR stand with NFC enabled, including delivery charges.</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400">
              Each plan is for a single business. If you add another business, the same charge applies for each additional business.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <h3 className="text-xl font-medium mb-3">Registration:</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You may register via email/password or Google login. You must provide accurate information and update it as necessary.
            </p>
            <h3 className="text-xl font-medium mb-3">Account Security:</h3>
            <p className="text-gray-600 dark:text-gray-400">
              You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Payments</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Payment Gateway: We use Razorpay for payment processing. By making a purchase, you also agree to Razorpay's terms.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Pricing and Taxes: All prices are in Indian Rupees (INR). Prices are subject to change without notice. Taxes or fees may be added based on your location.
            </p>
            <h3 className="text-xl font-medium mb-3">Billing:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>INR 499 Plan: Pay online via Razorpay.</li>
              <li>INR 999 Plan: You may need to contact us for completing the transaction and providing delivery information.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Delivery Policy (For INR 999 Plan)</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We will deliver the physical QR stand with NFC to the address you provide. Delivery times may vary based on your location. We will not be liable for any delays beyond our reasonable control.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-400">
              All materials and content on Marvello (including software, text, images, and logos) are owned by or licensed to Webbicles LLP and are protected by intellectual property laws. You agree not to copy, distribute, or create derivative works without our explicit consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. User Conduct</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any applicable law or regulation.</li>
              <li>Provide false or misleading information.</li>
              <li>Infringe upon the rights of others.</li>
              <li>Interfere with the security or integrity of the Service.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> marvello@webbicles.com<br />
              <strong>Address:</strong> Block C, Hari Mansion, Park Market Road, Hirapur, Dhanbad, Jharkhand 826001
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
