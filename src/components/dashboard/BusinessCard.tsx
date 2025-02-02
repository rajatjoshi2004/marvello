import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import type { Business } from "@/types/business";
import { generateQRCode } from "@/utils/qrcode";

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-left text-xl">{business.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Total Reviews:</span>
          <span className="font-medium">{business.reviews?.length || 0}</span>
        </div>
        <div className="flex flex-col gap-2">
          <Button 
            className="w-full"
            onClick={() => navigate(`/business/${business.id}`)}
          >
            Manage Business
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleDownloadQR(business)}
          >
            <Download className="w-4 h-4 mr-2" />
            Download QR Code
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}