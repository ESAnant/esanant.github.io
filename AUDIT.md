# Website Audit & Redesign Notes

## What changed in this pass

### Positioning

The site has been repositioned around Sai's actual current identity:

- NAND Electrical Failure Analysis Engineer
- Micron Technology · NTI / NAND R&D
- Failure-analysis thinking, semiconductor debug, tools, automation, and AI-assisted workflows

The older copy sounded like a generic AI/automation portfolio. The new copy is more specific to semiconductor work while avoiding confidential Micron details.

### UI / UX direction

The design is now intentionally minimal and personal:

- Dark semiconductor-lab visual language
- Wafer-map / die-grid hero panel
- FA workflow section: Verify → Localize → Explain → Automate
- Fewer generic buzzwords
- Stronger hierarchy and shorter section names
- Mobile-first responsive cleanup
- Command palette retained because it is useful and distinctive without being noisy

### Libraries

Added a controlled library layer:

- `@chenglou/pretext` through `js/pretext-fit.js`
  - Used for experimental text measurement and line-count metadata.
  - Fails safely to CSS-only layout if the CDN or browser support is unavailable.
- GSAP
  - Used only for small entrance/wafer pulse animations.
- Lenis
  - Smooth scroll with reduced-motion fallback.

### Bugs / performance concerns addressed

- Removed heavy particle background dependency.
- Removed scroll-jacking behavior.
- Kept animations subtle and motion-safe.
- Split content, behavior, and styles into separate files.
- Kept professional details high-level to avoid confidentiality risk.
- Updated main email to `esanant@gmail.com`.

## Key files

- `index.html` — semantic page structure and SEO metadata.
- `js/content.js` — editable personal content.
- `js/main.js` — rendering, navigation, filters, command palette, animations.
- `js/pretext-fit.js` — Pretext integration with safe fallback.
- `css/base.css` — design tokens and global layout.
- `css/components.css` — components and sections.
- `css/responsive.css` — mobile and tablet behavior.

## Next polish ideas

- Add 1–2 approved, non-confidential project screenshots if available.
- Add a real project write-up for one public academic project.
- Replace generic project statuses with links where public code or papers are available.
- Add a short `/notes` or `/writing` section later if Sai wants to publish learning notes about semiconductors, EFA, FPGA, or AI tooling.
