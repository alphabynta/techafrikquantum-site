# Who We Are Section + Solution Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a "Who We Are" section between Hero and Sectors, remove "Explore Solutions" from Hero, and replace "Contact Us" buttons on solution cards with "Learn More" links to dedicated placeholder solution pages.

**Architecture:** Single-page Astro site (static output) deployed to GitHub Pages at `/techafrikquantum-site/`. All changes are in `src/`. New solution pages go in `src/pages/solutions/`. The `base` URL is `/techafrikquantum-site/` — always use `${base}` prefix for internal links.

**Tech Stack:** Astro (static), vanilla JS (i18n), CSS custom properties, GitHub Pages

---

### Task 1: Remove "Explore Solutions" button from Hero

**Files:**
- Modify: `src/components/Hero.astro`
- Modify: `src/scripts/i18n.js`

**Step 1: Edit Hero.astro — remove the Explore Solutions anchor**

In `src/components/Hero.astro`, remove this line from the `cta-group` div:
```html
<a class="btn btn--primary" href="#solutions" data-i18n="hero.cta">Explore Solutions</a>
```
The `cta-group` div should only contain the Contact Us button after this change:
```html
<div class="cta-group">
  <a class="btn btn--ghost" href="#contact" data-i18n="hero.cta2">Contact Us</a>
</div>
```

**Step 2: Remove hero.cta i18n keys from i18n.js**

In `src/scripts/i18n.js`, remove the following keys from all three language blocks (en, fr, ar):
- `'hero.cta': 'Explore Solutions'` (EN)
- `'hero.cta': 'Explorer les Solutions'` (FR)
- `'hero.cta': 'استكشف الحلول'` (AR)

**Step 3: Commit**

```bash
cd /home/samuel/alimou/techafrikquantum-site
git add src/components/Hero.astro src/scripts/i18n.js
git commit -m "feat: remove Explore Solutions button from hero"
git push origin main
```

---

### Task 2: Create WhoWeAre component

**Files:**
- Create: `src/components/WhoWeAre.astro`

**Step 1: Create the file**

```astro
---
---
<section id="who-we-are" aria-labelledby="wwa-title">
  <div class="about-panel about-panel--dark">
    <div class="container about-panel__inner">
      <div class="about-panel__content">
        <p class="section-label">Who We Are</p>
        <h2 id="wwa-title" data-i18n="whoweare.title">WHO WE ARE</h2>
        <p class="lead" data-i18n="whoweare.body">
          Techafrik Quantum Group is one of West Africa's fastest-growing system integrators — evolved from a specialized fleet management and fuel monitoring company into a multi-platform integrator. We design, build, and implement IT and telecommunications solutions across defense, government, enterprise, cellular &amp; mobility, and energy sectors.
        </p>
      </div>
    </div>
  </div>
</section>
```

Note: This reuses the `.about-panel`, `.about-panel--dark`, `.about-panel__inner`, `.about-panel__content`, and `.lead` classes from `About.astro`. No new CSS needed — the styles are shared via global scope.

**Step 2: Commit**

```bash
git add src/components/WhoWeAre.astro
git commit -m "feat: add WhoWeAre component"
git push origin main
```

---

### Task 3: Add i18n keys for WhoWeAre

**Files:**
- Modify: `src/scripts/i18n.js`

**Step 1: Add EN keys** — after the `hero` block in the `en` object:

```js
/* WHO WE ARE */
'whoweare.title': 'WHO WE ARE',
'whoweare.body': "Techafrik Quantum Group is one of West Africa's fastest-growing system integrators — evolved from a specialized fleet management and fuel monitoring company into a multi-platform integrator. We design, build, and implement IT and telecommunications solutions across defense, government, enterprise, cellular & mobility, and energy sectors.",
```

**Step 2: Add FR keys** — in the `fr` object, same position:

```js
/* WHO WE ARE */
'whoweare.title': 'QUI NOUS SOMMES',
'whoweare.body': "Techafrik Quantum Group est l'un des intégrateurs de systèmes à la croissance la plus rapide en Afrique de l'Ouest — né d'une entreprise spécialisée dans la gestion de flotte et la surveillance du niveau de carburant, devenu un intégrateur multi-plateformes. Nous concevons, construisons et mettons en œuvre des solutions IT et télécommunications dans les secteurs de la défense, du gouvernement, de l'entreprise, du cellulaire et de la mobilité, et de l'énergie.",
```

**Step 3: Add AR keys** — in the `ar` object, same position:

```js
/* WHO WE ARE */
'whoweare.title': 'من نحن',
'whoweare.body': 'تعدّ مجموعة تيكافريك كوانتم من أسرع شركات تكامل الأنظمة نموًا في غرب أفريقيا — انطلقت من شركة متخصصة في إدارة الأسطول ومراقبة مستوى الوقود، لتتحول إلى مُدمج متعدد المنصات. نصمم ونبني وننفذ حلول تكنولوجيا المعلومات والاتصالات عبر قطاعات الدفاع والحكومة والمؤسسات والاتصالات والتنقل والطاقة.',
```

**Step 4: Commit**

```bash
git add src/scripts/i18n.js
git commit -m "feat: add i18n keys for Who We Are section"
git push origin main
```

---

### Task 4: Insert WhoWeAre into index.astro

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Import and insert the component**

Add the import at the top of the frontmatter block:
```js
import WhoWeAre from '../components/WhoWeAre.astro';
```

Update the `<main>` order:
```astro
<main id="main">
  <Hero />
  <WhoWeAre />
  <Sectors />
  <Solutions />
  <About />
  <Partners />
  <Contact />
</main>
```

**Step 2: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: insert WhoWeAre section between Hero and Sectors"
git push origin main
```

---

### Task 5: Replace "Contact Us" with "Learn More" on solution cards

**Files:**
- Modify: `src/components/Solutions.astro`

**Step 1: Add slug-to-path mapping**

In the frontmatter of `Solutions.astro`, add a `slug` field to each solution object:

```js
const solutions = [
  { id: 'safety',      slug: 'safety',       ... },
  { id: 'connectivity', slug: 'connectivity', ... },
  { id: 'assets',      slug: 'assets',       ... },
  { id: 'ipnetworks',  slug: 'ip-networks',  ... },
  { id: 'cyber',       slug: 'cybersecurity', ... },
];
```

**Step 2: Replace the CTA anchor**

Replace:
```html
<a class="btn btn--ghost sol-panel__cta" href="#contact">Contact Us</a>
```

With:
```astro
<a class="btn btn--ghost sol-panel__cta" href={`${base}solutions/${s.slug}`}>Learn More</a>
```

**Step 3: Commit**

```bash
git add src/components/Solutions.astro
git commit -m "feat: replace Contact Us with Learn More on solution cards"
git push origin main
```

---

### Task 6: Create placeholder solution pages

**Files:**
- Create: `src/pages/solutions/safety.astro`
- Create: `src/pages/solutions/connectivity.astro`
- Create: `src/pages/solutions/assets.astro`
- Create: `src/pages/solutions/ip-networks.astro`
- Create: `src/pages/solutions/cybersecurity.astro`

**Step 1: Create each placeholder page**

Use this template for all 5 files (replace `[Solution Name]` accordingly):

```astro
---
import Layout from '../../layouts/Layout.astro';
import Nav from '../../components/Nav.astro';
import Footer from '../../components/Footer.astro';
const base = import.meta.env.BASE_URL;
---
<Layout title="[Solution Name] — Techafrik Quantum Group">
  <Nav />
  <main id="main" style="min-height:100vh;display:flex;align-items:center;justify-content:center;">
    <div style="text-align:center;padding:2rem;">
      <p class="section-label">[Solution Name]</p>
      <h1 style="font-size:clamp(36px,5vw,72px);font-weight:800;color:var(--accent);text-transform:uppercase;letter-spacing:-.04em;">Coming Soon</h1>
      <p style="color:var(--muted);margin-top:1rem;">Full content for this page is on the way.</p>
      <a class="btn btn--ghost" href={`${base}`} style="margin-top:2rem;display:inline-block;">← Back to Home</a>
    </div>
  </main>
  <Footer />
</Layout>
```

Pages and their `[Solution Name]` values:
- `safety.astro` → `Safety & Surveillance`
- `connectivity.astro` → `Critical Connectivity`
- `assets.astro` → `Assets Management`
- `ip-networks.astro` → `IP Networks`
- `cybersecurity.astro` → `Cybersecurity`

**Step 2: Commit**

```bash
git add src/pages/solutions/
git commit -m "feat: add placeholder pages for all solution routes"
git push origin main
```

---

## Verification

After all tasks, verify locally:

```bash
cd /home/samuel/alimou/techafrikquantum-site
npm run build
```

Expected: build completes with no errors. Check `dist/` for solution pages at `dist/solutions/safety/index.html` etc.
