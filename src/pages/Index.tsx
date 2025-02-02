import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, Target, Zap, Gift, CheckCircle2, Moon, Sun, Stethoscope, Scale } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function Index() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b dark:border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Marvello</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Boost Your Professional Practice with <span className="text-primary">5⭐ Reviews</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Perfect for Doctors, Lawyers, and Healthcare Professionals!</p>
          <div className="flex justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-white dark:bg-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">Key Benefits for Professionals</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center p-6 text-center hover:scale-105 transition-transform">
              <Star className="mb-4 h-12 w-12 text-yellow-500" />
              <h3 className="mb-2 text-xl font-semibold dark:text-white">Build Trust with 5-Star Reviews</h3>
              <p className="text-gray-600 dark:text-gray-300">Enhance your professional reputation</p>
            </div>
            <div className="flex flex-col items-center p-6 text-center hover:scale-105 transition-transform">
              <CheckCircle2 className="mb-4 h-12 w-12 text-green-500" />
              <h3 className="mb-2 text-xl font-semibold dark:text-white">Manage Patient/Client Feedback</h3>
              <p className="text-gray-600 dark:text-gray-300">Handle feedback professionally</p>
            </div>
            <div className="flex flex-col items-center p-6 text-center hover:scale-105 transition-transform">
              <Gift className="mb-4 h-12 w-12 text-blue-500" />
              <h3 className="mb-2 text-xl font-semibold dark:text-white">Lifetime Professional Package</h3>
              <p className="text-gray-600 dark:text-gray-300">One-time investment for lasting results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Categories */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">Perfect For Your Practice</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white dark:bg-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Stethoscope className="h-8 w-8 text-blue-500" />
                <h3 className="text-lg font-semibold dark:text-white">Medical Professionals</h3>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Doctors & Physicians</li>
                <li>• Dentists</li>
                <li>• Chiropractors</li>
                <li>• Therapists</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white dark:bg-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-8 w-8 text-purple-500" />
                <h3 className="text-lg font-semibold dark:text-white">Legal Professionals</h3>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Attorneys</li>
                <li>• Law Firms</li>
                <li>• Legal Consultants</li>
                <li>• Paralegals</li>
              </ul>
            </div>
            <div className="rounded-lg bg-white dark:bg-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-8 w-8 text-green-500" />
                <h3 className="text-lg font-semibold dark:text-white">Other Professionals</h3>
              </div>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Accountants</li>
                <li>• Consultants</li>
                <li>• Real Estate Agents</li>
                <li>• Financial Advisors</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Magic QR Codes */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">Why Magic QR Codes?</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white dark:bg-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <Zap className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold dark:text-white">More Effective than Paid Ads</h3>
              <p className="text-gray-600 dark:text-gray-300">Get better results without expensive advertising costs</p>
            </div>
            <div className="rounded-lg bg-white dark:bg-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <Users className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold dark:text-white">Get New Customers Every Day</h3>
              <p className="text-gray-600 dark:text-gray-300">Consistently grow your customer base</p>
            </div>
            <div className="rounded-lg bg-white dark:bg-gray-700 p-6 shadow-sm hover:shadow-md transition-shadow">
              <Target className="mb-4 h-8 w-8 text-primary" />
              <h3 className="mb-2 text-lg font-semibold dark:text-white">100% Automate Your Marketing</h3>
              <p className="text-gray-600 dark:text-gray-300">Set it and forget it - we handle everything</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Are Magic QR Codes */}
      <section className="bg-white dark:bg-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">What Are Magic QR Codes?</h2>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
              Marvello is an automation system that helps all types of businesses achieve success through automated marketing and customer engagement.
            </p>
            <div className="grid gap-4 text-left sm:grid-cols-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                <span className="dark:text-gray-300">Get new customers every day</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                <span className="dark:text-gray-300">Retain customers & get repeat purchases</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                <span className="dark:text-gray-300">Convert leads to sales faster</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                <span className="dark:text-gray-300">Build a great customer experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Use */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">Who Can Use Magic QR Codes?</h2>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              "Small Business Owners",
              "Professionals (Doctors, Dentists, Lawyers)",
              "Hotel and Restaurant Owners",
              "Coaches & Consultants",
              "E-commerce Owners",
              "Solopreneurs / Self-Employed",
              "Makeup Artists & Bakers",
              "Real Estate Owners & Agents"
            ].map((user, index) => (
              <div key={index} className="rounded-lg bg-white dark:bg-gray-700 p-4 text-center shadow-sm">
                <p className="font-medium text-gray-900 dark:text-white">{user}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white dark:bg-gray-800 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">How Do Magic QR Codes Work?</h2>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Simply present these 2 QR codes to your customers—that's it!
              We'll take care of the rest to help your business grow rapidly.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl bg-primary dark:bg-[#374151] px-6 py-12 text-center sm:px-12">
            <h2 className="mb-6 text-3xl font-bold text-primary-foreground dark:text-white">Ready to Enhance Your Professional Practice?</h2>
            <p className="mb-8 text-lg text-primary-foreground/90 dark:text-gray-300">
              Join other successful professionals who trust Marvello
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary" className="gap-2">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Marvello. All rights reserved.
        </div>
      </footer>
    </div>
  );
}