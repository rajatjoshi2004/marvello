
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { useNavigate } from "react-router-dom";

export default function Terms() {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header onGetStarted={handleGetStarted} />
      <main className="container mx-auto px-4 py-16 flex-1">
        <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p className="mb-4">
            By accessing and using Marvello's services, you accept and agree to be bound by these Terms and Conditions.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Use License</h2>
          <p className="mb-4">
            We grant you a limited, non-exclusive, non-transferable license to use our services for your business purposes in accordance with these terms.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Service Modifications</h2>
          <p className="mb-4">
            We reserve the right to modify or discontinue our services at any time without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of the service.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. User Obligations</h2>
          <p className="mb-4">
            You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
