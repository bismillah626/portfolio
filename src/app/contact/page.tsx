"use client";

import { motion } from "framer-motion";

export default function ContactPage() {
  return (
    <div className="page-content">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="mb-14">
          <p className="section-label">Contact</p>
          <h1 className="section-title">
            Let&apos;s connect.
          </h1>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg md:text-xl leading-relaxed max-w-lg"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-heading)" }}
          >
            Always up for interesting conversations and new opportunities.
          </motion.p>

          {/* Email Card */}
          <motion.a
            href="mailto:khanbismillah2004@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="glass-card flex items-center gap-5 p-6 md:p-7 group"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(251,191,36,0.08)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: "var(--text-muted)" }}>Email</p>
              <p className="text-base md:text-lg font-medium" style={{ color: "var(--text-primary)" }}>khanbismillah2004@gmail.com</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "var(--accent-gold)" }}>
              <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
            </svg>
          </motion.a>

          {/* GitHub Card */}
          <motion.a
            href="https://github.com/bismillah626"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="glass-card flex items-center gap-5 p-6 md:p-7 group"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(167,139,250,0.08)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-purple)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: "var(--text-muted)" }}>GitHub</p>
              <p className="text-base md:text-lg font-medium" style={{ color: "var(--text-primary)" }}>bismillah626</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "var(--accent-purple)" }}>
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </motion.a>

          {/* LinkedIn Card */}
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="glass-card flex items-center gap-5 p-6 md:p-7 group"
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(103,232,232,0.08)" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] mb-1" style={{ color: "var(--text-muted)" }}>LinkedIn</p>
              <p className="text-base md:text-lg font-medium" style={{ color: "var(--text-primary)" }}>Bismillah Khan</p>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "var(--accent-cyan)" }}>
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}
