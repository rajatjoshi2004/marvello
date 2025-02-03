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
  modal?: {
    ondismiss?: () => void;
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
    onError?: (error?: string) => void,
    options?: PaymentOptions
  ) => {
    try {
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

      // Call the Edge Function to create order
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
        body: {
          amount: options?.amount || 99900,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`
        }
      });

      if (orderError || !orderData) {
        throw new Error('Failed to create payment order. Please try again.');
      }

      setPaymentProgress(66);

      const razorpayOptions = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Marvello",
        description: "Business Registration Fee",
        order_id: orderData.orderId,
        handler: function (response: any) {
          setPaymentProgress(100);
          setPaymentStatus('completed');
          // Call onSuccess immediately after setting the status
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
            if (options?.modal?.ondismiss) {
              options.modal.ondismiss();
            }
          }
        }
      };

      const rzp = new window.Razorpay(razorpayOptions);
      rzp.on('payment.failed', function (response: any) {
        setPaymentStatus('pending');
        setPaymentProgress(0);
        if (onError) {
          onError(response.error.description || 'Payment failed');
        }
      });
      
      rzp.open();
    } catch (error: any) {
      console.error('Payment error:', error);
      setPaymentStatus('pending');
      setPaymentProgress(0);
      if (onError) {
        onError(error.message || "Failed to initialize payment. Please try again.");
      }
    }
  };

  return {
    paymentStatus,
    paymentProgress,
    initializePayment,
  };
};