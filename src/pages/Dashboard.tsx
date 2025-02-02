import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Link2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StarRating } from "@/components/StarRating";
import type { Database } from "@/integrations/supabase/types";

type Business = Database["public"]["Tables"]["businesses"]["Row"] & {
  reviews: Database["public"]["Tables"]["reviews"]["Row"][];
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    }
  };

  const fetchBusinesses = async () => {
    try {
      const { data: businessesData, error: businessesError } = await supabase
        .from("businesses")
        .select(`
          *,
          reviews (*)
        `);

      if (businessesError) throw businessesError;
      setBusinesses(businessesData || []);
    } catch (error: any) {
      console.error("Error fetching businesses:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleRatingSubmit = async (rating: number) => {
    if (!selectedBusiness) return;

    if (rating >= 4) {
      window.open(selectedBusiness.google_review_url, '_blank');
    } else {
      const link = `${window.location.origin}/business/${selectedBusiness.id}`;
      navigator.clipboard.writeText(link);
      toast({
        description: "Link copied to clipboard!",
        duration: 3000,
      });
    }
    setIsRatingModalOpen(false);
    setSelectedBusiness(null);
  };

  const openRatingModal = (business: Business) => {
    setSelectedBusiness(business);
    setIsRatingModalOpen(true);
  };

  useEffect(() => {
    checkUser();
    fetchBusinesses();
  }, []);

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {businesses.map((business) => {
          const averageRating = business.reviews.length
            ? (business.reviews.reduce((sum, review) => sum + review.rating, 0) / business.reviews.length).toFixed(1)
            : "No ratings";

          return (
            <Card key={business.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{business.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Average Rating:</span>
                  <span className="font-medium">{averageRating} ★</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Reviews:</span>
                  <span className="font-medium">{business.reviews.length}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/business/${business.id}`)}
                  >
                    Manage Business
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => openRatingModal(business)}
                  >
                    <Link2 className="w-4 h-4 mr-2" />
                    Copy Shareable Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}

        <Card className="flex items-center justify-center min-h-[200px] hover:shadow-lg transition-shadow">
          <Button variant="ghost" onClick={() => navigate("/business/new")}>
            + Add New Business
          </Button>
        </Card>
      </div>

      <Dialog open={isRatingModalOpen} onOpenChange={setIsRatingModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How would you rate your experience?</DialogTitle>
          </DialogHeader>
          <div className="py-6">
            <StarRating onRatingChange={handleRatingSubmit} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
