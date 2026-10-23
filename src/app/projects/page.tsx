"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { projects, type Project, type ProjectCategory } from "@/data/portfolio";
import { ArrowRight, ArrowUpRight, Chip, Reveal, SectionHeading } from "@/components/ui";

const filters: ("ALL" | ProjectCategory)[] = ["ALL", "LLM & Agents", "ML", "NLP"];

function ArchitectureDiagram({ project }: { project: Project }) {
  return (
    <svg className="architecture-diagram" viewBox="0 0 720 170" role="img" aria-label={`Architecture flow for ${project.title}`}>
      <defs><linearGradient id="diagram-gradient" x1="0" x2="1"><stop stopColor="var(--cyan)" /><stop offset=".55" stopColor="var(--violet)" /><stop offset="1" stopColor="var(--magenta)" /></linearGradient></defs>
      <path d="M30 85H690" stroke="url(#diagram-gradient)" strokeWidth="1" strokeDasharray="5 6" opacity=".7" />
      {project.architecture.map((item, index) => {
        const x = 64 + index * (592 / Math.max(project.architecture.length - 1, 1));
        return <g key={item}><rect x={x - 54} y="57" width="108" height="56" fill="var(--panel-2)" stroke={index % 2 ? "var(--magenta)" : "var(--cyan)"} strokeWidth="1" /><circle cx={x} cy="85" r="4" fill={index % 2 ? "var(--magenta)" : "var(--cyan)"} /><text x={x} y="133" textAnchor="middle" fill="var(--muted)" fontFamily="var(--font-jetbrains)" fontSize="9">{item.length > 18 ? `${item.slice(0, 16)}…` : item}</text></g>;
      })}
    </svg>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const trigger = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; trigger?.focus(); };
  }, []);

  return (
      <dialog
        ref={dialogRef}
        className="mission-modal hud-card"
        aria-labelledby="mission-title"
        onCancel={(event) => { event.preventDefault(); onClose(); }}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not(:disabled)");
          const first = controls[0], last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
        }}
      >
        <div className="mission-modal-top mono"><span>MISSION BRIEFING / {project.number}</span><button type="button" onClick={onClose} aria-label="Close mission briefing">×</button></div>
        <h2 id="mission-title" className="display text-gradient">{project.title}</h2>
        <p className="mission-category mono">{project.category} {"//"} {project.metric}</p>
        <ArchitectureDiagram project={project} />
        <ol className="architecture-steps mono">{project.architecture.map((step) => <li key={step}>{step}</li>)}</ol>
        <div className="mission-columns">
          <div><p className="mono mission-label">PROBLEM</p><p>{project.problem}</p></div>
          <div><p className="mono mission-label">MY ROLE</p><p>{project.role}</p></div>
        </div>
        <div className="mission-block"><p className="mono mission-label">RESULTS</p><ul>{project.results.map((result) => <li key={result}>{result}</li>)}</ul></div>
        <div className="mission-actions"><Link href={project.github} target="_blank" rel="noopener noreferrer" className="button-primary">GitHub <ArrowUpRight /></Link>{project.live && <Link href={project.live} target="_blank" rel="noopener noreferrer" className="button-secondary">Live link <ArrowUpRight /></Link>}<button type="button" className="button-secondary" onClick={onClose}>Close <ArrowRight /></button></div>
      </dialog>
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
          <Reveal id={project.id} key={project.id} delay={index * 0.06} className="project-card hud-card hud-card-hover">
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
