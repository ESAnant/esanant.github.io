/* ---
Portfolio v4.2 Final JavaScript - The Ultimate Edition
--- */

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
            document.body.style.overflow = 'visible'; // Allow scrolling after load
            
            // Initial reveal of the first section
            const firstSection = sections[currentSectionIndex];
            firstSection.querySelector('.section-container').classList.add('visible');
            navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === firstSection.id));

        }, 1500); // Simulated loading time
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

    // --- 3. Ultimate Snap Navigation ---
    function scrollToSection(index) {
        if (isScrolling || index < 0 || index >= sections.length) return;
        
        isScrolling = true;
        currentSectionIndex = index;
        
        window.scrollTo({
            top: sections[index].offsetTop,
            behavior: 'smooth'
        });

        // Update nav links and reveal section content
        const targetSection = sections[index];
        targetSection.querySelector('.section-container').classList.add('visible');
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === targetSection.id);
        });

        // Debounce to prevent scroll spamming
        setTimeout(() => { isScrolling = false; }, 1000); 
    }

    // Handle user-initiated scroll (wheel)
    window.addEventListener('wheel', (event) => {
        if (isScrolling || window.innerWidth <= 768) return;
        event.preventDefault();
        
        const direction = event.deltaY > 0 ? 1 : -1;
        scrollToSection(currentSectionIndex + direction);
    }, { passive: false });

    // Handle keyboard navigation
    window.addEventListener('keydown', (event) => {
        if (isScrolling || window.innerWidth <= 768) return;
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            scrollToSection(currentSectionIndex + 1);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            scrollToSection(currentSectionIndex - 1);
        }
    });

    // Handle nav link clicks
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection(index);
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
    initNavigation();
    initExperienceTabs();

});
