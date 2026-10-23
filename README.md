# Bismillah Khan — Portfolio

An original cyberpunk-terminal portfolio for Bismillah Khan, an AI/ML Engineer
and B.Tech CSE student at IIIT Bhubaneswar. It is built with Next.js 16,
React 19, TypeScript, Tailwind CSS 4, and Framer Motion.

Live site: [portfolio-red-xi-76.vercel.app](https://portfolio-red-xi-76.vercel.app/)

## Included

- Five preserved routes: `/`, `/about`, `/projects`, `/skills`, and `/contact`.
- Dark/light neon theme with a pre-hydration theme script and keyboard-accessible toggle.
- Original SVG BK mark and avatar. No third-party anime, game, or film art.
- Reduced-motion handling for boot, rain particles, glitch bursts, scanlines, and large transitions.
- Local LazyGPT chat widget with the existing deterministic keyword behavior and suggested prompts.
- Accessible project filters and mission-briefing modal, responsive skill constellation, and mailto contact fallback.
- Metadata, Open Graph SVG, sitemap, robots, focus rings, semantic labels, and responsive layouts from 360px upward.

## Run locally

Node.js 20.9+ and npm 9+ are recommended (Next.js 16 requires Node 20.9 or newer).

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Design tokens

All visual tokens live at the top of `src/app/globals.css`. Dark mode uses the
Night City Terminal palette; `[data-theme="light"]` overrides it with the
Daylight Neon palette while keeping the same layout and component contracts.

| Token | Dark value | Use |
| --- | --- | --- |
| `--void` | `#05060F` | Page background |
| `--panel` | `#0B0F24` | Cards and surfaces |
| `--panel-2` | `#121836` | Raised surfaces |
| `--cyan` | `#00F0FF` | Links, focus, primary signal |
| `--magenta` | `#FF2E9A` | Hover, active and secondary signal |
| `--violet` | `#8B5CFF` | Gradient midpoint |
| `--acid` | `#F7FF3C` | Rare status/warning accent |
| `--text` | `#E6F1FF` | Body text |
| `--muted` | `#A9B6D9` | Supporting text |

To change the look, edit the token values rather than individual components.
The signature gradient is `--gradient`; typography uses `next/font` variables
for Orbitron, Inter, JetBrains Mono, and Noto Sans JP.

## Content and links

Portfolio facts, project data, skills, and outbound links are centralized in
`src/data/portfolio.ts`. The LinkedIn profile is
`https://www.linkedin.com/in/bismillah-khan-240953294`. The contact form uses a
`mailto:` fallback because no form backend exists in this repository.

The `/styleguide` route is a noindex development reference and can be removed
before launch.
