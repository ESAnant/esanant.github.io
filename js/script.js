/*------------------------------------------------------------------
[Master Script File V4 - Polished & Performant]

Project:    The Ultimate Interactive Portfolio (Final Edition)
Author:     Your Name (as Elite Web Developer & Creative Director)
Version:    4.0
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
            // Linear interpolation (lerp) for a smooth, "floaty" effect
            const speed = 0.1;
            ringX += (mouseX - ringX - 22) * speed; // Center the ring
            ringY += (mouseY - ringY - 22) * speed;
            dotX += (mouseX - dotX - 4) * (speed * 2); // Dot moves faster
            dotY += (mouseY - dotY - 4) * (speed * 2);

            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

            requestAnimationFrame(followCursor);
        };
        followCursor();

        // Magnetic effect logic
        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.classList.add('hovered');
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.classList.remove('hovered');
            });
        });
    } else {
        // On touch devices, revert to the default system cursor
        document.body.style.cursor = 'auto';
        cursorDot.style.display = 'none';
        cursorRing.style.display = 'none';
    }

    // --- 4. NAVIGATION & ACTIVE LINK HIGHLIGHTING ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');

    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    // Use toggle for cleaner and more efficient class management
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }, { root: mainContainer, threshold: 0.5 }); // 50% of a section must be visible

    sections.forEach(section => navObserver.observe(section));

    // --- 5. SCROLL-TRIGGERED REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger animations based on the data-reveal attribute value (e.g., data-reveal="1")
                const delay = parseInt(entry.target.dataset.reveal) * 100 || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                // Performance boost: stop observing the element once it has been revealed
                revealObserver.unobserve(entry.target);
            }
        });
    }, { root: mainContainer, rootMargin: '0px 0px -10% 0px' }); // Trigger animation when element is 10% from the bottom

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 6. FOOTER - DYNAMIC YEAR ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
