"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./AmbientCanvas.module.css";

const motionQuery = "(prefers-reduced-motion: reduce)";
const getReducedMotion = () => window.matchMedia(motionQuery).matches;
const serverReducedMotion = () => true;
const subscribeMotion = (notify: () => void) => {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(subscribeMotion, getReducedMotion, serverReducedMotion);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const root = document.documentElement;
    const previousMotion = root.getAttribute("data-motion");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0, lastTick = 0, lastPaint = 0;
    let width = 0, height = 0, phase = phaseRef.current;
    let colors = ["#ff816e", "#c4cba3"];
    const pointer = pointerRef.current;

    const draw = () => {
      if (!context || document.hidden) return;
      const time = reduced ? 0 : phase;
      const count = width < 768 ? 14 : 32;
      context.clearRect(0, 0, width, height);
      const px = reduced ? 0 : pointer.x * width;
      const py = reduced ? 0 : pointer.y * height;
      // Nested river-cut contours: a quiet left margin, a folded ink seam at right.
      for (let i = 0; i < count; i++) {
        const offset = i / (count - 1) - 0.5;
        const sway = Math.sin(time * 0.16 + offset) * 0.045;
        const fold = Math.cos(time * 0.12 + offset * 2) * 0.055;
        context.beginPath();
        context.moveTo(width * (0.94 + offset * 0.32), -height * 0.12);
        context.bezierCurveTo(
          width * (0.48 + offset * 0.22 + sway) + px, height * 0.16 + py,
          width * (1.22 + offset * 0.24), height * 0.32 - py,
          width * (0.82 + offset * 0.26 + fold), height * 0.53,
        );
        context.bezierCurveTo(
          width * (0.48 + offset * 0.3 - sway) - px, height * 0.76 + py,
          width * (1.12 + offset * 0.2), height * 0.9 - py,
          width * (0.84 + offset * 0.38), height * 1.12,
        );
        context.strokeStyle = colors[i % 9 < 3 ? 1 : 0];
        if (i % 8 === 0) {
          context.globalAlpha = 0.025;
          context.lineWidth = 12;
          context.stroke();
        }
        context.globalAlpha = 0.13 + (1 - Math.abs(offset) * 2) * 0.12;
        context.lineWidth = i % 4 === 0 ? 1 : 0.6;
        context.stroke();
      }
      context.globalAlpha = 1;
    };

    const palette = () => {
      const css = getComputedStyle(canvas);
      const light = root.dataset.theme === "light";
      colors = [
        css.getPropertyValue("--accent").trim() || (light ? "#9e302f" : "#ff816e"),
        css.getPropertyValue("--sage").trim() || (light ? "#4d5a30" : "#c4cba3"),
      ];
      draw();
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context?.setTransform(ratio, 0, 0, ratio, 0, 0);
      palette();
    };

    const tick = (now: number) => {
      frame = 0;
      if (document.hidden || paused || reduced) return;
      phase += lastTick ? Math.min(now - lastTick, 64) / 1000 : 0;
      lastTick = now;
      if (now - lastPaint >= 1000 / 24) {
        pointer.x += ((fine.matches ? pointer.targetX : 0) - pointer.x) * 0.06;
        pointer.y += ((fine.matches ? pointer.targetY : 0) - pointer.y) * 0.06;
        draw();
        lastPaint = now - ((now - lastPaint) % (1000 / 24));
      }
      frame = requestAnimationFrame(tick);
    };

    const syncMotion = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTick = lastPaint = 0;
      const still = paused || reduced || document.hidden;
      root.dataset.motion = still ? "paused" : "running";
      draw();
      if (!still && context) frame = requestAnimationFrame(tick);
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType === "touch") return;
      pointer.targetX = (event.clientX / width - 0.5) * 0.08;
      pointer.targetY = (event.clientY / height - 0.5) * 0.06;
    };
    const leave = () => { pointer.targetX = pointer.targetY = 0; };
    const observer = new MutationObserver(palette);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme", "class", "style"] });
    resize();
    syncMotion();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", leave);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("visibilitychange", syncMotion);
    return () => {
      cancelAnimationFrame(frame);
      phaseRef.current = phase;
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", leave);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", syncMotion);
      if (previousMotion === null) root.removeAttribute("data-motion");
      else root.setAttribute("data-motion", previousMotion);
    };
  }, [paused, reduced]);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <button
        type="button"
        className={styles.control}
        disabled={reduced}
        aria-label={reduced ? "Resume motion (disabled by reduced-motion preference)" : undefined}
        title={reduced ? "Motion is paused by your reduced-motion preference" : undefined}
        onClick={() => setPaused((value) => !value)}
      >
        {paused || reduced ? "Resume motion" : "Pause motion"}
      </button>
    </>
  );
}
