document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const TYPING_TEXTS = [
        "Hardware Design Engineer",
        "VLSI Digital Circuit Designer",
        "FPGA Developer",
        "Embedded Systems Engineer"
    ];

    // --- CLASSES ---

    /**
     * Manages the initial loading screen animation.
     */
    class LoadingAnimation {
        constructor() {
            this.loader = document.getElementById('loader');
            this.stages = document.querySelectorAll('.synthesis-stage');
        }

        start() {
            document.body.style.overflow = 'hidden';
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
                document.body.style.overflow = 'auto';
                this.initMainAnimations();
            }, 500);
        }

        initMainAnimations() {
            new TypingAnimation(TYPING_TEXTS).start();
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
            this.textIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
        }

        start() {
            this.type();
        }

        type() {
            const currentText = this.texts[this.textIndex];
            const typeSpeed = 100;
            const deleteSpeed = 50;
            const pauseTime = 2000;
            let typeDelay;

            if (this.isDeleting) {
                this.typingElement.textContent = currentText.substring(0, this.charIndex - 1);
                this.charIndex--;
                typeDelay = deleteSpeed;
            } else {
                this.typingElement.textContent = currentText.substring(0, this.charIndex + 1);
                this.charIndex++;
                typeDelay = typeSpeed;
            }

            if (!this.isDeleting && this.charIndex === currentText.length) {
                typeDelay = pauseTime;
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
            window.addEventListener('resize', () => {
                this.setupCanvas();
                this.createParticles();
            });
        }

        setupCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        createParticles() {
            const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 25000);
            this.particles = [];
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
     * Manages sidebar navigation highlighting on scroll.
     */
    class Navigation {
        init() {
            const sections = document.querySelectorAll('.section');
            const navItems = document.querySelectorAll('.nav-item');
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const sectionId = entry.target.id;
                        navItems.forEach(nav => {
                            nav.classList.toggle('active', nav.dataset.section === sectionId);
                        });
                    }
                });
            }, { threshold: 0.5 });

            sections.forEach(sec => observer.observe(sec));
            
            navItems.forEach(item => {
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
                card.addEventListener('click', () => {
                    card.classList.toggle('flipped');
                });
            });
        }
    }

    /**
     * Animates skill bars when they become visible.
     */
    class SkillBars {
        init() {
            const skillItems = document.querySelectorAll('.skill-item');
            const observer = new IntersectionObserver((entries, observer) => {
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
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.8 });
            statNumbers.forEach(stat => observer.observe(stat));
        }

        animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'), 10);
            let current = 0;
            const duration = 2000;
            const stepTime = Math.abs(Math.floor(duration / target));
            
            const timer = setInterval(() => {
                current += 1;
                element.textContent = current;
                if (current === target) {
                    clearInterval(timer);
                }
            }, stepTime);
        }
    }

    // --- INITIALIZATION ---
    new LoadingAnimation().start();
});
