/*------------------------------------------------------------------
[Master Script File V2]

Project:    The Ultimate Interactive & Thematic Portfolio (Enhanced)
Author:     Your Name (as Elite Web Developer & Creative Director)
Version:    2.0
-------------------------------------------------------------------*/

/*------------------------------------------------------------------
[Table of contents]

1.  Strict Mode
2.  DOM Content Loaded Wrapper
3.  Loading Screen Logic
4.  Custom Magnetic Cursor Logic (Refined)
5.  Header & Navigation Logic
6.  Parallax Scroll Effect (NEW)
7.  Project & Skill Card Interaction Logic
8.  Footer Logic

-------------------------------------------------------------------*/

// 1. Strict Mode
'use strict';

// 2. DOM Content Loaded Wrapper
// Ensures the entire script runs only after the HTML document has been fully loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {

    // 3. Loading Screen Logic
    // Hides the loading screen after the page's main content is ready.
    const loader = document.getElementById('loader');
    // Using a slight delay to ensure all initial animations settle.
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 500); // 500ms delay
    });


    // 4. Custom Magnetic Cursor Logic (Refined)
    // Manages the custom cursor with a smoother animation loop.
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const magneticLinks = document.querySelectorAll('.magnetic-link');
    const mainContainer = document.getElementById('main-container');

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let dotX = 0, dotY = 0;

    // Hide cursor on touch devices
    if (window.matchMedia("(hover: none)").matches) {
        document.body.style.cursor = 'auto';
        cursorDot.style.display = 'none';
        cursorRing.style.display = 'none';
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const followCursor = () => {
        // Use linear interpolation (lerp) for a smoother, more organic follow effect.
        const speed = 0.15;
        ringX += (mouseX - ringX) * speed;
        ringY += (mouseY - ringY) * speed;
        dotX += (mouseX - dotX) * (speed * 1.5); // Dot moves slightly faster
        dotY += (mouseY - dotY) * (speed * 1.5);

        cursorRing.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
        cursorDot.style.transform = `translate(${dotX - 4}px, ${dotY - 4}px)`;

        requestAnimationFrame(followCursor);
    };
    followCursor();

    magneticLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursorRing.style.transition = 'transform 0.2s, width 0.3s, height 0.3s, opacity 0.3s';
            cursorRing.classList.add('hovered');
        });
        link.addEventListener('mouseleave', () => {
            cursorRing.classList.remove('hovered');
        });
    });


    // 5. Header & Navigation Logic
    // Highlights the active navigation link based on which section is visible.
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');

    const observerOptions = {
        root: mainContainer,
        rootMargin: '0px',
        threshold: 0.5 // Section is considered active when 50% is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const sectionId = entry.target.getAttribute('id');
                const activeLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // 6. Parallax Scroll Effect (NEW)
    // Creates a subtle 3D effect on the home section content during scroll.
    const homeSection = document.getElementById('home');
    const parallaxElements = homeSection.querySelectorAll('[data-speed]');

    mainContainer.addEventListener('scroll', () => {
        const scrollTop = mainContainer.scrollTop;
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-speed'));
            // Move the element vertically based on scroll position and its speed factor.
            // The negative sign moves it upwards as you scroll down.
            const movement = -(scrollTop * speed * 0.5);
            el.style.transform = `translateY(${movement}px)`;
        });
    });


    // 7. Project & Skill Card Interaction Logic
    // Manages the expand/collapse functionality for project cards.
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Prevent toggling when a link inside the card is clicked.
            if (!event.target.closest('a')) {
                card.classList.toggle('expanded');
            }
        });
    });

    // Manages the info popup for skill cards.
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const skillInfo = card.dataset.skillInfo;
        if (skillInfo) {
            card.addEventListener('click', () => {
                alert(skillInfo); // A simple alert is effective and avoids extra modal complexity.
            });
        }
    });


    // 8. Footer Logic
    // Automatically updates the copyright year.
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
