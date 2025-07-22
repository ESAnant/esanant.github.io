/* ---
Portfolio v2.1 JavaScript
Phase 2: Next-Gen Interactivity & Animations
--- */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Element & State Setup ---
    const loader = document.getElementById('loader');
    const mainContent = document.querySelector('main');
    const header = document.querySelector('.main-header');

    // --- 2. Advanced Preloader ---
    // Hides the loader and reveals the main content after a delay.
    setTimeout(() => {
        loader.classList.add('is-hidden');
        mainContent.style.opacity = '1';
        header.style.transform = 'translateY(0)';
    }, 1500); // Simulate loading time

    // --- 3. Interactive Particle Background ---
    // Uses the particles.js library for a sophisticated background effect.
    particlesJS('interactive-bg', {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#8892b0" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.3, "random": true },
            "size": { "value": 2, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#8892b0", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 1, "direction": "none", "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 0.5 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });

    // --- 4. Scroll-triggered Animations ---
    // Uses Intersection Observer to add a 'is-visible' class for fade-in effects.
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
});
