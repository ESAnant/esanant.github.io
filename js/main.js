document.addEventListener('DOMContentLoaded', () => {

    /**
     * Preloader functionality
     * Hides the preloader once the page content has fully loaded.
     */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        // A small delay ensures the loader animation is smooth before fading out
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('loaded');
            }
        }, 500);
    });

    /**
     * Dynamic Matrix Background
     * Renders a falling binary code effect on a canvas element.
     */
    const canvas = document.getElementById('matrix-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const characters = '01'; // Using only 0 and 1 for a binary feel
        const fontSize = 14;
        const columns = Math.ceil(canvas.width / fontSize);
        
        // 'drops' stores the y-position of each column's falling character
        const drops = Array.from({ length: columns }).fill(1);

        function drawMatrix() {
            // Fills the canvas with a semi-transparent black to create a fading trail effect
            ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff88'; // Primary theme color for the characters
            ctx.font = `${fontSize}px JetBrains Mono`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to the top randomly to create a staggered effect
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        // Redraw the matrix at a set interval to create the animation
        setInterval(drawMatrix, 50);

        // Adjust canvas size on window resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Recalculate columns and reset drops on resize if needed
        });
    }

    /**
     * Intersection Observer for fade-in animations on sections.
     * Triggers the 'visible' class when a section enters the viewport.
     */
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px', // Trigger a bit before it's fully in view
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
        const stepTime = 16; // Roughly 60 frames per second
        const increment = target / (duration / stepTime);

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
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, {
        threshold: 0.8 // Trigger when 80% of the element is visible
    });

    document.querySelectorAll('.stat-number').forEach(counter => {
        counterObserver.observe(counter);
    });
});
