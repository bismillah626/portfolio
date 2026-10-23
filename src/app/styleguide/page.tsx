import type { Metadata } from "next";
import { Chip, HudFrame, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  return (
    <main className="page-main styleguide-page">
      <SectionHeading eyebrow="Styleguide" japanese="設計" title="Design system / live tokens." description="A temporary reference page for the cyberpunk terminal system. It is marked noindex and can be removed before launch." />
      <div className="styleguide-grid">
        <HudFrame><p className="mono styleguide-label">COLOR TOKENS</p><div className="token-grid">{[["--void", "#05060F"], ["--panel", "#0B0F24"], ["--cyan", "#00F0FF"], ["--magenta", "#FF2E9A"], ["--violet", "#8B5CFF"], ["--acid", "#F7FF3C"]].map(([name, value]) => <div key={name} className="token"><span style={{ background: value }} /><span className="mono">{name}</span><small className="mono">{value}</small></div>)}</div></HudFrame>
        <HudFrame><p className="mono styleguide-label">COMPONENTS</p><div className="styleguide-components"><span className="status-tag">System online</span><div><Chip>Python</Chip><Chip active>Active filter</Chip></div><div><button type="button" className="button-primary">Primary</button> <button type="button" className="button-secondary">Secondary</button></div></div></HudFrame>
      </div>
    </main>
  );
}
