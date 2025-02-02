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
  const [selectedRating, setSelectedRating] = useState<number>(0);
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
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not load business details. Please try again.",
        });
        setLoading(false);
        return;
      }

      setBusiness(data);
      setLoading(false);
    };

    fetchBusiness();
  }, [id, toast]);

  const handleRating = (rating: number) => {
    console.log("Rating selected:", rating);
    setSelectedRating(rating);
    
    if (!business) {
      console.error("No business found");
      return;
    }

    if (rating >= 4) {
      window.location.href = business.google_review_url;
    } else {
      setShowFeedbackForm(true);
    }
  };

  const handleFeedbackSubmit = async (feedback: { name: string; mobile: string; message: string }) => {
    console.log("Submitting feedback:", { feedback, selectedRating, businessId: business?.id });
    
    if (!business) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Business information is missing. Please try again.",
      });
      return;
    }

    if (selectedRating === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide a rating before submitting your feedback.",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("reviews")
        .insert({
          business_id: business.id,
          reviewer_name: feedback.name,
          mobile_number: feedback.mobile,
          rating: selectedRating,
          feedback: feedback.message,
        });

      if (error) {
        console.error("Error submitting review:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to submit review. Please try again.",
        });
        return;
      }

      setShowFeedbackForm(false);
      setSubmitted(true);
    } catch (error) {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold">Business not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center">
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

        <div className="text-center text-sm text-muted-foreground mt-8">
          © {new Date().getFullYear()} {business.name}. All rights reserved.
        </div>
      </div>
    </div>
  );
}