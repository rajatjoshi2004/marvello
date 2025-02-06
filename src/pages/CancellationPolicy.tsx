
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
            <p className="text-gray-600 dark:text-gray-400">
              All plan purchases for Marvello (INR 499 or INR 999, both inclusive of 18% GST) are considered lifetime deals. No refunds are offered once payment has been successfully processed. By completing the purchase, you acknowledge and accept that all sales are final.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Order Cancellation</h2>
            <h3 className="text-xl font-medium mb-3">Pre-Dispatch Cancellation (INR 999 Plan):</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you wish to cancel your INR 999 Plan order before the product is dispatched, please contact us immediately at marvello@webbicles.com. While no refund is available due to our no-refund policy, we may offer store credit at our sole discretion.
            </p>
            <h3 className="text-xl font-medium mb-3">Post-Dispatch Cancellation (INR 999 Plan):</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Once the product has been dispatched, cancellations are not permitted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Damaged or Defective Items (INR 999 Plan)</h2>
            <p className="text-gray-600 dark:text-gray-400">
              If you receive a damaged or defective QR stand or NFC component, contact us within 48 hours of delivery with photo or video evidence. We will replace or repair the item at our discretion, free of additional charge.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Upgrades and Refunds</h2>
            <h3 className="text-xl font-medium mb-3">Upgrading (From INR 499 to INR 999):</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You can upgrade at any time by paying the balance amount (INR 500, inclusive of 18% GST, plus any delivery fees if applicable).
            </p>
            <h3 className="text-xl font-medium mb-3">No Partial Refunds:</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We do not issue partial refunds for differences in plan pricing or for any unused portion of the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Changes to This Policy</h2>
            <p className="text-gray-600 dark:text-gray-400">
              We reserve the right to amend this Cancellation/Refund Policy at any time. Changes will be posted on our website with an updated "Effective Date." Your continued use of Marvello indicates acceptance of these changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-400">
              For any questions or concerns regarding our Cancellation/Refund Policy, please reach out to us at:
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
