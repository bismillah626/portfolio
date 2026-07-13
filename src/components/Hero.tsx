"use client";

import { motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";

/* ============================================================
   ANIMATED NAME — character-by-character reveal with glow
   ============================================================ */
function AnimatedName() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const name = "Bismillah Khan";
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Split into individual characters
  const chars = name.split("");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "0px",
        lineHeight: 0.95,
      }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 60, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: 0.5 + i * 0.04,
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 700,
            display: "inline-block",
            cursor: "default",
            backgroundImage: isLight
              ? "linear-gradient(135deg, #4A2C82 0%, #6B3FA0 30%, #7C5DD6 55%, #5B3A9E 80%, #3D2070 100%)"
              : "linear-gradient(135deg, #e8e4f0 0%, #c4b5fd 30%, #a78bfa 55%, #8b5cf6 80%, #c4b5fd 100%)",
            backgroundSize: "200% 200%",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            animation: "shimmer 8s ease-in-out infinite",
            transform: hoveredIndex === i ? "translateY(-8px) scale(1.1)" : "none",
            transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
            textShadow: hoveredIndex === i
              ? isLight
                ? "0 0 30px rgba(124,93,214,0.4)"
                : "0 0 30px rgba(167,139,250,0.5)"
              : "none",
            filter: hoveredIndex === i
              ? `drop-shadow(0 0 12px ${isLight ? "rgba(124,93,214,0.3)" : "rgba(167,139,250,0.4)"})`
              : "none",
            marginRight: char === " " ? "0.3em" : "0",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}

/* ============================================================
   ANIMATED UNDERLINE — draws under the name
   ============================================================ */
function AnimatedUnderline() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        height: "3px",
        width: "clamp(200px, 40vw, 400px)",
        margin: "0.75rem auto 0",
        borderRadius: "2px",
        background: isLight
          ? "linear-gradient(90deg, transparent 0%, rgba(124,93,214,0.5) 20%, rgba(124,93,214,0.8) 50%, rgba(124,93,214,0.5) 80%, transparent 100%)"
          : "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.4) 20%, rgba(167,139,250,0.7) 50%, rgba(167,139,250,0.4) 80%, transparent 100%)",
        transformOrigin: "center",
      }}
    />
  );
}

/* ============================================================
   ROLE TAG — typing effect for subtitle
   ============================================================ */
function TypedSubtitle() {
  const fullText = "AI / ML Engineer";
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const startDelay = setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (i < fullText.length) {
          setDisplayText(fullText.slice(0, i + 1));
          i++;
        } else {
          clearInterval(typeInterval);
          // Blink cursor a few times then hide
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, 80);
      return () => clearInterval(typeInterval);
    }, 1400);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="mt-5 text-base md:text-lg tracking-[0.2em] uppercase"
      style={{
        color: "var(--text-secondary)",
        fontFamily: "var(--font-geist-mono)",
        fontWeight: 400,
      }}
    >
      {displayText}
      <span
        style={{
          opacity: showCursor ? 1 : 0,
          animation: showCursor ? "cursorBlink 0.8s step-end infinite" : "none",
          color: "var(--accent-purple)",
          marginLeft: "2px",
        }}
      >
        |
      </span>
    </motion.p>
  );
}

export default function Hero() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  return (
    <section className="relative z-20 flex flex-col items-center justify-center min-h-[55vh] pt-20 pb-10 px-6">
      {/* Subtle label */}
      <motion.p
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.3, duration: 1.2 }}
        className="text-2xl md:text-3xl tracking-[0.35em] mb-6 select-none"
        style={{ color: "var(--accent-purple)", fontFamily: "var(--font-heading)", fontWeight: 400 }}
      >
        ようこそ
      </motion.p>

      {/* Main Name — character-by-character animation */}
      <AnimatedName />

      {/* Animated underline */}
      <AnimatedUnderline />

      {/* Subtitle — typed effect */}
      <TypedSubtitle />

      {/* Social Links */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.7 }}
        className="mt-10 flex items-center gap-4"
      >
        <a
          href="https://github.com/bismillah626"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-300"
          style={{
            background: "var(--bg-glass)",
            border: "1px solid var(--border-subtle)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg-glass-hover)";
            e.currentTarget.style.borderColor = "var(--border-glow)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bg-glass)";
            e.currentTarget.style.borderColor = "var(--border-subtle)";
          }}
          aria-label="GitHub"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-secondary)" }}>
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>

        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full transition-all duration-300"
          style={{
            background: "var(--bg-glass)",
            border: "1px solid var(--border-subtle)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--bg-glass-hover)";
            e.currentTarget.style.borderColor = "var(--border-glow)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--bg-glass)";
            e.currentTarget.style.borderColor = "var(--border-subtle)";
          }}
          aria-label="LinkedIn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-secondary)" }}>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>

        </a>

        <a
          href="https://drive.google.com/file/d/1_eKridyN4funTh7gnMif-6JJfsv1njpl/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(167,139,250,0.12), rgba(103,232,232,0.08))",
            border: "1px solid rgba(167,139,250,0.2)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(167,139,250,0.22), rgba(103,232,232,0.15))";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(167,139,250,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "linear-gradient(135deg, rgba(167,139,250,0.12), rgba(103,232,232,0.08))";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <span className="text-sm font-medium" style={{ color: "var(--accent-purple)" }}>Resume</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-purple)" }}>
            <path d="M7 17L17 7" /><path d="M7 7h10v10" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
