import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

export default function ProfileDialog() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        if (profileData) {
          setProfile(profileData);
        }
      }
    };
    loadProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          {user?.user_metadata?.avatar_url ? (
            <Avatar>
              <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || "User"} />
              <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
            </Avatar>
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[325px]">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-20 w-20">
              <AvatarImage 
                src={user?.user_metadata?.avatar_url} 
                alt={profile?.full_name || "User"} 
              />
              <AvatarFallback>
                <User className="h-10 w-10" />
              </AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-medium">{user?.user_metadata?.full_name || "User"}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button
            variant="destructive"
            className="w-full"
            onClick={handleSignOut}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}