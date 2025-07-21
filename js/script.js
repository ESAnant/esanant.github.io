document.addEventListener('DOMContentLoaded', () => {
    // --- CONFIGURATION ---
    const TYPING_TEXTS = [
        "Hardware Design Engineer",
        "VLSI Digital Circuit Designer",
        "FPGA Developer",
        "Embedded Systems Engineer"
    ];

    // --- CLASSES ---

    class LoadingAnimation {
        constructor() {
            this.loader = document.getElementById('loader');
        }

        start() {
            document.body.style.overflow = 'hidden';
            setTimeout(() => this.hide(), 2500); // Hide after a fixed duration
        }

        hide() {
            this.loader.classList.add('fade-out');
            setTimeout(() => {
                this.loader.style.display = 'none';
                document.body.style.overflow = '';
                this.initMainAnimations();
            }, 800);
        }
        
        initMainAnimations() {
            new TypingAnimation(TYPING_TEXTS).start();
            new PlexusBackground().init();
            new Navigation().init();
            new StatsCounter().init();
        }
    }
    
    class TypingAnimation {
        constructor(texts) {
            this.texts = texts;
            this.element = document.querySelector('.typing-text');
            this.index = 0;
            this.charIndex = 0;
            this.isDeleting = false;
        }

        start() { this.type(); }

        type() {
            const currentText = this.texts[this.index];
            let delay = this.isDeleting ? 50 : 100;

            if (this.isDeleting) {
                this.charIndex--;
            } else {
                this.charIndex++;
            }
            
            this.element.textContent = currentText.substring(0, this.charIndex);

            if (!this.isDeleting && this.charIndex === currentText.length) {
                delay = 2000;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.index = (this.index + 1) % this.texts.length;
                delay = 500;
            }
            
            setTimeout(() => this.type(), delay);
        }
    }

    class PlexusBackground {
        constructor() {
            this.canvas = document.getElementById('plexus-canvas');
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
            const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 20000);
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
            this.ctx.fillStyle = 'rgba(184, 115, 51, 0.7)';
            this.particles.forEach(p => {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                this.ctx.fill();
            });
        }

        drawConnections() {
            this.ctx.strokeStyle = 'rgba(184, 115, 51, 0.1)';
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
                    link.classList.remove('active');
                    if (link.dataset.section === current) {
                        link.classList.add('active');
                    }
                });
            });
        }
    }

    class StatsCounter {
        init() {
            const numbers = document.querySelectorAll('.stat-number');
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animate(entry.target);
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.8 });
            numbers.forEach(num => observer.observe(num));
        }

        animate(el) {
            const target = +el.dataset.target;
            if (isNaN(target)) return;
            let current = 0;
            const duration = 2000;
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

    // --- INITIALIZATION ---
    new LoadingAnimation().start();
});
