import { Button } from "@/components/ui/button";
import { Moon, Sun, LogOut } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import ProfileDialog from "./ProfileDialog";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  onSignOut: () => void;
}

export default function DashboardHeader({ onSignOut }: DashboardHeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo-icon.svg" alt="Marvello Logo" className="w-8 h-8" />
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Marvello
          </h1>
        </Link>
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