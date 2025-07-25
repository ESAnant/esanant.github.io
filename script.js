// Advanced Portfolio JavaScript - Edidi Sai Anant - Mobile Compatible

document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const loader = document.getElementById("loader");
    const header = document.querySelector(".main-header");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll(".section");
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const flipCards = document.querySelectorAll(".flip-card");
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const navLinksContainer = document.getElementById("nav-links");
    
    // State management
    let isScrolling = false;
    let isMobile = window.innerWidth <= 768;
    
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
        setupMobileMenu();
        setupMobileOptimizations();
        setupAccessibility();
    }
    
    // Loader Animation
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
    
    // Mobile-Optimized Particles.js Background
    function setupParticles() {
        if (typeof particlesJS !== "undefined") {
            const particleConfig = {
                particles: {
                    number: { 
                        value: isMobile ? 30 : 80, // Reduced particles on mobile
                        density: { enable: true, value_area: 800 } 
                    },
                    color: { value: "#64ffda" },
                    shape: { 
                        type: "circle",
                        stroke: { width: 0, color: "#000000" }
                    },
                    opacity: { 
                        value: isMobile ? 0.2 : 0.3, // Lower opacity on mobile
                        random: true,
                        anim: { enable: true, speed: 1, opacity_min: 0.1 }
                    },
                    size: { 
                        value: isMobile ? 1.5 : 2, // Smaller particles on mobile
                        random: true,
                        anim: { enable: true, speed: 2, size_min: 0.1 }
                    },
                    line_linked: { 
                        enable: true, 
                        distance: isMobile ? 100 : 150, // Shorter lines on mobile
                        color: "#d38a5c", 
                        opacity: 0.2, 
                        width: 1 
                    },
                    move: { 
                        enable: true, 
                        speed: isMobile ? 0.5 : 1, // Slower movement on mobile
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
                        push: { particles_nb: 4 },
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
            // Don't interfere with mobile keyboard
            if (isMobile) return;
            
            if (e.key === "ArrowDown" || e.key === "PageDown") {
                e.preventDefault();
                scrollToNextSection();
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                e.preventDefault();
                scrollToPrevSection();
            }
        });
    }
    
    // Mobile Menu Functionality
    function setupMobileMenu() {
        if (!mobileMenuToggle) return;
        
        mobileMenuToggle.addEventListener("click", toggleMobileMenu);
        
        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (isMobile && 
                navLinksContainer.classList.contains("open") && 
                !navLinksContainer.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navLinksContainer.classList.contains("open")) {
                closeMobileMenu();
            }
        });
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
        mobileMenuToggle.classList.add("active");
        navLinksContainer.classList.add("open");
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
    
    function closeMobileMenu() {
        mobileMenuToggle.classList.remove("active");
        navLinksContainer.classList.remove("open");
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
        
        tabButtons.forEach(button => {
            button.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    button.click();
                }
            });
        });
    }
    
    // Enhanced Flip Cards with Mobile Support
    function setupFlipCards() {
        flipCards.forEach(card => {
            let isFlipped = false;
            let touchStartTime = 0;
            
            // Desktop hover behavior
            if (!isMobile) {
                card.addEventListener("mouseenter", () => {
                    flipCard(card, true);
                });
                
                card.addEventListener("mouseleave", () => {
                    flipCard(card, false);
                });
            }
            
            // Mobile touch behavior
            if (isMobile) {
                card.addEventListener("touchstart", (e) => {
                    touchStartTime = Date.now();
                });
                
                card.addEventListener("touchend", (e) => {
                    const touchDuration = Date.now() - touchStartTime;
                    if (touchDuration < 300) { // Quick tap
                        e.preventDefault();
                        isFlipped = !isFlipped;
                        flipCard(card, isFlipped);
                    }
                });
            }
            
            // Keyboard support
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    isFlipped = !isFlipped;
                    flipCard(card, isFlipped);
                }
            });
            
            // Focus management
            card.addEventListener("focus", () => {
                card.style.outline = "2px solid var(--color-accent-copper)";
                card.style.outlineOffset = "4px";
            });
            
            card.addEventListener("blur", () => {
                card.style.outline = "none";
                if (!isMobile) {
                    flipCard(card, false);
                }
            });
        });
        
        function flipCard(card, shouldFlip) {
            const cardInner = card.querySelector(".card-inner");
            if (shouldFlip) {
                cardInner.style.transform = "rotateY(180deg)";
                card.classList.add("flipped");
            } else {
                cardInner.style.transform = "rotateY(0deg)";
                card.classList.remove("flipped");
            }
        }
    }
    
    // Mobile-Optimized Scroll Snap
    function setupScrollSnap() {
        let wheelTimeout;
        
        // Only enable wheel navigation on desktop
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
            }, { passive: true });
        }
        
        // Touch/swipe support for mobile
        if (isMobile) {
            let startY = 0;
            let endY = 0;
            let startTime = 0;
            
            document.addEventListener("touchstart", (e) => {
                startY = e.touches[0].clientY;
                startTime = Date.now();
            }, { passive: true });
            
            document.addEventListener("touchmove", (e) => {
                endY = e.touches[0].clientY;
            }, { passive: true });
            
            document.addEventListener("touchend", () => {
                const deltaY = startY - endY;
                const deltaTime = Date.now() - startTime;
                const threshold = 50;
                const maxTime = 300; // Maximum swipe time
                
                if (Math.abs(deltaY) > threshold && 
                    deltaTime < maxTime && 
                    !isScrolling &&
                    !navLinksContainer.classList.contains("open")) {
                    
                    if (deltaY > 0) {
                        scrollToNextSection();
                    } else {
                        scrollToPrevSection();
                    }
                }
            }, { passive: true });
        }
    }
    
    // Intersection Observer
    function setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: isMobile ? "-20% 0px -20% 0px" : "-10% 0px -10% 0px",
            threshold: isMobile ? 0.3 : 0.5
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
    
    // Mobile-Specific Optimizations
    function setupMobileOptimizations() {
        // Detect device orientation changes
        window.addEventListener("orientationchange", () => {
            setTimeout(() => {
                window.location.reload(); // Refresh particles on orientation change
            }, 500);
        });
        
        // Optimize scroll performance on mobile
        if (isMobile) {
            let ticking = false;
            
            function updateScrollPosition() {
                // Throttled scroll updates for mobile
                ticking = false;
            }
            
            function requestTick() {
                if (!ticking) {
                    requestAnimationFrame(updateScrollPosition);
                    ticking = true;
                }
            }
            
            window.addEventListener("scroll", requestTick, { passive: true });
        }
        
        // Handle mobile keyboard appearance
        if (isMobile) {
            const viewport = document.querySelector('meta[name="viewport"]');
            
            window.addEventListener("resize", () => {
                // Adjust for mobile keyboard
                if (window.innerHeight < 500) {
                    viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, height=" + window.innerHeight);
                } else {
                    viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
                }
            });
        }
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
            }, isMobile ? 800 : 1000);
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
        
        // Reduce animation complexity on mobile
        const delay = isMobile ? 50 : 100;
        
        animatableElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = "0";
                element.style.transform = "translateY(30px)";
                element.style.transition = `opacity ${isMobile ? '0.4s' : '0.6s'} ease-out, transform ${isMobile ? '0.4s' : '0.6s'} ease-out`;
                
                requestAnimationFrame(() => {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                });
            }, index * delay);
        });
    }
    
    // Accessibility
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
    }
    
    // Resize handler for responsive updates
    window.addEventListener("resize", debounce(() => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth <= 768;
        
        // Reinitialize if device type changed
        if (wasMobile !== isMobile) {
            setupParticles();
            setupFlipCards();
            setupScrollSnap();
        }
        
        // Close mobile menu on resize to desktop
        if (!isMobile && navLinksContainer.classList.contains("open")) {
            closeMobileMenu();
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
    
    // Performance monitoring for mobile
    if (isMobile && 'performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            if (loadTime > 3000) {
                console.warn('Slow loading detected on mobile device');
                // Could disable some animations here if needed
            }
        });
    }
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-smooth', 'none');
    document.documentElement.style.setProperty('--transition-bounce', 'none');
}
