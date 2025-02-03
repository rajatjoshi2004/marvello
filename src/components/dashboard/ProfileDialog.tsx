import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { User, LogOut, Mail, Key, UserCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";

export default function ProfileDialog() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [updateType, setUpdateType] = useState<'name' | 'email' | 'password' | null>(null);
  const [newValue, setNewValue] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
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

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const handleUpdateProfile = async () => {
    try {
      if (!updateType) return;

      switch (updateType) {
        case 'name':
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ full_name: newValue })
            .eq('id', user.id);
          
          if (updateError) throw updateError;
          
          setProfile({ ...profile, full_name: newValue });
          break;

        case 'email':
          const { error: emailError } = await supabase.auth.updateUser({
            email: newValue,
          });
          
          if (emailError) throw emailError;
          break;

        case 'password':
          const { error: passwordError } = await supabase.auth.updateUser({
            password: newPassword
          });
          
          if (passwordError) throw passwordError;
          break;
      }

      toast({
        title: "Success",
        description: `Your ${updateType} has been updated successfully.`,
      });
      
      setIsUpdateDialogOpen(false);
      setNewValue("");
      setCurrentPassword("");
      setNewPassword("");
      setUpdateType(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const handleUpdateClick = (type: 'name' | 'email' | 'password') => {
    setUpdateType(type);
    setNewValue("");
    setCurrentPassword("");
    setNewPassword("");
    setIsUpdateDialogOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            {user?.user_metadata?.avatar_url ? (
              <Avatar>
                <AvatarImage src={user.user_metadata.avatar_url} alt={user.user_metadata.full_name || "User"} />
                <AvatarFallback>{getInitials(profile?.full_name || "User")}</AvatarFallback>
              </Avatar>
            ) : (
              <Avatar>
                <AvatarFallback>{getInitials(profile?.full_name || "User")}</AvatarFallback>
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
          <DropdownMenuItem onClick={() => handleUpdateClick('name')}>
            <UserCircle className="mr-2 h-4 w-4" />
            <span>Update Name</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUpdateClick('email')}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Update Email</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleUpdateClick('password')}>
            <Key className="mr-2 h-4 w-4" />
            <span>Change Password</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {updateType === 'name' && 'Update Name'}
              {updateType === 'email' && 'Update Email'}
              {updateType === 'password' && 'Change Password'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {updateType === 'password' ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="new-value">
                  {updateType === 'name' ? 'New Name' : 'New Email'}
                </Label>
                <Input
                  id="new-value"
                  type={updateType === 'email' ? 'email' : 'text'}
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />
              </div>
            )}
            <Button onClick={handleUpdateProfile} className="w-full">
              Update {updateType}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}