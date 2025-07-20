/*------------------------------------------------------------------
[Master Stylesheet V9 - The Copper-Core]

Project:    The Ultimate Interactive Portfolio (Definitive Edition)
Author:     Your Name (as Elite Web Developer & Creative Director)
Version:    9.0
-------------------------------------------------------------------*/

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. INITIALIZATION & SETUP ---
    const mainContainer = document.getElementById('main-container');
    lucide.createIcons(); // Initialize Lucide Icons library

    // --- 2. THEMATIC LOADER ---
    const loader = document.getElementById('loader');
    // The loader's visibility is controlled by CSS animations and a total delay.
    // This timeout matches the CSS transition-delay to hide the element after animations finish.
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2500); // Must match the transition-delay in the CSS

    // --- 3. HIGH-PERFORMANCE 1:1 CURSOR ---
    const cursor = document.querySelector('.cursor');
    const magneticElements = document.querySelectorAll('.magnetic-link');

    // Disable custom cursor on touch devices for a better native UX
    if (!window.matchMedia("(pointer: coarse)").matches) {
        window.addEventListener('mousemove', e => {
            // Direct 1:1 mapping for instant responsiveness
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });

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
        const expandBtn = card.querySelector('.expand-btn');
        if (expandBtn) {
            expandBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevents the card's own click listener from firing
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
