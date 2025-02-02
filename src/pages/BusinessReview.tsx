import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarRating } from "@/components/StarRating";
import { FeedbackForm } from "@/components/FeedbackForm";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Business = Database["public"]["Tables"]["businesses"]["Row"];

export default function BusinessReview() {
  const { id } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching business:", error);
        setLoading(false);
        return;
      }

      setBusiness(data);
      setLoading(false);
    };

    fetchBusiness();
  }, [id]);

  const handleRating = async (rating: number) => {
    if (!business) return;

    if (rating >= 4) {
      window.location.href = business.google_review_url;
    } else {
      setShowFeedbackForm(true);
    }
  };

  const handleFeedbackSubmit = async (feedback: string) => {
    if (!business) return;

    const { error } = await supabase.from("reviews").insert({
      business_id: business.id,
      reviewer_name: feedback.split(":")[0],
      rating: 3,
      feedback: feedback.split(":")[1].trim(),
    });

    if (error) {
      console.error("Error submitting review:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error submitting your review. Please try again.",
      });
    } else {
      toast({
        title: "Success",
        description: "Thank you for your feedback!",
      });
      setShowFeedbackForm(false);
      setSubmitted(true);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Business not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
      <div className="mb-8 text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src={business.logo_url || ''} alt={business.name} />
          <AvatarFallback>{business.name[0]}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">{business.name}</h1>
      </div>

      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {submitted ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-green-600 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-4">
              We appreciate you taking the time to share your feedback with us. Your input helps us improve our services.
            </p>
            <p className="text-gray-500">
              Have a great day!
            </p>
          </div>
        ) : !showFeedbackForm ? (
          <>
            <p className="text-center text-gray-600 mb-8">
              How would you rate your experience with {business.name}?
            </p>
            <div className="flex justify-center mb-6">
              <StarRating onRate={handleRating} />
            </div>
          </>
        ) : (
          <FeedbackForm onSubmit={handleFeedbackSubmit} />
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} {business.name}. All rights reserved.
      </div>
    </div>
  );
}