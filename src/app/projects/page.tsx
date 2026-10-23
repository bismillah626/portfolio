"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { projects, type Project, type ProjectCategory } from "@/data/portfolio";
import { ArrowRight, ArrowUpRight, Chip, Reveal, SectionHeading } from "@/components/ui";

const filters: ("ALL" | ProjectCategory)[] = ["ALL", "LLM & Agents", "ML", "NLP"];

function ArchitectureDiagram({ project }: { project: Project }) {
  return (
    <svg className="architecture-diagram" viewBox="0 0 720 170" role="img" aria-label={`Architecture flow for ${project.title}`}>
      <defs><linearGradient id="diagram-gradient" x1="0" x2="1"><stop stopColor="var(--cyan)" /><stop offset=".55" stopColor="var(--violet)" /><stop offset="1" stopColor="var(--magenta)" /></linearGradient></defs>
      <path d="M30 85H690" stroke="url(#diagram-gradient)" strokeWidth="1" strokeDasharray="5 6" opacity=".7" />
      {project.architecture.map((item, index) => {
        const x = 26 + index * (650 / Math.max(project.architecture.length - 1, 1));
        return <g key={item}><rect x={x - 54} y="57" width="108" height="56" fill="var(--panel-2)" stroke={index % 2 ? "var(--magenta)" : "var(--cyan)"} strokeWidth="1" /><circle cx={x} cy="85" r="4" fill={index % 2 ? "var(--magenta)" : "var(--cyan)"} /><text x={x} y="133" textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-jetbrains)" fontSize="9">{item.length > 18 ? `${item.slice(0, 16)}…` : item}</text></g>;
      })}
    </svg>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="mission-modal hud-card" role="dialog" aria-modal="true" aria-labelledby="mission-title">
        <div className="mission-modal-top mono"><span>MISSION BRIEFING / {project.number}</span><button type="button" onClick={onClose} aria-label="Close mission briefing">×</button></div>
        <h2 id="mission-title" className="display text-gradient">{project.title}</h2>
        <p className="mission-category mono">{project.category} {"//"} {project.metric}</p>
        <ArchitectureDiagram project={project} />
        <div className="mission-columns">
          <div><p className="mono mission-label">PROBLEM</p><p>{project.problem}</p></div>
          <div><p className="mono mission-label">MY ROLE</p><p>{project.role}</p></div>
        </div>
        <div className="mission-block"><p className="mono mission-label">RESULTS</p><ul>{project.results.map((result) => <li key={result}>{result}</li>)}</ul></div>
        <div className="mission-actions"><Link href={project.github} target="_blank" rel="noopener noreferrer" className="button-primary">GitHub <ArrowUpRight /></Link>{project.live && <Link href={project.live} target="_blank" rel="noopener noreferrer" className="button-secondary">Live link <ArrowUpRight /></Link>}<button type="button" className="button-secondary" onClick={onClose}>Close <ArrowRight /></button></div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("ALL");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const visibleProjects = activeFilter === "ALL" ? projects : projects.filter((project) => project.category === activeFilter);

  return (
    <main className="page-main">
      <SectionHeading eyebrow="Projects" japanese="作品" title="Systems with a signal." description="A focused set of AI/ML builds, from agentic DevSecOps review to explainable prediction and voice interaction." />
      <div className="filter-row" aria-label="Project filters">{filters.map((filter) => <Chip key={filter} active={activeFilter === filter} onClick={() => setActiveFilter(filter)}>{filter}</Chip>)}</div>
      <div className="project-grid">
        {visibleProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.06} className="project-card hud-card hud-card-hover scanline-once">
            <div className="project-card-top mono"><span className="project-number">{project.number}</span><span>{project.category}</span></div>
            <h2 className="display">{project.title}</h2>
            <p className="project-summary">{project.summary}</p>
            <div className="project-metric"><span className="mono">KEY METRIC</span><strong>{project.metric}</strong></div>
            <div className="chip-row">{project.tags.map((tag) => <Chip key={tag}>{tag}</Chip>)}</div>
            <div className="project-card-actions"><button type="button" className="button-secondary" onClick={() => setSelectedProject(project)}>Briefing <ArrowRight /></button><Link href={project.github} target="_blank" rel="noopener noreferrer" className="project-github" aria-label={`Open ${project.title} GitHub link`}>GitHub <ArrowUpRight /></Link></div>
          </Reveal>
        ))}
      </div>
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </main>
  );
}
