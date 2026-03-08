# Scroll Background Redesign
Date: 2026-03-07

## Goal
Update the page section structure and wire up per-section background color transitions on scroll.

## Section Structure (new)
| Order | Component | Section ID |
|---|---|---|
| 1 | Hero | `hero` |
| 2 | WhoWeAre | `who-we-are` |
| 3 | Solutions (relabeled) | `what-we-build` |
| 4 | Partners | `partners` |
| 5 | Contact | `contact` |

## Background Color Sequence
| Section | bgColor |
|---|---|
| hero | `#000000` |
| who-we-are | `#0d0900` |
| what-we-build | `#050a02` |
| partners | `#060608` |
| contact | `#0d0d0d` |

## Approach
Simple snap (Approach A): IntersectionObserver updates `#page-bg` background-color when a section crosses 35% viewport. CSS `transition: background-color 0.9s ease` handles the smooth fade.

## Changes Required
1. `index.astro` — swap Sectors+Solutions imports for WhoWeAre+Solutions, update order
2. `Solutions.astro` — change `id="solutions"` to `id="what-we-build"`
3. `src/scripts/bg-sections/` — add `who-we-are.js`, `what-we-build.js`; remove `sectors.js`, `solutions.js`
4. `bg-engine.js` — update imports/SECTION_CONFIGS, add bgColor logic to IntersectionObserver
