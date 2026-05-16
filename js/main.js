(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const state = {
    activeFilter: "all",
    paletteOpen: false
  };

  const iconMap = {
    Google: "fa-brands fa-google",
    Internshala: "fa-solid fa-graduation-cap",
    edX: "fa-solid fa-university",
    Coursera: "fa-brands fa-python",
    Cisco: "fa-solid fa-network-wired"
  };

  const escapeHTML = (value = "") => String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", hideLoader, { once: true });
  window.setTimeout(hideLoader, 1200);

  function init() {
    renderContent();
    setupNavigation();
    setupRevealAnimations();
    setupProjectFilters();
    setupCommandPalette();
    setupSpotlight();
    setupParticles();
    setupTypedText();
    setupHeaderState();
  }

  function hideLoader() {
    const loader = $("#loader");
    if (!loader || loader.classList.contains("hidden")) return;
    loader.classList.add("hidden");
    window.setTimeout(() => loader.remove(), 500);
  }

  function renderContent() {
    renderFocusAreas();
    renderEducation();
    renderExperience();
    renderProjects();
    renderPublications();
    renderSkills();
    renderCertifications();
    hydrateProfileLinks();
  }

  function hydrateProfileLinks() {
    const email = data.profile?.email;
    const resume = data.profile?.resume;
    if (email) {
      $$("a[href^='mailto:']").forEach((link) => link.href = `mailto:${email}`);
    }
    if (resume) {
      $$("a[href$='.pdf']").forEach((link) => link.href = resume);
    }
  }

  function renderFocusAreas() {
    const root = $("#focus-grid");
    if (!root || !data.focusAreas) return;
    root.innerHTML = data.focusAreas.map((item) => `
      <article class="focus-card reveal">
        <i class="${escapeHTML(item.icon)}" aria-hidden="true"></i>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.description)}</p>
      </article>
    `).join("");
  }


  function renderEducation() {
    const root = $("#education-grid");
    if (!root || !data.education) return;
    root.innerHTML = data.education.map((item) => `
      <article class="education-card reveal">
        <div class="education-date">${escapeHTML(item.date)}</div>
        <h3>${escapeHTML(item.degree)}</h3>
        <p>${escapeHTML(item.institution)}</p>
        <div class="skill-cloud">${item.courses.map((course) => `<span>${escapeHTML(course)}</span>`).join("")}</div>
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
    const projects = data.projects.filter((project) => {
      return state.activeFilter === "all" || project.category.includes(state.activeFilter);
    });

    root.innerHTML = projects.map((project) => `
      <article class="project-card reveal" data-categories="${escapeHTML(project.category.join(" "))}">
        <div class="project-card-top">
          <span class="project-status">${escapeHTML(project.status)}</span>
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </div>
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.summary)}</p>
        <div class="highlight-row">${project.highlights.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}</div>
        <div class="tech-row">${project.tech.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}</div>
      </article>
    `).join("");
    observeNewReveals(root);
  }

  function renderPublications() {
    const root = $("#publication-grid");
    if (!root || !data.publications) return;
    root.innerHTML = data.publications.map((item) => `
      <article class="publication-card reveal">
        <span>${escapeHTML(item.type)}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p class="publication-meta">${escapeHTML(item.meta)}</p>
        <p>${escapeHTML(item.description)}</p>
      </article>
    `).join("");
  }

  function renderSkills() {
    const root = $("#skills-grid");
    if (!root || !data.skills) return;
    root.innerHTML = data.skills.map((group) => `
      <article class="skill-card reveal">
        <h3>${escapeHTML(group.title)}</h3>
        <div class="skill-cloud">
          ${group.items.map((item) => `<span>${escapeHTML(item)}</span>`).join("")}
        </div>
      </article>
    `).join("");
  }

  function renderCertifications() {
    const root = $("#cert-grid");
    if (!root || !data.certifications) return;
    root.innerHTML = data.certifications.map((item) => `
      <article class="cert-card reveal">
        <i class="${iconMap[item.provider] || "fa-solid fa-certificate"}" aria-hidden="true"></i>
        <div>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(item.provider)} · ${escapeHTML(item.date)}</p>
        </div>
      </article>
    `).join("");
  }

  function setupNavigation() {
    const toggle = $("#menu-toggle");
    const links = $("#nav-links");
    const navLinks = $$(".nav-links a, .brand");

    toggle?.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    navLinks.forEach((link) => {
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
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
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
    }, { threshold: 0.3, rootMargin: "-20% 0px -60% 0px" });

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
      header?.classList.toggle("scrolled", window.scrollY > 24);
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

  function setupParticles() {
    if (!window.particlesJS || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    window.particlesJS("particles-js", {
      particles: {
        number: { value: isMobile ? 22 : 58, density: { enable: true, value_area: 900 } },
        color: { value: ["#64ffda", "#d38a5c", "#7c5cff"] },
        shape: { type: "circle" },
        opacity: { value: 0.22, random: true },
        size: { value: isMobile ? 1.5 : 2.2, random: true },
        line_linked: { enable: true, distance: isMobile ? 100 : 150, color: "#64ffda", opacity: 0.12, width: 1 },
        move: { enable: true, speed: isMobile ? 0.25 : 0.45, random: true, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: !isMobile, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { grab: { distance: 160, line_linked: { opacity: 0.25 } }, push: { particles_nb: 2 } }
      },
      retina_detect: true
    });
  }

  function setupTypedText() {
    const target = $("#typed-role");
    if (!target || !window.Typed || !data.typedRoles) return;
    new window.Typed(target, {
      strings: data.typedRoles,
      typeSpeed: 45,
      backSpeed: 24,
      backDelay: 1400,
      loop: true,
      smartBackspace: true
    });
  }

  function setupCommandPalette() {
    const palette = $("#command-palette");
    const button = $("#command-button");
    const search = $("#command-search");
    const results = $("#command-results");
    if (!palette || !button || !search || !results) return;

    const commands = [
      { label: "About", detail: "Who Sai is now", href: "#about", icon: "fa-solid fa-user" },
      { label: "Education", detail: "NUS and SRM", href: "#education", icon: "fa-solid fa-graduation-cap" },
      { label: "Experience", detail: "Micron, NUS, internships", href: "#experience", icon: "fa-solid fa-briefcase" },
      { label: "Projects", detail: "Automation, AI, VLSI, FPGA", href: "#projects", icon: "fa-solid fa-diagram-project" },
      { label: "Publications", detail: "Papers and patent", href: "#publications", icon: "fa-solid fa-book" },
      { label: "Skills", detail: "Tools and technical stack", href: "#skills", icon: "fa-solid fa-code" },
      { label: "Resume", detail: "Open PDF", href: data.profile?.resume || "assets/docs/Edidi_Sai_Anant_Resume.pdf", icon: "fa-solid fa-file-pdf", external: true },
      { label: "LinkedIn", detail: "Open profile", href: data.profile?.linkedin || "https://www.linkedin.com/in/sai-anant/", icon: "fa-brands fa-linkedin", external: true },
      { label: "GitHub", detail: "Open projects", href: data.profile?.github || "https://github.com/ESAnant", icon: "fa-brands fa-github", external: true }
    ];

    const renderCommands = () => {
      const query = search.value.trim().toLowerCase();
      const visible = commands.filter((command) => {
        return `${command.label} ${command.detail}`.toLowerCase().includes(query);
      });
      results.innerHTML = visible.map((command, index) => `
        <button class="command-item" data-index="${index}" data-href="${escapeHTML(command.href)}" data-external="${command.external ? "true" : "false"}">
          <i class="${escapeHTML(command.icon)}" aria-hidden="true"></i>
          <span><strong>${escapeHTML(command.label)}</strong><small>${escapeHTML(command.detail)}</small></span>
        </button>
      `).join("") || `<p class="empty-state">No matches found.</p>`;
    };

    button.addEventListener("click", openPalette);
    search.addEventListener("input", renderCommands);

    document.addEventListener("keydown", (event) => {
      const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
      if (isShortcut) {
        event.preventDefault();
        state.paletteOpen ? closePalette() : openPalette();
      }
      if (state.paletteOpen && event.key === "Enter") {
        const first = $(".command-item", results);
        first?.click();
      }
    });

    palette.addEventListener("click", (event) => {
      if (event.target.closest("[data-close-palette]")) closePalette();
      const command = event.target.closest(".command-item");
      if (!command) return;
      navigateToCommand(command.dataset.href, command.dataset.external === "true");
    });

    function openPalette() {
      state.paletteOpen = true;
      palette.hidden = false;
      document.body.classList.add("palette-open");
      search.value = "";
      renderCommands();
      window.requestAnimationFrame(() => search.focus());
    }
  }

  function closePalette() {
    const palette = $("#command-palette");
    if (!palette) return;
    state.paletteOpen = false;
    palette.hidden = true;
    document.body.classList.remove("palette-open");
  }

  function navigateToCommand(href, external) {
    closePalette();
    if (!href) return;
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    $(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
})();
