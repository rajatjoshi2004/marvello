import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface PaymentOptions {
  amount?: number;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpayPayment = () => {
  const { toast } = useToast();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');
  const [paymentProgress, setPaymentProgress] = useState(0);

  useEffect(() => {
    // Load Razorpay script if not already loaded
    if (!document.getElementById('razorpay-script')) {
      const script = document.createElement('script');
      script.id = 'razorpay-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const initializePayment = async (
    businessName: string, 
    onSuccess: (paymentId: string) => void,
    options?: PaymentOptions
  ) => {
    try {
      // Wait for Razorpay to load
      let attempts = 0;
      while (typeof window.Razorpay === 'undefined' && attempts < 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        attempts++;
      }

      if (typeof window.Razorpay === 'undefined') {
        throw new Error('Razorpay SDK failed to load. Please refresh the page and try again.');
      }

      setPaymentStatus('processing');
      setPaymentProgress(33);

      // For test mode, we'll use a mock order
      const testOrder = {
        orderId: 'order_' + Date.now(),
        amount: options?.amount || 99900, // ₹999
        currency: 'INR',
        keyId: 'rzp_test_YOUR_TEST_KEY' // Replace with your test key
      };

      setPaymentProgress(66);

      const razorpayOptions = {
        key: testOrder.keyId,
        amount: testOrder.amount,
        currency: testOrder.currency,
        name: "Marvello",
        description: "Business Registration Fee",
        order_id: testOrder.orderId,
        handler: function (response: any) {
          setPaymentProgress(100);
          setPaymentStatus('completed');
          onSuccess(response.razorpay_payment_id);
        },
        prefill: {
          name: businessName,
          ...options?.prefill
        },
        theme: {
          color: "#0f172a",
        },
        modal: {
          ondismiss: function() {
            setPaymentStatus('pending');
            setPaymentProgress(0);
          }
        }
      };

      const rzp = new window.Razorpay(razorpayOptions);
      rzp.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: error.message || "Failed to initialize payment. Please try again.",
      });
      setPaymentStatus('pending');
      setPaymentProgress(0);
    }
  };

  return {
    paymentStatus,
    paymentProgress,
    initializePayment,
  };
};