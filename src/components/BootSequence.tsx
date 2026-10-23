"use client";

import { useEffect, useState } from "react";

const lines = [
  "> CONNECTING TO PORTFOLIO_NODE... OK",
  "> LOADING PROJECTS / SKILLS / SIGNAL... OK",
  "> SYSTEM READY",
];

export default function BootSequence() {
  const [visible, setVisible] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || sessionStorage.getItem("bk-boot-seen")) return;
    sessionStorage.setItem("bk-boot-seen", "1");
    const show = window.setTimeout(() => setVisible(true), 0);
    const timer = window.setInterval(() => setLineCount((current) => Math.min(current + 1, lines.length)), 390);
    const close = window.setTimeout(() => setVisible(false), 1500);
    const skip = () => setVisible(false);
    window.addEventListener("keydown", skip);
    return () => {
      window.clearInterval(timer);
      window.clearTimeout(close);
      window.clearTimeout(show);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (!visible) return null;

  return (
    <button type="button" className="boot-screen" onClick={() => setVisible(false)} aria-label="Skip boot sequence">
      <span className="boot-screen-inner">
        <span className="mono boot-kicker">BK / PORTFOLIO OS v2026</span>
        {lines.slice(0, lineCount).map((line) => <span key={line} className="mono boot-line">{line}</span>)}
        <span className="mono boot-skip">[ CLICK OR PRESS ANY KEY TO SKIP ]</span>
      </span>
    </button>
  );
}
