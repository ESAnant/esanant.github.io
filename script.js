/*
 *  SCRIPT.JS
 *  Functionality for Edidi Sai Anant's Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section, .hero-section');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    const clickSound = document.getElementById('click-sound');

    // --- Subtle Sound Effect on Interaction ---
    const playClickSound = () => {
        if (clickSound) {
            clickSound.currentTime = 0;
            clickSound.play().catch(e => console.error("Sound play failed:", e));
        }
    };

    document.querySelectorAll('a, button').forEach(elem => {
        elem.addEventListener('click', playClickSound);
    });

    // --- Active Nav Link on Scroll ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 
    };

    const observer = new IntersectionObserver((entries) => {
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
        observer.observe(section);
    });

    // --- Fade-in Content on Scroll ---
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.content-section').forEach(section => {
        fadeObserver.observe(section);
    });


    // --- Scroll to Top Button Functionality ---
    const handleScroll = () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    };
    
    window.addEventListener('scroll', handleScroll);

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
