"use client";

import Link from "next/link";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export function ArrowUpRight({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>;
}

export function ArrowRight({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>;
}

export function GithubIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5a5.4 5.4 0 0 0-1-3.5c.3-1.2.3-2.4 0-3.5 0 0-1 0-3 1.5-2.6-.5-5.4-.5-8 0C5 2 3 2 3 2c-.3 1.1-.3 2.3 0 3.5A5.4 5.4 0 0 0 2 9c0 3.5 3 5.5 6 5.5-.7.8-1 1.8-1 3.5v4" /><path d="M9 18c-4.5 2-5-2-7-2" /></svg>;
}

export function LinkedinIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>;
}

export function SectionHeading({
  eyebrow,
  japanese,
  title,
  description,
  as = "h1",
}: {
  eyebrow: string;
  japanese: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <header className="section-heading">
      <p className="hud-label"><span>{eyebrow}</span><span className="jp">/ {japanese}</span></p>
      <Heading className="display">{title}</Heading>
      {description && <p>{description}</p>}
    </header>
  );
}

export function Chip({ children, active = false, onClick }: { children: ReactNode; active?: boolean; onClick?: () => void }) {
  const className = `data-chip ${active ? "is-active" : ""}`;
  if (onClick) return <button type="button" className={className} aria-pressed={active} onClick={onClick}>{children}</button>;
  return <span className={className}>{children}</span>;
}

export function Reveal({ children, className = "", delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ y: reduced ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function SocialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`social-links ${compact ? "is-compact" : ""}`}>
      <Link href="https://github.com/bismillah626" target="_blank" rel="noopener noreferrer" className="button-icon" aria-label="Open Bismillah Khan's GitHub profile"><GithubIcon /></Link>
      <Link href="https://www.linkedin.com/in/bismillah-khan-240953294" target="_blank" rel="noopener noreferrer" className="button-icon" aria-label="Open Bismillah Khan's LinkedIn profile"><LinkedinIcon /></Link>
    </div>
  );
}

export function HudFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`hud-card ${className}`}>{children}</div>;
}
