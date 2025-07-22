document.addEventListener('DOMContentLoaded', () => {

    /**
     * Preloader functionality
     * Hides the preloader once the page content has fully loaded.
     */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
            }, 500); // Small delay for smooth animation
        });
    }

    /**
     * Animated Circuit Background
     * Renders a falling binary code effect on a canvas.
     */
    const canvas = document.getElementById('circuit-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        const setupCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        setupCanvas();

        const characters = '01';
        const fontSize = 14;
        const columns = Math.ceil(canvas.width / fontSize);

        // 'drops' stores the y-position of each column's falling character
        const drops = Array.from({ length: columns }).fill(1).map(() => Math.random() * canvas.height);

        const draw = () => {
            // Fill canvas with a semi-transparent layer to create a fading trail
            ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#c57d56'; // Copper accent color
            ctx.font = `${fontSize}px Fira Code`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to the top randomly to create a staggered effect
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        // Run the animation loop
        setInterval(draw, 50);

        // Adjust canvas on window resize
        window.addEventListener('resize', setupCanvas);
    }

    /**
     * Intersection Observer for fade-in animations on sections.
     * Triggers the 'visible' class when a section enters the viewport.
     */
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after first animation
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove class to re-animate on scroll away and back
                 entry.target.classList.remove('visible');
            }
        });
    }, {
        root: document.querySelector('.main-container'), // Observe within the scroll container
        rootMargin: '0px 0px -150px 0px', // Trigger when section is 150px from bottom
        threshold: 0.1
    });

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });
});
