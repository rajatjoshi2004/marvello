
import { CheckCircle2 } from "lucide-react";

export default function About() {
  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-primary">
          What Are Marvello QR Codes?
        </h2>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">
            Marvello is a review-collection platform that helps all types of businesses shine by managing feedback in a smarter way.
          </p>
          <div className="grid gap-6 text-left sm:grid-cols-2">
            <div className="flex items-start gap-3 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
              <span className="dark:text-gray-300">Gather and filter customer feedback</span>
            </div>
            <div className="flex items-start gap-3 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CheckCircle2 className="h-5 w-5 text-brand-yellow shrink-0 mt-1" />
              <span className="dark:text-gray-300">Protect your online reputation and image</span>
            </div>
            <div className="flex items-start gap-3 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
              <span className="dark:text-gray-300">Maximize positive reviews on Google</span>
            </div>
            <div className="flex items-start gap-3 p-6 bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CheckCircle2 className="h-5 w-5 text-brand-yellow shrink-0 mt-1" />
              <span className="dark:text-gray-300">Address issues privately before they go public</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
