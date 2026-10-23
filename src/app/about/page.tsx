import { focusAreas, languages, profile } from "@/data/portfolio";
import { Chip, Reveal, SectionHeading } from "@/components/ui";

function AvatarGlyph() {
  return (
    <svg className="avatar-glyph" viewBox="0 0 320 360" fill="none" role="img" aria-label="Abstract geometric avatar of Bismillah Khan">
      <path d="M160 25 288 98v145l-128 73-128-73V98L160 25Z" stroke="currentColor" strokeWidth="1" opacity=".34" />
      <path d="m160 50 106 61v119l-106 59-106-59V111L160 50Z" stroke="var(--cyan)" strokeWidth="1" opacity=".52" />
      <path d="M160 78 237 122v76l-77 44-77-44v-76l77-44Z" fill="color-mix(in srgb, var(--violet) 12%, transparent)" stroke="var(--magenta)" strokeWidth="1" />
      <path d="M115 158h30m30 0h30M143 196h34" stroke="var(--cyan)" strokeWidth="5" strokeLinecap="round" />
      <path d="M129 143c-13 0-24 9-24 21s11 21 24 21 24-9 24-21-11-21-24-21Zm62 0c-13 0-24 9-24 21s11 21 24 21 24-9 24-21-11-21-24-21Z" stroke="var(--text)" strokeWidth="2" />
      <circle cx="137" cy="163" r="5" fill="var(--cyan)" /><circle cx="183" cy="163" r="5" fill="var(--magenta)" />
      <path d="m160 78 0-28m-77 72-25-14m159 14 25-14m-82 164v38" stroke="var(--acid)" strokeWidth="1" strokeDasharray="4 6" />
      <path d="M94 296h132M72 316h176" stroke="currentColor" strokeWidth="1" opacity=".35" />
      <text x="160" y="340" textAnchor="middle" fill="currentColor" fontFamily="var(--font-jetbrains)" fontSize="10" letterSpacing="3">ORIGINAL / SVG</text>
    </svg>
  );
}

export default function AboutPage() {
  return (
    <main className="page-main">
      <SectionHeading eyebrow="About" japanese="自己紹介" title="The engineer behind the signal." description="AI/ML Engineer and B.Tech CSE student at IIIT Bhubaneswar, focused on building modular systems that move from idea to working interface." />
      <div className="about-grid">
        <Reveal className="hud-card avatar-panel">
          <div className="avatar-panel-top mono"><span>PROFILE / 001</span><span>● VERIFIED</span></div>
          <AvatarGlyph />
          <div className="avatar-panel-footer"><span className="mono">BISMILLAH KHAN</span><span className="mono">AI / ML</span></div>
        </Reveal>
        <div className="about-copy">
          <Reveal className="hud-card about-intro">
            <p className="mono about-intro-label">&gt; IDENTITY SUMMARY</p>
            <p className="about-lead">I build intelligent systems with a bias toward clean architecture, useful interfaces, and a clear path from data to deployment.</p>
            <p>My current focus spans large language models, NLP pipelines, retrieval-augmented generation, agentic AI, and applied machine learning.</p>
          </Reveal>
          <Reveal delay={0.08} className="hud-card stats-panel">
            <div className="stats-heading"><span className="mono">PLAYER STATS</span><span className="mono">READ ONLY</span></div>
            <div className="stats-grid">
              <div><span className="mono">DEGREE</span><strong>{profile.degree}</strong></div>
              <div><span className="mono">COLLEGE</span><strong>{profile.college}</strong></div>
              <div><span className="mono">CGPA</span><strong>{profile.cgpa}</strong></div>
              <div><span className="mono">TIMELINE</span><strong>{profile.graduation}</strong></div>
            </div>
            <div className="stats-wide"><span className="mono">FOCUS AREAS</span><div className="chip-row">{focusAreas.map((area) => <Chip key={area}>{area}</Chip>)}</div></div>
            <div className="stats-wide"><span className="mono">LANGUAGES</span><div className="chip-row">{languages.map((language) => <Chip key={language}>{language}</Chip>)}</div></div>
          </Reveal>
        </div>
      </div>
      <div className="section-divider" />
      <Reveal className="timeline-section">
        <p className="hud-label"><span>Education</span><span className="jp">/ 学歴</span></p>
        <div className="timeline">
          <div className="timeline-node" />
          <div className="timeline-line" />
          <div className="timeline-card hud-card">
            <span className="mono timeline-date">2023 — 2027</span>
            <h2 className="display">B.Tech CSE</h2>
            <p>{profile.college}</p>
            <span className="status-tag">CGPA {profile.cgpa}</span>
          </div>
        </div>
      </Reveal>
    </main>
  );
}
