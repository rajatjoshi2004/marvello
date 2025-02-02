import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface FeedbackFormProps {
  onSubmit: (feedback: string) => void;
}

export const FeedbackForm = ({ onSubmit }: FeedbackFormProps) => {
  const [feedback, setFeedback] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback.trim().length < 10) {
      toast({
        title: "Please provide more detail",
        description: "Your feedback should be at least 10 characters long.",
        variant: "destructive",
      });
      return;
    }
    onSubmit(feedback);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-4 w-full max-w-md"
      onSubmit={handleSubmit}
    >
      <Textarea
        placeholder="Please share your feedback with us..."
        className="min-h-[150px] resize-none"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <Button type="submit" className="w-full">
        Submit Feedback
      </Button>
    </motion.form>
  );
};