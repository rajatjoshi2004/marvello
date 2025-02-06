
import { Building2, Link, Phone } from "lucide-react";
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

interface BusinessDetailsFieldsProps {
  form: UseFormReturn<BusinessFormData>;
}

export function BusinessDetailsFields({ form }: BusinessDetailsFieldsProps) {
  return (
    <>
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
    </>
  );
}
