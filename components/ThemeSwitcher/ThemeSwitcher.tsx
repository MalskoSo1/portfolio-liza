"use client";

import { useThemeContext } from "@/hooks/useThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useThemeContext();

  const handleClick = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
  };

  return <button onClick={handleClick}>Change theme</button>;
}
