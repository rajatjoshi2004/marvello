import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeedbackFormProps {
  onSubmit: (feedback: { name: string; mobile: string; message: string }) => void;
}

export const FeedbackForm = ({ onSubmit }: FeedbackFormProps) => {
  const [feedback, setFeedback] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [nameError, setNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNameError("");
    setMobileError("");
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

    if (!mobile.trim() || !/^\d{10}$/.test(mobile)) {
      if (isMobile) {
        setMobileError("Please enter a valid 10-digit mobile number.");
      } else {
        toast({
          title: "Invalid mobile number",
          description: "Please enter a valid 10-digit mobile number.",
          variant: "destructive",
        });
      }
      return;
    }

    if (!feedback.trim()) {
      if (isMobile) {
        setFeedbackError("Please provide your feedback.");
      } else {
        toast({
          title: "Feedback is required",
          description: "Please provide your feedback.",
          variant: "destructive",
        });
      }
      return;
    }

    onSubmit({ name: name.trim(), mobile: mobile.trim(), message: feedback.trim() });
    
    setName("");
    setMobile("");
    setFeedback("");
    
    if (!isMobile) {
      toast({
        title: "Success",
        description: "Thank you for your feedback!",
      });
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
        <Input
          placeholder="Mobile number (10 digits)"
          value={mobile}
          onChange={(e) => {
            setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
            setMobileError("");
          }}
          className={`w-full ${mobileError ? "border-red-500" : ""}`}
          type="tel"
          maxLength={10}
        />
        {mobileError && (
          <p className="text-sm text-red-500">{mobileError}</p>
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