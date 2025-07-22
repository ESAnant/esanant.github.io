// --- PHASE 3: CORE INTERACTIVITY & ANIMATION ---

document.addEventListener('DOMContentLoaded', () => {

    // 1. Preloader Logic
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        // Wait a brief moment before fading out
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 200); // 200ms delay
    });


    // 2. Animated Background Logic
    const canvas = document.getElementById('animated-bg');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray;

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 1.5) + 0.5;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * .4) - .2;
            let directionY = (Math.random() * .4) - .2;
            let color = 'rgba(136, 146, 176, 0.3)'; // --color-slate-gray with alpha

            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
    }
    
    // Recalculate canvas on resize
    window.addEventListener('resize', () => {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        init();
    });

    init();
    animate();


    // 3. Scroll-triggered Fade-in Animation Logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const elementsToFadeIn = document.querySelectorAll('.fade-in-element');
    elementsToFadeIn.forEach((el) => observer.observe(el));

});
