
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Pencil } from "lucide-react";
import { useState } from "react";
import { formatMobileNumber } from "@/utils/validation";

interface MobileNumberProps {
  mobileNumber: string | null;
  onUpdateMobile: (value: string) => Promise<void>;
}

export function MobileNumber({ mobileNumber, onUpdateMobile }: MobileNumberProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newMobile, setNewMobile] = useState(mobileNumber || '');
  const [mobileError, setMobileError] = useState('');

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
    onUpdateMobile(newMobile);
    setIsEditing(false);
  };

  return isEditing ? (
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
          setIsEditing(false);
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
      <span>{mobileNumber || 'No mobile number'}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsEditing(true)}
        className="h-8 w-8"
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </div>
  );
}
