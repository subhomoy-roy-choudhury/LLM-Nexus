import type React from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b bg-background">
      <div className="container py-4">
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
              LLM Nexus
            </h1>
            <span className="px-2 py-1 text-xs bg-muted rounded-full">
              v1.0.0
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-sm">
              Submit Model
            </Button>
            <Button variant="ghost" className="text-sm">
              GitHub
            </Button>
            <Button variant="secondary" className="text-sm">
              Newsletter
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
