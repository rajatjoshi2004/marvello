import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

interface ProfileFormProps {
  user: any;
  profile: Profile;
  onClose: () => void;
  isGoogleUser: boolean;
}

export default function ProfileForm({ user, profile, onClose, isGoogleUser }: ProfileFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const updates: ProfileUpdate = {
        full_name: user.user_metadata.full_name,
      };
      
      const { error: profileError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
      
      if (profileError) throw profileError;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      onClose();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (isGoogleUser) {
    return (
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            value={user.user_metadata.full_name || ""}
            disabled
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            value={user.email || ""}
            disabled
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={profile?.full_name || ""}
          onChange={(e) => {
            if (user.user_metadata) {
              user.user_metadata.full_name = e.target.value;
            }
          }}
          placeholder="Enter your full name"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={user?.email || ""}
          onChange={(e) => {
            user.email = e.target.value;
          }}
          placeholder="Enter your email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter new password"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleUpdateProfile} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}