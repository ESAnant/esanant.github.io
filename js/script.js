'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- Initialization ---
    const mainContainer = document.getElementById('main-container');
    lucide.createIcons();

    // --- Loader ---
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hidden'), 500);
    });

    // --- SMOOTH, RESPONSIVE MAGNETIC CURSOR ---
    const cursorRing = document.querySelector('.cursor-ring');
    const cursorDot = document.querySelector('.cursor-dot');
    const magneticElements = document.querySelectorAll('.magnetic-link, .skill-card, .project-card, .cta-button, .contact-icon, .nav-link');
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, dotX = 0, dotY = 0;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    if (!isTouch) {
        window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });

        // Track last hovered magnetic element for magnetism
        let lastMagnet = null;

        const updateCursor = () => {
            // Default: Cursor follows the mouse
            let magnetX = mouseX, magnetY = mouseY;

            // Check magnetism
            if (lastMagnet) {
                const rect = lastMagnet.getBoundingClientRect();
                const elX = rect.left + rect.width / 2;
                const elY = rect.top + rect.height / 2;
                const distance = Math.hypot(mouseX - elX, mouseY - elY);
                if (distance < 120) {
                    // Stronger magnetism as you get closer
                    magnetX = elX + (mouseX - elX) * 0.2;
                    magnetY = elY + (mouseY - elY) * 0.2;
                    lastMagnet.classList.add('magnet-active');
                    cursorRing.classList.add('hovered');
                } else {
                    lastMagnet.classList.remove('magnet-active');
                    cursorRing.classList.remove('hovered');
                    lastMagnet = null;
                }
            }
            ringX += (magnetX - ringX - 24) * 0.18;
            ringY += (magnetY - ringY - 24) * 0.18;
            dotX += (mouseX - dotX - 6) * 0.3;
            dotY += (mouseY - dotY - 6) * 0.3;

            cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
            cursorDot.style.transform = `translate(${dotX}px, ${dotY}px)`;

            requestAnimationFrame(updateCursor);
        };
        updateCursor();

        // Attach new magnetic behaviors
        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => { lastMagnet = el; });
            el.addEventListener('mouseleave', () => { 
                if (lastMagnet) lastMagnet.classList.remove('magnet-active'); 
                cursorRing.classList.remove('hovered'); 
                lastMagnet = null; 
            });
        });

    } else {
        document.body.style.cursor = 'auto';
        cursorRing.style.display = 'none';
        cursorDot.style.display = 'none';
    }

    // --- Navigation Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    const navObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link =>
                    link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`)
                );
            }
        });
    }, { root: mainContainer, threshold: 0.5 });
    sections.forEach(section => navObserver.observe(section));

    // --- Scroll-triggered Reveal Animations ---
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.reveal) * 110 || 0;
                setTimeout(() => entry.target.classList.add('revealed'), delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { root: mainContainer, rootMargin: '0px 0px -10% 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    // --- Footer Year ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
