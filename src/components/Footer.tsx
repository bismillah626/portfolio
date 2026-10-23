import Link from "next/link";
import { profile } from "@/data/portfolio";

function GithubIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5a5.4 5.4 0 0 0-1-3.5c.3-1.2.3-2.4 0-3.5 0 0-1 0-3 1.5-2.6-.5-5.4-.5-8 0C5 2 3 2 3 2c-.3 1.1-.3 2.3 0 3.5A5.4 5.4 0 0 0 2 9c0 3.5 3 5.5 6 5.5-.7.8-1 1.8-1 3.5v4" /><path d="M9 18c-4.5 2-5-2-7-2" /></svg>;
}

function LinkedinIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>;
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p className="mono footer-copy">Designed with care, © 2026 Bismillah Khan</p>
        <div className="footer-right">
          <span className="status-tag">System online</span>
          <div className="footer-socials">
            <Link href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="footer-icon"><GithubIcon /></Link>
            <Link href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="footer-icon"><LinkedinIcon /></Link>
            <Link href={`mailto:${profile.email}`} aria-label="Email Bismillah Khan" className="footer-icon">@</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
