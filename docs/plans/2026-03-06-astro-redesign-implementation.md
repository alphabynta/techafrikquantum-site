# Astro Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the TechAfrikQuantum site as a modern single-page Astro site with a Palantir-style dark aesthetic, sticky horizontal scroll for sectors/solutions, particle hero, and GitHub Pages deployment via GitHub Actions.

**Architecture:** Astro static output with component-based structure. All content in one `index.astro` page assembled from section components. JS is vanilla, scoped per component. CSS uses design tokens from existing style.css, extended with new component styles.

**Tech Stack:** Astro 4, vanilla JS, CSS custom properties, Google Fonts (Inter + Noto Sans Arabic), GitHub Actions for deploy.

---

### Task 1: Scaffold Astro project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `.gitignore` (update)

**Step 1: Initialize Astro in the existing repo directory**

```bash
cd /home/samuel/alimou/techafrikquantum-site
npm create astro@latest . -- --template minimal --no-install --no-git
```

When prompted:
- "Where should we create your new project?" → `.` (current dir)
- "How would you like to start your new project?" → Empty
- "Install dependencies?" → No (we'll do it manually)
- "Initialize a new git repository?" → No (already a git repo)

**Step 2: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, `package-lock.json` created.

**Step 3: Replace `astro.config.mjs` with GitHub Pages config**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://alphabynta.github.io',
  base: '/techafrikquantum-site',
  output: 'static',
  build: {
    assets: '_assets',
  },
});
```

**Step 4: Update `.gitignore`**

Add to existing `.gitignore` (or create if missing):
```
node_modules/
dist/
.astro/
```

**Step 5: Verify Astro works**

```bash
npm run dev
```

Expected: "astro dev server running at http://localhost:4321/"

**Step 6: Commit**

```bash
git add package.json package-lock.json astro.config.mjs .gitignore
git commit -m "feat: scaffold Astro project with GitHub Pages config"
```

---

### Task 2: GitHub Actions deploy workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create the workflow file**

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2: Enable GitHub Pages in repo settings**

Go to: GitHub repo → Settings → Pages → Source → "GitHub Actions"

**Step 3: Commit**

```bash
git add .github/
git commit -m "feat: add GitHub Actions deploy workflow for Astro"
```

---

### Task 3: Copy static assets to public/

**Files:**
- Copy existing assets to `public/`

**Step 1: Move static assets**

```bash
mkdir -p public
cp logo.png public/
cp favicon.ico public/
cp icon.svg public/ 2>/dev/null || true
cp apple-touch-icon.png public/ 2>/dev/null || true
cp -r images/ public/images/ 2>/dev/null || true
```

**Step 2: Commit**

```bash
git add public/
git commit -m "feat: copy static assets to Astro public directory"
```

---

### Task 4: Global CSS

**Files:**
- Create: `src/styles/global.css`

**Step 1: Create the file with all design tokens and base styles**

```css
/* ── Design tokens ──────────────────────────────────────────── */
:root {
  --bg: #000000;
  --surface: #0d0d0d;
  --surface-2: #111111;
  --text: #f0f0f2;
  --muted: #808080;
  --primary: #f5a524;
  --primary-600: #d68c16;
  --accent: #f5a524;
  --accent-dim: rgba(245, 165, 36, .12);
  --accent-border: rgba(245, 165, 36, .35);
  --border: #2a2a2a;
  --radius: 12px;
  --radius-lg: 18px;
  --space-1: 8px; --space-2: 12px; --space-3: 16px;
  --space-4: 24px; --space-5: 32px; --space-6: 48px;
  --maxw: 1400px;
  --font: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

/* ── Reset ──────────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  font-family: var(--font);
  font-size: 16px;
  line-height: 1.65;
  color: var(--text);
  background: #000;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
button { font-family: var(--font); }
a:focus-visible, button:focus-visible, input:focus-visible,
textarea:focus-visible, select:focus-visible {
  outline: 2px solid var(--primary); outline-offset: 3px;
}
.sr-only {
  position: absolute; width: 1px; height: 1px;
  overflow: hidden; clip: rect(0 0 0 0);
  white-space: nowrap; clip-path: inset(50%);
}

/* ── Layout ─────────────────────────────────────────────────── */
.container {
  max-width: var(--maxw);
  margin: 0 auto;
  padding: 0 clamp(16px, 3vw, 60px);
}

/* ── Typography ─────────────────────────────────────────────── */
h1, h2, h3, h4 { font-weight: 700; letter-spacing: -.02em; line-height: 1.1; color: var(--text); }
h1 { font-size: clamp(48px, 7vw, 96px); font-weight: 800; letter-spacing: -.04em; }
h2 { font-size: clamp(32px, 5vw, 72px); font-weight: 800; letter-spacing: -.04em; }
h3 { font-size: clamp(18px, 2.5vw, 26px); font-weight: 700; }
p { color: var(--muted); line-height: 1.7; }
.lead { font-size: clamp(16px, 1.9vw, 20px); color: var(--muted); line-height: 1.75; }

/* ── Section label ──────────────────────────────────────────── */
.section-label {
  display: block;
  font-size: 11px; font-weight: 700;
  letter-spacing: .2em; text-transform: uppercase;
  color: var(--accent); margin-bottom: 16px;
}

/* ── Buttons ────────────────────────────────────────────────── */
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 13px 28px; border-radius: 999px;
  font-weight: 600; font-size: 15px; font-family: var(--font);
  border: 1px solid transparent; cursor: pointer;
  transition: background .15s, color .15s, border-color .15s, box-shadow .15s;
  white-space: nowrap;
}
.btn--primary { background: var(--primary); color: #000; border-color: var(--primary); }
.btn--primary:hover { background: var(--primary-600); border-color: var(--primary-600); }
.btn--ghost { background: transparent; color: var(--text); border-color: var(--border); }
.btn--ghost:hover { background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.2); }

/* ── Cards ──────────────────────────────────────────────────── */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-4) var(--space-5);
  transition: border-color .2s, box-shadow .2s;
}
.card:hover { border-color: rgba(255,255,255,.12); box-shadow: 0 4px 32px rgba(0,0,0,.5); }
.card h3 { font-size: 18px; font-weight: 700; color: var(--text); margin-bottom: 8px; }
.card p { font-size: 14px; color: var(--muted); margin: 0; }

/* ── Outcome pills ──────────────────────────────────────────── */
.pill-list { display: flex; flex-wrap: wrap; gap: 8px; list-style: none; padding: 0; margin: 16px 0; }
.pill-list li {
  background: var(--accent-dim);
  border: 1px solid var(--accent-border);
  color: rgba(245,165,36,.9);
  font-size: 12px; font-weight: 600;
  padding: 5px 12px; border-radius: 999px;
}

/* ── Forms ──────────────────────────────────────────────────── */
.form-row { display: grid; gap: 6px; }
.form-row label { font-size: 13px; font-weight: 500; color: var(--muted); }
.input, .textarea, .form-row input, .form-row textarea, .form-row select {
  width: 100%; padding: 12px 16px;
  border-radius: 10px;
  color: var(--text); background: #111;
  border: 1px solid var(--border);
  font: inherit; font-size: 14px;
  transition: border-color .15s;
}
.input:focus, .textarea:focus,
.form-row input:focus, .form-row textarea:focus, .form-row select:focus {
  border-color: var(--accent); outline: none;
}
.form-row textarea { resize: vertical; }

/* ── Lang switcher ──────────────────────────────────────────── */
.lang-switcher { display: flex; gap: 4px; align-items: center; flex-shrink: 0; }
.lang-btn {
  background: transparent; border: 1px solid var(--border);
  color: var(--muted); border-radius: 6px;
  padding: 5px 10px; font-size: 12px; font-weight: 600;
  font-family: var(--font); cursor: pointer;
  transition: color .15s, border-color .15s, background .15s;
}
.lang-btn:hover { color: var(--text); border-color: rgba(255,255,255,.2); }
.lang-btn--active { color: var(--accent); border-color: var(--accent); background: var(--accent-dim); }

/* ── RTL ────────────────────────────────────────────────────── */
[dir="rtl"] body { font-family: 'Noto Sans Arabic', var(--font); }
[dir="rtl"] .nav-list { flex-direction: row-reverse; }
[dir="rtl"] .site-header .container { flex-direction: row-reverse; }
[dir="rtl"] .pill-list { justify-content: flex-end; }
[dir="rtl"] .cta-group { flex-direction: row-reverse; }
[dir="rtl"] .about-panel__content { direction: rtl; }
[dir="rtl"] .contact-split { direction: rtl; }
[dir="rtl"] .footer-strip { direction: rtl; }

/* ── Responsive ─────────────────────────────────────────────── */
@media (max-width: 900px) {
  h1 { font-size: clamp(36px, 10vw, 56px); }
  h2 { font-size: clamp(28px, 8vw, 48px); }
  [dir="rtl"] .nav-list { flex-direction: column; }
}
@media (max-width: 600px) {
  .container { padding: 0 16px; }
  .btn { padding: 11px 20px; font-size: 14px; }
}
```

**Step 2: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: add global CSS with design tokens and base styles"
```

---

### Task 5: Layout.astro

**Files:**
- Create: `src/layouts/Layout.astro`

**Step 1: Create the file**

```astro
---
// src/layouts/Layout.astro
export interface Props {
  title?: string;
  description?: string;
}
const {
  title = 'Techafrik Quantum Group',
  description = 'Defense-grade surveillance, critical connectivity, and fleet management across West Africa.',
} = Astro.props;
const base = import.meta.env.BASE_URL;
---
<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="icon" href={`${base}favicon.ico`} />
  <link rel="icon" href={`${base}icon.svg`} type="image/svg+xml" />
  <link rel="apple-touch-icon" href={`${base}apple-touch-icon.png`} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+Arabic:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</head>
<body>
  <slot />
  <script src="../scripts/nav.js"></script>
  <script src="../scripts/hscroll.js"></script>
  <script src="../scripts/i18n.js"></script>
</body>
</html>

<style is:global>
  @import '../styles/global.css';
</style>
```

**Step 2: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add Layout.astro with fonts and global script loading"
```

---

### Task 6: Nav.astro

**Files:**
- Create: `src/components/Nav.astro`

**Step 1: Create the file**

```astro
---
// src/components/Nav.astro
const base = import.meta.env.BASE_URL;
---
<header class="site-header" role="banner">
  <div class="container site-header__inner">
    <a class="logo" href={`${base}`} aria-label="Techafrik Quantum Group home">
      <img src={`${base}logo.png`} alt="Techafrik Quantum Group" width="56" height="56" decoding="async" />
    </a>

    <nav class="primary-nav" aria-label="Primary">
      <button class="nav-toggle" aria-controls="nav-menu" aria-expanded="false">
        <span class="sr-only">Menu</span>
        <span class="nav-toggle__bar"></span>
        <span class="nav-toggle__bar"></span>
        <span class="nav-toggle__bar"></span>
      </button>

      <ul id="nav-menu" class="nav-list" role="list">
        <li><a class="nav-link" href="#hero" data-i18n="nav.home">Home</a></li>
        <li><a class="nav-link" href="#sectors" data-i18n="nav.sectors">Sectors</a></li>
        <li><a class="nav-link" href="#solutions" data-i18n="nav.solutions">Solutions</a></li>
        <li><a class="nav-link" href="#about" data-i18n="nav.about">About</a></li>
        <li><a class="nav-link" href="#partners" data-i18n="nav.partners">Partners</a></li>
        <li><a class="nav-link" href="#contact" data-i18n="nav.contact">Contact</a></li>
      </ul>
    </nav>

    <div class="lang-switcher" aria-label="Language selector">
      <button class="lang-btn lang-btn--active" data-lang="en">EN</button>
      <button class="lang-btn" data-lang="fr">FR</button>
      <button class="lang-btn" data-lang="ar">AR</button>
    </div>
  </div>
</header>

<style>
  .site-header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: transparent;
    border-bottom: 1px solid transparent;
    transition: background .3s ease, border-color .3s ease, backdrop-filter .3s ease;
  }
  .site-header.is-scrolled {
    background: rgba(0,0,0,.92);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom-color: var(--border);
  }
  .site-header__inner {
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; padding-top: 16px; padding-bottom: 16px;
  }
  .logo { display: inline-flex; align-items: center; flex-shrink: 0; }
  .logo img { border-radius: 8px; object-fit: contain; }
  .primary-nav { display: flex; align-items: center; }
  .nav-list {
    display: flex; gap: 4px; list-style: none; align-items: center; flex-wrap: nowrap;
  }
  .nav-link {
    color: rgba(255,255,255,.6);
    padding: 8px 14px; border-radius: 8px;
    font-size: 14px; font-weight: 500; white-space: nowrap;
    transition: color .15s, background .15s;
  }
  .nav-link:hover, .nav-link.is-active { color: #fff; background: rgba(255,255,255,.07); }
  .nav-link.is-active { color: var(--accent); }
  .nav-toggle {
    display: none; flex-direction: column; justify-content: center; gap: 5px;
    background: transparent; border: 1px solid var(--border);
    padding: 10px 12px; border-radius: 10px; cursor: pointer; flex-shrink: 0;
  }
  .nav-toggle__bar {
    display: block; width: 18px; height: 1.5px;
    background: var(--text); border-radius: 2px;
    transition: transform .2s, opacity .2s;
  }

  @media (max-width: 900px) {
    .nav-toggle { display: flex; }
    .primary-nav { position: static; }
    .nav-list {
      display: none;
      position: absolute; top: 100%; left: 0; right: 0;
      flex-direction: column; align-items: stretch; gap: 4px;
      background: rgba(0,0,0,.97);
      backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--border);
      padding: 12px 16px 20px;
      z-index: 49;
    }
    .nav-list.is-open { display: flex; }
    .nav-link { padding: 12px 16px; font-size: 16px; }
  }
</style>
```

**Step 2: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: add Nav component with transparent-to-frosted scroll behavior"
```

---

### Task 7: Hero.astro + hero-canvas.js

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/scripts/hero-canvas.js`

**Step 1: Create hero-canvas.js**

```js
// src/scripts/hero-canvas.js
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const PARTICLE_COUNT = 90;
  const MAX_DIST = 160;
  let particles = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r = Math.random() * 1.5 + 0.5;
    }
    update() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.55)';
      ctx.fill();
    }
  }

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          const alpha = 0.10 * (1 - d / MAX_DIST);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animate);
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });
  particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
  animate();
})();
```

**Step 2: Create Hero.astro**

```astro
---
// src/components/Hero.astro
---
<section class="hero" id="hero" aria-label="Hero">
  <canvas id="hero-canvas" aria-hidden="true"></canvas>

  <div class="container hero__content">
    <p class="section-label" data-i18n="hero.eyebrow">West Africa's Defense &amp; Connectivity Leader</p>
    <h1 class="hero__headline">
      <span data-i18n="hero.line1">SECURE.</span>
      <span class="hero__headline--accent" data-i18n="hero.line2">CONNECT.</span>
      <span data-i18n="hero.line3">PROTECT.</span>
    </h1>
    <p class="hero__sub lead" data-i18n="hero.sub">
      Techafrik Quantum Group delivers defense-grade surveillance, critical connectivity, and intelligent fleet management across West Africa.
    </p>
    <div class="cta-group">
      <a class="btn btn--primary" href="#solutions" data-i18n="hero.cta">Explore Solutions</a>
      <a class="btn btn--ghost" href="#contact" data-i18n="hero.cta2">Contact Us</a>
    </div>
    <ul class="trust-strip" role="list">
      <li data-i18n="hero.trust1">Defense-Grade</li>
      <li data-i18n="hero.trust2">West Africa Coverage</li>
      <li data-i18n="hero.trust3">24/7 Support</li>
    </ul>
  </div>

  <div class="hero__scroll-hint" aria-hidden="true">
    <span></span>
  </div>
</section>

<script src="../scripts/hero-canvas.js"></script>

<style>
  .hero {
    position: relative; width: 100%; height: 100vh; min-height: 600px;
    display: flex; align-items: center;
    background: #000; overflow: hidden; isolation: isolate;
  }
  #hero-canvas {
    position: absolute; inset: 0;
    width: 100% !important; height: 100% !important;
    z-index: 0; pointer-events: none;
  }
  .hero__content {
    position: relative; z-index: 1;
    max-width: var(--maxw);
    padding-top: 100px; /* account for fixed nav */
  }
  .hero__headline {
    display: flex; flex-direction: column;
    font-size: clamp(56px, 8vw, 112px);
    font-weight: 800; letter-spacing: -.04em;
    line-height: 0.95; color: #fff;
    margin-bottom: clamp(20px, 3vw, 36px);
    text-transform: uppercase;
  }
  .hero__headline--accent { color: var(--accent); }
  .hero__sub {
    max-width: 560px; margin-bottom: clamp(24px, 3vw, 40px);
    font-size: clamp(16px, 1.8vw, 20px);
  }
  .cta-group { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: clamp(24px, 3vw, 40px); }
  .trust-strip {
    display: flex; flex-wrap: wrap; gap: 10px;
    list-style: none; padding: 0;
  }
  .trust-strip li {
    font-size: 12px; font-weight: 600; color: var(--muted);
    padding: 5px 14px; border: 1px solid var(--border);
    border-radius: 999px; background: rgba(255,255,255,.03);
    letter-spacing: .04em; text-transform: uppercase;
  }
  .hero__scroll-hint {
    position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 6px;
  }
  .hero__scroll-hint span {
    display: block; width: 1px; height: 60px;
    background: linear-gradient(to bottom, transparent, var(--accent));
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0; transform: scaleY(0.5); }
    50% { opacity: 1; transform: scaleY(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .hero__scroll-hint { display: none; }
  }
  @media (max-width: 600px) {
    .hero__content { padding-top: 80px; }
    .cta-group { flex-direction: column; align-items: flex-start; }
  }
</style>
```

**Step 3: Commit**

```bash
git add src/components/Hero.astro src/scripts/hero-canvas.js
git commit -m "feat: add Hero section with particle canvas animation"
```

---

### Task 8: Horizontal scroll rig + Sectors.astro

**Files:**
- Create: `src/scripts/hscroll.js`
- Create: `src/components/Sectors.astro`

**Step 1: Create hscroll.js**

```js
// src/scripts/hscroll.js
(function () {
  function initHScroll(section) {
    const cards = section.querySelector('.hscroll-cards');
    const bar = section.querySelector('.hscroll-bar');
    if (!cards) return;

    function update() {
      const rect = section.getBoundingClientRect();
      const totalScroll = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      const maxX = cards.scrollWidth - window.innerWidth + 120;
      cards.style.transform = `translateX(-${progress * maxX}px)`;
      if (bar) bar.style.width = `${progress * 100}%`;
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  // Mobile: skip sticky scroll, let cards wrap
  function isMobile() { return window.innerWidth <= 768; }

  document.querySelectorAll('.hscroll-section').forEach(section => {
    if (!isMobile()) initHScroll(section);
  });
})();
```

**Step 2: Create Sectors.astro**

```astro
---
// src/components/Sectors.astro
const sectors = [
  {
    num: '01', id: 'defense',
    label: 'defense.label', title: 'defense.title', body: 'defense.body',
    li: ['defense.li1','defense.li2','defense.li3'], cta: 'defense.cta',
    labelFallback: 'Defense', titleFallback: 'Defense',
    bodyFallback: 'We deliver hardened surveillance, secure communications, and ISR capabilities for defense forces operating in challenging environments.',
    liFallback: ['Tactical surveillance & ISR drone integration','Encrypted military-grade communications','Rapid deployment & field-serviceable systems'],
  },
  {
    num: '02', id: 'government',
    label: 'government.label', title: 'government.title', body: 'government.body',
    li: ['government.li1','government.li2','government.li3'], cta: 'government.cta',
    labelFallback: 'Government', titleFallback: 'Government',
    bodyFallback: 'We support government agencies and public institutions with secure network infrastructure, surveillance systems, and digital governance tools.',
    liFallback: ['Public safety & smart city infrastructure','Secure inter-agency communications','Governance, risk & compliance frameworks'],
  },
  {
    num: '03', id: 'enterprise',
    label: 'enterprise.label', title: 'enterprise.title', body: 'enterprise.body',
    li: ['enterprise.li1','enterprise.li2','enterprise.li3'], cta: 'enterprise.cta',
    labelFallback: 'Enterprise', titleFallback: 'Enterprise',
    bodyFallback: 'Corporate networks, cybersecurity operations, and assets management for businesses that cannot afford downtime.',
    liFallback: ['Enterprise network design & orchestration','SOC onboarding & IAM implementation','Fleet & assets tracking for operations'],
  },
  {
    num: '04', id: 'oilgas',
    label: 'oilgas.label', title: 'oilgas.title', body: 'oilgas.body',
    li: ['oilgas.li1','oilgas.li2','oilgas.li3'], cta: 'oilgas.cta',
    labelFallback: 'Oil & Gas', titleFallback: 'Oil & Gas',
    bodyFallback: 'Remote sites, offshore platforms, and pipeline corridors demand connectivity and safety systems that work without exception.',
    liFallback: ['Satellite & radio connectivity for remote sites','Perimeter intrusion detection for critical assets','Fleet tracking & fuel anti-fraud systems'],
  },
  {
    num: '05', id: 'cellular',
    label: 'cellular.label', title: 'cellular.title', body: 'cellular.body',
    li: ['cellular.li1','cellular.li2','cellular.li3'], cta: 'cellular.cta',
    labelFallback: 'Cellular', titleFallback: 'Cellular',
    bodyFallback: 'We partner with cellular operators to deliver RF engineering, spectrum management, and network orchestration services.',
    liFallback: ['RF engineering & spectrum management','Network telemetry & SLO observability','QoS & traffic engineering for carrier-grade networks'],
  },
  {
    num: '06', id: 'mobility',
    label: 'mobility.label', title: 'mobility.title', body: 'mobility.body',
    li: ['mobility.li1','mobility.li2','mobility.li3'], cta: 'mobility.cta',
    labelFallback: 'Mobility', titleFallback: 'Mobility',
    bodyFallback: 'Transport operators, logistics companies, and national fleets rely on our mobility solutions to reduce costs, improve safety, and gain operational visibility.',
    liFallback: ['Real-time GPS fleet tracking & geofencing','Driver behavior scoring & safety compliance','Route optimization & fuel efficiency analytics'],
  },
];
---

<section class="hscroll-section" id="sectors" aria-labelledby="sectors-title">
  <div class="hscroll-sticky">
    <div class="hscroll-header container">
      <p class="section-label" data-i18n="nav.sectors">Sectors</p>
      <h2 id="sectors-title" class="hscroll-heading">
        Who We <span class="text-accent">Serve</span>
      </h2>
    </div>
    <div class="hscroll-track">
      <div class="hscroll-cards">
        {sectors.map(s => (
          <article class="hcard" id={s.id}>
            <span class="hcard__num" aria-hidden="true">{s.num}</span>
            <p class="section-label" data-i18n={s.label}>{s.labelFallback}</p>
            <h3 class="hcard__title" data-i18n={s.title}>{s.titleFallback}</h3>
            <p class="hcard__body" data-i18n={s.body}>{s.bodyFallback}</p>
            <ul class="pill-list">
              {s.li.map((key, i) => (
                <li data-i18n={key}>{s.liFallback[i]}</li>
              ))}
            </ul>
            <a class="btn btn--ghost hcard__cta" href="#contact" data-i18n={s.cta}>Contact Us</a>
          </article>
        ))}
      </div>
    </div>
    <div class="hscroll-progress-track" aria-hidden="true">
      <div class="hscroll-bar"></div>
    </div>
  </div>
</section>

<style>
  /* Outer section — tall enough to drive scroll */
  .hscroll-section { height: calc(100vh * 5); background: var(--bg); }

  /* Sticky inner */
  .hscroll-sticky {
    position: sticky; top: 0;
    height: 100vh; overflow: hidden;
    display: flex; flex-direction: column; justify-content: center;
  }
  .hscroll-header { padding-top: 80px; margin-bottom: 32px; }
  .hscroll-heading {
    font-size: clamp(36px, 5vw, 72px);
    font-weight: 800; letter-spacing: -.04em; color: #fff;
    text-transform: uppercase;
  }
  .text-accent { color: var(--accent); }

  /* Cards track */
  .hscroll-track { overflow: hidden; padding-left: clamp(16px, 3vw, 60px); }
  .hscroll-cards {
    display: flex; gap: 20px;
    will-change: transform;
    transition: transform .05s linear;
    padding-right: 120px;
  }

  /* Individual card */
  .hcard {
    flex-shrink: 0;
    width: clamp(300px, 30vw, 400px);
    height: calc(100vh - 220px);
    background: var(--surface);
    border: 1px solid var(--border);
    border-top: 3px solid var(--accent);
    border-radius: var(--radius-lg);
    padding: clamp(24px, 3vw, 40px);
    position: relative; overflow: hidden;
    display: flex; flex-direction: column;
    transition: border-color .2s, box-shadow .2s;
  }
  .hcard:hover {
    border-color: var(--accent);
    box-shadow: 0 0 40px rgba(245,165,36,.10);
  }
  .hcard__num {
    position: absolute; top: -10px; right: 16px;
    font-size: clamp(80px, 10vw, 140px);
    font-weight: 800; letter-spacing: -.05em;
    color: var(--accent); opacity: 0.06;
    line-height: 1; pointer-events: none; select: none;
  }
  .hcard .section-label { margin-bottom: 8px; }
  .hcard__title {
    font-size: clamp(22px, 2.5vw, 30px);
    font-weight: 800; color: #fff;
    letter-spacing: -.03em; text-transform: uppercase;
    margin-bottom: 12px;
  }
  .hcard__body {
    font-size: 14px; color: var(--muted);
    line-height: 1.7; flex: 1; margin-bottom: 16px;
  }
  .hcard__cta { margin-top: auto; align-self: flex-start; }

  /* Progress bar */
  .hscroll-progress-track {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px; background: var(--border);
  }
  .hscroll-bar {
    height: 100%; width: 0%;
    background: var(--accent);
    transition: width .05s linear;
  }

  /* Mobile: disable sticky scroll, stack cards */
  @media (max-width: 768px) {
    .hscroll-section { height: auto; }
    .hscroll-sticky { position: static; height: auto; overflow: visible; padding: clamp(40px, 6vw, 80px) 0; }
    .hscroll-header { padding-top: 0; }
    .hscroll-track { padding: 0 clamp(16px, 3vw, 60px); overflow-x: auto; scroll-snap-type: x mandatory; }
    .hscroll-cards { flex-wrap: nowrap; padding-right: 40px; }
    .hcard { width: 85vw; height: auto; min-height: 380px; scroll-snap-align: start; }
    .hscroll-progress-track { display: none; }
  }
</style>
```

**Step 3: Commit**

```bash
git add src/components/Sectors.astro src/scripts/hscroll.js
git commit -m "feat: add Sectors component with sticky horizontal scroll"
```

---

### Task 9: Solutions.astro

**Files:**
- Create: `src/components/Solutions.astro`

**Step 1: Create the file** (same sticky scroll pattern as Sectors, different background + data)

```astro
---
// src/components/Solutions.astro
const solutions = [
  {
    num: '01', id: 'safety',
    label: 'safety.label', title: 'safety.title', body: 'safety.body',
    li: ['safety.li1','safety.li2','safety.li3'], cta: 'safety.cta',
    labelFallback: 'Safety & Surveillance', titleFallback: 'Safety & Surveillance',
    bodyFallback: 'Integrated camera networks, drone monitoring, and analytics platforms that give your security team total situational awareness.',
    liFallback: ['IP CCTV & thermal imaging networks','ISR drone integration & airspace monitoring','AI-assisted video analytics & alerting'],
  },
  {
    num: '02', id: 'connectivity',
    label: 'connectivity.label', title: 'connectivity.title', body: 'connectivity.body',
    li: ['connectivity.li1','connectivity.li2','connectivity.li3'], cta: 'connectivity.cta',
    labelFallback: 'Critical Connectivity', titleFallback: 'Critical Connectivity',
    bodyFallback: 'When your operation cannot afford downtime, we engineer redundant, multi-path connectivity with failover designed for mission-critical environments.',
    liFallback: ['VSAT & LEO satellite links for remote sites','Microwave & LTE hybrid WAN with automatic failover','Network SLA monitoring & proactive NOC support'],
  },
  {
    num: '03', id: 'assets',
    label: 'assets.label', title: 'assets.title', body: 'assets.body',
    li: ['assets.li1','assets.li2','assets.li3'], cta: 'assets.cta',
    labelFallback: 'Assets Management', titleFallback: 'Assets Management',
    bodyFallback: 'Real-time visibility over vehicles, equipment, and personnel. Reduce fuel waste, prevent theft, and make smarter operational decisions.',
    liFallback: ['GPS fleet tracking & geofencing','Fuel anti-fraud & consumption analytics','Driver behavior & safety scoring'],
  },
  {
    num: '04', id: 'ipnetworks',
    label: 'ipnetworks.label', title: 'ipnetworks.title', body: 'ipnetworks.body',
    li: ['ipnetworks.li1','ipnetworks.li2','ipnetworks.li3'], cta: 'ipnetworks.cta',
    labelFallback: 'IP Networks', titleFallback: 'IP Networks',
    bodyFallback: 'Enterprise-grade LAN/WAN design, SD-WAN deployment, and network orchestration. Secure, observable, built to grow.',
    liFallback: ['LAN/WAN design, deployment & optimisation','SD-WAN & MPLS for multi-site enterprises','Network telemetry, SNMP & flow analytics'],
  },
  {
    num: '05', id: 'cyber',
    label: 'cyber.label', title: 'cyber.title', body: 'cyber.body',
    li: ['cyber.li1','cyber.li2','cyber.li3'], cta: 'cyber.cta',
    labelFallback: 'Cybersecurity', titleFallback: 'Cybersecurity',
    bodyFallback: 'From risk assessment to SOC implementation, we help organisations build a security posture that withstands real-world threats.',
    liFallback: ['Vulnerability assessment & penetration testing','SOC onboarding & 24/7 threat monitoring','IAM, zero-trust & compliance frameworks'],
  },
];
---

<section class="hscroll-section solutions-section" id="solutions" aria-labelledby="solutions-title">
  <div class="hscroll-sticky solutions-sticky">
    <div class="hscroll-header container">
      <p class="section-label" data-i18n="nav.solutions">Solutions</p>
      <h2 id="solutions-title" class="hscroll-heading">
        What We <span class="text-accent">Build</span>
      </h2>
    </div>
    <div class="hscroll-track">
      <div class="hscroll-cards">
        {solutions.map(s => (
          <article class="hcard" id={s.id}>
            <span class="hcard__num" aria-hidden="true">{s.num}</span>
            <p class="section-label" data-i18n={s.label}>{s.labelFallback}</p>
            <h3 class="hcard__title" data-i18n={s.title}>{s.titleFallback}</h3>
            <p class="hcard__body" data-i18n={s.body}>{s.bodyFallback}</p>
            <ul class="pill-list">
              {s.li.map((key, i) => (
                <li data-i18n={key}>{s.liFallback[i]}</li>
              ))}
            </ul>
            <a class="btn btn--ghost hcard__cta" href="#contact" data-i18n={s.cta}>Contact Us</a>
          </article>
        ))}
      </div>
    </div>
    <div class="hscroll-progress-track" aria-hidden="true">
      <div class="hscroll-bar"></div>
    </div>
  </div>
</section>

<style>
  .solutions-section { background: var(--surface); }
  .solutions-sticky { background: var(--surface); }

  /* Reuse all .hscroll-* styles from Sectors — only background differs */
  .solutions-section .hscroll-section { height: calc(100vh * 4); }
  .solutions-section .hscroll-sticky {
    position: sticky; top: 0; height: 100vh; overflow: hidden;
    display: flex; flex-direction: column; justify-content: center;
  }
  .solutions-section .hscroll-header { padding-top: 80px; margin-bottom: 32px; }
  .solutions-section .hscroll-heading {
    font-size: clamp(36px, 5vw, 72px); font-weight: 800;
    letter-spacing: -.04em; color: #fff; text-transform: uppercase;
  }
  .solutions-section .hscroll-track {
    overflow: hidden; padding-left: clamp(16px, 3vw, 60px);
  }
  .solutions-section .hscroll-cards {
    display: flex; gap: 20px; will-change: transform;
    transition: transform .05s linear; padding-right: 120px;
  }
  .solutions-section .hcard {
    background: var(--surface-2); border-color: var(--border);
  }
  .solutions-section .hscroll-progress-track {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px; background: var(--border);
  }
  .solutions-section .hscroll-bar {
    height: 100%; width: 0%; background: var(--accent);
    transition: width .05s linear;
  }
  @media (max-width: 768px) {
    .solutions-section { height: auto; }
    .solutions-section .hscroll-sticky { position: static; height: auto; overflow: visible; padding: clamp(40px,6vw,80px) 0; }
    .solutions-section .hscroll-header { padding-top: 0; }
    .solutions-section .hscroll-track { padding: 0 clamp(16px,3vw,60px); overflow-x: auto; scroll-snap-type: x mandatory; }
    .solutions-section .hscroll-cards { flex-wrap: nowrap; padding-right: 40px; }
    .solutions-section .hcard { width: 85vw; height: auto; min-height: 380px; scroll-snap-align: start; }
    .solutions-section .hscroll-progress-track { display: none; }
  }
</style>
```

**Step 2: Commit**

```bash
git add src/components/Solutions.astro
git commit -m "feat: add Solutions component with sticky horizontal scroll"
```

---

### Task 10: About.astro

**Files:**
- Create: `src/components/About.astro`

**Step 1: Create the file**

```astro
---
// src/components/About.astro
---
<section id="about" aria-labelledby="about-title">

  <!-- Panel 1: Mission -->
  <div class="about-panel about-panel--dark">
    <div class="container about-panel__inner">
      <div class="about-panel__num" aria-hidden="true">01</div>
      <div class="about-panel__content">
        <p class="section-label" data-i18n="about.mission.label">Our Purpose</p>
        <h2 id="about-title" data-i18n="about.mission.title">Mission</h2>
        <p class="lead" data-i18n="about.mission.body">
          To deliver world-class, integrated technology solutions that secure, connect, and optimize the operations of defense forces, governments, and enterprises across West Africa.
        </p>
      </div>
    </div>
  </div>

  <!-- Panel 2: Vision -->
  <div class="about-panel about-panel--surface">
    <div class="container about-panel__inner">
      <div class="about-panel__num" aria-hidden="true">02</div>
      <div class="about-panel__content">
        <p class="section-label" data-i18n="about.vision.label">Where We're Going</p>
        <h2 data-i18n="about.vision.title">Vision</h2>
        <p class="lead" data-i18n="about.vision.body">
          To be West Africa's most trusted technology partner — known for engineering excellence, local expertise, and the ability to deliver in the most demanding environments.
        </p>
      </div>
    </div>
  </div>

  <!-- Panel 3: Values + CEO -->
  <div class="about-panel about-panel--dark">
    <div class="container about-panel__inner">
      <div class="about-panel__num" aria-hidden="true">03</div>
      <div class="about-panel__content">
        <p class="section-label" data-i18n="about.values.label">What Drives Us</p>
        <h2 data-i18n="about.values.title">Our Values</h2>
        <ul class="values-list">
          <li data-i18n="about.values.li1">Reliability — systems that work when lives depend on them</li>
          <li data-i18n="about.values.li2">Integrity — honest advice, no vendor lock-in</li>
          <li data-i18n="about.values.li3">Excellence — internationally certified, locally proven</li>
          <li data-i18n="about.values.li4">Partnership — long-term relationships over one-time sales</li>
        </ul>
        <blockquote class="ceo-quote">
          <p data-i18n="about.ceo.quote">"Africa's security and connectivity challenges demand solutions built for Africa. We exist to bridge the gap between global technology and the realities on the ground."</p>
          <cite data-i18n="about.ceo.label">Leadership — Techafrik Quantum Group</cite>
        </blockquote>
      </div>
    </div>
  </div>

</section>

<style>
  .about-panel {
    position: relative; overflow: hidden;
    padding: clamp(60px, 8vw, 120px) 0;
    min-height: 60vh; display: flex; align-items: center;
  }
  .about-panel--dark { background: var(--bg); }
  .about-panel--surface { background: var(--surface); }

  .about-panel__inner {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: clamp(32px, 5vw, 80px);
    align-items: center;
  }

  .about-panel__num {
    font-size: clamp(120px, 18vw, 240px);
    font-weight: 800; letter-spacing: -.05em;
    color: var(--accent); opacity: 0.06;
    line-height: 1; user-select: none;
    position: absolute; left: clamp(16px, 3vw, 60px); top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .about-panel__content {
    grid-column: 2;
    position: relative; z-index: 1;
  }
  .about-panel__content h2 {
    font-size: clamp(36px, 5vw, 72px);
    font-weight: 800; letter-spacing: -.04em;
    color: #fff; text-transform: uppercase;
    margin-bottom: clamp(16px, 2vw, 28px);
  }
  .about-panel__content .lead {
    font-size: clamp(16px, 1.8vw, 20px);
    color: var(--muted); max-width: 640px;
  }

  .values-list {
    list-style: none; padding: 0;
    display: flex; flex-direction: column; gap: 14px;
    margin: 24px 0 36px;
  }
  .values-list li {
    font-size: clamp(15px, 1.6vw, 18px);
    color: var(--muted); padding-left: 24px; position: relative;
  }
  .values-list li::before {
    content: '—'; position: absolute; left: 0;
    color: var(--accent); font-weight: 700;
  }

  .ceo-quote {
    border-left: 3px solid var(--accent);
    padding-left: clamp(16px, 2vw, 28px);
    margin-top: 8px;
  }
  .ceo-quote p {
    font-size: clamp(16px, 1.8vw, 20px);
    color: var(--text); font-style: italic;
    line-height: 1.7; margin-bottom: 12px;
  }
  .ceo-quote cite {
    font-size: 13px; color: var(--accent);
    font-style: normal; font-weight: 600;
    letter-spacing: .05em; text-transform: uppercase;
  }

  @media (max-width: 900px) {
    .about-panel__inner { grid-template-columns: 1fr; }
    .about-panel__content { grid-column: 1; }
    .about-panel__num { font-size: clamp(80px, 20vw, 140px); opacity: 0.04; }
  }
</style>
```

**Step 2: Commit**

```bash
git add src/components/About.astro
git commit -m "feat: add About section with stacked panels and faint display numbers"
```

---

### Task 11: Partners.astro

**Files:**
- Create: `src/components/Partners.astro`

**Step 1: Create the file**

```astro
---
// src/components/Partners.astro
const partners = ['Partner 1','Partner 2','Partner 3','Partner 4','Partner 5','Partner 6','Partner 7','Partner 8'];
const testimonials = [
  {
    body: 'partners.t1.body', name: 'partners.t1.name', role: 'partners.t1.role',
    bodyFallback: '"Techafrik Quantum Group delivered a fully integrated surveillance and connectivity solution under a tight deadline. Their local support team made the difference."',
    nameFallback: 'Client Name', roleFallback: 'CTO, [Client Organization]',
  },
  {
    body: 'partners.t2.body', name: 'partners.t2.name', role: 'partners.t2.role',
    bodyFallback: '"Their cybersecurity assessment identified critical gaps in our infrastructure. The SOC onboarding process was professional and thorough."',
    nameFallback: 'Client Name', roleFallback: 'Head of IT Security, [Client Organization]',
  },
  {
    body: 'partners.t3.body', name: 'partners.t3.name', role: 'partners.t3.role',
    bodyFallback: '"The fleet tracking and fuel anti-fraud system reduced our operational losses significantly within the first quarter of deployment."',
    nameFallback: 'Client Name', roleFallback: 'Operations Director, [Client Organization]',
  },
];
---

<section id="partners" aria-labelledby="partners-title" class="partners-section">
  <div class="container">
    <p class="section-label" data-i18n="partners.tech.label">Technology Partners</p>
    <h2 id="partners-title" class="partners-title" data-i18n="partners.tech.title">Our Partners</h2>

    <div class="partners-grid">
      {partners.map(p => (
        <div class="partner-card">{p}</div>
      ))}
    </div>

    <div class="testimonials">
      <p class="section-label" data-i18n="partners.testimonials.label">What They Say</p>
      <h3 class="testimonials-title" data-i18n="partners.testimonials.title">Client Testimonials</h3>
      <div class="testimonials-grid">
        {testimonials.map(t => (
          <div class="tcard">
            <div class="tcard__quote" aria-hidden="true">&ldquo;</div>
            <p class="tcard__body" data-i18n={t.body}>{t.bodyFallback}</p>
            <cite class="tcard__cite">
              <strong data-i18n={t.name}>{t.nameFallback}</strong>
              <span data-i18n={t.role}>{t.roleFallback}</span>
            </cite>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

<style>
  .partners-section {
    background: var(--surface-2);
    padding: clamp(60px, 8vw, 120px) 0;
  }
  .partners-title {
    font-size: clamp(32px, 5vw, 64px); font-weight: 800;
    letter-spacing: -.04em; color: #fff;
    text-transform: uppercase; margin-bottom: clamp(32px, 4vw, 56px);
  }
  .partners-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px; margin-bottom: clamp(48px, 6vw, 96px);
  }
  .partner-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 28px 20px;
    display: flex; align-items: center; justify-content: center;
    min-height: 100px; color: var(--muted); font-size: 13px;
    text-align: center; font-weight: 500;
    transition: border-color .2s, background .2s;
  }
  .partner-card:hover { border-color: var(--accent); background: rgba(245,165,36,.04); }

  .testimonials { margin-top: clamp(32px, 4vw, 64px); }
  .testimonials-title {
    font-size: clamp(24px, 3vw, 40px); font-weight: 800;
    letter-spacing: -.03em; color: #fff;
    margin-bottom: clamp(24px, 3vw, 48px);
  }
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
  .tcard {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: var(--radius-lg); padding: clamp(24px, 3vw, 36px);
    position: relative; overflow: hidden;
    transition: border-color .2s, box-shadow .2s;
  }
  .tcard:hover { border-color: rgba(255,255,255,.12); box-shadow: 0 4px 32px rgba(0,0,0,.5); }
  .tcard__quote {
    font-size: 80px; line-height: 1;
    color: var(--accent); opacity: 0.15;
    font-family: Georgia, serif;
    position: absolute; top: 8px; left: 16px;
    pointer-events: none;
  }
  .tcard__body {
    color: var(--muted); font-size: 15px; line-height: 1.75;
    margin: 0 0 20px; padding-top: 28px;
  }
  .tcard__cite {
    display: block; font-style: normal;
    border-top: 1px solid var(--border); padding-top: 16px;
  }
  .tcard__cite strong { display: block; font-size: 14px; color: var(--text); font-weight: 600; }
  .tcard__cite span { display: block; color: var(--muted); font-size: 13px; margin-top: 2px; }
</style>
```

**Step 2: Commit**

```bash
git add src/components/Partners.astro
git commit -m "feat: add Partners section with logo grid and testimonials"
```

---

### Task 12: Contact.astro

**Files:**
- Create: `src/components/Contact.astro`

**Step 1: Create the file**

```astro
---
// src/components/Contact.astro
---
<section id="contact" aria-labelledby="contact-title" class="contact-section">
  <div class="container contact-split">

    <!-- LEFT: Form -->
    <div class="contact-form-col">
      <p class="section-label" data-i18n="contact.form.label">Send a Message</p>
      <h2 id="contact-title" class="contact-title" data-i18n="contact.form.title">How Can We Help?</h2>

      <form id="contact-form" class="contact-form" novalidate>
        <div class="form-row">
          <label for="c-name" data-i18n="contact.name">Full name</label>
          <input id="c-name" class="input" type="text" required autocomplete="name" />
        </div>
        <div class="form-row">
          <label for="c-email" data-i18n="contact.email">Work email</label>
          <input id="c-email" class="input" type="email" required autocomplete="email" />
        </div>
        <div class="form-row">
          <label for="c-company" data-i18n="contact.company">Company</label>
          <input id="c-company" class="input" type="text" autocomplete="organization" />
        </div>
        <div class="form-row">
          <label for="c-topic" data-i18n="contact.topic">Topic</label>
          <select id="c-topic" class="input">
            <option data-i18n="nav.safety">Safety &amp; Surveillance</option>
            <option data-i18n="nav.connectivity">Critical Connectivity</option>
            <option data-i18n="nav.assets">Assets Management</option>
            <option data-i18n="nav.ipnetworks">IP Networks</option>
            <option data-i18n="nav.cyber">Cybersecurity</option>
          </select>
        </div>
        <div class="form-row">
          <label for="c-message" data-i18n="contact.message">Message</label>
          <textarea id="c-message" class="textarea" rows="5" required></textarea>
        </div>
        <button class="btn btn--primary" type="submit" data-i18n="contact.submit">Send Message</button>
      </form>
    </div>

    <!-- RIGHT: Info -->
    <div class="contact-info-col">
      <div class="contact-info">
        <div class="contact-info__item">
          <p class="contact-info__label" data-i18n="contact.email.title">Email</p>
          <a href="mailto:info@techafrikquantumgroup.com" class="contact-info__value">
            info@techafrikquantumgroup.com
          </a>
        </div>
        <div class="contact-info__item">
          <p class="contact-info__label" data-i18n="contact.location.title">Location</p>
          <p class="contact-info__value">Conakry, Guinea<br />West Africa</p>
        </div>
        <div class="contact-info__item">
          <p class="contact-info__label" data-i18n="contact.careers.title">Careers</p>
          <a href="mailto:careers@techafrikquantumgroup.com" class="contact-info__value">
            careers@techafrikquantumgroup.com
          </a>
        </div>
        <div class="contact-social">
          <a href="#" class="social-icon" aria-label="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="#" class="social-icon" aria-label="Twitter / X">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" class="social-icon" aria-label="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </div>
      </div>
    </div>

  </div>
</section>

<script>
(function(){
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('c-name').value.trim();
    const email = document.getElementById('c-email').value.trim();
    const company = document.getElementById('c-company').value.trim();
    const topic = document.getElementById('c-topic').value;
    const message = document.getElementById('c-message').value.trim();
    const subject = `Contact: ${topic}`;
    const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nTopic: ${topic}\nMessage: ${message}`;
    window.location.href = `mailto:info@techafrikquantumgroup.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
</script>

<style>
  .contact-section { background: var(--bg); padding: clamp(60px, 8vw, 120px) 0; }
  .contact-split {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: clamp(40px, 6vw, 100px); align-items: start;
  }
  .contact-title {
    font-size: clamp(32px, 4vw, 60px); font-weight: 800;
    letter-spacing: -.04em; color: #fff;
    text-transform: uppercase; margin-bottom: clamp(24px, 3vw, 40px);
  }
  .contact-form { display: grid; gap: 20px; }
  .contact-info {
    padding-left: clamp(20px, 3vw, 48px);
    border-left: 2px solid var(--accent);
  }
  .contact-info__item { margin-bottom: 36px; }
  .contact-info__label {
    font-size: 11px; font-weight: 700; letter-spacing: .15em;
    text-transform: uppercase; color: var(--accent); margin-bottom: 8px;
  }
  .contact-info__value {
    font-size: clamp(14px, 1.5vw, 17px); color: var(--text);
    line-height: 1.6; display: block;
    transition: color .15s;
  }
  a.contact-info__value:hover { color: var(--accent); }
  .contact-social { display: flex; gap: 10px; margin-top: 40px; }
  .social-icon {
    display: inline-flex; align-items: center; justify-content: center;
    width: 38px; height: 38px; border-radius: 10px;
    border: 1px solid var(--border); color: var(--muted);
    transition: color .15s, border-color .15s, background .15s;
  }
  .social-icon:hover { color: var(--accent); border-color: var(--accent); background: var(--accent-dim); }

  @media (max-width: 768px) {
    .contact-split { grid-template-columns: 1fr; }
    .contact-info { border-left: none; border-top: 2px solid var(--accent); padding-left: 0; padding-top: 36px; }
  }
</style>
```

**Step 2: Commit**

```bash
git add src/components/Contact.astro
git commit -m "feat: add Contact section with split form/info layout"
```

---

### Task 13: Footer.astro

**Files:**
- Create: `src/components/Footer.astro`

**Step 1: Create the file**

```astro
---
// src/components/Footer.astro
const base = import.meta.env.BASE_URL;
const year = new Date().getFullYear();
---
<footer class="site-footer" role="contentinfo">
  <div class="container footer-strip">
    <a class="footer-logo" href={`${base}`} aria-label="Techafrik Quantum Group home">
      <img src={`${base}logo.png`} alt="Techafrik Quantum Group" width="40" height="40" decoding="async" />
    </a>
    <p class="footer-copy" data-i18n="footer.copyright">
      &copy; {year} Techafrik Quantum Group. All rights reserved.
    </p>
    <div class="footer-social">
      <a href="#" class="social-icon" aria-label="LinkedIn">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
      </a>
      <a href="#" class="social-icon" aria-label="Twitter / X">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href="#" class="social-icon" aria-label="Facebook">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
      </a>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    background: var(--surface); border-top: 1px solid var(--border);
    padding: clamp(16px, 2vw, 24px) 0;
  }
  .footer-strip {
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; flex-wrap: wrap;
  }
  .footer-logo img { border-radius: 6px; object-fit: contain; }
  .footer-copy { font-size: 13px; color: var(--muted); margin: 0; }
  .footer-social { display: flex; gap: 8px; }
  .social-icon {
    display: inline-flex; align-items: center; justify-content: center;
    width: 32px; height: 32px; border-radius: 8px;
    border: 1px solid var(--border); color: var(--muted);
    transition: color .15s, border-color .15s;
  }
  .social-icon:hover { color: var(--text); border-color: rgba(255,255,255,.2); }
  @media (max-width: 600px) {
    .footer-strip { justify-content: center; text-align: center; }
  }
</style>
```

**Step 2: Commit**

```bash
git add src/components/Footer.astro
git commit -m "feat: add minimal Footer component"
```

---

### Task 14: nav.js + index.astro

**Files:**
- Create: `src/scripts/nav.js`
- Create: `src/pages/index.astro`

**Step 1: Create nav.js**

```js
// src/scripts/nav.js
(function () {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  /* Scroll state — transparent to frosted */
  window.addEventListener('scroll', function () {
    header.classList.toggle('is-scrolled', window.scrollY > 60);
  }, { passive: true });

  /* Smooth scroll on nav link click */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
        navList.classList.remove('is-open');
        toggle && toggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  /* Active section highlight via IntersectionObserver */
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(function (s) { observer.observe(s); });

  /* Mobile hamburger */
  toggle && toggle.addEventListener('click', function () {
    var open = navList.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
})();
```

**Step 2: Create src/pages/index.astro**

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import Sectors from '../components/Sectors.astro';
import Solutions from '../components/Solutions.astro';
import About from '../components/About.astro';
import Partners from '../components/Partners.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---
<Layout
  title="Techafrik Quantum Group — Secure. Connect. Protect."
  description="Defense-grade surveillance, critical connectivity, and intelligent fleet management across West Africa."
>
  <Nav />
  <main id="main">
    <Hero />
    <Sectors />
    <Solutions />
    <About />
    <Partners />
    <Contact />
  </main>
  <Footer />
</Layout>
```

**Step 3: Commit**

```bash
git add src/scripts/nav.js src/pages/index.astro
git commit -m "feat: assemble index.astro with all sections and nav scroll logic"
```

---

### Task 15: Port i18n.js to src/scripts

**Files:**
- Create: `src/scripts/i18n.js`

**Step 1:** Copy the full content from `docs/plans/2026-03-06-i18n-implementation.md` Task 1 code block into `src/scripts/i18n.js`.

Add to the translations object these new hero keys that the redesign introduced:

```js
// Add to each language in translations:
// EN additions:
"hero.eyebrow": "West Africa's Defense & Connectivity Leader",
"hero.line1": "SECURE.",
"hero.line2": "CONNECT.",
"hero.line3": "PROTECT.",

// FR additions:
"hero.eyebrow": "Leader en Défense & Connectivité en Afrique de l'Ouest",
"hero.line1": "SÉCURISER.",
"hero.line2": "CONNECTER.",
"hero.line3": "PROTÉGER.",

// AR additions:
"hero.eyebrow": "رائد الدفاع والاتصال في غرب أفريقيا",
"hero.line1": "آمن.",
"hero.line2": "اتصل.",
"hero.line3": "احمِ.",
```

**Step 2: Commit**

```bash
git add src/scripts/i18n.js
git commit -m "feat: add i18n script with EN/FR/AR translations to Astro"
```

---

### Task 16: Test local build

**Step 1: Run dev server**

```bash
npm run dev
```

Expected: Server at http://localhost:4321/techafrikquantum-site/

**Step 2: Verify in browser**
- [ ] Hero fills full viewport, particle canvas visible
- [ ] Nav transparent over hero, frosted after scrolling past hero
- [ ] Clicking nav links smooth-scrolls to sections
- [ ] Sectors section: horizontal scroll works as page scrolls
- [ ] Solutions section: same
- [ ] About panels display with faint large numbers
- [ ] Partners: logo grid + testimonials
- [ ] Contact: split layout, form submits mailto
- [ ] Footer: minimal strip
- [ ] EN/FR/AR switcher works
- [ ] Mobile (<768px): cards scroll horizontally with swipe, hamburger opens

**Step 3: Build for production**

```bash
npm run build
npm run preview
```

Expected: Preview at http://localhost:4321/techafrikquantum-site/

**Step 4: Fix any build errors, then commit**

```bash
git add -A
git commit -m "fix: resolve build issues"
```

---

### Task 17: Push and deploy

**Step 1: Push to GitHub**

```bash
git push origin main
```

**Step 2: Watch GitHub Actions**

Go to: https://github.com/alphabynta/techafrikquantum-site/actions

Expected: "Deploy to GitHub Pages" workflow runs and completes green.

**Step 3: Verify live site**

Open: https://alphabynta.github.io/techafrikquantum-site/

**Step 4: Tag the release**

```bash
git tag v3.0-astro-redesign && git push origin v3.0-astro-redesign
```

---

## Notes

- The existing HTML files (index.html, sectors.html, etc.) will be overridden by Astro's `dist/` output on deploy. Keep them for reference until the Astro build is confirmed working.
- `import.meta.env.BASE_URL` in Astro automatically resolves to `/techafrikquantum-site/` based on `astro.config.mjs`.
- The `<style>` blocks in `.astro` files are scoped by default. Only `global.css` rules apply globally.
- Scripts in `<script>` tags inside `.astro` components are bundled by Astro automatically — no need to import them manually in Layout unless using `src="../scripts/file.js"` with `is:inline`.
- For `is:inline` scripts (raw JS), use `<script is:inline src={...}>` — Astro won't process them, they run as-is.
