"use client";

import { motion } from "framer-motion";

export default function SkillsPage() {
  const skills = [
    {
      category: "Core",
      color: "var(--accent-purple)",
      bgColor: "rgba(167,139,250,0.08)",
      borderColor: "rgba(167,139,250,0.12)",
      items: ["Python", "C++", "SQL", "Git"],
    },
    {
      category: "AI / ML Ecosystem",
      color: "var(--accent-cyan)",
      bgColor: "rgba(103,232,232,0.08)",
      borderColor: "rgba(103,232,232,0.1)",
      items: ["LangChain", "Hugging Face", "Scikit-learn", "FAISS", "Sentence-Transformers"],
    },
    {
      category: "Areas of Focus",
      color: "var(--accent-pink)",
      bgColor: "rgba(244,114,182,0.08)",
      borderColor: "rgba(244,114,182,0.1)",
      items: ["Large Language Models", "NLP Pipelines", "Machine Learning", "Vector Search", "Generative AI"],
    },
    {
      category: "Web & Tools",
      color: "var(--accent-gold)",
      bgColor: "rgba(251,191,36,0.06)",
      borderColor: "rgba(251,191,36,0.1)",
      items: ["Flask", "Streamlit", "NumPy", "Pandas"],
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
          <p className="section-label">Skills</p>
          <h1 className="section-title">
            What I work with.
          </h1>
        </div>

        {/* Skills Groups — proper spacing between cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + gi * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card"
              style={{ padding: "2rem 2.25rem" }}
            >
              <h3
                className="text-xs font-mono uppercase tracking-[0.2em] mb-6"
                style={{ color: group.color }}
              >
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((item, ii) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + gi * 0.1 + ii * 0.05, duration: 0.35 }}
                    className="skill-pill"
                    style={{
                      background: group.bgColor,
                      color: group.color,
                      border: `1px solid ${group.borderColor}`,
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
