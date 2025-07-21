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
            this.stages = document.querySelectorAll('.synthesis-stage');
            this.progressBar = document.querySelector('.progress-bar');
        }

        start() {
            document.body.style.overflow = 'hidden';
            let delay = 0;
            this.stages.forEach(stage => {
                setTimeout(() => stage.classList.add('active'), delay);
                delay += 200;
            });
            setTimeout(() => {
                this.progressBar.style.width = '100%';
            }, delay);

            setTimeout(() => this.hide(), delay + 2400);
        }

        hide() {
            this.loader.classList.add('fade-out');
            setTimeout(() => {
                this.loader.style.display = 'none';
                document.body.style.overflow = '';
                this.initMainAnimations();
            }, 500);
        }
        
        initMainAnimations() {
            new TypingAnimation(TYPING_TEXTS).start();
            new MatrixBackground().init();
            new Navigation().init();
            new ScrollObserver().init();
            new SkillBars().init();
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

    class MatrixBackground {
        constructor() {
            this.canvas = document.getElementById('matrix-canvas');
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');
            this.fontSize = 14;
            this.columns = 0;
            this.drops = [];
        }

        init() {
            if (!this.canvas) return;
            this.setupCanvas();
            this.animate();
            window.addEventListener('resize', () => this.setupCanvas());
        }

        setupCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.columns = Math.floor(this.canvas.width / this.fontSize);
            this.drops = [];
            for (let i = 0; i < this.columns; i++) {
                this.drops[i] = 1;
            }
        }

        animate() {
            this.ctx.fillStyle = 'rgba(10, 10, 10, 0.04)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.fillStyle = '#B87333';
            this.ctx.font = `${this.fontSize}px Fira Code`;

            for (let i = 0; i < this.drops.length; i++) {
                const text = Math.random() > 0.5 ? '1' : '0';
                this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
                
                if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
                    this.drops[i] = 0;
                }
                this.drops[i]++;
            }
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
                    const sectionTop = section.offsetTop - 100;
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

    class ScrollObserver {
        init() {
            const sections = document.querySelectorAll('.section');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.2 });

            sections.forEach(sec => observer.observe(sec));
        }
    }
    
    class SkillBars {
        init() {
            const items = document.querySelectorAll('.skill-item');
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const bar = entry.target.querySelector('.skill-progress');
                        bar.style.width = entry.target.dataset.level + '%';
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            items.forEach(item => observer.observe(item));
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
            let current = 0;
            const timer = setInterval(() => {
                current++;
                el.textContent = current;
                if (current === target) clearInterval(timer);
            }, 2000 / target);
        }
    }

    // --- INITIALIZATION ---
    new LoadingAnimation().start();
});
