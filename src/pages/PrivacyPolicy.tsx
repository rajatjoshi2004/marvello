
import { useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.title = "Privacy Policy - Marvello";
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <section className="mb-8">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Welcome to Marvello (the "Product"), owned and operated by Webbicles LLP ("Company," "we," "us," or "our"). This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you use our website and services (collectively, the "Service"). By accessing or using the Service, you consent to the collection and use of your personal information as described in this Privacy Policy. If you do not agree with any part of this Policy, please do not use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <h3 className="text-xl font-medium mb-3">Personal Data</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Registration Information: Name, email address, phone number, and password if registering via email. If you register via Google, we may also receive your Google profile information (name, email).</li>
              <li>Business Information: Business name, logo, Google My Business (GMB) review link, and any other details you provide when adding a business to the Marvello dashboard.</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">Payment Information</h3>
            <p className="mb-4">We use a third-party payment processor, Razorpay, to handle all transactions. We do not store your financial details (e.g., credit or debit card information) on our servers. Payment data is collected and processed in accordance with Razorpay's policies.</p>

            <h3 className="text-xl font-medium mb-3">Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Log Data: IP address, browser type, device type, operating system, pages or features accessed, and time/date stamps.</li>
              <li>Cookies and Similar Technologies: We may use cookies, beacons, and similar tracking technologies to personalize and improve your experience.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <h3 className="text-xl font-medium mb-3">To Provide and Maintain the Service:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Create and manage your Marvello account, generate QR codes, and process orders for QR materials.</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">To Process Transactions:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Handle payments securely via Razorpay.</li>
            </ul>

            <h3 className="text-xl font-medium mb-3">To Communicate with You:</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Send you account confirmations, updates, technical notices, and other administrative messages.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Share Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>With Service Providers: We share data with vendors or service providers who perform services on our behalf, such as payment processing, hosting, or analytics.</li>
              <li>Business Transfers: In the event of a merger, acquisition, or asset sale, your information may be transferred as part of that deal.</li>
              <li>Legal Requirements: We may disclose your information to comply with applicable laws, regulations, or legal obligations.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or would like to exercise your rights, please contact us at:</p>
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
