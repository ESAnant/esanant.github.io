// Advanced Portfolio JavaScript - Edidi Sai Anant - Mobile Compatible

document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const loader = document.getElementById("loader");
    const header = document.querySelector(".main-header");
    const navLinks = document.querySelectorAll(".nav-links a");
    const navLinksContainer = document.querySelector(".nav-links");
    const sections = document.querySelectorAll(".section");
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const flipCards = document.querySelectorAll(".flip-card");
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    
    // State Management
    let isScrolling = false;
    let isMobile = window.innerWidth <= 768;
    
    // Initialize
    init();
    
    function init() {
        setupLoader();
        setupParticles();
        setupNavigation();
        setupMobileMenu();
        setupTabs();
        setupFlipCards();
        setupScrollSnap();
        setupIntersectionObserver();
        setupAccessibility();
        setupResizeHandler();
    }
    
    // Enhanced Loader Animation
    function setupLoader() {
        setTimeout(() => {
            loader.classList.add("hidden");
            
            // Reveal first section
            const heroSection = document.querySelector("#hero");
            if (heroSection) {
                heroSection.classList.add("visible");
            }
        }, 2000);
    }
    
    // Adaptive Particles.js Background
    function setupParticles() {
        if (typeof particlesJS !== "undefined") {
            const particleConfig = {
                particles: {
                    number: { 
                        value: isMobile ? 30 : 80, // Fewer particles on mobile
                        density: { enable: true, value_area: 800 } 
                    },
                    color: { value: "#64ffda" },
                    shape: { 
                        type: "circle",
                        stroke: { width: 0, color: "#000000" }
                    },
                    opacity: { 
                        value: isMobile ? 0.2 : 0.3, // Lighter on mobile
                        random: true,
                        anim: { enable: true, speed: 1, opacity_min: 0.1 }
                    },
                    size: { 
                        value: isMobile ? 1.5 : 2, // Smaller on mobile
                        random: true,
                        anim: { enable: true, speed: 2, size_min: 0.1 }
                    },
                    line_linked: { 
                        enable: true, 
                        distance: isMobile ? 100 : 150, // Shorter connections on mobile
                        color: "#d38a5c", 
                        opacity: 0.2, 
                        width: 1 
                    },
                    move: { 
                        enable: true, 
                        speed: isMobile ? 0.5 : 1, // Slower on mobile for performance
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
                        onhover: { enable: !isMobile, mode: "grab" }, // Disable hover on mobile
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    },
                    modes: { 
                        grab: { 
                            distance: 140, 
                            line_linked: { opacity: 0.5 } 
                        }, 
                        push: { particles_nb: isMobile ? 2 : 4 },
                        remove: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            };
            
            particlesJS("interactive-bg", particleConfig);
        }
    }
    
    // Enhanced Navigation Setup
    function setupNavigation() {
        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = link.getAttribute("href");
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Close mobile menu if open
                    if (isMobile && navLinksContainer.classList.contains("open")) {
                        closeMobileMenu();
                    }
                    
                    // Smooth scroll to section
                    targetSection.scrollIntoView({ 
                        behavior: "smooth",
                        block: "start"
                    });
                    
                    updateActiveNavLink(targetId.substring(1));
                }
            });
        });
        
        // Enhanced keyboard navigation
        document.addEventListener("keydown", (e) => {
            // Disable keyboard navigation when mobile menu is open
            if (isMobile && navLinksContainer.classList.contains("open")) {
                if (e.key === "Escape") {
                    closeMobileMenu();
                }
                return;
            }
            
            if (e.key === "ArrowDown" || e.key === "PageDown") {
                e.preventDefault();
                scrollToNextSection();
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                e.preventDefault();
                scrollToPrevSection();
            } else if (e.key === "Escape") {
                // Close any open elements
                closeMobileMenu();
            }
        });
    }
    
    // Mobile Menu Functionality
    function setupMobileMenu() {
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener("click", (e) => {
                e.stopPropagation();
                toggleMobileMenu();
            });
            
            // Close menu when clicking outside
            document.addEventListener("click", (e) => {
                if (isMobile && navLinksContainer.classList.contains("open")) {
                    if (!navLinksContainer.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                        closeMobileMenu();
                    }
                }
            });
            
            // Close menu on touch outside (mobile specific)
            document.addEventListener("touchstart", (e) => {
                if (isMobile && navLinksContainer.classList.contains("open")) {
                    if (!navLinksContainer.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                        closeMobileMenu();
                    }
                }
            });
        }
    }
    
    function toggleMobileMenu() {
        const isOpen = navLinksContainer.classList.contains("open");
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        navLinksContainer.classList.add("open");
        mobileMenuToggle.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
    
    function closeMobileMenu() {
        navLinksContainer.classList.remove("open");
        mobileMenuToggle.classList.remove("active");
        document.body.style.overflow = ""; // Restore scrolling
    }
    
    // Tab Functionality
    function setupTabs() {
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                const tabId = button.dataset.tab;
                
                tabButtons.forEach(btn => {
                    btn.classList.remove("active");
                    btn.setAttribute("aria-selected", "false");
                });
                button.classList.add("active");
                button.setAttribute("aria-selected", "true");
                
                tabPanels.forEach(panel => {
                    panel.classList.remove("active");
                });
                const activePanel = document.querySelector(`[data-panel="${tabId}"]`);
                if (activePanel) {
                    activePanel.classList.add("active");
                }
            });
        });
        
        // Enhanced keyboard support for tabs
        tabButtons.forEach((button, index) => {
            button.addEventListener("keydown", (e) => {
                switch(e.key) {
                    case "ArrowLeft":
                        e.preventDefault();
                        const prevIndex = index > 0 ? index - 1 : tabButtons.length - 1;
                        tabButtons[prevIndex].focus();
                        break;
                    case "ArrowRight":
                        e.preventDefault();
                        const nextIndex = index < tabButtons.length - 1 ? index + 1 : 0;
                        tabButtons[nextIndex].focus();
                        break;
                    case "Enter":
                    case " ":
                        e.preventDefault();
                        button.click();
                        break;
                }
            });
        });
    }
    
    // Enhanced Flip Cards with Mobile Support
    function setupFlipCards() {
        flipCards.forEach(card => {
            let isFlipped = false;
            let touchStartTime = 0;
            
            // Keyboard accessibility
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleCardFlip(card);
                }
            });
            
            if (isMobile) {
                // Mobile touch handling
                card.addEventListener("touchstart", (e) => {
                    touchStartTime = Date.now();
                }, { passive: true });
                
                card.addEventListener("touchend", (e) => {
                    const touchDuration = Date.now() - touchStartTime;
                    if (touchDuration < 300) { // Quick tap
                        e.preventDefault();
                        toggleCardFlip(card);
                    }
                }, { passive: false });
                
                // Add visual feedback for touch
                card.addEventListener("touchstart", () => {
                    card.style.transform = "scale(0.98)";
                });
                
                card.addEventListener("touchend", () => {
                    setTimeout(() => {
                        card.style.transform = "";
                    }, 150);
                });
                
            } else {
                // Desktop mouse interactions
                card.addEventListener("mouseenter", () => {
                    flipCard(card, true);
                });
                
                card.addEventListener("mouseleave", () => {
                    flipCard(card, false);
                });
            }
            
            // Focus management
            card.addEventListener("focus", () => {
                if (!isMobile) {
                    flipCard(card, true);
                }
            });
            
            card.addEventListener("blur", () => {
                if (!isMobile) {
                    flipCard(card, false);
                }
            });
        });
        
        function toggleCardFlip(card) {
            const cardInner = card.querySelector(".card-inner");
            const isCurrentlyFlipped = cardInner.style.transform.includes("rotateY(180deg)");
            flipCard(card, !isCurrentlyFlipped);
        }
        
        function flipCard(card, shouldFlip) {
            const cardInner = card.querySelector(".card-inner");
            cardInner.style.transform = shouldFlip ? "rotateY(180deg)" : "rotateY(0deg)";
        }
    }
    
    // Adaptive Scroll Snap Functionality
    function setupScrollSnap() {
        let wheelTimeout;
        
        // Enhanced wheel event handling (desktop only)
        if (!isMobile) {
            document.addEventListener("wheel", (e) => {
                if (isScrolling) return;
                
                clearTimeout(wheelTimeout);
                wheelTimeout = setTimeout(() => {
                    const delta = Math.sign(e.deltaY);
                    
                    if (delta > 0) {
                        scrollToNextSection();
                    } else {
                        scrollToPrevSection();
                    }
                }, 50);
            }, { passive: false });
        }
        
        // Touch/swipe support for mobile
        if (isMobile) {
            let startY = 0;
            let endY = 0;
            let startTime = 0;
            
            document.addEventListener("touchstart", (e) => {
                // Only handle swipes on main content, not on nav menu
                if (navLinksContainer.classList.contains("open")) return;
                
                startY = e.touches[0].clientY;
                startTime = Date.now();
            }, { passive: true });
            
            document.addEventListener("touchmove", (e) => {
                if (navLinksContainer.classList.contains("open")) return;
                endY = e.touches[0].clientY;
            }, { passive: true });
            
            document.addEventListener("touchend", () => {
                if (navLinksContainer.classList.contains("open")) return;
                
                const deltaY = startY - endY;
                const deltaTime = Date.now() - startTime;
                const threshold = 50;
                const maxTime = 500; // Maximum swipe time
                
                if (Math.abs(deltaY) > threshold && deltaTime < maxTime && !isScrolling) {
                    if (deltaY > 0) {
                        scrollToNextSection();
                    } else {
                        scrollToPrevSection();
                    }
                }
            }, { passive: true });
        }
    }
    
    // Intersection Observer for section visibility
    function setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: "-10% 0px -10% 0px",
            threshold: isMobile ? 0.3 : 0.5 // Lower threshold for mobile
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    const sectionId = entry.target.id;
                    updateActiveNavLink(sectionId);
                    animateSectionContent(entry.target);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }
    
    // Resize Handler for Responsive Behavior
    function setupResizeHandler() {
        let resizeTimeout;
        
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const newIsMobile = window.innerWidth <= 768;
                
                if (newIsMobile !== isMobile) {
                    isMobile = newIsMobile;
                    
                    // Close mobile menu if switching to desktop
                    if (!isMobile) {
                        closeMobileMenu();
                    }
                    
                    // Reinitialize particles with new settings
                    if (typeof particlesJS !== "undefined") {
                        setupParticles();
                    }
                    
                    // Reinitialize flip cards for new interaction method
                    setupFlipCards();
                }
            }, 250);
        });
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
        if (index >= 0 && index < sections.length && !isScrolling) {
            isScrolling = true;
            
            sections[index].scrollIntoView({ 
                behavior: "smooth",
                block: "start"
            });
            
            setTimeout(() => {
                isScrolling = false;
            }, isMobile ? 800 : 1000); // Faster on mobile
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
            }, index * (isMobile ? 50 : 100)); // Faster animations on mobile
        });
    }
    
    // Accessibility improvements
    function setupAccessibility() {
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
        
        const originalUpdateActiveNavLink = updateActiveNavLink;
        updateActiveNavLink = function(sectionId) {
            originalUpdateActiveNavLink(sectionId);
            const sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
            announcer.textContent = `Navigated to ${sectionName} section`;
        };
        
        // Skip link for better accessibility
        const skipLink = document.createElement("a");
        skipLink.href = "#hero";
        skipLink.textContent = "Skip to main content";
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
    }
    
    // Performance optimizations
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
    
    window.addEventListener("scroll", requestTick, { passive: true });
    
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
    
    // Error handling
    window.addEventListener('error', (e) => {
        console.error('Portfolio error:', e.error);
        // Graceful degradation - ensure basic functionality works
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add("hidden");
        }
    });
    
    // Prevent zoom on double tap (iOS Safari)
    if (isMobile) {
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
});

// Utility function to detect reduced motion preference
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-smooth', 'none');
    document.documentElement.style.setProperty('--transition-bounce', 'none');
}
