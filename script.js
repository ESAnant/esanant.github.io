/**
 * ===================================================================
 * ULTIMATE SEMICONDUCTOR PORTFOLIO - PERFECTED SCRIPT
 * ===================================================================
 * 
 * A premium, Apple-inspired portfolio experience with advanced
 * animations, accessibility, and performance optimizations.
 * 
 * @version 3.0.0
 * @author Sai Anant Edidi
 * @description Complete script for silicon architect portfolio
 * ===================================================================
 */

'use strict';

class SemiconductorPortfolio {
    constructor() {
        // === CORE STATE MANAGEMENT ===
        this.state = {
            isLoaded: false,
            isMobileMenuOpen: false,
            isPreloaderActive: true,
            currentSection: 'hero',
            soundEnabled: true,
            reducedMotion: false,
            touchDevice: false,
            isOnline: navigator.onLine,
            theme: 'dark',
            scrollDirection: 'down',
            lastScrollY: 0,
            headerVisible: true
        };

        // === PERFORMANCE TRACKING ===
        this.performance = {
            startTime: performance.now(),
            lastScrollY: 0,
            ticking: false,
            rafId: null,
            intervals: new Map(),
            observers: new Map(),
            animationFrames: new Set(),
            touchStartY: 0,
            touchEndY: 0
        };

        // === OPTIMIZED ANIMATION CONFIGURATION ===
        this.animations = {
            delays: {
                hero: 150,      // Faster
                about: 100,     // Faster
                experience: 125, // Faster
                projects: 100,  // Faster
                research: 150,  // Faster
                contact: 100    // Faster
            },
            durations: {
                fast: 150,      // Faster
                normal: 250,    // Faster
                slow: 400,      // Faster
                scroll: 600,    // Faster
                preloader: 300  // Much faster
            },
            easing: {
                smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                swift: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
            }
        };

        // === ENHANCED OBSERVER CONFIGURATION ===
        this.observerOptions = {
            intersection: {
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
                rootMargin: '0px 0px -50px 0px'
            },
            mutation: {
                childList: true,
                attributes: true,
                subtree: true
            }
        };

        // === FEATURE DETECTION ===
        this.features = {
            intersectionObserver: 'IntersectionObserver' in window,
            mutationObserver: 'MutationObserver' in window,
            resizeObserver: 'ResizeObserver' in window,
            webAnimations: 'animate' in HTMLElement.prototype,
            cssCustomProperties: CSS.supports('--test', 'test'),
            backdropFilter: CSS.supports('backdrop-filter', 'blur(1px)'),
            webGL: !!document.createElement('canvas').getContext('webgl'),
            devicePixelRatio: window.devicePixelRatio || 1,
            passiveListeners: this.supportsPassive(),
            touchEvents: 'ontouchstart' in window,
            prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        };

        // === INITIALIZE SYSTEM ===
        this.initialize();
    }

    // ===================================================================
    // INITIALIZATION SYSTEM
    // ===================================================================

    /**
     * Initialize the portfolio system with enhanced error handling
     */
    async initialize() {
        try {
            console.log('🚀 Initializing Ultimate Semiconductor Portfolio...');

            // Check dependencies and setup core systems
            this.checkDependencies();
            this.setupGlobalErrorHandling();
            this.detectDeviceCapabilities();
            this.setupEventListeners();
            this.initializeAccessibility();

            // Initialize UI systems with faster timings
            await this.initializePreloader();
            this.initializeNavigation();
            this.initializeMobileMenu();
            this.initializeScrollSystem();
            this.initializeSoundSystem();
            this.initializeInteractions();
            this.initializeFloatingControls();
            this.initializeThemeToggle();

            // Initialize performance optimizations
            this.initializePerformanceOptimizations();
            this.initializeProgressiveEnhancements();

            // Initialize external libraries
            await this.initializeExternalLibraries();

            // Mark as initialized
            this.state.isLoaded = true;
            this.reportInitializationComplete();

        } catch (error) {
            this.handleInitializationError(error);
        }
    }

    /**
     * Check for required dependencies
     */
    checkDependencies() {
        const required = [
            'requestAnimationFrame',
            'addEventListener',
            'querySelector',
            'classList',
            'IntersectionObserver'
        ];

        const missing = required.filter(feature => {
            if (feature === 'IntersectionObserver') {
                return !this.features.intersectionObserver;
            }
            return !(feature in window || feature in Element.prototype);
        });

        if (missing.length > 0) {
            throw new Error(`Missing required features: ${missing.join(', ')}`);
        }
    }

    /**
     * Setup comprehensive error handling
     */
    setupGlobalErrorHandling() {
        window.addEventListener('error', (event) => {
            this.logError('JavaScript Error', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error?.stack
            });
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.logError('Unhandled Promise Rejection', {
                reason: event.reason,
                promise: event.promise
            });
        });
    }

    /**
     * Enhanced device capability detection
     */
    detectDeviceCapabilities() {
        this.state.touchDevice = this.features.touchEvents;
        this.state.reducedMotion = this.features.prefersReducedMotion;

        // Update document classes for styling
        document.documentElement.classList.toggle('touch-device', this.state.touchDevice);
        document.documentElement.classList.toggle('reduced-motion', this.state.reducedMotion);
        document.documentElement.classList.toggle('webgl-supported', this.features.webGL);
        document.documentElement.classList.toggle('backdrop-filter-supported', this.features.backdropFilter);

        // Log capabilities
        console.log('📱 Device Capabilities:', {
            touchDevice: this.state.touchDevice,
            reducedMotion: this.state.reducedMotion,
            webGL: this.features.webGL,
            backdropFilter: this.features.backdropFilter
        });
    }

    /**
     * Check for passive listener support
     */
    supportsPassive() {
        let passiveSupported = false;
        try {
            const options = {
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            };
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (err) {
            passiveSupported = false;
        }
        return passiveSupported;
    }

    // ===================================================================
    // OPTIMIZED EVENT SYSTEM
    // ===================================================================

    /**
     * Setup optimized event listeners with better performance
     */
    setupEventListeners() {
        // Window events with enhanced performance
        this.addOptimizedEventListener(window, 'load', () => this.handleWindowLoad());
        this.addOptimizedEventListener(window, 'scroll', () => this.handleScroll(), { 
            passive: true,
            throttle: 16 // ~60fps
        });
        this.addOptimizedEventListener(window, 'resize', () => this.handleResize(), {
            debounce: 100
        });
        this.addOptimizedEventListener(window, 'orientationchange', () => this.handleOrientationChange(), {
            debounce: 200
        });

        // Document events
        this.addOptimizedEventListener(document, 'keydown', (e) => this.handleKeydown(e));
        this.addOptimizedEventListener(document, 'visibilitychange', () => this.handleVisibilityChange());
        this.addOptimizedEventListener(document, 'click', (e) => this.handleGlobalClick(e));

        // Touch events for mobile with better performance
        if (this.state.touchDevice) {
            this.addOptimizedEventListener(document, 'touchstart', (e) => this.handleTouchStart(e), { 
                passive: true 
            });
            this.addOptimizedEventListener(document, 'touchmove', (e) => this.handleTouchMove(e), { 
                passive: false 
            });
            this.addOptimizedEventListener(document, 'touchend', (e) => this.handleTouchEnd(e), { 
                passive: true 
            });
        }

        // Focus management
        this.addOptimizedEventListener(document, 'focusin', (e) => this.handleFocusIn(e));
        this.addOptimizedEventListener(document, 'focusout', (e) => this.handleFocusOut(e));

        // Online/offline detection
        this.addOptimizedEventListener(window, 'online', () => this.handleOnlineStatus(true));
        this.addOptimizedEventListener(window, 'offline', () => this.handleOnlineStatus(false));
    }

    /**
     * Enhanced event listener with throttling and debouncing
     */
    addOptimizedEventListener(target, event, handler, options = {}) {
        let optimizedHandler = handler;

        // Apply throttling
        if (options.throttle) {
            optimizedHandler = this.throttle(handler, options.throttle);
        }

        // Apply debouncing
        if (options.debounce) {
            optimizedHandler = this.debounce(handler, options.debounce);
        }

        // Add event listener
        const listenerOptions = this.features.passiveListeners ? {
            passive: options.passive || false,
            capture: options.capture || false
        } : false;

        target.addEventListener(event, optimizedHandler, listenerOptions);

        // Store for cleanup
        if (!this.eventListeners) this.eventListeners = new Map();
        if (!this.eventListeners.has(target)) this.eventListeners.set(target, new Map());
        this.eventListeners.get(target).set(event, optimizedHandler);
    }

    // ===================================================================
    // ULTRA-FAST PRELOADER SYSTEM
    // ===================================================================

    /**
     * Initialize ultra-fast preloader with realistic progression
     */
    async initializePreloader() {
        const preloader = document.getElementById('preloader');
        const progressBar = document.querySelector('.progress-bar');
        const progressPercent = document.querySelector('.progress-percentage');
        const loadingStages = document.querySelectorAll('.stage');

        if (!preloader || !progressBar) return;

        console.log('⚡ Initializing ultra-fast preloader...');

        // Ultra-fast loading simulation
        const loadingTasks = [
            { name: 'Core Systems', weight: 20, duration: 200 },
            { name: 'Compiling Scripts', weight: 25, duration: 150 },
            { name: 'Rendering Interface', weight: 30, duration: 200 },
            { name: 'Optimizing Performance', weight: 25, duration: 100 }
        ];

        let progress = 0;
        let currentTask = 0;

        const updateProgress = async () => {
            if (currentTask < loadingTasks.length) {
                const task = loadingTasks[currentTask];
                
                // Update stage indicators
                loadingStages.forEach((stage, index) => {
                    stage.classList.toggle('active', index === currentTask);
                });

                // Smooth progress animation
                const startProgress = progress;
                const endProgress = Math.min(progress + task.weight, 100);
                const duration = task.duration;
                const startTime = performance.now();

                const animateProgress = (timestamp) => {
                    const elapsed = timestamp - startTime;
                    const progressRatio = Math.min(elapsed / duration, 1);
                    
                    // Smooth easing
                    const easeOut = 1 - Math.pow(1 - progressRatio, 3);
                    const currentProgress = startProgress + (endProgress - startProgress) * easeOut;
                    
                    progressBar.style.width = `${currentProgress}%`;
                    progressBar.setAttribute('aria-valuenow', Math.round(currentProgress));
                    
                    if (progressPercent) {
                        progressPercent.textContent = `${Math.round(currentProgress)}%`;
                    }

                    if (progressRatio < 1) {
                        requestAnimationFrame(animateProgress);
                    } else {
                        progress = endProgress;
                        currentTask++;
                        setTimeout(updateProgress, 50);
                    }
                };

                requestAnimationFrame(animateProgress);
            } else {
                // Complete loading
                await this.sleep(200);
                this.hidePreloader();
            }
        };

        // Start ultra-fast loading
        await this.sleep(100);
        this.addPremiumLoadingEffects();
        updateProgress();
    }

    /**
     * Add premium loading effects with better performance
     */
    addPremiumLoadingEffects() {
        const chipCore = document.querySelector('.chip-core-loader');
        const flowLines = document.querySelectorAll('.flow-line');
        const particles = document.querySelectorAll('.particle');

        // Enhanced chip core animation
        if (chipCore) {
            chipCore.style.animation = 'core-pulse 1s ease-in-out infinite';
        }

        // Staggered flow line animations
        flowLines.forEach((line, index) => {
            line.style.animationDelay = `${index * 0.25}s`;
        });

        // Particle system with better timing
        particles.forEach((particle, index) => {
            particle.style.animationDelay = `${index * 0.5}s`;
        });
    }

    /**
     * Hide preloader with enhanced animation
     */
    async hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (!preloader) return;

        console.log('✨ Hiding preloader with enhanced animation...');

        // Clear all intervals
        this.performance.intervals.forEach(interval => clearInterval(interval));
        this.performance.intervals.clear();

        // Enhanced exit animation
        preloader.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        preloader.style.opacity = '0';
        preloader.style.transform = 'scale(0.95)';

        await this.sleep(400);

        preloader.classList.add('loaded');
        document.body.style.overflow = 'visible';
        
        this.state.isPreloaderActive = false;
        this.state.isLoaded = true;

        // Start main animations faster
        await this.sleep(100);
        this.startMainAnimations();
        this.playStartupSound();
    }

    // ===================================================================
    // INTELLIGENT NAVIGATION SYSTEM
    // ===================================================================

    /**
     * Initialize intelligent navigation with enhanced performance
     */
    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section[id]');

        if (!navLinks.length || !sections.length) return;

        console.log('🧭 Initializing intelligent navigation...');

        // Enhanced smooth scrolling
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href')?.substring(1);
                if (targetId) {
                    this.scrollToSection(targetId);
                    this.closeMobileMenuIfOpen();
                    this.playClickSound();
                }
            });
        });

        // Initialize intelligent section highlighting
        this.initializeIntelligentNavHighlighting(sections, navLinks);
        this.initializeKeyboardNavigation(navLinks);
    }

    /**
     * Enhanced navigation highlighting with better performance
     */
    initializeIntelligentNavHighlighting(sections, navLinks) {
        if (!this.features.intersectionObserver) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const id = entry.target.getAttribute('id');
                    this.updateActiveNavLink(id, navLinks);
                }
            });
        }, {
            rootMargin: '-10% 0px -70% 0px',
            threshold: [0.1, 0.3, 0.5, 0.7]
        });

        sections.forEach(section => observer.observe(section));
        this.performance.observers.set('navigation', observer);
    }

    /**
     * Update active navigation link with smooth transitions
     */
    updateActiveNavLink(sectionId, navLinks) {
        if (this.state.currentSection === sectionId) return;
        
        this.state.currentSection = sectionId;

        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
        });
    }

    /**
     * Ultra-smooth scrolling with enhanced easing
     */
    scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        const header = document.querySelector('.premium-header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        this.smoothScrollTo(targetPosition, this.animations.durations.scroll);
    }

    /**
     * Enhanced smooth scroll with better performance
     */
    smoothScrollTo(targetPosition, duration = 600) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        // Enhanced easing function
        const easeInOutQuart = (t) => {
            return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
        };

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easedProgress = easeInOutQuart(progress);
            const currentPosition = startPosition + distance * easedProgress;

            window.scrollTo({
                top: currentPosition,
                behavior: 'instant'
            });

            if (progress < 1) {
                this.performance.rafId = requestAnimationFrame(animation);
            } else {
                this.performance.rafId = null;
            }
        };

        // Cancel any existing animation
        if (this.performance.rafId) {
            cancelAnimationFrame(this.performance.rafId);
        }

        requestAnimationFrame(animation);
    }

    // ===================================================================
    // ENHANCED MOBILE MENU SYSTEM
    // ===================================================================

    /**
     * Initialize enhanced mobile menu with better animations
     */
    initializeMobileMenu() {
        const menuToggle = document.getElementById('mobile-toggle');
        const nav = document.querySelector('.main-nav');
        const navItems = document.querySelectorAll('.nav-item');

        if (!menuToggle || !nav) return;

        console.log('📱 Initializing enhanced mobile menu...');

        // Enhanced menu toggle
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });

        // Auto-close on navigation
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (this.state.isMobileMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });

        // Enhanced outside click detection
        document.addEventListener('click', (e) => {
            if (this.state.isMobileMenuOpen && 
                !nav.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                this.toggleMobileMenu();
            }
        });

        // Enhanced keyboard handling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.isMobileMenuOpen) {
                this.toggleMobileMenu();
            }
        });
    }

    /**
     * Toggle mobile menu with enhanced animations
     */
    toggleMobileMenu() {
        const menuToggle = document.getElementById('mobile-toggle');
        const nav = document.querySelector('.main-nav');
        if (!menuToggle || !nav) return;

        this.state.isMobileMenuOpen = !this.state.isMobileMenuOpen;

        // Update toggle button with animation
        menuToggle.classList.toggle('is-active', this.state.isMobileMenuOpen);
        menuToggle.setAttribute('aria-expanded', this.state.isMobileMenuOpen);

        // Update navigation with enhanced animation
        nav.classList.toggle('mobile-active', this.state.isMobileMenuOpen);

        // Enhanced body scroll management
        document.body.style.overflow = this.state.isMobileMenuOpen ? 'hidden' : '';

        // Animate menu items with stagger
        if (this.state.isMobileMenuOpen) {
            this.animateMenuItems();
        }

        // Enhanced haptic feedback
        this.triggerHapticFeedback();
        this.playClickSound();
    }

    /**
     * Enhanced menu items animation with better performance
     */
    animateMenuItems() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach((item, index) => {
            // Reset styles
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'none';

            // Animate in with optimized delay
            setTimeout(() => {
                item.style.transition = `all ${this.animations.durations.normal}ms ${this.animations.easing.bounce}`;
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 50); // Faster stagger
        });
    }

    /**
     * Close mobile menu if open
     */
    closeMobileMenuIfOpen() {
        if (this.state.isMobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    // ===================================================================
    // ADVANCED SCROLL SYSTEM
    // ===================================================================

    /**
     * Initialize advanced scroll system with better performance
     */
    initializeScrollSystem() {
        console.log('📜 Initializing advanced scroll system...');
        
        this.initializeScrollAnimations();
        this.initializeScrollToTop();
        this.initializeScrollProgress();
        this.initializeParallaxEffects();
    }

    /**
     * Enhanced scroll animations with better performance
     */
    initializeScrollAnimations() {
        const sections = document.querySelectorAll('.content-section');
        const header = document.querySelector('.premium-header');

        if (sections.length && this.features.intersectionObserver) {
            this.initializeSectionAnimations(sections);
        }

        if (header) {
            this.initializeHeaderScrollEffects(header);
        }
    }

    /**
     * Initialize section animations with enhanced intersection observer
     */
    initializeSectionAnimations(sections) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    this.triggerSectionSpecificAnimations(entry.target);
                    observer.unobserve(entry.target); // Performance optimization
                }
            });
        }, {
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        });

        sections.forEach(section => observer.observe(section));
        this.performance.observers.set('sectionAnimations', observer);
    }

    /**
     * Enhanced header scroll effects
     */
    initializeHeaderScrollEffects(header) {
        let lastScrollY = 0;
        let ticking = false;

        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            const scrollDifference = currentScrollY - lastScrollY;

            // Enhanced scroll direction detection
            if (Math.abs(scrollDifference) > 5) {
                this.state.scrollDirection = scrollDifference > 0 ? 'down' : 'up';
            }

            // Enhanced header state management
            const isScrolled = currentScrollY > 50;
            const shouldHide = this.state.scrollDirection === 'down' && currentScrollY > 200;

            header.classList.toggle('scrolled', isScrolled);
            header.classList.toggle('hidden', shouldHide);

            lastScrollY = currentScrollY;
            ticking = false;
        };

        // Optimized scroll handler
        const scrollHandler = () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        };

        this.addOptimizedEventListener(window, 'scroll', scrollHandler, { 
            passive: true 
        });
    }

    /**
     * Initialize scroll to top with enhanced animation
     */
    initializeScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTop');
        if (!scrollBtn) return;

        // Enhanced scroll to top functionality
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.smoothScrollTo(0, this.animations.durations.scroll);
            this.playClickSound();
        });

        // Enhanced visibility toggle
        const toggleVisibility = () => {
            const shouldShow = window.scrollY > 300;
            scrollBtn.classList.toggle('visible', shouldShow);
        };

        this.addOptimizedEventListener(window, 'scroll', toggleVisibility, { 
            passive: true,
            throttle: 100
        });
    }

    /**
     * Initialize enhanced scroll progress
     */
    initializeScrollProgress() {
        // Create progress bar if it doesn't exist
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
            document.body.appendChild(progressBar);
        }

        const updateProgress = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
            
            const bar = progressBar.querySelector('.scroll-progress-bar');
            if (bar) {
                bar.style.width = `${scrollPercent}%`;
                bar.style.transform = `scaleX(${scrollPercent / 100})`;
            }
        };

        this.addOptimizedEventListener(window, 'scroll', updateProgress, { 
            passive: true,
            throttle: 16 // 60fps
        });
    }

    /**
     * Initialize enhanced parallax effects
     */
    initializeParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        if (!parallaxElements.length) return;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed);
                
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            });
        };

        this.addOptimizedEventListener(window, 'scroll', updateParallax, { 
            passive: true,
            throttle: 16
        });
    }

    // ===================================================================
    // ENHANCED SECTION ANIMATIONS
    // ===================================================================

    /**
     * Trigger section-specific animations with better performance
     */
    triggerSectionSpecificAnimations(section) {
        const sectionId = section.id;
        const delay = this.animations.delays[sectionId] || 100;

        // Use requestAnimationFrame for better performance
        requestAnimationFrame(() => {
            setTimeout(() => {
                switch(sectionId) {
                    case 'hero':
                        this.animateHeroSection();
                        break;
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
            }, delay);
        });
    }

    /**
     * Enhanced hero section animation
     */
    animateHeroSection() {
        const elements = {
            greeting: document.querySelector('.hero-greeting'),
            titleLines: document.querySelectorAll('.title-line'),
            subtitle: document.querySelector('.hero-subtitle'),
            stats: document.querySelectorAll('.stat-item'),
            actions: document.querySelector('.hero-actions'),
            chipShowcase: document.querySelector('.chip-showcase')
        };

        // Animate greeting
        if (elements.greeting) {
            this.animateElement(elements.greeting, 'fadeInUp', 0);
        }

        // Animate title lines with faster stagger
        elements.titleLines.forEach((line, index) => {
            this.animateElement(line, 'fadeInUp', 100 + (index * 100));
        });

        // Animate subtitle
        if (elements.subtitle) {
            this.animateElement(elements.subtitle, 'fadeInUp', 400);
        }

        // Animate stats with enhanced counters
        elements.stats.forEach((stat, index) => {
            setTimeout(() => {
                this.animateStatCard(stat);
                this.animateCounter(stat);
            }, 500 + (index * 50));
        });

        // Animate actions
        if (elements.actions) {
            this.animateElement(elements.actions, 'fadeInUp', 600);
        }

        // Animate chip showcase
        if (elements.chipShowcase) {
            this.animateChipShowcase();
        }
    }

    /**
     * Enhanced chip showcase animation
     */
    animateChipShowcase() {
        const elements = {
            mainChip: document.querySelector('.main-chip'),
            coreUnits: document.querySelectorAll('.core-unit'),
            connectionLines: document.querySelectorAll('.connection-line'),
            orbitChips: document.querySelectorAll('.orbit-chip')
        };

        // Main chip entrance with enhanced animation
        if (elements.mainChip) {
            setTimeout(() => {
                elements.mainChip.style.opacity = '1';
                elements.mainChip.style.transform = 'translate(-50%, -50%) scale(1)';
                elements.mainChip.style.transition = `all ${this.animations.durations.slow}ms ${this.animations.easing.bounce}`;
            }, 300);
        }

        // Core units with enhanced sequence
        elements.coreUnits.forEach((unit, index) => {
            setTimeout(() => {
                unit.style.opacity = '1';
                unit.style.transform = 'scale(1)';
                unit.style.transition = `all ${this.animations.durations.normal}ms ${this.animations.easing.elastic}`;
            }, 400 + (index * 75));
        });

        // Connection lines with enhanced pulse
        elements.connectionLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transition = `opacity ${this.animations.durations.normal}ms ease`;
            }, 500 + (index * 50));
        });

        // Orbit chips with enhanced interactions
        elements.orbitChips.forEach((chip, index) => {
            setTimeout(() => {
                chip.style.opacity = '1';
                chip.style.transform = 'scale(1)';
                chip.style.transition = `all ${this.animations.durations.normal}ms ${this.animations.easing.bounce}`;
                this.addChipInteractions(chip);
            }, 600 + (index * 100));
        });
    }

    /**
     * Enhanced chip interactions
     */
    addChipInteractions(chip) {
        chip.addEventListener('mouseenter', () => {
            chip.style.transform = 'scale(1.15)';
            chip.style.boxShadow = '0 20px 40px rgba(0, 122, 255, 0.4)';
            chip.style.zIndex = '10';
            this.playHoverSound();
        });

        chip.addEventListener('mouseleave', () => {
            chip.style.transform = 'scale(1)';
            chip.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
            chip.style.zIndex = '1';
        });

        chip.addEventListener('click', () => {
            this.triggerChipPulse(chip);
            this.playClickSound();
        });
    }

    /**
     * Enhanced counter animation
     */
    animateCounter(element) {
        const numberElement = element.querySelector('.stat-number');
        if (!numberElement) return;

        const finalText = numberElement.textContent;
        const hasPlus = finalText.includes('+');
        const hasLetters = /[a-zA-Z]/.test(finalText);

        if (hasLetters && !hasPlus) {
            this.animateElement(numberElement, 'scale', 200);
            return;
        }

        const targetValue = parseInt(finalText);
        if (isNaN(targetValue)) return;

        let currentValue = 0;
        const duration = 1000; // Faster animation
        const startTime = performance.now();

        const animate = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Enhanced easing
            const easeOut = 1 - Math.pow(1 - progress, 2);
            currentValue = Math.floor(targetValue * easeOut);

            let displayValue = currentValue;
            if (hasPlus) displayValue += '+';
            
            numberElement.textContent = displayValue;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    /**
     * Enhanced stat card animation
     */
    animateStatCard(stat) {
        stat.style.opacity = '0';
        stat.style.transform = 'translateY(20px) scale(0.9)';
        
        setTimeout(() => {
            stat.style.opacity = '1';
            stat.style.transform = 'translateY(0) scale(1)';
            stat.style.transition = `all ${this.animations.durations.normal}ms ${this.animations.easing.bounce}`;
        }, 50);
    }

    /**
     * Enhanced generic element animation
     */
    animateElement(element, animation, delay = 0) {
        if (!element) return;

        const animations = {
            fadeInUp: () => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'none';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                    element.style.transition = `all ${this.animations.durations.normal}ms ${this.animations.easing.smooth}`;
                }, delay);
            },
            scale: () => {
                element.style.transform = 'scale(0.8)';
                element.style.transition = 'none';
                
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                    element.style.transition = `transform ${this.animations.durations.normal}ms ${this.animations.easing.bounce}`;
                }, delay);
            },
            slideInLeft: () => {
                element.style.opacity = '0';
                element.style.transform = 'translateX(-30px)';
                element.style.transition = 'none';
                
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                    element.style.transition = `all ${this.animations.durations.normal}ms ${this.animations.easing.smooth}`;
                }, delay);
            }
        };

        if (animations[animation]) {
            animations[animation]();
        }
    }

    // ===================================================================
    // ENHANCED ABOUT SECTION
    // ===================================================================

    /**
     * Animate about section with enhanced effects
     */
    animateAboutSection() {
        const elements = {
            storyCard: document.querySelector('.story-card'),
            timelineItems: document.querySelectorAll('.timeline-item'),
            skillCategories: document.querySelectorAll('.skill-category')
        };

        // Animate story card
        if (elements.storyCard) {
            this.animateElement(elements.storyCard, 'fadeInUp', 0);
        }

        // Animate timeline items with stagger
        elements.timelineItems.forEach((item, index) => {
            this.animateElement(item, 'slideInLeft', 100 + (index * 150));
        });

        // Animate skill categories with enhanced stagger
        elements.skillCategories.forEach((category, index) => {
            setTimeout(() => {
                this.animateElement(category, 'fadeInUp', 0);
                this.animateSkillTags(category);
            }, 200 + (index * 100));
        });
    }

    /**
     * Enhanced skill tags animation
     */
    animateSkillTags(category) {
        const skillTags = category.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                tag.style.opacity = '1';
                tag.style.transform = 'scale(1)';
                tag.style.transition = `all ${this.animations.durations.fast}ms ${this.animations.easing.bounce}`;
            }, index * 30);
        });
    }

    // ===================================================================
    // ENHANCED EXPERIENCE SECTION
    // ===================================================================

    /**
     * Animate experience section with enhanced timeline
     */
    animateExperienceSection() {
        const experienceItems = document.querySelectorAll('.experience-item');
        
        experienceItems.forEach((item, index) => {
            const marker = item.querySelector('.experience-marker');
            const content = item.querySelector('.experience-content');
            
            // Animate marker
            if (marker) {
                setTimeout(() => {
                    marker.style.opacity = '1';
                    marker.style.transform = 'scale(1)';
                    marker.style.transition = `all ${this.animations.durations.normal}ms ${this.animations.easing.bounce}`;
                }, index * 200);
            }
            
            // Animate content
            if (content) {
                setTimeout(() => {
                    this.animateElement(content, 'slideInLeft', 0);
                    this.animateAchievements(content);
                }, index * 200 + 100);
            }
        });
    }

    /**
     * Enhanced achievements animation
     */
    animateAchievements(content) {
        const achievements = content.querySelectorAll('.achievements li');
        
        achievements.forEach((achievement, index) => {
            achievement.style.opacity = '0';
            achievement.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                achievement.style.opacity = '1';
                achievement.style.transform = 'translateX(0)';
                achievement.style.transition = `all ${this.animations.durations.fast}ms ${this.animations.easing.smooth}`;
            }, index * 50);
        });
    }

    // ===================================================================
    // ENHANCED PROJECTS SECTION
    // ===================================================================

    /**
     * Animate projects section with enhanced card effects
     */
    animateProjectsSection() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                this.animateElement(card, 'fadeInUp', 0);
                this.addProjectInteractions(card);
            }, index * 100);
        });
    }

    /**
     * Enhanced project card interactions
     */
    addProjectInteractions(card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-12px) scale(1.02)';
            this.playHoverSound();
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });

        const projectLinks = card.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.triggerProjectLinkEffect(link);
                this.playClickSound();
            });
        });
    }

    /**
     * Enhanced project link effect
     */
    triggerProjectLinkEffect(link) {
        const originalTransform = link.style.transform;
        link.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            link.style.transform = originalTransform;
        }, 100);
    }

    // ===================================================================
    // ENHANCED RESEARCH SECTION
    // ===================================================================

    /**
     * Animate research section with enhanced card effects
     */
    animateResearchSection() {
        const researchCards = document.querySelectorAll('.research-card');
        const certCategories = document.querySelectorAll('.cert-category');
        
        // Animate research cards
        researchCards.forEach((card, index) => {
            setTimeout(() => {
                this.animateElement(card, 'fadeInUp', 0);
                this.addResearchInteractions(card);
            }, index * 100);
        });

        // Animate certification categories
        certCategories.forEach((category, index) => {
            setTimeout(() => {
                this.animateElement(category, 'fadeInUp', 0);
                this.animateCertItems(category);
            }, 300 + (index * 150));
        });
    }

    /**
     * Enhanced research card interactions
     */
    addResearchInteractions(card) {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.01)';
            this.playHoverSound();
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    }

    /**
     * Enhanced certification items animation
     */
    animateCertItems(category) {
        const certItems = category.querySelectorAll('.cert-item');
        
        certItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
                item.style.transition = `all ${this.animations.durations.fast}ms ${this.animations.easing.smooth}`;
            }, index * 50);
        });
    }

    // ===================================================================
    // ENHANCED CONTACT SECTION
    // ===================================================================

    /**
     * Animate contact section with enhanced effects
     */
    animateContactSection() {
        const elements = {
            contactText: document.querySelector('.contact-text'),
            contactInfo: document.querySelectorAll('.contact-item'),
            socialLinks: document.querySelectorAll('.social-link'),
            contactVisual: document.querySelector('.contact-visual')
        };

        // Animate contact text
        if (elements.contactText) {
            this.animateElement(elements.contactText, 'fadeInUp', 0);
        }

        // Animate contact info items
        elements.contactInfo.forEach((item, index) => {
            setTimeout(() => {
                this.animateElement(item, 'slideInLeft', 0);
                this.addContactInteractions(item);
            }, 100 + (index * 100));
        });

        // Animate social links
        elements.socialLinks.forEach((link, index) => {
            setTimeout(() => {
                this.animateElement(link, 'fadeInUp', 0);
                this.addSocialInteractions(link);
            }, 200 + (index * 50));
        });

        // Animate contact visual
        if (elements.contactVisual) {
            this.animateContactVisual();
        }
    }

    /**
     * Enhanced contact interactions
     */
    addContactInteractions(item) {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-4px) scale(1.02)';
            this.playHoverSound();
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
        });
    }

    /**
     * Enhanced social link interactions
     */
    addSocialInteractions(link) {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-4px) scale(1.05)';
            this.playHoverSound();
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1)';
        });

        link.addEventListener('click', () => {
            this.triggerSocialPulse(link);
            this.playClickSound();
        });
    }

    /**
     * Enhanced contact visual animation
     */
    animateContactVisual() {
        const circuitBoard = document.querySelector('.circuit-board');
        const circuitTraces = document.querySelectorAll('.circuit-trace');
        const circuitComponents = document.querySelectorAll('.circuit-component');

        if (circuitBoard) {
            setTimeout(() => {
                circuitBoard.style.opacity = '1';
                circuitBoard.style.transform = 'scale(1)';
                circuitBoard.style.transition = `all ${this.animations.durations.slow}ms ${this.animations.easing.bounce}`;
            }, 300);
        }

        // Animate circuit traces
        circuitTraces.forEach((trace, index) => {
            setTimeout(() => {
                trace.style.opacity = '1';
                trace.style.animation = `trace-pulse 3s ease-in-out infinite`;
                trace.style.animationDelay = `${index * 0.5}s`;
            }, 400 + (index * 100));
        });

        // Animate circuit components
        circuitComponents.forEach((component, index) => {
            setTimeout(() => {
                component.style.opacity = '1';
                component.style.transform = 'scale(1)';
                component.style.transition = `all ${this.animations.durations.normal}ms ${this.animations.easing.bounce}`;
            }, 500 + (index * 150));
        });
    }

    // ===================================================================
    // ENHANCED FLOATING CONTROLS
    // ===================================================================

    /**
     * Initialize enhanced floating controls
     */
    initializeFloatingControls() {
        const scrollBtn = document.getElementById('scrollToTop');
        const soundBtn = document.getElementById('soundToggle');
        const themeBtn = document.getElementById('themeToggle');

        console.log('🎮 Initializing enhanced floating controls...');

        // Enhanced scroll to top
        if (scrollBtn) {
            scrollBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothScrollTo(0, this.animations.durations.scroll);
                this.playClickSound();
            });
        }

        // Enhanced sound toggle
        if (soundBtn) {
            soundBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleSound();
                this.playClickSound();
            });
        }

        // Enhanced theme toggle
        if (themeBtn) {
            themeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
                this.playClickSound();
            });
        }
    }

    /**
     * Enhanced sound system
     */
    initializeSoundSystem() {
        console.log('🔊 Initializing enhanced sound system...');
        
        // Create audio context for better performance
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.sounds = {
                click: this.createSound(800, 0.1, 'sine'),
                hover: this.createSound(600, 0.05, 'sine'),
                startup: this.createSound(1000, 0.2, 'triangle'),
                success: this.createSound(1200, 0.15, 'sine')
            };
        } catch (error) {
            console.log('🔇 Audio context not supported, using fallback sounds');
            this.sounds = {};
        }
    }

    /**
     * Create enhanced sound effect
     */
    createSound(frequency, duration, type = 'sine') {
        return {
            frequency,
            duration,
            type
        };
    }

    /**
     * Play enhanced sound effect
     */
    playSound(soundName) {
        if (!this.state.soundEnabled || !this.audioContext || !this.sounds[soundName]) return;

        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            const sound = this.sounds[soundName];
            oscillator.frequency.setValueAtTime(sound.frequency, this.audioContext.currentTime);
            oscillator.type = sound.type;
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + sound.duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + sound.duration);
        } catch (error) {
            console.log('🔇 Error playing sound:', error);
        }
    }

    /**
     * Play specific sound effects
     */
    playClickSound() {
        this.playSound('click');
    }

    playHoverSound() {
        this.playSound('hover');
    }

    playStartupSound() {
        this.playSound('startup');
    }

    playSuccessSound() {
        this.playSound('success');
    }

    /**
     * Toggle sound system
     */
    toggleSound() {
        this.state.soundEnabled = !this.state.soundEnabled;
        const soundBtn = document.getElementById('soundToggle');
        
        if (soundBtn) {
            const icon = soundBtn.querySelector('i');
            if (icon) {
                icon.className = this.state.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
            }
        }

        // Store preference
        localStorage.setItem('soundEnabled', this.state.soundEnabled);
        
        // Play confirmation sound
        if (this.state.soundEnabled) {
            this.playSuccessSound();
        }
    }

    // ===================================================================
    // ENHANCED THEME SYSTEM
    // ===================================================================

    /**
     * Initialize enhanced theme toggle
     */
    initializeThemeToggle() {
        const themeBtn = document.getElementById('themeToggle');
        if (!themeBtn) return;

        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.state.theme = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);

        // Update button icon
        this.updateThemeIcon(themeBtn);

        console.log('🎨 Theme system initialized with theme:', savedTheme);
    }

    /**
     * Toggle theme with enhanced animation
     */
    toggleTheme() {
        const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
        this.state.theme = newTheme;

        // Apply theme with animation
        document.documentElement.style.transition = 'all 0.3s ease';
        document.documentElement.setAttribute('data-theme', newTheme);

        // Update button icon
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            this.updateThemeIcon(themeBtn);
        }

        // Store preference
        localStorage.setItem('theme', newTheme);

        // Remove transition after animation
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);

        console.log('🎨 Theme switched to:', newTheme);
    }

    /**
     * Update theme icon
     */
    updateThemeIcon(themeBtn) {
        const icon = themeBtn.querySelector('i');
        if (icon) {
            icon.className = this.state.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // ===================================================================
    // ENHANCED INTERACTIONS
    // ===================================================================

    /**
     * Initialize enhanced interactions
     */
    initializeInteractions() {
        console.log('⚡ Initializing enhanced interactions...');
        
        this.initializeHoverEffects();
        this.initializeClickEffects();
        this.initializeKeyboardNavigation();
        this.initializeAccessibility();
    }

    /**
     * Enhanced hover effects
     */
    initializeHoverEffects() {
        const interactiveElements = document.querySelectorAll('.btn, .nav-item, .project-card, .skill-tag');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.playHoverSound();
            });
        });
    }

    /**
     * Enhanced click effects
     */
    initializeClickEffects() {
        const clickableElements = document.querySelectorAll('.btn, .nav-item, .project-link, .social-link');
        
        clickableElements.forEach(element => {
            element.addEventListener('click', () => {
                this.triggerClickEffect(element);
                this.playClickSound();
            });
        });
    }

    /**
     * Enhanced keyboard navigation
     */
    initializeKeyboardNavigation(navLinks) {
        if (!navLinks) {
            navLinks = document.querySelectorAll('.nav-item');
        }

        navLinks.forEach((link, index) => {
            link.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                    e.preventDefault();
                    const nextIndex = (index + 1) % navLinks.length;
                    navLinks[nextIndex].focus();
                } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                    e.preventDefault();
                    const prevIndex = (index - 1 + navLinks.length) % navLinks.length;
                    navLinks[prevIndex].focus();
                }
            });
        });
    }

    /**
     * Enhanced accessibility features
     */
    initializeAccessibility() {
        // Enhanced focus management
        document.addEventListener('focusin', (e) => {
            e.target.classList.add('focus-visible');
        });

        document.addEventListener('focusout', (e) => {
            e.target.classList.remove('focus-visible');
        });

        // Enhanced keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'h':
                        e.preventDefault();
                        this.scrollToSection('hero');
                        break;
                    case 'a':
                        e.preventDefault();
                        this.scrollToSection('about');
                        break;
                    case 'p':
                        e.preventDefault();
                        this.scrollToSection('projects');
                        break;
                    case 'c':
                        e.preventDefault();
                        this.scrollToSection('contact');
                        break;
                }
            }
        });
    }

    // ===================================================================
    // ENHANCED EFFECTS
    // ===================================================================

    /**
     * Enhanced click effect
     */
    triggerClickEffect(element) {
        const originalTransform = element.style.transform;
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = originalTransform;
        }, 100);
    }

    /**
     * Enhanced chip pulse effect
     */
    triggerChipPulse(chip) {
        chip.style.animation = 'none';
        chip.offsetHeight; // Trigger reflow
        chip.style.animation = 'chip-pulse 0.6s ease-out';
    }

    /**
     * Enhanced social pulse effect
     */
    triggerSocialPulse(link) {
        link.style.animation = 'none';
        link.offsetHeight; // Trigger reflow
        link.style.animation = 'social-pulse 0.4s ease-out';
    }

    /**
     * Enhanced haptic feedback
     */
    triggerHapticFeedback() {
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    // ===================================================================
    // PERFORMANCE OPTIMIZATIONS
    // ===================================================================

    /**
     * Initialize performance optimizations
     */
    initializePerformanceOptimizations() {
        console.log('⚡ Initializing performance optimizations...');
        
        // Optimize images
        this.optimizeImages();
        
        // Optimize animations
        this.optimizeAnimations();
        
        // Optimize scroll performance
        this.optimizeScrollPerformance();
        
        // Clean up unused observers
        this.cleanupObservers();
    }

    /**
     * Optimize images for better performance
     */
    optimizeImages() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add lazy loading
            img.loading = 'lazy';
            
            // Add decode hint
            img.decoding = 'async';
            
            // Optimize for high DPI displays
            if (this.features.devicePixelRatio > 1) {
                img.style.imageRendering = 'optimizeQuality';
            }
        });
    }

    /**
     * Optimize animations for better performance
     */
    optimizeAnimations() {
        // Reduce animations on low-end devices
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            document.documentElement.classList.add('reduced-animations');
        }
        
        // Pause animations when not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                document.documentElement.classList.add('animations-paused');
            } else {
                document.documentElement.classList.remove('animations-paused');
            }
        });
    }

    /**
     * Optimize scroll performance
     */
    optimizeScrollPerformance() {
        // Use will-change for better performance
        const scrollElements = document.querySelectorAll('.hero-visual, .chip-showcase, .floating-controls');
        
        scrollElements.forEach(element => {
            element.style.willChange = 'transform';
        });
    }

    /**
     * Clean up unused observers
     */
    cleanupObservers() {
        // Clean up observers when page is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.performance.observers.forEach(observer => {
                    if (observer.disconnect) {
                        observer.disconnect();
                    }
                });
            }
        });
    }

    /**
     * Initialize progressive enhancements
     */
    initializeProgressiveEnhancements() {
        console.log('🚀 Initializing progressive enhancements...');
        
        // Initialize service worker for offline support
        this.initializeServiceWorker();
        
        // Initialize web app manifest
        this.initializeWebAppManifest();
        
        // Initialize performance monitoring
        this.initializePerformanceMonitoring();
    }

    /**
     * Initialize service worker
     */
    initializeServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('❌ Service Worker registration failed:', error);
                });
        }
    }

    /**
     * Initialize web app manifest
     */
    initializeWebAppManifest() {
        // Add to home screen prompt
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            console.log('📱 Add to home screen prompt available');
        });
    }

    /**
     * Initialize performance monitoring
     */
    initializePerformanceMonitoring() {
        // Monitor performance metrics
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    console.log('📊 Performance metric:', entry.name, entry.value);
                });
            });
            
            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }
    }

    /**
     * Initialize external libraries
     */
    async initializeExternalLibraries() {
        console.log('📚 Initializing external libraries...');
        
        // Initialize any external libraries here
        // For example: analytics, chat widgets, etc.
        
        return Promise.resolve();
    }

    // ===================================================================
    // EVENT HANDLERS
    // ===================================================================

    /**
     * Handle window load
     */
    handleWindowLoad() {
        console.log('🎯 Window loaded');
        this.playStartupSound();
    }

    /**
     * Handle scroll with enhanced performance
     */
    handleScroll() {
        if (this.performance.ticking) return;
        
        this.performance.ticking = true;
        requestAnimationFrame(() => {
            this.updateScrollState();
            this.performance.ticking = false;
        });
    }

    /**
     * Update scroll state
     */
    updateScrollState() {
        const currentScrollY = window.pageYOffset;
        const scrollDifference = currentScrollY - this.performance.lastScrollY;
        
        // Update scroll direction
        if (Math.abs(scrollDifference) > 5) {
            this.state.scrollDirection = scrollDifference > 0 ? 'down' : 'up';
        }
        
        this.performance.lastScrollY = currentScrollY;
    }

    /**
     * Handle resize with debouncing
     */
    handleResize() {
        console.log('📐 Window resized');
        
        // Update viewport units
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        
        // Update chip showcase size on mobile
        this.updateChipShowcaseSize();
    }

    /**
     * Update chip showcase size
     */
    updateChipShowcaseSize() {
        const chipShowcase = document.querySelector('.chip-showcase');
        if (chipShowcase && window.innerWidth < 768) {
            chipShowcase.style.width = '250px';
            chipShowcase.style.height = '250px';
        }
    }

    /**
     * Handle orientation change
     */
    handleOrientationChange() {
        console.log('🔄 Orientation changed');
        
        // Update layout after orientation change
        setTimeout(() => {
            this.handleResize();
        }, 200);
    }

    /**
     * Handle online/offline status
     */
    handleOnlineStatus(isOnline) {
        this.state.isOnline = isOnline;
        console.log(`📡 Network status: ${isOnline ? 'online' : 'offline'}`);
        
        // Update UI based on online status
        document.documentElement.classList.toggle('offline', !isOnline);
    }

    /**
     * Handle keydown events
     */
    handleKeydown(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && this.state.isMobileMenuOpen) {
            this.toggleMobileMenu();
        }
        
        // Space or Enter on focused elements
        if ((e.key === ' ' || e.key === 'Enter') && e.target.classList.contains('btn')) {
            e.preventDefault();
            e.target.click();
        }
    }

    /**
     * Handle visibility change
     */
    handleVisibilityChange() {
        if (document.hidden) {
            console.log('👀 Page hidden');
            // Pause animations and timers
            this.pauseAnimations();
        } else {
            console.log('👀 Page visible');
            // Resume animations and timers
            this.resumeAnimations();
        }
    }

    /**
     * Handle global clicks
     */
    handleGlobalClick(e) {
        // Close mobile menu if clicking outside
        if (this.state.isMobileMenuOpen && !e.target.closest('.premium-header')) {
            this.toggleMobileMenu();
        }
    }

    /**
     * Handle touch events
     */
    handleTouchStart(e) {
        this.performance.touchStartY = e.touches[0].clientY;
    }

    handleTouchMove(e) {
        // Prevent rubber band scrolling on iOS
        if (e.touches[0].clientY > this.performance.touchStartY && window.pageYOffset === 0) {
            e.preventDefault();
        }
    }

    handleTouchEnd(e) {
        this.performance.touchEndY = e.changedTouches[0].clientY;
        
        // Handle swipe gestures
        const swipeDistance = this.performance.touchStartY - this.performance.touchEndY;
        if (Math.abs(swipeDistance) > 100) {
            if (swipeDistance > 0) {
                // Swipe up
                console.log('👆 Swipe up detected');
            } else {
                // Swipe down
                console.log('👇 Swipe down detected');
            }
        }
    }

    /**
     * Handle focus events
     */
    handleFocusIn(e) {
        e.target.classList.add('focus-visible');
    }

    handleFocusOut(e) {
        e.target.classList.remove('focus-visible');
    }

    // ===================================================================
    // ANIMATION CONTROL
    // ===================================================================

    /**
     * Start main animations
     */
    startMainAnimations() {
        console.log('🎬 Starting main animations...');
        
        // Trigger hero animations
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.classList.add('is-visible');
            this.triggerSectionSpecificAnimations(heroSection);
        }
    }

    /**
     * Pause animations
     */
    pauseAnimations() {
        document.documentElement.classList.add('animations-paused');
        
        // Pause all intervals
        this.performance.intervals.forEach(interval => {
            clearInterval(interval);
        });
    }

    /**
     * Resume animations
     */
    resumeAnimations() {
        document.documentElement.classList.remove('animations-paused');
        
        // Resume critical animations
        this.addPremiumLoadingEffects();
    }

    // ===================================================================
    // UTILITY FUNCTIONS
    // ===================================================================

    /**
     * Sleep utility for async operations
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Enhanced debounce function
     */
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    /**
     * Enhanced throttle function
     */
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Log errors with enhanced formatting
     */
    logError(type, details) {
        console.error(`❌ ${type}:`, details);
        
        // Send to error reporting service in production
        if (typeof gtag !== 'undefined') {
            gtag('event', 'exception', {
                description: `${type}: ${details.message || details}`,
                fatal: false
            });
        }
    }

    /**
     * Report initialization complete
     */
    reportInitializationComplete() {
        const loadTime = performance.now() - this.performance.startTime;
        console.log(`🚀 Ultimate Semiconductor Portfolio loaded in ${loadTime.toFixed(2)}ms`);
        console.log('✨ All systems optimized for maximum performance');
        console.log('🎯 Enhanced interactions activated');
        console.log('♿ Accessibility features enabled');
        console.log('📱 Mobile-first design optimized');
        console.log('🎨 Theme system ready');
        console.log('🔊 Sound system initialized');
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('portfolio:loaded', {
            detail: {
                loadTime,
                features: this.features,
                performance: this.performance
            }
        }));
    }

    /**
     * Handle initialization errors
     */
    handleInitializationError(error) {
        console.error('❌ Portfolio initialization failed:', error);
        this.logError('Initialization Error', error);
        this.initializeFallbackMode();
    }

    /**
     * Initialize fallback mode
     */
    initializeFallbackMode() {
        console.log('⚠️ Running in fallback mode');
        
        // Basic smooth scrolling
        const navLinks = document.querySelectorAll('.nav-item');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href')?.substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Basic mobile menu
        const menuToggle = document.getElementById('mobile-toggle');
        const nav = document.querySelector('.main-nav');
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', () => {
                nav.classList.toggle('mobile-active');
            });
        }
    }

    // ===================================================================
    // CLEANUP
    // ===================================================================

    /**
     * Clean up resources
     */
    cleanup() {
        console.log('🧹 Cleaning up resources...');
        
        // Clear intervals
        this.performance.intervals.forEach(interval => {
            clearInterval(interval);
        });
        this.performance.intervals.clear();
        
        // Disconnect observers
        this.performance.observers.forEach(observer => {
            if (observer.disconnect) {
                observer.disconnect();
            }
        });
        this.performance.observers.clear();
        
        // Cancel animation frames
        this.performance.animationFrames.forEach(id => {
            cancelAnimationFrame(id);
        });
        this.performance.animationFrames.clear();
        
        // Close audio context
        if (this.audioContext) {
            this.audioContext.close();
        }
    }
}

// ===================================================================
// INITIALIZATION
// ===================================================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    initializePortfolio();
}

/**
 * Initialize the portfolio system
 */
function initializePortfolio() {
    try {
        console.log('🎯 Initializing Ultimate Semiconductor Portfolio...');
        
        // Create portfolio instance
        const portfolio = new SemiconductorPortfolio();
        
        // Make globally accessible
        window.portfolio = portfolio;
        
        // Setup development helpers
        if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
            setupDevelopmentHelpers(portfolio);
        }
        
        // Setup cleanup on page unload
        window.addEventListener('beforeunload', () => {
            portfolio.cleanup();
        });
        
    } catch (error) {
        console.error('❌ Failed to initialize portfolio:', error);
        initializeFallback();
    }
}

/**
 * Setup development helpers
 */
function setupDevelopmentHelpers(portfolio) {
    // Performance monitoring
    window.portfolioPerformance = () => {
        const performance = window.performance;
        const memory = performance.memory;
        
        console.table({
            'Load Time': `${(performance.now() - portfolio.performance.startTime).toFixed(2)}ms`,
            'Memory Usage': memory ? `${(memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB` : 'N/A',
            'Memory Limit': memory ? `${(memory.totalJSHeapSize / 1024 / 1024).toFixed(2)}MB` : 'N/A',
            'Active Observers': portfolio.performance.observers.size,
            'Active Intervals': portfolio.performance.intervals.size,
            'Animation Frames': portfolio.performance.animationFrames.size
        });
    };

    // Debug mode toggle
    window.portfolioDebug = (enabled = true) => {
        document.documentElement.classList.toggle('debug-mode', enabled);
        portfolio.debugMode = enabled;
        console.log(`🐛 Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    };

    // Animation speed control
    window.portfolioSpeed = (speed = 1) => {
        document.documentElement.style.setProperty('--animation-speed', speed);
        console.log(`⚡ Animation speed set to ${speed}x`);
    };

    // Sound test
    window.portfolioSoundTest = () => {
        portfolio.playStartupSound();
        setTimeout(() => portfolio.playClickSound(), 500);
        setTimeout(() => portfolio.playHoverSound(), 1000);
        setTimeout(() => portfolio.playSuccessSound(), 1500);
    };

    console.log('🔧 Development helpers loaded');
    console.log('📊 Use portfolioPerformance() to check performance');
    console.log('🐛 Use portfolioDebug() to toggle debug mode');
    console.log('⚡ Use portfolioSpeed(0.5) to slow animations');
    console.log('🔊 Use portfolioSoundTest() to test sounds');
}

/**
 * Fallback initialization
 */
function initializeFallback() {
    console.log('⚠️ Initializing fallback mode');
    
    // Basic smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Basic mobile menu
    const menuToggle = document.getElementById('mobile-toggle');
    const nav = document.querySelector('.main-nav');
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-active');
        });
    }

    // Hide preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 1000);
    }
}

// ===================================================================
// PERFORMANCE MONITORING
// ===================================================================

// Monitor performance in production
if (typeof window !== 'undefined' && window.performance) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            try {
                const navigation = performance.getEntriesByType('navigation')[0];
                const paint = performance.getEntriesByType('paint');
                
                console.log('📊 Performance Metrics:');
                console.log(`⏱️  DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`);
                console.log(`🎯 Page Load Complete: ${navigation.loadEventEnd - navigation.loadEventStart}ms`);
                
                paint.forEach(entry => {
                    console.log(`🎨 ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
                });
                
                // Log memory usage if available
                if (performance.memory) {
                    console.log(`🧠 Memory Usage: ${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`);
                }
            } catch (error) {
                console.log('📊 Performance monitoring error:', error);
            }
        }, 0);
    });
}

// ===================================================================
// EXPORT FOR MODULE USAGE
// ===================================================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SemiconductorPortfolio;
}

// ===================================================================
// GLOBAL ERROR BOUNDARY
// ===================================================================

window.addEventListener('error', (event) => {
    console.error('🚨 Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('🚨 Unhandled rejection:', event.reason);
});

console.log('🚀 Ultimate Semiconductor Portfolio Script Loaded');
console.log('✨ Version 3.0.0 - Enhanced Performance Edition');
console.log('🎯 Ready for silicon-level performance!');
