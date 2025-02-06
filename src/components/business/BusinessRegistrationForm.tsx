
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BusinessDetailsFields } from "./forms/BusinessDetailsFields";
import { CouponField } from "./forms/CouponField";
import { businessFormSchema, type BusinessFormData } from "./schemas/businessFormSchema";

interface BusinessRegistrationFormProps {
  onSubmit: (data: BusinessFormData) => void;
}

export default function BusinessRegistrationForm({ onSubmit }: BusinessRegistrationFormProps) {
  const [appliedCoupon, setAppliedCoupon] = useState<BusinessFormData['appliedCoupon']>();

  const form = useForm<BusinessFormData>({
    resolver: zodResolver(businessFormSchema),
    defaultValues: {
      name: "",
      google_review_url: "https://g.page/r/",
      mobile_number: "",
      coupon_code: "",
    },
  });

  const handleSubmit = async (values: BusinessFormData) => {
    onSubmit({ ...values, appliedCoupon });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <BusinessDetailsFields form={form} />
        <CouponField form={form} onCouponApplied={setAppliedCoupon} />

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
