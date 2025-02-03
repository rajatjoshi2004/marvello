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
import { Building2, Link } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  google_review_url: z.string().url({
    message: "Please enter a valid URL.",
  }),
});

export type BusinessFormData = z.infer<typeof formSchema>;

interface BusinessFormProps {
  onSubmit: (values: BusinessFormData) => void;
  onCancel: () => void;
  isProcessing?: boolean;
}

export const BusinessForm = ({ onSubmit, onCancel, isProcessing }: BusinessFormProps) => {
  const form = useForm<BusinessFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      google_review_url: "https://g.page/r/",
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
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="hover:bg-secondary"
          >
            Cancel
          </Button>
          <Button 
            type="submit"
            className="px-8"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </Button>
        </div>
      </form>
    </Form>
  );
};