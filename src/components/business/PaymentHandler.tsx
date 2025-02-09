import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { BusinessFormData } from "../business/BusinessRegistrationForm";

const SUBSCRIPTION_AMOUNT = 499;

interface UsePaymentHandlerProps {
  onSuccess: () => void;
}

export function usePaymentHandler({ onSuccess }: UsePaymentHandlerProps) {
  const { toast } = useToast();

  useEffect(() => {
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
  }, []);

  const createBusiness = async (data: BusinessFormData, paymentId: string | null = null) => {
    try {
      if (!data || Object.keys(data).length === 0) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Form data is missing. Please try again.",
        });
        return false;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You must be logged in to create a business.",
        });
        return false;
      }

      const { data: insertedData, error } = await supabase
        .from("businesses")
        .insert({
          name: data.name,
          google_review_url: data.google_review_url,
          mobile_number: data.mobile_number,
          owner_id: session.user.id,
          payment_id: paymentId,
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating business:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Could not create business. Please try again.",
        });
        return false;
      }

      toast({
        title: "Success",
        description: "Business created successfully!",
      });
      onSuccess();
      return true;
    } catch (error) {
      console.error("Unexpected error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
      return false;
    }
  };

  const calculateDiscountedAmount = (data: BusinessFormData) => {
    if (!data.appliedCoupon?.valid) return SUBSCRIPTION_AMOUNT;

    let discountedAmount = SUBSCRIPTION_AMOUNT;
    if (data.appliedCoupon.discount_type === 'percentage') {
      discountedAmount = SUBSCRIPTION_AMOUNT - (SUBSCRIPTION_AMOUNT * data.appliedCoupon.discount_value / 100);
    } else {
      discountedAmount = SUBSCRIPTION_AMOUNT - data.appliedCoupon.discount_value;
    }

    return Math.max(discountedAmount, 0);
  };

  const handlePayment = async (data: BusinessFormData) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You must be logged in to create a business.",
        });
        return;
      }

      const finalAmount = calculateDiscountedAmount(data);
      if (finalAmount === 0) {
        await createBusiness(data, null);
        return;
      }

      const { data: order, error } = await supabase.functions.invoke('create-razorpay-order', {
        body: { 
          amount: finalAmount,
          currency: "INR",
          receipt: `receipt_${Date.now()}`,
        },
      });

      if (error || !order) {
        console.error("Error creating order:", error);
        throw new Error(error?.message || "Failed to create order");
      }

      if (!window.Razorpay) {
        throw new Error("Payment system is not ready. Please refresh the page and try again.");
      }

      const options: RazorpayOptions = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Marvello",
        description: "Business Registration",
        order_id: order.id,
        handler: async function (response: any) {
          const success = await createBusiness(data, response.razorpay_payment_id);
          if (success) {
            onSuccess();
          }
        },
        prefill: {
          name: session.user.user_metadata.name,
          email: session.user.email,
          contact: data.mobile_number,
        },
        theme: {
          color: "#000000",
        },
        modal: {
          ondismiss: function () {
            toast({
              title: "Payment Cancelled",
              description: "You can try again when you're ready.",
            });
          }
        }
      };

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

  return { handlePayment };
}
