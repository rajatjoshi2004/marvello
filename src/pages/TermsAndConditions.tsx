
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
              By accessing or using Marvello (the "Service"), owned and operated by Webbicles LLP ("Company," "we," "us," or "our"), you agree to be bound by these Terms & Conditions ("Terms"). If you do not agree with these Terms, you must not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. The Service</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Marvello provides tools for businesses to generate QR codes that facilitate the collection and management of customer reviews. Users can select one of the following plans:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>INR 499 Plan: Provides a digital QR code in an image format.</li>
              <li>INR 999 Plan: Provides a physical QR stand with NFC enabled (including delivery charges).</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400">
              Each plan applies to a single business. For every additional business, you must purchase a separate plan.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Registration and Accounts</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Registration:</strong> You may register using an email/password or Google login. You must provide accurate, up-to-date information.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Payments and Upgrades</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Payment Gateway:</strong> All payments are processed via Razorpay. By purchasing a plan, you also agree to Razorpay's terms and conditions.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Pricing and GST:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>All prices (INR 499 and INR 999) are inclusive of 18% GST (Goods and Services Tax).</li>
              <li>These prices may be updated at our discretion without prior notice.</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Upgrade Policy (INR 499 to INR 999):</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>If you have already purchased the INR 499 Plan and wish to upgrade to the INR 999 Plan, you only need to pay the balance amount of INR 500 (plus any additional delivery fees, if applicable).</li>
              <li>To initiate an upgrade, please contact our support team.</li>
              <li>Upgrades are not eligible for partial refunds if you later decide to downgrade to the INR 499 Plan again.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Delivery (INR 999 Plan)</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              For the INR 999 Plan, a physical QR stand with NFC will be delivered to the address you provide during purchase or shared afterwards.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Delivery times vary depending on your location and other factors beyond our control. We do not guarantee specific delivery timelines.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
            <p className="text-gray-600 dark:text-gray-400">
              All content, images, designs, software, and branding on or through the Marvello platform are owned by or licensed to Webbicles LLP and protected by intellectual property laws. You agree not to copy, distribute, or create derivative works without our explicit written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. User Conduct</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Violate any local, state, national, or international law.</li>
              <li>Provide false or misleading information in connection with the Service.</li>
              <li>Interfere with or compromise the security or functionality of the Service.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Disclaimers</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>No Guarantee of Results:</strong> We provide tools that facilitate customer reviews, but we do not guarantee specific results in terms of the number or quality of reviews.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Service Availability:</strong> We strive to maintain uninterrupted service but may experience downtime for maintenance or technical issues.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600 dark:text-gray-400">
              To the fullest extent permitted by law, Webbicles LLP, including its directors, employees, and agents, shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
            <p className="text-gray-600 dark:text-gray-400">
              You agree to indemnify, defend, and hold harmless Webbicles LLP, its affiliates, and their respective employees from any claims, damages, or liabilities resulting from your use of the Service or violation of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Governing Law & Dispute Resolution</h2>
            <p className="text-gray-600 dark:text-gray-400">
              These Terms are governed by the laws of India. Any dispute shall be subject to the exclusive jurisdiction of the courts located in Dhanbad, Jharkhand. You agree to attempt good-faith negotiation with us before resorting to any legal proceedings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Changes to These Terms</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We may modify these Terms at any time. The "Effective Date" at the top will reflect the latest version. Your continued use of the Service indicates your acceptance of any modifications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400">
              For any questions about these Terms, please reach out to us at:
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
