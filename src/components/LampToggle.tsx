"use client";

import { motion, useAnimation } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useState } from "react";

export default function LampToggle() {
  const { theme, toggleTheme } = useTheme();
  const [isPulling, setIsPulling] = useState(false);
  const cordControls = useAnimation();
  const bulbControls = useAnimation();

  const isLight = theme === "light";

  const handlePull = async () => {
    if (isPulling) return;
    setIsPulling(true);

    // Animate cord being pulled down
    await cordControls.start({
      y: 28,
      transition: { duration: 0.15, ease: "easeOut" },
    });

    // Toggle the theme
    toggleTheme();

    // Cord snaps back with bounce
    await cordControls.start({
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 12,
        mass: 0.6,
      },
    });

    // Bulb flash effect
    await bulbControls.start({
      scale: [1, 1.15, 1],
      transition: { duration: 0.3, ease: "easeOut" },
    });

    setIsPulling(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
      className="fixed z-50"
      style={{
        top: 0,
        right: "clamp(1.5rem, 4vw, 3rem)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={handlePull}
        role="button"
        aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handlePull();
        }}
      >
        {/* ===== WIRE FROM CEILING ===== */}
        <div
          style={{
            width: "2px",
            height: "30px",
            background: isLight
              ? "rgba(60, 40, 20, 0.4)"
              : "rgba(167, 139, 250, 0.35)",
            borderRadius: "1px",
          }}
        />

        {/* ===== ANIMATED PULL GROUP ===== */}
        <motion.div
          animate={cordControls}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* ===== BULB HOUSING (lamp cap) ===== */}
          <div
            style={{
              width: "20px",
              height: "10px",
              background: isLight
                ? "linear-gradient(180deg, #8B7355 0%, #6B5435 100%)"
                : "linear-gradient(180deg, #4a3f6b 0%, #352d52 100%)",
              borderRadius: "3px 3px 0 0",
              borderTop: `1px solid ${
                isLight ? "rgba(100, 70, 40, 0.4)" : "rgba(167, 139, 250, 0.2)"
              }`,
              borderLeft: `1px solid ${
                isLight ? "rgba(100, 70, 40, 0.4)" : "rgba(167, 139, 250, 0.2)"
              }`,
              borderRight: `1px solid ${
                isLight ? "rgba(100, 70, 40, 0.4)" : "rgba(167, 139, 250, 0.2)"
              }`,
              borderBottom: "none",
              transition: "all 0.5s ease",
            }}
          />

          {/* ===== LIGHT BULB ===== */}
          <motion.div
            animate={bulbControls}
            style={{
              position: "relative",
              width: "28px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Bulb glass shape */}
            <div
              style={{
                width: "24px",
                height: "28px",
                borderRadius: "50% 50% 35% 35%",
                background: isLight
                  ? "radial-gradient(circle at 40% 35%, #FFF9E6 0%, #FFE566 40%, #FFD700 70%, #E6B800 100%)"
                  : "radial-gradient(circle at 40% 35%, rgba(255,255,255,0.08) 0%, rgba(167,139,250,0.06) 50%, rgba(80,60,120,0.15) 100%)",
                border: `1px solid ${
                  isLight
                    ? "rgba(255, 215, 0, 0.6)"
                    : "rgba(167, 139, 250, 0.15)"
                }`,
                transition: "all 0.5s ease",
                boxShadow: isLight
                  ? "0 0 20px rgba(255, 215, 0, 0.5), 0 0 40px rgba(255, 200, 0, 0.25), 0 0 60px rgba(255, 180, 0, 0.1), inset 0 -4px 8px rgba(255, 215, 0, 0.3)"
                  : "none",
              }}
            />

            {/* Filament inside the bulb */}
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -55%)",
                opacity: isLight ? 1 : 0.2,
                transition: "opacity 0.5s ease",
              }}
            >
              <path
                d="M4 12 C4 8, 2 7, 4 4 C5 2, 7 2, 8 4 C10 7, 8 8, 8 12"
                stroke={isLight ? "#FF9500" : "#a78bfa"}
                strokeWidth="1.2"
                fill="none"
              />
              <path
                d="M5 10 C5 7, 6 6, 6 4"
                stroke={isLight ? "#FFB800" : "#a78bfa"}
                strokeWidth="0.8"
                fill="none"
                opacity="0.6"
              />
            </svg>

            {/* Glow aura when lit */}
            {isLight && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(255,200,0,0.05) 50%, transparent 70%)",
                  pointerEvents: "none",
                  zIndex: -1,
                }}
              />
            )}
          </motion.div>

          {/* ===== PULL CORD/STRING ===== */}
          <div
            style={{
              width: "1.5px",
              height: "22px",
              background: isLight
                ? "rgba(100, 70, 30, 0.5)"
                : "rgba(167, 139, 250, 0.3)",
              transition: "background 0.5s ease",
            }}
          />

          {/* ===== CORD KNOB/BEAD ===== */}
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9, y: 8 }}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: isLight
                ? "linear-gradient(135deg, #D4A64A 0%, #B8860B 100%)"
                : "linear-gradient(135deg, #a78bfa 0%, #7c5dd6 100%)",
              border: `1px solid ${
                isLight ? "rgba(180, 134, 11, 0.5)" : "rgba(167, 139, 250, 0.4)"
              }`,
              boxShadow: isLight
                ? "0 2px 8px rgba(180, 134, 11, 0.3)"
                : "0 2px 8px rgba(167, 139, 250, 0.2)",
              transition: "all 0.5s ease",
            }}
          />

          {/* ===== SMALL CORD TAIL ===== */}
          <div
            style={{
              width: "1px",
              height: "8px",
              background: isLight
                ? "rgba(100, 70, 30, 0.3)"
                : "rgba(167, 139, 250, 0.15)",
              transition: "background 0.5s ease",
            }}
          />
        </motion.div>

        {/* ===== TOOLTIP ===== */}
        <motion.span
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: "absolute",
            right: "calc(100% + 12px)",
            top: "50%",
            transform: "translateY(-50%)",
            whiteSpace: "nowrap",
            fontSize: "11px",
            fontWeight: 500,
            color: isLight ? "rgba(60, 40, 20, 0.7)" : "var(--text-secondary)",
            background: isLight
              ? "rgba(255, 250, 240, 0.9)"
              : "rgba(14, 14, 22, 0.95)",
            border: `1px solid ${
              isLight ? "rgba(200, 180, 140, 0.3)" : "rgba(255, 255, 255, 0.08)"
            }`,
            padding: "4px 10px",
            borderRadius: "8px",
            backdropFilter: "blur(12px)",
            pointerEvents: "none",
            letterSpacing: "0.02em",
            transition: "all 0.5s ease",
          }}
        >
          {isLight ? "Dark mode" : "Light mode"}
        </motion.span>
      </div>
    </motion.div>
  );
}
