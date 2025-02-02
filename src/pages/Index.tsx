import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Target, Zap, Gift, CheckCircle2, Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function Index() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b dark:border-gray-700 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo-icon.svg" alt="Marvello Logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-primary">
              Marvello
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Link to="/auth">
              <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-24 text-center sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.1),transparent_40%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(252,211,77,0.1),transparent_40%)]"></div>
        </div>
        <div className="mx-auto max-w-4xl space-y-8 relative">
          <div className="space-y-4 animate-fade-in">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Boost Your Business Growth with{" "}
              <span className="text-brand-yellow inline-flex items-center">
                5⭐ <Sparkles className="w-8 h-8 ml-2 text-brand-yellow animate-pulse" />
              </span>{" "}
              <span className="text-primary">
                Google Reviews
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Say Goodbye to Negative Reviews Forever!
            </p>
          </div>
          <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Link to="/auth">
              <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/20">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">
            Key Benefits
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center p-8 text-center hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-700 rounded-2xl shadow-xl hover:shadow-2xl">
              <Star className="mb-4 h-12 w-12 text-brand-yellow" />
              <h3 className="mb-2 text-xl font-semibold dark:text-white">1000X Frequency of Positive Reviews</h3>
            </div>
            <div className="flex flex-col items-center p-8 text-center hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-700 rounded-2xl shadow-xl hover:shadow-2xl">
              <CheckCircle2 className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-semibold dark:text-white">Reduce 98% of Negative Reviews</h3>
            </div>
            <div className="flex flex-col items-center p-8 text-center hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-700 rounded-2xl shadow-xl hover:shadow-2xl">
              <Gift className="mb-4 h-12 w-12 text-brand-yellow" />
              <h3 className="mb-2 text-xl font-semibold dark:text-white">Lifetime Deal</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Why Marvello QR Codes */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.1),transparent_40%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(252,211,77,0.1),transparent_40%)]"></div>
        </div>
        <div className="mx-auto max-w-7xl relative">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">
            Why Marvello QR Codes?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl bg-white dark:bg-gray-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Zap className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold dark:text-white">More Effective than Paid Ads</h3>
              <p className="text-gray-600 dark:text-gray-300">Get better results without expensive advertising costs</p>
            </div>
            <div className="rounded-2xl bg-white dark:bg-gray-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Users className="mb-4 h-8 w-8 text-brand-yellow" />
              <h3 className="mb-2 text-lg font-semibold dark:text-white">Get New Customers Every Day</h3>
              <p className="text-gray-600 dark:text-gray-300">Consistently grow your customer base</p>
            </div>
            <div className="rounded-2xl bg-white dark:bg-gray-700 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <Target className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold dark:text-white">100% Automate Your Marketing</h3>
              <p className="text-gray-600 dark:text-gray-300">Set it and forget it - we handle everything</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Are Magic QR Codes */}
      <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">
            What Are Marvello QR Codes?
          </h2>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">
              Marvello is an automation system that helps all types of businesses achieve success through automated marketing and customer engagement.
            </p>
            <div className="grid gap-6 text-left sm:grid-cols-2">
              <div className="flex items-start gap-3 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                <span className="dark:text-gray-300">Get new customers every day</span>
              </div>
              <div className="flex items-start gap-3 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <CheckCircle2 className="h-5 w-5 text-brand-yellow shrink-0 mt-1" />
                <span className="dark:text-gray-300">Retain customers & get repeat purchases</span>
              </div>
              <div className="flex items-start gap-3 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                <span className="dark:text-gray-300">Convert leads to sales faster</span>
              </div>
              <div className="flex items-start gap-3 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <CheckCircle2 className="h-5 w-5 text-brand-yellow shrink-0 mt-1" />
                <span className="dark:text-gray-300">Build a great customer experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Use */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(79,70,229,0.1),transparent_40%)]"></div>
        </div>
        <div className="mx-auto max-w-7xl relative">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">
            Who Can Use Marvello QR Codes?
          </h2>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              "Small Business Owners",
              "Professionals like Doctors, Lawyers",
              "Hotel and Restaurant Owners",
              "Coaches & Consultants",
              "E-commerce Owners",
              "Solopreneurs / Self-Employed",
              "Makeup Artists & Bakers",
              "Real Estate Owners & Agents"
            ].map((user, index) => (
              <div 
                key={index} 
                className="rounded-xl bg-white dark:bg-gray-700 p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-primary/5 hover:to-brand-yellow/5"
              >
                <p className="font-medium text-gray-900 dark:text-white">{user}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-primary">
            How Do Marvello QR Codes Work?
          </h2>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Simply present these 2 QR codes to your customers—that's it!
              We'll take care of the rest to help your business grow rapidly.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-brand-yellow px-6 py-16 text-center sm:px-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative">
              <h2 className="mb-6 text-4xl font-bold text-white">Ready to Grow Your Business?</h2>
              <p className="mb-8 text-lg text-white/90">
                Zero Computer Skills Needed • Works for Every Type of Business
              </p>
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="gap-2 hover:scale-105 transition-all duration-300 shadow-xl">
                  Get Started Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/logo-icon.svg" alt="Marvello Logo" className="w-6 h-6" />
            <span className="text-lg font-semibold text-primary">
              Marvello
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Marvello. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
