document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const TYPING_TEXTS = [
        "Hardware Design Engineer",
        "FPGA Developer",
        "RTL Design Specialist",
        "Embedded Systems Engineer",
        "Digital Logic Designer"
    ];

    // --- CLASSES ---

    /**
     * Manages the initial loading screen animation.
     */
    class LoadingAnimation {
        constructor() {
            this.loader = document.getElementById('loader');
            this.stages = document.querySelectorAll('.synthesis-stage');
            this.progressBar = document.querySelector('.progress-bar');
        }

        start() {
            const stageDelay = 600;
            this.stages.forEach((stage, index) => {
                setTimeout(() => {
                    stage.classList.add('active');
                    if (index === this.stages.length - 1) {
                        setTimeout(() => this.hide(), 800);
                    }
                }, index * stageDelay);
            });
        }

        hide() {
            this.loader.classList.add('fade-out');
            setTimeout(() => {
                this.loader.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
                this.initMainAnimations();
            }, 500);
        }

        initMainAnimations() {
            new TypingAnimation(TYPING_TEXTS).start();
            new ScrollAnimations().init();
            new CircuitBackground().init();
            new Navigation().init();
            new InteractiveCards().init();
            new SkillBars().init();
            new StatsCounter().init();
        }
    }

    /**
     * Manages the typing effect in the hero section.
     */
    class TypingAnimation {
        constructor(texts) {
            this.texts = texts;
            this.typingElement = document.querySelector('.typing-text');
            this.cursor = document.querySelector('.cursor');
            this.textIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
            this.typeSpeed = 100;
            this.deleteSpeed = 50;
            this.pauseTime = 2000;
        }

        start() {
            this.type();
        }

        type() {
            const currentText = this.texts[this.textIndex];
            let typeDelay;

            if (this.isDeleting) {
                this.typingElement.textContent = currentText.substring(0, this.charIndex - 1);
                this.charIndex--;
                typeDelay = this.deleteSpeed;
            } else {
                this.typingElement.textContent = currentText.substring(0, this.charIndex + 1);
                this.charIndex++;
                typeDelay = this.typeSpeed;
            }

            if (!this.isDeleting && this.charIndex === currentText.length) {
                typeDelay = this.pauseTime;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                typeDelay = 500;
            }

            setTimeout(() => this.type(), typeDelay);
        }
    }

    /**
     * Manages the animated canvas background.
     */
    class CircuitBackground {
        constructor() {
            this.canvas = document.getElementById('circuit-canvas');
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
        }

        init() {
            if (!this.canvas) return;
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
            this.particles = [];
            const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 20000);
            for (let i = 0; i < particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 2 + 1,
                });
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.updateParticles();
            this.drawConnections();
            this.drawParticles();
            requestAnimationFrame(() => this.animate());
        }
        
        updateParticles() {
            this.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
            });
        }

        drawParticles() {
            this.ctx.fillStyle = 'rgba(184, 115, 51, 0.5)';
            this.particles.forEach(p => {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();
            });
        }

        drawConnections() {
            this.ctx.strokeStyle = 'rgba(205, 127, 50, 0.1)';
            this.ctx.lineWidth = 0.5;
            for (let i = 0; i < this.particles.length; i++) {
                for (let j = i + 1; j < this.particles.length; j++) {
                    const dist = Math.hypot(this.particles[i].x - this.particles[j].x, this.particles[i].y - this.particles[j].y);
                    if (dist < 150) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                        this.ctx.stroke();
                    }
                }
            }
        }
    }

    /**
     * Manages full-page snap scrolling and sidebar navigation.
     */
    class Navigation {
        constructor() {
            this.sections = document.querySelectorAll('.section');
            this.navItems = document.querySelectorAll('.nav-item');
            this.currentSectionIndex = 0;
            this.isScrolling = false;
            this.scrollTimeout = null;
        }

        init() {
            // Update nav on manual scroll
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        this.navItems.forEach(nav => {
                            nav.classList.toggle('active', nav.getAttribute('href') === `#${sectionId}`);
                        });
                    }
                });
            }, { threshold: 0.7 });
            this.sections.forEach(sec => observer.observe(sec));
            
            // Handle nav clicks
            this.navItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = item.getAttribute('href');
                    document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
                });
            });
        }
    }
    
    /**
     * Manages the 3D flipping cards.
     */
    class InteractiveCards {
        init() {
            const cards = document.querySelectorAll('.experience-card, .project-card');
            cards.forEach(card => {
                // Create an inner wrapper for the 3D transform
                const front = card.querySelector('.card-front');
                const back = card.querySelector('.card-back');
                const inner = document.createElement('div');
                inner.className = 'card-inner';
                inner.appendChild(front);
                inner.appendChild(back);
                card.appendChild(inner);
                
                card.addEventListener('click', () => {
                    card.classList.toggle('flipped');
                });
            });
        }
    }

    /**
     * Animates elements into view on scroll.
     */
    class ScrollAnimations {
        init() {
            const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            animatedElements.forEach(el => observer.observe(el));
        }
    }

    /**
     * Animates skill bars when they become visible.
     */
    class SkillBars {
        init() {
            const skillItems = document.querySelectorAll('.skill-item');
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressBar = entry.target.querySelector('.skill-progress');
                        const level = entry.target.getAttribute('data-level');
                        progressBar.style.width = `${level}%`;
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            skillItems.forEach(item => observer.observe(item));
        }
    }

    /**
     * Animates the number counters in the 'About' section.
     */
    class StatsCounter {
        init() {
            const statNumbers = document.querySelectorAll('.stat-number');
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            statNumbers.forEach(stat => observer.observe(stat));
        }

        animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'), 10);
            let current = 0;
            const duration = 2000;
            const stepTime = 20;
            const steps = duration / stepTime;
            const increment = target / steps;
            
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

    // --- INITIALIZATION ---
    document.body.style.overflow = 'hidden'; // Prevent scrolling during load
    const loadingAnimation = new LoadingAnimation();
    loadingAnimation.start();
});
