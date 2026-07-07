"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";

/* ============================================================
   FLOATING SAKURA PETALS — light mode animated effect
   ============================================================ */
function SakuraPetals() {
  const [petals, setPetals] = useState<Array<{
    id: number; x: number; delay: number; duration: number; size: number; rotation: number; sway: number;
  }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 10,
      size: 6 + Math.random() * 10,
      rotation: Math.random() * 360,
      sway: 20 + Math.random() * 40,
    }));
    setPetals(generated);
  }, []);

  if (petals.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: "-5%",
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0.6,
            animation: `sakuraFall ${p.duration}s ${p.delay}s infinite linear`,
            // Use CSS custom properties for sway amount
            ["--sway" as string]: `${p.sway}px`,
          }}
        >
          {/* Petal SVG shape */}
          <svg
            viewBox="0 0 20 20"
            width={p.size}
            height={p.size}
            style={{ transform: `rotate(${p.rotation}deg)` }}
          >
            <path
              d="M10 0 C14 4, 18 8, 10 20 C2 8, 6 4, 10 0Z"
              fill="rgba(255, 183, 197, 0.7)"
            />
          </svg>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   FLOATING FIREFLIES — dark mode animated effect
   ============================================================ */
function Fireflies() {
  const [flies, setFlies] = useState<Array<{
    id: number; x: number; y: number; delay: number; duration: number; size: number;
  }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 20 + Math.random() * 60,
      delay: Math.random() * 6,
      duration: 4 + Math.random() * 6,
      size: 2 + Math.random() * 3,
    }));
    setFlies(generated);
  }, []);

  if (flies.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {flies.map((f) => (
        <div
          key={f.id}
          style={{
            position: "absolute",
            left: `${f.x}%`,
            top: `${f.y}%`,
            width: `${f.size}px`,
            height: `${f.size}px`,
            borderRadius: "50%",
            background: "rgba(167, 139, 250, 0.6)",
            boxShadow: `0 0 ${f.size * 3}px rgba(167, 139, 250, 0.4), 0 0 ${f.size * 6}px rgba(167, 139, 250, 0.2)`,
            animation: `fireflyFloat ${f.duration}s ${f.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   THEME BACKGROUND — wallpaper + animated overlay effects
   ============================================================ */
export default function ThemeBackground() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="fixed inset-0 z-0">
      {/* Dark background — cosmic night with aurora */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center 35%",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.5) saturate(1.3)",
          opacity: isLight ? 0 : 1,
          transition: "opacity 0.8s ease",
        }}
      />
      {/* Light background — anime sunset countryside */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/bg-light.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
          filter: "brightness(1.05) saturate(1.35) contrast(1.05)",
          opacity: isLight ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(8,8,16,0.15) 0%, rgba(8,8,16,0.35) 35%, rgba(8,8,16,0.7) 65%, rgba(8,8,16,0.92) 100%)",
          opacity: isLight ? 0 : 1,
          transition: "opacity 0.8s ease",
        }}
      />
      {/* Light gradient overlay — warm sunset fade */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(255,200,160,0.0) 0%, rgba(255,210,170,0.05) 20%, rgba(255,220,180,0.25) 50%, rgba(255,235,215,0.7) 75%, rgba(255,245,235,0.92) 100%)",
          opacity: isLight ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      />

      {/* Radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: isLight
            ? "radial-gradient(ellipse at center, transparent 45%, rgba(255,230,210,0.2) 100%)"
            : "radial-gradient(ellipse at center, transparent 25%, rgba(8,8,16,0.55) 100%)",
          transition: "background-image 0.8s ease",
        }}
      />

      {/* === ANIMATED EFFECTS === */}
      {isLight ? <SakuraPetals /> : <Fireflies />}
    </div>
  );
}
