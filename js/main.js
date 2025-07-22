document.addEventListener('DOMContentLoaded', () => {

    /**
     * Fades in sections as they scroll into view.
     * This provides a smoother experience than scroll-snapping.
     */
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    /**
     * Animates numbers from 0 to a target value when they become visible.
     */
    const animateCounter = (element) => {
        const target = parseInt(element.dataset.target, 10);
        if (isNaN(target)) return;

        let current = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // Calculate increment per frame (approx 60fps)

        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target; // Ensure it ends on the exact target
            }
        };
        requestAnimationFrame(updateCount);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.8
    });

    document.querySelectorAll('.stat-number').forEach(counter => {
        counterObserver.observe(counter);
    });

});
