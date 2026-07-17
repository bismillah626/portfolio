"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import {
  SiPython,
  SiCplusplus,
  SiMysql,
  SiGit,
  SiLangchain,
  SiLanggraph,
  SiHuggingface,
  SiScikitlearn,
  SiFlask,
  SiStreamlit,
  SiNumpy,
  SiPandas,
  SiFastapi,
  SiDocker,
  SiLinux,
} from "react-icons/si";
import {
  TbBrain,
  TbVectorTriangle,
  TbSparkles,
  TbMessageChatbot,
  TbSearch,
  TbDatabase,
} from "react-icons/tb";

type SkillItem = {
  name: string;
  icon: ReactNode;
};

type SkillGroup = {
  category: string;
  color: string;
  bgColor: string;
  borderColor: string;
  items: SkillItem[];
};

export default function SkillsPage() {
  const skills: SkillGroup[] = [
    {
      category: "Core",
      color: "var(--accent-purple)",
      bgColor: "rgba(167,139,250,0.08)",
      borderColor: "rgba(167,139,250,0.12)",
      items: [
        { name: "Python", icon: <SiPython size={14} color="#3776AB" /> },
        { name: "C++", icon: <SiCplusplus size={14} color="#00599C" /> },
        { name: "MySQL", icon: <SiMysql size={14} color="#4479A1" /> },
        { name: "Git", icon: <SiGit size={14} color="#F05032" /> },
        { name: "Linux", icon: <SiLinux size={14} color="#FCC624" /> },
      ],
    },
    {
      category: "AI / ML Ecosystem",
      color: "var(--accent-cyan)",
      bgColor: "rgba(103,232,232,0.08)",
      borderColor: "rgba(103,232,232,0.1)",
      items: [
        { name: "LangChain", icon: <SiLangchain size={14} color="#1C3C3C" /> },
        { name: "Hugging Face", icon: <SiHuggingface size={14} color="#FFD21E" /> },
        { name: "Scikit-learn", icon: <SiScikitlearn size={14} color="#F7931E" /> },
        { name: "FAISS", icon: <TbDatabase size={14} color="#4285F4" /> },
        { name: "Sentence-Transformers", icon: <TbVectorTriangle size={14} color="#FF6F00" /> },
        { name: "ChromaDB", icon: <TbDatabase size={14} color="#4DB6AC" /> },
        { name: "LangGraph", icon: <SiLanggraph size={14} color="#1C3C3C" /> },
      ],
    },
    {
      category: "Areas of Focus",
      color: "var(--accent-pink)",
      bgColor: "rgba(244,114,182,0.08)",
      borderColor: "rgba(244,114,182,0.1)",
      items: [
        { name: "Large Language Models", icon: <TbBrain size={14} /> },
        { name: "NLP Pipelines", icon: <TbMessageChatbot size={14} /> },
        { name: "Machine Learning", icon: <TbSparkles size={14} /> },
        { name: "Vector Search", icon: <TbSearch size={14} /> },
        { name: "Generative AI", icon: <TbSparkles size={14} /> },
      ],
    },
    {
      category: "Web & Tools",
      color: "var(--accent-gold)",
      bgColor: "rgba(251,191,36,0.06)",
      borderColor: "rgba(251,191,36,0.1)",
      items: [
        { name: "FastAPI", icon: <SiFastapi size={14} color="#009688" /> },
        { name: "Flask", icon: <SiFlask size={14} color="#FFFFFF" /> },
        { name: "Streamlit", icon: <SiStreamlit size={14} color="#FF4B4B" /> },
        { name: "Docker", icon: <SiDocker size={14} color="#2496ED" /> },
        { name: "NumPy", icon: <SiNumpy size={14} color="#4DABCF" /> },
        { name: "Pandas", icon: <SiPandas size={14} color="#150458" /> },
      ],
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
        <div style={{ marginBottom: "4rem" }}>
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
                    key={item.name}
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
                    <span className="skill-pill-icon">
                      {item.icon}
                    </span>
                    {item.name}
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
