import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Link2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Business } from "@/types/business";

export default function Dashboard() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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

  const handleCopyLink = async (business: Business) => {
    const link = `${window.location.origin}/review/${business.id}`;
    await navigator.clipboard.writeText(link);
    toast({
      description: "Review link copied to clipboard!",
      duration: 3000,
    });
  };

  useEffect(() => {
    checkUser();
    fetchBusinesses();
  }, []);

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {businesses.map((business) => (
          <Card key={business.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{business.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Reviews:</span>
                <span className="font-medium">{business.reviews?.length || 0}</span>
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
                  onClick={() => handleCopyLink(business)}
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Copy Shareable Link
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="flex items-center justify-center min-h-[200px] hover:shadow-lg transition-shadow">
          <Button variant="ghost" onClick={() => navigate("/business/new")}>
            + Add New Business
          </Button>
        </Card>
      </div>
    </div>
  );
}