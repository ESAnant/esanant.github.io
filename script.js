/*  SCRIPT.JS
 *  Interactive logic ‑ dark / light mode, animated background, cursor, section reveal
 *  Edidi Sai Anant • 2025
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ========== PRE-LOADER ========== */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
      }
    }, 400);
  });

  /* ========== THEME HANDLING ========== */
  const themeBtn   = document.getElementById('themeToggle');
  const root       = document.documentElement;
  let   theme      = localStorage.getItem('theme') || 'dark';

  const palette = {
    dark : { bg: 0x010413, dots: 0x00e1ff },
    light: { bg: 0xf5f7fa, dots: 0x0066ff }
  };

  const updateIcon = () => {
    themeBtn.innerHTML =
      theme === 'dark'
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
  };

  const applyTheme = () => {
    root.classList.toggle('light-mode', theme === 'light');
    updateIcon();
    localStorage.setItem('theme', theme);

    /* Re-initialise Vanta with new colours */
    if (window.vantaEffect) window.vantaEffect.destroy();
    window.vantaEffect = VANTA.DOTS({
      el: '#vanta-bg',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: palette[theme].dots,
      color2: 0xffffff,
      backgroundColor: palette[theme].bg,
      size: 2.2,
      spacing: 28.0
    });
  };

  themeBtn.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme();
  });
  applyTheme();                                  /* initial load */

  /* ========== CUSTOM CURSOR ========== */
  const cursor = document.getElementById('cursor');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top  = `${e.clientY}px`;
    });
    document.querySelectorAll('a,button,.project,.chip,.cta,.nav-link')
      .forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
      });
  }

  /* ========== SECTION REVEAL & ACTIVE NAV ========== */
  const sections  = document.querySelectorAll('main section');
  const navLinks  = document.querySelectorAll('.nav-link');

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.classList.add('section-visible');
        revealObs.unobserve(ent.target);
      }
    });
  }, { threshold: 0.25 });

  const activeObs = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        const id = ent.target.id;
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href').slice(1) === id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => { revealObs.observe(sec); activeObs.observe(sec); });

  /* ========== HEADER AUTO-HIDE ========== */
  const header = document.querySelector('.header');
  let lastY    = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > lastY && y > 150) header.style.top = '-100px';
    else                      header.style.top = '0';
    lastY = y;
  });

  /* ========== SCROLL-TO-TOP BUTTON ========== */
  const toTopBtn = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTopBtn.classList.toggle('show', window.scrollY > 450);
  });
  toTopBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
});
