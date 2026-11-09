"use client";

import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";
import { useTheme as useNextTheme } from "next-themes";

type ThemeMode = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  isDark: boolean;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeContextProvider({ children }: { children: ReactNode }) {
  const { theme, resolvedTheme, setTheme } = useNextTheme();

  const currentTheme = (theme ?? "system") as ThemeMode;
  const resolved = (resolvedTheme ?? "light") as "light" | "dark";

  const toggleTheme = useCallback(() => {
    setTheme(resolved === "dark" ? "light" : "dark");
  }, [resolved, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme: currentTheme,
      resolvedTheme: resolved,
      isDark: resolved === "dark",
      setTheme: (next) => setTheme(next),
      toggleTheme,
    }),
    [currentTheme, resolved, toggleTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook for reading and updating theme state.
 * Must be used within a `ThemeContextProvider`.
 */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeContextProvider");
  }

  return context;
}
