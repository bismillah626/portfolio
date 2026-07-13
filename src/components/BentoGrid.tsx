"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ============================================================
   KAORUKO — Cute manga face with eye-tracking pupils
   ============================================================ */
function KaorukoAvatar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 3.5;
      const factor = Math.min(dist / 180, 1);
      setPupilOffset({
        x: (dx / (dist || 1)) * maxOffset * factor,
        y: (dy / (dist || 1)) * maxOffset * factor,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const hair = "var(--avatar-hair)";
  const skin = "var(--accent-gold)";
  const lineColor = "var(--text-primary)";

  return (
    <motion.div
      ref={containerRef}
      className="relative flex-shrink-0"
      style={{ width: 90, height: 90 }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 100 100" width="90" height="90" style={{ overflow: "visible" }}>
        <defs>
          {/* Face skin gradient */}
          <radialGradient id="skinGrad" cx="0.45" cy="0.4" r="0.55">
            <stop offset="0%" stopColor="#FFE4C4" />
            <stop offset="100%" stopColor="#F5D0A9" />
          </radialGradient>
          {/* Eye iris gradient */}
          <radialGradient id="irisGradL" cx="0.4" cy="0.35" r="0.6">
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="50%" stopColor="#6B4E12" />
            <stop offset="100%" stopColor="#3D2B0A" />
          </radialGradient>
          <radialGradient id="irisGradR" cx="0.4" cy="0.35" r="0.6">
            <stop offset="0%" stopColor="#8B6914" />
            <stop offset="50%" stopColor="#6B4E12" />
            <stop offset="100%" stopColor="#3D2B0A" />
          </radialGradient>
        </defs>

        {/* ===== BACK HAIR ===== */}
        <ellipse cx="50" cy="48" rx="36" ry="38" fill={hair} opacity="0.9" />

        {/* ===== FACE ===== */}
        <ellipse cx="50" cy="56" rx="26" ry="24" fill="url(#skinGrad)" />

        {/* ===== NECK ===== */}
        <rect x="44" y="76" width="12" height="8" rx="3" fill="#F5D0A9" />

        {/* ===== BIG EYES — Kaoruko style ===== */}
        {/* Left eye white */}
        <ellipse cx="39" cy="56" rx="9" ry="10" fill="#FAFAFA" />
        <ellipse cx="39" cy="56" rx="9" ry="10" fill="none" stroke={lineColor} strokeWidth="1.2" opacity="0.3" />
        {/* Left iris */}
        <ellipse
          cx={39 + pupilOffset.x * 0.8}
          cy={56 + pupilOffset.y * 0.7}
          rx="6.5"
          ry="7"
          fill="url(#irisGradL)"
        />
        {/* Left pupil */}
        <circle
          cx={39 + pupilOffset.x}
          cy={56 + pupilOffset.y}
          r="3.5"
          fill="#1a1208"
        />
        {/* Left eye highlights */}
        <circle
          cx={36.5 + pupilOffset.x * 0.2}
          cy={53 + pupilOffset.y * 0.2}
          r="2.5"
          fill="#fff"
          opacity="0.95"
        />
        <circle
          cx={41 + pupilOffset.x * 0.15}
          cy={59 + pupilOffset.y * 0.15}
          r="1.2"
          fill="#fff"
          opacity="0.6"
        />

        {/* Right eye white */}
        <ellipse cx="61" cy="56" rx="9" ry="10" fill="#FAFAFA" />
        <ellipse cx="61" cy="56" rx="9" ry="10" fill="none" stroke={lineColor} strokeWidth="1.2" opacity="0.3" />
        {/* Right iris */}
        <ellipse
          cx={61 + pupilOffset.x * 0.8}
          cy={56 + pupilOffset.y * 0.7}
          rx="6.5"
          ry="7"
          fill="url(#irisGradR)"
        />
        {/* Right pupil */}
        <circle
          cx={61 + pupilOffset.x}
          cy={56 + pupilOffset.y}
          r="3.5"
          fill="#1a1208"
        />
        {/* Right eye highlights */}
        <circle
          cx={58.5 + pupilOffset.x * 0.2}
          cy={53 + pupilOffset.y * 0.2}
          r="2.5"
          fill="#fff"
          opacity="0.95"
        />
        <circle
          cx={63 + pupilOffset.x * 0.15}
          cy={59 + pupilOffset.y * 0.15}
          r="1.2"
          fill="#fff"
          opacity="0.6"
        />

        {/* ===== EYELASHES (top) ===== */}
        <path d="M29 50 Q34 46, 39 47 Q44 46, 49 50" fill="none" stroke={lineColor} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
        <path d="M51 50 Q56 46, 61 47 Q66 46, 71 50" fill="none" stroke={lineColor} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />

        {/* ===== EYEBROWS ===== */}
        <path d="M31 44 Q36 40, 44 43" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M56 43 Q64 40, 69 44" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />

        {/* ===== BLUSH MARKS (manga crosshatch) ===== */}
        <g opacity="0.35">
          <line x1="27" y1="61" x2="30" y2="63" stroke="#E8837C" strokeWidth="1" />
          <line x1="29" y1="61" x2="32" y2="63" stroke="#E8837C" strokeWidth="1" />
          <line x1="31" y1="61" x2="34" y2="63" stroke="#E8837C" strokeWidth="1" />
          <line x1="66" y1="61" x2="69" y2="63" stroke="#E8837C" strokeWidth="1" />
          <line x1="68" y1="61" x2="71" y2="63" stroke="#E8837C" strokeWidth="1" />
          <line x1="70" y1="61" x2="73" y2="63" stroke="#E8837C" strokeWidth="1" />
        </g>

        {/* ===== NOSE (tiny) ===== */}
        <path d="M49 65 Q50 67, 51 65" stroke="#D4A574" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.5" />

        {/* ===== MOUTH (cute open) ===== */}
        <ellipse cx="50" cy="71" rx="4" ry="2.5" fill="#E8837C" opacity="0.7" />
        <path d="M46 70 Q50 74, 54 70" fill="none" stroke="#C06060" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

        {/* ===== FRONT HAIR / BANGS ===== */}
        {/* Center bangs */}
        <path d="M35 32 Q38 50, 42 48 Q44 42, 46 48 Q48 42, 50 48 Q52 42, 54 48 Q56 42, 58 48 Q62 50, 65 32" fill={hair} opacity="0.92" />
        {/* Left side hair */}
        <path d="M22 35 Q20 55, 24 65 Q26 60, 28 55 Q30 48, 35 32Z" fill={hair} opacity="0.88" />
        {/* Right side hair */}
        <path d="M78 35 Q80 55, 76 65 Q74 60, 72 55 Q70 48, 65 32Z" fill={hair} opacity="0.88" />
        {/* Hair outline strands */}
        <path d="M35 28 Q32 18, 28 15 Q38 20, 42 28" fill={hair} opacity="0.8" />
        <path d="M58 28 Q60 18, 65 14 Q63 22, 60 28" fill={hair} opacity="0.8" />
        <path d="M48 28 Q47 16, 50 12 Q53 16, 52 28" fill={hair} opacity="0.75" />
        {/* Extra flyaway strands */}
        <path d="M25 30 Q22 22, 20 18" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M75 30 Q78 22, 80 18" stroke={hair} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
      </svg>
    </motion.div>
  );
}

/* ============================================================
   ANIMATED CHAT BUBBLES — Contact card decoration
   ============================================================ */
function AnimatedChatBubbles() {
  const [visibleBubbles, setVisibleBubbles] = useState<number[]>([]);

  useEffect(() => {
    const sequence = [0, 1, 2, 3, 4, 5];
    let i = 0;
    const showNext = () => {
      if (i < sequence.length) {
        setVisibleBubbles(prev => [...prev, sequence[i]]);
        i++;
        setTimeout(showNext, 600 + Math.random() * 400);
      } else {
        // Reset after a pause and restart
        setTimeout(() => {
          setVisibleBubbles([]);
          i = 0;
          setTimeout(showNext, 800);
        }, 2500);
      }
    };
    const timer = setTimeout(showNext, 500);
    return () => clearTimeout(timer);
  }, []);

  const bubbles = [
    { text: "···", align: "left", color: "rgba(167,139,250,0.7)", bg: "rgba(167,139,250,0.15)" },
    { text: "···", align: "right", color: "rgba(103,232,232,0.7)", bg: "rgba(103,232,232,0.15)" },
    { text: "···", align: "left", color: "rgba(167,139,250,0.5)", bg: "rgba(167,139,250,0.1)" },
    { text: "···", align: "right", color: "rgba(103,232,232,0.5)", bg: "rgba(103,232,232,0.1)" },
    { text: "···", align: "left", color: "rgba(167,139,250,0.4)", bg: "rgba(167,139,250,0.08)" },
    { text: "···", align: "right", color: "rgba(103,232,232,0.4)", bg: "rgba(103,232,232,0.08)" },
  ];

  return (
    <div className="flex flex-col gap-2 w-full" style={{ minHeight: 80 }}>
      <AnimatePresence>
        {bubbles.map((b, i) =>
          visibleBubbles.includes(i) ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.7, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                alignSelf: b.align === "right" ? "flex-end" : "flex-start",
                background: b.bg,
                color: b.color,
                padding: "6px 14px",
                borderRadius: 12,
                borderBottomRightRadius: b.align === "right" ? 4 : 12,
                borderBottomLeftRadius: b.align === "left" ? 4 : 12,
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.15em",
              }}
            >
              {b.text}
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   BENTO CARD — Shared card shell
   ============================================================ */
interface BentoCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  className?: string;
  href?: string;
  accentColor?: string;
}

function BentoCard({ title, subtitle, icon, children, delay = 0, className = "", href, accentColor = "var(--accent-purple)" }: BentoCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      onClick={() => href && router.push(href)}
      className={`perspective-1000 cursor-pointer ${className}`}
    >
      <div
        className="preserve-3d w-full h-full rounded-2xl transition-all duration-300 ease-out overflow-hidden relative"
        style={{
          background: isHovered ? "var(--bg-card-hover)" : "var(--bg-card)",
          border: `1px solid ${isHovered ? `color-mix(in srgb, ${accentColor} 18%, transparent)` : "var(--border-subtle)"}`,
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.015 : 1})`,
          boxShadow: isHovered ? `0 8px 40px color-mix(in srgb, ${accentColor} 8%, transparent)` : "none",
          padding: "1.5rem 1.75rem",
        }}
      >
        {/* Subtle gradient orb */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, color-mix(in srgb, ${accentColor} 4%, transparent) 0%, transparent 70%)` }} />
        )}

        {/* Layout: icon + title/subtitle on left, visual content on right */}
        <div className="flex justify-between items-start relative z-10 h-full">
          <div className="flex flex-col justify-between h-full min-w-0 flex-1">
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-auto transition-all duration-300"
              style={{ background: "var(--bg-glass)" }}
            >
              {icon}
            </div>
            {/* Title + Subtitle at bottom */}
            <div className="mt-4">
              <h3
                className="text-lg font-semibold leading-tight"
                style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
              >
                {title}
              </h3>
              <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
                {subtitle}
              </p>
            </div>
          </div>

          {/* Visual content (right side) */}
          <div className="flex-shrink-0 ml-4 flex items-center justify-end">
            {children}
          </div>
        </div>

        {/* Arrow indicator */}
        <svg
          width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          className="absolute bottom-4 right-4 transition-all duration-300"
          style={{
            color: isHovered ? accentColor : "var(--text-muted)",
            opacity: isHovered ? 0.8 : 0.2,
            transform: isHovered ? "translate(2px, -2px)" : "none",
          }}
        >
          <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </motion.div>
  );
}

/* ============================================================
   BENTO GRID — Main grid layout (matching Franck's style)
   ============================================================ */
export default function BentoGrid() {
  return (
    <section className="relative z-20 pb-32 sm:pb-8">
      {/* Responsive grid styles */}
      <style>{`
        .bento-grid {
          display: grid;
          gap: 1rem;
          grid-template-columns: 1fr;
        }
        /* On mobile single-column: reorder so Contact is visible */
        @media (max-width: 639px) {
          .bento-about { order: 1; }
          .bento-skills { order: 2; }
          .bento-projects { order: 3; }
          .bento-contact { order: 4; }
        }
        @media (min-width: 640px) {
          .bento-grid {
            gap: 1.25rem;
            grid-template-columns: repeat(2, 1fr);
          }
          .bento-span-2 { grid-row: span 2; }
        }
        @media (min-width: 1024px) {
          .bento-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

      <div style={{ maxWidth: "1040px", margin: "0 auto", padding: "0 clamp(1rem, 4vw, 3rem)" }}>
        <div className="bento-grid">

          {/* About — with eye-tracking character */}
          <BentoCard
            title="About"
            subtitle="A bit about myself."
            delay={0}
            className="bento-about min-h-[140px] sm:min-h-[160px]"
            href="/about"
            accentColor="var(--accent-pink)"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-pink)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            }
          >
            <KaorukoAvatar />
          </BentoCard>

          {/* Projects — spans 2 rows on tablet+ */}
          <BentoCard
            title="Projects"
            subtitle="Personal projects I've been working on."
            delay={0.1}
            className="bento-projects bento-span-2 min-h-[160px] sm:min-h-[340px]"
            href="/projects"
            accentColor="var(--accent-cyan)"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
            }
          >
            <div className="flex flex-wrap gap-2 max-w-[120px]">
              {[
                { bg: "linear-gradient(135deg, #6366f1, #8b5cf6)", label: "F" },
                { bg: "linear-gradient(135deg, #06b6d4, #22d3ee)", label: "S" },
                { bg: "linear-gradient(135deg, #f472b6, #ec4899)", label: "N" },
                { bg: "linear-gradient(135deg, #fbbf24, #f59e0b)", label: "T" },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.1, duration: 0.4 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold shadow-lg"
                  style={{ backgroundImage: p.bg }}
                >
                  {p.label}
                </motion.div>
              ))}
            </div>
          </BentoCard>

          {/* Contact — spans 2 rows on tablet+ */}
          <BentoCard
            title="Contact"
            subtitle="Email, LinkedIn, carrier pigeon..."
            delay={0.2}
            className="bento-contact bento-span-2 min-h-[160px] sm:min-h-[340px]"
            href="/contact"
            accentColor="var(--accent-gold)"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            }
          >
            <AnimatedChatBubbles />
          </BentoCard>

          {/* Skills */}
          <BentoCard
            title="Skills"
            subtitle="My technical toolkit."
            delay={0.15}
            className="bento-skills min-h-[140px] sm:min-h-[160px]"
            href="/skills"
            accentColor="var(--accent-purple)"
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            }
          >
            <div className="flex flex-wrap gap-1.5 max-w-[130px]">
              {["Python", "LLMs", "NLP", "ML"].map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 + i * 0.08, duration: 0.35 }}
                  className="text-[10px] px-2.5 py-1 rounded-full font-mono"
                  style={{ background: "rgba(167,139,250,0.1)", color: "var(--accent-purple)", border: "1px solid rgba(167,139,250,0.12)" }}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}

