"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

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
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // On mount, read the actual attribute that was set by the inline script
  useEffect(() => {
    setMounted(true);
    const current = document.documentElement.getAttribute("data-theme") as Theme;
    if (current === "light" || current === "dark") {
      setTheme(current);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("portfolio-theme", next);
  }, [theme]);

  // Before mount, still provide context with the default "dark" value
  // so children can render — the inline script already set the correct
  // data-theme attribute on <html>, so CSS variables are correct.
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: "dark", toggleTheme: () => {} }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
