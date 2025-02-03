import { Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PaymentProgressProps {
  status: 'pending' | 'processing' | 'completed';
  progress: number;
}

export const PaymentProgress = ({ status, progress }: PaymentProgressProps) => {
  if (status === 'completed') return null;
  
  return (
    <div className="space-y-2">
      <div className="text-sm text-muted-foreground flex items-center gap-2">
        <Lock className="h-4 w-4" />
        Complete payment to unlock (₹999)
      </div>
      {status === 'processing' && (
        <Progress value={progress} className="w-full" />
      )}
    </div>
  );
};