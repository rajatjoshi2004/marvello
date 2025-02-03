import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import type { Business } from "@/types/business";
import { generateQRCode } from "@/utils/qrcode";

interface BusinessCardProps {
  business: Business;
  businessCount: number;
}

export default function BusinessCard({ business, businessCount }: BusinessCardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDownloadQR = async (business: Business) => {
    try {
      const link = `${window.location.origin}/review/${business.id}`;
      const qrDataUrl = await generateQRCode(link);
      
      const a = document.createElement('a');
      a.href = qrDataUrl;
      a.download = `${business.name}-qr-code.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast({
        description: "QR code downloaded successfully!",
        duration: 3000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to generate QR code",
        duration: 3000,
      });
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 border-border/50">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-primary">
            {business.name}
          </CardTitle>
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
            <span className="text-lg font-bold text-primary">
              {businessCount}
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Total Reviews: {business.reviews?.length || 0}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          className="w-full bg-primary hover:bg-primary/90 transition-colors"
          onClick={() => navigate(`/business/${business.id}`)}
        >
          Manage Business
        </Button>
        <Button
          variant="outline"
          className="w-full group-hover:border-primary/50 transition-colors"
          onClick={() => handleDownloadQR(business)}
        >
          <Download className="w-4 h-4 mr-2" />
          Download QR Code
        </Button>
      </CardContent>
    </Card>
  );
}