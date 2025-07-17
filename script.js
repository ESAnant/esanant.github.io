document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('loaded');
    });

    // --- Dynamic Header on Scroll ---
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (lastScrollY < window.scrollY && window.scrollY > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });

    // --- Scroll-triggered Fade-in Animations ---
    const sections = document.querySelectorAll('section');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -100px 0px', threshold: 0.1 });

    sections.forEach(section => {
        revealObserver.observe(section);
    });
    
    // --- Active Navigation Link Highlighting ---
    const navLinks = document.querySelectorAll('nav a');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href').substring(1) === entry.target.id);
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });

    sections.forEach(section => {
        if(section.id) sectionObserver.observe(section);
    });

});
