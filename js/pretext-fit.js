const PRETEXT_URL = "https://esm.sh/@chenglou/pretext@0.0.7?bundle";

const px = (value, fallback) => {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const debounce = (fn, delay = 140) => {
  let timer = 0;
  return (...args) => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => fn(...args), delay);
  };
};

async function setupPretextFit() {
  if (!("Segmenter" in Intl)) return;

  try {
    const { prepare, layout } = await import(PRETEXT_URL);
    const preparedCache = new WeakMap();

    const measure = () => {
      const targets = [...document.querySelectorAll(".pretext-fit, .project-card p, .publication-card p")];
      targets.forEach((el) => {
        if (!el.isConnected) return;
        const text = el.textContent.replace(/\s+/g, " ").trim();
        if (!text) return;

        const style = window.getComputedStyle(el);
        const fontSize = px(style.fontSize, 16);
        const lineHeight = style.lineHeight === "normal" ? Math.round(fontSize * 1.55) : px(style.lineHeight, Math.round(fontSize * 1.55));
        const font = style.font && style.font !== "" ? style.font : `${style.fontWeight || 400} ${fontSize}px ${style.fontFamily || "DM Sans"}`;
        const width = Math.floor(el.getBoundingClientRect().width);
        if (width < 48) return;

        const key = `${text}|${font}|${style.letterSpacing || "0"}`;
        let cached = preparedCache.get(el);
        if (!cached || cached.key !== key) {
          cached = { key, prepared: prepare(text, font, { letterSpacing: px(style.letterSpacing, 0) || 0 }) };
          preparedCache.set(el, cached);
        }

        const result = layout(cached.prepared, width, lineHeight);
        el.style.setProperty("--pretext-lines", String(result.lineCount));
        el.style.setProperty("--pretext-height", `${Math.ceil(result.height)}px`);
        el.dataset.pretext = `${result.lineCount} lines`;
      });
    };

    measure();
    window.addEventListener("resize", debounce(measure), { passive: true });
    window.addEventListener("portfolio:content-rendered", debounce(measure, 60));
    document.documentElement.dataset.pretext = "active";
  } catch (error) {
    document.documentElement.dataset.pretext = "fallback";
    console.info("Pretext text measurement unavailable; CSS fallback is active.", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupPretextFit, { once: true });
} else {
  setupPretextFit();
}
