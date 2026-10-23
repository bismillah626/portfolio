"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";
import { ArrowRight, ArrowUpRight, SocialLinks } from "./ui";
import SignalSculpture from "./SignalSculpture";

const roles = ["AI/ML ENGINEER", "LLM SYSTEMS BUILDER", "NLP PIPELINES", "APPLIED MACHINE LEARNING"];

function TypedRole() {
  const [typed, setTyped] = useState(roles[0]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout>;
    let index = 0;
    let length = roles[0].length;
    let deleting = true;
    const step = () => {
      if (query.matches || document.hidden || document.documentElement.dataset.motion === "paused") return;
      length += deleting ? -1 : 1;
      setTyped(roles[index].slice(0, length));
      let delay = deleting ? 45 : 75;
      if (length === 0) { index = (index + 1) % roles.length; deleting = false; delay = 200; }
      else if (length === roles[index].length) { deleting = true; delay = 2200; }
      timer = setTimeout(step, delay);
    };
    const sync = () => { clearTimeout(timer); timer = setTimeout(step, 2200); };
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
    query.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => { clearTimeout(timer); observer.disconnect(); query.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, []);

  return <div className="hero-role mono"><span className="sr-only">AI/ML Engineer, LLM systems builder, NLP pipelines, applied machine learning.</span><span aria-hidden="true">{typed}<span className="cursor-blink">_</span></span></div>;
}

export default function HomeHero() {
  return (
    <section className="editorial-hero" aria-labelledby="hero-title">
      <div className="hero-masthead mono">
        <p><span className="jp" lang="ja">ようこそ</span><span>WELCOME TO MY CORNER OF THE INTERNET</span></p>
        <span>PORTFOLIO — VOL. 26</span>
      </div>
      <div className="hero-composition">
        <div className="hero-copy">
          <p className="hero-intro mono"><span aria-hidden="true">✳</span> A LITTLE CURIOSITY. A LOT OF CODE.</p>
          <h1 className="display" id="hero-title">BISMILLAH<br /><span>KHAN<span className="hero-period">.</span></span></h1>
          <TypedRole />
          <p className="hero-tagline">{profile.tagline}</p>
          <div className="hero-actions">
            <Link href="#selected-work" className="button-primary">Explore my work <ArrowRight /></Link>
            <Link href={profile.resume} target="_blank" rel="noopener noreferrer" className="text-link">Download résumé <ArrowUpRight /></Link>
          </div>
          <div className="hero-socials"><SocialLinks compact /><span className="status-tag">Open to AI/ML<br />internships &amp; roles</span></div>
        </div>
        <div className="hero-art-panel">
          <div className="art-caption mono"><span>FORM / FUNCTION / INTELLIGENCE</span><span>↗</span></div>
          <span className="art-disc" aria-hidden="true" />
          <SignalSculpture />
          <span className="art-side-note mono" aria-hidden="true">AN EXPERIMENT IN CONNECTION</span>
          <span className="art-stamp" aria-hidden="true"><span className="jp">創造</span><small>CREATE</small></span>
        </div>
      </div>
      <div className="hero-colophon mono"><span>B.TECH CSE · IIIT BHUBANESWAR</span><span>2023 — 2027</span><a href="#selected-work">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}
