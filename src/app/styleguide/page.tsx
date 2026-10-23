import type { Metadata } from "next";
import { Chip, HudFrame, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  return (
    <main className="page-main styleguide-page">
      <SectionHeading eyebrow="Styleguide" japanese="設計" title="Vermilion / Ink." description="An editorial system of warm paper, deep red, charcoal, and celadon. This reference is marked noindex." />
      <div className="styleguide-grid">
        <HudFrame><p className="mono styleguide-label">LIVE COLOR TOKENS</p><div className="token-grid">{["--void", "--panel", "--paper", "--accent", "--oxblood", "--sage"].map((name) => <div key={name} className="token"><span style={{ background: `var(${name})` }} /><span className="mono">{name}</span><small className="mono">current theme</small></div>)}</div></HudFrame>
        <HudFrame><p className="mono styleguide-label">COMPONENTS</p><div className="styleguide-components"><span className="status-tag">System online</span><div><Chip>Python</Chip><Chip active>Active filter</Chip></div><div><button type="button" className="button-primary">Primary</button> <button type="button" className="button-secondary">Secondary</button></div></div></HudFrame>
      </div>
    </main>
  );
}
