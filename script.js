/* ---
Portfolio v3.0 Final JavaScript
--- */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Element & State Setup ---
    const loader = document.getElementById('loader');
    const mainContent = document.querySelector('main');
    const header = document.querySelector('.main-header');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let isScrolling = false;

    // --- 2. Preloader ---
    setTimeout(() => {
        loader.classList.add('is-hidden');
        mainContent.style.opacity = '1';
        header.style.transform = 'translateY(0)';
        // Trigger animations for the first section
        document.querySelector('#hero .fade-in')?.classList.add('is-visible');
    }, 1500);

    // --- 3. Interactive Particle Background ---
    particlesJS('interactive-bg', {
        "particles": { "number":{ "value":60, "density":{ "enable":true, "value_area":800 } }, "color":{ "value":"#8892b0" }, "shape":{ "type":"circle" }, "opacity":{ "value":0.3, "random":true }, "size":{ "value":2, "random":true }, "line_linked":{ "enable":true, "distance":150, "color":"#8892b0", "opacity":0.2, "width":1 }, "move":{ "enable":true, "speed":1, "direction":"none", "out_mode":"out" } },
        "interactivity": { "detect_on":"canvas", "events":{ "onhover":{ "enable":true, "mode":"grab" }, "onclick":{ "enable":true, "mode":"push" } }, "modes":{ "grab":{ "distance":140, "line_linked":{ "opacity":0.5 } }, "push":{ "particles_nb":4 } } },
        "retina_detect":true
    });

    // --- 4. Robust Snap Scrolling & Active Nav Link ---
    const observerOptions = { root: mainContent, threshold: 0.5 };

    const sectionObserver = new IntersectionObserver((entries) => {
        if (isScrolling) return; // Don't interfere with manual scroll
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                // Update nav links
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === sectionId);
                });
                // Trigger fade-in animations
                entry.target.querySelector('.fade-in')?.classList.add('is-visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    // Manual scroll for nav clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            isScrolling = true;
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            // After manual scroll, let the observer take over again
            setTimeout(() => { isScrolling = false; }, 1000);
        });
    });

    // --- 5. Experience Tabs Logic ---
    const tabList = document.querySelector('.tab-list');
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabList?.addEventListener('click', (e) => {
        const clickedTab = e.target.closest('button');
        if (!clickedTab) return;

        tabButtons.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
        });
        clickedTab.classList.add('active');
        clickedTab.setAttribute('aria-selected', 'true');

        const targetPanelId = clickedTab.getAttribute('aria-controls');
        tabPanels.forEach(panel => {
            panel.classList.toggle('active', panel.id === targetPanelId);
        });
    });

    // --- 6. Hover-to-Reveal Project Card Logic ---
    document.querySelectorAll('.project-card').forEach(card => {
        const titleElement = card.querySelector('h4');
        const originalTitle = titleElement.innerHTML;
        const description = card.getAttribute('data-description');

        card.addEventListener('mouseenter', () => {
            titleElement.innerHTML = description;
            titleElement.style.fontSize = '1rem';
        });

        card.addEventListener('mouseleave', () => {
            titleElement.innerHTML = originalTitle;
            titleElement.style.fontSize = '';
        });
    });
});
