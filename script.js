// Edidi Sai Anant · Portfolio Script

document.addEventListener('DOMContentLoaded', () => {

  // ─── Elements ──────────────────────────────────────────────
  const loader       = document.getElementById('loader');
  const header       = document.getElementById('site-header');
  const navLinks     = document.querySelectorAll('.nav-links a');
  const sections     = document.querySelectorAll('.section');
  const revealEls    = document.querySelectorAll('.reveal-clip');
  const scrollBar    = document.getElementById('scroll-progress');
  const hamburger    = document.getElementById('hamburger');
  const navLinksList = document.getElementById('nav-links');
  const expTabs      = document.querySelectorAll('.exp-tab');
  const expPanels    = document.querySelectorAll('.exp-panel');


  // ─── Splitting.js — hero name character reveal ─────────────
  if (typeof Splitting !== 'undefined') {
    Splitting({ target: '.hero-name', by: 'chars' });
  }




  // ─── Rotating skills sphere (custom, no CDN) ──────────────
  (function () {
    const container = document.getElementById('tag-sphere');
    if (!container) return;

    const tags = [
      'NAND Flash', 'Failure Analysis', 'EFA', 'EMMI', 'Testers / ATE',
      'VLSI', 'Cadence Virtuoso', 'Avalon', 'QuestaSim', 'Xilinx Vivado',
      'Python', 'Verilog', 'SystemVerilog', 'HLS', 'C++',
      'Nanoelectronics', 'Memory Technologies', 'Semiconductor',
      'FPGA', 'RTL Design', 'DRC / LVS', 'PVT Analysis',
      'Signal Integrity', 'Embedded Systems', 'PCB Design',
      'Yield Analysis', 'Arduino', 'LaTeX',
    ];

    const R = Math.max(80, Math.min(150, container.offsetWidth * 0.38));
    const n = tags.length;

    // Fibonacci sphere — even distribution of N points on a sphere
    const pts = tags.map((_, i) => {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / n);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        x: R * Math.sin(phi) * Math.cos(theta),
        y: R * Math.sin(phi) * Math.sin(theta),
        z: R * Math.cos(phi),
      };
    });

    const spans = tags.map(text => {
      const s = document.createElement('span');
      s.className = 'sphere-tag';
      s.textContent = text;
      container.appendChild(s);
      return s;
    });

    // Fixed slight X tilt
    const TILT   = 0.18;
    const cosT   = Math.cos(TILT);
    const sinT   = Math.sin(TILT);
    let   rotY   = 0;
    let   rafId;

    function frame() {
      rotY += 0.0035;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);

      spans.forEach((s, i) => {
        const { x: ox, y: oy, z: oz } = pts[i];
        const x1 =  ox * cosY + oz * sinY;
        const z1 = -ox * sinY + oz * cosY;
        const y2 =  oy * cosT - z1 * sinT;
        const z2 =  oy * sinT + z1 * cosT;
        const depth   = (z2 + R) / (2 * R);           // 0 = back, 1 = front
        const opacity = (0.15 + depth * 0.85).toFixed(3);
        const scale   = (0.7  + depth * 0.45).toFixed(3);
        s.style.transform = `translate(calc(-50% + ${x1.toFixed(1)}px), calc(-50% + ${y2.toFixed(1)}px)) scale(${scale})`;
        s.style.opacity   = opacity;
      });

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else rafId = requestAnimationFrame(frame);
    });
  }());


  // ─── Loader ────────────────────────────────────────────────
  function revealHeroElements() {
    document.querySelectorAll('.section-hero .reveal-clip').forEach(el => {
      el.classList.add('visible');
    });
  }

  function initLoader() {
    const minDelay = 600;
    const start = Date.now();
    function tryHide() {
      const elapsed = Date.now() - start;
      if (document.readyState === 'complete' && elapsed >= minDelay) {
        loader.classList.add('hidden');
        const fallback = setTimeout(() => { loader.remove(); revealHeroElements(); }, 700);
        loader.addEventListener('transitionend', () => {
          clearTimeout(fallback);
          loader.remove();
          revealHeroElements();
        }, { once: true });
      } else {
        requestAnimationFrame(tryHide);
      }
    }
    requestAnimationFrame(tryHide);
  }
  initLoader();


  // ─── Scroll progress ───────────────────────────────────────
  function updateScrollProgress() {
    const doc = document.documentElement;
    const total = doc.scrollHeight - doc.clientHeight;
    scrollBar.style.width = total > 0 ? (window.scrollY / total) * 100 + '%' : '0%';
  }


  // ─── Header scroll state ───────────────────────────────────
  function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }


  // ─── Active nav link ───────────────────────────────────────
  function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom > 100) current = section.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }


  // ─── Single scroll handler ─────────────────────────────────
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

  updateScrollProgress();
  updateHeader();
  updateActiveNav();


  // ─── Smooth nav click ──────────────────────────────────────
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        navLinksList.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });


  // ─── Hamburger ─────────────────────────────────────────────
  if (hamburger && navLinksList) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinksList.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
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


  // ─── Clip-path reveal — IntersectionObserver ───────────────
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  revealEls.forEach(el => revealObserver.observe(el));


  // ─── GSAP extras (if loaded) ───────────────────────────────
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    const pcb = document.querySelector('.hero-pcb');
    if (pcb) {
      gsap.from(pcb, { opacity: 0, x: 40, duration: 1.2, delay: 0.8, ease: 'power2.out' });
    }
  }


  // ─── Experience tabs ───────────────────────────────────────
  expTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      expTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      expPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      document.querySelector(`[data-panel="${tab.dataset.tab}"]`)?.classList.add('active');
    });
  });

  expTabs.forEach((tab, i) => {
    tab.addEventListener('keydown', e => {
      let next;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); next = expTabs[(i + 1) % expTabs.length]; }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); next = expTabs[(i - 1 + expTabs.length) % expTabs.length]; }
      if (next) { next.click(); next.focus(); }
    });
  });


  // ─── Cursor copper trail (desktop only) ────────────────────
  if (window.matchMedia('(pointer: fine)').matches) {
    const trail = document.createElement('div');
    trail.style.cssText = `
      position:fixed;width:5px;height:5px;border-radius:50%;
      background:rgba(211,138,92,0.6);pointer-events:none;z-index:9998;
      transition:opacity 0.4s,transform 0.1s;transform:translate(-50%,-50%);opacity:0;
    `;
    document.body.appendChild(trail);
    let trailTimeout;
    document.addEventListener('mousemove', e => {
      trail.style.left = e.clientX + 'px';
      trail.style.top  = e.clientY + 'px';
      trail.style.opacity = '1';
      clearTimeout(trailTimeout);
      trailTimeout = setTimeout(() => { trail.style.opacity = '0'; }, 600);
    });
  }


  // ─── Console easter egg ────────────────────────────────────
  console.log('%c Edidi Sai Anant · Portfolio ', 'background:#070b16;color:#d38a5c;font-size:14px;padding:4px 8px;border-left:3px solid #d38a5c;');
  console.log('%cNAND EFA · Micron NTI · Singapore', 'color:#7d8ba8;font-size:11px;');
  console.log('%c→ esanant@gmail.com', 'color:#5fffc8;font-size:11px;');
  console.log('%c// No memory errors here.', 'color:#424f6a;font-size:10px;font-style:italic;');

});
