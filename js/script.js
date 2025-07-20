/*------------------------------------------------------------------
[Master Script File V3 - ECE Thematic]

Project:    The Ultimate Interactive Portfolio (ECE Edition)
Author:     Your Name (as Elite Web Developer & Creative Director)
Version:    3.0
-------------------------------------------------------------------*/

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. INITIALIZATION & SETUP ---

    const mainContainer = document.getElementById('main-container');
    lucide.createIcons(); // Initialize Lucide Icons

    // --- 2. THEMATIC LOADER ---

    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500); // Ensures all content is rendered before fading out
    });

    // --- 3. RESPONSIVE CUSTOM CURSOR ---

    const cursorRing = document.querySelector('.cursor-ring');
    const cursorDot = document.querySelector('.cursor-dot');
    const magneticLinks = document.querySelectorAll('.magnetic-link');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;

    // Check for touch capabilities instead of hover for better device detection
    if (!window.matchMedia("(pointer: coarse)").matches) {
        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        const followCursor = () => {
            // Smoother easing (lerp) for a fluid, non-stuttering motion
            const speed = 0.1;
            // The subtraction of half the element's size centers the transform origin
            ringX += (mouseX - ringX - 20) * speed;
            ringY += (mouseY - ringY - 20) * speed;
            dotX += (mouseX - dotX - 3) * (speed * 2); // Dot moves faster for a nice parallax
            dotY += (mouseY - dotY - 3) * (speed * 2);

            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

            requestAnimationFrame(followCursor);
        };
        followCursor();

        magneticLinks.forEach(link => {
            link.addEventListener('mouseenter', () => cursorRing.classList.add('hovered'));
            link.addEventListener('mouseleave', () => cursorRing.classList.remove('hovered'));
        });
    } else {
        // Hide custom cursor on touch devices for a better native experience
        document.body.style.cursor = 'auto';
        cursorRing.style.display = 'none';
        cursorDot.style.display = 'none';
    }


    // --- 4. NAVIGATION & ACTIVE LINK HIGHLIGHTING ---

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');

    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    // Use toggle for cleaner class management
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
                });
            }
        });
    }, { root: mainContainer, threshold: 0.5 }); // 50% of the section must be visible

    sections.forEach(section => navObserver.observe(section));


    // --- 5. SCROLL-TRIGGERED REVEAL ANIMATIONS ---

    const revealElements = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply a delay based on the data-reveal attribute value for staggered effects
                const delay = parseInt(entry.target.dataset.reveal) * 100 || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                // Stop observing the element once it has been revealed for performance
                revealObserver.unobserve(entry.target);
            }
        });
    }, { root: mainContainer, rootMargin: '0px 0px -10% 0px' }); // Trigger animation a bit early

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 6. FOOTER ---

    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
