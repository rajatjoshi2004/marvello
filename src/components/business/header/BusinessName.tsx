
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface BusinessNameProps {
  name: string;
  onUpdateName: (value: string) => Promise<void>;
}

export function BusinessName({ name, onUpdateName }: BusinessNameProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(name);

  return isEditing ? (
    <div className="flex items-center gap-2 w-full md:w-auto">
      <Input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        className="max-w-xs"
      />
      <Button onClick={() => {
        onUpdateName(newName);
        setIsEditing(false);
      }}>Save</Button>
      <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <CardTitle className="text-xl md:text-2xl">{name}</CardTitle>
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
