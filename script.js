// Edidi Sai Anant · Portfolio Script
// Clean, no scroll jacking, no repeated event listeners

document.addEventListener('DOMContentLoaded', () => {

  // ─── Elements ──────────────────────────────────────────────
  const loader        = document.getElementById('loader');
  const header        = document.getElementById('site-header');
  const navLinks      = document.querySelectorAll('.nav-links a');
  const sections      = document.querySelectorAll('.section');
  const revealEls     = document.querySelectorAll('.reveal-up');
  const scrollBar     = document.getElementById('scroll-progress');
  const hamburger     = document.getElementById('hamburger');
  const navLinksList  = document.getElementById('nav-links');
  const expTabs       = document.querySelectorAll('.exp-tab');
  const expPanels     = document.querySelectorAll('.exp-panel');


  // ─── Loader ────────────────────────────────────────────────
  // Keep it fast — no artificial delays
  function initLoader() {
    // Use requestAnimationFrame so the page paints once before hiding
    const minDelay = 600; // ms — just enough to see the animation
    const start = Date.now();

    function tryHide() {
      const elapsed = Date.now() - start;
      if (document.readyState === 'complete' && elapsed >= minDelay) {
        loader.classList.add('hidden');
        loader.addEventListener('transitionend', () => {
          loader.remove();
        }, { once: true });
      } else {
        requestAnimationFrame(tryHide);
      }
    }

    requestAnimationFrame(tryHide);
  }

  initLoader();


  // ─── Scroll Progress Bar ───────────────────────────────────
  function updateScrollProgress() {
    const doc    = document.documentElement;
    const total  = doc.scrollHeight - doc.clientHeight;
    const pct    = total > 0 ? (window.scrollY / total) * 100 : 0;
    scrollBar.style.width = pct + '%';
  }


  // ─── Header: add 'scrolled' class after 40px ──────────────
  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }


  // ─── Active nav link tracking ──────────────────────────────
  const sectionIds = Array.from(sections).map(s => s.id).filter(Boolean);

  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom > 100) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#' + current) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }


  // ─── Scroll handler (single listener) ─────────────────────
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateScrollProgress();
        updateHeader();
        updateActiveNav();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial state
  updateScrollProgress();
  updateHeader();
  updateActiveNav();


  // ─── Smooth nav click ─────────────────────────────────────
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close mobile menu if open
          navLinksList.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });


  // ─── Mobile hamburger ─────────────────────────────────────
  if (hamburger && navLinksList) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinksList.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (
        navLinksList.classList.contains('open') &&
        !navLinksList.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        navLinksList.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }


  // ─── Intersection Observer for reveal animations ───────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  revealEls.forEach(el => revealObserver.observe(el));


  // ─── GSAP ScrollTrigger (if available) ────────────────────
  // Adds extra polish on top of the CSS reveals
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero PCB art subtle entry
    const pcb = document.querySelector('.hero-pcb');
    if (pcb) {
      gsap.from(pcb, {
        opacity: 0,
        x: 40,
        duration: 1.2,
        delay: 0.8,
        ease: 'power2.out'
      });
    }

    // Section labels: copper line grow
    document.querySelectorAll('.section-label').forEach(label => {
      gsap.from(label, {
        scrollTrigger: {
          trigger: label,
          start: 'top 85%',
          once: true
        },
        opacity: 0,
        y: 12,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  }


  // ─── Experience tabs ───────────────────────────────────────
  expTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetPanel = tab.dataset.tab;

      expTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      expPanels.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const panel = document.querySelector(`[data-panel="${targetPanel}"]`);
      if (panel) panel.classList.add('active');
    });
  });


  // ─── Keyboard navigation for experience tabs ───────────────
  expTabs.forEach((tab, i) => {
    tab.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next = expTabs[(i + 1) % expTabs.length];
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        next = expTabs[(i - 1 + expTabs.length) % expTabs.length];
      }
      if (next) {
        next.click();
        next.focus();
      }
    });
  });


  // ─── Subtle cursor copper trail (desktop only) ────────────
  // Small dot that follows cursor, fades out — not intrusive
  if (window.matchMedia('(pointer: fine)').matches) {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position: fixed;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(211, 138, 92, 0.55);
      pointer-events: none;
      z-index: 9998;
      transition: opacity 0.4s, transform 0.12s;
      transform: translate(-50%, -50%);
      opacity: 0;
    `;
    document.body.appendChild(trail);

    let trailTimeout;
    document.addEventListener('mousemove', e => {
      trail.style.left = e.clientX + 'px';
      trail.style.top  = e.clientY + 'px';
      trail.style.opacity = '1';
      clearTimeout(trailTimeout);
      trailTimeout = setTimeout(() => {
        trail.style.opacity = '0';
      }, 600);
    });
  }


  // ─── Project card hover: very subtle copper border pulse ──
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'rgba(211, 138, 92, 0.25)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });


  // ─── Easter egg: console message for fellow devs ───────────
  const c = [
    '%c Edidi Sai Anant · Portfolio ',
    'background:#070b16;color:#d38a5c;font-size:14px;padding:4px 8px;border-left:3px solid #d38a5c;',
    '%cNAND EFA Engineer · Micron NTI · Singapore',
    'color:#7d8ba8;font-size:11px;',
    '%c→ esanant@gmail.com',
    'color:#5fffc8;font-size:11px;',
    '%c→ github.com/ESAnant',
    'color:#7d8ba8;font-size:11px;'
  ];
  console.log(c[0], c[1]);
  console.log(c[2], c[3]);
  console.log(c[4], c[5]);
  console.log(c[6], c[7]);
  console.log('%c// No memory errors here.', 'color:#424f6a;font-size:10px;font-style:italic;');

});
