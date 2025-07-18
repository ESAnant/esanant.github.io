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
            headerVisible: true,
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
            touchEndY: 0,
        };

        // === OPTIMIZED ANIMATION CONFIGURATION ===
        this.animations = {
            delays: {
                hero: 150,
                about: 100,
                experience: 125,
                projects: 100,
                research: 150,
                contact: 100,
            },
            durations: {
                fast: 150,
                normal: 250,
                slow: 400,
                scroll: 600,
                preloader: 300,
            },
            easing: {
                smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                swift: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
            },
        };

        // === ENHANCED OBSERVER CONFIGURATION ===
        this.observerOptions = {
            intersection: {
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
                rootMargin: '0px 0px -50px 0px',
            },
            mutation: {
                childList: true,
                attributes: true,
                subtree: true,
            },
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
            prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        };

        // === INITIALIZE SYSTEM ===
        this.initialize();
    }

    /**
     * Initialize the portfolio system.
     */
    async initialize() {
        try {
            this.detectDeviceCapabilities();
            this.setupEventListeners();
            this.initializeAccessibility();

            await this.initializePreloader();
            this.initializeNavigation();
            this.initializeMobileMenu();
            this.initializeScrollSystem();
            this.initializeSoundSystem();
            this.initializeFloatingControls();
            this.initializeThemeToggle();
            
            this.state.isLoaded = true;
            console.log(`Portfolio loaded in ${performance.now() - this.performance.startTime}ms`);

        } catch (error) {
            console.error('Portfolio initialization failed:', error);
            this.initializeFallbackMode();
        }
    }

    /**
     * Detect device capabilities and set appropriate classes.
     */
    detectDeviceCapabilities() {
        this.state.touchDevice = this.features.touchEvents;
        this.state.reducedMotion = this.features.prefersReducedMotion;
        document.documentElement.classList.toggle('touch-device', this.state.touchDevice);
        document.documentElement.classList.toggle('reduced-motion', this.state.reducedMotion);
    }
    
    /**
     * Check for passive listener support for performance.
     */
    supportsPassive() {
        let passiveSupported = false;
        try {
            const options = { get passive() { passiveSupported = true; return false; } };
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (err) {
            passiveSupported = false;
        }
        return passiveSupported;
    }

    /**
     * Setup all necessary event listeners.
     */
    setupEventListeners() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        window.addEventListener('resize', () => this.debounce(this.handleResize.bind(this), 100));
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    /**
     * Ultra-fast preloader with realistic progression.
     */
    async initializePreloader() {
        const preloader = document.getElementById('preloader');
        const progressBar = document.querySelector('.progress-bar');
        const progressPercent = document.querySelector('.progress-percentage');
        const stages = document.querySelectorAll('.loading-stages .stage');

        if (!preloader || !progressBar || !progressPercent) return;
        
        const tasks = [
            { duration: 200, progress: 25 },
            { duration: 300, progress: 60 },
            { duration: 250, progress: 90 },
            { duration: 150, progress: 100 },
        ];
        
        let cumulativeProgress = 0;

        for (let i = 0; i < tasks.length; i++) {
            await this.sleep(tasks[i].duration);
            cumulativeProgress = tasks[i].progress;
            progressBar.style.width = `${cumulativeProgress}%`;
            progressPercent.textContent = `${cumulativeProgress}%`;
            if (stages[i]) stages[i].classList.add('active');
        }
        
        await this.sleep(300);
        preloader.classList.add('loaded');
        document.body.style.overflow = 'visible';
        this.startMainAnimations();
    }
    
     /**
     * Start initial page animations after preloader finishes.
     */
    startMainAnimations() {
        const heroSection = document.getElementById('hero');
        if (heroSection) {
            heroSection.classList.add('is-visible');
            this.triggerSectionSpecificAnimations(heroSection);
        }
    }

    /**
     * Initialize navigation with smooth scrolling and highlighting.
     */
    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section[id]');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href')?.substring(1);
                if (targetId) this.scrollToSection(targetId);
                this.closeMobileMenuIfOpen();
                this.playSound('click');
            });
        });
        
        if (this.features.intersectionObserver) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                        const id = entry.target.id;
                        this.updateActiveNavLink(id, navLinks);
                    }
                });
            }, { rootMargin: '-20% 0px -70% 0px', threshold: 0.3 });

            sections.forEach(section => observer.observe(section));
        }
    }

    /**
     * Update the active state of navigation links.
     */
    updateActiveNavLink(sectionId, navLinks) {
        this.state.currentSection = sectionId;
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('active', isActive);
        });
    }

    /**
     * Smoothly scroll to a specific section.
     */
    scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    /**
     * Initialize the mobile menu toggle and behavior.
     */
    initializeMobileMenu() {
        const menuToggle = document.getElementById('mobile-toggle');
        const nav = document.querySelector('.main-nav');
        if (!menuToggle || !nav) return;

        menuToggle.addEventListener('click', () => this.toggleMobileMenu());
    }

    /**
     * Toggle the mobile menu open/closed state.
     */
    toggleMobileMenu() {
        const menuToggle = document.getElementById('mobile-toggle');
        const nav = document.querySelector('.main-nav');
        this.state.isMobileMenuOpen = !this.state.isMobileMenuOpen;

        menuToggle.classList.toggle('is-active', this.state.isMobileMenuOpen);
        menuToggle.setAttribute('aria-expanded', this.state.isMobileMenuOpen);
        nav.classList.toggle('mobile-active', this.state.isMobileMenuOpen);
        document.body.style.overflow = this.state.isMobileMenuOpen ? 'hidden' : '';
        this.playSound('click');
    }
    
    /**
     * Close the mobile menu if it is currently open.
     */
    closeMobileMenuIfOpen() {
        if (this.state.isMobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    /**
     * Initialize all scroll-related functionalities.
     */
    initializeScrollSystem() {
        this.initializeScrollAnimations();
        this.initializeScrollToTop();
        this.initializeScrollProgress();
    }
    
    /**
     * Set up IntersectionObserver for scroll-triggered animations.
     */
    initializeScrollAnimations() {
        const sections = document.querySelectorAll('.content-section');
        if (this.features.intersectionObserver) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        this.triggerSectionSpecificAnimations(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -150px 0px', threshold: 0.1 });
            
            sections.forEach(section => observer.observe(section));
        }
    }
    
    /**
     * Initialize the scroll-to-top button.
     */
    initializeScrollToTop() {
        const scrollBtn = document.getElementById('scrollToTop');
        if (!scrollBtn) return;
        
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.playSound('click');
        });
        
        window.addEventListener('scroll', () => {
            scrollBtn.classList.toggle('visible', window.scrollY > 400);
        });
    }

    /**
     * Initialize the scroll progress bar at the top of the page.
     */
    initializeScrollProgress() {
        const progressBar = document.querySelector('.scroll-progress-bar');
        if (!progressBar) return;
        
        const updateProgress = () => {
            const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (window.scrollY / scrollTotal) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        };
        
        window.addEventListener('scroll', updateProgress);
    }

    /**
     * Trigger animations specific to the section being viewed.
     */
    triggerSectionSpecificAnimations(section) {
        const sectionId = section.id;
        switch(sectionId) {
            case 'hero':
                this.animateHeroSection();
                break;
            case 'about':
                this.animateStaggeredChildren(section, '.timeline-item, .skill-category');
                break;
            case 'experience':
                this.animateStaggeredChildren(section, '.experience-item');
                break;
            case 'projects':
                this.animateStaggeredChildren(section, '.project-card');
                break;
            case 'research':
                this.animateStaggeredChildren(section, '.research-card, .cert-category');
                break;
            case 'contact':
                this.animateContactSection();
                break;
        }
    }

    /**
     * Animate hero section elements.
     */
    animateHeroSection() {
        this.animateStaggeredChildren(document.getElementById('hero'), '.hero-greeting, .title-line, .hero-subtitle, .stat-item, .hero-actions a');
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(el => this.animateCounter(el));
    }
    
    /**
     * Animate contact section elements.
     */
    animateContactSection() {
        this.animateStaggeredChildren(document.getElementById('contact'), '.contact-text > *, .contact-item, .social-link');
    }
    
    /**
     * A utility to animate elements in a staggered sequence.
     */
    animateStaggeredChildren(parent, selector, delay = 100) {
        const elements = parent.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.style.transitionDelay = `${index * delay}ms`;
        });
    }

    /**
     * Animate a number counter from 0 to its target value.
     */
    animateCounter(element) {
        const targetText = element.textContent;
        const target = parseInt(targetText.replace('+', ''));
        if (isNaN(target)) return;

        let current = 0;
        const increment = target / 100;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current) + (targetText.includes('+') ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = targetText;
            }
        };
        updateCounter();
    }
    
    /**
     * Initialize the audio system for UI sounds.
     */
    initializeSoundSystem() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.sounds = {
                click: { freq: 440, dur: 0.05, type: 'sine' },
                hover: { freq: 880, dur: 0.03, type: 'triangle' },
            };
        } catch (e) {
            console.warn('Web Audio API is not supported in this browser.');
            this.audioContext = null;
        }

        const soundBtn = document.getElementById('soundToggle');
        if(soundBtn) {
            const savedState = localStorage.getItem('soundEnabled') === 'false';
            this.state.soundEnabled = !savedState;
            this.updateSoundIcon();
            soundBtn.addEventListener('click', () => this.toggleSound());
        }
    }

    /**
     * Play a UI sound effect.
     */
    playSound(soundName) {
        if (!this.state.soundEnabled || !this.audioContext || !this.sounds[soundName]) return;

        const sound = this.sounds[soundName];
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = sound.type;
        oscillator.frequency.setValueAtTime(sound.freq, this.audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + sound.dur);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + sound.dur);
    }
    
    /**
     * Toggle sound on and off.
     */
    toggleSound() {
        this.state.soundEnabled = !this.state.soundEnabled;
        localStorage.setItem('soundEnabled', this.state.soundEnabled);
        this.updateSoundIcon();
        if (this.state.soundEnabled) this.playSound('click');
    }
    
    /**
     * Update the sound toggle button's icon.
     */
    updateSoundIcon() {
        const soundBtn = document.getElementById('soundToggle');
        if(soundBtn) {
            const icon = soundBtn.querySelector('i');
            icon.className = this.state.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
        }
    }
    
    /**
     * Initialize the theme toggle for light/dark mode.
     */
    initializeThemeToggle() {
        const themeBtn = document.getElementById('themeToggle');
        if (!themeBtn) return;
        
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme);

        themeBtn.addEventListener('click', () => {
            const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
            this.playSound('click');
        });
    }
    
    /**
     * Set the color theme for the website.
     */
    setTheme(theme) {
        this.state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            const icon = themeBtn.querySelector('i');
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    /**
     * Initialize all floating control buttons.
     */
    initializeFloatingControls() {
        const buttons = document.querySelectorAll('.theme-btn, .sound-btn, .scroll-btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => this.playSound('hover'));
        });
    }

    /**
     * Handle keydown events for accessibility.
     */
    handleKeydown(e) {
        if (e.key === 'Escape' && this.state.isMobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    /**
     * Handle scroll events for header effects.
     */
    handleScroll() {
        const header = document.querySelector('.premium-header');
        if (!header) return;
        
        const currentScrollY = window.scrollY;
        
        header.classList.toggle('scrolled', currentScrollY > 50);
        
        if (currentScrollY > this.state.lastScrollY && currentScrollY > 200) {
            header.classList.add('hidden'); // Hide on scroll down
        } else {
            header.classList.remove('hidden'); // Show on scroll up
        }
        
        this.state.lastScrollY = currentScrollY;
    }
    
    /**
     * Handle window resize events.
     */
    handleResize() {
        if (window.innerWidth > 768 && this.state.isMobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }
    
    /**
     * Initialize enhanced accessibility features.
     */
    initializeAccessibility() {
        // Add focus-visible polyfill-like behavior
        document.addEventListener('focusin', (e) => e.target.classList.add('focus-visible'));
        document.addEventListener('focusout', (e) => e.target.classList.remove('focus-visible'));
    }

    /**
     * Utility to delay execution.
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Debounce utility to limit function execution rate.
     */
    debounce(func, wait) {
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
    
    /**
     * Fallback mode for browsers that fail initialization.
     */
    initializeFallbackMode() {
        console.warn("Running in fallback mode due to initialization error.");
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.style.display = 'none';
        document.body.style.overflow = 'visible';
    }
}

// Initialize the portfolio script once the DOM is ready.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new SemiconductorPortfolio());
} else {
    new SemiconductorPortfolio();
}
