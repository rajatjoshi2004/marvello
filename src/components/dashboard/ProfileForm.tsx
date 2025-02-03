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
  const [newName, setNewName] = useState(profile?.full_name || "");
  const [newEmail, setNewEmail] = useState(user?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      if (newName !== profile.full_name) {
        const updates: ProfileUpdate = {
          full_name: newName,
        };
        
        const { error: profileError } = await supabase
          .from('profiles')
          .update(updates)
          .eq('id', user.id);
        
        if (profileError) throw profileError;
      }

      if (newEmail !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: newEmail,
        });
        if (emailError) throw emailError;
      }

      if (newPassword) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: newPassword,
        });
        if (passwordError) throw passwordError;
      }

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

  return (
    <div className="space-y-4">
      {!isGoogleUser && (
        <>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
        </>
      )}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        {!isGoogleUser && (
          <Button onClick={handleUpdateProfile} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </div>
    </div>
  );
}