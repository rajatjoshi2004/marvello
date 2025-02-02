import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Link2, Moon, Sun } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Business } from "@/types/business";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/components/ThemeProvider";

export default function Dashboard() {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [newName, setNewName] = useState("");
  const { theme, setTheme } = useTheme();

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
    } else {
      setUser(session.user);
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      if (profileData) {
        setProfile(profileData);
        setNewName(profileData.full_name);
      }
    }
  };

  const fetchBusinesses = async () => {
    try {
      const { data: businessesData, error: businessesError } = await supabase
        .from("businesses")
        .select(`
          *,
          reviews (*)
        `);

      if (businessesError) throw businessesError;
      setBusinesses(businessesData || []);
    } catch (error: any) {
      console.error("Error fetching businesses:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  const handleUpdateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ full_name: newName })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        description: "Profile updated successfully!",
        duration: 3000,
      });
      
      setProfile({ ...profile, full_name: newName });
    } catch (error: any) {
      toast({
        variant: "destructive",
        description: error.message,
        duration: 3000,
      });
    }
  };

  const handleCopyLink = async (business: Business) => {
    const link = `${window.location.origin}/review/${business.id}`;
    await navigator.clipboard.writeText(link);
    toast({
      description: "Review link copied to clipboard!",
      duration: 3000,
    });
  };

  useEffect(() => {
    checkUser();
    fetchBusinesses();
  }, []);

  if (loading) {
    return <div className="container py-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Profile</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Profile Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      value={user?.email}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <Button
                    className="w-full"
                    onClick={handleUpdateProfile}
                  >
                    Update Profile
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map((business) => (
            <Card key={business.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-left text-xl">{business.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Reviews:</span>
                  <span className="font-medium">{business.reviews?.length || 0}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <Button 
                    className="w-full"
                    onClick={() => navigate(`/business/${business.id}`)}
                  >
                    Manage Business
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleCopyLink(business)}
                  >
                    <Link2 className="w-4 h-4 mr-2" />
                    Copy Shareable Link
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="flex items-center justify-center min-h-[200px] hover:shadow-lg transition-shadow">
            <Button variant="ghost" onClick={() => navigate("/business/new")}>
              + Add New Business
            </Button>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Business Reviews. All rights reserved.
        </div>
      </footer>
    </div>
  );
}