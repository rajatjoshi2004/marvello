
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
  language: "en" | "hi";
}

export default function Hero({ onGetStarted, language }: HeroProps) {
  return (
    <section className="px-4 py-24 text-center sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.1),transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(252,211,77,0.1),transparent_40%)]"></div>
      </div>
      <div className="mx-auto max-w-4xl space-y-8 relative">
        <div className="space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            {language === "hi" ? "अपने व्यवसाय को बढ़ाएं" : "Grow Your Business with"}{" "}
            <span className="text-brand-yellow inline-flex items-center">
              5⭐
            </span>{" "}
            <span className="text-primary">
              {language === "hi" ? "गूगल समीक्षाओं के साथ" : "Google Reviews"}
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {language === "hi" ? "नकारात्मक समीक्षाओं से हमेशा के लिए छुटकारा पाएं!" : "Say Goodbye to Negative Reviews Forever!"}
          </p>
        </div>
        <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <Button 
            size="lg" 
            className="gap-2 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/20"
            onClick={onGetStarted}
          >
            {language === "hi" ? "शुरू करें" : "Get Started"} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
