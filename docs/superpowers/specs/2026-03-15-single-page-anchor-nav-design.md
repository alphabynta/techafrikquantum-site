# Single-Page Anchor Nav Strip — Design Spec
**Date:** 2026-03-15
**Status:** Approved

## Overview

Convert `index.html` into a full single-page experience. Add all major content sections (About Us, Contact) directly onto the homepage. Add a sticky secondary nav strip below the site header with anchor links that smooth-scroll to each section and auto-highlight the section currently in view.

---

## Nav Strip

**Placement:** Fixed sticky bar immediately below `.site-header`, above `<main>`.

**Links (in order):**
1. Home → `#home`
2. About Us → `#about`
3. Solutions → `#solutions`
4. Partners → `#partners`
5. Contact Us → `#contact`

**Visual style — Style A (underline tab bar):**
- Background: `#0d0d0d`, bottom border: `1px solid #1a1a1a`
- Inactive link: `color: #808080`, hover: `color: #f0f0f2`
- Active link: `color: #f5a524`, `border-bottom: 2px solid #f5a524`
- Font: Inter, 13px, `letter-spacing: 0.04em`
- Padding: `12px 18px` per link
- On mobile (< 600px): strip scrolls horizontally, no wrap

**Active state behaviour:**
- IntersectionObserver watches each section
- When a section crosses the viewport mid-point, its strip link becomes active
- Smooth scroll on click via `scroll-behavior: smooth` on `<html>`

---

## Page Section Structure (`index.html`)

Sections in order, each with its `id` attribute:

| Order | id | Heading | Source |
|-------|----|---------|--------|
| 1 | `home` | Hero | Already on index |
| 2 | `solutions` | Five Mission Areas | Already on index |
| 3 | `about` | About Us | Ported from `about.html` |
| 4 | `partners` | Partners | Already on index |
| 5 | `contact` | Contact Us | Ported from `contact.html` |

### Sections already on index.html
- Add `id="home"` to the hero `<section>`
- Add `id="solutions"` to the Five Mission Areas `<section>`
- Add `id="partners"` to the partners strip `<section>`

### Sections to port from existing pages

**About Us (`#about`)** — port from `about.html`:
- CEO Message
- Mission & Values
- Integration Approach (4-step process)
- Regional Presence
- Leadership
- Careers CTA

**Contact Us (`#contact`)** — port from `contact.html`:
- Contact form (with existing mailto handler logic)
- Contact info cards (Email, Location, Careers)

The contact form JS handler (currently inline in `contact.html`) moves to `js/skins.js` or a new `js/contact.js`.

---

## CSS Changes (`style.css`)

Add new ruleset for `.page-nav`:
- Sticky positioning: `position: sticky; top: 0; z-index: 90` (below header z-index)
- Flex row of `<a>` links
- Active class `.page-nav__link--active`: amber color + 2px amber bottom border
- Mobile: `overflow-x: auto; white-space: nowrap`

Add `scroll-behavior: smooth` to `html` (or `scroll-margin-top` on sections to account for sticky header + strip height).

---

## JS Changes

Add IntersectionObserver in `js/skins.js` (or new `js/page-nav.js`):
- Observe all 5 sections
- On intersection (threshold ~0.3), set active class on corresponding strip link
- Remove active class from others

---

## What Does NOT Change

- The existing top header nav (logo + dropdown nav) stays exactly as-is
- `about.html`, `solutions.html`, `contact.html`, `sectors.html` remain as separate pages — they are not deleted
- No changes to other pages
