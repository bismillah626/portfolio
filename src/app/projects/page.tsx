"use client";

import { motion } from "framer-motion";

export default function ProjectsPage() {
  const projects = [
    {
      name: "Friday AI — Voice Assistant",
      desc: "A modular voice assistant built with LangChain for task orchestration, FAISS for contextual memory, and the Gemini API for natural language understanding. My attempt at building a personal AI that actually remembers what you told it five minutes ago.",
      tags: ["Python", "LangChain", "FAISS", "Gemini"],
      link: "https://github.com/bismillah626/Friday_AI_Assistant-ff--_--_V2",
      accent: "var(--accent-purple)",
      gradient: "linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.08) 100%)",
    },
    {
      name: "Spam Email Classifier",
      desc: "Chrome extension backed by a Flask API. Uses an ensemble NLP pipeline that hits 98% accuracy. The kind of project where the engineering under the hood is way more interesting than it looks on the surface.",
      tags: ["Python", "Flask", "NLP", "Scikit-learn"],
      link: "https://github.com/bismillah626/spam_project",
      accent: "var(--accent-cyan)",
      gradient: "linear-gradient(135deg, rgba(6,182,212,0.12) 0%, rgba(34,211,238,0.06) 100%)",
    },
    {
      name: "Nike E-Commerce App",
      desc: "A Flutter mobile app with clean product listings and smooth navigation. More of a design-focused project — wanted to see how far I could push mobile UI polish.",
      tags: ["Flutter", "Dart", "Mobile"],
      link: "https://github.com/bismillah626/Nike_ecommerce_store-",
      accent: "var(--accent-pink)",
      gradient: "linear-gradient(135deg, rgba(244,114,182,0.12) 0%, rgba(236,72,153,0.06) 100%)",
    },
    {
      name: "AI Transcriber",
      desc: "Takes audio in, gives you accurate text out. Built with modern speech recognition models. Simple, reliable, and does exactly what it says.",
      tags: ["AI", "Audio", "Python"],
      link: "https://github.com/bismillah626/Ai_transcriber",
      accent: "var(--accent-gold)",
      gradient: "linear-gradient(135deg, rgba(251,191,36,0.1) 0%, rgba(245,158,11,0.05) 100%)",
    },
  ];

  return (
    <div className="page-content">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header */}
        <div className="mb-16">
          <p className="section-label">Projects</p>
          <h1 className="section-title">
            Things I&apos;ve built.
          </h1>
        </div>

        {/* Projects — much more spacing */}
        <div className="flex flex-col gap-10">
          {projects.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group block rounded-2xl transition-all duration-400"
              style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                backdropFilter: "blur(16px)",
                padding: "2rem 2.25rem",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = project.gradient;
                e.currentTarget.style.borderColor = `color-mix(in srgb, ${project.accent} 25%, transparent)`;
                e.currentTarget.style.boxShadow = `0 12px 48px color-mix(in srgb, ${project.accent} 8%, transparent)`;
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--bg-card)";
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div className="flex items-start gap-5">
                {/* Accent dot */}
                <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5" style={{ background: project.accent }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-4">
                    <h3
                      className="text-xl md:text-2xl font-semibold"
                      style={{ color: "var(--text-primary)", fontFamily: "var(--font-heading)" }}
                    >
                      {project.name}
                    </h3>
                    <svg
                      width="18" height="18" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="flex-shrink-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      style={{ color: project.accent, opacity: 0.5 }}
                    >
                      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                    </svg>
                  </div>
                  <p
                    className="text-sm md:text-base leading-[1.8] mb-6"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3.5 py-1.5 rounded-full"
                        style={{
                          background: `color-mix(in srgb, ${project.accent} 8%, transparent)`,
                          color: project.accent,
                          border: `1px solid color-mix(in srgb, ${project.accent} 12%, transparent)`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
