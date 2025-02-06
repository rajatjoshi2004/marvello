
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export default function Footer() {
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const handleLanguageChange = (newLang: "en" | "hi") => {
    setLanguage(newLang);
    // In a real app, this would trigger language changes throughout the app
    // For now, we'll just update the state locally
  };

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Marvello by Webbicles. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/about" className="hover:text-primary">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">Contact Us</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary">Pricing</Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-primary">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="hover:text-primary">Cancellation/Refund Policy</Link>
              </li>
            </ul>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-9 px-0">
                <Globe className="h-4 w-4" />
                <span className="sr-only">Switch language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => handleLanguageChange("en")}
                className={language === "en" ? "bg-secondary" : ""}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleLanguageChange("hi")}
                className={language === "hi" ? "bg-secondary" : ""}
              >
                हिंदी
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </footer>
  );
}
