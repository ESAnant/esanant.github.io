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
        setupPerformanceOptimizations();
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
    
    // Particles.js Background - Mobile Optimized
    function setupParticles() {
        if (typeof particlesJS !== "undefined") {
            const particleConfig = {
                particles: {
                    number: { 
                        value: isMobile ? 30 : 80, // Reduced for mobile
                        density: { enable: true, value_area: 800 } 
                    },
                    color: { value: "#64ffda" },
                    shape: { 
                        type: "circle",
                        stroke: { width: 0, color: "#000000" }
                    },
                    opacity: { 
                        value: isMobile ? 0.2 : 0.3, // Reduced opacity on mobile
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
                        distance: isMobile ? 100 : 150, // Shorter connections on mobile
                        color: "#d38a5c", 
                        opacity: 0.2, 
                        width: 1 
                    },
                    move: { 
                        enable: true, 
                        speed: isMobile ? 0.5 : 1, // Slower on mobile
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
    
    // Navigation Setup
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
        
        // Keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown" || e.key === "PageDown") {
                e.preventDefault();
                scrollToNextSection();
            } else if (e.key === "ArrowUp" || e.key === "PageUp") {
                e.preventDefault();
                scrollToPrevSection();
            } else if (e.key === "Escape" && isMobile) {
                closeMobileMenu();
            }
        });
    }
    
    // Mobile Menu Setup
    function setupMobileMenu() {
        if (mobileMenuToggle && navLinksContainer) {
            mobileMenuToggle.addEventListener("click", () => {
                toggleMobileMenu();
            });
            
            // Close menu when clicking outside
            document.addEventListener("click", (e) => {
                if (isMobile && 
                    navLinksContainer.classList.contains("open") && 
                    !navLinksContainer.contains(e.target) && 
                    !mobileMenuToggle.contains(e.target)) {
                    closeMobileMenu();
                }
            });
            
            // Close menu on orientation change
            window.addEventListener("orientationchange", () => {
                setTimeout(() => {
                    if (navLinksContainer.classList.contains("open")) {
                        closeMobileMenu();
                    }
                }, 100);
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
    
    // Enhanced Flip Cards for Mobile
    function setupFlipCards() {
        flipCards.forEach(card => {
            let isFlipped = false;
            let touchStartTime = 0;
            
            // Keyboard accessibility
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    isFlipped = !isFlipped;
                    card.classList.toggle("flipped", isFlipped);
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
                        isFlipped = !isFlipped;
                        card.classList.toggle("flipped", isFlipped);
                    }
                }, { passive: false });
                
                // Add visual feedback for touch
                card.addEventListener("touchstart", () => {
                    card.style.transform = "scale(0.98)";
                });
                
                card.addEventListener("touchend", () => {
                    card.style.transform = "";
                });
            } else {
                // Desktop hover handling
                card.addEventListener("mouseenter", () => {
                    isFlipped = true;
                    card.classList.add("flipped");
                });
                
                card.addEventListener("mouseleave", () => {
                    isFlipped = false;
                    card.classList.remove("flipped");
                });
            }
        });
    }
    
    // Scroll Snap Functionality - Mobile Optimized
    function setupScrollSnap() {
        let wheelTimeout;
        
        // Desktop wheel event handling
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
        
        // Mobile touch handling for swipe navigation
        if (isMobile) {
            let startY = 0;
            let endY = 0;
            let isSwipeNavigation = false;
            
            document.addEventListener("touchstart", (e) => {
                startY = e.touches[0].clientY;
                isSwipeNavigation = false;
            }, { passive: true });
            
            document.addEventListener("touchmove", (e) => {
                endY = e.touches[0].clientY;
                const deltaY = Math.abs(startY - endY);
                
                // Only consider it navigation if swipe is significant
                if (deltaY > 50) {
                    isSwipeNavigation = true;
                }
            }, { passive: true });
            
            document.addEventListener("touchend", () => {
                if (isSwipeNavigation && !isScrolling) {
                    const deltaY = startY - endY;
                    const threshold = 80;
                    
                    if (Math.abs(deltaY) > threshold) {
                        if (deltaY > 0) {
                            scrollToNextSection();
                        } else {
                            scrollToPrevSection();
                        }
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
    
    // Performance Optimizations
    function setupPerformanceOptimizations() {
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const wasMobile = isMobile;
                isMobile = window.innerWidth <= 768;
                
                // Reinitialize if mobile state changed
                if (wasMobile !== isMobile) {
                    setupFlipCards();
                    setupParticles();
                    
                    // Close mobile menu if switching to desktop
                    if (!isMobile && navLinksContainer.classList.contains("open")) {
                        closeMobileMenu();
                    }
                }
            }, 250);
        });
        
        // Optimize animations for low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.body.classList.add("low-performance");
        }
        
        // Intersection observer for performance-heavy elements
        const performanceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in-view");
                } else {
                    entry.target.classList.remove("in-view");
                }
            });
        }, { threshold: 0.1 });
        
        // Observe all animated elements
        document.querySelectorAll(".flip-card, .skill-item, .cert-card").forEach(el => {
            performanceObserver.observe(el);
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
        
        animatableElements.forEach((element, index) => {
            // Reduced animation delay on mobile for faster response
            const delay = isMobile ? index * 50 : index * 100;
            
            setTimeout(() => {
                element.style.opacity = "0";
                element.style.transform = "translateY(30px)";
                element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
                
                requestAnimationFrame(() => {
                    element.style.opacity = "1";
                    element.style.transform = "translateY(0)";
                });
            }, delay);
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
        
        // Enhanced focus management for mobile
        if (isMobile) {
            // Prevent focus on hover-only elements
            document.querySelectorAll("[tabindex]").forEach(element => {
                element.addEventListener("touchstart", () => {
                    element.focus();
                });
            });
        }
    }
    
    // Touch device detection
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }
    
    // Error handling
    window.addEventListener('error', (e) => {
        console.error('Portfolio error:', e.error);
        // Graceful degradation - ensure basic functionality works
        if (loader && !loader.classList.contains('hidden')) {
            loader.classList.add("hidden");
        }
    });
    
    // Network aware loading for mobile
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            // Disable particles for very slow connections
            document.getElementById('interactive-bg').style.display = 'none';
        }
    }
    
    // Prevent zoom on double tap for iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Handle iOS viewport issues
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (viewport) {
            viewport.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
        }
    }
});

// CSS for low-performance devices
const style = document.createElement('style');
style.textContent = `
    /* Performance optimizations for low-end devices */
    .low-performance * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
    }
    
    .low-performance .flip-card .card-inner {
        transition: none !important;
    }
    
    .low-performance #interactive-bg {
        display: none !important;
    }
    
    /* Touch feedback */
    .flip-card.touch-feedback {
        transform: scale(0.98);
        transition: transform 0.1s ease;
    }
    
    /* Mobile flip card states */
    .flip-card.flipped .card-inner {
        transform: rotateY(180deg);
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
        
        .flip-card:hover .card-inner,
        .flip-card.flipped .card-inner {
            transform: none !important;
        }
        
        #interactive-bg {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);
