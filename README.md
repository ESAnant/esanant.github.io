# esanant.github.io

Personal portfolio — Edidi Sai Anant, NAND EFA Engineer at Micron Technology.

## Structure

```
index.html    ← all content / markup
style.css     ← design tokens, layout, components
script.js     ← interactions, no external scroll libs
```

## Deploy

Push to the `main` branch of `ESAnant/esanant.github.io` on GitHub.
GitHub Pages will serve it from the root automatically.

## Libraries used

- **GSAP 3.12** (cdnjs) — section reveal animations, hero art entry
- **Font Awesome 6.5** (cdnjs) — icons
- **Google Fonts** — Instrument Serif (name), DM Sans (body), JetBrains Mono (mono)

## Fonts

| Usage | Family |
|-------|--------|
| Name/headings | Instrument Serif |
| Body copy | DM Sans |
| Code, tags, nav | JetBrains Mono |

## Colors

| Name | Value |
|------|-------|
| Background | `#070b16` |
| Copper (primary accent) | `#d38a5c` |
| Text | `#dce6f4` |
| Text secondary | `#7d8ba8` |
| Cyan (rare, patent badge) | `#5fffc8` |

## To update content

All content is directly in `index.html`. Sections are clearly marked with comments.
The experience tabs are `data-tab` / `data-panel` matched — add a new tab + panel pair to add a role.

## What was fixed from original

- Removed mandatory scroll-snap (caused bugs on long sections) → replaced with `proximity`
- Removed 2000ms artificial loader delay → now hides on `readyState === 'complete'`
- Single scroll listener with `requestAnimationFrame` throttle (was adding multiple listeners on resize)
- Mobile menu closes properly on outside-click and nav-link click
- No particles.js (too generic, caused jank on mobile)
- No fake console / gimmicky 3D elements
