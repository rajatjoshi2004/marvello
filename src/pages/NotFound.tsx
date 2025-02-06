
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/shared/Footer";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

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
    <div className="min-h-screen flex flex-col">
      <Header onGetStarted={handleGetStarted} />

      <main className="flex-grow bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-136px)]">
          <div className="text-center space-y-8 max-w-lg mx-auto">
            {/* Large 404 Text */}
            <h1 className="text-[150px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-brand-yellow leading-none">
              404
            </h1>
            
            {/* Error Message */}
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
                Oops! Page not found
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>
            </div>

            {/* Return Home Button */}
            <Button asChild className="mt-8">
              <Link to="/" className="inline-flex items-center gap-2">
                <HomeIcon size={18} />
                Return to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
