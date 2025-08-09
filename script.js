/**
 * Enhanced Portfolio Script - Edidi Sai Anant
 * NAND EFA Engineer | Advanced VLSI & Computer Architecture Specialist
 * Performance-optimized with smooth animations and mobile enhancements
 */

// Enhanced Configuration and State Management
const CONFIG = {
    // Performance settings
    INTERSECTION_THRESHOLD: 0.15,
    DEBOUNCE_DELAY: 16, // ~60fps
    SCROLL_DEBOUNCE: 10,
    RESIZE_DEBOUNCE: 100,
    PARTICLE_COUNT: window.innerWidth < 768 ? 30 : 50,
    ANIMATION_DURATION: 600,
    
    // Mobile detection
    IS_MOBILE: window.innerWidth <= 768,
    IS_TOUCH_DEVICE: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    IS_REDUCED_MOTION: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    
    // Selectors (cached for performance)
    SELECTORS: {
        loader: '#loader',
        mobileToggle: '#mobile-menu-toggle',
        navLinks: '#nav-links',
        navLinkItems: '.nav-links a',
        sections: '.section',
        tabButtons: '.tab-button',
        tabPanels: '.tab-panel',
        flipCards: '.flip-card',
        skillItems: '.skill-item',
        interactiveBg: '#interactive-bg'
    }
};

// Enhanced State Management
const AppState = {
    isLoading: true,
    isMobileMenuOpen: false,
    activeSection: 'hero',
    activeTab: 'micron',
    scrollDirection: 'down',
    lastScrollY: 0,
    particlesInitialized: false,
    intersectionObserver: null,
    currentFlippedCard: null,
    touchStartY: 0,
    isScrolling: false,
    performanceMode: 'high' // high, medium, low
};

// Enhanced Utility Functions
class Utils {
    // Performance-optimized debounce
    static debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    }

    // Smooth throttle for scroll events
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Enhanced smooth scroll with easing
    static smoothScrollTo(element, offset = 0, duration = CONFIG.ANIMATION_DURATION) {
        if (CONFIG.IS_REDUCED_MOTION) {
            element.scrollIntoView({ behavior: 'auto', block: 'start' });
            return;
        }

        const targetPosition = element.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const easeInOutCubic = t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

        function animate(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }

    // Performance detection
    static detectPerformance() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 2;
        
        // Check for low-end device indicators
        if (memory < 2 || cores < 4 || (connection && connection.effectiveType === 'slow-2g')) {
            return 'low';
        }
        
        if (memory < 4 || cores < 6 || (connection && connection.effectiveType === '2g')) {
            return 'medium';
        }
        
        return 'high';
    }

    // Enhanced element visibility check
    static isElementVisible(element, threshold = 0.1) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * (1 - threshold) &&
            rect.bottom >= windowHeight * threshold
        );
    }

    // Add CSS class with performance optimization
    static addClassWithTransition(element, className, callback) {
        element.classList.add(className);
        if (callback && !CONFIG.IS_REDUCED_MOTION) {
            setTimeout(callback, CONFIG.ANIMATION_DURATION);
        } else if (callback) {
            callback();
        }
    }

    // Enhanced touch event handling
    static handleTouchEvent(element, onTouchStart, onTouchEnd, onTouchMove) {
        if (!CONFIG.IS_TOUCH_DEVICE) return;

        element.addEventListener('touchstart', (e) => {
            AppState.touchStartY = e.touches[0].clientY;
            if (onTouchStart) onTouchStart(e);
        }, { passive: true });

        element.addEventListener('touchmove', (e) => {
            if (onTouchMove) onTouchMove(e);
        }, { passive: true });

        element.addEventListener('touchend', (e) => {
            if (onTouchEnd) onTouchEnd(e);
        }, { passive: true });
    }
}

// Enhanced Loader Management
class LoaderManager {
    constructor() {
        this.loader = document.querySelector(CONFIG.SELECTORS.loader);
        this.loadStartTime = Date.now();
        this.minLoadTime = 1200; // Minimum loading time for UX
    }

    async hide() {
        if (!this.loader) return;

        const loadTime = Date.now() - this.loadStartTime;
        const remainingTime = Math.max(0, this.minLoadTime - loadTime);

        // Ensure minimum load time for better UX
        await new Promise(resolve => setTimeout(resolve, remainingTime));

        return new Promise((resolve) => {
            if (CONFIG.IS_REDUCED_MOTION) {
                this.loader.style.display = 'none';
                document.body.classList.remove('loading');
                AppState.isLoading = false;
                resolve();
                return;
            }

            this.loader.classList.add('hidden');
            document.body.classList.remove('loading');
            
            setTimeout(() => {
                if (this.loader) {
                    this.loader.style.display = 'none';
                }
                AppState.isLoading = false;
                resolve();
            }, 800);
        });
    }

    show() {
        if (!this.loader) return;
        
        this.loader.style.display = 'flex';
        this.loader.classList.remove('hidden');
        document.body.classList.add('loading');
        AppState.isLoading = true;
    }
}

// Enhanced Navigation Manager
class NavigationManager {
    constructor() {
        this.header = document.querySelector('.main-header');
        this.mobileToggle = document.querySelector(CONFIG.SELECTORS.mobileToggle);
        this.navLinks = document.querySelector(CONFIG.SELECTORS.navLinks);
        this.navLinkItems = document.querySelectorAll(CONFIG.SELECTORS.navLinkItems);
        
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupNavigation();
        this.setupScrollBehavior();
        this.setupKeyboardNavigation();
    }

    setupMobileMenu() {
        if (!this.mobileToggle || !this.navLinks) return;

        const toggleMenu = (force) => {
            const isOpen = force !== undefined ? force : !AppState.isMobileMenuOpen;
            
            AppState.isMobileMenuOpen = isOpen;
            this.mobileToggle.classList.toggle('active', isOpen);
            this.navLinks.classList.toggle('open', isOpen);
            this.mobileToggle.setAttribute('aria-expanded', isOpen);
            
            // Prevent body scroll when menu is open
            document.body.classList.toggle('menu-open', isOpen);
            
            // Focus management for accessibility
            if (isOpen) {
                this.navLinks.querySelector('a')?.focus();
            }
        };

        // Click handler
        this.mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking nav links
        this.navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (CONFIG.IS_MOBILE) {
                    setTimeout(() => toggleMenu(false), 150);
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (AppState.isMobileMenuOpen && 
                !this.navLinks.contains(e.target) && 
                !this.mobileToggle.contains(e.target)) {
                toggleMenu(false);
            }
        });

        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && AppState.isMobileMenuOpen) {
                toggleMenu(false);
                this.mobileToggle.focus();
            }
        });

        // Touch gestures for mobile
        if (CONFIG.IS_TOUCH_DEVICE) {
            Utils.handleTouchEvent(
                this.navLinks,
                (e) => {
                    AppState.touchStartY = e.touches[0].clientY;
                },
                null,
                (e) => {
                    const touchY = e.touches[0].clientY;
                    const deltaY = AppState.touchStartY - touchY;
                    
                    // Close menu on upward swipe
                    if (deltaY > 50 && AppState.isMobileMenuOpen) {
                        toggleMenu(false);
                    }
                }
            );
        }
    }

    setupNavigation() {
        this.navLinkItems.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    this.navigateToSection(targetSection, link);
                }
            });

            // Enhanced hover effects
            if (!CONFIG.IS_TOUCH_DEVICE) {
                link.addEventListener('mouseenter', () => {
                    if (!CONFIG.IS_REDUCED_MOTION) {
                        link.style.transform = 'translateY(-2px)';
                    }
                });

                link.addEventListener('mouseleave', () => {
                    if (!CONFIG.IS_REDUCED_MOTION) {
                        link.style.transform = '';
                    }
                });
            }
        });
    }

    navigateToSection(targetSection, clickedLink) {
        // Update active states
        this.updateActiveNavLink(clickedLink);
        AppState.activeSection = targetSection.id;
        
        // Smooth scroll to section
        const headerOffset = CONFIG.IS_MOBILE ? 80 : 90;
        Utils.smoothScrollTo(targetSection, headerOffset);
        
        // Update URL without triggering scroll
        if (history.pushState) {
            history.pushState(null, null, `#${targetSection.id}`);
        }
    }

    updateActiveNavLink(activeLink) {
        this.navLinkItems.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        });
        
        if (activeLink) {
            activeLink.classList.add('active');
            activeLink.setAttribute('aria-current', 'page');
        }
    }

    setupScrollBehavior() {
        const handleScroll = Utils.throttle(() => {
            if (AppState.isLoading) return;

            const currentScrollY = window.pageYOffset;
            AppState.scrollDirection = currentScrollY > AppState.lastScrollY ? 'down' : 'up';
            AppState.lastScrollY = currentScrollY;
            AppState.isScrolling = true;

            // Auto-hide/show header on scroll (optional enhancement)
            if (CONFIG.IS_MOBILE && Math.abs(currentScrollY - AppState.lastScrollY) > 5) {
                if (AppState.scrollDirection === 'down' && currentScrollY > 100) {
                    this.header?.style.setProperty('transform', 'translateY(-100%)');
                } else {
                    this.header?.style.setProperty('transform', 'translateY(0)');
                }
            }

            // Clear scrolling state after scroll ends
            clearTimeout(this.scrollTimeout);
            this.scrollTimeout = setTimeout(() => {
                AppState.isScrolling = false;
            }, 150);
        }, CONFIG.SCROLL_DEBOUNCE);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an input
            if (e.target.matches('input, textarea, select')) return;

            switch(e.key) {
                case 'Home':
                    e.preventDefault();
                    this.navigateToSection(document.getElementById('hero'));
                    break;
                case 'End':
                    e.preventDefault();
                    this.navigateToSection(document.getElementById('contact'));
                    break;
                // Add more keyboard shortcuts as needed
            }
        });
    }
}

// Enhanced Particle Background System
class ParticleSystem {
    constructor() {
        this.container = document.querySelector(CONFIG.SELECTORS.interactiveBg);
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.isInitialized = false;
        
        if (CONFIG.IS_REDUCED_MOTION || AppState.performanceMode === 'low') {
            return;
        }
        
        this.init();
    }

    init() {
        if (!this.container || this.isInitialized) return;
        
        try {
            // Use particles.js for better performance
            if (window.particlesJS) {
                this.initParticlesJS();
            } else {
                this.initCustomParticles();
            }
            this.isInitialized = true;
        } catch (error) {
            console.warn('Particle system failed to initialize:', error);
        }
    }

    initParticlesJS() {
        const particleConfig = {
            particles: {
                number: {
                    value: CONFIG.PARTICLE_COUNT,
                    density: { enable: true, value_area: 1000 }
                },
                color: { value: ['#64ffda', '#d38a5c', '#ccd6f6'] },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: { enable: true, speed: 0.5, opacity_min: 0.1 }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: { enable: true, speed: 1, size_min: 0.1 }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#64ffda',
                    opacity: 0.15,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: AppState.performanceMode === 'high' ? 1 : 0.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'bounce'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: !CONFIG.IS_TOUCH_DEVICE, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.4 } },
                    push: { particles_nb: 2 }
                }
            },
            retina_detect: true
        };

        particlesJS('interactive-bg', particleConfig);
        AppState.particlesInitialized = true;
    }

    initCustomParticles() {
        // Fallback custom particle system
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.setupMouseTracking();
        this.animate();
        
        window.addEventListener('resize', Utils.debounce(() => this.resize(), CONFIG.RESIZE_DEBOUNCE));
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    resize() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
    }

    setupMouseTracking() {
        if (CONFIG.IS_TOUCH_DEVICE) return;

        document.addEventListener('mousemove', Utils.throttle((e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        }, 16), { passive: true });
    }

    animate() {
        if (!this.ctx || CONFIG.IS_REDUCED_MOTION) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary collision
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Mouse interaction
            if (!CONFIG.IS_TOUCH_DEVICE) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    particle.x -= dx * 0.01;
                    particle.y -= dy * 0.01;
                }
            }
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas) {
            this.canvas.remove();
        }
        this.isInitialized = false;
    }
}

// Enhanced Section Manager with Intersection Observer
class SectionManager {
    constructor() {
        this.sections = document.querySelectorAll(CONFIG.SELECTORS.sections);
        this.navLinks = document.querySelectorAll(CONFIG.SELECTORS.navLinkItems);
        this.observer = null;
        
        this.init();
    }

    init() {
        this.createIntersectionObserver();
        this.observeSections();
    }

    createIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: `-${CONFIG.IS_MOBILE ? 80 : 90}px 0px -60% 0px`,
            threshold: CONFIG.INTERSECTION_THRESHOLD
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.handleSectionVisible(entry.target);
                }
                
                // Add visible class for animations
                if (entry.intersectionRatio > 0.1) {
                    entry.target.classList.add('visible');
                }
            });
        }, options);

        AppState.intersectionObserver = this.observer;
    }

    observeSections() {
        this.sections.forEach(section => {
            this.observer.observe(section);
        });
    }

    handleSectionVisible(section) {
        const sectionId = section.id;
        AppState.activeSection = sectionId;
        
        // Update navigation
        this.updateActiveNavigation(sectionId);
        
        // Trigger section-specific animations
        this.triggerSectionAnimations(section);
    }

    updateActiveNavigation(sectionId) {
        this.navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('active', isActive);
            link.toggleAttribute('aria-current', isActive);
        });
    }

    triggerSectionAnimations(section) {
        if (CONFIG.IS_REDUCED_MOTION) return;

        // Stagger animations for child elements
        const animatableElements = section.querySelectorAll('.section-title, p, .button, .card-front, .skill-item');
        
        animatableElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Enhanced Tab Manager for Experience Section
class TabManager {
    constructor() {
        this.tabButtons = document.querySelectorAll(CONFIG.SELECTORS.tabButtons);
        this.tabPanels = document.querySelectorAll(CONFIG.SELECTORS.tabPanels);
        
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.setupKeyboardNavigation();
        this.setupTouchGestures();
    }

    setupTabNavigation() {
        this.tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = button.dataset.tab;
                this.switchTab(tabName, button);
            });

            // Enhanced hover effects
            if (!CONFIG.IS_TOUCH_DEVICE) {
                button.addEventListener('mouseenter', () => {
                    if (!CONFIG.IS_REDUCED_MOTION) {
                        button.style.transform = 'translateX(8px)';
                    }
                });

                button.addEventListener('mouseleave', () => {
                    if (!CONFIG.IS_REDUCED_MOTION) {
                        button.style.transform = '';
                    }
                });
            }
        });
    }

    switchTab(tabName, activeButton) {
        if (AppState.activeTab === tabName) return;

        AppState.activeTab = tabName;

        // Update button states
        this.tabButtons.forEach(btn => {
            const isActive = btn === activeButton;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
        });

        // Update panel states with smooth transition
        this.tabPanels.forEach(panel => {
            const isActive = panel.dataset.panel === tabName;
            
            if (isActive) {
                panel.classList.add('active');
                panel.setAttribute('aria-hidden', 'false');
                
                // Animate panel content
                if (!CONFIG.IS_REDUCED_MOTION) {
                    panel.style.opacity = '0';
                    panel.style.transform = 'translateX(30px)';
                    
                    requestAnimationFrame(() => {
                        panel.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                        panel.style.opacity = '1';
                        panel.style.transform = 'translateX(0)';
                    });
                }
            } else {
                panel.classList.remove('active');
                panel.setAttribute('aria-hidden', 'true');
            }
        });
    }

    setupKeyboardNavigation() {
        this.tabButtons.forEach((button, index) => {
            button.addEventListener('keydown', (e) => {
                let newIndex = index;
                
                switch(e.key) {
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        newIndex = index > 0 ? index - 1 : this.tabButtons.length - 1;
                        break;
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        newIndex = index < this.tabButtons.length - 1 ? index + 1 : 0;
                        break;
                    case 'Home':
                        e.preventDefault();
                        newIndex = 0;
                        break;
                    case 'End':
                        e.preventDefault();
                        newIndex = this.tabButtons.length - 1;
                        break;
                }
                
                if (newIndex !== index) {
                    this.tabButtons[newIndex].focus();
                    this.switchTab(this.tabButtons[newIndex].dataset.tab, this.tabButtons[newIndex]);
                }
            });
        });
    }

    setupTouchGestures() {
        if (!CONFIG.IS_TOUCH_DEVICE) return;

        const tabContainer = document.querySelector('.experience-tabs');
        if (!tabContainer) return;

        let startX = 0;
        let currentIndex = 0;

        Utils.handleTouchEvent(
            tabContainer,
            (e) => {
                startX = e.touches[0].clientX;
                currentIndex = Array.from(this.tabButtons).findIndex(btn => btn.classList.contains('active'));
            },
            (e) => {
                const endX = e.changedTouches[0].clientX;
                const diff = startX - endX;
                const threshold = 50;

                if (Math.abs(diff) > threshold) {
                    let newIndex = currentIndex;
                    
                    if (diff > 0 && currentIndex < this.tabButtons.length - 1) {
                        newIndex = currentIndex + 1;
                    } else if (diff < 0 && currentIndex > 0) {
                        newIndex = currentIndex - 1;
                    }
                    
                    if (newIndex !== currentIndex) {
                        const newButton = this.tabButtons[newIndex];
                        this.switchTab(newButton.dataset.tab, newButton);
                    }
                }
            }
        );
    }
}

// Enhanced Card Interaction Manager
class CardManager {
    constructor() {
        this.flipCards = document.querySelectorAll(CONFIG.SELECTORS.flipCards);
        this.skillItems = document.querySelectorAll(CONFIG.SELECTORS.skillItems);
        
        this.init();
    }

    init() {
        this.setupFlipCards();
        this.setupSkillCards();
    }

    setupFlipCards() {
        this.flipCards.forEach(card => {
            // Click/tap to flip
            card.addEventListener('click', () => this.toggleCard(card));
            
            // Keyboard support
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleCard(card);
                }
            });

            // Enhanced touch support
            if (CONFIG.IS_TOUCH_DEVICE) {
                let touchStartTime = 0;
                
                Utils.handleTouchEvent(
                    card,
                    () => {
                        touchStartTime = Date.now();
                    },
                    () => {
                        const touchDuration = Date.now() - touchStartTime;
                        if (touchDuration < 300) { // Quick tap
                            this.toggleCard(card);
                        }
                    }
                );
            }

            // Auto-flip back on mobile after delay
            if (CONFIG.IS_MOBILE) {
                card.addEventListener('focus', () => {
                    setTimeout(() => {
                        if (card.classList.contains('mobile-flipped')) {
                            card.classList.remove('mobile-flipped');
                        }
                    }, 5000);
                });
            }
        });
    }

    toggleCard(card) {
        // Close other flipped cards on mobile
        if (CONFIG.IS_MOBILE && AppState.currentFlippedCard && AppState.currentFlippedCard !== card) {
            AppState.currentFlippedCard.classList.remove('mobile-flipped');
        }

        card.classList.toggle('mobile-flipped');
        AppState.currentFlippedCard = card.classList.contains('mobile-flipped') ? card : null;

        // Accessibility announcement
        const isFlipped = card.classList.contains('mobile-flipped');
        const announcement = isFlipped ? 'Card flipped to show details' : 'Card flipped back to show title';
        this.announceToScreenReader(announcement);
    }

    setupSkillCards() {
        this.skillItems.forEach(item => {
            // Enhanced hover effects
            if (!CONFIG.IS_TOUCH_DEVICE && !CONFIG.IS_REDUCED_MOTION) {
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateY(-8px) scale(1.05)';
                    
                    const icon = item.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'scale(1.2) rotate(5deg)';
                    }
                });

                item.addEventListener('mouseleave', () => {
                    item.style.transform = '';
                    
                    const icon = item.querySelector('i');
                    if (icon) {
                        icon.style.transform = '';
                    }
                });
            }

            // Touch feedback
            if (CONFIG.IS_TOUCH_DEVICE) {
                item.addEventListener('touchstart', () => {
                    item.style.transform = 'scale(0.95)';
                }, { passive: true });

                item.addEventListener('touchend', () => {
                    setTimeout(() => {
                        item.style.transform = '';
                    }, 150);
                }, { passive: true });
            }

            // Keyboard support
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    item.click();
                }
            });
        });
    }

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Enhanced Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 60;
        this.isMonitoring = false;
    }

    start() {
        this.isMonitoring = true;
        this.monitor();
    }

    stop() {
        this.isMonitoring = false;
    }

    monitor() {
        if (!this.isMonitoring) return;

        const currentTime = performance.now();
        this.frameCount++;

        if (currentTime - this.lastTime >= 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
            this.frameCount = 0;
            this.lastTime = currentTime;

            // Adjust performance based on FPS
            this.adjustPerformance();
        }

        requestAnimationFrame(() => this.monitor());
    }

    adjustPerformance() {
        if (this.fps < 30 && AppState.performanceMode !== 'low') {
            AppState.performanceMode = 'low';
            document.body.classList.add('low-performance');
            console.warn('Performance degraded, switching to low performance mode');
        } else if (this.fps > 45 && AppState.performanceMode === 'low') {
            AppState.performanceMode = 'medium';
            document.body.classList.remove('low-performance');
            console.info('Performance improved, switching to medium performance mode');
        }
    }
}

// Enhanced Application Class
class PortfolioApp {
    constructor() {
        this.loader = new LoaderManager();
        this.navigation = null;
        this.particles = null;
        this.sections = null;
        this.tabs = null;
        this.cards = null;
        this.performanceMonitor = new PerformanceMonitor();
        
        this.init();
    }

    async init() {
        try {
            // Detect performance capabilities
            AppState.performanceMode = Utils.detectPerformance();
            
            // Apply performance class to body
            document.body.classList.add(`performance-${AppState.performanceMode}`);
            
            // Initialize core systems
            await this.initializeSystems();
            
            // Start performance monitoring in development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                this.performanceMonitor.start();
            }
            
            console.info('Portfolio application initialized successfully');
        } catch (error) {
            console.error('Failed to initialize portfolio application:', error);
            this.handleInitializationError(error);
        }
    }

    async initializeSystems() {
        // Wait for DOM to be fully ready
        await this.waitForDOM();
        
        // Initialize navigation first (most critical)
        this.navigation = new NavigationManager();
        
        // Initialize section observer
        this.sections = new SectionManager();
        
        // Initialize tab manager
        this.tabs = new TabManager();
        
        // Initialize card interactions
        this.cards = new CardManager();
        
        // Initialize particle system (least critical)
        if (AppState.performanceMode !== 'low') {
            setTimeout(() => {
                this.particles = new ParticleSystem();
            }, 500);
        }
        
        // Setup resize handler
        this.setupResizeHandler();
        
        // Setup visibility change handler
        this.setupVisibilityHandler();
        
        // Hide loader
        await this.loader.hide();
        
        // Setup error handling
        this.setupErrorHandling();
    }

    waitForDOM() {
        return new Promise((resolve) => {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', resolve);
            } else {
                resolve();
            }
        });
    }

    setupResizeHandler() {
        const handleResize = Utils.debounce(() => {
            const wasMonMobile = CONFIG.IS_MOBILE;
            CONFIG.IS_MOBILE = window.innerWidth <= 768;
            
            // Reinitialize if mobile state changed
            if (wasMonMobile !== CONFIG.IS_MOBILE) {
                this.handleMobileStateChange();
            }
            
            // Update particle count based on screen size
            if (this.particles && !CONFIG.IS_REDUCED_MOTION) {
                CONFIG.PARTICLE_COUNT = CONFIG.IS_MOBILE ? 20 : 40;
            }
        }, CONFIG.RESIZE_DEBOUNCE);

        window.addEventListener('resize', handleResize, { passive: true });
    }

    setupVisibilityHandler() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations when page is not visible
                if (this.particles) {
                    this.particles.destroy();
                }
                this.performanceMonitor.stop();
            } else {
                // Resume animations when page becomes visible
                if (!CONFIG.IS_REDUCED_MOTION && AppState.performanceMode !== 'low') {
                    setTimeout(() => {
                        this.particles = new ParticleSystem();
                    }, 500);
                }
                this.performanceMonitor.start();
            }
        });
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('JavaScript error:', e.error);
            this.handleError(e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.handleError(e.reason);
        });
    }

    handleMobileStateChange() {
        // Close mobile menu if switching to desktop
        if (!CONFIG.IS_MOBILE && AppState.isMobileMenuOpen) {
            const mobileToggle = document.querySelector(CONFIG.SELECTORS.mobileToggle);
            const navLinks = document.querySelector(CONFIG.SELECTORS.navLinks);
            
            if (mobileToggle && navLinks) {
                mobileToggle.classList.remove('active');
                navLinks.classList.remove('open');
                document.body.classList.remove('menu-open');
                AppState.isMobileMenuOpen = false;
            }
        }
    }

    handleError(error) {
        // Graceful error handling - don't break the user experience
        if (AppState.performanceMode !== 'low') {
            AppState.performanceMode = 'low';
            document.body.classList.add('low-performance');
            
            // Destroy resource-intensive features
            if (this.particles) {
                this.particles.destroy();
                this.particles = null;
            }
        }
    }

    handleInitializationError(error) {
        console.error('Critical initialization error:', error);
        
        // Hide loader even if initialization fails
        this.loader.hide();
        
        // Provide basic functionality
        this.setupBasicNavigation();
    }

    setupBasicNavigation() {
        // Fallback navigation for when full initialization fails
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
}

// Enhanced Initialization with Error Handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize the application
        new PortfolioApp();
        
        // Add development helpers
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Development mode helpers
            window.portfolioDebug = {
                state: AppState,
                config: CONFIG,
                utils: Utils
            };
            
            console.info('Portfolio Debug Object available at window.portfolioDebug');
        }
    } catch (error) {
        console.error('Failed to initialize portfolio:', error);
        
        // Emergency fallback
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader) {
                loader.style.display = 'none';
            }
            document.body.classList.remove('loading');
        }, 2000);
    }
});

// Handle page reload and back/forward navigation
window.addEventListener('beforeunload', () => {
    // Clean up resources
    if (window.portfolioApp?.particles) {
        window.portfolioApp.particles.destroy();
    }
});

window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        // Page was restored from cache, reinitialize if needed
        location.reload();
    }
});

// Service Worker Registration (optional for offline capability)
if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.info('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.info('SW registration failed: ', registrationError);
            });
    });
}
