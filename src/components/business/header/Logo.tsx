
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LogoProps {
  name: string;
  logoUrl: string | null;
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  uploading: boolean;
}

export function Logo({ name, logoUrl, onLogoUpload, uploading }: LogoProps) {
  const { toast } = useToast();

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
    <div className="relative">
      <Avatar className="h-20 w-20">
        <AvatarImage src={logoUrl || ''} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
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
  );
}
