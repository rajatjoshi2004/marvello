import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRazorpayPayment } from "@/hooks/use-razorpay-payment";
import { PaymentProgress } from "@/components/business/PaymentProgress";
import { useToast } from "@/hooks/use-toast";

export default function EmptyStateCard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { paymentStatus, paymentProgress, initializePayment } = useRazorpayPayment();

  const handleAddBusiness = () => {
    if (paymentStatus === 'completed') {
      navigate("/business/new");
      return;
    }
    
    initializePayment("Business Registration", 
      // Success callback
      () => {
        toast({
          title: "Payment Successful",
          description: "You can now add your business details.",
          variant: "default",
        });
        // Navigate immediately after successful payment
        navigate("/business/new");
      }, 
      // Failure callback
      (error) => {
        toast({
          title: "Payment Failed",
          description: error || "Please try again later.",
          variant: "destructive",
        });
      },
      {
        amount: 99900, // ₹999
        prefill: {
          email: 'test@example.com',
          contact: '9999999999'
        },
        // Add handler for modal close
        modal: {
          ondismiss: () => {
            toast({
              title: "Payment Cancelled",
              description: "You can try again when you're ready.",
              variant: "default",
            });
          }
        }
      }
    );
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-dashed border-primary/50 bg-muted/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          Add New Business
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <PaymentProgress status={paymentStatus} progress={paymentProgress} />
        <Button 
          onClick={handleAddBusiness}
          className="w-full group-hover:bg-primary/90 transition-colors"
          disabled={paymentStatus === 'processing'}
        >
          <Plus className="w-4 h-4 mr-2" />
          {paymentStatus === 'completed' ? 'Add Business' : 'Complete Payment'}
        </Button>
      </CardContent>
    </Card>
  );
}