import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMediaQuery } from "@/hooks/use-mobile";

interface FeedbackFormProps {
  onSubmit: (feedback: { name: string; message: string }) => void;
}

export const FeedbackForm = ({ onSubmit }: FeedbackFormProps) => {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const { toast } = useToast();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNameError("");
    setFeedbackError("");

    if (!name.trim()) {
      if (isMobile) {
        setNameError("Please enter your name.");
      } else {
        toast({
          title: "Name is required",
          description: "Please enter your name.",
          variant: "destructive",
        });
      }
      return;
    }

    if (feedback.trim().length < 10) {
      if (isMobile) {
        setFeedbackError("Your feedback should be at least 10 characters long.");
      } else {
        toast({
          title: "Please provide more detail",
          description: "Your feedback should be at least 10 characters long.",
          variant: "destructive",
        });
      }
      return;
    }

    onSubmit({ name: name.trim(), message: feedback.trim() });
    
    if (isMobile) {
      setName("");
      setFeedback("");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setNameError("");
          }}
          className={`w-full ${nameError ? "border-red-500" : ""}`}
        />
        {nameError && (
          <p className="text-sm text-red-500">{nameError}</p>
        )}
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Please share your feedback with us..."
          className={`min-h-[150px] resize-none ${feedbackError ? "border-red-500" : ""}`}
          value={feedback}
          onChange={(e) => {
            setFeedback(e.target.value);
            setFeedbackError("");
          }}
        />
        {feedbackError && (
          <p className="text-sm text-red-500">{feedbackError}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Submit Feedback
      </Button>
    </motion.form>
  );
};