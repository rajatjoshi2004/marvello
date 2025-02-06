
import { CardHeader } from "@/components/ui/card";
import type { Business } from "@/types/business";
import { Logo } from "./header/Logo";
import { BusinessName } from "./header/BusinessName";
import { MobileNumber } from "./header/MobileNumber";

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
  return (
    <CardHeader>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <Logo
            name={business.name}
            logoUrl={business.logo_url}
            onLogoUpload={onLogoUpload}
            onUpdateBusiness={onUpdateBusiness}
            uploading={uploading}
          />
          <div className="space-y-2">
            <BusinessName
              name={business.name}
              onUpdateName={(value) => onUpdateBusiness('name', value)}
            />
            <MobileNumber
              mobileNumber={business.mobile_number}
              onUpdateMobile={(value) => onUpdateBusiness('mobile_number', value)}
            />
          </div>
        </div>
      </div>
    </CardHeader>
  );
}
