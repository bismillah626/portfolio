"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ReactiveAvatar.module.css";

export default function ReactiveAvatar() {
  const ref = useRef<HTMLDivElement>(null);
  const [winking, setWinking] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let visible = false;
    let active = false;
    let frame = 0;

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      element.style.removeProperty("--gaze-x");
      element.style.removeProperty("--gaze-y");
    };
    const sync = () => {
      active = visible && !document.hidden && !reduced.matches && root.dataset.motion !== "paused";
      element.dataset.active = String(active);
      if (!active || !fine.matches) reset();
    };
    const move = (event: PointerEvent) => {
      if (!active || !fine.matches || event.pointerType === "touch") return;
      const bounds = element.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = 0;
        element.style.setProperty("--gaze-x", `${(x * 7).toFixed(2)}px`);
        element.style.setProperty("--gaze-y", `${(y * 5).toFixed(2)}px`);
      });
    };
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-motion"] });
    intersection.observe(element);
    reduced.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    element.addEventListener("pointermove", move, { passive: true });
    element.addEventListener("pointerleave", reset);
    element.addEventListener("pointercancel", reset);
    window.addEventListener("blur", reset);
    sync();
    return () => {
      reset();
      intersection.disconnect();
      observer.disconnect();
      reduced.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      element.removeEventListener("pointermove", move);
      element.removeEventListener("pointerleave", reset);
      element.removeEventListener("pointercancel", reset);
      window.removeEventListener("blur", reset);
    };
  }, []);

  return (
    <div ref={ref} className={styles.portrait} data-active="false" data-expression={winking ? "wink" : "neutral"}>
      <svg className="avatar-glyph" viewBox="0 0 320 360" fill="none" role="img" aria-label={`Geometric avatar ${winking ? "winking" : "with curious eyes"}`}>
        <g className={styles.orbit}>
          <path d="M160 25 288 98v145l-128 73-128-73V98L160 25Z" stroke="currentColor" opacity=".34" />
          <circle cx="160" cy="25" r="4" fill="var(--sage)" />
          <circle cx="32" cy="243" r="3" fill="currentColor" />
        </g>
        <path d="m160 50 106 61v119l-106 59-106-59V111L160 50Z" stroke="currentColor" opacity=".52" />
        <path d="M160 78 237 122v76l-77 44-77-44v-76l77-44Z" fill="color-mix(in srgb, var(--sage) 12%, transparent)" stroke="currentColor" />
        <path d="M115 134h28m34 0h28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M129 143c-13 0-24 9-24 21s11 21 24 21 24-9 24-21-11-21-24-21Zm62 0c-13 0-24 9-24 21s11 21 24 21 24-9 24-21-11-21-24-21Z" stroke="var(--text)" strokeWidth="2" />
        <g className={styles.gaze} fill="currentColor">
          <circle cx="129" cy="164" r="5" />
          {!winking && <circle cx="191" cy="164" r="5" />}
        </g>
        {winking && <path d="m181 165 10-4 10 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />}
        <path d={winking ? "M143 196q17 16 34 0" : "M143 200h34"} stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="m160 78 0-28m-77 72-25-14m159 14 25-14m-82 164v38" stroke="var(--sage)" strokeDasharray="4 6" />
        <path d="M94 296h132M72 316h176" stroke="currentColor" opacity=".35" />
        <text x="160" y="340" textAnchor="middle" fill="currentColor" fontFamily="var(--font-code)" fontSize="10" letterSpacing="3">A LITTLE PERSONALITY</text>
      </svg>
      <div className={styles.controls}>
        <span className={styles.hint}>Curiosity, personified.</span>
        <button type="button" aria-pressed={winking} onClick={() => setWinking((value) => !value)}>Wink <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  );
}
