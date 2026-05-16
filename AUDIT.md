# Portfolio Audit Notes

## Issues found in the previous version

1. **Content was stale**
   - The old copy positioned Sai primarily as a recent graduate seeking opportunities.
   - It did not reflect current work in Micron's NTI / NAND R&D team.
   - Tools, automation, and AI projects were not visible enough.

2. **Forced scrolling felt buggy**
   - The old JavaScript intercepted wheel, arrow, page, and swipe navigation.
   - This made normal browser scrolling feel jumpy, especially on long sections and mobile.

3. **Scroll snap was too aggressive**
   - `scroll-snap-type: y mandatory` plus full-height sections can trap or skip content when sections are taller than the viewport.

4. **Mobile accessibility problems**
   - The old viewport used `maximum-scale=1.0, user-scalable=no`, which prevents zooming.
   - The old script also prevented double-tap zoom.

5. **Repeated event binding risk**
   - The old `setupFlipCards()` function could run after resize and attach duplicate listeners to the same cards.

6. **Fixed loader delay**
   - The old loader waited roughly two seconds regardless of actual load state.
   - This made the site feel slower than necessary.

7. **Files were not separated enough**
   - Most content lived inside `index.html`, making frequent content updates harder.

## Improvements made

1. **Current positioning**
   - Added Micron NTI / NAND R&D as the current focus.
   - Added explicit tools, automation, and AI workflow positioning.

2. **Separated control layers**
   - `index.html` handles structure.
   - `js/content.js` handles portfolio data and copy.
   - `js/main.js` handles behavior.
   - `css/base.css`, `css/components.css`, and `css/responsive.css` split styling responsibilities.

3. **Removed scroll-jacking**
   - Normal browser scrolling is preserved.
   - Smooth anchor navigation remains.

4. **Better effects without breaking usability**
   - Particle background.
   - Cursor spotlight.
   - Typed hero text.
   - Reveal animations.
   - Command palette using Ctrl/Cmd + K.
   - Project filters.

5. **Accessibility and performance**
   - Restored zoom-friendly viewport.
   - Added skip link.
   - Added reduced-motion support.
   - Added semantic sections and aria labels.
   - Replaced fixed loader with load/fallback behavior.

6. **SEO and sharing**
   - Added Open Graph tags.
   - Added description and author metadata.
   - Added JSON-LD Person schema.

## Notes for future edits

- Keep confidential Micron/internal details high-level.
- Public project cards should avoid disclosing internal tool names, flows, data, or proprietary process details.
- Use `js/content.js` for quick content changes instead of editing `index.html`.
