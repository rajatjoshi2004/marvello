import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import ProfileForm from "./ProfileForm";
import GoogleLinkButton from "./GoogleLinkButton";

export default function ProfileDialog() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const isGoogleUser = user?.app_metadata?.provider === 'google';

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleCloseDialog = () => {
    setIsEditingProfile(false);
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            {user?.user_metadata?.avatar_url ? (
              <Avatar>
                <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || "User"} />
                <AvatarFallback>
                  {profile?.full_name?.charAt(0) || <User className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Avatar>
                <AvatarFallback>
                  {profile?.full_name?.charAt(0) || <User className="h-5 w-5" />}
                </AvatarFallback>
              </Avatar>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{profile?.full_name || "User"}</p>
              <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {
            setIsEditingProfile(true);
            setIsDropdownOpen(false);
          }}>
            <User className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog 
        open={isEditingProfile} 
        onOpenChange={(open) => {
          if (!open) {
            handleCloseDialog();
          }
          setIsEditingProfile(open);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              {isGoogleUser 
                ? "Your profile is managed through Google." 
                : "Make changes to your profile here. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <ProfileForm
              user={user}
              profile={profile}
              onClose={handleCloseDialog}
              isGoogleUser={isGoogleUser}
            />
            {!user?.app_metadata?.provider && <GoogleLinkButton />}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}