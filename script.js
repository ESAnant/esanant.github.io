/* ---
Portfolio v2.3 Final JavaScript
Phase 3: Advanced Card Interactivity & Final Polish
--- */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Element & State Setup ---
    const loader = document.getElementById('loader');
    const mainContent = document.querySelector('main');
    const header = document.querySelector('.main-header');

    // --- 2. Advanced Preloader ---
    setTimeout(() => {
        loader.classList.add('is-hidden');
        mainContent.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 1500);

    // --- 3. Interactive Particle Background ---
    particlesJS('interactive-bg', {
        "particles": { "number":{ "value":60, "density":{ "enable":true, "value_area":800 } }, "color":{ "value":"#8892b0" }, "shape":{ "type":"circle" }, "opacity":{ "value":0.3, "random":true }, "size":{ "value":2, "random":true }, "line_linked":{ "enable":true, "distance":150, "color":"#8892b0", "opacity":0.2, "width":1 }, "move":{ "enable":true, "speed":1, "direction":"none", "out_mode":"out" } },
        "interactivity": { "detect_on":"canvas", "events":{ "onhover":{ "enable":true, "mode":"grab" }, "onclick":{ "enable":true, "mode":"push" } }, "modes":{ "grab":{ "distance":140, "line_linked":{ "opacity":0.5 } }, "push":{ "particles_nb":4 } } },
        "retina_detect":true
    });

    // --- 4. Scroll-triggered Animations ---
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // --- 5. NEW: Hover-to-Reveal Project Card Logic ---
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const titleElement = card.querySelector('h4');
        const originalTitle = titleElement.innerHTML;
        const description = card.getAttribute('data-description');

        card.addEventListener('mouseenter', () => {
            titleElement.innerHTML = description;
            titleElement.style.fontSize = '1rem'; // Adjust font size for description
        });

        card.addEventListener('mouseleave', () => {
            titleElement.innerHTML = originalTitle;
            titleElement.style.fontSize = ''; // Revert to original size
        });
    });
});
