# Bismillah Khan — Portfolio

An original editorial portfolio for Bismillah Khan, an AI/ML Engineer
and B.Tech CSE student at IIIT Bhubaneswar. It is built with Next.js 16,
React 19, TypeScript, Tailwind CSS 4, and Framer Motion.

Live site: [portfolio-red-xi-76.vercel.app](https://portfolio-red-xi-76.vercel.app/)

## Included

- Five preserved routes: `/`, `/about`, `/projects`, `/skills`, and `/contact`.
- **Vermilion / Ink** art direction: warm charcoal, parchment, deep red, and celadon, with dark/light themes.
- Original folded-ribbon SVG sculpture, BK mark, and illustrated project covers. No third-party character art.
- Interactive assembled/exploded ribbon views and a pointer-reactive About portrait with a keyboard/touch wink control.
- Animated ink contours respond to a fine pointer and move independently on touch devices.
- Red sci-fi atmosphere with a signal sun, perspective city grid, skyline blocks, and animated scanline; all background artwork is original canvas/CSS.
- Pause/resume control, live reduced-motion support, and hidden-tab suspension. Canvas paints at up to 24fps, caps DPR at 1.5, and uses fewer contours on mobile.
- Local LazyGPT chat widget with the existing deterministic keyword behavior and suggested prompts.
- Accessible project filters and mission-briefing modal, interactive skill-to-project explorer, and mailto contact fallback.
- Metadata, Open Graph SVG, sitemap, robots, focus rings, semantic labels, and responsive layouts from 360px upward.

## Run locally

Use Node.js 22.12+ and npm 9+ for development and the browser checks. The app's
Next.js runtime itself supports Node 20.9+, but the axe test runner needs 22.12+.

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:ui
```

## Design tokens

All visual tokens live at the top of `src/app/globals.css`. Dark mode uses warm
ink; `[data-theme="light"]` swaps to parchment and deeper accent colours.
The canvas reads the same CSS tokens and updates when the theme changes.

| Token | Dark value | Use |
| --- | --- | --- |
| `--void` | `#191817` | Warm ink background |
| `--panel` | `#23211F` | Cards and surfaces |
| `--panel-2` | `#302C28` | Raised surfaces |
| `--paper` | `#EEE6D6` | Artwork and editorial paper |
| `--accent` | `#FF816E` | Vermilion links and focus (deep red in light mode) |
| `--oxblood` | `#9E302F` | Print artwork and fixed red details |
| `--sage` | `#C4CBA3` | Celadon status and contour accent |
| `--text` | `#EEE6D6` | Body text |
| `--muted` | `#C0B8AB` | Supporting text |

To change the look, edit the token values rather than individual components.
Typography uses self-hosted `next/font` Barlow Condensed, Inter, JetBrains Mono,
and Noto Sans JP; occasional system-serif italics create editorial contrast.
Legacy colour names are aliases so existing route components remain compatible.

Layout proportions use the same token block: `--page-gutter` scales from 20–48px,
`--section-gap` from 64–110px, and `--card-gap` from 20–32px. The content container
caps at 1264px; project covers retain a 4:3 ratio and the sculpture keeps its
intrinsic 25:28 SVG ratio. Tablet previews become image/text rows rather than
cramped three-column cards. Chat is bounded by viewport width and dynamic height.

Japanese labels use a 6KB Google Fonts subset at
`src/app/fonts/noto-jp-labels.woff2`, served through `next/font/local` with its
OFL license alongside it. The subset covers `ようこそ自己紹介作品技術連絡概要学歴設計創造`;
add glyphs to the subset if those decorative labels change. The short first-visit
boot sequence is a dismissible corner card, not a gate hiding the page.

`src/components/AmbientCanvas.tsx` owns the background and sets the root
`data-motion` attribute. SVG float, ticker, and typing effects honour this
switch. `SignalSculpture.tsx` also pauses offscreen; its tilt only runs on fine
pointers. No 3D engine or large background video is needed.

### Interactive details

- **Home:** the original ribbon is a personal signal study: curiosity is the
  spark, while models, data, and interfaces connect until an idea becomes a
  working system. Use **Assembled / Exploded** to separate its three bands;
  the SVG and controls keep their dimensions.
- **About:** `src/components/ReactiveAvatar.tsx` follows a fine pointer, rotates
  its outer frame, and has a **Wink** button usable with touch or keyboard.
  Background movement stops offscreen, when hidden, or when motion is paused.
  The education summary retains the degree, college, and timeline, without GPA.
- **Skills:** choose a group and a tool to trace its recorded projects. Links
  use actual project anchors. Connections are based on explicit tags or project
  notes in `src/data/portfolio.ts`, not inferred from group membership. Unlisted
  associations have an honest empty state rather than invented project claims.
- Reduced motion and the global pause stop decorative movement, but all
  controls and project navigation remain functional. Explicit ribbon and
  expression changes happen instantly rather than being disabled.

## UI regression checks

`tests/portfolio.spec.ts` runs against a production build on port 3101. It checks
the five routes at 360, 768, and 1440px in both themes with axe, horizontal
overflow and browser errors, plus keyboard navigation, native-dialog focus,
theme persistence, chat prompts, contact validation, and canvas pause/reduced
motion. `tests/about.spec.ts`, `tests/sculpture.spec.ts`, and
`tests/skills.spec.ts` add content, expression, ribbon geometry, touch/keyboard,
and evidence-mapping regressions. Run `npm run build` before `npm run test:ui`.

Visual reference: [Nikita Nalekar’s UI UX Portfolio 2025](https://www.behance.net/gallery/225765431/UI-UX-Portfolio-2025).
The reference informed the bold editorial hierarchy and restricted palette;
the artwork, composition, code, and motion here are original.

### Local validation — October 2026

- Lint, TypeScript, and production build passed.
- Interactive-details update: **27 Chromium tests passed**, covering the new
  ribbon views, portrait, and skill-to-project navigation in addition to the
  existing route, axe, keyboard, and responsive checks. The new ribbon checks
  include 320px screens; paused ticker labels wrap instead of being cropped.
- The earlier visual-refresh suite had 11 passing Chromium tests, including axe across the five routes at
  360/768/1440px in both themes, and geometry checks at 360/768/1024/1440/1920px
  plus 844×390 landscape.
- Before the interactive-details update, Lighthouse mobile on the local production home page measured Performance **96**, Accessibility
  **100**, Best Practices **100**, SEO **100**; LCP **2.7s**, CLS **0.025**.
  This is a prior lab measurement, not a current or deployed-site guarantee. LCP was above
  the original 2.5s target and should be rechecked on Vercel.
- The font/animation payload work reduced the measured home transfer from
  roughly 663KiB to 305KiB without removing the dynamic background.
- `npm audit --omit=dev` reports six existing production dependency advisories,
  including a critical advisory against the pinned Next.js 16.2.7. No forced
  framework upgrade was bundled into the visual refresh; address this before deployment.

## Content and links

Portfolio facts, project data, skills, and outbound links are centralized in
`src/data/portfolio.ts`. The LinkedIn profile is
`https://www.linkedin.com/in/bismillah-khan-240953294`. The contact form uses a
`mailto:` fallback because no form backend exists in this repository.

The `/styleguide` route is a noindex development reference and can be removed
before launch.
