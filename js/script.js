/*------------------------------------------------------------------
[Master Script File V5 - Digital Synapse Edition]

Project:    The Ultimate Interactive Portfolio (Definitive Edition)
Author:     Your Name (as Elite Web Developer & Creative Director)
Version:    5.0
-------------------------------------------------------------------*/

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. INITIALIZATION & SETUP ---
    const mainContainer = document.getElementById('main-container');
    lucide.createIcons(); // Initialize Lucide Icons library

    // --- 2. THEMATIC LOADER ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500); // Small delay to prevent visual flicker
    });

    // --- 3. DYNAMIC SYNAPSE BACKGROUND (Canvas Animation) ---
    const canvas = document.createElement('canvas');
    const backgroundContainer = document.getElementById('synapse-background');
    if (backgroundContainer) {
        backgroundContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = 'rgba(0, 229, 255, 0.5)';
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                particles.push(new Particle());
            }
        };
        initParticles();

        const connectParticles = () => {
            let opacityValue = 1;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a; b < particles.length; b++) {
                    let distance = Math.hypot(particles[a].x - particles[b].x, particles[a].y - particles[b].y);
                    if (distance < 100) {
                        opacityValue = 1 - (distance / 100);
                        ctx.strokeStyle = `rgba(0, 229, 255, ${opacityValue * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            requestAnimationFrame(animate);
        };
        animate();
    }


    // --- 4. HIGH-PERFORMANCE MAGNETIC CURSOR ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const magneticElements = document.querySelectorAll('.magnetic-link');

    // Check for touch device to disable custom cursor for better native UX
    if (!window.matchMedia("(pointer: coarse)").matches) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;
        let dotX = 0, dotY = 0;

        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // The core animation loop for the cursor
        const followCursor = () => {
            const speed = 0.12; // Adjusted for a smoother, more responsive feel
            ringX += (mouseX - ringX - 20) * speed;
            ringY += (mouseY - ringY - 20) * speed;
            dotX += (mouseX - dotX - 4) * (speed * 2);
            dotY += (mouseY - dotY - 4) * (speed * 2);

            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

            requestAnimationFrame(followCursor);
        };
        followCursor();

        // Magnetic effect logic
        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
        });
    } else {
        document.body.style.cursor = 'auto';
        cursorDot.style.display = 'none';
        cursorRing.style.display = 'none';
    }


    // --- 5. NAVIGATION & ACTIVE LINK HIGHLIGHTING ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');

    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }, { root: mainContainer, threshold: 0.5 });

    sections.forEach(section => navObserver.observe(section));


    // --- 6. SCROLL-TRIGGERED REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.reveal) * 120 || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { root: mainContainer, rootMargin: '0px 0px -10% 0px' });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 7. FOOTER - DYNAMIC YEAR ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
