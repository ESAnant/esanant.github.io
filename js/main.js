(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA || {};
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const state = { activeFilter: "all", typedIndex: 0, typedChar: 0, deleting: false };

  const escapeHTML = (value = "") => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", hideLoader, { once: true });
  window.setTimeout(hideLoader, 850);

  function init() {
    renderContent();
    setupNavigation();
    setupRevealAnimations();
    setupProjectFilters();
    setupCommandPalette();
    setupSpotlight();
    setupWaferMap();
    setupTypedText();
    setupHeaderState();
    setupLenis();
    setupMotion();
    hydrateLinks();
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();
  }

  function hideLoader() {
    const loader = $("#loader");
    if (!loader || loader.classList.contains("hidden")) return;
    loader.classList.add("hidden");
    window.setTimeout(() => loader.remove(), 450);
  }

  function hydrateLinks() {
    const profile = data.profile || {};
    if (profile.email) {
      $$("a[href^='mailto:']").forEach((link) => { link.href = `mailto:${profile.email}`; });
    }
    if (profile.resume) {
      $$("a[href$='.pdf']").forEach((link) => { link.href = profile.resume; });
    }
  }

  function renderContent() {
    renderPrinciples();
    renderWorkflow();
    renderExperience();
    renderProjects();
    renderEducation();
    renderPublications();
    renderSkills();
    window.dispatchEvent(new Event("portfolio:content-rendered"));
  }

  function renderPrinciples() {
    const root = $("#principle-strip");
    if (!root || !data.principles) return;
    root.innerHTML = data.principles.map((item) => `
      <article class="principle-card reveal">
        <strong>${escapeHTML(item.label)}</strong>
        <span>${escapeHTML(item.detail)}</span>
      </article>
    `).join("");
  }

  function renderWorkflow() {
    const root = $("#workflow-grid");
    if (!root || !data.workflow) return;
    root.innerHTML = data.workflow.map((item) => `
      <article class="workflow-card reveal">
        <div class="workflow-step">
          <span>${escapeHTML(item.step)}</span>
          <i class="${escapeHTML(item.icon)}" aria-hidden="true"></i>
        </div>
        <h3>${escapeHTML(item.title)}</h3>
        <p class="pretext-fit">${escapeHTML(item.description)}</p>
      </article>
    `).join("");
  }

  function renderExperience() {
    const root = $("#experience-list");
    if (!root || !data.experience) return;
    root.innerHTML = data.experience.map((item) => `
      <article class="timeline-item reveal">
        <div class="timeline-dot" aria-hidden="true"></div>
        <div class="timeline-card">
          <div class="timeline-header">
            <div>
              <h3>${escapeHTML(item.title)} <span>@ ${escapeHTML(item.company)}</span></h3>
              <p>${escapeHTML(item.location)}</p>
            </div>
            <time>${escapeHTML(item.date)}</time>
          </div>
          <div class="tag-row">${item.tags.map((tag) => `<span>${escapeHTML(tag)}</span>`).join("")}</div>
          <ul>${item.bullets.map((bullet) => `<li>${escapeHTML(bullet)}</li>`).join("")}</ul>
        </div>
      </article>
    `).join("");
  }

  function renderProjects() {
    const root = $("#project-grid");
    if (!root || !data.projects) return;
    const projects = data.projects.filter((project) => state.activeFilter === "all" || project.category.includes(state.activeFilter));
    root.innerHTML = projects.map((project) => `
      <article class="project-card reveal" data-categories="${escapeHTML(project.category.join(" "))}">
        <div class="project-card-top">
          <span class="project-status">${escapeHTML(project.status)}</span>
          <span class="project-index">${escapeHTML(project.category[0] || "work")}</span>
        </div>
        <h3>${escapeHTML(project.title)}</h3>
        <p class="pretext-fit">${escapeHTML(project.summary)}</p>
        <div class="highlight-row">${project.highlights.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}</div>
        <div class="tech-row">${project.tech.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}</div>
      </article>
    `).join("");
    observeNewReveals(root);
    window.dispatchEvent(new Event("resize"));
  }

  function renderEducation() {
    const root = $("#education-grid");
    if (!root || !data.education) return;
    root.innerHTML = data.education.map((item) => `
      <article class="education-card reveal">
        <div class="education-date">${escapeHTML(item.date)}</div>
        <h3>${escapeHTML(item.degree)}</h3>
        <p><strong>${escapeHTML(item.institution)}</strong></p>
        <p>${escapeHTML(item.notes)}</p>
        <div class="skill-cloud">${item.courses.map((course) => `<span>${escapeHTML(course)}</span>`).join("")}</div>
      </article>
    `).join("");
  }

  function renderPublications() {
    const root = $("#publication-grid");
    if (!root || !data.publications) return;
    root.innerHTML = data.publications.map((item) => `
      <article class="publication-card reveal">
        <span>${escapeHTML(item.type)}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p class="publication-meta">${escapeHTML(item.meta)}</p>
        <p class="pretext-fit">${escapeHTML(item.description)}</p>
      </article>
    `).join("");
  }

  function renderSkills() {
    const root = $("#skills-grid");
    if (!root || !data.skills) return;
    root.innerHTML = data.skills.map((group) => `
      <article class="skill-card reveal">
        <h3>${escapeHTML(group.title)}</h3>
        <div class="skill-cloud">${group.items.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}</div>
      </article>
    `).join("");
  }

  function setupNavigation() {
    const toggle = $("#menu-toggle");
    const links = $("#nav-links");

    toggle?.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    $$(".nav-links a, .brand").forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        toggle?.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        document.body.classList.remove("nav-open");
        toggle?.setAttribute("aria-expanded", "false");
        closePalette();
      }
    });

    document.addEventListener("click", (event) => {
      if (!document.body.classList.contains("nav-open")) return;
      if (links?.contains(event.target) || toggle?.contains(event.target)) return;
      document.body.classList.remove("nav-open");
      toggle?.setAttribute("aria-expanded", "false");
    });
  }

  let revealObserver;
  function setupRevealAnimations() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      $$(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    $$(".reveal").forEach((el) => revealObserver.observe(el));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        $$(".nav-links a").forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    }, { threshold: 0.25, rootMargin: "-20% 0px -60% 0px" });

    $$("main section[id]").forEach((section) => sectionObserver.observe(section));
  }

  function observeNewReveals(root) {
    if (!revealObserver) return;
    $$(".reveal:not(.visible)", root).forEach((el) => revealObserver.observe(el));
  }

  function setupProjectFilters() {
    $$(".filter-button").forEach((button) => {
      button.addEventListener("click", () => {
        state.activeFilter = button.dataset.filter || "all";
        $$(".filter-button").forEach((item) => item.classList.toggle("active", item === button));
        renderProjects();
      });
    });
  }

  function setupHeaderState() {
    const header = $("#site-header");
    let ticking = false;
    const update = () => {
      header?.classList.toggle("scrolled", window.scrollY > 18);
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (ticking) return;
      window.requestAnimationFrame(update);
      ticking = true;
    }, { passive: true });
    update();
  }

  function setupSpotlight() {
    const spotlight = $("#cursor-spotlight");
    if (!spotlight || window.matchMedia("(pointer: coarse)").matches) return;
    window.addEventListener("pointermove", (event) => {
      spotlight.style.setProperty("--x", `${event.clientX}px`);
      spotlight.style.setProperty("--y", `${event.clientY}px`);
    }, { passive: true });
  }

  function setupWaferMap() {
    const root = $("#wafer-map");
    if (!root) return;
    const cells = 72;
    root.innerHTML = Array.from({ length: cells }, (_, index) => {
      const ring = Math.abs((index % 12) - 5.5) + Math.abs(Math.floor(index / 12) - 2.5);
      const stateClass = ring > 7 ? "off" : (index % 17 === 0 || index % 31 === 0 ? "hot" : index % 9 === 0 ? "watch" : "ok");
      return `<span class="${stateClass}" aria-hidden="true"></span>`;
    }).join("");
  }

  function setupTypedText() {
    const target = $("#typed-role");
    const words = data.typedRoles || [];
    if (!target || !words.length) return;

    const tick = () => {
      const word = words[state.typedIndex % words.length];
      state.typedChar += state.deleting ? -1 : 1;
      target.textContent = word.slice(0, state.typedChar);

      if (!state.deleting && state.typedChar === word.length) {
        state.deleting = true;
        window.setTimeout(tick, 1200);
        return;
      }

      if (state.deleting && state.typedChar === 0) {
        state.deleting = false;
        state.typedIndex += 1;
      }

      window.setTimeout(tick, state.deleting ? 34 : 58);
    };
    tick();
  }

  function setupCommandPalette() {
    const palette = $("#command-palette");
    const button = $("#command-button");
    const close = $("#command-close");
    const list = $("#command-list");
    const commands = [
      { label: "Signal", href: "#about", icon: "fa-solid fa-fingerprint" },
      { label: "FA Flow", href: "#workflow", icon: "fa-solid fa-wave-square" },
      { label: "Experience", href: "#experience", icon: "fa-solid fa-briefcase" },
      { label: "Work", href: "#projects", icon: "fa-solid fa-microchip" },
      { label: "Stack", href: "#skills", icon: "fa-solid fa-layer-group" },
      { label: "Resume", href: data.profile?.resume || "assets/docs/Edidi_Sai_Anant_Resume.pdf", icon: "fa-solid fa-file-lines", external: true },
      { label: "Email", href: `mailto:${data.profile?.email || "esanant@gmail.com"}`, icon: "fa-solid fa-envelope", external: true }
    ];

    if (list) {
      list.innerHTML = commands.map((command) => `
        <a class="command-item" href="${escapeHTML(command.href)}" ${command.external ? 'target="_blank" rel="noopener noreferrer"' : ""}>
          <i class="${escapeHTML(command.icon)}" aria-hidden="true"></i>
          <span>${escapeHTML(command.label)}</span>
        </a>
      `).join("");
    }

    const openPalette = () => {
      if (!palette) return;
      document.body.classList.add("palette-open");
      palette.setAttribute("aria-hidden", "false");
      $(".command-item")?.focus();
    };

    window.closePalette = closePalette;
    button?.addEventListener("click", openPalette);
    close?.addEventListener("click", closePalette);
    palette?.addEventListener("click", (event) => {
      if (event.target === palette) closePalette();
    });
    $$(".command-item").forEach((item) => item.addEventListener("click", closePalette));

    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openPalette();
      }
    });
  }

  function closePalette() {
    const palette = $("#command-palette");
    document.body.classList.remove("palette-open");
    palette?.setAttribute("aria-hidden", "true");
  }

  function setupLenis() {
    if (!window.Lenis || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new window.Lenis({ duration: 0.9, smoothWheel: true, wheelMultiplier: 0.85 });
    function raf(time) {
      lenis.raf(time);
      window.requestAnimationFrame(raf);
    }
    window.requestAnimationFrame(raf);
    document.documentElement.dataset.lenis = "active";
  }

  function setupMotion() {
    if (!window.gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    gsap.from(".brand-mark", { rotate: -12, scale: 0.86, duration: 0.7, ease: "power3.out" });
    gsap.to(".wafer-map span.hot", {
      opacity: 0.38,
      scale: 0.72,
      yoyo: true,
      repeat: -1,
      duration: 1.4,
      stagger: 0.08,
      ease: "sine.inOut"
    });

    if (window.ScrollTrigger) {
      gsap.utils.toArray(".workflow-card").forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 88%" },
          y: 24,
          opacity: 0,
          duration: 0.55,
          delay: index * 0.04,
          ease: "power2.out"
        });
      });
    }
  }
})();
