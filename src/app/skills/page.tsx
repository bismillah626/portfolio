"use client";

import { useState } from "react";
import { skillGroups } from "@/data/portfolio";
import { Chip, Reveal, SectionHeading } from "@/components/ui";

export default function SkillsPage() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const relatedProjects = skillGroups.find((group) => group.skills.includes(activeSkill ?? ""))?.projects ?? [];

  return (
    <main className="page-main">
      <SectionHeading eyebrow="Skills" japanese="技術" title="The stack, mapped." description="A constellation of tools and focus areas. Select a node to see where it appears in the build log." />
      <div className="skills-layout">
        <div className="skill-constellation" aria-label="Interactive skill constellation">
          <div className="constellation-lines" aria-hidden="true"><span /><span /><span /><span /></div>
          {skillGroups.map((group, groupIndex) => (
            <Reveal key={group.name} delay={groupIndex * 0.08} className={`skill-cluster cluster-${groupIndex + 1}`}>
              <div className="skill-cluster-header"><span className="mono">{group.code}</span><strong className="display">{group.name}</strong></div>
              <div className="skill-node-list">{group.skills.map((skill) => <button type="button" key={skill} className={`skill-node ${activeSkill === skill ? "is-active" : ""}`} onMouseEnter={() => setActiveSkill(skill)} onFocus={() => setActiveSkill(skill)} onClick={() => setActiveSkill(skill)}>{skill}</button>)}</div>
            </Reveal>
          ))}
        </div>
        <Reveal className="hud-card skill-detail">
          <div className="preview-card-top mono"><span>NODE DETAILS</span><span>{activeSkill ? "SELECTED" : "AWAITING INPUT"}</span></div>
          {activeSkill ? <><p className="skill-detail-label mono">SKILL / {activeSkill.toUpperCase()}</p><h2 className="display text-gradient">{activeSkill}</h2><p className="skill-detail-copy">This node is part of the {skillGroups.find((group) => group.skills.includes(activeSkill))?.name} cluster.</p><p className="skill-detail-label mono">RELATED PROJECTS</p><div className="chip-row">{relatedProjects.map((project) => <Chip key={project}>{project}</Chip>)}</div></> : <><p className="skill-detail-label mono">&gt; HOVER OR TAB INTO A NODE</p><h2 className="display">Explore the<br /><span className="text-gradient">constellation.</span></h2><p className="skill-detail-copy">Skills are grouped by the kind of system they help ship, not by an invented proficiency score.</p></>}
        </Reveal>
      </div>
      <div className="skill-list-fallback" aria-label="Skills list">
        {skillGroups.map((group) => <Reveal key={group.name} className="hud-card fallback-group"><p className="mono skill-detail-label">{group.code}</p><h2 className="display">{group.name}</h2><div className="chip-row">{group.skills.map((skill) => <Chip key={skill}>{skill}</Chip>)}</div></Reveal>)}
      </div>
    </main>
  );
}
