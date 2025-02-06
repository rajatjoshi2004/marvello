
import { ThumbsUp, Shield, Award } from "lucide-react";

interface BenefitsProps {
  language: "en" | "hi";
}

export default function Benefits({ language }: BenefitsProps) {
  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-primary">
          {language === "hi" ? "प्रमुख लाभ" : "Key Benefits"}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-8 text-center hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-700 rounded-2xl shadow-xl hover:shadow-2xl">
            <ThumbsUp className="mb-4 h-12 w-12 text-brand-yellow" />
            <h3 className="mb-2 text-xl font-semibold dark:text-white">
              {language === "hi" ? "अपनी सकारात्मक समीक्षाएं बढ़ाएं" : "Multiply your positive reviews"}
            </h3>
          </div>
          <div className="flex flex-col items-center p-8 text-center hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-700 rounded-2xl shadow-xl hover:shadow-2xl">
            <Shield className="mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-2 text-xl font-semibold dark:text-white">
              {language === "hi" ? "नकारात्मक प्रतिक्रिया को कम करें" : "Minimize your negative feedback"}
            </h3>
          </div>
          <div className="flex flex-col items-center p-8 text-center hover:scale-105 transition-all duration-300 bg-white dark:bg-gray-700 rounded-2xl shadow-xl hover:shadow-2xl">
            <Award className="mb-4 h-12 w-12 text-brand-yellow" />
            <h3 className="mb-2 text-xl font-semibold dark:text-white">
              {language === "hi" ? "एक बार भुगतान करें, कोई मासिक शुल्क नहीं" : "Pay once, no monthly fees"}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
