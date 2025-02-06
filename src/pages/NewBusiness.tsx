import { useEffect } from "react";
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
import { Building2, Link, Phone } from "lucide-react";
import { isMobileValid } from "@/utils/validation";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const SUBSCRIPTION_AMOUNT = 499; // ₹499

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  google_review_url: z.string().url({
    message: "Please enter a valid URL.",
  }),
  mobile_number: z.string().refine((val) => isMobileValid(val), {
    message: "Mobile number must be exactly 10 digits.",
  }),
});

export default function NewBusiness() {
  const navigate = useNavigate();
  const { toast } = useToast();

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

    // Load Razorpay script with improved error handling
    const loadRazorpay = async () => {
      try {
        if (window.Razorpay) {
          console.log("Razorpay already loaded");
          return true;
        }

        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;
          script.onload = () => {
            console.log("Razorpay script loaded successfully");
            resolve(true);
          };
          script.onerror = () => {
            console.error("Failed to load Razorpay script");
            resolve(false);
          };
          document.body.appendChild(script);
        });
      } catch (error) {
        console.error("Error loading Razorpay:", error);
        return false;
      }
    };

    loadRazorpay();

    return () => {
      const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, [navigate, toast]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      google_review_url: "https://g.page/r/",
      mobile_number: "",
    },
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handlePayment = async (values: z.infer<typeof formSchema>) => {
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

      console.log("Creating Razorpay order...");
      
      // Create Razorpay order with improved error handling
      const response = await fetch(
        "https://joxolpszmnvzflwdcfxy.supabase.co/functions/v1/create-razorpay-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ 
            amount: SUBSCRIPTION_AMOUNT,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create order");
      }

      const order = await response.json();
      console.log("Order created successfully:", order);

      if (!window.Razorpay) {
        throw new Error("Payment system is not ready. Please refresh the page and try again.");
      }

      // Initialize Razorpay payment with improved configuration
      const options = {
        key: "rzp_test_51Ix3kRujWtAGYz",
        amount: order.amount,
        currency: order.currency,
        name: "Marvello",
        description: "Business Registration",
        order_id: order.id,
        handler: async function (response: any) {
          console.log("Payment successful:", response);
          await createBusiness(values, response.razorpay_payment_id);
        },
        prefill: {
          name: session.user.email,
          email: session.user.email,
          contact: values.mobile_number,
        },
        theme: {
          color: "#000000",
        },
        modal: {
          ondismiss: function() {
            console.log("Checkout form closed");
            toast({
              title: "Payment Cancelled",
              description: "You can try again when you're ready.",
            });
          }
        }
      };

      console.log("Initializing Razorpay payment...");
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error("Payment error:", error);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: error.message || "Failed to process payment. Please try again.",
      });
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

      console.log("Creating business with payment ID:", paymentId);

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", session.user.id)
        .single();

      if (profileError || !profile) {
        console.error("Error fetching profile:", profileError);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not find your profile. Please try logging in again.",
        });
        return;
      }

      const { error } = await supabase
        .from("businesses")
        .insert({
          name: values.name,
          google_review_url: values.google_review_url,
          mobile_number: values.mobile_number,
          owner_id: profile.id,
          payment_id: paymentId,
        });

      if (error) {
        console.error("Error creating business:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not create business. Please try again.",
        });
        return;
      }

      console.log("Business created successfully");
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
                  name="mobile_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Mobile Number</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                          <Input 
                            placeholder="Enter mobile number" 
                            className="pl-10 bg-background"
                            type="tel"
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
                    Pay ₹{SUBSCRIPTION_AMOUNT} & Create Business
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