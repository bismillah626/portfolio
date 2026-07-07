# Bismillah Khan — Portfolio

A premium, anime-inspired personal portfolio built with **Next.js 16**, **React 19**, and **Framer Motion**. Features a Ghibli-themed dual-mode design with interactive elements like cursor-tracking avatars, sakura petals, fireflies, and a lamp-string theme toggle.

---

## ✨ Features

- **Dark / Light Mode** — Lamp-string toggle with smooth crossfade between cosmic night and anime sunset backgrounds
- **Interactive Avatar** — Manga-style character with eye-tracking pupils that follow your cursor
- **Bento Grid Layout** — Modern card-based homepage inspired by premium portfolio designs
- **Animated Particles** — Sakura petals (light mode) and fireflies (dark mode)
- **AI Chatbot** — Built-in conversational assistant
- **Glassmorphism UI** — Frosted-glass cards with 3D tilt on hover
- **Multi-Page** — About, Projects, Skills, and Contact sections with modal navigation

## 🛠 Tech Stack

| Technology       | Version |
| ---------------- | ------- |
| Next.js          | 16.2.7  |
| React            | 19.2.4  |
| TypeScript       | 5.x     |
| Framer Motion    | 12.x    |
| Tailwind CSS     | 4.x     |

## 📁 Project Structure

```
portfolio/
├── public/              # Static assets (backgrounds)
│   ├── bg.png           # Dark mode background
│   └── bg-light.jpg     # Light mode background (anime sunset)
├── src/
│   ├── app/
│   │   ├── layout.tsx   # Root layout with fonts & theme script
│   │   ├── page.tsx     # Home page (Hero + BentoGrid + Chatbot)
│   │   ├── globals.css  # Design tokens, animations, theme variables
│   │   ├── about/       # About page
│   │   ├── projects/    # Projects page
│   │   ├── skills/      # Skills page
│   │   └── contact/     # Contact page
│   └── components/
│       ├── Hero.tsx              # Hero section with animated name
│       ├── BentoGrid.tsx         # Card grid with avatar & project icons
│       ├── Chatbot.tsx           # AI chatbot widget
│       ├── ThemeProvider.tsx     # Dark/light mode context
│       ├── ThemeBackground.tsx   # Animated wallpaper layer
│       ├── LampToggle.tsx        # Lamp-string theme switch
│       ├── Sidebar.tsx           # Navigation sidebar
│       ├── AtmosphereParticles.tsx # Ambient particle effects
│       └── PageTransition.tsx    # Route transition animation
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 (recommended: 20+)
- **npm** ≥ 9

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/myPortfolio.git
cd myPortfolio/portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will start at **[http://localhost:3000](http://localhost:3000)**.

### 4. Build for production

```bash
npm run build
npm start
```

This creates an optimized production build and serves it on port 3000.

## 📝 Available Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `npm run dev`    | Start dev server with hot reload   |
| `npm run build`  | Create optimized production build  |
| `npm start`      | Serve production build             |
| `npm run lint`   | Run ESLint checks                  |

## 🎨 Customization

### Theme Colors

Edit `src/app/globals.css` — all design tokens are defined as CSS custom properties in `:root` (dark) and `[data-theme="light"]` blocks.

### Backgrounds

Replace the images in `public/`:
- `bg.png` — Dark mode wallpaper
- `bg-light.jpg` — Light mode wallpaper

### Personal Info

Update your name, title, and links in `src/components/Hero.tsx` and the bento cards in `src/components/BentoGrid.tsx`.

---

## 📄 License

This project is for personal use. Feel free to fork and adapt for your own portfolio.
