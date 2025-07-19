/* Continue with responsive design... */
/* ===================================
   ULTIMATE SEMICONDUCTOR PORTFOLIO JAVASCRIPT
   Advanced Page Navigation, Cursor Sync & Interactive Systems
   Inspired by Modern UI Libraries with Hardware-Accelerated Performance
   ================================== */

// Global Configuration
const PORTFOLIO_CONFIG = {
    animations: {
        duration: {
            fast: 200,
            medium: 400,
            slow: 800,
            page: 1000
        },
        easing: {
            smooth: 'cubic-bezier(0.23, 1, 0.32, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }
    },
    performance: {
        throttleMs: 16,
        debounceMs: 250,
        intersectionThreshold: 0.1
    },
    features: {
        cursorEffects: true,
        soundEffects: false,
        particleSystem: true,
        parallaxEffects: true
    }
};

// Advanced State Management
class PortfolioState {
    constructor() {
        this.currentPage = 0;
        this.isNavigating = false;
        this.theme = localStorage.getItem('portfolio-theme') || 'dark';
        this.soundEnabled = localStorage.getItem('portfolio-sound') === 'true';
        this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isMobile = window.innerWidth <= 768;
        this.observers = new Map();
        this.animations = new Map();
        this.eventListeners = new Map();
    }

    updatePage(index) {
        this.currentPage = index;
        this.emit('pageChanged', { index });
    }

    setNavigating(state) {
        this.isNavigating = state;
        this.emit('navigationStateChanged', { isNavigating: state });
    }

    emit(event, data) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    }

    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.animations.forEach(animation => animation.cancel());
        this.eventListeners.forEach((listener, element) => {
            element.removeEventListener(listener.event, listener.handler);
        });
    }
}

// Initialize global state
const portfolioState = new PortfolioState();

// ===================================
// QUANTUM PRELOADER SYSTEM
// ===================================

class QuantumPreloader {
    constructor() {
        this.preloader = document.getElementById('quantum-preloader');
        this.progressBar = document.getElementById('quantum-progress');
        this.phaseTexts = document.querySelectorAll('.phase-text');
        this.currentPhase = 0;
        this.progress = 0;
        
        if (this.preloader) {
            this.initialize();
        }
    }

    initialize() {
        this.startLoadingSequence();
        this.simulateSystemBoot();
    }

    startLoadingSequence() {
        const phases = [
            'Initializing Quantum Systems...',
            'Loading Neural Networks...',
            'Compiling VLSI Modules...',
            'Calibrating Hardware...',
            'System Ready'
        ];

        const phaseInterval = setInterval(() => {
            if (this.currentPhase < phases.length - 1) {
                this.updatePhase(this.currentPhase + 1);
            } else {
                clearInterval(phaseInterval);
                setTimeout(() => this.completeLoading(), 500);
            }
        }, 400);
    }

    updatePhase(phaseIndex) {
        // Fade out current phase
        if (this.phaseTexts[this.currentPhase]) {
            this.phaseTexts[this.currentPhase].classList.remove('active');
        }

        // Fade in new phase
        this.currentPhase = phaseIndex;
        if (this.phaseTexts[this.currentPhase]) {
            this.phaseTexts[this.currentPhase].classList.add('active');
        }

        // Update progress
        this.progress = ((phaseIndex + 1) / this.phaseTexts.length) * 100;
        if (this.progressBar) {
            this.progressBar.style.width = `${this.progress}%`;
        }

        // Add audio feedback if enabled
        if (portfolioState.soundEnabled) {
            this.playLoadingSound();
        }
    }

    playLoadingSound() {
        // Create subtle loading sound
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800 + (this.currentPhase * 100), audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
    }

    completeLoading() {
        this.preloader.classList.add('completing');
        
        setTimeout(() => {
            this.preloader.classList.add('hidden');
            document.body.classList.remove('loading');
            
            // Initialize main application
            setTimeout(() => {
                this.preloader.remove();
                portfolioApplication.initialize();
            }, 800);
        }, 600);
    }

    simulateSystemBoot() {
        // Quantum particle animation
        const particles = this.preloader.querySelectorAll('.stream-particle');
        particles.forEach((particle, index) => {
            const delay = parseInt(particle.dataset.delay) || 0;
            particle.style.animationDelay = `${delay}ms`;
        });

        // Neural processor animation
        const processingRings = this.preloader.querySelectorAll('.processing-ring');
        processingRings.forEach((ring, index) => {
            ring.style.animationDelay = `${index * 0.2}s`;
        });
    }
}

// ===================================
// ADVANCED CURSOR SYSTEM
// ===================================

class AdvancedCursor {
    constructor() {
        this.cursor = document.getElementById('advanced-cursor');
        this.cursorDot = this.cursor?.querySelector('.cursor-dot');
        this.cursorRings = this.cursor?.querySelectorAll('.cursor-ring');
        this.cursorCanvas = document.getElementById('cursor-canvas');
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        
        this.trailPoints = [];
        this.maxTrailPoints = 20;
        
        this.isActive = !portfolioState.isMobile && portfolioState.features.cursorEffects;
        
        if (this.isActive && this.cursor) {
            this.initialize();
        }
    }

    initialize() {
        this.setupEventListeners();
        this.initializeCanvas();
        this.startAnimationLoop();
        this.bindInteractiveElements();
    }

    setupEventListeners() {
        const mouseMoveHandler = this.throttle((e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.addTrailPoint(e.clientX, e.clientY);
        }, 16);

        document.addEventListener('mousemove', mouseMoveHandler);
        
        portfolioState.eventListeners.set(document, {
            event: 'mousemove',
            handler: mouseMoveHandler
        });
    }

    initializeCanvas() {
        if (!this.cursorCanvas) return;
        
        this.ctx = this.cursorCanvas.getContext('2d');
        this.cursorCanvas.width = 100;
        this.cursorCanvas.height = 100;
    }

    addTrailPoint(x, y) {
        this.trailPoints.push({ x, y, age: 0 });
        
        if (this.trailPoints.length > this.maxTrailPoints) {
            this.trailPoints.shift();
        }
    }

    updateCursor() {
        // Smooth cursor following with easing
        const ease = 0.18;
        this.cursorX += (this.mouseX - this.cursorX) * ease;
        this.cursorY += (this.mouseY - this.cursorY) * ease;

        if (this.cursor) {
            this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
        }

        // Update trail points
        this.trailPoints = this.trailPoints.map(point => ({
            ...point,
            age: point.age + 1
        })).filter(point => point.age < this.maxTrailPoints);

        // Draw particle effects on canvas
        if (this.ctx) {
            this.drawCursorEffects();
        }
    }

    drawCursorEffects() {
        const canvas = this.cursorCanvas;
        const ctx = this.ctx;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw cursor trail
        this.trailPoints.forEach((point, index) => {
            const opacity = 1 - (point.age / this.maxTrailPoints);
            const size = 2 - (point.age / this.maxTrailPoints);
            
            ctx.beginPath();
            ctx.arc(50, 50, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(212, 151, 76, ${opacity * 0.3})`;
            ctx.fill();
        });
    }

    bindInteractiveElements() {
        const interactiveSelectors = [
            'a', 'button', 'input', 'textarea', 'select',
            '.nav-link', '.social-link', '.cta-primary',
            '.stat-card', '.project-card', '.skill-item',
            '.story-section', '.tech-item', '.nav-dot',
            '[role="button"]', '[tabindex]:not([tabindex="-1"])'
        ];

        const interactiveElements = document.querySelectorAll(interactiveSelectors.join(', '));

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor?.classList.add('hover');
                this.createRippleEffect();
            });

            element.addEventListener('mouseleave', () => {
                this.cursor?.classList.remove('hover');
            });

            element.addEventListener('mousedown', () => {
                this.cursor?.classList.add('click');
                this.createClickEffect();
            });

            element.addEventListener('mouseup', () => {
                this.cursor?.classList.remove('click');
            });
        });

        // Text elements
        const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, li');
        textElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor?.classList.add('text');
            });

            element.addEventListener('mouseleave', () => {
                this.cursor?.classList.remove('text');
            });
        });
    }

    createRippleEffect() {
        const ripple = this.cursor?.querySelector('.ripple-effect');
        if (!ripple) return;

        ripple.style.width = '60px';
        ripple.style.height = '60px';
        ripple.style.opacity = '0.3';

        setTimeout(() => {
            ripple.style.width = '0px';
            ripple.style.height = '0px';
            ripple.style.opacity = '0';
        }, 600);
    }

    createClickEffect() {
        // Create particle burst effect
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: var(--accent-primary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10001;
            `;

            const angle = (i / 8) * Math.PI * 2;
            const distance = 30;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            particle.style.left = `${this.cursorX + x}px`;
            particle.style.top = `${this.cursorY + y}px`;

            document.body.appendChild(particle);

            // Animate particle
            particle.animate([
                { transform: 'scale(0)', opacity: 1 },
                { transform: 'scale(1)', opacity: 0.8, offset: 0.5 },
                { transform: 'scale(0)', opacity: 0 }
            ], {
                duration: 600,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).addEventListener('finish', () => particle.remove());
        }
    }

    startAnimationLoop() {
        const animate = () => {
            this.updateCursor();
            requestAnimationFrame(animate);
        };
        animate();
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// ===================================
// PAGE NAVIGATION SYSTEM
// ===================================

class PageNavigationSystem {
    constructor() {
        this.pages = document.querySelectorAll('.page');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.pageContainer = document.querySelector('.page-container');
        
        this.currentIndex = 0;
        this.isNavigating = false;
        this.touchStartY = 0;
        this.wheelAccumulator = 0;
        this.wheelTimeout = null;
        
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.updateNavigationState(0);
        
        // Initialize first page
        setTimeout(() => {
            this.showPage(0);
        }, 100);
    }

    setupEventListeners() {
        // Wheel navigation with momentum
        this.pageContainer?.addEventListener('wheel', (e) => {
            if (this.isNavigating) return;
            
            e.preventDefault();
            this.handleWheelNavigation(e);
        }, { passive: false });

        // Touch navigation
        this.pageContainer?.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
        }, { passive: true });

        this.pageContainer?.addEventListener('touchend', (e) => {
            if (this.isNavigating) return;
            
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = this.touchStartY - touchEndY;
            
            if (Math.abs(deltaY) > 50) {
                const direction = deltaY > 0 ? 1 : -1;
                this.navigateToPage(this.currentIndex + direction);
            }
        }, { passive: true });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isNavigating) return;
            
            let targetIndex = this.currentIndex;
            
            switch(e.key) {
                case 'ArrowDown':
                case 'PageDown':
                case ' ':
                    e.preventDefault();
                    targetIndex = Math.min(this.pages.length - 1, this.currentIndex + 1);
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    targetIndex = Math.max(0, this.currentIndex - 1);
                    break;
                case 'Home':
                    e.preventDefault();
                    targetIndex = 0;
                    break;
                case 'End':
                    e.preventDefault();
                    targetIndex = this.pages.length - 1;
                    break;
            }
            
            if (targetIndex !== this.currentIndex) {
                this.navigateToPage(targetIndex);
            }
        });

        // Navigation link handlers
        this.navLinks.forEach((link, index) => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToPage(index);
            });
        });

        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.navigateToPage(index);
            });
        });
    }

    handleWheelNavigation(e) {
        this.wheelAccumulator += e.deltaY;
        
        if (this.wheelTimeout) {
            clearTimeout(this.wheelTimeout);
        }
        
        this.wheelTimeout = setTimeout(() => {
            if (Math.abs(this.wheelAccumulator) > 100) {
                const direction = this.wheelAccumulator > 0 ? 1 : -1;
                const targetIndex = Math.max(0, Math.min(this.pages.length - 1, this.currentIndex + direction));
                this.navigateToPage(targetIndex);
            }
            this.wheelAccumulator = 0;
        }, 50);
    }

    navigateToPage(targetIndex) {
        if (this.isNavigating || targetIndex === this.currentIndex || !this.pages[targetIndex]) {
            return;
        }

        this.isNavigating = true;
        portfolioState.setNavigating(true);

        // Calculate scroll position
        const scrollTop = targetIndex * window.innerHeight;
        
        // Smooth scroll to target
        this.pageContainer.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
        });

        // Update states
        this.currentIndex = targetIndex;
        this.updateNavigationState(targetIndex);
        portfolioState.updatePage(targetIndex);

        // Show page content
        this.showPage(targetIndex);

        // Reset navigation lock
        setTimeout(() => {
            this.isNavigating = false;
            portfolioState.setNavigating(false);
        }, 1000);
    }

    updateNavigationState(activeIndex) {
        // Update navigation links
        this.navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === activeIndex);
        });

        // Update progress dots
        this.navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });

        // Update progress line
        const progressLine = document.querySelector('.nav-progress-line');
        if (progressLine) {
            const progressPercent = ((activeIndex + 1) / this.pages.length) * 100;
            progressLine.style.height = `${progressPercent}%`;
        }
    }

    showPage(index) {
        this.pages.forEach((page, pageIndex) => {
            page.classList.toggle('active', pageIndex === index);
            
            if (pageIndex === index) {
                setTimeout(() => {
                    page.classList.add('visible');
                    this.triggerPageAnimations(page);
                }, 100);
            } else {
                page.classList.remove('visible');
            }
        });
    }

    triggerPageAnimations(page) {
        const pageId = page.getAttribute('id');
        const animationClass = 'animate-in';
        
        // Staggered animations for page elements
        const animatableElements = page.querySelectorAll(
            '.page-header, .story-section, .stat-card, .project-card, ' +
            '.skill-item, .experience-card, .tech-cluster, .contact-btn'
        );

        animatableElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add(animationClass);
            }, index * 100);
        });

        // Page-specific animations
        switch(pageId) {
            case 'home':
                this.animateHeroElements(page);
                break;
            case 'expertise':
                this.animateSkillBars(page);
                break;
            case 'innovations':
                this.animateProjectMetrics(page);
                break;
        }
    }

    animateHeroElements(page) {
        const statsNumbers = page.querySelectorAll('.stat-number');
        
        statsNumbers.forEach((stat, index) => {
            const target = parseInt(stat.dataset.target) || parseInt(stat.textContent);
            const hasPlus = stat.textContent.includes('+');
            
            setTimeout(() => {
                this.animateCounter(stat, target, hasPlus);
            }, 800 + (index * 200));
        });
    }

    animateCounter(element, target, hasPlus = false) {
        let current = 0;
        const increment = target / 30;
        const suffix = hasPlus ? '+' : '';
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                element.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + suffix;
            }
        };
        
        updateCounter();
    }

    animateSkillBars(page) {
        const skillBars = page.querySelectorAll('.level-bar');
        
        skillBars.forEach((bar, index) => {
            const level = bar.style.getPropertyValue('--level') || '0%';
            
            setTimeout(() => {
                bar.style.width = level;
                bar.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
            }, index * 150);
        });
    }

    animateProjectMetrics(page) {
        const metrics = page.querySelectorAll('.metric-value');
        
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                metric.style.transform = 'scale(1.1)';
                metric.style.color = 'var(--accent-gold)';
                
                setTimeout(() => {
                    metric.style.transform = 'scale(1)';
                }, 200);
            }, index * 300);
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    const pageIndex = Array.from(this.pages).indexOf(entry.target);
                    if (pageIndex !== this.currentIndex && !this.isNavigating) {
                        this.currentIndex = pageIndex;
                        this.updateNavigationState(pageIndex);
                        portfolioState.updatePage(pageIndex);
                    }
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-10% 0px -10% 0px'
        });

        this.pages.forEach(page => observer.observe(page));
        portfolioState.observers.set('pageNavigation', observer);
    }
}

// Continue with the remaining JavaScript sections...

/* ===================================
   THEME SYSTEM & BACKGROUND EFFECTS
   Advanced Color Management and Dynamic Environments
   ================================== */

// Advanced Theme Management System
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
        this.transitionDuration = 300;
        this.observers = new Set();
        this.initialize();
    }

    initialize() {
        this.applyTheme(this.currentTheme, false);
        this.setupThemeToggle();
        this.setupSystemThemeDetection();
        this.setupThemeTransitions();
    }

    applyTheme(theme, animate = true) {
        const root = document.documentElement;
        
        if (animate) {
            root.style.transition = `all ${this.transitionDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`;
        }

        // Apply theme with smooth transition
        requestAnimationFrame(() => {
            root.setAttribute('data-theme', theme);
            this.currentTheme = theme;
            localStorage.setItem('portfolio-theme', theme);
            
            // Update theme-dependent elements
            this.updateThemeElements(theme);
            
            // Notify observers
            this.notifyObservers(theme);
            
            if (animate) {
                setTimeout(() => {
                    root.style.transition = '';
                }, this.transitionDuration);
            }
        });
    }

    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', (e) => {
            const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            
            // Create ripple effect
            this.createThemeRipple(e, themeToggle);
            
            // Apply new theme
            setTimeout(() => {
                this.applyTheme(newTheme);
            }, 100);
        });
    }

    createThemeRipple(event, element) {
        const rect = element.getBoundingClientRect();
        const ripple = document.createElement('div');
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: var(--accent-primary);
            border-radius: 50%;
            transform: scale(0);
            opacity: 0.3;
            pointer-events: none;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease;
            z-index: 0;
        `;

        element.style.position = 'relative';
        element.appendChild(ripple);

        requestAnimationFrame(() => {
            ripple.style.transform = 'scale(2)';
            ripple.style.opacity = '0';
            
            setTimeout(() => ripple.remove(), 600);
        });
    }

    setupSystemThemeDetection() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const handleSystemThemeChange = (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        portfolioState.eventListeners.set(mediaQuery, {
            event: 'change',
            handler: handleSystemThemeChange
        });
    }

    setupThemeTransitions() {
        // Advanced page transition effects
        const pages = document.querySelectorAll('.page');
        
        pages.forEach(page => {
            page.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        });
    }

    updateThemeElements(theme) {
        // Update theme toggle icon
        const themeIcon = document.querySelector('.theme-toggle i');
        if (themeIcon) {
            themeIcon.style.transform = 'rotate(180deg) scale(0.8)';
            
            setTimeout(() => {
                themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
                themeIcon.style.transform = 'rotate(0deg) scale(1)';
            }, 150);
        }

        // Update particle colors
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.transition = 'background-color 0.3s ease, box-shadow 0.3s ease';
        });

        // Update circuit colors
        const circuitElements = document.querySelectorAll('.flow-line, .circuit-node');
        circuitElements.forEach(element => {
            element.style.transition = 'stroke 0.3s ease, fill 0.3s ease';
        });
    }

    subscribe(observer) {
        this.observers.add(observer);
    }

    unsubscribe(observer) {
        this.observers.delete(observer);
    }

    notifyObservers(theme) {
        this.observers.forEach(observer => {
            if (typeof observer === 'function') {
                observer(theme);
            }
        });
    }
}

// Dynamic Background Effects System
class BackgroundEffectsManager {
    constructor() {
        this.particles = [];
        this.circuitNodes = [];
        this.animationId = null;
        this.mouseX = 0.5;
        this.mouseY = 0.5;
        this.isVisible = true;
        this.performance = this.detectPerformanceLevel();
        
        this.initialize();
    }

    initialize() {
        if (portfolioState.reducedMotion) {
            console.log('Reduced motion detected, skipping background effects');
            return;
        }

        this.setupParticles();
        this.setupCircuitAnimation();
        this.setupMouseTracking();
        this.setupVisibilityHandler();
        this.startAnimation();
    }

    detectPerformanceLevel() {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        
        if (!gl) return 'low';
        
        const renderer = gl.getParameter(gl.RENDERER);
        const vendor = gl.getParameter(gl.VENDOR);
        
        // Simple performance detection based on GPU info
        if (renderer.includes('Intel') && !renderer.includes('Iris')) {
            return 'medium';
        }
        
        return navigator.hardwareConcurrency > 4 ? 'high' : 'medium';
    }

    setupParticles() {
        const particleContainer = document.querySelector('.quantum-particles');
        if (!particleContainer) return;

        const particleCount = this.performance === 'high' ? 20 : 
                            this.performance === 'medium' ? 12 : 8;

        // Create particle system
        for (let i = 0; i < particleCount; i++) {
            const particle = this.createParticle(i);
            this.particles.push(particle);
            particleContainer.appendChild(particle.element);
        }
    }

    createParticle(index) {
        const types = ['quantum-bit', 'data-packet', 'energy-spark', 'memory-cell'];
        const type = types[index % types.length];
        
        const element = document.createElement('div');
        element.className = `particle ${type}`;
        
        const particle = {
            element,
            x: Math.random() * 100,
            y: Math.random() * 100,
            vx: (Math.random() - 0.5) * 0.1,
            vy: (Math.random() - 0.5) * 0.1,
            life: Math.random() * 100,
            maxLife: 100 + Math.random() * 200,
            size: 2 + Math.random() * 4,
            opacity: 0.3 + Math.random() * 0.4,
            type
        };

        this.updateParticleStyle(particle);
        return particle;
    }

    updateParticleStyle(particle) {
        const { element, x, y, size, opacity } = particle;
        
        element.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            opacity: ${opacity};
            border-radius: 50%;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
    }

    setupCircuitAnimation() {
        this.circuitNodes = document.querySelectorAll('.circuit-node');
        this.circuitLines = document.querySelectorAll('.flow-line');
        
        this.circuitNodes.forEach((node, index) => {
            node.style.animationDelay = `${index * 0.3}s`;
        });
    }

    setupMouseTracking() {
        const throttledMouseMove = this.throttle((e) => {
            this.mouseX = e.clientX / window.innerWidth;
            this.mouseY = e.clientY / window.innerHeight;
            
            this.updateMouseEffects();
        }, 16);

        document.addEventListener('mousemove', throttledMouseMove);
        
        portfolioState.eventListeners.set(document, {
            event: 'mousemove',
            handler: throttledMouseMove
        });
    }

    updateMouseEffects() {
        // Update CSS custom properties for mouse-based effects
        document.documentElement.style.setProperty('--mouse-x', `${this.mouseX * 100}%`);
        document.documentElement.style.setProperty('--mouse-y', `${this.mouseY * 100}%`);

        // Update particle attraction
        this.particles.forEach(particle => {
            const dx = (this.mouseX * 100) - particle.x;
            const dy = (this.mouseY * 100) - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 20) {
                const force = (20 - distance) / 20 * 0.01;
                particle.vx += dx * force;
                particle.vy += dy * force;
            }
        });

        // Update circuit node glow
        this.circuitNodes.forEach(node => {
            const rect = node.getBoundingClientRect();
            const nodeX = (rect.left + rect.width / 2) / window.innerWidth;
            const nodeY = (rect.top + rect.height / 2) / window.innerHeight;
            
            const distance = Math.sqrt(
                Math.pow(this.mouseX - nodeX, 2) + 
                Math.pow(this.mouseY - nodeY, 2)
            );
            
            const intensity = Math.max(0.3, Math.min(1, 1 - distance * 2));
            node.style.opacity = intensity;
            node.style.filter = `drop-shadow(0 0 ${intensity * 8}px var(--accent-primary))`;
        });
    }

    setupVisibilityHandler() {
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
            
            if (this.isVisible) {
                this.startAnimation();
            } else {
                this.stopAnimation();
            }
        });
    }

    startAnimation() {
        if (this.animationId) return;
        
        const animate = (timestamp) => {
            if (!this.isVisible) return;
            
            this.updateParticles(timestamp);
            this.updateCircuitFlow(timestamp);
            
            this.animationId = requestAnimationFrame(animate);
        };
        
        this.animationId = requestAnimationFrame(animate);
    }

    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    updateParticles(timestamp) {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < -5) particle.x = 105;
            if (particle.x > 105) particle.x = -5;
            if (particle.y < -5) particle.y = 105;
            if (particle.y > 105) particle.y = -5;
            
            // Update life cycle
            particle.life += 1;
            if (particle.life > particle.maxLife) {
                particle.life = 0;
                particle.x = Math.random() * 100;
                particle.y = Math.random() * 100;
            }
            
            // Update opacity based on life
            const lifeCycle = particle.life / particle.maxLife;
            particle.opacity = 0.3 + Math.sin(lifeCycle * Math.PI) * 0.4;
            
            // Apply friction
            particle.vx *= 0.995;
            particle.vy *= 0.995;
            
            // Update DOM
            this.updateParticleStyle(particle);
        });
    }

    updateCircuitFlow(timestamp) {
        const scrollPercent = window.scrollY / 
            Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        
        this.circuitLines.forEach((line, index) => {
            const offset = (timestamp * 0.001 + index * 0.5) % 2;
            const dashOffset = 1000 - (offset * 1000);
            line.style.strokeDashoffset = dashOffset;
            line.style.opacity = 0.3 + Math.sin(offset * Math.PI) * 0.3;
        });
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    destroy() {
        this.stopAnimation();
        this.particles.forEach(particle => particle.element.remove());
        this.particles = [];
    }
}

// Performance Monitor & Optimization
class PerformanceManager {
    constructor() {
        this.metrics = {
            fps: 0,
            frameCount: 0,
            lastTime: performance.now(),
            memoryUsage: 0,
            renderTime: 0
        };
        
        this.thresholds = {
            minFPS: 45,
            maxMemory: 100 * 1024 * 1024, // 100MB
            maxRenderTime: 16.67 // 60fps = 16.67ms per frame
        };
        
        this.optimizations = new Set();
        this.initialize();
    }

    initialize() {
        this.startMonitoring();
        this.setupOptimizations();
        this.setupDebugInterface();
    }

    startMonitoring() {
        const monitor = () => {
            const currentTime = performance.now();
            this.metrics.frameCount++;
            
            // Calculate FPS
            if (currentTime >= this.metrics.lastTime + 1000) {
                this.metrics.fps = this.metrics.frameCount;
                this.metrics.frameCount = 0;
                this.metrics.lastTime = currentTime;
                
                // Check performance and apply optimizations
                this.checkPerformance();
            }
            
            requestAnimationFrame(monitor);
        };
        
        requestAnimationFrame(monitor);
    }

    checkPerformance() {
        const { fps } = this.metrics;
        
        if (fps < this.thresholds.minFPS && !this.optimizations.has('reduced-particles')) {
            this.applyOptimization('reduced-particles');
        }
        
        if (fps < 30 && !this.optimizations.has('minimal-effects')) {
            this.applyOptimization('minimal-effects');
        }
        
        // Check memory usage if available
        if (performance.memory) {
            this.metrics.memoryUsage = performance.memory.usedJSHeapSize;
            
            if (this.metrics.memoryUsage > this.thresholds.maxMemory) {
                this.applyOptimization('memory-cleanup');
            }
        }
    }

    applyOptimization(type) {
        if (this.optimizations.has(type)) return;
        
        this.optimizations.add(type);
        console.log(`🔧 Applying performance optimization: ${type}`);
        
        switch (type) {
            case 'reduced-particles':
                this.reduceParticles();
                break;
            case 'minimal-effects':
                this.minimizeEffects();
                break;
            case 'memory-cleanup':
                this.cleanupMemory();
                break;
        }
    }

    reduceParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index % 2 === 0) {
                particle.style.display = 'none';
            }
        });
    }

    minimizeEffects() {
        const effects = document.querySelectorAll('.quantum-waves, .depth-layer');
        effects.forEach(effect => {
            effect.style.opacity = '0.3';
            effect.style.animation = 'none';
        });
    }

    cleanupMemory() {
        // Force garbage collection if available
        if (window.gc) {
            window.gc();
        }
        
        // Clear cached animations
        portfolioState.animations.forEach(animation => {
            animation.cancel();
        });
        portfolioState.animations.clear();
    }

    setupOptimizations() {
        // Intersection Observer for off-screen elements
        const offscreenObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                if (entry.isIntersecting) {
                    element.classList.add('visible');
                    element.style.willChange = 'transform, opacity';
                } else {
                    element.classList.remove('visible');
                    element.style.willChange = 'auto';
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        // Observe performance-critical elements
        document.querySelectorAll('.particle, .circuit-node, .wave').forEach(element => {
            offscreenObserver.observe(element);
        });

        portfolioState.observers.set('performance', offscreenObserver);
    }

    setupDebugInterface() {
        if (window.location.hostname !== 'localhost' && 
            window.location.hostname !== '127.0.0.1') {
            return;
        }

        // Create debug panel
        const debugPanel = document.createElement('div');
        debugPanel.id = 'debug-panel';
        debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 10px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10001;
            max-width: 200px;
        `;
        
        document.body.appendChild(debugPanel);
        
        // Update debug info
        setInterval(() => {
            const memory = performance.memory ? 
                `${(performance.memory.usedJSHeapSize / 1048576).toFixed(1)}MB` : 'N/A';
            
            debugPanel.innerHTML = `
                <div>FPS: ${this.metrics.fps}</div>
                <div>Memory: ${memory}</div>
                <div>Optimizations: ${this.optimizations.size}</div>
                <div>Observers: ${portfolioState.observers.size}</div>
            `;
        }, 1000);
    }

    getStats() {
        return {
            ...this.metrics,
            optimizations: Array.from(this.optimizations),
            observers: portfolioState.observers.size
        };
    }
}

// Responsive Handler System
class ResponsiveManager {
    constructor() {
        this.breakpoints = {
            mobile: 768,
            tablet: 1024,
            desktop: 1200
        };
        
        this.currentBreakpoint = this.getCurrentBreakpoint();
        this.initialize();
    }

    initialize() {
        this.setupResizeHandler();
        this.setupOrientationHandler();
        this.applyResponsiveOptimizations();
    }

    getCurrentBreakpoint() {
        const width = window.innerWidth;
        
        if (width <= this.breakpoints.mobile) return 'mobile';
        if (width <= this.breakpoints.tablet) return 'tablet';
        return 'desktop';
    }

    setupResizeHandler() {
        let resizeTimeout;
        
        const handleResize = () => {
            if (resizeTimeout) clearTimeout(resizeTimeout);
            
            resizeTimeout = setTimeout(() => {
                const newBreakpoint = this.getCurrentBreakpoint();
                
                if (newBreakpoint !== this.currentBreakpoint) {
                    this.onBreakpointChange(newBreakpoint, this.currentBreakpoint);
                    this.currentBreakpoint = newBreakpoint;
                }
                
                this.updateLayout();
            }, 250);
        };

        window.addEventListener('resize', handleResize);
        
        portfolioState.eventListeners.set(window, {
            event: 'resize',
            handler: handleResize
        });
    }

    setupOrientationHandler() {
        const handleOrientationChange = () => {
            setTimeout(() => {
                this.updateLayout();
                this.recalculateViewport();
            }, 100);
        };

        window.addEventListener('orientationchange', handleOrientationChange);
        
        portfolioState.eventListeners.set(window, {
            event: 'orientationchange',
            handler: handleOrientationChange
        });
    }

    onBreakpointChange(newBreakpoint, oldBreakpoint) {
        console.log(`📱 Breakpoint changed: ${oldBreakpoint} → ${newBreakpoint}`);
        
        // Update cursor visibility
        const cursor = document.getElementById('cursor');
        if (cursor) {
            cursor.style.display = newBreakpoint === 'mobile' ? 'none' : 'block';
        }
        
        // Update navigation behavior
        if (newBreakpoint === 'mobile') {
            this.enableMobileNavigation();
        } else {
            this.disableMobileNavigation();
        }
        
        // Dispatch breakpoint change event
        document.dispatchEvent(new CustomEvent('breakpointChange', {
            detail: { newBreakpoint, oldBreakpoint }
        }));
    }

    enableMobileNavigation() {
        document.body.style.cursor = 'auto';
        
        // Reduce particle count on mobile
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 5) {
                particle.style.display = 'none';
            }
        });
    }

    disableMobileNavigation() {
        document.body.style.cursor = 'none';
        
        // Restore particle count
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.display = 'block';
        });
    }

    updateLayout() {
        // Update CSS custom properties
        document.documentElement.style.setProperty('--viewport-width', `${window.innerWidth}px`);
        document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
        
        // Update page container height
        const pageContainer = document.querySelector('.page-container');
        if (pageContainer) {
            pageContainer.style.height = `${window.innerHeight}px`;
        }
    }

    recalculateViewport() {
        // Fix mobile viewport height issues
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    applyResponsiveOptimizations() {
        const optimizations = {
            mobile: () => {
                // Reduce animations
                document.documentElement.style.setProperty('--animation-duration', '0.2s');
                
                // Simplify background
                const backgroundSystem = document.querySelector('.background-system');
                if (backgroundSystem) {
                    backgroundSystem.style.opacity = '0.3';
                }
            },
            tablet: () => {
                document.documentElement.style.setProperty('--animation-duration', '0.3s');
            },
            desktop: () => {
                document.documentElement.style.setProperty('--animation-duration', '0.4s');
            }
        };

        if (optimizations[this.currentBreakpoint]) {
            optimizations[this.currentBreakpoint]();
        }
    }
}

// Initialize all systems
let themeManager, backgroundManager, performanceManager, responsiveManager;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize managers
    themeManager = new ThemeManager();
    backgroundManager = new BackgroundEffectsManager();
    performanceManager = new PerformanceManager();
    responsiveManager = new ResponsiveManager();
    
    console.log('🎯 All enhanced systems initialized successfully!');
    console.log('⚡ Performance monitoring active');
    console.log('🎨 Theme management ready');
    console.log('🌟 Background effects running');
    console.log('📱 Responsive system active');
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (backgroundManager) backgroundManager.destroy();
    if (portfolioState) portfolioState.cleanup();
    
    console.log('🧹 Portfolio systems cleaned up');
});

// Export for debugging (development only)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.portfolioManagers = {
        theme: themeManager,
        background: backgroundManager,
        performance: performanceManager,
        responsive: responsiveManager,
        state: portfolioState
    };
}

