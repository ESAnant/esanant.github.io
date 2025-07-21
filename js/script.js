// ===========================================
// Global Variables & Configuration
// ===========================================
let currentSection = 0;
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-item');
let isScrolling = false;
let animationFrameId = null;

// Typing animation texts
const typingTexts = [
    "Hardware Design Engineer",
    "FPGA Developer",
    "RTL Design Specialist",
    "Embedded Systems Engineer",
    "Digital Logic Designer"
];

// ===========================================
// Loading Animation
// ===========================================
class LoadingAnimation {
    constructor() {
        this.loader = document.getElementById('loader');
        this.stages = document.querySelectorAll('.synthesis-stage');
        this.progressBar = document.querySelector('.progress-bar');
        this.currentStage = 0;
        this.init();
    }

    init() {
        this.startSynthesisAnimation();
    }

    startSynthesisAnimation() {
        const stageDelay = 600;
        
        this.stages.forEach((stage, index) => {
            setTimeout(() => {
                stage.classList.add('active');
                if (index === this.stages.length - 1) {
                    setTimeout(() => this.hideLoader(), 800);
                }
            }, index * stageDelay);
        });
    }

    hideLoader() {
        this.loader.classList.add('fade-out');
        setTimeout(() => {
            this.loader.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.initMainAnimations();
        }, 500);
    }

    initMainAnimations() {
        // Start hero typing animation
        new TypingAnimation();
        
        // Initialize scroll animations
        new ScrollAnimations();
        
        // Initialize circuit background
        new CircuitBackground();
        
        // Initialize navigation
        new Navigation();
        
        // Initialize interactive cards
        new InteractiveCards();
        
        // Initialize skill bars
        new SkillBars();
        
        // Initialize stats counter
        new StatsCounter();
    }
}

// ===========================================
// Typing Animation
// ===========================================
class TypingAnimation {
    constructor() {
        this.typingElement = document.querySelector('.typing-text');
        this.cursor = document.querySelector('.cursor');
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;
        
        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = typingTexts[this.textIndex];
        
        if (this.isDeleting) {
            this.typingElement.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
            
            if (this.charIndex === 0) {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % typingTexts.length;
                setTimeout(() => this.type(), 500);
            } else {
                setTimeout(() => this.type(), this.deleteSpeed);
            }
        } else {
            this.typingElement.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
            
            if (this.charIndex === currentText.length) {
                this.isDeleting = true;
                setTimeout(() => this.type(), this.pauseTime);
            } else {
                setTimeout(() => this.type(), this.typeSpeed);
            }
        }
    }
}

// ===========================================
// Circuit Background Animation
// ===========================================
class CircuitBackground {
    constructor() {
        this.canvas = document.getElementById('circuit-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createParticles();
        this.animate();
        window.addEventListener('resize', () => this.setupCanvas());
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                pulse: Math.random() * Math.PI * 2
            });
        }
    }

    drawParticles() {
        this.particles.forEach(particle => {
            const pulseFactor = Math.sin(particle.pulse) * 0.3 + 0.7;
            
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity * pulseFactor;
            this.ctx.fillStyle = '#B87333';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * pulseFactor, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
            
            particle.pulse += 0.02;
        });
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (120 - distance) / 120 * 0.3;
                    
                    this.ctx.save();
                    this.ctx.globalAlpha = opacity;
                    this.ctx.strokeStyle = '#CD7F32';
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        }
    }

    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }
            
            // Keep particles within bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.updateParticles();
        this.drawConnections();
        this.drawParticles();
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===========================================
// Navigation System
// ===========================================
class Navigation {
    constructor() {
        this.sections = document.querySelectorAll('.section');
        this.navItems = document.querySelectorAll('.nav-item');
        this.currentSection = 0;
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateActiveNav();
    }

    setupEventListeners() {
        // Wheel event for custom scrolling
        window.addEventListener('wheel', (e) => this.handleWheel(e), { passive: false });
        
        // Navigation clicks
        this.navItems.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection(index);
            });
        });

        // Keyboard navigation
        window.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault();
                const direction = e.key === 'ArrowUp' ? -1 : 1;
                const newSection = Math.max(0, Math.min(this.sections.length - 1, this.currentSection + direction));
                this.scrollToSection(newSection);
            }
        });

        // Touch events for mobile
        let touchStartY = 0;
        window.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });

        window.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const deltaY = touchStartY - touchEndY;
            
            if (Math.abs(deltaY) > 50) {
                const direction = deltaY > 0 ? 1 : -1;
                const newSection = Math.max(0, Math.min(this.sections.length - 1, this.currentSection + direction));
                this.scrollToSection(newSection);
            }
        });
    }

    handleWheel(e) {
        e.preventDefault();
        
        if (this.isScrolling) return;
        
        const direction = e.deltaY > 0 ? 1 : -1;
        const newSection = Math.max(0, Math.min(this.sections.length - 1, this.currentSection + direction));
        
        if (newSection !== this.currentSection) {
            this.scrollToSection(newSection);
        }
    }

    scrollToSection(index) {
        if (this.isScrolling || index === this.currentSection) return;
        
        this.isScrolling = true;
        this.currentSection = index;
        
        const targetSection = this.sections[index];
        const targetOffset = targetSection.offsetTop;
        
        this.smoothScrollTo(targetOffset, 1000, () => {
            this.isScrolling = false;
            this.updateActiveNav();
            this.triggerSectionAnimations(index);
        });
    }

    smoothScrollTo(target, duration, callback) {
        const start = window.pageYOffset;
        const distance = target - start;
        const startTime = performance.now();

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeInOutCubic = progress < 0.5 ? 4 * progress * progress * progress : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
            
            window.scrollTo(0, start + distance * easeInOutCubic);
            
            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else if (callback) {
                callback();
            }
        };

        requestAnimationFrame(animateScroll);
    }

    updateActiveNav() {
        this.navItems.forEach((item, index) => {
            item.classList.toggle('active', index === this.currentSection);
        });
    }

    triggerSectionAnimations(sectionIndex) {
        const section = this.sections[sectionIndex];
        const animatedElements = section.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        
        animatedElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100);
        });
    }
}

// ===========================================
// Interactive Cards
// ===========================================
class InteractiveCards {
    constructor() {
        this.experienceCards = document.querySelectorAll('.experience-card');
        this.projectCards = document.querySelectorAll('.project-card');
        
        this.init();
    }

    init() {
        this.setupCardEvents(this.experienceCards);
        this.setupCardEvents(this.projectCards);
    }

    setupCardEvents(cards) {
        cards.forEach(card => {
            card.addEventListener('click', () => this.flipCard(card));
            card.addEventListener('mouseenter', () => this.hoverCard(card, true));
            card.addEventListener('mouseleave', () => this.hoverCard(card, false));
        });
    }

    flipCard(card) {
        card.classList.toggle('flipped');
        
        // Add a subtle shake effect
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = 'card-flip 0.6s ease-in-out';
        
        setTimeout(() => {
            card.style.animation = '';
        }, 600);
    }

    hoverCard(card, isHovering) {
        const icon = card.querySelector('.project-icon, .cert-icon');
        if (icon) {
            if (isHovering) {
                icon.style.transform = 'scale(1.1) rotate(10deg)';
            } else {
                icon.style.transform = '';
            }
        }
    }
}

// ===========================================
// Skill Bars Animation
// ===========================================
class SkillBars {
    constructor() {
        this.skillItems = document.querySelectorAll('.skill-item');
        this.observer = null;
        
        this.init();
    }

    init() {
        this.createObserver();
        this.skillItems.forEach(item => this.observer.observe(item));
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBar(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
    }

    animateSkillBar(skillItem) {
        const progressBar = skillItem.querySelector('.skill-progress');
        const level = skillItem.getAttribute('data-level');
        
        setTimeout(() => {
            progressBar.style.width = `${level}%`;
        }, 200);
    }
}

// ===========================================
// Stats Counter Animation
// ===========================================
class StatsCounter {
    constructor() {
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.observer = null;
        
        this.init();
    }

    init() {
        this.createObserver();
        this.statNumbers.forEach(stat => this.observer.observe(stat));
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    this.observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, stepTime);
    }
}

// ===========================================
// Scroll Animations
// ===========================================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        this.observer = null;
        
        this.init();
    }

    init() {
        this.createObserver();
        this.elements.forEach(element => {
            this.observer.observe(element);
            // Add stagger class based on position
            const index = Array.from(element.parentNode.children).indexOf(element);
            element.classList.add(`stagger-${Math.min(index + 1, 6)}`);
        });
    }

    createObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    entry.target.classList.remove('visible');
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
    }
}

// ===========================================
// Utility Functions
// ===========================================
class Utils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    static isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    static lerp(start, end, factor) {
        return start + (end - start) * factor;
    }
}

// ===========================================
// Performance Optimization
// ===========================================
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.preloadCriticalResources();
        this.setupIntersectionObservers();
    }

    optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete) {
                img.addEventListener('load', () => {
                    img.classList.add('loaded');
                });
            }
        });
    }

    preloadCriticalResources() {
        const criticalResources = [
            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Fira+Code:wght@300;400;500&display=swap'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = resource;
            document.head.appendChild(link);
        });
    }

    setupIntersectionObservers() {
        // Lazy load non-critical elements
        const lazyElements = document.querySelectorAll('.lazy-load');
        
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    lazyLoadObserver.unobserve(entry.target);
                }
            });
        });

        lazyElements.forEach(element => {
            lazyLoadObserver.observe(element);
        });
    }
}

// ===========================================
// CSS Animation Keyframes (Added via JavaScript)
// ===========================================
const additionalCSS = `
@keyframes card-flip {
    0% { transform: scale(1.05); }
    50% { transform: scale(1.1) rotateY(5deg); }
    100% { transform: scale(1.05); }
}

@keyframes pulse-glow {
    0%, 100% { 
        box-shadow: 0 0 20px rgba(184, 115, 51, 0.3);
        transform: scale(1);
    }
    50% { 
        box-shadow: 0 0 40px rgba(184, 115, 51, 0.6);
        transform: scale(1.05);
    }
}

.pulse-animation {
    animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
}

.float-animation {
    animation: float 3s ease-in-out infinite;
}

@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.shimmer-effect {
    background: linear-gradient(90deg, transparent, rgba(184, 115, 51, 0.3), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s ease-in-out infinite;
}
`;

// ===========================================
// Initialization
// ===========================================
document.addEventListener('DOMContentLoaded', () => {
    // Add additional CSS
    const style = document.createElement('style');
    style.textContent = additionalCSS;
    document.head.appendChild(style);

    // Disable body scroll initially
    document.body.style.overflow = 'hidden';

    // Initialize loading animation
    new LoadingAnimation();
    
    // Initialize performance optimizer
    new PerformanceOptimizer();

    // Add error handling
    window.addEventListener('error', (e) => {
        console.error('Portfolio Error:', e.error);
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash;
        if (hash) {
            const targetSection = document.querySelector(hash);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });

    // Add focus management for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    // Handle reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-medium', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    }
});

// ===========================================
// Export for module usage
// ===========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        LoadingAnimation,
        TypingAnimation,
        CircuitBackground,
        Navigation,
        InteractiveCards,
        SkillBars,
        StatsCounter,
        ScrollAnimations,
        Utils,
        PerformanceOptimizer
    };
}
