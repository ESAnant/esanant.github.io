document.addEventListener('DOMContentLoaded', () => {

    const main = document.querySelector('main');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentSection = 0;
    let isScrolling = false;

    // --- Preloader ---
    setTimeout(() => {
        document.getElementById('loader').classList.add('is-hidden');
        main.style.opacity = '1';
        document.querySelector('.main-header').style.transform = 'translateY(0)';
        document.querySelector('#hero .fade-in')?.classList.add('is-visible');
    }, 500);

    // --- Interactive Particle Background ---
    particlesJS('interactive-bg', { /* particles.js config from previous step */ });

    // --- Smooth Snap Scrolling ---
    function smoothScrollTo(index) {
        if (index < 0 || index >= sections.length) return;
        isScrolling = true;
        currentSection = index;
        main.scrollTo({ top: sections[index].offsetTop, behavior: 'smooth' });
        setTimeout(() => { isScrolling = false; }, 1200);
    }

    main.addEventListener('wheel', (e) => {
        if (isScrolling) { e.preventDefault(); return; }
        e.preventDefault();
        const direction = e.deltaY > 0 ? 1 : -1;
        smoothScrollTo(currentSection + direction);
    }, { passive: false });

    // --- Nav Link Highlighting & Fading In Sections ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelector('.fade-in')?.classList.add('is-visible');
                const sectionId = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === sectionId);
                });
                currentSection = Array.from(sections).indexOf(entry.target);
            }
        });
    }, { root: main, threshold: 0.6 });
    sections.forEach(section => observer.observe(section));

    // --- Experience Tabs ---
    const tabList = document.querySelector('.tab-list');
    tabList?.addEventListener('click', (e) => {
        const tab = e.target.closest('button');
        if (!tab) return;
        tabList.querySelectorAll('button').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const panelId = tab.dataset.tab;
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        document.querySelector(`.tab-panel[data-panel="${panelId}"]`).classList.add('active');
    });

    // --- 3D Parallax Card Effect ---
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const glow = card.querySelector('.card-glow');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cardContent = card.querySelector('.card-content');
            
            const rotateX = (y / rect.height - 0.5) * -10; // -5 to 5 degrees
            const rotateY = (x / rect.width - 0.5) * 10;   // -5 to 5 degrees
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            glow.style.setProperty('--mouse-x', `${x}px`);
            glow.style.setProperty('--mouse-y', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
});
