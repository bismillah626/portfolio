"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { ArrowRight, SocialLinks } from "./ui";

const roles = ["AI/ML ENGINEER", "LLM SYSTEMS BUILDER", "NLP PIPELINES", "APPLIED MACHINE LEARNING"];

export default function HomeHero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState(roles[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    const delay = deleting ? 42 : 82;
    const timer = window.setTimeout(() => {
      if (!deleting && typed === current) {
        setDeleting(true);
      } else if (deleting && typed.length === 0) {
        setDeleting(false);
        setRoleIndex((index) => (index + 1) % roles.length);
      } else {
        setTyped(deleting ? current.slice(0, typed.length - 1) : current.slice(0, typed.length + 1));
      }
    }, typed === current && !deleting ? 1500 : delay);
    return () => window.clearTimeout(timer);
  }, [deleting, roleIndex, typed]);

  return (
    <section className="home-hero">
      <div className="home-hero-grid" aria-hidden="true" />
      <div className="home-hero-bracket bracket-one" aria-hidden="true" />
      <div className="home-hero-bracket bracket-two" aria-hidden="true" />
      <div className="home-hero-content">
        <p className="mono hero-kicker"><span className="jp">ようこそ</span><span>{"// WELCOME"}</span></p>
        <p className="mono hero-index">[ 001 / SIGNAL FOUND ]</p>
        <h1 className="display hero-title glitch-load">BISMILLAH<br /><span className="text-gradient">KHAN</span></h1>
        <div className="hero-role mono" aria-live="polite"><span className="hero-prompt">&gt;</span> {typed}<span className="cursor-blink hero-cursor">_</span></div>
        <p className="hero-tagline">{profile.tagline}</p>
        <div className="hero-status"><span className="status-tag">Open to AI/ML internships &amp; roles</span></div>
        <div className="hero-actions">
          <Link href="/projects" className="button-primary">View projects <ArrowRight /></Link>
          <Link href={profile.resume} target="_blank" rel="noopener noreferrer" className="button-secondary">Download resume <ArrowRight /></Link>
          <SocialLinks compact />
        </div>
        <div className="hero-meta mono">
          <span>IIIT BHUBANESWAR / B.TECH CSE</span>
          <span className="hero-meta-separator">{"///"}</span>
          <span>CGPA 8.05</span>
        </div>
      </div>
      <div className="hero-orbit" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero-scroll-cue mono" aria-hidden="true"><span>SCROLL TO EXPLORE</span><span className="scroll-arrow">↓</span></div>
    </section>
  );
}
