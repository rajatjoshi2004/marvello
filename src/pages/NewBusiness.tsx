import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Building2, Link, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

declare const Razorpay: any;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  google_review_url: z.string().url({
    message: "Please enter a valid URL.",
  }),
});

export default function NewBusiness() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');
  const [paymentProgress, setPaymentProgress] = useState(0);

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      google_review_url: "https://g.page/r/",
    },
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handlePayment = async (values: z.infer<typeof formSchema>) => {
    try {
      setPaymentStatus('processing');
      setPaymentProgress(33);

      const response = await supabase.functions.invoke('create-razorpay-order');
      if (response.error) throw new Error(response.error.message);
      
      const { orderId, amount, currency, keyId } = response.data;
      setPaymentProgress(66);

      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: "Marvello",
        description: "Business Registration Fee",
        order_id: orderId,
        handler: async function (response: any) {
          setPaymentProgress(100);
          setPaymentStatus('completed');
          await createBusiness(values, response.razorpay_payment_id);
        },
        prefill: {
          name: values.name,
        },
        theme: {
          color: "#0f172a",
        },
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "Failed to initialize payment. Please try again.",
      });
      setPaymentStatus('pending');
      setPaymentProgress(0);
    }
  };

  const createBusiness = async (values: z.infer<typeof formSchema>, paymentId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You must be logged in to create a business.",
        });
        navigate("/auth");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", session.user.id)
        .single();

      if (profileError || !profile) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not find your profile. Please try logging in again.",
        });
        console.error("Error fetching profile:", profileError);
        return;
      }

      const { error } = await supabase
        .from("businesses")
        .insert({
          name: values.name,
          google_review_url: values.google_review_url,
          owner_id: profile.id,
        });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not create business. Please try again.",
        });
        console.error("Error creating business:", error);
        return;
      }

      toast({
        title: "Success",
        description: "Business created successfully!",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
    }
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
            {paymentStatus !== 'completed' && (
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Complete payment to unlock (₹999)
              </div>
            )}
            {paymentStatus === 'processing' && (
              <Progress value={paymentProgress} className="w-full" />
            )}
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlePayment)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Business Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input 
                            placeholder="Enter business name" 
                            className="pl-10 bg-background" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="google_review_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Google Review URL</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Link className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input 
                            placeholder="https://g.page/r/..." 
                            className="pl-10 bg-background"
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => navigate("/dashboard")}
                    className="hover:bg-secondary"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="px-8"
                  >
                    {paymentStatus === 'pending' ? 'Proceed to Payment' : 'Processing...'}
                  </Button>
                </div>
              </form>
            </Form>
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