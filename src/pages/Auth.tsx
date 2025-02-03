import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BaseHeader from "@/components/shared/BaseHeader";
import { Chrome } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <BaseHeader />

      <div className="container flex items-center justify-center min-h-[calc(100vh-136px)] py-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Welcome to Marvello</CardTitle>
            <CardDescription>Sign in with your Google account to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleGoogleSignIn}
              className="w-full"
              variant="outline"
            >
              <Chrome className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
          </CardContent>
        </Card>
      </div>

      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Marvello. All rights reserved.
        </div>
      </footer>
    </div>
  );
}