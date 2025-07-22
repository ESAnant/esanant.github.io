/* ---
Final JavaScript for Edidi Sai Anant's Portfolio
Phase 4: Finalization, Optimization & Deployment
--- */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Element & State Setup ---
    const mainContainer = document.querySelector('.main-container');
    const sections = document.querySelectorAll('.section');
    const preloader = document.getElementById('preloader');
    const canvas = document.getElementById('animated-bg');
    const ctx = canvas.getContext('2d');
    
    let particlesArray;
    let currentSectionIndex = 0;
    let isScrolling = false;

    // --- 2. Preloader ---
    // Hides the preloader after the page content has fully loaded.
    window.addEventListener('load', () => {
        setTimeout(() => { preloader.classList.add('hidden'); }, 200);
    });

    // --- 3. Animated Background ---
    // Creates a subtle, moving particle animation on an HTML canvas.
    function initParticles() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particlesArray = [];
        let numParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numParticles; i++) {
            let size = (Math.random() * 1.5) + 0.5;
            let x = Math.random() * (innerWidth - size * 2) + size * 2;
            let y = Math.random() * (innerHeight - size * 2) + size * 2;
            let dirX = (Math.random() * 0.4) - 0.2;
            let dirY = (Math.random() * 0.4) - 0.2;
            let color = 'rgba(136, 146, 176, 0.3)';
            particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
        }
    }

    class Particle {
        constructor(x, y, dirX, dirY, size, color) { this.x=x; this.y=y; this.directionX=dirX; this.directionY=dirY; this.size=size; this.color=color; }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle=this.color; ctx.fill(); }
        update() { if(this.x>canvas.width||this.x<0) this.directionX=-this.directionX; if(this.y>canvas.height||this.y<0) this.directionY=-this.directionY; this.x+=this.directionX; this.y+=this.directionY; this.draw(); }
    }

    function animateParticles() { requestAnimationFrame(animateParticles); ctx.clearRect(0, 0, innerWidth, innerHeight); particlesArray.forEach(p => p.update()); }
    
    window.addEventListener('resize', () => { initParticles(); });

    initParticles();
    animateParticles();

    // --- 4. Scroll-Triggered Animations ---
    // Uses Intersection Observer to add a 'is-visible' class for fade-in effects.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); } });
    }, { root: mainContainer, threshold: 0.1 });
    document.querySelectorAll('.fade-in-element').forEach((el) => observer.observe(el));

    // --- 5. Interactive Flip Cards ---
    // Toggles a 'is-flipped' class on cards when they are clicked.
    document.querySelectorAll('.interactive-card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('is-flipped'));
    });

    // --- 6. Custom Snap-Scrolling Logic ---
    // Manages navigation between sections with a smooth, controlled scroll.
    function scrollToSection(index) {
        if (isScrolling || index < 0 || index >= sections.length) return;
        isScrolling = true;
        currentSectionIndex = index;
        
        mainContainer.scrollTo({ top: sections[index].offsetTop, behavior: 'smooth' });

        // Debounce to prevent scroll spamming
        setTimeout(() => { isScrolling = false; }, 1000);
    }

    // Handles mouse wheel events
    mainContainer.addEventListener('wheel', (event) => {
        if (isScrolling) {
            event.preventDefault();
            return;
        }
        event.preventDefault();
        const scrollDirection = event.deltaY > 0 ? 1 : -1;
        scrollToSection(currentSectionIndex + scrollDirection);
    }, { passive: false });

    // Handles keyboard navigation (ArrowUp/ArrowDown) for accessibility
    document.addEventListener('keydown', (event) => {
        if (isScrolling) return;
        if (event.key === 'ArrowDown') {
            scrollToSection(currentSectionIndex + 1);
        } else if (event.key === 'ArrowUp') {
            scrollToSection(currentSectionIndex - 1);
        }
    });

    // Handles clicks on navigation links
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            const targetIndex = Array.from(sections).indexOf(targetSection);
            scrollToSection(targetIndex);
        });
    });
});
