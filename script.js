// --- PHASE 3.2: SNAP SCROLL & FLIP CARDS ---

document.addEventListener('DOMContentLoaded', () => {

    // --- SETUP ---
    const mainContainer = document.querySelector('.main-container');
    const sections = document.querySelectorAll('.section');

    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => { preloader.classList.add('hidden'); }, 200);
    });

    // --- ANIMATED BACKGROUND ---
    const canvas = document.getElementById('animated-bg');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particlesArray;
    class Particle {
        constructor(x, y, dX, dY, s, c) { this.x=x; this.y=y; this.directionX=dX; this.directionY=dY; this.size=s; this.color=c; }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle=this.color; ctx.fill(); }
        update() { if(this.x>canvas.width||this.x<0){this.directionX=-this.directionX;} if(this.y>canvas.height||this.y<0){this.directionY=-this.directionY;} this.x+=this.directionX; this.y+=this.directionY; this.draw(); }
    }
    function initParticles() {
        particlesArray = [];
        let num = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < num; i++) {
            let s = (Math.random()*1.5)+0.5; let x = (Math.random()*((innerWidth-s*2)-(s*2))+s*2); let y = (Math.random()*((innerHeight-s*2)-(s*2))+s*2);
            let dX = (Math.random()*.4)-.2; let dY = (Math.random()*.4)-.2; let c = 'rgba(136, 146, 176, 0.3)';
            particlesArray.push(new Particle(x,y,dX,dY,s,c));
        }
    }
    function animateParticles() { requestAnimationFrame(animateParticles); ctx.clearRect(0,0,innerWidth,innerHeight); particlesArray.forEach(p => p.update()); }
    initParticles();
    animateParticles();
    window.addEventListener('resize', () => { canvas.width=innerWidth; canvas.height=innerHeight; initParticles(); });

    // --- SCROLL-TRIGGERED FADE-IN ANIMATION ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); } });
    }, { root: mainContainer, threshold: 0.1 });
    document.querySelectorAll('.fade-in-element').forEach((el) => observer.observe(el));

    // --- NEW: DYNAMIC 3D FLIP CARD LOGIC ---
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    });

    // --- NEW: JAVASCRIPT-DRIVEN SNAP SCROLLING ---
    let currentSectionIndex = 0;
    let isScrolling = false;

    function scrollToSection(index) {
        if (isScrolling || index < 0 || index >= sections.length) return;
        isScrolling = true;
        
        mainContainer.scrollTo({
            top: sections[index].offsetTop,
            behavior: 'smooth'
        });

        // Use a timeout to reset the scrolling flag after the animation might have finished.
        // This is a simple debounce to prevent rapid-fire scrolling.
        setTimeout(() => {
            isScrolling = false;
        }, 1000); // 1 second cooldown
    }

    // This handles mouse wheel scroll
    mainContainer.addEventListener('wheel', (event) => {
        if (isScrolling) {
            event.preventDefault();
            return;
        }

        if (event.deltaY > 0) {
            // Scrolling down
            if (currentSectionIndex < sections.length - 1) {
                event.preventDefault();
                currentSectionIndex++;
                scrollToSection(currentSectionIndex);
            }
        } else {
            // Scrolling up
            if (currentSectionIndex > 0) {
                event.preventDefault();
                currentSectionIndex--;
                scrollToSection(currentSectionIndex);
            }
        }
    }, { passive: false });

    // This updates the current index if the user clicks a nav link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href');
            sections.forEach((section, index) => {
                if (`#${section.id}` === targetId) {
                    currentSectionIndex = index;
                    // The native scroll will happen due to href, no need to call scrollToSection here
                    // but we do need to prevent our scroll logic from fighting it
                    isScrolling = true;
                    setTimeout(() => { isScrolling = false; }, 1000);
                }
            });
        });
    });
});
