"use client";

import { ThemeContext } from "@/contexts/themeContext";
import { use } from "react";

export const useThemeContext = () => {
  const context = use(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }

  return context;
};
