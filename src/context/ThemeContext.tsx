"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemePalette = "cyan" | "amber" | "magenta" | "emerald";

export interface ThemeConfig {
  id: ThemePalette;
  name: string;
  accent: string;
  dim: string;
  faint: string;
  glow: string;
}

export const THEMES: Record<ThemePalette, ThemeConfig> = {
  cyan: {
    id: "cyan",
    name: "Neon Cyan",
    accent: "#00ffc2",
    dim: "#00ffc280",
    faint: "#00ffc215",
    glow: "#00ffc240",
  },
  amber: {
    id: "amber",
    name: "Retro Amber",
    accent: "#ffb800",
    dim: "#ffb80080",
    faint: "#ffb80015",
    glow: "#ffb80040",
  },
  magenta: {
    id: "magenta",
    name: "Synthwave Magenta",
    accent: "#ff007f",
    dim: "#ff007f80",
    faint: "#ff007f15",
    glow: "#ff007f40",
  },
  emerald: {
    id: "emerald",
    name: "Matrix Emerald",
    accent: "#00ff66",
    dim: "#00ff6680",
    faint: "#00ff6615",
    glow: "#00ff6640",
  },
};

interface ThemeContextType {
  theme: ThemePalette;
  setTheme: (theme: ThemePalette) => void;
  themes: ThemeConfig[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "rd_portfolio_theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePalette>("cyan");

  // Load initial theme from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as ThemePalette | null;
      if (saved && THEMES[saved]) {
        setThemeState(saved);
        applyTheme(saved);
      }
    } catch {
      // Ignore SSR/storage errors
    }
  }, []);

  function applyTheme(nextTheme: ThemePalette) {
    const config = THEMES[nextTheme];
    if (!config) return;
    const root = document.documentElement;
    root.setAttribute("data-theme", nextTheme);
    root.style.setProperty("--color-cyan", config.accent);
    root.style.setProperty("--color-cyan-dim", config.dim);
    root.style.setProperty("--color-cyan-faint", config.faint);
    root.style.setProperty("--color-cyan-glow", config.glow);
    root.style.setProperty("--color-border-glow", config.glow);
  }

  function setTheme(nextTheme: ThemePalette) {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    try {
      localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Ignore storage error
    }
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themes: Object.values(THEMES),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
