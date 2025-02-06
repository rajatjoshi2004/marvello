
import * as z from "zod";
import { isMobileValid } from "@/utils/validation";

export const businessFormSchema = z.object({
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

export type BusinessFormData = z.infer<typeof businessFormSchema> & {
  appliedCoupon?: {
    valid: boolean;
    discount_value: number;
    discount_type: "percentage" | "fixed";
  };
};
