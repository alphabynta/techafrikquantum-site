# Scroll Background Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace Sectors/Solutions sections with WhoWeAre/WhatWeBuild, update section IDs, and wire up smooth per-section background color transitions on scroll.

**Architecture:** Each section has a bg-config file with a `bgColor` property. The IntersectionObserver in `bg-engine.js` reads that value and updates `#page-bg`'s `background-color` directly. CSS `transition: background-color 0.9s ease` handles the fade.

**Tech Stack:** Astro (static site), vanilla JS, CSS custom properties.

---

### Task 1: Update index.astro — swap Sectors for WhoWeAre

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Replace Sectors import and usage with WhoWeAre**

Change `src/pages/index.astro` to:

```astro
---
import Layout from '../layouts/Layout.astro';
import Nav from '../components/Nav.astro';
import Hero from '../components/Hero.astro';
import WhoWeAre from '../components/WhoWeAre.astro';
import Solutions from '../components/Solutions.astro';
import Partners from '../components/Partners.astro';
import Contact from '../components/Contact.astro';
import Footer from '../components/Footer.astro';
---
<Layout
  title="TechAfrik Quantum Group — Secure. Connect. Protect."
  description="Mission-critical surveillance, secure connectivity, advanced cybersecurity, and intelligent fleet management — from Africa to the world."
>
  <Nav />
  <main id="main">
    <Hero />
    <WhoWeAre />
    <Solutions />
    <Partners />
    <Contact />
  </main>
  <Footer />
</Layout>
```

**Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: swap Sectors for WhoWeAre in page layout"
```

---

### Task 2: Update Solutions section ID to "what-we-build"

**Files:**
- Modify: `src/components/Solutions.astro:53`

**Step 1: Change the section id**

Find: `<section id="solutions"`
Replace with: `<section id="what-we-build"`

**Step 2: Commit**

```bash
git add src/components/Solutions.astro
git commit -m "feat: rename solutions section id to what-we-build"
```

---

### Task 3: Add new bg-section config files

**Files:**
- Create: `src/scripts/bg-sections/who-we-are.js`
- Create: `src/scripts/bg-sections/what-we-build.js`

**Step 1: Create who-we-are.js**

```js
/* ── Who We Are background config ──────────────────────────────
   rgb          — particle + link colour (R,G,B)
   bgColor      — page background colour for this section
   particleAlpha— dot opacity  0–1
   showLinks    — draw connecting lines between dots
   ──────────────────────────────────────────────────────────────── */
export default {
  rgb:          '245,165,36',
  bgColor:      '#0d0900',
  particleAlpha: 0.80,
  showLinks:    true,
};
```

**Step 2: Create what-we-build.js**

```js
/* ── What We Build background config ───────────────────────────
   ──────────────────────────────────────────────────────────────── */
export default {
  rgb:          '107,142,35',
  bgColor:      '#050a02',
  particleAlpha: 0.80,
  showLinks:    true,
};
```

**Step 3: Commit**

```bash
git add src/scripts/bg-sections/who-we-are.js src/scripts/bg-sections/what-we-build.js
git commit -m "feat: add who-we-are and what-we-build bg-section configs"
```

---

### Task 4: Add bgColor to remaining section configs

**Files:**
- Modify: `src/scripts/bg-sections/hero.js`
- Modify: `src/scripts/bg-sections/partners.js`
- Modify: `src/scripts/bg-sections/contact.js`

**Step 1: Update hero.js**

```js
export default {
  rgb:          '60,60,60',
  bgColor:      '#000000',
  particleAlpha: 0.80,
  showParticles: true,
  showLinks:    true,
};
```

**Step 2: Update partners.js**

```js
export default {
  rgb:          '160,160,160',
  bgColor:      '#060608',
  particleAlpha: 0.80,
  showLinks:    true,
};
```

**Step 3: Update contact.js**

```js
export default {
  rgb:          '255,255,255',
  bgColor:      '#0d0d0d',
  particleAlpha: 0.80,
  showLinks:    true,
};
```

**Step 4: Commit**

```bash
git add src/scripts/bg-sections/hero.js src/scripts/bg-sections/partners.js src/scripts/bg-sections/contact.js
git commit -m "feat: add bgColor to hero, partners, contact bg configs"
```

---

### Task 5: Update bg-engine.js — swap imports and wire up bgColor

**Files:**
- Modify: `src/scripts/bg-engine.js`

**Step 1: Replace sector/solutions imports with who-we-are/what-we-build**

At the top of `bg-engine.js`, replace:

```js
import heroConfig     from './bg-sections/hero.js';
import sectorsConfig  from './bg-sections/sectors.js';
import solutionsConfig from './bg-sections/solutions.js';
import aboutConfig    from './bg-sections/about.js';
import partnersConfig from './bg-sections/partners.js';
import contactConfig  from './bg-sections/contact.js';
```

With:

```js
import heroConfig       from './bg-sections/hero.js';
import whoWeAreConfig   from './bg-sections/who-we-are.js';
import whatWeBuildConfig from './bg-sections/what-we-build.js';
import partnersConfig   from './bg-sections/partners.js';
import contactConfig    from './bg-sections/contact.js';
```

**Step 2: Update SECTION_CONFIGS map**

Replace:

```js
const SECTION_CONFIGS = {
  hero:      heroConfig,
  sectors:   sectorsConfig,
  solutions: solutionsConfig,
  about:     aboutConfig,
  partners:  partnersConfig,
  contact:   contactConfig,
};
```

With:

```js
const SECTION_CONFIGS = {
  hero:          heroConfig,
  'who-we-are':  whoWeAreConfig,
  'what-we-build': whatWeBuildConfig,
  partners:      partnersConfig,
  contact:       contactConfig,
};
```

**Step 3: Wire up bgColor in the IntersectionObserver**

Find the observer callback (around line 385):

```js
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting && SECTION_CONFIGS[entry.target.id]) {
      cfg = SECTION_CONFIGS[entry.target.id];
    }
  });
}, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });
```

Replace with:

```js
const pageBg = document.getElementById('page-bg');

const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting && SECTION_CONFIGS[entry.target.id]) {
      cfg = SECTION_CONFIGS[entry.target.id];
      if (pageBg && cfg.bgColor) pageBg.style.backgroundColor = cfg.bgColor;
    }
  });
}, { rootMargin: '-35% 0px -35% 0px', threshold: 0 });
```

**Step 4: Commit**

```bash
git add src/scripts/bg-engine.js
git commit -m "feat: wire up scroll background color transitions per section"
```

---

### Task 6: Delete unused bg-section config files

**Files:**
- Delete: `src/scripts/bg-sections/sectors.js`
- Delete: `src/scripts/bg-sections/solutions.js`
- Delete: `src/scripts/bg-sections/about.js`

**Step 1: Remove old files**

```bash
git rm src/scripts/bg-sections/sectors.js src/scripts/bg-sections/solutions.js src/scripts/bg-sections/about.js
```

**Step 2: Commit**

```bash
git commit -m "chore: remove unused sectors, solutions, about bg-section configs"
```

---

### Task 7: Build and verify

**Step 1: Run the build**

```bash
npm run build
```

Expected: No errors. `dist/` generated.

**Step 2: Preview locally**

```bash
npm run preview
```

Open browser, scroll through sections. Verify:
- Hero: pure black bg
- Who We Are: amber-warm dark bg
- What We Build: olive-dark bg
- Partners: cool grey bg
- Contact: neutral dark bg
- Transitions are smooth (0.9s fade)

**Step 3: Push to GitHub**

```bash
git push origin main
```
