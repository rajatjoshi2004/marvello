
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
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
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-bold text-primary">
              Marvello
            </h1>
            <span className="text-xs text-gray-600 dark:text-gray-400 -mt-1">
              by webbicles
            </span>
          </div>
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
        </div>
      </div>
    </header>
  );
}
