
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { useNavigate } from "react-router-dom";

export default function Refund() {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onGetStarted={handleGetStarted} />
      <main className="container mx-auto px-4 py-16 flex-1">
        <h1 className="text-4xl font-bold mb-8">Cancellation & Refund Policy</h1>
        <div className="prose dark:prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mt-8 mb-4">Cancellation Policy</h2>
          <p className="mb-6">
            You can cancel your subscription at any time. Your subscription will remain active until the end of your current billing period.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Refund Policy</h2>
          <p className="mb-4">
            We offer a 14-day money-back guarantee for our services. If you're not satisfied with our services, you can request a refund within 14 days of your initial purchase.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">How to Request a Refund</h2>
          <p className="mb-4">
            To request a refund, please contact our support team at support@marvello.com with your account details and reason for the refund.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Refund Processing</h2>
          <p className="mb-4">
            Refunds will be processed to the original payment method used for the purchase. Please allow 5-10 business days for the refund to appear in your account.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
