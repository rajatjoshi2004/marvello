import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Business, Review } from "@/types/business";
import { BusinessHeader } from "@/components/business/BusinessHeader";
import { ReviewsTable } from "@/components/business/ReviewsTable";
import { UrlDialog } from "@/components/business/UrlDialog";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function BusinessDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [business, setBusiness] = useState<Business | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUrlDialog, setShowUrlDialog] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [uploading, setUploading] = useState(false);

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

  const handleUpdateBusiness = async (field: 'name' | 'google_review_url' | 'logo_url', value: string) => {
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
      if (field === 'google_review_url') setShowUrlDialog(false);
    } catch (error: any) {
      console.error(`Error updating business ${field}:`, error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Could not update business ${field.replace('_', ' ')}.`,
      });
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", reviewId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Review deleted successfully!",
      });

      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error: any) {
      console.error("Error deleting review:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not delete review.",
      });
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${id}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('business_logos')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('business_logos')
        .getPublicUrl(filePath);

      await handleUpdateBusiness('logo_url', publicUrl);

      toast({
        title: "Success",
        description: "Logo uploaded successfully!",
      });
    } catch (error: any) {
      console.error("Error uploading logo:", error.message);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not upload logo.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  if (!business) {
    return <div className="container py-8">Business not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader onSignOut={handleSignOut} />

      <main className="flex-1 container px-4 py-8">
        <Button variant="outline" onClick={() => navigate("/dashboard")} className="mb-6">
          Back to Dashboard
        </Button>

        <Card className="mb-8">
          <BusinessHeader
            business={business}
            onUpdateBusiness={handleUpdateBusiness}
            onLogoUpload={handleLogoUpload}
            uploading={uploading}
          />
          <CardContent>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setShowUrlDialog(true)}
            >
              <Link className="h-4 w-4" />
              Edit Review URL
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <ReviewsTable
              reviews={reviews}
              onDeleteReview={handleDeleteReview}
            />
          </CardContent>
        </Card>

        <UrlDialog
          open={showUrlDialog}
          onOpenChange={setShowUrlDialog}
          url={newUrl}
          onUrlChange={setNewUrl}
          onSave={() => handleUpdateBusiness('google_review_url', newUrl)}
        />
      </main>

      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Marvello. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
