"use client";

import { useEffect, useRef } from "react";

type Drop = { x: number; y: number; length: number; speed: number; opacity: number };

export default function AmbientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;
    let hidden = document.hidden;
    const drops: Drop[] = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      drops.length = 0;
      const count = Math.min(60, Math.max(22, Math.floor(window.innerWidth / 22)));
      for (let i = 0; i < count; i += 1) {
        drops.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          length: 8 + Math.random() * 28,
          speed: 0.5 + Math.random() * 1.4,
          opacity: 0.08 + Math.random() * 0.2,
        });
      }
    };

    const draw = () => {
      if (!hidden) {
        context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        context.lineWidth = 1;
        for (const drop of drops) {
          context.strokeStyle = `rgba(0, 240, 255, ${drop.opacity})`;
          context.beginPath();
          context.moveTo(drop.x, drop.y);
          context.lineTo(drop.x - 2, drop.y + drop.length);
          context.stroke();
          drop.y += drop.speed;
          if (drop.y > window.innerHeight + drop.length) {
            drop.y = -drop.length;
            drop.x = Math.random() * window.innerWidth;
          }
        }
      }
      frame = window.requestAnimationFrame(draw);
    };

    const visibility = () => { hidden = document.hidden; };
    resize();
    draw();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />;
}
