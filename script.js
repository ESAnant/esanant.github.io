/**
 * Refined Portfolio Script - Balanced Enhancement
 * Smooth snap navigation with original charm preserved
 * Edidi Sai Anant - NAND EFA Engineer Portfolio
 */

// Configuration
const CONFIG = {
    INTERSECTION_THRESHOLD: 0.2,
    DEBOUNCE_DELAY: 16,
    SCROLL_DEBOUNCE: 10,
    ANIMATION_DURATION: 600,
    PARTICLE_COUNT: window.innerWidth < 768 ? 30 : 50,
    IS_MOBILE: window.innerWidth <= 768,
    IS_TOUCH_DEVICE: 'ontouchstart' in window,
    IS_REDUCED_MOTION: window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

// State Management
const AppState = {
    isLoading: true,
    isMobileMenuOpen: false,
    activeSection: 'hero',
    activeTab: 'micron',
    isNavigating: false,
    lastScrollY: 0,
    scrollDirection: 'down',
    currentFlippedCard: null,
    particlesInitialized: false,
    intersectionObserver: null
};

// Utility Functions
class Utils {
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

    // Enhanced smooth scroll with easing for snap navigation
    static smoothScrollToSection(targetSection) {
        return new Promise((resolve) => {
            const headerOffset = CONFIG.IS_MOBILE ? 80 : 90;
            const targetPosition = targetSection.offsetTop - headerOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = Math.min(800, Math.abs(distance) * 0.8); // Dynamic duration
            
            let startTime = null;

            // Enhanced easing function for smoother snap
            const easeInOutQuart = t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;

            const animate = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = easeInOutQuart(progress);
                
                window.scrollTo(0, startPosition + distance * ease);
                
                if (timeElapsed < duration) {
                    requestAnimationFrame(animate);
                } else {
                    resolve();
                }
            };
            
            requestAnimationFrame(animate);
        });
    }

    static isElementVisible(element, threshold = 0.1) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        
        return (
            rect.top <= windowHeight * (1 - threshold) &&
            rect.bottom >= windowHeight * threshold
        );
    }
}

// Enhanced Loader Manager
class LoaderManager {
    constructor() {
        this.loader = document.querySelector('#loader');
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
}

// Refined Navigation with Smooth Snap
class NavigationManager {
    constructor() {
        this.header = document.querySelector('.main-header');
        this.mobileToggle = document.querySelector('#mobile-menu-toggle');
        this.navLinks = document.querySelector('#nav-links');
        this.navLinkItems = document.querySelectorAll('.nav-links a');
        this.isNavigating = false;
        
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupNavigation();
        this.setupSmoothSnapScroll();
        this.setupKeyboardNavigation();
    }

    setupNavigation() {
        this.navLinkItems.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (this.isNavigating) return; // Prevent rapid clicks
                
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    this.navigateToSection(targetSection, link);
                }
            });

            // Enhanced hover effects for desktop
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
        this.isNavigating = true;
        
        // Update active states immediately for better UX
        this.updateActiveNavLink(clickedLink);
        AppState.activeSection = targetSection.id;
        
        // Enhanced smooth scroll with better easing
        Utils.smoothScrollToSection(targetSection).then(() => {
            // Update URL after scroll completes
            if (history.pushState) {
                history.pushState(null, null, `#${targetSection.id}`);
            }
            
            setTimeout(() => {
                this.isNavigating = false;
            }, 300);
        });
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

    setupSmoothSnapScroll() {
        let scrollTimeout;
        
        // Enhanced scroll snap behavior
        const handleScroll = Utils.throttle(() => {
            if (AppState.isLoading || this.isNavigating) return;

            const currentScrollY = window.pageYOffset;
            AppState.scrollDirection = currentScrollY > AppState.lastScrollY ? 'down' : 'up';
            AppState.lastScrollY = currentScrollY;

            clearTimeout(scrollTimeout);
            
            scrollTimeout = setTimeout(() => {
                this.updateActiveNavFromScroll();
            }, 100);
        }, CONFIG.SCROLL_DEBOUNCE);

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    updateActiveNavFromScroll() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.pageYOffset + 150;
        
        let activeSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                activeSection = section;
            }
        });
        
        if (activeSection && activeSection.id !== AppState.activeSection) {
            AppState.activeSection = activeSection.id;
            const activeLink = document.querySelector(`a[href="#${activeSection.id}"]`);
            this.updateActiveNavLink(activeLink);
        }
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

        this.mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking nav links
        this.navLinkItems.forEach(link => {
            link.addEventListener('click', () => {
                if (CONFIG.IS_MOBILE) {
                    setTimeout(() => toggleMenu(false), 200);
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
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an input
            if (e.target.matches('input, textarea, select')) return;

            switch(e.key) {
                case 'Home':
                    e.preventDefault();
                    const heroSection = document.getElementById('hero');
                    if (heroSection) this.navigateToSection(heroSection);
                    break;
                case 'End':
                    e.preventDefault();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) this.navigateToSection(contactSection);
                    break;
            }
        });
    }
}

// Enhanced Particle Background System
class ParticleSystem {
    constructor() {
        this.container = document.querySelector('#interactive-bg');
        this.isInitialized = false;
        
        if (CONFIG.IS_REDUCED_MOTION || CONFIG.IS_MOBILE) {
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
                console.warn('Particles.js not loaded, skipping particle system');
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
                    speed: 1,
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

    destroy() {
        if (window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS) {
            window.pJSDom[0].pJS.fn.vendors.destroypJS();
            window.pJSDom = [];
        }
        this.isInitialized = false;
    }
}

// Enhanced Section Manager with Intersection Observer
class SectionManager {
    constructor() {
        this.sections = document.querySelectorAll('.section');
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
            rootMargin: `-${CONFIG.IS_MOBILE ? 80 : 90}px 0px -50% 0px`,
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
        
        // Only update if not currently navigating
        if (!AppState.isNavigating) {
            AppState.activeSection = sectionId;
            this.updateActiveNavigation(sectionId);
        }
        
        // Trigger section-specific animations
        this.triggerSectionAnimations(section);
    }

    updateActiveNavigation(sectionId) {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
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
        this.tabButtons = document.querySelectorAll('.tab-button');
        this.tabPanels = document.querySelectorAll('.tab-panel');
        
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

            // Enhanced hover effects for desktop
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

        tabContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            currentIndex = Array.from(this.tabButtons).findIndex(btn => btn.classList.contains('active'));
        }, { passive: true });

        tabContainer.addEventListener('touchend', (e) => {
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
        }, { passive: true });
    }
}

// Enhanced Card Interaction Manager
class CardManager {
    constructor() {
        this.flipCards = document.querySelectorAll('.flip-card');
        this.skillItems = document.querySelectorAll('.skill-item');
        
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
                
                card.addEventListener('touchstart', () => {
                    touchStartTime = Date.now();
                }, { passive: true });

                card.addEventListener('touchend', () => {
                    const touchDuration = Date.now() - touchStartTime;
                    if (touchDuration < 300) { // Quick tap
                        this.toggleCard(card);
                    }
                }, { passive: true });
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
            // Enhanced hover effects for desktop
            if (!CONFIG.IS_TOUCH_DEVICE && !CONFIG.IS_REDUCED_MOTION) {
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateY(-3px) scale(1.02)';
                    
                    const icon = item.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'scale(1.1)';
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

            // Touch feedback for mobile
            if (CONFIG.IS_TOUCH_DEVICE) {
                item.addEventListener('touchstart', () => {
                    item.style.transform = 'scale(0.98)';
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

// Main Application Class
class PortfolioApp {
    constructor() {
        this.loader = new LoaderManager();
        this.navigation = null;
        this.particles = null;
        this.sections = null;
        this.tabs = null;
        this.cards = null;
        
        this.init();
    }

    async init() {
        try {
            // Initialize core systems
            await this.initializeSystems();
            
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
        if (!CONFIG.IS_REDUCED_MOTION && !CONFIG.IS_MOBILE) {
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
        }, 200);

        window.addEventListener('resize', handleResize, { passive: true });
    }

    setupVisibilityHandler() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations when page is not visible
                if (this.particles) {
                    this.particles.destroy();
                }
            } else {
                // Resume animations when page becomes visible
                if (!CONFIG.IS_REDUCED_MOTION && !CONFIG.IS_MOBILE) {
                    setTimeout(() => {
                        this.particles = new ParticleSystem();
                    }, 500);
                }
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
            const mobileToggle = document.querySelector('#mobile-menu-toggle');
            const navLinks = document.querySelector('#nav-links');
            
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
        console.warn('Handling error gracefully:', error);
        
        // Destroy resource-intensive features if needed
        if (this.particles) {
            this.particles.destroy();
            this.particles = null;
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

// Initialize Application
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

// Handle hash changes from browser navigation
window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    if (hash) {
        const targetSection = document.querySelector(hash);
        if (targetSection) {
            setTimeout(() => {
                Utils.smoothScrollToSection(targetSection);
            }, 100);
        }
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
