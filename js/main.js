// Portfolio App Main Script
class Portfolio {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startLoader();
    }

    init() {
        // Initialize components
        this.nav = new Navigation();
        this.animations = new ScrollAnimations();
        this.counters = new CounterAnimation();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        navToggle?.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    startLoader() {
        const loader = document.getElementById('loader');
        
        // Hide loader after 2.5 seconds
        setTimeout(() => {
            loader.classList.add('fade-out');
            document.body.style.overflow = 'auto';
            
            // Initialize scroll-dependent features after loader
            setTimeout(() => {
                this.animations.observe();
                this.counters.observe();
            }, 500);
        }, 2500);
    }
}

// Navigation Handler
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        this.setupScrollSpy();
        this.setupNavbarScroll();
    }

    setupScrollSpy() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        this.updateActiveNavLink(id);
                    }
                });
            },
            { 
                threshold: 0.6,
                rootMargin: '-80px 0px -20% 0px'
            }
        );

        this.sections.forEach(section => observer.observe(section));
    }

    setupNavbarScroll() {
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            // Add scrolled class for styling
            if (currentScroll > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    updateActiveNavLink(activeId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.fade-in, .experience-card, .project-card, .publication-item');
        this.observer = null;
    }

    observe() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        this.elements.forEach(el => this.observer.observe(el));
    }
}

// Counter Animations
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.observer = null;
    }

    observe() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.7 }
        );

        this.counters.forEach(counter => this.observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                element.classList.add('animate');
                clearInterval(timer);
            }
        }, 16);
    }
}

// Performance Monitoring
class PerformanceMonitor {
    static init() {
        // Log load time
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Portfolio loaded in ${Math.round(loadTime)}ms`);
        });

        // Monitor FPS
        let frames = 0;
        let lastTime = performance.now();

        function checkFPS() {
            frames++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frames * 1000) / (currentTime - lastTime));
                if (fps < 30) {
                    console.warn(`Low FPS: ${fps}`);
                }
                frames = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(checkFPS);
        }
        
        requestAnimationFrame(checkFPS);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    PerformanceMonitor.init();
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Skip to main content with Tab
    if (e.key === 'Tab' && !e.shiftKey && document.activeElement === document.body) {
        const main = document.querySelector('main');
        if (main) {
            main.focus();
            e.preventDefault();
        }
    }
});
