/**
 * Portfolio Website JavaScript
 * Modern, clean, and efficient implementation
 */

class PortfolioManager {
    constructor() {
        this.config = {
            typingTexts: [
                "Hardware Design Engineer",
                "VLSI Digital Circuit Designer", 
                "FPGA Developer",
                "Embedded Systems Engineer"
            ],
            loaderDuration: 2500,
            particleCount: 80
        };
        
        this.elements = this.initializeElements();
        this.observers = new Map();
        
        this.init();
    }
    
    initializeElements() {
        return {
            loader: document.getElementById('loader'),
            mainContent: document.querySelector('.main-content'),
            canvas: document.getElementById('constellation-canvas'),
            typingText: document.querySelector('.typing-text'),
            heroText: document.querySelector('.hero-text'),
            sections: document.querySelectorAll('.section'),
            navLinks: document.querySelectorAll('.nav-link'),
            animatedElements: document.querySelectorAll('.animate-on-scroll'),
            statNumbers: document.querySelectorAll('.stat-number'),
            experienceCards: document.querySelectorAll('.experience-card'),
            projectCards: document.querySelectorAll('.project-card')
        };
    }
    
    init() {
        this.showLoader();
        
        // Initialize all components after DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.startApplication(), this.config.loaderDuration);
            });
        } else {
            setTimeout(() => this.startApplication(), this.config.loaderDuration);
        }
    }
    
    showLoader() {
        if (!this.elements.loader) return;
        
        document.body.style.overflow = 'hidden';
        this.elements.mainContent.style.overflowY = 'hidden';
    }
    
    hideLoader() {
        if (!this.elements.loader) return;
        
        this.elements.loader.classList.add('fade-out');
        
        setTimeout(() => {
            this.elements.loader.style.display = 'none';
            document.body.style.overflow = '';
            this.elements.mainContent.style.overflowY = 'auto';
        }, 800);
    }
    
    startApplication() {
        this.hideLoader();
        
        // Initialize all components
        this.initializeTypingAnimation();
        this.initializeBackground();
        this.initializeNavigation();
        this.initializeScrollAnimations();
        this.initializeParallax();
        this.initializeCardInteractions();
        this.setupAccessibility();
    }
    
    // Typing Animation
    initializeTypingAnimation() {
        if (!this.elements.typingText) return;
        
        new TypingEffect(this.elements.typingText, this.config.typingTexts);
    }
    
    // Background Animation  
    initializeBackground() {
        if (!this.elements.canvas) return;
        
        new ConstellationBackground(this.elements.canvas, this.config.particleCount);
    }
    
    // Navigation
    initializeNavigation() {
        if (!this.elements.mainContent || !this.elements.navLinks.length) return;
        
        new NavigationManager(this.elements.mainContent, this.elements.sections, this.elements.navLinks);
    }
    
    // Scroll Animations
    initializeScrollAnimations() {
        if (!this.elements.animatedElements.length) return;
        
        new ScrollAnimationManager(this.elements.animatedElements, this.elements.statNumbers);
    }
    
    // Parallax Effect
    initializeParallax() {
        if (!this.elements.heroText) return;
        
        new ParallaxController(this.elements.heroText);
    }
    
    // Card Interactions
    initializeCardInteractions() {
        const allCards = [...this.elements.experienceCards, ...this.elements.projectCards];
        if (!allCards.length) return;
        
        new CardInteractionManager(allCards);
    }
    
    // Accessibility Setup
    setupAccessibility() {
        // Handle reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-fast', '0.01ms');
            document.documentElement.style.setProperty('--transition-medium', '0.01ms');
            document.documentElement.style.setProperty('--transition-slow', '0.01ms');
        }
        
        // Add keyboard navigation for cards
        this.setupKeyboardNavigation();
    }
    
    setupKeyboardNavigation() {
        const allCards = [...this.elements.experienceCards, ...this.elements.projectCards];
        
        allCards.forEach(card => {
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.classList.toggle('flipped');
                }
            });
        });
    }
}

// Typing Effect Component
class TypingEffect {
    constructor(element, texts) {
        this.element = element;
        this.texts = texts;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.start();
    }
    
    start() {
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        const typeSpeed = this.isDeleting ? 50 : 100;
        let nextDelay = typeSpeed;
        
        if (this.isDeleting) {
            this.charIndex = Math.max(0, this.charIndex - 1);
        } else {
            this.charIndex = Math.min(currentText.length, this.charIndex + 1);
        }
        
        this.element.textContent = currentText.substring(0, this.charIndex);
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            nextDelay = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            nextDelay = 500; // Pause before next text
        }
        
        setTimeout(() => this.type(), nextDelay);
    }
}

// Background Animation Component
class ConstellationBackground {
    constructor(canvas, particleCount = 80) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = particleCount;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.createParticles();
        this.animate();
        
        // Handle resize
        this.resizeObserver = new ResizeObserver(() => {
            this.setupCanvas();
            this.createParticles();
        });
        this.resizeObserver.observe(this.canvas);
    }
    
    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                fadeDirection: Math.random() > 0.5 ? 1 : -1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Update opacity
            particle.opacity += particle.fadeDirection * 0.005;
            if (particle.opacity <= 0.1 || particle.opacity >= 0.7) {
                particle.fadeDirection *= -1;
            }
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(184, 115, 51, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }
}

// Navigation Manager
class NavigationManager {
    constructor(mainContent, sections, navLinks) {
        this.mainContent = mainContent;
        this.sections = sections;
        this.navLinks = navLinks;
        
        this.init();
    }
    
    init() {
        this.mainContent.addEventListener('scroll', this.throttle(() => {
            this.updateActiveNavLink();
        }, 16));
        
        // Add click handlers
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }
    
    updateActiveNavLink() {
        const scrollTop = this.mainContent.scrollTop;
        const viewportHeight = this.mainContent.clientHeight;
        
        let currentSection = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop - viewportHeight / 2;
            if (scrollTop >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        this.navLinks.forEach(link => {
            const isActive = link.dataset.section === currentSection;
            link.classList.toggle('active', isActive);
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
}

// Scroll Animation Manager
class ScrollAnimationManager {
    constructor(animatedElements, statNumbers) {
        this.animatedElements = animatedElements;
        this.statNumbers = statNumbers;
        this.animatedCounters = new Set();
        
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    
                    // Handle stat counters
                    const statNumber = entry.target.querySelector('.stat-number');
                    if (statNumber && !this.animatedCounters.has(statNumber)) {
                        this.animateCounter(statNumber);
                        this.animatedCounters.add(statNumber);
                    }
                    
                    this.observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.target, 10);
        if (isNaN(target)) return;
        
        const duration = 1500;
        const frameDuration = 1000 / 60;
        const totalFrames = Math.round(duration / frameDuration);
        const easeOutQuad = t => t * (2 - t);
        
        let frame = 0;
        const counter = setInterval(() => {
            frame++;
            const progress = easeOutQuad(frame / totalFrames);
            const currentNumber = Math.round(target * progress);
            
            element.textContent = currentNumber;
            
            if (frame === totalFrames) {
                clearInterval(counter);
                element.textContent = target;
            }
        }, frameDuration);
    }
}

// Parallax Controller
class ParallaxController {
    constructor(element) {
        this.element = element;
        this.isEnabled = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (this.isEnabled) {
            this.init();
        }
    }
    
    init() {
        document.addEventListener('mousemove', this.throttle((e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const deltaX = (clientX - centerX) / centerX;
            const deltaY = (clientY - centerY) / centerY;
            
            const moveX = deltaX * -30;
            const moveY = deltaY * -15;
            
            this.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }, 16));
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

// Card Interaction Manager
class CardInteractionManager {
    constructor(cards) {
        this.cards = cards;
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            // Mouse events
            card.addEventListener('click', () => {
                this.toggleCard(card);
            });
            
            // Keyboard events
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleCard(card);
                }
            });
            
            // Touch events for mobile
            let touchStartTime;
            card.addEventListener('touchstart', () => {
                touchStartTime = Date.now();
            });
            
            card.addEventListener('touchend', (e) => {
                const touchEndTime = Date.now();
                const touchDuration = touchEndTime - touchStartTime;
                
                // Only trigger on tap (short touch)
                if (touchDuration < 300) {
                    e.preventDefault();
                    this.toggleCard(card);
                }
            });
        });
    }
    
    toggleCard(card) {
        card.classList.toggle('flipped');
    }
}

// Performance Monitoring
class PerformanceMonitor {
    static logLoadTime() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Portfolio loaded in ${Math.round(loadTime)}ms`);
        });
    }
    
    static monitorFPS() {
        let lastTime = performance.now();
        let frame = 0;
        
        function checkFPS() {
            frame++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frame * 1000) / (currentTime - lastTime));
                if (fps < 30) {
                    console.warn(`Low FPS detected: ${fps}`);
                }
                lastTime = currentTime;
                frame = 0;
            }
            
            requestAnimationFrame(checkFPS);
        }
        
        checkFPS();
    }
}

// Error Handling
window.addEventListener('error', (event) => {
    console.error('Portfolio error:', event.error);
    // Could send to error tracking service in production
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// Initialize Application
const portfolio = new PortfolioManager();

// Development helpers
if (process?.env?.NODE_ENV === 'development') {
    PerformanceMonitor.logLoadTime();
    PerformanceMonitor.monitorFPS();
    window.portfolio = portfolio; // For debugging
}
