import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/StarRating";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Business = Database["public"]["Tables"]["businesses"]["Row"];
type Review = Database["public"]["Tables"]["reviews"]["Row"];

export default function BusinessDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [business, setBusiness] = useState<Business | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewerName, setReviewerName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchBusinessAndReviews();
  }, [id]);

  const fetchBusinessAndReviews = async () => {
    try {
      const { data: businessData, error: businessError } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", id)
        .single();

      if (businessError) throw businessError;

      const { data: reviewsData, error: reviewsError } = await supabase
        .from("reviews")
        .select("*")
        .eq("business_id", id)
        .order("created_at", { ascending: false });

      if (reviewsError) throw reviewsError;

      setBusiness(businessData);
      setReviews(reviewsData || []);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not load business details.",
      });
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!rating || !reviewerName.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please provide both a rating and your name.",
      });
      return;
    }

    try {
      const { error } = await supabase.from("reviews").insert({
        business_id: id!,
        reviewer_name: reviewerName,
        rating,
        feedback: feedback.trim() || null,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Review submitted successfully!",
      });

      // Reset form and refresh reviews
      setReviewerName("");
      setFeedback("");
      setRating(0);
      fetchBusinessAndReviews();
    } catch (error: any) {
      console.error("Error submitting review:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not submit review. Please try again.",
      });
    }
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!business) {
    return <div className="container py-8">Business not found.</div>;
  }

  const averageRating = reviews.length
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "No ratings yet";

  return (
    <div className="container py-8">
      <Button variant="outline" onClick={() => navigate("/dashboard")} className="mb-6">
        Back to Dashboard
      </Button>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{business.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">Average Rating: {averageRating}</p>
          <p className="text-sm text-muted-foreground mb-4">
            Google Review URL:{" "}
            <a
              href={business.google_review_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {business.google_review_url}
            </a>
          </p>
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Submit a Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="reviewerName">Your Name</Label>
              <Input
                id="reviewerName"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>
            <div>
              <Label>Rating</Label>
              <StarRating onRate={setRating} />
            </div>
            <div>
              <Label htmlFor="feedback">Feedback (Optional)</Label>
              <Input
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience"
              />
            </div>
            <Button onClick={handleSubmitReview}>Submit Review</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reviewer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Feedback</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.reviewer_name}</TableCell>
                  <TableCell>{review.rating} ★</TableCell>
                  <TableCell>{review.feedback || "-"}</TableCell>
                  <TableCell>
                    {new Date(review.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}