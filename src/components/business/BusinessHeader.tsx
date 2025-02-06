import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Phone } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Business } from "@/types/business";
import { formatMobileNumber } from "@/utils/validation";
import { useToast } from "@/hooks/use-toast";

interface BusinessHeaderProps {
  business: Business;
  onUpdateBusiness: (field: 'name' | 'logo_url' | 'mobile_number', value: string) => Promise<void>;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  uploading: boolean;
}

export function BusinessHeader({ 
  business, 
  onUpdateBusiness, 
  onLogoUpload, 
  uploading 
}: BusinessHeaderProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [newName, setNewName] = useState(business.name);
  const [newMobile, setNewMobile] = useState(business.mobile_number || '');
  const [mobileError, setMobileError] = useState('');
  const { toast } = useToast();

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatMobileNumber(e.target.value);
    setNewMobile(formatted);
    setMobileError('');
  };

  const handleMobileSubmit = () => {
    if (!/^\d{10}$/.test(newMobile)) {
      setMobileError('Mobile number must be exactly 10 digits');
      return;
    }
    onUpdateBusiness('mobile_number', newMobile);
    setIsEditingMobile(false);
  };

  const handleLogoValidation = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const maxSize = 100 * 1024; // 100KB in bytes

    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Logo image must be less than 100KB",
      });
      e.target.value = ''; // Clear the input
      return;
    }

    await onLogoUpload(e);
  };

  return (
    <CardHeader>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src={business.logo_url || ''} alt={business.name} />
              <AvatarFallback>{business.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <label 
              className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer hover:bg-primary/90"
              htmlFor="logo-upload"
            >
              <Pencil className="h-4 w-4 text-primary-foreground" />
              <input
                id="logo-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoValidation}
                disabled={uploading}
              />
            </label>
          </div>
          <div className="space-y-2">
            {isEditingName ? (
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="max-w-xs"
                />
                <Button onClick={() => {
                  onUpdateBusiness('name', newName);
                  setIsEditingName(false);
                }}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditingName(false)}>Cancel</Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CardTitle className="text-xl md:text-2xl">{business.name}</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditingName(true)}
                  className="h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {isEditingMobile ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={newMobile}
                      onChange={handleMobileChange}
                      className="pl-9 max-w-xs"
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                    />
                  </div>
                  <Button onClick={handleMobileSubmit}>Save</Button>
                  <Button variant="outline" onClick={() => {
                    setIsEditingMobile(false);
                    setMobileError('');
                  }}>Cancel</Button>
                </div>
                {mobileError && (
                  <p className="text-sm text-destructive">{mobileError}</p>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{business.mobile_number || 'No mobile number'}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditingMobile(true)}
                  className="h-8 w-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
