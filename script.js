/* Portfolio v4.2 Final JavaScript
Advanced Snap Navigation & Interactivity with Highlighted Skills
*/

document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const header = document.querySelector(".main-header");
  const navLinks = document.querySelectorAll(".nav-links a");
  const mainContainer = document.querySelector("main");
  const sections = document.querySelectorAll("section[id]");
  const tabList = document.querySelector(".experience-tabs .tab-list");
  const tabButtons = document.querySelectorAll(".experience-tabs .tab-button");
  const tabPanels = document.querySelectorAll(".experience-tabs .tab-panel");

  // Hide loader and show content
  setTimeout(() => {
    loader.classList.add("hidden");
    header.classList.add("visible");
    document.querySelector("#hero").classList.add("visible");
    mainContainer.style.opacity = "1";
  }, 1500);

  // Initialize particles.js for background
  if (typeof particlesJS !== "undefined") {
    particlesJS("interactive-bg", {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#8892b0" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 2, random: true },
        line_linked: { enable: true, distance: 150, color: "#8892b0", opacity: 0.2, width: 1 },
        move: { enable: true, speed: 1, direction: "none", out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
        modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
      },
      retina_detect: true
    });
  }

  // Intersection Observer for section reveal & nav highlight
  const observerOptions = { root: mainContainer, threshold: 0.5 };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Highlight nav link
        const id = entry.target.id;
        navLinks.forEach(link => link.classList.toggle("active", link.dataset.section === id));
      }
    });
  }, observerOptions);
  sections.forEach(section => sectionObserver.observe(section));

  // Smooth scroll nav links
  navLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Experience tabs logic
  tabList.addEventListener("click", e => {
    const clicked = e.target.closest(".tab-button");
    if (!clicked) return;
    const tabId = clicked.dataset.tab;
    tabButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.tab === tabId);
      btn.setAttribute("aria-selected", btn.dataset.tab === tabId);
    });
    tabPanels.forEach(panel => panel.classList.toggle("active", panel.dataset.panel === tabId));
  });

  // Flip card keyboard accessibility & hover
  const flipCards = document.querySelectorAll(".flip-card");
  flipCards.forEach(card => {
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.querySelector(".card-inner").classList.toggle("flipped");
      }
    });
    card.addEventListener("mouseenter", () => {
      card.querySelector(".card-inner").classList.add("flipped");
    });
    card.addEventListener("mouseleave", () => {
      card.querySelector(".card-inner").classList.remove("flipped");
    });
  });
});
