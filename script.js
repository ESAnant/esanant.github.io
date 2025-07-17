document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu ---
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('nav-links');
    const navLinks = nav.querySelectorAll('a');

    const toggleMenu = () => {
        const isOpen = nav.classList.contains('is-open');
        // Toggle classes for the button and nav panel
        menuToggle.classList.toggle('is-active', !isOpen);
        nav.classList.toggle('mobile-active', !isOpen);
        nav.classList.toggle('is-open', !isOpen);
        // Toggle body scroll
        document.body.classList.toggle('blur', !isOpen);
    };

    // Open/close menu when hamburger button is clicked
    menuToggle.addEventListener('click', toggleMenu);

    // --- IMPROVEMENT: Close menu when a nav link is clicked ---
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('is-open')) {
                toggleMenu();
            }
        });
    });

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
    const allNavLinks = document.querySelectorAll('#nav-links a');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });

    sections.forEach(section => {
        if (section.id) {
            sectionObserver.observe(section);
        }
    });

});
