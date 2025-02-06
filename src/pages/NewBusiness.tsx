import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BusinessRegistrationForm from "@/components/business/BusinessRegistrationForm";
import { usePaymentHandler } from "@/components/business/PaymentHandler";
import type { BusinessFormData } from "@/components/business/BusinessRegistrationForm";

export default function NewBusiness() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<BusinessFormData>({} as BusinessFormData);
  const { handlePayment } = usePaymentHandler({ 
    onSuccess: () => navigate("/dashboard"),
    formData
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          variant: "destructive",
          title: "Authentication Required",
          description: "Please sign in to create a business.",
        });
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleFormSubmit = async (values: BusinessFormData) => {
    setFormData(values);
    await handlePayment();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader onSignOut={handleSignOut} />

      <div className="container max-w-2xl py-8 flex-1">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")} 
          className="mb-6 hover:bg-secondary"
        >
          ← Back to Dashboard
        </Button>

        <Card className="shadow-lg border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">Create New Business</CardTitle>
          </CardHeader>
          <CardContent>
            <BusinessRegistrationForm onSubmit={handleFormSubmit} />
          </CardContent>
        </Card>
      </div>

      <footer className="border-t py-4 bg-background">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Marvello. All rights reserved.
        </div>
      </footer>
    </div>
  );
}