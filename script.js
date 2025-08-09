// Portfolio JS – Edidi Sai Anant
document.addEventListener("DOMContentLoaded", () => {
  // ------ Elements ------
  const loader = document.getElementById("loader");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll(".section");
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabPanels = document.querySelectorAll(".tab-panel");
  const flipCards = document.querySelectorAll(".flip-card");
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const navLinksContainer = document.getElementById("nav-links");

  // ------ State ------
  let isScrolling = false;
  let isMobile = window.innerWidth <= 768;

  // ------ Init (call all setup) ------
  setupLoader();
  setupParticles();
  setupNavigation();
  setupMobileMenu();
  setupTabs();
  setupFlipCards();
  setupScrollSnap();
  setupIntersectionObserver();
  setupAccessibility();
  setupPerformanceOptimizations();

  // -----------------------------------
  // Loader
  function setupLoader() {
    if (!loader) return;
    document.body.classList.add('loading');
    setTimeout(() => {
      loader.classList.add("hidden");
      document.body.classList.remove('loading');
      const heroSection = document.getElementById("hero");
      if (heroSection) heroSection.classList.add("visible");
    }, 2000);
  }

  // -----------------------------------
  // Particles.js background (mobile-aware)
  function setupParticles() {
    if (typeof particlesJS !== "undefined") {
      try {
        particlesJS("interactive-bg", {
          particles: {
            number: { value: isMobile ? 25 : 80, density: { enable: true, value_area: 800 } },
            color: { value: "#64ffda" },
            shape: { type: "circle", stroke: { width: 0, color: "#000" } },
            opacity: { value: isMobile ? 0.2 : 0.3, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
            size: { value: isMobile ? 1.5 : 2, random: true, anim: { enable: true, speed: 2, size_min: 0.1 } },
            line_linked: { enable: true, distance: isMobile ? 100 : 150, color: "#d38a5c", opacity: 0.2, width: 1 },
            move: { enable: true, speed: isMobile ? 0.5 : 1, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: !isMobile, mode: "grab" },
              onclick: { enable: true, mode: "push" },
              resize: true
            },
            modes: {
              grab: { distance: 140, line_linked: { opacity: 0.5 } },
              push: { particles_nb: 4 },
              remove: { particles_nb: 2 }
            }
          },
          retina_detect: true
        });
      } catch (e) { /* ignore initialization errors */ }
    }
  }

  // -----------------------------------
  // Navigation (click & keyboard)
  function setupNavigation() {
    navLinks.forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);
        if (isMobile && navLinksContainer.classList.contains("open")) closeMobileMenu();
        if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        updateActiveNavLink(targetId.replace("#", ""));
      });
    });

    document.addEventListener("keydown", e => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); scrollToNextSection(); }
      else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); scrollToPrevSection(); }
      else if (e.key === "Escape" && isMobile) { closeMobileMenu(); }
    });
  }

  // -----------------------------------
  // Mobile Menu (open/close + a11y)
  function setupMobileMenu() {
    if (!mobileMenuToggle || !navLinksContainer) return;
    mobileMenuToggle.addEventListener("click", toggleMobileMenu);
    document.addEventListener("click", e => {
      if (!isMobile) return;
      if (!navLinksContainer.classList.contains("open")) return;
      if (!navLinksContainer.contains(e.target) && !mobileMenuToggle.contains(e.target)) closeMobileMenu();
    }, { passive: true });
    window.addEventListener("orientationchange", () => {
      setTimeout(() => { if (navLinksContainer.classList.contains("open")) closeMobileMenu(); }, 100);
    });
  }
  function toggleMobileMenu() {
    navLinksContainer.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
  }
  function openMobileMenu() {
    mobileMenuToggle.classList.add("active");
    mobileMenuToggle.setAttribute("aria-expanded", "true");
    navLinksContainer.classList.add("open");
    navLinksContainer.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  }
  function closeMobileMenu() {
    mobileMenuToggle.classList.remove("active");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
    navLinksContainer.classList.remove("open");
    navLinksContainer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }

  // -----------------------------------
  // Tabs (Experience, etc)
  function setupTabs() {
    tabButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const tabId = btn.dataset.tab;
        tabButtons.forEach(b => { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
        btn.classList.add("active"); btn.setAttribute("aria-selected", "true");
        tabPanels.forEach(p => { p.classList.remove("active"); p.setAttribute("hidden", true); });
        const panel = document.querySelector(`[data-panel="${tabId}"]`);
        if (panel) { panel.classList.add("active"); panel.removeAttribute("hidden"); }
      });
      btn.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); btn.click(); }
      });
    });
  }

  // -----------------------------------
  // Flip Cards (keyboard & touch/mobile)
  function setupFlipCards() {
    flipCards.forEach(card => {
      let isFlipped = false;
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          isFlipped = !isFlipped;
          card.classList.toggle("mobile-flipped", isFlipped);
          card.setAttribute("aria-pressed", String(isFlipped));
        }
      });
      if ("ontouchstart" in window) {
        let touchStart = 0;
        card.addEventListener("touchstart", () => { touchStart = Date.now(); }, { passive: true });
        card.addEventListener("touchend", e => {
          const dur = Date.now() - touchStart;
          if (dur < 300) {
            e.preventDefault();
            isFlipped = !isFlipped;
            card.classList.toggle("mobile-flipped", isFlipped);
            card.setAttribute("aria-pressed", String(isFlipped));
            if (navigator.vibrate) navigator.vibrate(50);
          }
        }, { passive: false });
        card.addEventListener("touchmove", () => {
          if (isFlipped) { isFlipped = false; card.classList.remove("mobile-flipped"); card.setAttribute("aria-pressed", "false"); }
        });
      } else {
        card.addEventListener("mouseenter", () => card.classList.add("mobile-flipped"));
        card.addEventListener("mouseleave", () => card.classList.remove("mobile-flipped"));
      }
    });
  }

  // -----------------------------------
  // Scroll Snap (desktop wheel & mobile swipe)
  function setupScrollSnap() {
    let wheelTimeout;
    if (!isMobile) {
      document.addEventListener("wheel", e => {
        if (isScrolling) return;
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          const delta = Math.sign(e.deltaY);
          if (delta > 0) scrollToNextSection(); 
          else scrollToPrevSection();
        }, 50);
      }, { passive: true });
    }
    if (isMobile) {
      let startY = 0, endY = 0, swipe = false;
      document.addEventListener("touchstart", e => {
        if (navLinksContainer?.classList.contains("open")) return;
        startY = e.touches[0].clientY; swipe = false;
      }, { passive: true });
      document.addEventListener("touchmove", e => {
        if (navLinksContainer?.classList.contains("open")) return;
        endY = e.touches[0].clientY;
        if (Math.abs(startY - endY) > 50) swipe = true;
      }, { passive: true });
      document.addEventListener("touchend", () => {
        if (navLinksContainer?.classList.contains("open")) return;
        if (!swipe || isScrolling) return;
        const deltaY = startY - endY;
        if (Math.abs(deltaY) > 80) deltaY > 0 ? scrollToNextSection() : scrollToPrevSection();
      }, { passive: true });
    }
  }

  // -----------------------------------
  // Intersection Observer - animate-in & update nav
  function setupIntersectionObserver() {
    const obsOpts = { root: null, rootMargin: isMobile ? "-20% 0px -20% 0px" : "-10% 0px -10% 0px", threshold: isMobile ? 0.3 : 0.5 };
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        updateActiveNavLink(entry.target.id);
        animateSectionContent(entry.target);
      });
    }, obsOpts);
    sections.forEach(s => io.observe(s));
    // Fallback for very old browsers
    if (!("IntersectionObserver" in window)) {
      sections.forEach(s => s.classList.add("visible"));
    }
  }

  // -----------------------------------
  // Accessibility (live region, mobile focus)
  function setupAccessibility() {
    const announcer = document.createElement("div");
    announcer.setAttribute("aria-live", "polite");
    announcer.setAttribute("aria-atomic", "true");
    announcer.style.cssText = "position:absolute;left:-10000px;width:1px;height:1px;overflow:hidden;";
    document.body.appendChild(announcer);
    const original = updateActiveNavLink;
    updateActiveNavLink = function(sectionId) {
      original(sectionId);
      const sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
      announcer.textContent = `Navigated to ${sectionName} section`;
    };
    if (isMobile) {
      document.querySelectorAll("[tabindex]").forEach(el => {
        el.addEventListener("touchstart", () => el.focus());
      });
    }
    // Error fallback and iOS
    window.addEventListener('error', () => {
      if (loader && !loader.classList.contains('hidden')) loader.classList.add("hidden");
    });
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) event.preventDefault();
      lastTouchEnd = now;
    }, false);
    // iOS viewport
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
    }
  }

  // -----------------------------------
  // Performance & Device Optimizations
  function setupPerformanceOptimizations() {
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        if (wasMobile !== isMobile) {
          setupParticles();
          setupFlipCards();
        }
        if (!isMobile && navLinksContainer.classList.contains("open")) closeMobileMenu();
      }, 250);
    });
    // Network-aware BG
    if ("connection" in navigator) {
      const conn = navigator.connection;
      if (conn.effectiveType === "slow-2g" || conn.effectiveType === "2g") {
        const bg = document.getElementById('interactive-bg');
        if (bg) bg.style.display = 'none';
      }
    }
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
      document.body.classList.add("low-performance");
    }
    // Styles for low-performance/reduced-motion
    const style = document.createElement('style');
    style.textContent = `
      .low-performance * { animation-duration: 0.1s !important; transition-duration: 0.1s !important; }
      .low-performance .flip-card .card-inner { transition: none !important; }
      .low-performance #interactive-bg { display: none !important; }
      @media (prefers-reduced-motion: reduce) {
        * { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
        .flip-card:hover .card-inner, .flip-card.mobile-flipped .card-inner { transform: none !important; }
        #interactive-bg { display: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  // -----------------------------------
  // Helpers
  function getCurrentSectionIndex() {
    const y = window.scrollY + window.innerHeight / 2;
    for (let i = 0; i < sections.length; i++) {
      const r = sections[i].getBoundingClientRect();
      const top = r.top + window.scrollY;
      const bottom = top + r.height;
      if (y >= top && y < bottom) return i;
    }
    return 0;
  }
  function scrollToSection(index) {
    if (index < 0 || index >= sections.length || isScrolling) return;
    isScrolling = true;
    sections[index].scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => { isScrolling = false; }, isMobile ? 800 : 1000);
  }
  function scrollToNextSection() { scrollToSection(getCurrentSectionIndex() + 1); }
  function scrollToPrevSection() { scrollToSection(getCurrentSectionIndex() - 1); }

  function updateActiveNavLink(sectionId) {
    navLinks.forEach(link => {
      link.classList.toggle("active", link.dataset.section === sectionId);
    });
  }
  function animateSectionContent(section) {
    const items = section.querySelectorAll(".education-card, .cert-card, .skill-category, .flip-card, .publication-item, .patent-item");
    items.forEach((el, idx) => {
      const delay = isMobile ? idx * 50 : idx * 100;
      setTimeout(() => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        requestAnimationFrame(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      }, delay);
    });
  }

  // -----------------------
  // End DOMContentLoaded
});
