/*------------------------------------------------------------------
[Master Script File V7 - The Digital Blueprint]

Project:    The Ultimate Interactive Portfolio (Blueprint Edition)
Author:     Your Name (as Elite Web Developer & Creative Director)
Version:    7.0
-------------------------------------------------------------------*/

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. INITIALIZATION & SETUP ---
    const mainContainer = document.getElementById('main-container');
    lucide.createIcons(); // Initialize Lucide Icons library

    // --- 2. THEMATIC LOADER ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        // A short delay ensures all content is rendered before the loader fades out
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500);
    });

    // --- 3. HIGH-PERFORMANCE CUSTOM CURSOR ---
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
            const speed = 0.15;
            cursorX += (mouseX - cursorX) * speed;
            cursorY += (mouseY - cursorY) * speed;
            // The transform is applied directly for maximum performance
            cursor.style.transform = `translate3d(${cursorX - 12}px, ${cursorY - 12}px, 0)`;
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

    // --- 4. INTERACTIVE EXPANDABLE PROJECT CARDS ---
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Toggle the 'open' class to trigger the CSS transition
            card.classList.toggle('open');
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
                    // Use toggle for cleaner and more efficient class management
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

    // --- 7. FOOTER - DYNAMIC YEAR ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
