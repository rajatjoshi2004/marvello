
import { useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    document.title = "Contact Us - Marvello";
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
          <h1 className="text-4xl font-bold text-center mb-4 text-primary">We're Here to Help!</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
            Have questions about Marvello or need assistance getting started? Our dedicated support team at Webbicles LLP is ready to help.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-600 dark:text-gray-300">marvello@webbicles.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-300">+91 98 5252 5522</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Address</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Block C, Hari Mansion,<br />
                    Park Market Road, Hirapur,<br />
                    Dhanbad, Jharkhand 826001
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Business Hours</h3>
                  <div className="space-y-2 text-gray-600 dark:text-gray-300">
                    <p>Monday – Friday: 9:00 AM – 6:00 PM (IST)</p>
                    <p>Saturday: 10:00 AM – 2:00 PM (IST)</p>
                    <p>Sunday: Closed</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Closed on Public Holidays</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300 space-y-6">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Need Help?</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Whether you're looking to upgrade your plan, troubleshoot an issue, or simply want to explore how Marvello can boost your business growth, we'd love to hear from you!
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Our support team is available during business hours to assist you with any questions or concerns you may have.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
