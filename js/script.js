/*------------------------------------------------------------------
[Master Script File]

Project:    The Ultimate Interactive & Thematic Portfolio
Author:     Your Name (as Elite Web Developer & Creative Director)
Version:    1.0

-------------------------------------------------------------------*/

/*------------------------------------------------------------------
[Table of contents]

1.  Strict Mode
2.  DOM Content Loaded Wrapper
3.  Loading Screen Logic
4.  Custom Magnetic Cursor Logic
5.  Header & Navigation Logic
6.  tsParticles Background Initialization
7.  ScrollReveal Initialization
8.  Project & Skill Card Interaction Logic
9.  Footer Logic

-------------------------------------------------------------------*/

// 1. Strict Mode
// Enforces stricter parsing and error handling in the code.
'use strict';


// 2. DOM Content Loaded Wrapper
// Ensures the entire script runs only after the HTML document has been fully loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {

    // 3. Loading Screen Logic
    // Hides the loading screen after the page's resources are fully loaded.
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        // Add a 'hidden' class to trigger the fade-out animation defined in CSS.
        loader.classList.add('hidden');
    });


    // 4. Custom Magnetic Cursor Logic
    // Manages the behavior of the custom cursor.
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    const magneticLinks = document.querySelectorAll('.magnetic-link');

    // Variables to store cursor positions
    let cursorX = 0, cursorY = 0;
    let ringX = 0, ringY = 0;

    // Hide the cursor if the user's device doesn't support hover (e.g., mobile).
    if (window.matchMedia("(hover: none)").matches) {
        cursor.style.display = 'none';
    }

    // Update cursor position on mouse movement
    window.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    // Smoothly animate the cursor ring for the "delayed-follow" effect.
    const followRing = () => {
        // Using a simple easing (lerp) function for smooth movement.
        const speed = 0.2;
        ringX += (cursorX - ringX) * speed;
        ringY += (cursorY - ringY) * speed;
        
        // Apply the transform to both the dot and the ring.
        cursorDot.style.transform = `translate(${cursorX - 3}px, ${cursorY - 3}px)`;
        cursor.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;

        // Continuously call this function for a smooth animation.
        requestAnimationFrame(followRing);
    };
    followRing();

    // Add magnetic effect to designated links.
    magneticLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered'); // Scale up the cursor ring.
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered'); // Return to normal size.
        });
    });


    // 5. Header & Navigation Logic
    // Handles active link highlighting based on the section in view.
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav .nav-link');

    const observerOptions = {
        root: document.querySelector('#main-container'), // The scrollable container
        rootMargin: '0px',
        threshold: 0.5 // 50% of the section must be visible.
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' class from all nav links.
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Get the ID of the visible section.
                const sectionId = entry.target.getAttribute('id');
                // Find the corresponding nav link and add the 'active' class.
                const activeLink = document.querySelector(`.main-nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    // Observe each section.
    sections.forEach(section => {
        sectionObserver.observe(section);
    });


    // 6. tsParticles Background Initialization
    // Creates the animated particle background in the Home section.
    if (document.getElementById('particles-js')) {
        tsParticles.load("particles-js", {
            background: {
                color: {
                    value: "transparent"
                }
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onHover: {
                        enable: true,
                        mode: "repulse"
                    },
                    resize: true
                },
                modes: {
                    repulse: {
                        distance: 100,
                        duration: 0.4
                    }
                }
            },
            particles: {
                color: {
                    value: "var(--accent-color)"
                },
                links: {
                    color: "var(--accent-color)",
                    distance: 150,
                    enable: true,
                    opacity: 0.2,
                    width: 1
                },
                collisions: {
                    enable: true
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: "out",
                    random: false,
                    speed: 1,
                    straight: false
                },
                number: {
                    density: {
                        enable: true,
                        area: 800
                    },
                    value: 80
                },
                opacity: {
                    value: 0.2
                },
                shape: {
                    type: "circle"
                },
                size: {
                    value: { min: 1, max: 5 }
                }
            },
            detectRetina: true
        });
    }


    // 7. ScrollReveal Initialization
    // Animates elements as they enter the viewport.
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '60px',
        duration: 1500,
        delay: 200,
        // The container for scroll events is our main snap-scroll container.
        container: document.getElementById('main-container'),
        // Resetting animations on each reveal gives a continuous effect.
        reset: false
    });

    // Defining the reveal animations for different elements.
    sr.reveal('.main-heading, .section-title');
    sr.reveal('.subtitle', { delay: 400 });
    sr.reveal('.tagline', { delay: 500 });
    sr.reveal('.cta-button', { delay: 600 });
    sr.reveal('.bio', { delay: 300 });
    sr.reveal('.logo-wall .logos img', { interval: 100 });
    sr.reveal('.timeline-item', { interval: 200, origin: 'left' });
    sr.reveal('.skills-grid .skill-card', { interval: 100 });
    sr.reveal('.projects-grid .project-card', { interval: 150 });
    sr.reveal('.contact-message, .contact-links a', { interval: 150 });


    // 8. Project & Skill Card Interaction Logic
    // Manages the expand/collapse functionality for project cards.
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Check if the click target is not a link inside the card.
            if (!event.target.closest('a')) {
                // Toggle the 'expanded' class to trigger CSS transitions.
                card.classList.toggle('expanded');
            }
        });
    });

    // Manages the info reveal for skill cards.
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        // Get the descriptive text from the data-attribute in the HTML.
        const skillInfo = card.dataset.skillInfo;
        if (skillInfo) {
            card.addEventListener('click', () => {
                // Display the information in a simple alert box on click.
                alert(skillInfo);
            });
        }
    });


    // 9. Footer Logic
    // Automatically updates the copyright year in the footer.
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});

