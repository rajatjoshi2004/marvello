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

  const handleFeedbackSubmit = async (feedback: { name: string; message: string }) => {
    if (!business) return;
    
    try {
      const { error } = await supabase.from("reviews").insert({
        business_id: business.id,
        reviewer_name: feedback.name,
        rating: 3,
        feedback: feedback.message,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Thank you for your feedback!",
      });
      setShowFeedbackForm(false);
      setSubmitted(true);
    } catch (error: any) {
      console.error("Error submitting review:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error submitting your review. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Business not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center mb-8">
        <Avatar className="w-20 h-20 mx-auto mb-4 md:w-24 md:h-24">
          <AvatarImage src={business.logo_url || ''} alt={business.name} />
          <AvatarFallback>{business.name[0]}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold md:text-3xl">{business.name}</h1>
      </div>

      <div className="w-full max-w-md">
        {submitted ? (
          <div className="text-center px-4">
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
            <p className="text-center text-gray-600 mb-6">
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
    </div>
  );
}