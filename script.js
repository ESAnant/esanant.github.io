/*
 *  SCRIPT.JS
 *  Functionality for the "Amazing" Portfolio Experience
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 500); // Ensures Vanta has time to initialize
    });

    // --- VANTA.JS Animated Background ---
    if (window.VANTA) {
        VANTA.NET({
            el: "#vanta-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x00f6ff,      // --accent-color
            backgroundColor: 0x20512, // --bg-color
            points: 12.00,
            maxDistance: 25.00,
            spacing: 20.00
        });
    }
    
    // --- Custom Cursor ---
    const cursor = document.querySelector('.custom-cursor');
    const hoverableElements = document.querySelectorAll('a, button, .project-card, .skill-category li');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    hoverableElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // --- General Elements ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section, .hero-section');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const header = document.querySelector('.header');

    // --- Header Hide/Show on Scroll ---
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (lastScrollY < window.scrollY && window.scrollY > 150) {
            header.style.top = '-100px';
        } else {
            header.style.top = '0';
        }
        lastScrollY = window.scrollY;
    });

    // --- Active Nav Link & Section Fade-in Observers ---
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Nav link highlighting
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
                // Fade-in animation
                entry.target.classList.add('visible');
            }
        });
    }, { rootMargin: '0px', threshold: 0.4 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Scroll to Top Button ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // --- Magnetic Effect for Social Icons ---
    const socialIcons = document.querySelectorAll('.hero-socials a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mousemove', (e) => {
            const rect = icon.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            icon.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.1)`;
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'translate(0, 0) scale(1)';
        });
    });
});
