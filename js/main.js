// Enhanced Portfolio with Snap Navigation and Animations
class EnhancedPortfolio {
    constructor() {
        this.currentSection = 0;
        this.sections = document.querySelectorAll('.snap-section');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.snapContainer = document.getElementById('snapContainer');
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        this.showLoader();
        this.setupParticleBackground();
        this.setupSnapNavigation();
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupEventListeners();
        
        // Hide loader after 3 seconds
        setTimeout(() => {
            this.hideLoader();
            this.revealSections();
        }, 3000);
    }

    showLoader() {
        const loader = document.getElementById('loader');
        document.body.style.overflow = 'hidden';
    }

    hideLoader() {
        const loader = document.getElementById('loader');
        loader.classList.add('fade-out');
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }

    setupParticleBackground() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationId;
        
        // Resize canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        // Create particles
        function createParticles() {
            particles = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 1,
                    speedX: (Math.random() - 0.5) * 0.2,
                    speedY: (Math.random() - 0.5) * 0.2,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        }
        
        // Animate particles
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 136, ${particle.opacity})`;
                ctx.fill();
            });
            
            // Connect nearby particles
            particles.forEach((particleA, indexA) => {
                particles.forEach((particleB, indexB) => {
                    if (indexA !== indexB) {
                        const distance = Math.hypot(particleA.x - particleB.x, particleA.y - particleB.y);
                        if (distance < 100) {
                            ctx.beginPath();
                            ctx.moveTo(particleA.x, particleA.y);
                            ctx.lineTo(particleB.x, particleB.y);
                            ctx.strokeStyle = `rgba(0, 255, 136, ${0.1 * (1 - distance / 100)})`;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                });
            });
            
            animationId = requestAnimationFrame(animateParticles);
        }
        
        resizeCanvas();
        createParticles();
        animateParticles();
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
    }

    setupSnapNavigation() {
        // Snap scroll behavior
        this.snapContainer.addEventListener('scroll', this.throttle(() => {
            this.updateActiveSection();
        }, 100));
        
        // Navigation dots
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.scrollToSection(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                this.scrollToSection(Math.min(this.currentSection + 1, this.sections.length - 1));
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                this.scrollToSection(Math.max(this.currentSection - 1, 0));
            }
        });
        
        // Wheel navigation
        let wheelTimeout;
        this.snapContainer.addEventListener('wheel', (e) => {
            if (this.isScrolling) return;
            
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (e.deltaY > 0 && this.currentSection < this.sections.length - 1) {
                    this.scrollToSection(this.currentSection + 1);
                } else if (e.deltaY < 0 && this.currentSection > 0) {
                    this.scrollToSection(this.currentSection - 1);
                }
            }, 50);
        });
    }

    scrollToSection(index) {
        if (this.isScrolling || index === this.currentSection) return;
        
        this.isScrolling = true;
        this.currentSection = index;
        
        const targetSection = this.sections[index];
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        this.updateNavDots();
        
        setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
    }

    updateActiveSection() {
        const scrollTop = this.snapContainer.scrollTop;
        const sectionHeight = window.innerHeight;
        const newSection = Math.round(scrollTop / sectionHeight);
        
        if (newSection !== this.currentSection && newSection >= 0 && newSection < this.sections.length) {
            this.currentSection = newSection;
            this.updateNavDots();
        }
    }

    updateNavDots() {
        this.navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSection);
        });
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.7 });

        counters.forEach(counter => counterObserver.observe(counter));
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
                clearInterval(timer);
            }
        }, 16);
    }

    setupEventListeners() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                
                // Find section by ID or data-section
                let sectionIndex = -1;
                this.sections.forEach((section, index) => {
                    if (section.id === targetId || section.dataset.section === targetId) {
                        sectionIndex = index;
                    }
                });
                
                // Special handling for contact link
                if (targetId === 'contact') {
                    sectionIndex = this.sections.length - 1;
                }
                
                if (sectionIndex !== -1) {
                    this.scrollToSection(sectionIndex);
                }
            });
        });

        // Enhanced flip card interactions
        this.setupFlipCardInteractions();
    }

    setupFlipCardInteractions() {
        // Skills flip cards
        const skillCards = document.querySelectorAll('.flip-card');
        skillCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });

        // Project flip cards
        const projectCards = document.querySelectorAll('.project-flip-card');
        projectCards.forEach(card => {
            let flipTimeout;
            
            card.addEventListener('mouseenter', () => {
                clearTimeout(flipTimeout);
                card.querySelector('.project-flip-inner').style.transform = 'rotateY(180deg)';
            });
            
            card.addEventListener('mouseleave', () => {
                flipTimeout = setTimeout(() => {
                    card.querySelector('.project-flip-inner').style.transform = 'rotateY(0deg)';
                }, 300);
            });
            
            card.addEventListener('click', () => {
                const inner = card.querySelector('.project-flip-inner');
                const currentTransform = inner.style.transform;
                inner.style.transform = currentTransform.includes('180deg') ? 'rotateY(0deg)' : 'rotateY(180deg)';
            });
        });
    }

    revealSections() {
        // Staggered section reveals
        this.sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('visible');
            }, index * 200);
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

// Performance monitoring
class PerformanceMonitor {
    static init() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Portfolio loaded in ${Math.round(loadTime)}ms`);
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedPortfolio();
    PerformanceMonitor.init();
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio error:', e.error);
});

// Service worker registration for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
