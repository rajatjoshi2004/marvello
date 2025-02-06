
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { BusinessFormData } from "../business/BusinessRegistrationForm";

const SUBSCRIPTION_AMOUNT = 499;

interface UsePaymentHandlerProps {
  onSuccess: () => void;
  formData: BusinessFormData;
}

export function usePaymentHandler({ onSuccess, formData }: UsePaymentHandlerProps) {
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

  const createBusiness = async (paymentId: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You must be logged in to create a business.",
        });
        return false;
      }

      console.log("Creating business with data:", {
        name: formData.name,
        payment_id: paymentId,
        owner_id: session.user.id
      });

      const { data, error } = await supabase
        .from("businesses")
        .insert({
          name: formData.name,
          google_review_url: formData.google_review_url,
          mobile_number: formData.mobile_number,
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

      console.log("Business created successfully:", data);
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

  const calculateDiscountedAmount = () => {
    if (!formData.appliedCoupon?.valid) return SUBSCRIPTION_AMOUNT;

    let discountedAmount = SUBSCRIPTION_AMOUNT;
    if (formData.appliedCoupon.discount_type === 'percentage') {
      discountedAmount = SUBSCRIPTION_AMOUNT - (SUBSCRIPTION_AMOUNT * formData.appliedCoupon.discount_value / 100);
    } else {
      discountedAmount = SUBSCRIPTION_AMOUNT - formData.appliedCoupon.discount_value;
    }

    // Ensure amount is not negative
    return Math.max(discountedAmount, 0);
  };

  const handlePayment = async () => {
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

      const finalAmount = calculateDiscountedAmount();
      console.log("Creating Razorpay order with amount:", finalAmount);
      
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

      console.log("Order created successfully:", order);

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
          console.log("Payment successful:", response);
          const success = await createBusiness(response.razorpay_payment_id);
          if (success) {
            onSuccess();
          }
        },
        prefill: {
          name: session.user.email,
          email: session.user.email,
          contact: formData.mobile_number,
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

  return { handlePayment };
}
