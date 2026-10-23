"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { profile, projects } from "@/data/portfolio";
import { ArrowRight } from "./ui";

const quickPrompts = ["Who is Bismillah?", "What are his projects?", "Technical skills?", "How to contact him?", "Tell me about Friday AI"];

const knowledgeBase: Record<string, string> = {
  who: `${profile.name} is an ${profile.role} and B.Tech CSE student at ${profile.college} (${profile.graduation}). His work focuses on LLMs, NLP pipelines, RAG, agentic AI, and applied machine learning.`,
  projects: `The current build log includes ${projects.map((project) => project.title).join(", ")}. Open the Projects route for the mission briefings, stacks, results, and repository links.`,
  skills: `The stack is grouped into Languages, ML / Data, GenAI / Agents, and Deployment / Tools. It includes Python, C++, SQL, NumPy, Pandas, Scikit-learn, PyTorch, MLflow, LangChain, LangGraph, Hugging Face Transformers, FAISS, SentenceTransformers, FastAPI, Flask, Docker, and Git.`,
  contact: `The best direct channel is ${profile.email}. You can also use GitHub at github.com/bismillah626 or the LinkedIn link in the navigation.`,
  friday: `Friday AI is an LLM voice assistant with LangChain orchestration, three personality modes, and semantic memory using FAISS plus SentenceTransformers. Retrieval is under 80ms over 500+ stored interactions, and two-pass speech preprocessing raised intent accuracy from 71% to 91.4% on a 200-sample test set.`,
};

function findAnswer(input: string) {
  const lower = input.toLowerCase().trim();
  if (lower.includes("friday") || lower.includes("voice assistant")) return knowledgeBase.friday;
  if (lower.includes("skill") || lower.includes("stack") || lower.includes("technology")) return knowledgeBase.skills;
  if (lower.includes("project") || lower.includes("built") || lower.includes("portfolio")) return knowledgeBase.projects;
  if (lower.includes("contact") || lower.includes("reach") || lower.includes("email") || lower.includes("linkedin") || lower.includes("github")) return knowledgeBase.contact;
  if (lower.includes("who") || lower.includes("about") || lower.includes("name") || lower.includes("bismillah")) return knowledgeBase.who;
  return "Try asking about Bismillah, his projects, technical skills, Friday AI, or how to contact him.";
}

type Message = { role: "user" | "bot"; content: string };

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const sendMessage = useCallback((text: string) => {
    if (!text.trim() || isTyping) return;
    setMessages((current) => [...current, { role: "user", content: text.trim() }]);
    setInput("");
    setOpen(true);
    setIsTyping(true);
    window.setTimeout(() => {
      setMessages((current) => [...current, { role: "bot", content: findAnswer(text) }]);
      setIsTyping(false);
    }, 520);
  }, [isTyping]);

  return (
    <aside className={`chat-widget ${open ? "is-open" : ""}`} aria-label="Ask LazyGPT chat widget">
      {open && <div className="chat-panel hud-card" id="lazy-gpt-panel">
        <div className="chat-header"><div><span className="mono chat-kicker">LAZYGPT / LOCAL NODE</span><strong className="display">Ask LazyGPT<span className="cursor-blink">_</span></strong></div><button type="button" onClick={() => setOpen(false)} aria-label="Close LazyGPT">×</button></div>
        <div className="chat-suggested">{quickPrompts.map((prompt) => <button type="button" key={prompt} onClick={() => sendMessage(prompt)} disabled={isTyping}>{prompt}</button>)}</div>
        <div className="chat-messages" aria-live="polite">
          {messages.length === 0 && <p className="chat-empty mono">&gt; Ask about the engineer, projects, stack, Friday AI, or contact channels.</p>}
          {messages.map((message, index) => <div key={`${message.role}-${index}`} className={`chat-message ${message.role}`}><span className="mono chat-message-label">{message.role === "user" ? "YOU" : "LAZYGPT"}</span><p>{message.content}</p></div>)}
          {isTyping && <div className="chat-message bot"><span className="mono chat-message-label">LAZYGPT</span><div className="typing-dots"><i className="typing-dot" /><i className="typing-dot" /><i className="typing-dot" /></div></div>}
          <div ref={endRef} />
        </div>
        <form className="chat-form" onSubmit={(event) => { event.preventDefault(); sendMessage(input); }}><label htmlFor="chat-input" className="sr-only">Ask LazyGPT a question</label><input ref={inputRef} id="chat-input" value={input} onChange={(event) => setInput(event.target.value)} placeholder="Type a transmission..." disabled={isTyping} /><button type="submit" disabled={!input.trim() || isTyping} aria-label="Send question"><ArrowRight /></button></form>
      </div>}
      <button type="button" className="chat-launcher" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="lazy-gpt-panel"><span className="chat-launcher-dot" /> <span className="mono">ASK LAZYGPT</span><span aria-hidden="true">{open ? "×" : "↗"}</span></button>
    </aside>
  );
}
