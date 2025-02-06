
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type BusinessFormData } from "../schemas/businessFormSchema";
import { type UseFormReturn } from "react-hook-form";

interface CouponFieldProps {
  form: UseFormReturn<BusinessFormData>;
  onCouponApplied: (coupon: BusinessFormData['appliedCoupon']) => void;
}

export function CouponField({ form, onCouponApplied }: CouponFieldProps) {
  const { toast } = useToast();
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = async () => {
    const couponCode = form.getValues("coupon_code");
    if (!couponCode) {
      return; // Don't show any error, just return silently as coupon is optional
    }

    setIsApplyingCoupon(true);
    try {
      const { data, error } = await supabase
        .rpc('use_coupon', { coupon_code: couponCode });

      if (error) throw error;

      const [result] = data;
      if (!result.valid) {
        toast({
          variant: "destructive",
          title: "Invalid Coupon",
          description: result.message,
        });
        onCouponApplied(undefined);
        return;
      }

      const appliedCoupon = {
        valid: true,
        discount_value: result.discount_value,
        discount_type: result.discount_type,
      };
      
      onCouponApplied(appliedCoupon);

      toast({
        title: "Success",
        description: result.message,
      });
    } catch (error) {
      console.error('Error applying coupon:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to apply coupon. Please try again.",
      });
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  return (
    <FormField
      control={form.control}
      name="coupon_code"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base">Have a coupon? (Optional)</FormLabel>
          <div className="flex gap-2">
            <FormControl>
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input 
                  placeholder="Enter coupon code (optional)" 
                  className="pl-10 bg-background"
                  {...field} 
                />
              </div>
            </FormControl>
            <Button 
              type="button" 
              variant="outline"
              onClick={handleApplyCoupon}
              disabled={isApplyingCoupon || !field.value}
            >
              Apply
            </Button>
          </div>
          {form.watch("appliedCoupon")?.valid && (
            <p className="text-sm text-green-600 mt-1">
              Coupon applied: {form.watch("appliedCoupon").discount_value}
              {form.watch("appliedCoupon").discount_type === 'percentage' ? '%' : '₹'} off
            </p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
