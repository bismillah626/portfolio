"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { profile } from "@/data/portfolio";
import { ArrowUpRight, GithubIcon, LinkedinIcon, Reveal, SectionHeading } from "@/components/ui";

function PigeonIcon() {
  return <svg viewBox="0 0 80 52" fill="none" aria-hidden="true"><path d="M8 37c10-12 13-26 29-28 10-1 20 4 27 13l8-4-4 9 5 6H52c-8 13-31 16-44 4Z" stroke="currentColor" strokeWidth="2" /><circle cx="54" cy="19" r="2" fill="currentColor" /><path d="M19 36c6-2 11-9 14-17m-10 23 2 6m7-6 2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
}

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Portfolio transmission from ${form.get("name") ?? "a visitor"}`);
    const body = encodeURIComponent(`Name: ${form.get("name") ?? ""}\nEmail: ${form.get("email") ?? ""}\n\n${form.get("message") ?? ""}`);
    setSent(true);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <main className="page-main">
      <SectionHeading eyebrow="Contact" japanese="連絡" title="Send a transmission." description="Email, LinkedIn, carrier pigeon — the channel is up. For the form below, this portfolio uses a mailto fallback and opens your local email client." />
      <div className="contact-grid">
        <Reveal className="hud-card contact-panel">
          <div className="contact-panel-top mono"><span>DIRECT CHANNELS</span><span>OPEN</span></div>
          <div className="contact-pigeon"><PigeonIcon /></div>
          <p className="contact-lead">Have a role, a system to untangle, or an interesting AI/ML problem?</p>
          <div className="contact-links">
            <Link href={`mailto:${profile.email}`} className="contact-link"><span className="contact-link-icon">@</span><span><small className="mono">EMAIL</small><strong>{profile.email}</strong></span><ArrowUpRight /></Link>
            <Link href={profile.github} target="_blank" rel="noopener noreferrer" className="contact-link"><span className="contact-link-icon"><GithubIcon /></span><span><small className="mono">GITHUB</small><strong>bismillah626</strong></span><ArrowUpRight /></Link>
            <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link"><span className="contact-link-icon"><LinkedinIcon /></span><span><small className="mono">LINKEDIN</small><strong>Bismillah Khan</strong></span><ArrowUpRight /></Link>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="hud-card contact-form-panel">
          <div className="contact-panel-top mono"><span>&gt; SEND TRANSMISSION</span><span>MAILTO / FALLBACK</span></div>
          {sent ? <div className="form-success"><span className="form-success-mark">✓</span><p className="mono">TRANSMISSION QUEUED</p><h2 className="display">Check your<br /><span className="text-gradient">mail client.</span></h2><p>The form prepared a new message addressed to {profile.email}.</p></div> : <form onSubmit={handleSubmit} className="terminal-form"><label htmlFor="name" className="mono">NAME <span>*</span></label><input id="name" name="name" className="input-terminal" required placeholder="Your name" /><label htmlFor="email" className="mono">EMAIL <span>*</span></label><input id="email" name="email" type="email" className="input-terminal" required placeholder="you@example.com" /><label htmlFor="message" className="mono">MESSAGE <span>*</span></label><textarea id="message" name="message" className="input-terminal" required rows={6} placeholder="Write your message..." /><button type="submit" className="button-primary">Transmit <ArrowUpRight /></button></form>}
        </Reveal>
      </div>
    </main>
  );
}
