# Edidi Sai Anant Portfolio

Static GitHub Pages portfolio for Edidi Sai Anant. The site is intentionally kept framework-free so it can be edited quickly and deployed directly from the repository root.

## What changed

- Updated positioning for current Micron NTI / NAND R&D work.
- Added stronger emphasis on tools, automation, and AI-assisted engineering workflows.
- Split content, styling, and behavior into separate files for easier control.
- Removed forced scroll-jacking and heavy fixed delays that made the old version feel buggy.
- Added project filters, command palette, typed hero text, particle background, responsive cards, SEO metadata, and structured data.

## File structure

```text
.
├── index.html
├── README.md
├── AUDIT.md
├── LICENSE
├── Edidi_Sai_Anant_Resume.pdf          # compatibility copy for old links
├── assets/
│   ├── docs/
│   │   └── Edidi_Sai_Anant_Resume.pdf
│   ├── favicon.svg
│   └── images/
│       └── XLNX.png
├── css/
│   ├── base.css
│   ├── components.css
│   └── responsive.css
└── js/
    ├── content.js       # edit portfolio text/data here first
    └── main.js          # site behavior and rendering
```

## Editing content

Most content is in `js/content.js`:

- `experience` controls timeline cards.
- `projects` controls project cards and filters.
- `skills` controls skill groups.
- `certifications` controls the credential cards.
- `profile` controls resume, email, LinkedIn, and GitHub links.

## Deploying to GitHub Pages

1. Replace the files in your `ESAnant/esanant.github.io` repository with this folder's contents.
2. Commit and push to `main`.
3. GitHub Pages will serve the root `index.html` at `https://esanant.github.io/`.

## Optional next steps

- Replace the resume PDF with an updated Micron-current version.
- Add project links when public repositories or writeups are available.
- Replace high-level internal project summaries with approved public wording if company policy allows it.
