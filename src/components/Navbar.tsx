"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  ["/", "Home"],
  ["/about", "About"],
  ["/projects", "Projects"],
  ["/skills", "Skills"],
  ["/contact", "Contact"],
] as const;

function LogoMark() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" aria-hidden="true">
      <path d="M2 2h14v4H7v9h8v4H7v11h9v4H2V2Z" fill="currentColor" />
      <path d="M20 2h5.5L36 13.5 27.5 21 36 34h-5.8l-7.2-10.5-3 2.6V34H16V2h4v18l8-7L20 6V2Z" fill="currentColor" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const background = document.querySelectorAll<HTMLElement>("#content, .site-footer, .chat-widget");
    background.forEach((element) => { element.inert = true; });
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => headerRef.current?.querySelector<HTMLElement>(".mobile-nav-link")?.focus(), 300);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const controls = Array.from(headerRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []).filter((element) => element.offsetParent !== null && element.tabIndex >= 0);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    const onResize = () => { if (window.innerWidth > 767) setOpen(false); };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => { window.clearTimeout(focusTimer); background.forEach((element) => { element.inert = false; }); document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); trigger?.focus(); };
  }, [open]);

  return (
    <header ref={headerRef} className="site-nav">
      <div className="site-nav-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark"><LogoMark /></span>
          <span>
            <strong className="display brand-name">BK</strong>
            <span className="mono brand-subtitle">AI / ML ENGINEER</span>
            <span className="sr-only"> — Bismillah Khan home</span>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([href, label]) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} className={`nav-link ${pathname === href ? "is-active" : ""}`}>
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <button
            type="button"
            className={`menu-button ${open ? "is-open" : ""}`}
            onClick={() => setOpen((current) => !current)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? "is-open" : ""}`} id="mobile-navigation" aria-hidden={!open}>
        <nav aria-label="Mobile navigation">
          <p className="mono mobile-menu-kicker">{"// NAVIGATE / SYSTEM MAP"}</p>
          {navItems.map(([href, label], index) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              className={`mobile-nav-link ${pathname === href ? "is-active" : ""}`}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ "--item-index": index } as React.CSSProperties}
            >
              <span className="mono">0{index + 1}</span>
              <span className="display">{label}</span>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
