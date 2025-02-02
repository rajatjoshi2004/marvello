import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b dark:border-gray-700 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo-icon.svg" alt="Marvello Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-primary">
            Marvello
          </h1>
        </div>
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
          <Link to="/auth">
            <Button className="bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}