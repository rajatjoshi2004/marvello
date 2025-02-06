
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h1>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-8 bg-card">
            <h3 className="text-2xl font-semibold mb-4">Standard Plan</h3>
            <p className="text-3xl font-bold mb-6">₹499<span className="text-lg font-normal text-muted-foreground">/month</span></p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Unlimited QR code generation</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Customer feedback management</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Basic analytics dashboard</span>
              </li>
            </ul>
            <Button onClick={() => navigate("/business/new")} className="w-full">Get Started</Button>
          </div>
          <div className="border rounded-lg p-8 bg-card">
            <h3 className="text-2xl font-semibold mb-4">Enterprise Plan</h3>
            <p className="text-3xl font-bold mb-6">Custom</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>All Standard features</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Advanced analytics and reporting</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Dedicated support team</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Custom integration options</span>
              </li>
            </ul>
            <Button variant="outline" onClick={() => navigate("/contact")} className="w-full">Contact Sales</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
