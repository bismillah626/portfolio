"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="page-content">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header — generous spacing */}
        <div className="mb-16">
          <p className="section-label">About</p>
          <h1 className="section-title">
            Building things that think.
          </h1>
        </div>

        {/* Content — more breathing room between cards */}
        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card"
            style={{ padding: "2.5rem 2.75rem" }}
          >
            <p className="text-lg md:text-xl leading-[1.9]" style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}>
              I&apos;m an AI/ML engineer who likes building things that actually work —
              from voice assistants that understand context to classifiers that catch spam before you even see it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="glass-card"
            style={{ padding: "2.5rem 2.75rem" }}
          >
            <p className="text-base md:text-lg leading-[1.9] mb-8" style={{ color: "var(--text-secondary)" }}>
              Most of my time goes into working with large language models, NLP pipelines, and figuring out how to make AI systems
              feel less robotic. I care about clean architecture and shipping things that solve real problems, not just proof-of-concepts
              that live in notebooks forever.
            </p>
            <p className="text-base md:text-lg leading-[1.9]" style={{ color: "var(--text-secondary)" }}>
              Outside of work, I enjoy exploring new technologies, reading, or
              planning my next travel destination. I believe in continuous learning and keeping things interesting.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            {["AI/ML", "LLMs", "NLP", "Voice AI", "Full-Stack"].map((t, i) => (
              <motion.span
                key={t}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                className="skill-pill"
                style={{ background: "rgba(167,139,250,0.1)", color: "var(--accent-purple)", border: "1px solid rgba(167,139,250,0.15)" }}
              >
                {t}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
