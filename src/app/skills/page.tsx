"use client";

import Link from "next/link";
import { useState } from "react";
import { projects, skillGroups, type Project } from "@/data/portfolio";
import { ArrowRight, SectionHeading } from "@/components/ui";
import styles from "./SkillsExplorer.module.css";

type Evidence = { source: string; excerpt: string };

function getEvidence(skill: string, project: Project): Evidence | undefined {
  const tag = project.tags.find((item) => item.toLowerCase() === skill.toLowerCase());
  if (tag) return { source: "Project tag", excerpt: tag };

  // Only explicit mentions count. These two aliases reflect the actual project
  // wording; retrieval alone does not establish RAG, nor does PostgreSQL MySQL.
  const terms = skill === "LLMs" ? ["LLM", "LLMs"]
    : skill === "Agentic AI" ? ["multi-agent", "agentic"] : [skill];
  const mentions = terms.map((term) => new RegExp(
    `(?:^|[^a-z0-9])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?=$|[^a-z0-9])`, "i",
  ));
  const notes: Evidence[] = [
    ...project.architecture.map((excerpt) => ({ source: "Architecture", excerpt })),
    { source: "Summary", excerpt: project.summary },
    { source: "Problem", excerpt: project.problem },
    ...project.results.map((excerpt) => ({ source: "Results", excerpt })),
    { source: "Role", excerpt: project.role },
  ];
  // Titles, URLs, and group.projects are deliberately not evidence of tool use.
  return notes.find(({ excerpt }) => mentions.some((mention) => mention.test(excerpt)));
}

const skills = skillGroups.flatMap((group) => group.skills.map((name) => ({
  name,
  group,
  connections: projects.flatMap((project) => {
    const evidence = getEvidence(name, project);
    return evidence ? [{ project, evidence }] : [];
  }),
})));

function ConnectionDrawing({ selected }: { selected: (typeof skills)[number] }) {
  return (
    <svg className={styles.connections} viewBox="0 0 400 96" aria-hidden="true" focusable="false" data-testid="skill-connections">
      <path className={styles.sourceLine} d="M18 48H108" />
      <circle className={styles.sourceNode} cx="18" cy="48" r="7" />
      <path className={styles.junction} d="m108 41 7 7-7 7-7-7Z" />
      {projects.map((project, index) => {
        const connected = selected.connections.some((item) => item.project.id === project.id);
        const y = 12 + index * 24;
        const path = `M115 48C210 48 230 ${y} 356 ${y}`;
        return (
          <g key={project.id} className={styles.branch} data-connected={connected}>
            <path className={styles.connectionTrack} d={path} />
            {connected && <path key={selected.name} className={styles.connectionFlow} d={path} pathLength="100" data-flow="active" />}
            <circle className={styles.projectNode} cx="356" cy={y} r="4" />
            <text x="373" y={y + 3}>{project.number}</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function SkillsPage() {
  const [activeSkill, setActiveSkill] = useState(skills[0].name);
  const [announcement, setAnnouncement] = useState("");
  const selected = skills.find((skill) => skill.name === activeSkill)!;
  const count = selected.connections.length;

  function selectSkill(name: string) {
    if (name === activeSkill) return;
    const next = skills.find((skill) => skill.name === name)!;
    setActiveSkill(name);
    setAnnouncement(`${name}: ${next.connections.length} recorded project${next.connections.length === 1 ? "" : "s"}.`);
  }

  return (
    <main className="page-main">
      <SectionHeading
        eyebrow="Skills"
        japanese="技術"
        title="The stack, mapped."
        description="From a tool to the system it helped build. Choose a group, select a skill, and follow the recorded connections into the projects."
      />
      <section className={styles.explorer} aria-label="Skill-to-project explorer">
        <div className={styles.indexHeading}>
          <p>FIELD NOTES / {String(skills.length).padStart(2, "0")} SKILLS</p>
          <span>TOOLS <span aria-hidden="true">→</span> BUILT SYSTEMS</span>
        </div>
        <div className={styles.groupControls} role="group" aria-label="Skill groups">
          {skillGroups.map((group) => (
            <button
              key={group.name}
              type="button"
              className={styles.groupButton}
              aria-pressed={selected.group.name === group.name}
              aria-controls="skill-tools"
              onClick={() => { if (selected.group.name !== group.name) selectSkill(group.skills[0]); }}
            >
              <span className={styles.groupCode} aria-hidden="true">{group.code}</span>
              <span className={styles.groupName}>{group.name}</span>
              <span className={styles.groupMark} aria-hidden="true">{selected.group.name === group.name ? "−" : "+"}</span>
            </button>
          ))}
        </div>
        <div className={styles.layout}>
          <section className={styles.toolIndex} aria-labelledby="skill-tools-title">
            <p className={styles.eyebrow}>01 / Select a skill</p>
            <h2 id="skill-tools-title" className={styles.groupTitle}>{selected.group.name}</h2>
            <p id="skill-count-help" className={styles.help}>The number beside each skill counts its recorded projects.</p>
            <div id="skill-tools" className={styles.tools} role="group" aria-label={`${selected.group.name} skills`} aria-describedby="skill-count-help">
              {skills.filter((skill) => skill.group === selected.group).map((skill) => (
                <button
                  type="button"
                  key={skill.name}
                  className={styles.skillButton}
                  aria-pressed={activeSkill === skill.name}
                  aria-controls="skill-projects"
                  onClick={() => selectSkill(skill.name)}
                >
                  <span className={styles.skillMark} aria-hidden="true">{activeSkill === skill.name ? "✓" : "+"}</span>
                  <span>{skill.name}</span>
                  <span className={styles.skillCount} aria-hidden="true">{skill.connections.length}</span>
                </button>
              ))}
            </div>
            <div className={styles.selectionSummary}>
              <p className={styles.eyebrow}>Selected skill</p>
              <p className={styles.selectedName}>{activeSkill}</p>
              <a
                href="#skill-projects"
                className={styles.resultJump}
                onClick={(event) => {
                  // The shared root pause also applies to this in-page jump.
                  if (document.documentElement.dataset.motion !== "paused") return;
                  event.preventDefault();
                  const target = document.getElementById("skill-projects");
                  target?.focus({ preventScroll: true });
                  target?.scrollIntoView({ behavior: "instant", block: "start" });
                }}
              >
                {count ? `View ${count} project${count === 1 ? "" : "s"}` : "View evidence note"}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
            <p className={styles.indexNote}>A working toolkit, not a proficiency chart. Connections come from individual project notes, not group membership.</p>
          </section>
          <section id="skill-projects" className={styles.detail} aria-labelledby="skill-detail-title" tabIndex={-1}>
            <div className={styles.detailTop}>
              <p className={styles.eyebrow}>02 / Follow the connection</p>
              <span className={styles.recordCount}>{count} recorded project{count === 1 ? "" : "s"}</span>
            </div>
            <h2 id="skill-detail-title" className={styles.skillTitle}>{activeSkill}</h2>
            <div className={styles.connectionPlate}>
              <ConnectionDrawing selected={selected} />
              <p>SELECTED TOOL <span aria-hidden="true">→</span> PROJECT RECORDS / 01–04</p>
            </div>
            <div className={styles.results}>
              {count ? (
                <ul className={styles.projectList} aria-label={`Projects with recorded ${activeSkill} evidence`}>
                  {selected.connections.map(({ project, evidence }) => (
                    <li key={project.id} className={styles.projectCard}>
                      <div className={styles.projectMeta}><span>{project.number} / {project.category}</span><ArrowRight /></div>
                      <h3>
                        <Link href={`/projects#${project.id}`} className={styles.projectLink} aria-label={`View ${project.title} project`}>
                          {project.title}
                        </Link>
                      </h3>
                      <p className={styles.evidence}><span>{evidence.source}</span> {evidence.excerpt}</p>
                      <span className={styles.openProject} aria-hidden="true">Open project <span>↗</span></span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.emptyState}>
                  <span className={styles.emptyMark} aria-hidden="true">—</span>
                  <h3>No recorded project</h3>
                  <p>{activeSkill} is listed in {selected.group.name}, but the current project tags and notes do not name it.</p>
                  <p>This is an evidence gap, not a proficiency rating. Select another skill to explore its documented connections.</p>
                </div>
              )}
            </div>
            <p className={styles.evidenceNote}>Each connection includes its source: a project tag or an excerpt from the build notes.</p>
          </section>
        </div>
        <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</p>
      </section>
    </main>
  );
}
