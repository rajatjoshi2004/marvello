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
import { Building2, Link, Phone } from "lucide-react";
import { isMobileValid } from "@/utils/validation";

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
});

export type BusinessFormData = z.infer<typeof formSchema>;

interface BusinessRegistrationFormProps {
  onSubmit: (data: BusinessFormData) => void;
}

export default function BusinessRegistrationForm({ onSubmit }: BusinessRegistrationFormProps) {
  const form = useForm<BusinessFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      google_review_url: "https://g.page/r/",
      mobile_number: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <div className="flex justify-end gap-4">
          <Button 
            type="submit"
            className="px-8"
          >
            Pay ₹499 & Create Business
          </Button>
        </div>
      </form>
    </Form>
  );
}