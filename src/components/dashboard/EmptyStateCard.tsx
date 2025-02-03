import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRazorpayPayment } from "@/hooks/use-razorpay-payment";
import { Progress } from "@/components/ui/progress";

export default function EmptyStateCard() {
  const navigate = useNavigate();
  const { paymentStatus, paymentProgress, initializePayment } = useRazorpayPayment();

  const handleAddBusiness = () => {
    if (paymentStatus === 'completed') {
      navigate("/business/new");
      return;
    }
    initializePayment("Business Registration", () => {
      navigate("/business/new");
    }, {
      amount: 99900, // ₹999
      prefill: {
        email: 'test@example.com',
        contact: '9999999999'
      }
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-dashed border-primary/50 bg-muted/50">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          Add New Business
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentStatus !== 'completed' && (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Lock className="h-4 w-4" />
              Complete payment to unlock (₹999)
            </div>
            {paymentStatus === 'processing' && (
              <Progress value={paymentProgress} className="w-full" />
            )}
          </div>
        )}
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