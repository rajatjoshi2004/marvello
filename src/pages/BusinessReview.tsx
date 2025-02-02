import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarRating } from "@/components/StarRating";
import { FeedbackForm } from "@/components/FeedbackForm";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Business = Database["public"]["Tables"]["businesses"]["Row"];

export default function BusinessReview() {
  const { id } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

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
    } else {
      setShowFeedbackForm(false);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">{business.name}</h1>
        {!showFeedbackForm ? (
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
    </div>
  );
}