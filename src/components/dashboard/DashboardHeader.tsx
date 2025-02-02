import { Button } from "@/components/ui/button";
import { Moon, Sun, User, LogOut } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import ProfileDialog from "./ProfileDialog";

interface DashboardHeaderProps {
  onSignOut: () => void;
}

export default function DashboardHeader({ onSignOut }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-2">
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
          <ProfileDialog />
          <Button
            variant="ghost"
            size="icon"
            onClick={onSignOut}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}