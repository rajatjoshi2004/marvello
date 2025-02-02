import { Zap, Users, Target } from "lucide-react";

export default function Features() {
  return (
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
  );
}