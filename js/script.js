/*------------------------------------------------------------------
[Master Script File V6 - Celestial Circuits]

Project:    The Ultimate Interactive Portfolio (Master Edition)
Author:     Your Name (as Elite Web Developer & Creative Director)
Version:    6.0
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

    // --- 3. HIGH-PERFORMANCE MAGNETIC CURSOR ---
    const cursor = document.querySelector('.cursor');
    const magneticElements = document.querySelectorAll('.magnetic-link');

    // Check for touch device to disable custom cursor for better native UX
    if (!window.matchMedia("(pointer: coarse)").matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const followCursor = () => {
            const speed = 0.1;
            cursorX += (mouseX - cursorX - 16) * speed; // Center the cursor
            cursorY += (mouseY - cursorY - 16) * speed;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(followCursor);
        };
        followCursor();

        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    } else {
        // On touch devices, revert to the default system cursor
        document.body.style.cursor = 'auto';
        cursor.style.display = 'none';
    }
    
    // --- 4. INTERACTIVE CARD GLOW EFFECT ---
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


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
