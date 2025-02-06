
import { useEffect } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/shared/Footer";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { FeedbackForm } from "@/components/FeedbackForm";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

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

  const handleSubmit = async (feedback: { name: string; mobile: string; message: string }) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: feedback
      });

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
      <Header onGetStarted={handleGetStarted} />
      
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-primary">We're Here to Help!</h1>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
            Our dedicated support team is ready to help.
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
                    Webbicles LLP<br />
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
                  <p className="text-gray-600 dark:text-gray-300">Monday – Friday: 9:00 AM – 6:00 PM (IST)</p>
                  <p className="text-gray-600 dark:text-gray-300">Saturday: 10:00 AM – 2:00 PM (IST)</p>
                  <p className="text-gray-600 dark:text-gray-300">Sunday: Closed</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Closed on Public Holidays</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Send us a Message</h3>
              <FeedbackForm onSubmit={handleSubmit} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
