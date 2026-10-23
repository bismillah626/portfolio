"use client";

import { createContext, useContext, useCallback, useSyncExternalStore } from "react";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Inline script that runs synchronously BEFORE React hydrates.
 * Reads the saved theme from localStorage and applies it to <html>
 * immediately, so the server-rendered HTML and client HTML match
 * (both will have no data-theme or the correct one) — preventing
 * hydration mismatch.
 */
const THEME_INIT_SCRIPT = `
(function() {
  try {
    var t = localStorage.getItem('portfolio-theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch(e) {}
})();
`;

export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
      suppressHydrationWarning
    />
  );
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    window.addEventListener("portfolio-theme-change", onStoreChange);
    return () => window.removeEventListener("portfolio-theme-change", onStoreChange);
  }, []);
  const getSnapshot = useCallback((): Theme => {
    const current = document.documentElement.getAttribute("data-theme");
    return current === "light" ? "light" : "dark";
  }, []);
  const theme = useSyncExternalStore(subscribe, getSnapshot, (): Theme => "dark");

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
    window.dispatchEvent(new Event("portfolio-theme-change"));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
