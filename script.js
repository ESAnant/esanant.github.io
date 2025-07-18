/*
 *  SCRIPT.JS
 *  Interactive functionality for the Ultimate Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- VANTA.JS Animated Background ---
    // This creates the dynamic, interactive dots background.
    // The colors are matched to the new palette in style.css.
    if (window.VANTA) {
        VANTA.DOTS({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x22d3ee,      // --accent-color
            color2: 0xffffff,     // Secondary color for dots
            backgroundColor: 0xd1117, // --bg-color
            size: 2.5,
            spacing: 35.0
        });
    }

    // --- General Elements ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section, .hero-section');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const header = document.querySelector('.header');
    
    // --- Header Hide/Show on Scroll ---
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY && window.scrollY > 100) {
            header.style.top = '-80px'; // Hide header
        } else {
            header.style.top = '0'; // Show header
        }
        lastScrollY = window.scrollY;
    });

    // --- Active Nav Link Highlighting on Scroll ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Section is considered active when 50% visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Fade-in Content on Scroll ---
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.content-section').forEach(section => {
        fadeObserver.observe(section);
    });

    // --- Scroll to Top Button Functionality ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Magnetic Glow Effect for Project Cards ---
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${(x / rect.width) * 100}%`);
            card.style.setProperty('--y', `${(y / rect.height) * 100}%`);
        });
    });
});
