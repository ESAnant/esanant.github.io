# Edidi Sai Anant Portfolio

Minimal, FA-inspired GitHub Pages portfolio for **Edidi Sai Anant**.

Current positioning:

- NAND Electrical Failure Analysis Engineer
- Micron Technology · NTI / NAND R&D
- Tools, automation, and AI-assisted engineering workflows
- VLSI, FPGA, embedded systems, memory technology, and semiconductor foundations

## File structure

```text
.
├── index.html
├── assets/
│   ├── docs/Edidi_Sai_Anant_Resume.pdf
│   ├── favicon.svg
│   └── images/
├── css/
│   ├── base.css
│   ├── components.css
│   └── responsive.css
└── js/
    ├── content.js
    ├── main.js
    └── pretext-fit.js
```

## Edit your content

Most personal content lives in:

```text
js/content.js
```

Change your email, role, experience bullets, projects, publications, and skills there without touching layout code.

## Libraries used

The site intentionally uses a small number of high-signal libraries rather than adding random effects:

- **Pretext** via `js/pretext-fit.js` for experimental text measurement and line-count stability.
- **GSAP** for subtle, controlled motion.
- **Lenis** for smooth scrolling.

All effects respect `prefers-reduced-motion`.

## Deployment

1. Copy the folder contents into the root of `ESAnant/esanant.github.io`.
2. Commit and push to `main`.
3. GitHub Pages will serve the site from `https://esanant.github.io/`.

## Confidentiality note

Professional Micron work is intentionally described at a high level. Keep internal process names, product details, data, methodologies, and screenshots out of this public site unless you have explicit approval.
