document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Custom Cursor Logic ---
    const cursor = document.querySelector('.cursor');
    const interactiveElements = document.querySelectorAll('a, .project-card');

    document.addEventListener('mousemove', e => {
        gsap.to(cursor, {
            duration: 0.3,
            x: e.clientX,
            y: e.clientY,
            ease: 'power2.out'
        });
    });

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                duration: 0.3,
                scale: 2.5,
                backgroundColor: 'rgba(217, 138, 109, 0.5)',
                borderColor: 'transparent'
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                duration: 0.3,
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'var(--accent-color)'
            });
        });
    });

    // --- 2. GSAP Animation Timelines ---
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Entrance Animation
    const heroTl = gsap.timeline({ delay: 0.2 });
    heroTl.to('.hero__title', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' })
          .to('.hero__subtitle', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5')
          .to('.hero__description', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
          .to('.hero__socials', { autoAlpha: 1, y: 0, duration: 0.5 }, '-=0.4');

    // --- 3. Scroll-Triggered Animations for Content Sections ---
    const sections = document.querySelectorAll('.content-section');

    sections.forEach(section => {
        const sectionElements = section.querySelectorAll('.section-title, .experience-card, .project-card, .dual-grid > div');
        
        gsap.from(sectionElements, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%', // Start animation when the top of the section is 80% from the top of the viewport
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            },
            autoAlpha: 0,
            y: 50,
            duration: 0.8,
            stagger: 0.2, // Animate elements one by one
            ease: 'power3.out'
        });
    });

});
