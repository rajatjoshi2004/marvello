import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Business } from "@/types/business";

interface BusinessHeaderProps {
  business: Business;
  onUpdateBusiness: (field: 'name' | 'logo_url', value: string) => Promise<void>;
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
  const [newName, setNewName] = useState(business.name);

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
                onChange={onLogoUpload}
                disabled={uploading}
              />
            </label>
          </div>
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
        </div>
      </div>
    </CardHeader>
  );
}