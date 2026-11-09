"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";

type ThemeContextValue = { theme: "light" };

const ThemeContext = createContext<ThemeContextValue>({ theme: "light" });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => ({ theme: "light" as const }), []);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
