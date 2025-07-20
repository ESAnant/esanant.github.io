/*------------------------------------------------------------------
[Master JavaScript V10 - The Polished Blueprint]

Project:    The Ultimate Interactive Portfolio (Definitive Edition)
Author:     Your Name (as Elite Web Developer & Creative Director)
Version:    10.0
-------------------------------------------------------------------*/

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. INITIALIZATION & SETUP ---
    const mainContainer = document.getElementById('main-container');
    lucide.createIcons(); // Initialize Lucide Icons library

    // --- 2. THEMATIC LOADER ---
    const loader = document.getElementById('loader');
    // This timeout matches the CSS transition-delay to hide the element after animations finish.
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2500); // Must match the transition-delay in the CSS

    // --- 3. HIGH-PERFORMANCE SMOOTH CURSOR ---
    const cursor = document.querySelector('.cursor');
    const magneticElements = document.querySelectorAll('.magnetic-link');

    // Disable custom cursor on touch devices for a better native user experience
    if (!window.matchMedia("(pointer: coarse)").matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // The core animation loop for the cursor, using requestAnimationFrame for performance
        const followCursor = () => {
            // Linear interpolation (lerp) creates a smooth, "floaty" follow effect
            const speed = 0.1;
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            // The transform is applied directly for maximum performance
            cursor.style.transform = `translate3d(${cursorX - 14}px, ${cursorY - 14}px, 0)`;
            requestAnimationFrame(followCursor);
        };
        followCursor();

        // Apply hover effect class to the cursor for all magnetic elements
        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
        });
    } else {
        // On touch devices, revert to the default system cursor and hide the custom one
        document.body.style.cursor = 'auto';
        cursor.style.display = 'none';
    }

    // --- 4. INDIVIDUAL EXPANDABLE PROJECT CARDS ---
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const header = card.querySelector('.project-header');
        if (header) {
            header.addEventListener('click', () => {
                card.classList.toggle('open');
            });
        }
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
    }, { root: mainContainer, threshold: 0.5 }); // A section is "active" when 50% is visible

    sections.forEach(section => navObserver.observe(section));

    // --- 6. SCROLL-TRIGGERED REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger animations based on the data-reveal attribute value
                const delay = parseInt(entry.target.dataset.reveal) * 120 || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                // Performance boost: stop observing the element once it has been revealed
                revealObserver.unobserve(entry.target);
            }
        });
    }, { root: mainContainer, rootMargin: '0px 0px -10% 0px' }); // Trigger animation when element is 10% from the bottom

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 7. FOOTER - DYNAMIC YEAR ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
