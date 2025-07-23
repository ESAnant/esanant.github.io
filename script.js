// Advanced Portfolio JavaScript - Edidi Sai Anant
// Snap Navigation & Interactive Features

document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const loader = document.getElementById("loader");
    const header = document.querySelector(".main-header");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll(".section");
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const flipCards = document.querySelectorAll(".flip-card");
    
    // Initialize
    init();
    
    function init() {
        setupLoader();
        setupParticles();
        setupNavigation();
        setupTabs();
        setupFlipCards();
        setupScrollSnap();
        setupIntersectionObserver();
    }
    
    // Loader Animation
    function setupLoader() {
        setTimeout(() => {
            loader.classList.add("hidden");
            header.classList.add("visible");
            
            // Reveal first section
            const heroSection = document.querySelector("#hero");
            if (heroSection) {
                heroSection.classList.add("visible");
            }
        }, 2000);
    }
    
    // Particles.js Background
    function setupParticles() {
        if (typeof particlesJS !== "undefined") {
            particlesJS("interactive-bg", {
                particles: {
                    number: { 
                        value: 80, 
                        density: { enable: true, value_area: 800 } 
                    },
                    color: { value: "#64ffda" },
                    shape: { 
                        type: "circle",
                        stroke: { width: 0, color: "#000000" }
                    },
                    opacity: { 
                        value: 0.3, 
                        random: true,
                        anim: { enable: true, speed: 1, opacity_min: 0.1 }
                    },
                    size: { 
                        value: 2, 
                        random: true,
                        anim: { enable: true, speed: 2, size_min: 0.1 }
                    },
                    line_linked: { 
                        enable: true, 
                        distance: 150, 
                        color: "#d38a5c", 
                        opacity: 0.2, 
                        width: 1 
                    },
                    move: { 
                        enable: true, 
                        speed: 1, 
                        direction: "none", 
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false 
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: { 
                        onhover: { enable: true, mode: "grab" }, 
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    },
                    modes: { 
                        grab: { 
                            distance: 140, 
                            line_linked: { opacity: 0.5 } 
                        }, 
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    // Navigation Setup
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = link.getAttribute("href");
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Smooth scroll to section
                    targetSection.scrollIntoView({ 
                        behavior: "smooth",
                        block: "start"
                    });
                    
                    // Update active nav link
                    updateActiveNavLink(targetId.substring(1));
                }
            });
        });
        
        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown" || e.key === "PageDown") {
                e.preventDefault();
                scrollToNextSection();
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                e.preventDefault();
                scrollToPrevSection();
            }
        });
    }
    
    // Tab Functionality
    function setupTabs() {
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                const tabId = button.dataset.tab;
                
                // Update active tab button
                tabButtons.forEach(btn => {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-selected", "false");
                });
                button.classList.add("active");
                button.setAttribute("aria-selected", "true");
                
                // Update active tab panel
                tabPanels.forEach(panel => {
                    panel.classList.remove("active");
                });
                const activePanel = document.querySelector(`[data-panel="${tabId}"]`);
                if (activePanel) {
                    activePanel.classList.add("active");
                }
            });
        });
        
        // Keyboard support for tabs
        tabButtons.forEach(button => {
            button.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }
    
    // Flip Cards Setup
    function setupFlipCards() {
        flipCards.forEach(card => {
            // Keyboard accessibility
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    card.querySelector(".card-inner").classList.toggle("flipped");
                }
            });
            
            // Mouse interactions
            card.addEventListener("mouseenter", () => {
                card.querySelector(".card-inner").classList.add("flipped");
            });
            
            card.addEventListener("mouseleave", () => {
                card.querySelector(".card-inner").classList.remove("flipped");
            });
            
            // Touch support for mobile
            card.addEventListener("touchstart", () => {
                const cardInner = card.querySelector(".card-inner");
                cardInner.classList.toggle("flipped");
            });
        });
    }
    
    // Scroll Snap Functionality
    function setupScrollSnap() {
        let isScrolling = false;
        
        document.addEventListener("wheel", (e) => {
            if (isScrolling) return;
            
            e.preventDefault();
            isScrolling = true;
            
            if (e.deltaY > 0) {
                scrollToNextSection();
            } else {
                scrollToPrevSection();
            }
            
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }, { passive: false });
    }
    
    // Intersection Observer for section visibility
    function setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: "-10% 0px -10% 0px",
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class
                    entry.target.classList.add("visible");
                    
                    // Update navigation
                    const sectionId = entry.target.id;
                    updateActiveNavLink(sectionId);
                    
                    // Animate section content
                    animateSectionContent(entry.target);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }
    
    // Helper Functions
    function getCurrentSectionIndex() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const sectionBottom = sectionTop + rect.height;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                return i;
            }
        }
        return 0;
    }
    
    function scrollToSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ 
                behavior: "smooth",
                block: "start"
            });
        }
    }
    
    function scrollToNextSection() {
        const currentIndex = getCurrentSectionIndex();
        scrollToSection(currentIndex + 1);
    }
    
    function scrollToPrevSection() {
        const currentIndex = getCurrentSectionIndex();
        scrollToSection(currentIndex - 1);
    }
    
    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.dataset.section === sectionId) {
                link.classList.add("active");
            }
        });
    }
    
    function animateSectionContent(section) {
        const animatableElements = section.querySelectorAll(
            ".education-card, .cert-card, .skill-category, .flip-card, .publication-item, .patent-item"
        );
        
        animatableElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = "0";
                element.style.transform = "translateY(30px)";
                element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
                
                requestAnimationFrame(() => {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                });
            }, index * 100);
        });
    }
    
    // Smooth scroll polyfill for older browsers
    function smoothScrollTo(targetY, duration = 1000) {
        const startY = window.scrollY;
        const difference = targetY - startY;
        const startTime = performance.now();
        
        function step() {
            const progress = (performance.now() - startTime) / duration;
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startY + (difference * ease));
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    // Performance optimization
    let ticking = false;
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }
    
    function updateScrollPosition() {
        // Update any scroll-dependent animations here
        ticking = false;
    }
    
    window.addEventListener("scroll", requestTick);
    
    // Resize handler
    window.addEventListener("resize", debounce(() => {
        // Handle responsive adjustments
        if (window.innerWidth <= 768) {
            // Mobile-specific adjustments
            flipCards.forEach(card => {
                card.removeEventListener("mouseenter", () => {});
                card.removeEventListener("mouseleave", () => {});
            });
        }
    }, 250));
    
    // Debounce utility
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Accessibility improvements
    function setupAccessibility() {
        // Skip to content link
        const skipLink = document.createElement("a");
        skipLink.href = "#hero";
        skipLink.textContent = "Skip to main content";
        skipLink.className = "skip-link";
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-accent-copper);
            color: var(--color-bg);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener("focus", () => {
            skipLink.style.top = "6px";
        });
        
        skipLink.addEventListener("blur", () => {
            skipLink.style.top = "-40px";
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Announce section changes to screen readers
        const announcer = document.createElement("div");
        announcer.setAttribute("aria-live", "polite");
        announcer.setAttribute("aria-atomic", "true");
        announcer.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(announcer);
        
        // Update announcer when section changes
        const originalUpdateActiveNavLink = updateActiveNavLink;
        updateActiveNavLink = function(sectionId) {
            originalUpdateActiveNavLink(sectionId);
            const sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
            announcer.textContent = `Navigated to ${sectionName} section`;
        };
    }
    
    setupAccessibility();
});
