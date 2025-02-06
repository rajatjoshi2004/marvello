
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LogoProps {
  name: string;
  logoUrl: string | null;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onUpdateBusiness: (field: 'logo_url', value: string) => Promise<void>;
  uploading: boolean;
}

export function Logo({ name, logoUrl, onLogoUpload, onUpdateBusiness, uploading }: LogoProps) {
  const { toast } = useToast();

  const handleLogoValidation = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const maxSize = 100 * 1024; // 100KB in bytes
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload only JPG, JPEG or PNG images",
      });
      e.target.value = ''; // Clear the input
      return;
    }

    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Logo image must be less than 100KB",
      });
      e.target.value = ''; // Clear the input
      return;
    }

    await onLogoUpload(e);
  };

  const handleRemoveLogo = async () => {
    try {
      await onUpdateBusiness('logo_url', '');
      toast({
        title: "Success",
        description: "Logo removed successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not remove logo",
      });
    }
  };

  return (
    <div className="relative group">
      <Avatar className="h-20 w-20">
        <AvatarImage src={logoUrl || ''} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="absolute -bottom-2 right-0 flex gap-1">
        <label 
          className="p-1 bg-primary rounded-full cursor-pointer hover:bg-primary/90"
          htmlFor="logo-upload"
        >
          <Pencil className="h-4 w-4 text-primary-foreground" />
          <input
            id="logo-upload"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            onChange={handleLogoValidation}
            disabled={uploading}
          />
        </label>
        {logoUrl && (
          <Button
            variant="destructive"
            size="icon"
            className="h-6 w-6"
            onClick={handleRemoveLogo}
            disabled={uploading}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
