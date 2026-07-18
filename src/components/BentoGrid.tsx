"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

/* ============================================================
   AGURI — Manga-accurate Aguri avatar with eye-tracking
   Dark purple/indigo long hair, large blue eyes, rosy blush
   ============================================================ */
function AguriAvatar() {
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
      const maxOffset = 3.2;
      const factor = Math.min(dist / 200, 1);
      setPupilOffset({
        x: (dx / (dist || 1)) * maxOffset * factor,
        y: (dy / (dist || 1)) * maxOffset * factor,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const hair = "var(--avatar-hair)";

  return (
    <motion.div
      ref={containerRef}
      className="relative flex-shrink-0"
      style={{ width: 90, height: 90 }}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 120 120" width="90" height="90" style={{ overflow: "visible" }}>
        <defs>
          {/* Aguri skin: fair warm tone */}
          <radialGradient id="aguSkin" cx="0.45" cy="0.38" r="0.55">
            <stop offset="0%" stopColor="#FFF0E0" />
            <stop offset="60%" stopColor="#FDDCC4" />
            <stop offset="100%" stopColor="#F5C9A8" />
          </radialGradient>
          {/* Aguri blue iris — left */}
          <radialGradient id="aguIrisL" cx="0.42" cy="0.32" r="0.6">
            <stop offset="0%" stopColor="#9AC4F8" />
            <stop offset="35%" stopColor="#5B9BF0" />
            <stop offset="70%" stopColor="#3B6FCE" />
            <stop offset="100%" stopColor="#1E3A78" />
          </radialGradient>
          {/* Aguri blue iris — right */}
          <radialGradient id="aguIrisR" cx="0.42" cy="0.32" r="0.6">
            <stop offset="0%" stopColor="#9AC4F8" />
            <stop offset="35%" stopColor="#5B9BF0" />
            <stop offset="70%" stopColor="#3B6FCE" />
            <stop offset="100%" stopColor="#1E3A78" />
          </radialGradient>
          {/* Blush gradient */}
          <radialGradient id="aguBlushL" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#F0868A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F0868A" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="aguBlushR" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#F0868A" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#F0868A" stopOpacity="0" />
          </radialGradient>
          {/* Hair highlight sheen */}
          <linearGradient id="aguHairSheen" x1="0" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#9B7AD8" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#7B5DBB" stopOpacity="0" />
            <stop offset="100%" stopColor="#B490E8" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* ===== BACK LONG HAIR — Aguri's long flowing hair draping down ===== */}
        <path d="M60 18 Q28 20, 18 55 Q14 75, 20 100 Q22 108, 28 110 L32 95 Q30 72, 34 55Z" fill={hair} opacity="0.85" />
        <path d="M60 18 Q92 20, 102 55 Q106 75, 100 100 Q98 108, 92 110 L88 95 Q90 72, 86 55Z" fill={hair} opacity="0.85" />
        {/* Center back volume */}
        <ellipse cx="60" cy="48" rx="38" ry="36" fill={hair} opacity="0.9" />

        {/* ===== FACE ===== */}
        <ellipse cx="60" cy="62" rx="26" ry="25" fill="url(#aguSkin)" />
        {/* Chin refinement — Aguri has a softer pointed chin */}
        <ellipse cx="60" cy="78" rx="14" ry="10" fill="url(#aguSkin)" />

        {/* ===== NECK ===== */}
        <rect x="53" y="85" width="14" height="8" rx="4" fill="#FDDCC4" />

        {/* ===== EYES — Large bright blue, Aguri signature ===== */}
        {/* Left eye */}
        <ellipse cx="47" cy="62" rx="10" ry="11" fill="#FAFCFF" />
        <ellipse cx="47" cy="62" rx="10" ry="11" fill="none" stroke="#2A1B4E" strokeWidth="1.2" opacity="0.25" />
        <ellipse cx={47 + pupilOffset.x * 0.75} cy={62 + pupilOffset.y * 0.65} rx="7" ry="7.8" fill="url(#aguIrisL)" />
        <circle cx={47 + pupilOffset.x} cy={62 + pupilOffset.y} r="3.8" fill="#0F1B3D" />
        {/* Primary highlight — large */}
        <circle cx={44 + pupilOffset.x * 0.15} cy={58.5 + pupilOffset.y * 0.15} r="3" fill="#fff" opacity="0.95" />
        {/* Secondary highlight — small */}
        <circle cx={49.5 + pupilOffset.x * 0.1} cy={65 + pupilOffset.y * 0.1} r="1.5" fill="#fff" opacity="0.7" />
        {/* Iris ring shimmer */}
        <ellipse cx={47 + pupilOffset.x * 0.5} cy={62 + pupilOffset.y * 0.4} rx="5.5" ry="6" fill="none" stroke="#88C0F8" strokeWidth="0.6" opacity="0.4" />

        {/* Right eye */}
        <ellipse cx="73" cy="62" rx="10" ry="11" fill="#FAFCFF" />
        <ellipse cx="73" cy="62" rx="10" ry="11" fill="none" stroke="#2A1B4E" strokeWidth="1.2" opacity="0.25" />
        <ellipse cx={73 + pupilOffset.x * 0.75} cy={62 + pupilOffset.y * 0.65} rx="7" ry="7.8" fill="url(#aguIrisR)" />
        <circle cx={73 + pupilOffset.x} cy={62 + pupilOffset.y} r="3.8" fill="#0F1B3D" />
        <circle cx={70 + pupilOffset.x * 0.15} cy={58.5 + pupilOffset.y * 0.15} r="3" fill="#fff" opacity="0.95" />
        <circle cx={75.5 + pupilOffset.x * 0.1} cy={65 + pupilOffset.y * 0.1} r="1.5" fill="#fff" opacity="0.7" />
        <ellipse cx={73 + pupilOffset.x * 0.5} cy={62 + pupilOffset.y * 0.4} rx="5.5" ry="6" fill="none" stroke="#88C0F8" strokeWidth="0.6" opacity="0.4" />

        {/* ===== EYELASHES — thick top lashes, Aguri style ===== */}
        <path d="M36 55 Q41 50, 47 51.5 Q53 50, 58 55" fill="none" stroke="#2A1B4E" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        <path d="M62 55 Q67 50, 73 51.5 Q79 50, 84 55" fill="none" stroke="#2A1B4E" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        {/* Lower lash lines */}
        <path d="M39 71 Q47 74, 55 71" fill="none" stroke="#2A1B4E" strokeWidth="0.7" opacity="0.2" />
        <path d="M65 71 Q73 74, 81 71" fill="none" stroke="#2A1B4E" strokeWidth="0.7" opacity="0.2" />

        {/* ===== EYEBROWS — thin, gentle arches ===== */}
        <path d="M38 48 Q44 44, 53 47" stroke="#3D2858" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.55" />
        <path d="M67 47 Q76 44, 82 48" stroke="#3D2858" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.55" />

        {/* ===== BLUSH — Aguri's signature rosy cheeks ===== */}
        <ellipse cx="35" cy="70" rx="8" ry="4.5" fill="url(#aguBlushL)" />
        <ellipse cx="85" cy="70" rx="8" ry="4.5" fill="url(#aguBlushR)" />
        {/* Manga-style hash blush lines */}
        <g opacity="0.3">
          <line x1="30" y1="69" x2="33" y2="71.5" stroke="#E87C80" strokeWidth="0.8" />
          <line x1="32" y1="68.5" x2="35" y2="71" stroke="#E87C80" strokeWidth="0.8" />
          <line x1="34" y1="68" x2="37" y2="70.5" stroke="#E87C80" strokeWidth="0.8" />
          <line x1="83" y1="68" x2="86" y2="70.5" stroke="#E87C80" strokeWidth="0.8" />
          <line x1="85" y1="68.5" x2="88" y2="71" stroke="#E87C80" strokeWidth="0.8" />
          <line x1="87" y1="69" x2="90" y2="71.5" stroke="#E87C80" strokeWidth="0.8" />
        </g>

        {/* ===== NOSE — small dot style like Aguri ===== */}
        <circle cx="60" cy="72" r="0.8" fill="#D4A080" opacity="0.5" />

        {/* ===== MOUTH — small gentle smile ===== */}
        <path d="M55 78 Q60 81, 65 78" fill="none" stroke="#C87070" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />

        {/* ===== FRONT HAIR — Aguri's dark purple bangs ===== */}
        {/* Main bangs — wispy, parted slightly to the side */}
        <path d="M30 35 Q35 55, 40 52 Q43 46, 46 53 Q48 45, 51 52 Q53 44, 56 52 Q58 46, 60 53 Q63 48, 66 53 Q70 55, 75 38" fill={hair} opacity="0.93" />
        {/* Left side framing hair — long strand */}
        <path d="M22 32 Q17 58, 20 80 Q22 85, 26 82 Q28 72, 29 60 Q30 48, 32 35Z" fill={hair} opacity="0.9" />
        {/* Right side framing hair — long strand */}
        <path d="M98 32 Q103 58, 100 80 Q98 85, 94 82 Q92 72, 91 60 Q90 48, 88 35Z" fill={hair} opacity="0.9" />
        {/* Top crown volume */}
        <path d="M30 35 Q35 15, 50 12 Q60 10, 75 14 Q88 18, 98 32 Q85 22, 60 18 Q40 20, 30 35Z" fill={hair} opacity="0.95" />
        {/* Hair sheen overlay */}
        <path d="M40 20 Q50 15, 60 14 Q70 15, 78 22 Q68 18, 55 17 Q45 18, 40 20Z" fill="url(#aguHairSheen)" />
        {/* Flyaway strands at top */}
        <path d="M38 22 Q34 12, 30 8" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M82 22 Q86 12, 90 8" stroke={hair} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.5" />
        <path d="M58 16 Q57 6, 55 2" stroke={hair} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4" />
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
            <AguriAvatar />
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

