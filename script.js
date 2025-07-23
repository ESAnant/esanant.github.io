document.addEventListener('DOMContentLoaded', () => {

    const loader = document.getElementById('loader');
    const header = document.querySelector('.main-header');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const mainContainer = document.querySelector('main');

    // --- 1. Loader & Initial Animation ---
    function initLoader() {
        setTimeout(() => {
            loader.classList.add('hidden');
            header.classList.add('visible');
        }, 1500);
    }
    
    // --- 2. Particle Background ---
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('interactive-bg', {
                "particles": { "number":{ "value":60, "density":{ "enable":true, "value_area":800 } }, "color":{ "value":"#8892b0" }, "shape":{ "type":"circle" }, "opacity":{ "value":0.3, "random":true }, "size":{ "value":2, "random":true }, "line_linked":{ "enable":true, "distance":150, "color":"#8892b0", "opacity":0.2, "width":1 }, "move":{ "enable":true, "speed":1, "direction":"none", "out_mode":"out" } },
                "interactivity": { "detect_on":"canvas", "events":{ "onhover":{ "enable":true, "mode":"grab" }, "onclick":{ "enable":true, "mode":"push" } }, "modes":{ "grab":{ "distance":140, "line_linked":{ "opacity":0.5 } }, "push":{ "particles_nb":4 } } },
                "retina_detect":true
            });
        }
    }

    // --- 3. Navigation Highlighting & Content Reveal ---
    function initNavigation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionContainer = entry.target.querySelector('.section-container');
                if (entry.isIntersecting) {
                    sectionContainer.classList.add('visible');
                    const sectionId = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.dataset.section === sectionId);
                    });
                }
            });
        }, { root: mainContainer, threshold: 0.5 }); // Adjust threshold for better detection

        sections.forEach(section => observer.observe(section));

        // Handle smooth scroll for nav link clicks
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // --- 4. Experience Tabs ---
    function initExperienceTabs() {
        const tabList = document.querySelector('.tab-list');
        if (!tabList) return;

        tabList.addEventListener('click', (e) => {
            const tabButton = e.target.closest('button');
            if (!tabButton) return;

            const targetTab = tabButton.dataset.tab;
            
            tabList.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            tabButton.classList.add('active');

            const panelContainer = document.querySelector('.tab-panels');
            panelContainer.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
            panelContainer.querySelector(`[data-panel='${targetTab}']`).classList.add('active');
        });
    }
    
    // --- Initialize All Components ---
    initLoader();
    initParticles();
    initNavigation();
    initExperienceTabs();
});
