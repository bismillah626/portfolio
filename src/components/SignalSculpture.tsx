"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./SignalSculpture.module.css";

type SignalSculptureProps = {
  className?: string;
};

export default function SignalSculpture({ className }: SignalSculptureProps) {
  const sculptureRef = useRef<HTMLDivElement>(null);
  const id = useId();
  const frontFoldId = `${id}-front-fold`;
  const foldClipId = `${id}-fold-clip`;
  const shadeId = `${id}-shade`;

  useEffect(() => {
    const sculpture = sculptureRef.current;
    if (!sculpture) return;

    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let inView = !("IntersectionObserver" in window);
    let active = false;
    let frame = 0;
    let rotateX = 0;
    let rotateY = 0;

    const resetTilt = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      sculpture.style.removeProperty("--signal-rotate-x");
      sculpture.style.removeProperty("--signal-rotate-y");
    };

    const syncMotion = () => {
      active = inView && !document.hidden && !reducedMotion.matches && root.dataset.motion !== "paused";
      sculpture.dataset.active = String(active);
      if (!active || !finePointer.matches) resetTilt();
    };

    const move = (event: PointerEvent) => {
      if (!active || !finePointer.matches || event.pointerType === "touch") return;

      const bounds = sculpture.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - 0.5) * 2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - 0.5) * 2));
      rotateX = -y * 3;
      rotateY = x * 4;

      // Coalesce pointer events; there is no continuously running JS animation.
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        sculpture.style.setProperty("--signal-rotate-x", `${rotateX.toFixed(2)}deg`);
        sculpture.style.setProperty("--signal-rotate-y", `${rotateY.toFixed(2)}deg`);
      });
    };

    const motionObserver = new MutationObserver(syncMotion);
    motionObserver.observe(root, { attributes: true, attributeFilter: ["data-motion"] });

    const visibilityObserver = "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => {
          inView = entry.isIntersecting && entry.intersectionRatio > 0;
          syncMotion();
        })
      : null;

    visibilityObserver?.observe(sculpture);
    reducedMotion.addEventListener("change", syncMotion);
    finePointer.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    window.addEventListener("blur", resetTilt);
    sculpture.addEventListener("pointermove", move, { passive: true });
    sculpture.addEventListener("pointerleave", resetTilt);
    sculpture.addEventListener("pointercancel", resetTilt);
    syncMotion();

    return () => {
      motionObserver.disconnect();
      visibilityObserver?.disconnect();
      reducedMotion.removeEventListener("change", syncMotion);
      finePointer.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
      window.removeEventListener("blur", resetTilt);
      sculpture.removeEventListener("pointermove", move);
      sculpture.removeEventListener("pointerleave", resetTilt);
      sculpture.removeEventListener("pointercancel", resetTilt);
      sculpture.dataset.active = "false";
      resetTilt();
    };
  }, []);

  return (
    <div
      ref={sculptureRef}
      className={[styles.sculpture, className].filter(Boolean).join(" ")}
      data-active="false"
      aria-hidden="true"
    >
      <div className={styles.tilt}>
        <svg
          className={styles.art}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 560"
          width="500"
          height="560"
          fill="none"
          focusable="false"
          aria-hidden="true"
        >
          <defs>
            <path id={frontFoldId} d="M367 247 272 464 259 350 280 245Z" />
            <clipPath id={foldClipId}>
              <use href={`#${frontFoldId}`} />
            </clipPath>
            <linearGradient id={shadeId} x1="280" y1="260" x2="322" y2="410" gradientUnits="userSpaceOnUse">
              <stop stopColor="#24211f" stopOpacity="0" />
              <stop offset="1" stopColor="#24211f" stopOpacity="0.24" />
            </linearGradient>
          </defs>

          {/* Quiet print-registration details stay separate from the floating knot. */}
          <g className={styles.registration} strokeWidth="1" strokeLinecap="square">
            <path d="M28 46V30H44M456 30H472V46M28 490V506H44M456 506H472V490" />
            <path d="M22 116H34M28 110V122M466 422H478M472 416V428" />
            <path d="M247 30H253M250 27V33M247 506H253M250 503V509" />
          </g>
          <path className={styles.accentStroke} d="M450 50H464M464 50V64" strokeWidth="2" />

          {/* A hard-edged, translucent ground shadow keeps the drawing filter-free. */}
          <path d="M119 486 294 477 407 489 232 502Z" fill="#24211f" opacity="0.08" />
          <path d="M177 487 290 483 350 489 237 495Z" fill="#24211f" opacity="0.06" />

          <g className={styles.float}>
            {/* Band 1: the oblique loop, with a warm cut edge and a dark reverse. */}
            <path d="M370 115 429 353 182 437 91 308 91 301 180 430 423 351Z" fill="#9e302f" />
            <path d="M370 115 423 351 180 430 91 301 370 115ZM330 217 174 296 212 363 341 321Z" fill="#24211f" fillRule="evenodd" />
            <path d="M370 115 330 217 174 296 91 301Z" fill="#9e302f" />
            <path d="M370 115 330 217 174 296 111 295Z" fill="#24211f" />
            <path d="M370 115 423 351 341 321 330 217Z" fill="#eee6d6" />
            <path d="M370 115 423 351 396 329Z" fill="#24211f" opacity="0.13" />
            <path d="M370 115 377 127 429 353 423 351Z" fill="#ff816e" />
            <path d="M330 217 341 321 350 326 338 215Z" fill="#9e302f" />
            <path d="M91 301 174 296 212 363 180 430Z" fill="#eee6d6" />
            <path d="M423 351 180 430 212 363 341 321Z" fill="#24211f" />

            {/* Band 2: a tall, tapered fold. Its lower face returns in front. */}
            <path d="M226 59 373 247 276 471 272 464 367 247Z" fill="#9e302f" />
            <path d="M226 59 367 247 272 464 125 263 226 59ZM235 156 205 259 259 350 280 245Z" fill="#24211f" fillRule="evenodd" />
            <path d="M226 59 367 247 280 245 235 156Z" fill="#eee6d6" />
            <path d="M226 59 280 245 235 156Z" fill="#24211f" opacity="0.1" />
            <path d="M226 59 125 263 205 259 235 156Z" fill="#24211f" />
            <path d="M226 59 235 156 205 259 198 260 228 155Z" fill="#ff816e" />
            <path d="M125 263 272 464 259 350 205 259Z" fill="#9e302f" />
            <path d="M125 263 272 464 246 407 192 280Z" fill="#ff816e" />
            <use href={`#${frontFoldId}`} fill="#eee6d6" />
            <path d="M229 67 363 246" stroke="#eee6d6" strokeOpacity="0.6" />

            {/* Band 3: the wide transverse loop crosses over the two rear folds. */}
            <path d="M49 232 272 128 451 251 244 387 49 232ZM146 237 247 309 353 249 263 199Z" fill="#24211f" fillRule="evenodd" />
            <path d="M49 232 272 128 263 199 146 237Z" fill="#eee6d6" />
            <path d="M49 232 263 199 146 237Z" fill="#24211f" opacity="0.14" />
            <path d="M272 128 451 251 353 249 263 199Z" fill="#24211f" />
            <path d="M272 128 451 251 442 252 271 136Z" fill="#ff816e" />
            <path d="M263 199 353 249 344 254 261 207Z" fill="#9e302f" />
            <path d="M49 232 244 387 247 309 146 237Z" fill="#eee6d6" />
            <path d="M49 232 244 387 244 362 105 269Z" fill="#24211f" opacity="0.12" />
            <path d="M49 232 49 240 244 395 244 387Z" fill="#ff816e" />
            <path d="M451 251 244 387 247 309 353 249Z" fill="#24211f" />
            <path d="M451 251 451 259 244 395 244 387Z" fill="#9e302f" />
            <path d="M451 251 244 387 277 354Z" fill="#eee6d6" opacity="0.08" />
            <path d="M56 231 270 131M56 237 240 383" stroke="#eee6d6" strokeOpacity="0.65" />

            {/* The oblique loop reappears over the transverse band: an actual weave. */}
            <path d="M91 301 174 296 212 363 180 430Z" fill="#eee6d6" />
            <path d="M91 301 180 430 183 407 111 303Z" fill="#24211f" opacity="0.16" />
            <path d="M174 296 212 363 225 359 185 296Z" fill="#24211f" opacity="0.22" />
            <path d="M91 301 91 308 182 437 180 430Z" fill="#ff816e" />
            <path d="M423 351 180 430 212 363 341 321Z" fill="#24211f" />
            <path d="M423 351 180 430 182 437 429 353Z" fill="#9e302f" />
            <path d="M423 351 180 430 184 423 413 349Z" fill="#ff816e" />
            <path d="M212 363 341 321 355 326 209 374Z" fill="#eee6d6" opacity="0.09" />

            {/* Front return, clipped contact shadows, and the thin vermilion edge. */}
            <use href={`#${frontFoldId}`} fill="#eee6d6" />
            <use href={`#${frontFoldId}`} fill={`url(#${shadeId})`} />
            <g clipPath={`url(#${foldClipId})`} fill="#24211f">
              <path d="M265 259 356 275 347 295 269 281Z" opacity="0.2" />
              <path d="M259 350 272 464 285 426Z" opacity="0.16" />
            </g>
            <path d="M367 247 272 464 276 471 373 247Z" fill="#ff816e" />
            <path d="M280 245 259 350 264 368 286 249Z" fill="#eee6d6" />
            <path d="M367 247 280 245 284 251 364 254Z" fill="#9e302f" />
            <path d="M363 256 274 458" stroke="#eee6d6" strokeOpacity="0.75" />

            {/* Two short, engraved seams emphasize the material rather than a grid. */}
            <path d="M288 153 316 172M295 152 323 171" stroke="#eee6d6" strokeOpacity="0.35" strokeWidth="0.8" />
            <path d="M204 401 228 393" stroke="#eee6d6" strokeOpacity="0.45" strokeWidth="0.8" />
          </g>

          <path className={styles.rule} d="M28 520H472" strokeWidth="1" />
          <text className={styles.caption} x="28" y="543">
            <tspan className={styles.index}>01</tspan>
            <tspan> / SIGNAL STUDY</tspan>
          </text>
          <g className={styles.scale} strokeWidth="1">
            <path d="M414 540H472M414 536V544M443 538V542M472 536V544" />
          </g>
        </svg>
      </div>
    </div>
  );
}
