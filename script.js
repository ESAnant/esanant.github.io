document.addEventListener('DOMContentLoaded', () => {

    const loader = document.getElementById('loader');
    const header = document.querySelector('.main-header');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let currentSectionIndex = 0;
    let isScrolling = false;

    // --- 1. Loader & Initial Animation ---
    function initLoader() {
        setTimeout(() => {
            loader.classList.add('hidden');
            header.classList.add('visible');
            document.body.style.overflow = 'visible';
            
            // Set initial positions for all sections
            sections.forEach((section, index) => {
                section.style.transform = `translateY(${index * 100}vh)`;
            });

            // Make the first section active
            sections[currentSectionIndex].classList.add('active');
            navLinks[currentSectionIndex].classList.add('active');
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

    // --- 3. Superior JS-Driven Snap Navigation ---
    function scrollToSection(index) {
        if (isScrolling || index < 0 || index >= sections.length) return;
        
        isScrolling = true;
        currentSectionIndex = index;

        // Move all sections
        sections.forEach((section, i) => {
            section.style.transform = `translateY(${(i - currentSectionIndex) * 100}vh)`;
        });

        // Update active classes
        sections.forEach(section => section.classList.remove('active'));
        sections[currentSectionIndex].classList.add('active');
        
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[currentSectionIndex].classList.add('active');

        setTimeout(() => { isScrolling = false; }, 1200); // Cooldown matches CSS transition
    }

    if (window.innerWidth > 768) {
        window.addEventListener('wheel', (event) => {
            if (isScrolling) return;
            const direction = event.deltaY > 0 ? 1 : -1;
            scrollToSection(currentSectionIndex + direction);
        }, { passive: true });

        window.addEventListener('keydown', (event) => {
            if (isScrolling) return;
            if (event.key === 'ArrowDown') scrollToSection(currentSectionIndex + 1);
            else if (event.key === 'ArrowUp') scrollToSection(currentSectionIndex - 1);
        });
    }

    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.innerWidth > 768) {
                scrollToSection(index);
            } else {
                document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

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
    initExperienceTabs();
    
    // Recalculate section positions on resize if not on mobile
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
             sections.forEach((section, i) => {
                section.style.transform = `translateY(${(i - currentSectionIndex) * 100}vh)`;
            });
        }
    });
});
