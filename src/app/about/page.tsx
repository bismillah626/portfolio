import { focusAreas, languages, profile } from "@/data/portfolio";
import { Chip, Reveal, SectionHeading } from "@/components/ui";
import ReactiveAvatar from "@/components/ReactiveAvatar";

export default function AboutPage() {
  return (
    <main className="page-main">
      <SectionHeading eyebrow="About" japanese="自己紹介" title="The engineer behind the signal." description="AI/ML Engineer and B.Tech CSE student at IIIT Bhubaneswar, focused on building modular systems that move from idea to working interface." />
      <div className="about-grid">
        <Reveal className="hud-card avatar-panel">
          <div className="avatar-panel-top mono"><span>PROFILE / 001</span><span>HUMAN, MOSTLY.</span></div>
          <ReactiveAvatar />
          <div className="avatar-panel-footer"><span className="mono">BISMILLAH KHAN</span><span className="mono">AI / ML</span></div>
        </Reveal>
        <div className="about-copy">
          <Reveal className="hud-card about-intro">
            <p className="mono about-intro-label">&gt; IDENTITY SUMMARY</p>
            <p className="about-lead">I build intelligent systems with a bias toward clean architecture, useful interfaces, and a clear path from data to deployment.</p>
            <p>My current focus spans large language models, NLP pipelines, retrieval-augmented generation, agentic AI, and applied machine learning.</p>
          </Reveal>
          <Reveal delay={0.08} className="hud-card stats-panel">
            <div className="stats-heading"><span className="mono">THE SHORT VERSION</span><span className="mono">ALWAYS LEARNING</span></div>
            <div className="stats-grid">
              <div><span className="mono">DEGREE</span><strong>{profile.degree}</strong></div>
              <div><span className="mono">TIMELINE</span><strong>{profile.graduation}</strong></div>
              <div><span className="mono">COLLEGE</span><strong>{profile.college}</strong></div>
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
          </div>
        </div>
      </Reveal>
    </main>
  );
}
