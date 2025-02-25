
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CallToActionProps {
  onGetStarted: () => void;
}

export default function CallToAction({ onGetStarted }: CallToActionProps) {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl bg-primary px-6 py-16 text-center sm:px-12 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative">
            <h2 className="mb-6 text-4xl font-bold text-white">Ready to Grow Your Business?</h2>
            <p className="mb-8 text-lg text-white/90">
              Zero Computer Skills Needed • Works for Every Type of Business
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              className="gap-2 hover:scale-105 transition-all duration-300 shadow-xl"
              onClick={onGetStarted}
            >
              Get Started Now <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
