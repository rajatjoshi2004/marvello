import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useRazorpayPayment = () => {
  const { toast } = useToast();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'completed'>('pending');
  const [paymentProgress, setPaymentProgress] = useState(0);

  const initializePayment = async (businessName: string, onSuccess: (paymentId: string) => void) => {
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
        handler: function (response: any) {
          setPaymentProgress(100);
          setPaymentStatus('completed');
          onSuccess(response.razorpay_payment_id);
        },
        prefill: {
          name: businessName,
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

  return {
    paymentStatus,
    paymentProgress,
    initializePayment,
  };
};