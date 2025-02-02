import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StarRating } from "@/components/StarRating";
import { FeedbackForm } from "@/components/FeedbackForm";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [step, setStep] = useState<"rating" | "feedback" | "submitted">("rating");
  const { toast } = useToast();

  const handleRating = (rating: number) => {
    if (rating >= 4) {
      window.location.href = "https://g.page/r/CSa5iuOsEsYzEAI/review";
    } else {
      setStep("feedback");
    }
  };

  const handleFeedback = (feedback: string) => {
    // Here you would typically send the feedback to your backend
    console.log("Feedback received:", feedback);
    setStep("submitted");
    toast({
      title: "Thank you for your feedback!",
      description: "We appreciate you taking the time to help us improve.",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {step === "rating" && (
            <motion.div
              key="rating"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-8 shadow-lg space-y-6 text-center"
            >
              <h1 className="text-2xl font-semibold text-gray-900">
                How was your experience?
              </h1>
              <p className="text-gray-600">
                Tap a star to rate
              </p>
              <div className="flex justify-center">
                <StarRating onRate={handleRating} />
              </div>
            </motion.div>
          )}

          {step === "feedback" && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-8 shadow-lg space-y-6"
            >
              <h2 className="text-2xl font-semibold text-gray-900 text-center">
                We value your feedback
              </h2>
              <p className="text-gray-600 text-center">
                Please let us know how we can improve
              </p>
              <FeedbackForm onSubmit={handleFeedback} />
            </motion.div>
          )}

          {step === "submitted" && (
            <motion.div
              key="submitted"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl p-8 shadow-lg space-y-6 text-center"
            >
              <h2 className="text-2xl font-semibold text-gray-900">
                Thank you!
              </h2>
              <p className="text-gray-600">
                We appreciate your feedback and will use it to improve our services.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;