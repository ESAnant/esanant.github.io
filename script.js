/* Improved portfolio JS - Desktop-first, accessible, performant
   - handles loader, nav, mobile menu, tabs, flip-cards, intersection observer, and light particle background.
   - keep file small and modular for easy tweaks.
*/

document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const navLinksContainer = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const sections = document.querySelectorAll('.section');
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const flipCards = document.querySelectorAll('.flip-card');
  let isMobile = window.innerWidth <= 900;
  let isScrolling = false;

  // initial setup
  setYear();
  showLoaderThenInit();

  // --------------- LOADER ---------------
  function showLoaderThenInit() {
    document.body.classList.add('loading');
    // short minimum loader time for perceived performance
    const minTime = 650;
    const start = performance.now();

    // Ensure DOM visual layout is ready
    requestAnimationFrame(() => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minTime - elapsed);

      setTimeout(() => {
        if (loader) loader.classList.add('hidden');
        document.body.classList.remove('loading');
        // reveal hero
        const hero = document.getElementById('hero');
        if (hero) hero.classList.add('visible');
        initFeatures();
      }, wait);
    });
  }

  // --------------- INIT FEATURES ---------------
  function initFeatures() {
    setupParticlesIfAvailable();
    setupNavBehavior();
    setupMobileMenu();
    setupTabs();
    setupFlipCards();
    setupIntersectionObserver();
    setupKeyboardShortcuts();
    handleResize();
    lazyImagesFallback();
  }

  // --------------- PARTICLES BACKGROUND (optional) ---------------
  function setupParticlesIfAvailable() {
    try {
      if (window.particlesJS && document.getElementById('interactive-bg')) {
        const cfg = {
          particles: {
            number: { value: isMobile ? 20 : 70, density: { enable: true, value_area: 800 } },
            color: { value: '#64ffda' },
            shape: { type: 'circle' },
            opacity: { value: isMobile ? 0.18 : 0.28, random: true },
            size: { value: isMobile ? 1.4 : 2.2, random: true },
            line_linked: { enable: true, distance: isMobile ? 100 : 150, color: '#d38a5c', opacity: 0.12, width: 1 },
            move: { enable: true, speed: isMobile ? 0.5 : 1, out_mode: 'out' }
          },
          interactivity: { detect_on: 'canvas', events: { onhover: { enable: !isMobile, mode: 'grab' }, onclick: { enable: true, mode: 'push' } } },
          retina_detect: true
        };
        window.particlesJS('interactive-bg', cfg);
      }
    } catch (err) { /* fail silently */ }
  }

  // --------------- NAVIGATION ---------------
  function setupNavBehavior() {
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          updateActiveLink(href.substring(1));
          // close menu on mobile after click
          if (isMobile && navLinksContainer.classList.contains('open')) closeMobileMenu();
        }
      });
    });
  }

  function updateActiveLink(sectionId) {
    navLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.section === sectionId);
    });
  }

  // --------------- MOBILE MENU ---------------
  function setupMobileMenu() {
    if (!mobileToggle) return;
    mobileToggle.addEventListener('click', () => {
      const open = navLinksContainer.classList.toggle('open');
      mobileToggle.classList.toggle('active', open);
      mobileToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('menu-open', open);
    });

    // close on outside click
    document.addEventListener('click', (e) => {
      if (!isMobile) return;
      if (!navLinksContainer.contains(e.target) && !mobileToggle.contains(e.target) && navLinksContainer.classList.contains('open')) {
        closeMobileMenu();
      }
    });

    // close on resize to desktop
    window.addEventListener('orientationchange', () => { if (navLinksContainer.classList.contains('open')) closeMobileMenu(); });
  }

  function closeMobileMenu() {
    navLinksContainer.classList.remove('open');
    mobileToggle.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  // --------------- TABS ---------------
  function setupTabs() {
    if (!tabButtons.length) return;
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.tab;
        tabButtons.forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', b === btn ? 'true' : 'false'); });
        tabPanels.forEach(p => p.classList.toggle('active', p.dataset.panel === id));
      });

      // keyboard activation
      btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); } });
    });
  }

  // --------------- FLIP CARDS (desktop hover, mobile tap) ---------------
  function setupFlipCards() {
    flipCards.forEach(card => {
      let flipped = false;
      // keyboard accessible toggle
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleFlip(); }
      });
      // desktop hover
      card.addEventListener('mouseenter', () => { if (!isMobile) card.classList.add('mobile-flipped'); });
      card.addEventListener('mouseleave', () => { if (!isMobile) card.classList.remove('mobile-flipped'); });

      // mobile tap to toggle
      card.addEventListener('click', (e) => {
        if (isMobile) {
          e.preventDefault();
          flipped = !flipped;
          card.classList.toggle('mobile-flipped', flipped);
          card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
        }
      });

      function toggleFlip() { flipped = !flipped; card.classList.toggle('mobile-flipped', flipped); card.setAttribute('aria-pressed', flipped ? 'true' : 'false'); }
    });
  }

  // --------------- INTERSECTION OBSERVER (reveal + active nav) ---------------
  function setupIntersectionObserver() {
    const opts = { root: null, threshold: 0.45, rootMargin: '0px' };
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          updateActiveLink(entry.target.id);
        }
      });
    }, opts);
    sections.forEach(s => obs.observe(s));
  }

  // --------------- KEYBOARD NAV SHORTCUTS (PageUp/PageDown/Arrows) ---------------
  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (e.key === 'PageDown' || e.key === 'ArrowDown') { e.preventDefault(); scrollToNext(); }
      if (e.key === 'PageUp' || e.key === 'ArrowUp') { e.preventDefault(); scrollToPrev(); }
      if (e.key === 'Home') { document.querySelector('#hero')?.scrollIntoView({behavior:'smooth'}); }
    });
  }

  function getCurrentSectionIndex() {
    const mid = window.scrollY + window.innerHeight / 2;
    let idx = 0;
    sections.forEach((s, i) => {
      const top = s.offsetTop;
      const bottom = top + s.offsetHeight;
      if (mid >= top && mid < bottom) idx = i;
    });
    return idx;
  }
  function scrollToSection(i) {
    if (i < 0 || i >= sections.length || isScrolling) return;
    isScrolling = true;
    sections[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => { isScrolling = false; }, 900);
  }
  function scrollToNext() { scrollToSection(getCurrentSectionIndex() + 1); }
  function scrollToPrev() { scrollToSection(getCurrentSectionIndex() - 1); }

  // --------------- HANDLERS: resize & responsive tweaks ---------------
  function handleResize() {
    window.addEventListener('resize', debounce(() => {
      const wasMobile = isMobile;
      isMobile = window.innerWidth <= 900;
      if (wasMobile !== isMobile) {
        // reset flip state
        document.querySelectorAll('.flip-card.mobile-flipped').forEach(c => c.classList.remove('mobile-flipped'));
        if (!isMobile && navLinksContainer.classList.contains('open')) closeMobileMenu();
      }
    }, 220));
  }

  // --------------- UTILS ---------------
  function debounce(fn, t = 150) {
    let id;
    return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), t); };
  }

  function setYear() {
    const y = new Date().getFullYear();
    const el = document.getElementById('year');
    if (el) el.textContent = y;
  }

  // --------------- Lazy images fallback (in case browser lacks native lazy) ---------------
  function lazyImagesFallback() {
    if ('loading' in HTMLImageElement.prototype) return;
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          if (img.dataset.src) img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    imgs.forEach(img => io.observe(img));
  }

  // --------------- Accessibility: announce section changes (screen reader) ---------------
  (function createAnnouncer(){
    const ann = document.createElement('div');
    ann.setAttribute('aria-live','polite');
    ann.style.cssText = 'position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden';
    document.body.appendChild(ann);
    let prev = '';
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && e.target.id && e.target.id !== prev) {
          ann.textContent = `Viewing ${e.target.id.replace(/-/g,' ')}`;
          prev = e.target.id;
        }
      });
    }, { threshold: 0.6 });
    sections.forEach(s => obs.observe(s));
  })();

});
