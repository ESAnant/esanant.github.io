document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById('main-content');
    const loader = document.getElementById('loader');

    // --- 1. Loader Logic ---
    // Simulates a minimum load time, then fades out loader and shows content.
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.addEventListener('transitionend', () => {
            loader.style.display = 'none';
        });
        mainContent.style.display = 'block';

        // Trigger animation for the first section (Hero) immediately
        const heroSection = document.querySelector('#hero');
        heroSection.classList.add('is-visible');
        const heroElements = heroSection.querySelectorAll('.fade-in');
        heroElements.forEach(el => el.classList.add('is-visible'));

    }, 2500); // 2.5 second thematic load time

    // --- 2. Intersection Observer for Scroll Animations ---
    // Creates a smooth fade-in effect for sections and their content as they enter the viewport.
    const sections = document.querySelectorAll('section');
    const options = {
        root: document.querySelector('main'), // Use the main scrolling container
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'is-visible' to the section itself
                entry.target.classList.add('is-visible');

                // Add 'is-visible' to elements within the section that need to animate
                const elementsToAnimate = entry.target.querySelectorAll('.section-title, .about-container, .education-entry, .card, .pub-entry, .cert-item, .skill-category');
                elementsToAnimate.forEach((el, index) => {
                    // Apply a staggered delay
                    setTimeout(() => {
                        el.classList.add('is-visible');
                    }, index * 100);
                });

                // Stop observing the section once it has been animated
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        // We start observing all sections except the first one, which is handled by the loader logic
        if (section.id !== 'hero') {
           observer.observe(section);
        }
    });

    // --- 3. Interactive Card Flip on Click (for Mobile/Touch) ---
    // Adds a 'is-flipped' class to toggle the 3D flip animation on cards.
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            card.classList.toggle('is-flipped');
        });
    });
});
