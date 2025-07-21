document.addEventListener("DOMContentLoaded", function() {
    const mainContent = document.getElementById('main-content');
    const loader = document.getElementById('loader');

    // --- 1. Loader Logic ---
    function initApp() {
        loader.style.opacity = '0';
        loader.addEventListener('transitionend', () => loader.remove());
        
        mainContent.style.display = 'block';

        // Animate hero section immediately
        const heroSection = document.querySelector('#hero');
        heroSection.classList.add('is-visible');
        heroSection.querySelectorAll('.fade-in').forEach(el => el.classList.add('is-visible'));
    }

    // Set a timeout to ensure loader is visible for a minimum duration
    setTimeout(initApp, 2500);

    // --- 2. Intersection Observer for Scroll Animations ---
    const animatedSections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find all elements within the section that need individual animation
                const elementsToAnimate = entry.target.querySelectorAll('.content-section__title, .about-section__container, .education-entry, .card, .publication-entry, .cert-grid__item, .skill-category');
                
                elementsToAnimate.forEach((el, index) => {
                    // Stagger the animation for a cascade effect
                    el.style.transitionDelay = `${index * 100}ms`;
                    el.classList.add('is-visible', 'fade-in');
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- 3. Interactive Card Flip Logic (for Click and Keyboard) ---
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const flipCard = () => card.classList.toggle('is-flipped');

        card.addEventListener('click', flipCard);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                flipCard();
            }
        });
    });
});
