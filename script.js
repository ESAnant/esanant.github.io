// === ULTIMATE SEMICONDUCTOR PORTFOLIO SCRIPT ===
class SemiconductorPortfolio {
    constructor() {
        // Core state management
        this.isLoaded = false;
        this.isMobileMenuOpen = false;
        this.lastScrollY = 0;
        this.ticking = false;
        this.soundEnabled = true;
        
        // Performance optimization
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.initialize();
    }

    // === INITIALIZATION ===
    initialize() {
        this.setupEventListeners();
        this.initializePreloader();
        this.initializeNavigation();
        this.initializeMobileMenu();
        this.initializeScrollAnimations();
        this.initializeHeroAnimations();
        this.initializeInteractiveElements();
        this.initializeSoundSystem();
        this.initializeScrollToTop();
        this.initializePerformanceOptimizations();
        this.initializeAccessibility();
        this.initializeLucideIcons();
    }

    setupEventListeners() {
        window.addEventListener('load', () => this.handleWindowLoad());
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    // === PRELOADER SYSTEM ===
    initializePreloader() {
        const preloader = document.getElementById('preloader');
        const progressBar = document.querySelector('.progress-bar');
        
        if (!preloader || !progressBar) return;

        // Simulate realistic loading progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 10 + 5;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => this.hidePreloader(), 500);
            }
        }, 100);

        // Add circuit animation effects
        this.animateCircuitPaths();
    }

    animateCircuitPaths() {
        const paths = document.querySelectorAll('.circuit-paths::before, .circuit-paths::after');
        paths.forEach((path, index) => {
            setTimeout(() => {
                path.style.opacity = '1';
                path.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    path.style.opacity = '0.5';
                    path.style.transform = 'scale(1)';
                }, 300);
            }, index * 500);
        });
    }

    hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('loaded');
            document.body.style.overflow = 'visible';
            this.isLoaded = true;
            this.startMainAnimations();
            this.playStartupSound();
        }
    }

    // === NAVIGATION SYSTEM ===
    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section[id]');
        
        // Smooth scroll navigation
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
            });
        });

        // Active link highlighting
        this.initializeNavHighlighting(sections, navLinks);
    }

    initializeNavHighlighting(sections, navLinks) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-20% 0px -80% 0px' });

        sections.forEach(section => observer.observe(section));
    }

    scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const headerHeight = document.querySelector('.premium-header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // === MOBILE MENU SYSTEM ===
    initializeMobileMenu() {
        const menuToggle = document.getElementById('mobile-toggle');
        const nav = document.querySelector('.main-nav');
        const navItems = document.querySelectorAll('.nav-item');
        
        if (!menuToggle || !nav) return;

        menuToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking nav items
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (this.isMobileMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.toggleMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const menuToggle = document.getElementById('mobile-toggle');
        const nav = document.querySelector('.main-nav');
        
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        
        menuToggle.classList.toggle('is-active', this.isMobileMenuOpen);
        nav.classList.toggle('mobile-active', this.isMobileMenuOpen);
        nav.classList.toggle('is-open', this.isMobileMenuOpen);
        
        document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
        
        if (this.isMobileMenuOpen) {
            this.animateNavItems();
        }
    }

    animateNavItems() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // === SCROLL ANIMATIONS ===
    initializeScrollAnimations() {
        const sections = document.querySelectorAll('.content-section');
        const header = document.querySelector('.premium-header');
        
        // Section fade-in animations
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    this.triggerSectionSpecificAnimations(entry.target);
                }
            });
        }, this.observerOptions);

        sections.forEach(section => sectionObserver.observe(section));

        // Header scroll effects
        this.initializeHeaderScrollEffects(header);
    }

    initializeHeaderScrollEffects(header) {
        let lastScrollY = 0;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class for styling
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            lastScrollY = currentScrollY;
        }, { passive: true });
    }

    triggerSectionSpecificAnimations(section) {
        const sectionId = section.id;
        
        switch(sectionId) {
            case 'about':
                this.animateAboutSection();
                break;
            case 'experience':
                this.animateExperienceSection();
                break;
            case 'projects':
                this.animateProjectsSection();
                break;
            case 'research':
                this.animateResearchSection();
                break;
            case 'contact':
                this.animateContactSection();
                break;
        }
    }

    // === HERO ANIMATIONS ===
    initializeHeroAnimations() {
        this.animateHeroTitle();
        this.animateHeroStats();
        this.animateChipShowcase();
        this.initializeFloatingElements();
    }

    animateHeroTitle() {
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, (index + 1) * 300);
        });
    }

    animateHeroStats() {
        const stats = document.querySelectorAll('.stat-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const numberElement = element.querySelector('.stat-number');
        const finalText = numberElement.textContent;
        const hasMultiplier = finalText.includes('x');
        const hasPlus = finalText.includes('+');
        
        let targetValue = parseFloat(finalText);
        if (isNaN(targetValue)) return;
        
        let currentValue = 0;
        const increment = targetValue / 60;
        const duration = 1500;
        const stepTime = duration / 60;
        
        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }
            
            let displayValue = Math.floor(currentValue);
            if (hasMultiplier) displayValue += 'x';
            if (hasPlus) displayValue += '+';
            
            numberElement.textContent = displayValue;
        }, stepTime);
    }

    animateChipShowcase() {
        const mainChip = document.querySelector('.main-chip');
        const coreUnits = document.querySelectorAll('.core-unit');
        const connectionLines = document.querySelectorAll('.connection-line');
        
        if (mainChip) {
            setTimeout(() => {
                mainChip.style.opacity = '1';
                mainChip.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 800);
        }
        
        coreUnits.forEach((unit, index) => {
            setTimeout(() => {
                unit.style.opacity = '1';
                unit.style.transform = 'scale(1)';
            }, 1000 + (index * 200));
        });
        
        connectionLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
            }, 1200 + (index * 150));
        });
    }

    initializeFloatingElements() {
        const orbitChips = document.querySelectorAll('.orbit-chip');
        orbitChips.forEach((chip, index) => {
            chip.style.animationDelay = `${index * 3.33}s`;
            
            // Add hover effects
            chip.addEventListener('mouseenter', () => {
                chip.style.transform = 'scale(1.1)';
                chip.style.boxShadow = '0 10px 30px rgba(0, 122, 255, 0.3)';
            });
            
            chip.addEventListener('mouseleave', () => {
                chip.style.transform = 'scale(1)';
                chip.style.boxShadow = 'none';
            });
        });
    }

    // === SECTION-SPECIFIC ANIMATIONS ===
    animateAboutSection() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const skillCategories = document.querySelectorAll('.skill-category');
        
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        skillCategories.forEach((category, index) => {
            setTimeout(() => {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
                this.animateSkillItems(category);
            }, index * 150);
        });
    }

    animateSkillItems(category) {
        const skillItems = category.querySelectorAll('.skill-tag');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 50);
        });
    }

    animateExperienceSection() {
        const experienceItems = document.querySelectorAll('.experience-item');
        experienceItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }

    animateProjectsSection() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    animateResearchSection() {
        const researchCards = document.querySelectorAll('.research-card');
        researchCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 250);
        });
    }

    animateContactSection() {
        const contactItems = document.querySelectorAll('.contact-item');
        const socialLinks = document.querySelectorAll('.social-link');
        
        contactItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        socialLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
    }

    // === INTERACTIVE ELEMENTS ===
    initializeInteractiveElements() {
        this.initializeProjectCardHovers();
        this.initializeSkillHovers();
        this.initializeButtonEffects();
    }

    initializeProjectCardHovers() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const visual = card.querySelector('.project-visual');
                if (visual) {
                    visual.style.transform = 'scale(1.05)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const visual = card.querySelector('.project-visual');
                if (visual) {
                    visual.style.transform = 'scale(1)';
                }
            });
        });
    }

    initializeSkillHovers() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('mouseenter', () => {
                tag.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', () => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    initializeButtonEffects() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    // === SOUND SYSTEM ===
    initializeSoundSystem() {
        const soundToggle = document.getElementById('sound-toggle');
        const startupSound = document.getElementById('startup-sound');
        
        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                this.toggleSound();
            });
        }
        
        // Initialize sound state
        this.updateSoundIcon();
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.updateSoundIcon();
    }

    updateSoundIcon() {
        const soundToggle = document.getElementById('sound-toggle');
        if (soundToggle) {
            const icon = soundToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', this.soundEnabled ? 'volume-2' : 'volume-x');
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        }
    }

    playStartupSound() {
        if (this.soundEnabled) {
            const startupSound = document.getElementById('startup-sound');
            if (startupSound) {
                startupSound.play().catch(() => {
                    // Autoplay was prevented, which is fine
                });
            }
        }
    }

    // === SCROLL TO TOP ===
    initializeScrollToTop() {
        const scrollBtn = document.getElementById('scroll-to-top');
        if (!scrollBtn) return;

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        // Smooth scroll to top
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // === PERFORMANCE OPTIMIZATIONS ===
    initializePerformanceOptimizations() {
        // Lazy load images
        this.initializeLazyLoading();
        
        // Debounce resize events
        this.initializeResizeDebouncing();
        
        // Optimize animations for performance
        this.initializeAnimationOptimizations();
    }

    initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    initializeResizeDebouncing() {
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    initializeAnimationOptimizations() {
        // Use requestAnimationFrame for smooth animations
        if (typeof window !== 'undefined' && window.requestAnimationFrame) {
            this.animationFrame = window.requestAnimationFrame;
        }
    }

    // === ACCESSIBILITY ===
    initializeAccessibility() {
        // Focus management
        this.initializeFocusManagement();
        
        // Keyboard navigation
        this.initializeKeyboardNavigation();
        
        // Reduced motion support
        this.initializeReducedMotion();
    }

    initializeFocusManagement() {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--accent-primary)';
                element.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', () => {
                element.style.outline = 'none';
            });
        });
    }

    initializeKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    initializeReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations for users who prefer reduced motion
            const style = document.createElement('style');
            style.textContent = `
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    // === LUCIDE ICONS ===
    initializeLucideIcons() {
        // Initialize Lucide icons when available
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        } else {
            // Retry after a short delay if Lucide hasn't loaded yet
            setTimeout(() => {
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 100);
        }
    }

    // === EVENT HANDLERS ===
    handleWindowLoad() {
        this.isLoaded = true;
        document.body.classList.add('loaded');
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateScrollEffects();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateScrollEffects() {
        const currentScrollY = window.scrollY;
        
        // Add any additional scroll-based effects here
        // For example, parallax effects or scroll-triggered animations
        
        this.lastScrollY = currentScrollY;
    }

    handleResize() {
        // Handle responsive adjustments
        this.updateDimensions();
        
        // Close mobile menu if open and viewport changes
        if (this.isMobileMenuOpen && window.innerWidth > 768) {
            this.toggleMobileMenu();
        }
    }

    updateDimensions() {
        // Update any dimension-dependent calculations
        // This is useful for responsive layouts and animations
    }

    handleKeydown(e) {
        // Global keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.scrollToSection('hero');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.scrollToSection('contact');
                    break;
            }
        }
    }

    // === UTILITY METHODS ===
    startMainAnimations() {
        // Start any main animations after preloader
        setTimeout(() => {
            this.animateHeroContent();
        }, 200);
    }

    animateHeroContent() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the portfolio
    const portfolio = new SemiconductorPortfolio();
    
    // Add any additional initialization code here
    console.log('🚀 Semiconductor Portfolio initialized successfully!');
});

// === EXPORT FOR POTENTIAL MODULE USAGE ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SemiconductorPortfolio;
}
