"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export default function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isLight = theme === "light";

  const navItems = [
    {
      href: "/",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      label: "Home",
    },
    {
      href: "/about",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      label: "About",
    },
    {
      href: "/projects",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      ),
      label: "Projects",
    },
    {
      href: "/skills",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      label: "Skills",
    },
    {
      href: "/contact",
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      ),
      label: "Contact",
    },
  ];

  return (
    <>
      {/* ===== DESKTOP SIDEBAR (hidden on mobile) ===== */}
      <motion.nav
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed left-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col"
        style={{ width: "60px" }}
      >
        <div
          className="flex flex-col items-center gap-1 py-4 px-2 rounded-2xl"
          style={{
            background: isLight
              ? "rgba(255, 255, 255, 0.65)"
              : "rgba(10, 10, 18, 0.5)",
            border: `1px solid ${
              isLight ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.04)"
            }`,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: isLight
              ? "0 4px 20px rgba(0, 0, 0, 0.06)"
              : "none",
            transition: "all 0.6s ease",
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300"
                style={{
                  color: isActive ? "var(--accent-purple)" : "var(--text-muted)",
                  background: isActive
                    ? isLight ? "rgba(124, 93, 214, 0.1)" : "rgba(167, 139, 250, 0.1)"
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--text-primary)";
                    e.currentTarget.style.background = isLight
                      ? "rgba(0, 0, 0, 0.04)"
                      : "rgba(255, 255, 255, 0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.background = "transparent";
                  }
                }}
                aria-label={item.label}
              >
                {item.icon}
                <span
                  className="absolute left-full ml-3 px-2.5 py-1 text-[11px] font-medium rounded-lg opacity-0 -translate-x-2 pointer-events-none transition-all duration-300 whitespace-nowrap group-hover:opacity-100 group-hover:translate-x-0"
                  style={{
                    background: isLight ? "rgba(255, 255, 255, 0.95)" : "rgba(14, 14, 22, 0.95)",
                    color: "var(--text-primary)",
                    border: `1px solid ${isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)"}`,
                    backdropFilter: "blur(12px)",
                    boxShadow: isLight ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.nav>

      {/* ===== MOBILE BOTTOM NAV (visible only on mobile) ===== */}
      <motion.nav
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-50 flex md:hidden"
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div
          className="flex items-center justify-around w-full mx-3 mb-3 py-2.5 px-1 rounded-2xl"
          style={{
            background: isLight
              ? "rgba(255, 255, 255, 0.75)"
              : "rgba(10, 10, 18, 0.75)",
            border: `1px solid ${
              isLight ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.06)"
            }`,
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            boxShadow: isLight
              ? "0 -4px 24px rgba(0, 0, 0, 0.06)"
              : "0 -4px 24px rgba(0, 0, 0, 0.3)",
            transition: "all 0.6s ease",
          }}
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl transition-all duration-300"
                style={{
                  color: isActive ? "var(--accent-purple)" : "var(--text-muted)",
                  background: isActive
                    ? isLight ? "rgba(124, 93, 214, 0.1)" : "rgba(167, 139, 250, 0.1)"
                    : "transparent",
                }}
                aria-label={item.label}
              >
                {item.icon}
                <span
                  className="text-[9px] font-medium tracking-wide"
                  style={{
                    color: isActive ? "var(--accent-purple)" : "var(--text-muted)",
                  }}
                >
                  {item.label}
                </span>
                {/* Active dot indicator */}
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveIndicator"
                    className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{ background: "var(--accent-purple)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </>
  );
}
