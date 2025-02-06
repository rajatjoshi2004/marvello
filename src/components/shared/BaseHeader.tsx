
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Link } from "react-router-dom";

interface BaseHeaderProps {
  rightContent?: React.ReactNode;
}

export default function BaseHeader({ rightContent }: BaseHeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b dark:border-gray-700 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
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
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          {rightContent}
        </div>
      </div>
    </header>
  );
}
