# Design: Who We Are Section + Solution Pages

**Date:** 2026-03-07

## Summary

Add a "Who We Are" section to the homepage between Hero and Sectors, remove "Explore Solutions" from Hero, keep "Contact Us" in Hero, and replace "Contact Us" buttons on each solution card with "Learn More" buttons linking to dedicated solution pages.

---

## 1. Page Order (index.astro)

```
<Hero />
<WhoWeAre />       ← new
<Sectors />
<Solutions />
<About />
<Partners />
<Contact />
```

---

## 2. Hero Changes

- Remove the "Explore Solutions" (`btn--primary`) button
- Keep: "Contact Us" (`btn--ghost`) button
- Keep: headline (SECURE. CONNECT. PROTECT.) and subtitle

---

## 3. New WhoWeAre Component

**File:** `src/components/WhoWeAre.astro`

**Style:** Full-bleed dark panel, same visual language as About section panels.

**Structure:**
- Small amber section label: `WHO WE ARE` (uppercase, letter-spacing)
- Large bold amber uppercase heading: `WHO WE ARE`
- Lead paragraph (muted grey):
  > "Techafrik Quantum Group is one of West Africa's fastest-growing system integrators — evolved from a specialized fleet management and fuel monitoring company into a multi-platform integrator. We design, build, and implement IT and telecommunications solutions across defense, government, enterprise, cellular & mobility, and energy sectors."
- No button

**i18n key:** `whoweare.body`

---

## 4. Solutions — Learn More Buttons

Replace the "Contact Us" button on each solution card with a "Learn More" button (`btn btn--ghost`) linking to a dedicated page:

| Solution              | URL                       |
|-----------------------|---------------------------|
| Safety & Surveillance | `/solutions/safety`       |
| Critical Connectivity | `/solutions/connectivity` |
| Assets Management     | `/solutions/assets`       |
| IP Networks           | `/solutions/ip-networks`  |
| Cybersecurity         | `/solutions/cybersecurity`|

---

## 5. New Solution Pages (placeholder)

Pages will be built with content provided by the user later. For now, create placeholder pages with the correct routes.

**Shared layout:** `Layout.astro` + `Nav.astro` + `Footer.astro`

---

## Out of Scope

- FR/AR translations for WhoWeAre body (fallback to EN for now)
- Solution page content (provided later by user)
