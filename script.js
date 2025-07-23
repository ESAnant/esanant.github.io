
// Advanced Portfolio JavaScript - Edidi Sai Anant v5.0
// Enhanced Snap Navigation & Interactive Features

document.addEventListener("DOMContentLoaded", () => {
    // Global Elements
    const loader = document.getElementById("loader");
    const header = document.querySelector(".main-header");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll(".section");
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanels = document.querySelectorAll(".tab-panel");
    const flipCards = document.querySelectorAll(".flip-card");
    const skillItems = document.querySelectorAll(".skill-item");
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
    
    // State Management
    let isScrolling = false;
    let currentSectionIndex = 0;
    let isLoaded = false;
    
    // Initialize Portfolio
    init();
    
    function init() {
        setupLoader();
        setupParticles();
        setupNavigation();
        setupTabs();
        setupFlipCards();
        setupScrollSnap();
        setupIntersectionObserver();
        setupSkillAnimations();
        setupMobileMenu();
        setupKeyboardNavigation();
        setupPerformanceOptimizations();
    }
    
    // Enhanced Loader with Progress Animation
    function setupLoader() {
        const loaderSteps = [
            "Initializing components...",
            "Loading portfolio data...",
            "Synthesizing experience...",
            "Optimizing performance...",
            "Ready to showcase!"
        ];
        
        let stepIndex = 0;
        const loaderText = document.querySelector(".loader-text");
        
        const stepInterval = setInterval(() => {
            if (stepIndex < loaderSteps.length) {
                loaderText.textContent = loaderSteps[stepIndex];
                stepIndex++;
            } else {
                clearInterval(stepInterval);
            }
        }, 400);
        
        setTimeout(() => {
            loader.classList.add("hidden");
            header.classList.add("visible");
            isLoaded = true;
            
            // Trigger hero section animations
            const heroSection = document.querySelector("#hero");
            if (heroSection) {
                heroSection.classList.add("visible");
                animateHeroElements();
            }
            
            // Initialize skill bar animations after load
            setTimeout(() => {
                animateSkillBars();
            }, 1000);
            
        }, 2200);
    }
    
    // Enhanced Particles.js Configuration
    function setupParticles() {
        if (typeof particlesJS !== "undefined") {
            particlesJS("interactive-bg", {
                particles: {
                    number: { 
                        value: window.innerWidth < 768 ? 40 : 80, 
                        density: { enable: true, value_area: 800 } 
                    },
                    color: { value: ["#64ffda", "#d38a5c", "#4a9eff"] },
                    shape: { 
                        type: ["circle", "triangle"],
                        stroke: { width: 0, color: "#000000" },
                        polygon: { nb_sides: 6 }
                    },
                    opacity: { 
                        value: 0.3, 
                        random: true,
                        anim: { 
                            enable: true, 
                            speed: 0.8, 
                            opacity_min: 0.1, 
                            sync: false 
                        }
                    },
                    size: { 
                        value: 3, 
                        random: true,
                        anim: { 
                            enable: true, 
                            speed: 2, 
                            size_min: 0.1, 
                            sync: false 
                        }
                    },
                    line_linked: { 
                        enable: true, 
                        distance: 150, 
                        color: "#d38a5c", 
                        opacity: 0.2, 
                        width: 1.5 
                    },
                    move: { 
                        enable: true, 
                        speed: 0.8, 
                        direction: "none", 
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false,
                        attract: { enable: false, rotateX: 600, rotateY: 1200 }
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
                            line_linked: { opacity: 0.6 } 
                        }, 
                        push: { particles_nb: 4 },
                        remove: { particles_nb: 2 }
                    }
                },
                retina_detect: true
            });
        }
    }
    
    // Advanced Navigation System
    function setupNavigation() {
        navLinks.forEach((link, index) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const targetId = link.getAttribute("href");
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    navigateToSection(targetSection, index);
                }
            });
        });
        
        // Smooth scroll behavior with easing
        function navigateToSection(targetSection, index) {
            isScrolling = true;
            currentSectionIndex = index;
            
            targetSection.scrollIntoView({ 
                behavior: "smooth",
                block: "start"
            });
            
            updateActiveNavLink(targetSection.id);
            
            setTimeout(() => {
                isScrolling = false;
            }, 1200);
        }
        
        // Enhanced keyboard navigation
        document.addEventListener("keydown", (e) => {
            if (!isLoaded || isScrolling) return;
            
            const key = e.key;
            const isModifierPressed = e.ctrlKey || e.metaKey || e.altKey;
            
            if (isModifierPressed) return;
            
            switch(key) {
                case "ArrowDown":
                case "PageDown":
                case " ":
                    e.preventDefault();
                    scrollToNextSection();
                    break;
                case "ArrowUp":
                case "PageUp":
                    e.preventDefault();
                    scrollToPrevSection();
                    break;
                case "Home":
                    e.preventDefault();
                    scrollToSection(0);
                    break;
                case "End":
                    e.preventDefault();
                    scrollToSection(sections.length - 1);
                    break;
            }
        });
    }
    
    // Enhanced Tab System with Animations
    function setupTabs() {
        tabButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const tabId = button.dataset.tab;
                switchTab(tabId, index);
            });
            
            // Enhanced keyboard support
            button.addEventListener("keydown", (e) => {
                const currentIndex = Array.from(tabButtons).indexOf(button);
                
                switch(e.key) {
                    case "ArrowLeft":
                        e.preventDefault();
                        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabButtons.length - 1;
                        tabButtons[prevIndex].focus();
                        break;
                    case "ArrowRight":
                        e.preventDefault();
                        const nextIndex = currentIndex < tabButtons.length - 1 ? currentIndex + 1 : 0;
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
        
        function switchTab(tabId, index) {
            // Update tab buttons
            tabButtons.forEach((btn, i) => {
                const isActive = btn.dataset.tab === tabId;
                btn.classList.toggle("active", isActive);
                btn.setAttribute("aria-selected", isActive);
                
                // Add ripple effect
                if (isActive) {
                    createRippleEffect(btn);
                }
            });
            
            // Update tab panels with fade transition
            tabPanels.forEach(panel => {
                const isActive = panel.dataset.panel === tabId;
                panel.classList.toggle("active", isActive);
                
                if (isActive) {
                    // Animate panel content
                    const listItems = panel.querySelectorAll("li");
                    listItems.forEach((item, i) => {
                        item.style.opacity = "0";
                        item.style.transform = "translateX(-20px)";
                        
                        setTimeout(() => {
                            item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                            item.style.opacity = "1";
                            item.style.transform = "translateX(0)";
                        }, i * 100);
                    });
                }
            });
        }
    }
    
    // Enhanced Flip Cards with Touch Support
    function setupFlipCards() {
        flipCards.forEach((card, index) => {
            let isFlipped = false;
            let touchStartTime = 0;
            
            // Mouse events
            card.addEventListener("mouseenter", () => {
                if (!isTouchDevice()) {
                    flipCard(card, true);
                }
            });
            
            card.addEventListener("mouseleave", () => {
                if (!isTouchDevice()) {
                    flipCard(card, false);
                }
            });
            
            // Touch events for mobile
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
            
            // Keyboard support
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    isFlipped = !isFlipped;
                    flipCard(card, isFlipped);
                }
            });
            
            // Enhanced focus management
            card.addEventListener("focus", () => {
                card.style.outline = "2px solid var(--color-accent-copper)";
                card.style.outlineOffset = "4px";
            });
            
            card.addEventListener("blur", () => {
                card.style.outline = "none";
                if (!isTouchDevice()) {
                    flipCard(card, false);
                }
            });
        });
        
        function flipCard(card, shouldFlip) {
            const cardInner = card.querySelector(".card-inner");
            cardInner.style.transform = shouldFlip ? "rotateY(180deg)" : "rotateY(0deg)";
        }
    }
    
    // Advanced Scroll Snap System
    function setupScrollSnap() {
        let wheelTimeout;
        
        // Enhanced wheel event handling
        document.addEventListener("wheel", (e) => {
            if (isScrolling || !isLoaded) return;
            
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
        
        // Touch/swipe support for mobile
        let startY = 0;
        let endY = 0;
        
        document.addEventListener("touchstart", (e) => {
            startY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener("touchmove", (e) => {
            endY = e.touches[0].clientY;
        }, { passive: true });
        
        document.addEventListener("touchend", () => {
            const deltaY = startY - endY;
            const threshold = 50;
            
            if (Math.abs(deltaY) > threshold && !isScrolling) {
                if (deltaY > 0) {
                    scrollToNextSection();
                } else {
                    scrollToPrevSection();
                }
            }
        }, { passive: true });
    }
    
    // Enhanced Intersection Observer
    function setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -20% 0px",
            threshold: [0.3, 0.7]
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    entry.target.classList.add("visible");
                    
                    const sectionId = entry.target.id;
                    updateActiveNavLink(sectionId);
                    currentSectionIndex = Array.from(sections).indexOf(entry.target);
                    
                    // Trigger section-specific animations
                    animateSectionContent(entry.target);
                    
                    // Update browser history
                    if (history.replaceState) {
                        history.replaceState(null, null, `#${sectionId}`);
                    }
                }
            });
        }, observerOptions);
        
        sections.forEach(section => observer.observe(section));
    }
    
    // Skill Bar Animations
    function setupSkillAnimations() {
        const skillBars = document.querySelectorAll(".skill-fill");
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const targetWidth = skillBar.style.width;
                    
                    skillBar.style.width = "0%";
                    
                    setTimeout(() => {
                        skillBar.style.transition = "width 2s cubic-bezier(0.68, -0.55, 0.27, 1.55)";
                        skillBar.style.width = targetWidth;
                    }, 200);
                    
                    skillObserver.unobserve(skillBar);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => skillObserver.observe(bar));
    }
    
    // Mobile Menu Functionality
    function setupMobileMenu() {
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener("click", () => {
                const navLinks = document.querySelector(".nav-links");
                const isOpen = navLinks.classList.contains("open");
                
                navLinks.classList.toggle("open", !isOpen);
                mobileMenuToggle.classList.toggle("active", !isOpen);
                
                // Animate hamburger menu
                const spans = mobileMenuToggle.querySelectorAll("span");
                spans.forEach((span, index) => {
                    if (!isOpen) {
                        if (index === 0) span.style.transform = "rotate(45deg) translate(5px, 5px)";
                        if (index === 1) span.style.opacity = "0";
                        if (index === 2) span.style.transform = "rotate(-45deg) translate(7px, -6px)";
                    } else {
                        span.style.transform = "none";
                        span.style.opacity = "1";
                    }
                });
            });
        }
    }
    
    // Enhanced Keyboard Navigation
    function setupKeyboardNavigation() {
        // Focus management for better accessibility
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
        );
        
        document.addEventListener("keydown", (e) => {
            // Tab navigation enhancement
            if (e.key === "Tab") {
                const currentFocus = document.activeElement;
                const focusableArray = Array.from(focusableElements);
                const currentIndex = focusableArray.indexOf(currentFocus);
                
                if (e.shiftKey) {
                    // Shift + Tab (backward)
                    if (currentIndex === 0) {
                        e.preventDefault();
                        focusableArray[focusableArray.length - 1].focus();
                    }
                } else {
                    // Tab (forward)
                    if (currentIndex === focusableArray.length - 1) {
                        e.preventDefault();
                        focusableArray[0].focus();
                    }
                }
            }
        });
    }
    
    // Performance Optimizations
    function setupPerformanceOptimizations() {
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                handleResize();
            }, 250);
        });
        
        // Intersection observer for lazy loading
        const lazyElements = document.querySelectorAll("[data-lazy]");
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const src = element.dataset.lazy;
                    if (src) {
                        element.src = src;
                        element.removeAttribute("data-lazy");
                    }
                    lazyObserver.unobserve(element);
                }
            });
        });
        
        lazyElements.forEach(el => lazyObserver.observe(el));
        
        // Request idle callback for non-critical tasks
        if (window.requestIdleCallback) {
            requestIdleCallback(() => {
                setupAdvancedFeatures();
            });
        } else {
            setTimeout(setupAdvancedFeatures, 1000);
        }
    }
    
    // Helper Functions
    function scrollToNextSection() {
        const nextIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
        scrollToSection(nextIndex);
    }
    
    function scrollToPrevSection() {
        const prevIndex = Math.max(currentSectionIndex - 1, 0);
        scrollToSection(prevIndex);
    }
    
    function scrollToSection(index) {
        if (index >= 0 && index < sections.length && !isScrolling) {
            isScrolling = true;
            currentSectionIndex = index;
            
            sections[index].scrollIntoView({ 
                behavior: "smooth",
                block: "start"
            });
            
            setTimeout(() => {
                isScrolling = false;
            }, 1000);
        }
    }
    
    function updateActiveNavLink(sectionId) {
        navLinks.forEach(link => {
            const isActive = link.dataset.section === sectionId;
            link.classList.toggle("active", isActive);
            link.setAttribute("aria-current", isActive ? "page" : "false");
        });
    }
    
    function animateHeroElements() {
        const heroElements = document.querySelectorAll(".fade-in-up");
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }, index * 200);
        });
    }
    
    function animateSkillBars() {
        const skillBars = document.querySelectorAll(".skill-fill");
        skillBars.forEach((bar, index) => {
            const targetWidth = bar.style.width;
            bar.style.width = "0%";
            
            setTimeout(() => {
                bar.style.transition = "width 2s ease-out";
                bar.style.width = targetWidth;
            }, index * 100);
        });
    }
    
    function animateSectionContent(section) {
        const animatableElements = section.querySelectorAll(
            ".education-card, .cert-card, .skill-category, .flip-card, .publication-item, .patent-item"
        );
        
        animatableElements.forEach((element, index) => {
            element.style.opacity = "0";
            element.style.transform = "translateY(30px)";
            
            setTimeout(() => {
                element.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }, index * 100);
        });
    }
    
    function createRippleEffect(element) {
        const ripple = document.createElement("span");
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = "50%";
        ripple.style.top = "50%";
        ripple.style.transform = "translate(-50%, -50%) scale(0)";
        ripple.className = "ripple";
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.style.transform = "translate(-50%, -50%) scale(1)";
            ripple.style.opacity = "0";
        }, 10);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    function handleResize() {
        // Reinitialize particles for new screen size
        if (window.particlesJS) {
            setupParticles();
        }
        
        // Update section heights if needed
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    function isTouchDevice() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }
    
    function setupAdvancedFeatures() {
        // Advanced features that can be loaded later
        setupEasterEggs();
        setupAnalytics();
        setupServiceWorker();
    }
    
    function setupEasterEggs() {
        // Konami code easter egg
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    triggerEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }
    
    function triggerEasterEgg() {
        // Fun animation or hidden message
        const body = document.body;
        body.style.animation = "rainbow 2s infinite";
        
        setTimeout(() => {
            body.style.animation = "";
        }, 4000);
    }
    
    function setupAnalytics() {
        // Track section views (privacy-friendly)
        sections.forEach(section => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Log section view (implement your analytics here)
                        console.log(`Section viewed: ${entry.target.id}`);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(section);
        });
    }
    
    function setupServiceWorker() {
        // Register service worker for offline functionality
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        }
    }
    
    // Accessibility announcements
    const announcer = document.createElement("div");
    announcer.setAttribute("aria-live", "polite");
    announcer.setAttribute("aria-atomic", "true");
    announcer.className = "sr-only";
    announcer.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    function announceToScreenReader(message) {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = "";
        }, 1000);
    }
    
    // Update announcements for navigation
    const originalUpdateActiveNavLink = updateActiveNavLink;
    updateActiveNavLink = function(sectionId) {
        originalUpdateActiveNavLink(sectionId);
        const sectionName = sectionId.charAt(0).toUpperCase() + sectionId.slice(1);
        announceToScreenReader(`Navigated to ${sectionName} section`);
    };
    
    // Error handling
    window.addEventListener('error', (e) => {
        console.error('Portfolio error:', e.error);
        // Graceful degradation - ensure basic functionality works
        if (!isLoaded) {
            loader.classList.add("hidden");
            header.classList.add("visible");
            isLoaded = true;
        }
    });
    
    // Preload critical resources
    function preloadResources() {
        const links = [
            'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Roboto+Mono:wght@400;500;700&display=swap',
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
        ];
        
        links.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });
    }
    
    preloadResources();
});

// CSS animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(211, 138, 92, 0.3);
        pointer-events: none;
        transition: transform 0.6s, opacity 0.6s;
    }
    
    .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
    }
`;
document.head.appendChild(style);
