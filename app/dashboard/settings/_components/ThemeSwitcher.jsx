"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex gap-4 space-x-4">
      
      <Button
        onClick={() => setTheme("light")}
        className={`px-4 py-2 ${theme === "light" ? "bg-gray-400" : ""}`}
      >
        Світла </Button>
      <Button
        onClick={() => setTheme("dark")}
        className={`px-4 py-2 ${theme === "dark" ? "bg-gray-700 text-white" : ""}`}
      >
        Темна
        </Button>
      <Button
        onClick={() => setTheme("christmas")}
        className={`px-4 py-2 ${theme === "christmas" ? "bg-red-200" : ""}`}
      >
        Новорічна
        </Button>
    </div>
  );
}
