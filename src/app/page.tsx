import Link from "next/link";
import BootSequence from "@/components/BootSequence";
import HomeHero from "@/components/HomeHero";
import ProjectCover from "@/components/ProjectCover";
import { Chip, Reveal, ArrowUpRight } from "@/components/ui";
import { projects } from "@/data/portfolio";

const quickSkills = ["Python", "LLMs", "NLP", "ML", "RAG", "Agentic AI", "FastAPI", "PyTorch"];

export default function Home() {
  return (
    <>
      <BootSequence />
      <main className="page-main home-page">
        <HomeHero />
        <div className="skill-ticker" role="img" aria-label={`Tools and focus: ${quickSkills.join(", ")}`}>
          <div className="ticker-track" aria-hidden="true">
            {[0, 1].map((copy) => <div className="ticker-copy" key={copy}>{quickSkills.map((skill) => <span key={skill}>{skill}<i>✳</i></span>)}</div>)}
          </div>
        </div>
        <section className="selected-work" id="selected-work" aria-labelledby="work-heading">
          <div className="work-header">
            <div><p className="hud-label">Selected work <span className="jp" lang="ja">/ 作品</span></p><h2 className="display" id="work-heading">Ideas into<br /><span className="editorial-serif">intelligence.</span></h2></div>
            <div className="work-intro"><p>Three ways of turning complex problems into systems that work.</p><Link href="/projects" className="text-link">All projects <ArrowUpRight /></Link></div>
          </div>
          <div className="work-grid">
            {projects.slice(0, 3).map((project, index) => (
              <Reveal key={project.id} delay={index * .06} className="work-card">
                <Link className="work-cover-link" href={`/projects#${project.id}`}><span className="sr-only">Explore {project.title}</span><ProjectCover id={project.id} number={project.number} /><span className="cover-arrow"><ArrowUpRight size={24} /></span></Link>
                <div className="work-card-meta mono"><span>{project.category}</span><span>{project.metric}</span></div>
                <h3 className="display"><Link href={`/projects#${project.id}`}>{project.title}</Link></h3>
                <p>{project.summary}</p>
                <div className="chip-row">{project.tags.slice(0, 3).map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
              </Reveal>
            ))}
          </div>
        </section>
        <Reveal className="editorial-note">
          <div className="note-index mono"><span>BEYOND THE CODE</span><span>02 / 自己紹介</span></div>
          <h2>Curiosity is the input.<br /><span className="editorial-serif">Building is the output.</span></h2>
          <div className="note-bottom"><p>B.Tech CSE at IIIT Bhubaneswar.<br />Working across LLMs, NLP, and applied machine learning.</p><Link href="/about" className="button-secondary">A little about me <ArrowUpRight /></Link></div>
        </Reveal>
        <section className="home-contact" aria-labelledby="connect-heading"><p className="hud-label">Have something in mind? <span className="jp" lang="ja">/ 連絡</span></p><Link href="/contact"><h2 className="display" id="connect-heading">Let’s make<br /><span>contact.</span></h2><ArrowUpRight size={80} /></Link><p>AI/ML roles, interesting problems, or a simple hello.</p></section>
      </main>
    </>
  );
}
