
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
import { useIsMobile } from "@/hooks/use-mobile";

interface FooterProps {
  language: "en" | "hi";
  onLanguageChange: (lang: "en" | "hi") => void;
}

export default function Footer({ language, onLanguageChange }: FooterProps) {
  const isMobile = useIsMobile();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} {language === "hi" ? "मार्वेलो द्वारा वेबिकल्स" : "Marvello by Webbicles"}. {language === "hi" ? "सर्वाधिकार सुरक्षित" : "All rights reserved"}.
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 px-0">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Switch language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isMobile ? "center" : "end"}>
                <DropdownMenuItem 
                  onClick={() => onLanguageChange("en")}
                  className={language === "en" ? "bg-secondary" : ""}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onLanguageChange("hi")}
                  className={language === "hi" ? "bg-secondary" : ""}
                >
                  हिंदी
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/about" className="hover:text-primary">
                  {language === "hi" ? "हमारे बारे में" : "About Us"}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  {language === "hi" ? "संपर्क करें" : "Contact Us"}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary">
                  {language === "hi" ? "मूल्य निर्धारण" : "Pricing"}
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-primary">
                  {language === "hi" ? "गोपनीयता नीति" : "Privacy Policy"}
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-primary">
                  {language === "hi" ? "नियम और शर्तें" : "Terms & Conditions"}
                </Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="hover:text-primary">
                  {language === "hi" ? "रद्दीकरण/वापसी नीति" : "Cancellation/Refund Policy"}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
