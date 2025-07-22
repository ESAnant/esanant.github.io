document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const TYPING_TEXTS = [
        "Hardware Design Engineer",
        "VLSI Digital Circuit Designer",
        "FPGA Developer",
        "Embedded Systems Engineer"
    ];

    // --- CLASSES ---

    class SiteOrchestrator {
        constructor() {
            this.loader = document.getElementById('loader');
            this.mainContent = document.querySelector('.main-content');
        }

        init() {
            document.body.style.overflow = 'hidden';
            this.mainContent.style.overflowY = 'hidden';

            setTimeout(() => {
                this.loader.classList.add('fade-out');
                setTimeout(() => {
                    this.loader.style.display = 'none';
                    document.body.style.overflow = '';
                    this.mainContent.style.overflowY = 'scroll';
                    this.startMainAnimations();
                }, 800);
            }, 2500); // Loader duration
        }

        startMainAnimations() {
            new TypingAnimation(TYPING_TEXTS).start();
            new ConstellationBackground().init();
            new Navigation().init();
            new ScrollAnimator().init();
            new HeroParallax().init();
        }
    }

    class TypingAnimation {
        constructor(texts) {
            this.texts = texts;
            this.element = document.querySelector('.typing-text');
            if (!this.element) return;
            this.index = 0;
            this.charIndex = 0;
            this.isDeleting = false;
        }

        start() { this.type(); }

        type() {
            const currentText = this.texts[this.index];
            let delay = this.isDeleting ? 50 : 100;
            if (this.isDeleting) this.charIndex--; else this.charIndex++;
            this.element.textContent = currentText.substring(0, this.charIndex);
            if (!this.isDeleting && this.charIndex === currentText.length) { delay = 2000; this.isDeleting = true; } 
            else if (this.isDeleting && this.charIndex === 0) { this.isDeleting = false; this.index = (this.index + 1) % this.texts.length; delay = 500; }
            setTimeout(() => this.type(), delay);
        }
    }

    class ConstellationBackground {
        constructor() {
            this.canvas = document.getElementById('constellation-canvas');
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
        }

        init() {
            if (!this.canvas) return;
            this.setupCanvas();
            this.createParticles();
            this.animate();
            window.addEventListener('resize', () => { this.setupCanvas(); this.createParticles(); });
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
                    size: Math.random() * 2 + 0.5,
                    opacity: Math.random() * 0.5,
                    vx: (Math.random() - 0.5) * 0.1,
                    vy: (Math.random() - 0.5) * 0.1,
                    fade: 'in'
                });
            }
        }

        animate() {
            if (!this.ctx) return;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;
                
                if (p.fade === 'in') { p.opacity += 0.005; if (p.opacity >= 0.7) p.fade = 'out'; } 
                else { p.opacity -= 0.005; if (p.opacity <= 0.1) p.fade = 'in'; }

                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(184, 115, 51, ${p.opacity})`;
                this.ctx.fill();
            });
            requestAnimationFrame(() => this.animate());
        }
    }

    class Navigation {
        init() {
            const mainContent = document.querySelector('.main-content');
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.nav-link');
            
            mainContent.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - (mainContent.clientHeight / 2);
                    if (mainContent.scrollTop >= sectionTop) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === current);
                });
            });
        }
    }

    class ScrollAnimator {
        init() {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        
                        if (entry.target.classList.contains('stat-item')) {
                            const numberEl = entry.target.querySelector('.stat-number');
                            if (numberEl) this.animateCounter(numberEl);
                        }
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.15 });
            animatedElements.forEach(el => observer.observe(el));
        }

        animateCounter(el) {
            const target = +el.dataset.target;
            if (isNaN(target) || el.textContent !== "0") return;
            let current = 0;
            const duration = 1500;
            const increment = target / (duration / 16);

            const update = () => {
                current += increment;
                if (current < target) {
                    el.textContent = Math.ceil(current);
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target;
                }
            };
            update();
        }
    }

    class HeroParallax {
        init() {
            const heroText = document.querySelector('.hero-text');
            if (!heroText) return;
            document.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * -30;
                const y = (clientY / window.innerHeight - 0.5) * -15;
                heroText.style.transform = `translate(${x}px, ${y}px)`;
            });
        }
    }

    // --- INITIALIZATION ---
    new SiteOrchestrator().init();
});
