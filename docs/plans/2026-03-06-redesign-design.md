# Full Website Redesign — Design Doc
Date: 2026-03-06

## Goal
Redesign the TechAfrikQuantum site from a 6-page multi-page site into a single-page scrolling experience with a bold, dramatic, enterprise aesthetic inspired by Palantir, Newtec, and Carrd.

## Reference Sites
- https://www.palantir.com/ — dramatic dark hero, large display type, sticky scroll effects
- https://www.newtec.com/ — clean enterprise, professional sections
- https://carrd.co/ — minimal, confident, centered layouts

---

## Page Structure (single index.html)

All content lives in one page. Existing multi-page HTML files (sectors, solutions, about, partners, contact) are removed or kept for deep-link fallback. Nav links are smooth-scroll anchors.

```
<nav>          sticky, transparent → frosted on scroll
#hero          full-screen animated background + bold headline
#sectors       sticky horizontal scroll — 6 sector cards
#solutions     sticky horizontal scroll — 5 solution cards
#about         stacked full-width panels (Mission, Vision, Values)
#partners      logo grid + testimonials
#contact       split layout — form left, info right
<footer>       minimal strip
```

---

## Navigation

- Position: `fixed`, `top: 0`, `z-index: 100`, full width
- Default state: `background: transparent`, no border
- Scrolled state (past hero): `background: rgba(0,0,0,0.92)`, `backdrop-filter: blur(16px)`, `border-bottom: 1px solid #2a2a2a`
- Transition: 0.3s ease on background and border
- Left: logo (200px img)
- Center/Right: nav links — Home · Sectors · Solutions · About · Partners · Contact
- Far right: lang switcher (EN · FR · AR pills)
- Mobile: hamburger, full-screen overlay menu
- Active section: amber underline on current nav link (IntersectionObserver)

---

## #hero

- Height: `100vh`, min-height `600px`
- Background: `#000`
- Animated background: Canvas 2D particle network — slow-moving white dots connected by faint lines, opacity ~0.15. Subtle, not distracting. Respects `prefers-reduced-motion`.
- Layout: centered vertically and horizontally, text left-aligned within container
- Eyebrow label: small amber uppercase text (e.g. "West Africa's Defense & Connectivity Leader")
- Headline: `clamp(48px, 7vw, 96px)`, weight 800, uppercase, letter-spacing -0.03em, line-height 1.05, white. Key word(s) in amber.
  - Example: `SECURE. CONNECT.\nPROTECT.`
- Subheadline: `clamp(16px, 2vw, 22px)`, color `#808080`, max-width 580px, line-height 1.6
- CTA group: amber filled button + ghost outline button, gap 16px
- Trust strip: 3 small pills below CTAs (Defense-Grade · West Africa Coverage · 24/7 Support)
- Scroll indicator: animated chevron at bottom center

---

## #sectors (Sticky Horizontal Scroll)

- Section height: `100vh`, `position: sticky`, `top: 0`
- Outer wrapper has height = `100vh * number_of_cards` so scroll distance maps to card travel
- JS: on scroll, translate cards container horizontally based on scroll progress
- Section label: "SECTORS" — small amber uppercase, top left
- 6 cards, each ~380px wide × full inner height
- Card anatomy:
  - Amber top border (3px)
  - Dark grey background `#111`
  - Large amber sector number (01–06), very faint, absolute positioned
  - Bold title: `clamp(24px, 3vw, 36px)`, white, weight 800
  - Body text: `14px`, `#808080`, line-height 1.7
  - 3 outcome pills (amber tinted)
  - Ghost CTA button "Learn More" → links to #contact
- Progress bar: thin amber line at bottom, width = scroll progress through section
- Cards: Defense · Government · Enterprise · Oil & Gas · Cellular · Mobility

---

## #solutions (Sticky Horizontal Scroll)

- Same sticky horizontal scroll mechanic as #sectors
- 5 cards: Safety & Surveillance · Critical Connectivity · Assets Management · IP Networks · Cybersecurity
- Same card anatomy as sectors
- Alternating section background: `#0d0d0d` (vs sectors which is `#000`)

---

## #about

- Background alternates: black / `#0d0d0d`
- 3 panels stacked vertically, each ~80vh
- Panel layout: two columns — left has giant faint number (01, 02, 03) in amber, right has content
- Panel 1 — Mission: headline + body paragraph
- Panel 2 — Vision: headline + body paragraph
- Panel 3 — Values: headline + checklist (4 items) + CEO quote blockquote
- Display numbers: `clamp(120px, 18vw, 220px)`, weight 800, amber, opacity 0.08, absolute behind content
- Headline: `clamp(32px, 5vw, 64px)`, weight 800, white

---

## #partners

- Background: `#111`
- Partner logo grid: `repeat(auto-fill, minmax(160px, 1fr))`, logo cards with border, hover brightens
- Below grid: 3 testimonial cards in a row (dark grey, amber quote mark, cite with role)

---

## #contact

- Background: `#000`
- Two-column layout (50/50 on desktop, stacked on mobile)
- Left: section label, bold headline, lead form (name, email, company, topic, message, send button)
- Right:
  - Email with amber link
  - Location (Conakry, Guinea — West Africa)
  - Careers email
  - Social icons (LinkedIn, X, Facebook)
  - Amber vertical accent line on far left of right column

---

## Footer

- Background: `#0d0d0d`, border-top `#2a2a2a`
- Single row: logo left, copyright center, social icons right
- Minimal — no full link columns (those are in the nav and sections)

---

## CSS Architecture

- All existing `style.css` tokens kept (--primary, --accent, --bg, etc.)
- New additions:
  - `.hero` — full-screen with particle canvas
  - `.h-scroll-outer` / `.h-scroll-track` / `.h-scroll-cards` — sticky horizontal scroll rig
  - `.h-card` — individual horizontal scroll card
  - `.about-panel` — full-width about sections
  - `.progress-bar` — amber scroll progress indicator
  - Nav scroll state: `.site-header.is-scrolled` class toggled by JS

## JS Architecture

- `js/nav.js` — scroll state toggle, smooth scroll, active section highlight (IntersectionObserver), mobile menu
- `js/hscroll.js` — sticky horizontal scroll logic for #sectors and #solutions
- `js/hero-canvas.js` — particle network animation
- `js/i18n.js` — existing (from parallel session)
- `js/skins.js` — existing contact form mailto handler

---

## Files Changed

| File | Action |
|------|--------|
| `index.html` | Full rewrite — single page with all sections |
| `style.css` | Major additions for new components |
| `js/nav.js` | New — scroll/nav logic |
| `js/hscroll.js` | New — horizontal scroll rig |
| `js/hero-canvas.js` | New — particle animation |
| `sectors.html` | Keep for deep links / SEO fallback |
| `solutions.html` | Keep for deep links / SEO fallback |
| `about.html` | Keep for deep links / SEO fallback |
| `partners.html` | Keep for deep links / SEO fallback |
| `contact.html` | Keep for deep links / SEO fallback |

---

## Responsive

- Desktop (>900px): full sticky horizontal scroll, two-col contact, side-by-side about panels
- Tablet (600–900px): horizontal scroll still works, about panels stack
- Mobile (<600px): horizontal scroll becomes vertical stack of cards, contact stacks, hamburger nav

## Accessibility

- `prefers-reduced-motion`: disable particle animation and scroll-triggered transitions
- All sections have `aria-labelledby`
- Nav links have `aria-current="true"` for active section
- Canvas has `aria-hidden="true"`
- Focus visible on all interactive elements
