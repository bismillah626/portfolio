import Link from "next/link";
import BootSequence from "@/components/BootSequence";
import HomeHero from "@/components/HomeHero";
import { Chip, Reveal, SectionHeading, ArrowUpRight } from "@/components/ui";
import { projects, skillGroups } from "@/data/portfolio";

export default function Home() {
  return (
    <>
      <BootSequence />
      <main className="page-main">
        <HomeHero />
        <section className="home-preview">
          <SectionHeading eyebrow="Signal preview" japanese="概要" title="A focused build log." description="A quick read on the systems, tools, and engineering questions behind the work." as="h2" />
          <div className="preview-projects">
            {projects.slice(0, 3).map((project, index) => (
              <Reveal key={project.id} delay={index * 0.08} className="preview-card hud-card hud-card-hover scanline-once">
                <div className="preview-card-top mono"><span>{project.number}</span><span>{project.category}</span></div>
                <h3 className="display">{project.title}</h3>
                <p>{project.summary}</p>
                <div className="chip-row">{project.tags.slice(0, 3).map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
                <Link href="/projects" className="text-link">Mission briefing <ArrowUpRight /></Link>
              </Reveal>
            ))}
          </div>
          <div className="preview-lower">
            <Reveal className="hud-card skills-marquee-card">
              <div className="preview-card-top mono"><span>STACK / QUICK READ</span><span>● LIVE</span></div>
              <div className="skills-marquee" aria-label="Quick skills">
                {["Python", "LLMs", "NLP", "ML", "RAG", "Agentic AI", "FastAPI", "PyTorch"].map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </Reveal>
            <Reveal delay={0.1} className="hud-card preview-callout">
              <span className="mono preview-callout-number">04 / 05</span>
              <h3 className="display">Read the full<br /><span className="text-gradient">system map.</span></h3>
              <Link href="/about" className="button-secondary">About the engineer <ArrowUpRight /></Link>
            </Reveal>
          </div>
        </section>
        <div className="home-terminal-line mono"><span>READY FOR TRANSMISSION</span><span>{skillGroups.length} skill clusters indexed</span></div>
      </main>
    </>
  );
}
