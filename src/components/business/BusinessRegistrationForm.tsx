
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { Building2, Link, Phone, Tag } from "lucide-react";
import { isMobileValid } from "@/utils/validation";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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
  coupon_code: z.string().optional(),
});

export type BusinessFormData = z.infer<typeof formSchema> & {
  appliedCoupon?: {
    valid: boolean;
    discount_value: number;
    discount_type: "percentage" | "fixed";
  };
};

interface BusinessRegistrationFormProps {
  onSubmit: (data: BusinessFormData) => void;
}

export default function BusinessRegistrationForm({ onSubmit }: BusinessRegistrationFormProps) {
  const { toast } = useToast();
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<BusinessFormData['appliedCoupon']>();

  const form = useForm<BusinessFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      google_review_url: "https://g.page/r/",
      mobile_number: "",
      coupon_code: "",
    },
  });

  const handleApplyCoupon = async () => {
    const couponCode = form.getValues("coupon_code");
    if (!couponCode) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a coupon code",
      });
      return;
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
        setAppliedCoupon(undefined);
        return;
      }

      setAppliedCoupon({
        valid: true,
        discount_value: result.discount_value,
        discount_type: result.discount_type,
      });

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

  const handleSubmit = async (values: BusinessFormData) => {
    onSubmit({ ...values, appliedCoupon });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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

        <FormField
          control={form.control}
          name="coupon_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Coupon Code</FormLabel>
              <div className="flex gap-2">
                <FormControl>
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input 
                      placeholder="Enter coupon code" 
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
              {appliedCoupon?.valid && (
                <p className="text-sm text-green-600 mt-1">
                  Coupon applied: {appliedCoupon.discount_value}
                  {appliedCoupon.discount_type === 'percentage' ? '%' : '₹'} off
                </p>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button 
            type="submit"
            className="px-8"
          >
            Pay {appliedCoupon?.valid 
              ? `₹${appliedCoupon.discount_type === 'percentage' 
                ? 499 - (499 * appliedCoupon.discount_value / 100) 
                : 499 - appliedCoupon.discount_value}`
              : '₹499'} & Create Business
          </Button>
        </div>
      </form>
    </Form>
  );
}
