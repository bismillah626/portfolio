"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

// ===== KNOWLEDGE BASE =====
const knowledgeBase: Record<string, string> = {
  who: "Bismillah Khan — AI/ML engineer and someone who genuinely enjoys building things that think. Currently deep into language models and NLP, always chasing the next interesting problem to solve. Outside of code, you'll probably find him exploring new tech or planning a trip.",
  name: "Bismillah Khan. He builds intelligent systems — voice assistants, NLP pipelines, the works.",
  education: "He's a Computer Science student at IIIT Bhubaneswar, graduating in 2027. Solid academic track record, but honestly the real learning happens in the projects he ships.",
  experience: "Bismillah has been building production-grade AI systems — from LLM-powered voice assistants to high-accuracy classification engines. He's not just experimenting; he ships real tools that work.",
  skills: "His core stack revolves around Python and the AI/ML ecosystem. He works extensively with large language models, NLP pipelines, and vector search. On the framework side, think LangChain, Hugging Face, Scikit-learn, and FAISS. He also knows his way around Flask, Streamlit, and frontend tools when needed.",
  languages: "Python is the primary weapon. He also works with C++ and SQL when the job calls for it. Flask and Streamlit for building quick web interfaces around his models.",
  frameworks: "LangChain for orchestrating LLM workflows, Hugging Face for transformer models, Scikit-learn for classical ML, FAISS and Sentence-Transformers for vector search and embeddings. Solid end-to-end coverage.",
  projects: "He's built a few things worth checking out:\n\n- Friday AI — A modular voice assistant powered by LangChain and Gemini\n- Spam Email Classifier — Chrome extension with a Flask backend, 98% accuracy\n- Nike E-Commerce App — Clean Flutter mobile app\n- AI Transcriber — Audio-to-text pipeline\n\nAll open-source on GitHub.",
  friday: "Friday AI is probably his most ambitious project. It's a modular voice assistant built with LangChain for task orchestration, FAISS for memory retrieval, and Gemini API for natural language understanding. Basically his attempt at building a personal J.A.R.V.I.S. — and it actually works pretty well.\n\nCheck it out: github.com/bismillah626/Friday_AI_Assistant-ff--_--_V2",
  spam: "The Spam Classifier is a Chrome extension backed by a Flask REST API. Under the hood, it uses an ensemble NLP pipeline that hits 98% accuracy with perfect precision. It's one of those projects that sounds simple but the engineering behind it is tight.\n\nRepo: github.com/bismillah626/spam_project",
  nike: "The Nike E-Commerce App is a Flutter mobile app — clean product listings, smooth navigation, modern UI. More of a design and frontend exercise, but it turned out really polished.\n\nRepo: github.com/bismillah626/Nike_ecommerce_store-",
  transcriber: "AI Transcriber converts audio into accurate text using modern speech recognition models. Straightforward, effective, and useful.\n\nRepo: github.com/bismillah626/Ai_transcriber",
  contact: "Best ways to reach him:\n\nEmail: khanbismillah2004@gmail.com\nGitHub: github.com/bismillah626\n\nAlways open to interesting conversations and opportunities.",
  email: "Shoot an email to khanbismillah2004@gmail.com — he usually responds pretty quickly.",
  github: "Everything's on github.com/bismillah626 — all open-source, feel free to poke around.",
  hobbies: "When he's not building AI stuff, he enjoys exploring new tech trends, reading, and occasionally travelling to new places.",
  hello: "Hey! I'm LazyGPT — ask me anything about Bismillah's work, projects, skills, or background. What's on your mind?",
  hi: "What's up! Welcome to the portfolio. I can tell you about his projects, skills, background, or anything else. Fire away.",
  resume: "Quick overview:\n\nAI/ML Engineer with production-level project experience. Strong in Python, LLMs, NLP, and the broader ML ecosystem. Has shipped voice assistants, classification engines, and full-stack apps. Currently finishing his CS degree while building real things.\n\nHit the 'View Resume' button above for the full document.",
  ai: "AI and ML are his core focus — specifically generative AI, large language models, and NLP pipelines. He's built systems that actually work in production, not just notebooks.",
  ml: "On the ML side, he works with ensemble methods, classical classifiers, vector embeddings, and retrieval-augmented generation. The full pipeline from data to deployment.",
  nlp: "NLP is where a lot of his best work lives. From building a spam classifier with near-perfect accuracy to creating emotion-aware conversational AI with Hugging Face models.",
  travel: "He loves travelling and exploring new places. It's the curiosity thing — same drive that makes him dig into new tech also makes him want to see what's out there in the world.",
};

function findAnswer(input: string): string {
  const lower = input.toLowerCase().trim();

  const keywordMap: [string[], string][] = [
    [["who is", "who are", "tell me about", "about bismillah", "about him", "about yourself", "introduce"], "who"],
    [["name"], "name"],
    [["education", "study", "studying", "college", "university", "iiit", "bhubaneswar", "btech", "b.tech", "degree"], "education"],
    [["experience", "work", "career", "job"], "experience"],
    [["skill", "tech stack", "technologies", "tools", "what can he", "what does he know"], "skills"],
    [["language", "programming"], "languages"],
    [["framework", "library", "libraries"], "frameworks"],
    [["project", "built", "created", "made", "portfolio"], "projects"],
    [["friday", "voice assistant", "jarvis", "assistant"], "friday"],
    [["spam", "email", "classifier", "chrome extension"], "spam"],
    [["nike", "ecommerce", "e-commerce", "flutter", "mobile app"], "nike"],
    [["transcrib", "audio", "speech to text"], "transcriber"],
    [["contact", "reach", "connect", "hire", "available"], "contact"],
    [["email", "mail", "gmail"], "email"],
    [["github", "repo", "repository", "code", "open source"], "github"],
    [["hobby", "hobbies", "free time", "fun", "interest"], "hobbies"],
    [["travel", "trip", "explore", "places"], "travel"],
    [["hello", "hey", "howdy", "greet", "yo"], "hello"],
    [["hi", "hii", "hiii", "sup", "what's up", "wassup"], "hi"],
    [["resume", "cv", "curriculum"], "resume"],
    [["ai", "artificial intelligence", "machine learning", "deep learning", "neural"], "ai"],
    [["ml", "model", "training", "scikit", "sklearn"], "ml"],
    [["nlp", "natural language", "text processing", "classification"], "nlp"],
  ];

  for (const [keywords, key] of keywordMap) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        return knowledgeBase[key];
      }
    }
  }

  return "Hmm, not sure about that one. Try asking about his projects, skills, background, or how to reach him. Or just say hi — I don't bite.";
}

const quickPrompts = [
  "Who is Bismillah?",
  "What are his projects?",
  "Technical skills?",
  "How to contact him?",
  "Tell me about Friday AI",
];

interface Message {
  role: "user" | "bot";
  content: string;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!text.trim() || isTyping) return;

      const userMsg: Message = { role: "user", content: text.trim() };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);

      const delay = 400 + Math.random() * 800;
      setTimeout(() => {
        const answer = findAnswer(text);
        setMessages((prev) => [...prev, { role: "bot", content: answer }]);
        setIsTyping(false);
      }, delay);
    },
    [isTyping]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <section
      className="relative z-20"
      style={{ maxWidth: "1040px", margin: "0 auto", padding: "5rem clamp(1.5rem, 4vw, 3rem) 3rem" }}
    >
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="text-center mb-6"
      >
        <p className="text-base tracking-wider" style={{ color: "var(--text-muted)", fontFamily: "var(--font-heading)" }}>
          Ask <span style={{ color: "var(--accent-purple)", fontWeight: 600 }}>LazyGPT</span>
        </p>
      </motion.div>

      {/* Quick Prompts — pill-style with border like Franck */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="flex flex-wrap justify-center gap-3 mb-10"
      >
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => sendMessage(prompt)}
            className="text-sm px-5 py-2.5 rounded-full transition-all duration-300 cursor-pointer"
            style={{
              background: "transparent",
              color: "var(--text-secondary)",
              border: `1px solid ${isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = isLight ? "rgba(124,93,214,0.06)" : "rgba(167,139,250,0.08)";
              e.currentTarget.style.borderColor = isLight ? "rgba(124,93,214,0.25)" : "rgba(167,139,250,0.25)";
              e.currentTarget.style.color = "var(--text-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = isLight ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            {prompt}
          </button>
        ))}
      </motion.div>

      {/* Messages */}
      <AnimatePresence>
        {messages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-8 max-h-[450px] overflow-y-auto rounded-2xl p-6 md:p-8 space-y-5"
            style={{
              background: isLight ? "rgba(255, 255, 255, 0.85)" : "rgba(10, 10, 18, 0.75)",
              border: "1px solid var(--border-subtle)",
              backdropFilter: "blur(20px)",
              boxShadow: isLight ? "0 4px 24px rgba(0,0,0,0.06)" : "none",
            }}
          >
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[85%] rounded-2xl px-5 py-3.5 text-sm md:text-base leading-relaxed whitespace-pre-wrap"
                  style={{
                    background:
                      msg.role === "user"
                        ? isLight
                          ? "linear-gradient(135deg, rgba(124,93,214,0.12), rgba(8,145,178,0.06))"
                          : "linear-gradient(135deg, rgba(167,139,250,0.2), rgba(103,232,232,0.08))"
                        : isLight
                          ? "rgba(0,0,0,0.03)"
                          : "rgba(255,255,255,0.03)",
                    border: `1px solid ${msg.role === "user"
                      ? isLight ? "rgba(124,93,214,0.15)" : "rgba(167,139,250,0.15)"
                      : isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"
                    }`,
                    color: "var(--text-primary)",
                    borderBottomRightRadius: msg.role === "user" ? "4px" : "16px",
                    borderBottomLeftRadius: msg.role === "bot" ? "4px" : "16px",
                  }}
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div
                  className="rounded-2xl px-4 py-3 flex items-center gap-1.5"
                  style={{ background: isLight ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)", border: `1px solid ${isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}` }}
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        background: "var(--accent-purple)",
                        animation: `typingBounce 1.2s ease-in-out ${i * 0.15}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input — taller box like Franck's, with send button bottom-right */}
      <motion.form
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        onSubmit={handleSubmit}
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: isLight ? "rgba(255, 255, 255, 0.8)" : "rgba(12, 12, 22, 0.85)",
          border: "1px solid var(--border-subtle)",
          backdropFilter: "blur(16px)",
          boxShadow: isLight ? "0 4px 20px rgba(0,0,0,0.06)" : "none",
          transition: "all 0.6s ease",
        }}
      >
        {/* Textarea placeholder area */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What would you like to know?"
          className="w-full px-6 pt-5 pb-2 text-sm outline-none bg-transparent"
          style={{
            color: "var(--text-primary)",
            fontFamily: "var(--font-body)",
          }}
          onFocus={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.borderColor = "rgba(167,139,250,0.25)";
              parent.style.boxShadow = "0 0 30px rgba(167,139,250,0.06)";
            }
          }}
          onBlur={(e) => {
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.style.borderColor = "var(--border-subtle)";
              parent.style.boxShadow = "none";
            }
          }}
        />
        {/* Bottom row with mic icon + send button */}
        <div className="flex items-center justify-between px-5 pb-4 pt-2">
          {/* Mic icon (decorative) */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ color: "var(--text-muted)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
              <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
              <line x1="12" x2="12" y1="19" y2="22" />
            </svg>
          </div>
          {/* Send button */}
          <button
            type="submit"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
            style={{
              background: input.trim() ? "rgba(167,139,250,0.2)" : "transparent",
              color: input.trim() ? "var(--accent-purple)" : "var(--text-muted)",
            }}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4z" />
              <path d="M22 2 11 13" />
            </svg>
          </button>
        </div>
      </motion.form>

      {/* Footer credit */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 3, duration: 1 }}
        className="text-center text-[10px] mt-8 select-none"
        style={{ color: "var(--text-muted)" }}
      >
        Designed with care · © {new Date().getFullYear()} Bismillah Khan
      </motion.p>
    </section>
  );
}
