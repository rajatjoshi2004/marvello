
import { useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export default function CancellationPolicy() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.title = "Cancellation/Refund Policy - Marvello";
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Cancellation/Refund Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Lifetime Deal / No Refund Policy</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              All purchases (INR 499 Plan or INR 999 Plan) for Marvello services are considered lifetime deals. We do not offer refunds once payment has been completed. By making a purchase, you acknowledge and agree that all sales are final.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Order Cancellation</h2>
            <h3 className="text-xl font-medium mb-3">Pre-Dispatch Cancellation (INR 999 Plan):</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you wish to cancel your order before the QR stand is dispatched, please contact us immediately. While no refund is available, we may offer store credit at our sole discretion.
            </p>
            <h3 className="text-xl font-medium mb-3">Post-Dispatch Cancellation (INR 999 Plan):</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Once the product has been dispatched, cancellations are not permitted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Damaged or Defective Items (INR 999 Plan)</h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you receive a damaged or defective QR stand or NFC-enabled product, contact us within 48 hours of receipt with photo/video evidence. We will arrange for a replacement or repair at our discretion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Changes to This Policy</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We reserve the right to modify or update this Cancellation/Refund Policy at any time. Any changes will be posted on our website with an updated "Effective Date." Your continued use of Marvello indicates acceptance of any revisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you have questions about our Cancellation/Refund Policy, please reach out to us at:
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
