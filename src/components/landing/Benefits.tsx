
import { Star, CheckCircle2, Gift } from "lucide-react";

export default function Benefits() {
  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-primary">
          Key Benefits
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-8 text-center hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-700 rounded-2xl shadow-xl hover:shadow-2xl">
            <Star className="mb-4 h-12 w-12 text-brand-yellow" />
            <h3 className="mb-2 text-xl font-semibold dark:text-white">Multiply your positive reviews</h3>
          </div>
          <div className="flex flex-col items-center p-8 text-center hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-700 rounded-2xl shadow-xl hover:shadow-2xl">
            <CheckCircle2 className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-semibold dark:text-white">Minimize your negative feedback</h3>
          </div>
          <div className="flex flex-col items-center p-8 text-center hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-700 rounded-2xl shadow-xl hover:shadow-2xl">
            <Gift className="mb-4 h-12 w-12 text-brand-yellow" />
            <h3 className="mb-2 text-xl font-semibold dark:text-white">Pay once, no monthly fees</h3>
          </div>
        </div>
      </div>
    </section>
  );
}
