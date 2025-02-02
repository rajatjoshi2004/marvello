import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Pencil } from "lucide-react";

type Business = Database["public"]["Tables"]["businesses"]["Row"];
type Review = Database["public"]["Tables"]["reviews"]["Row"];

export default function BusinessDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [business, setBusiness] = useState<Business | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");

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
      setNewName(businessData.name);
      setNewUrl(businessData.google_review_url);
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

  const handleUpdateBusiness = async (field: 'name' | 'google_review_url', value: string) => {
    try {
      const { error } = await supabase
        .from("businesses")
        .update({ [field]: value })
        .eq("id", id!);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Business ${field.replace('_', ' ')} updated successfully!`,
      });

      fetchBusinessAndReviews();
      if (field === 'name') setIsEditingName(false);
      if (field === 'google_review_url') setIsEditingUrl(false);
    } catch (error: any) {
      console.error(`Error updating business ${field}:`, error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Could not update business ${field.replace('_', ' ')}.`,
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
    : null;

  return (
    <div className="container py-8">
      <Button variant="outline" onClick={() => navigate("/dashboard")} className="mb-6">
        Back to Dashboard
      </Button>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            {isEditingName ? (
              <div className="flex items-center gap-2">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="max-w-xs"
                />
                <Button onClick={() => handleUpdateBusiness('name', newName)}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditingName(false)}>Cancel</Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CardTitle>{business.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditingName(true)}
                  className="h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {averageRating && (
            <p className="text-lg mb-4">Average Rating: {averageRating} ★</p>
          )}
          <div className="flex items-center gap-2">
            {isEditingUrl ? (
              <div className="flex items-center gap-2 w-full">
                <Input
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={() => handleUpdateBusiness('google_review_url', newUrl)}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditingUrl(false)}>Cancel</Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 w-full">
                <a
                  href={business.google_review_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex-1"
                >
                  {business.google_review_url}
                </a>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditingUrl(true)}
                  className="h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            )}
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