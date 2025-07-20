/*------------------------------------------------------------------
[Master Script File V8 - The Definitive Edition]

Project:    The Ultimate Interactive Portfolio (Definitive Edition)
Author:     Your Name (as Elite Web Developer & Creative Director)
Version:    8.0
-------------------------------------------------------------------*/

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. INITIALIZATION & SETUP ---
    const mainContainer = document.getElementById('main-container');
    lucide.createIcons();

    // --- 2. THEMATIC LOADER ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 500);
    });

    // --- 3. DYNAMIC MATRIX BACKGROUND ---
    const canvas = document.createElement('canvas');
    const backgroundContainer = document.getElementById('matrix-background');
    if (backgroundContainer) {
        backgroundContainer.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const alphabet = katakana + latin + nums;

        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const rainDrops = [];

        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(1, 4, 19, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00e5ff';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };

        setInterval(draw, 33);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            for(let x = 0; x < canvas.width / fontSize; x++) {
                rainDrops[x] = 1;
            }
        });
    }

    // --- 4. HIGH-PERFORMANCE CUSTOM CURSOR ---
    const cursor = document.querySelector('.cursor');
    const magneticElements = document.querySelectorAll('.magnetic-link');

    if (!window.matchMedia("(pointer: coarse)").matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const followCursor = () => {
            const speed = 0.12;
            cursorX += (mouseX - cursorX - 16) * speed;
            cursorY += (mouseY - cursorY - 16) * speed;
            cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
            requestAnimationFrame(followCursor);
        };
        followCursor();

        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    } else {
        document.body.style.cursor = 'auto';
        cursor.style.display = 'none';
    }

    // --- 5. INTERACTIVE EXPANDABLE PROJECT CARDS ---
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const header = card.querySelector('.project-header');
        header.addEventListener('click', () => {
            card.classList.toggle('open');
        });
    });

    // --- 6. NAVIGATION & ACTIVE LINK HIGHLIGHTING ---
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

    // --- 7. SCROLL-TRIGGERED REVEAL ANIMATIONS ---
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

    // --- 8. FOOTER - DYNAMIC YEAR ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
