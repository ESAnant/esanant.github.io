document.addEventListener('DOMContentLoaded', () => {

    /**
     * Preloader functionality
     */
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 500); // Ensures loader is visible for a minimum duration
    });

    /**
     * Dynamic Matrix Background
     */
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01';
    const charArray = characters.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88'; // Primary theme color
        ctx.font = `${fontSize}px JetBrains Mono`;

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 50);

    /**
     * Fades in sections as they scroll into view.
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
     * Animates numbers from 0 to a target value when visible.
     */
    const animateCounter = (element) => {
        const target = parseInt(element.dataset.target, 10);
        if (isNaN(target)) return;

        let current = 0;
        const duration = 2000;
        const increment = target / (duration / 16);

        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target;
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
