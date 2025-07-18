// Wait for the DOM to be fully loaded before running any scripts
document.addEventListener('DOMContentLoaded', () => {

    // === ELEMENT SELECTORS ===
    const preloader = document.getElementById('preloader');
    const loadSound = document.getElementById('load-sound');
    const muteBtn = document.getElementById('mute-btn');
    const volumeIcon = muteBtn.querySelector('[data-lucide="volume-2"]');
    const muteIcon = muteBtn.querySelector('[data-lucide="volume-x"]');
    const header = document.querySelector('.premium-header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('.premium-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.premium-section');
    let lastScrollY = window.scrollY;

    // === INITIALIZATION ===

    // Initialize Lucide Icons
    lucide.createIcons();

    // Preloader and Sound Logic
    const initPreloader = () => {
        loadSound.muted = false; // Start with sound enabled
        // Try to play sound on first interaction if autoplay is blocked
        const playSound = () => {
            loadSound.play().catch(() => {
                // Autoplay was blocked, user needs to interact first.
                // The mute button will still function.
            });
            window.removeEventListener('click', playSound);
            window.removeEventListener('scroll', playSound);
        };
        window.addEventListener('click', playSound, { once: true });
        window.addEventListener('scroll', playSound, { once: true });
        
        // Hide preloader after a delay
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 1200);
    };

    // Mute Button Functionality
    const initMuteButton = () => {
        muteBtn.addEventListener('click', () => {
            loadSound.muted = !loadSound.muted;
            volumeIcon.style.display = loadSound.muted ? 'none' : 'block';
            muteIcon.style.display = loadSound.muted ? 'block' : 'none';
        });
    };

    // Header Scroll Effects
    const handleHeaderScroll = () => {
        const currentScrollY = window.scrollY;

        // Add scrolled class for background blur effect
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide header on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > varToPx('--header-height')) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    };
    
    // Mobile Navigation
    const initMobileNav = () => {
        mobileMenuToggle.addEventListener('click', () => {
            const isMenuOpen = mobileMenuToggle.classList.toggle('is-active');
            nav.classList.toggle('is-open', isMenuOpen);
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
            mobileMenuToggle.setAttribute('aria-expanded', isMenuOpen);
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('is-open')) {
                    mobileMenuToggle.classList.remove('is-active');
                    nav.classList.remove('is-open');
                    document.body.style.overflow = '';
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    };

    // Animate sections on scroll
    const initScrollAnimations = () => {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -100px 0px' });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    };

    // Update active navigation link on scroll
    const initNavHighlighting = () => {
        const navObserver = new IntersectionObserver((entries) => {
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
        }, { rootMargin: `-50% 0px -50% 0px` });

        document.querySelectorAll('section[id]').forEach(section => {
            navObserver.observe(section);
        });
    };
    
    // Dynamic Silicon Wafer SVG generation
    const createSiliconWaferSVG = () => {
        const container = document.getElementById('silicon-wafer');
        if (!container) return;

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke-width", "1");
        
        // Main circle
        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", "50");
        circle.setAttribute("cy", "50");
        circle.setAttribute("r", "48");
        svg.appendChild(circle);

        // Grid lines
        for (let i = 1; i < 10; i++) {
            // Horizontal
            const hLine = document.createElementNS(svgNS, "line");
            hLine.setAttribute("x1", "10");
            hLine.setAttribute("y1", i * 10);
            hLine.setAttribute("x2", "90");
            hLine.setAttribute("y2", i * 10);
            hLine.style.opacity = "0.3";
            svg.appendChild(hLine);
            // Vertical
            const vLine = document.createElementNS(svgNS, "line");
            vLine.setAttribute("x1", i * 10);
            vLine.setAttribute("y1", "10");
            vLine.setAttribute("x2", i * 10);
            vLine.setAttribute("y2", "90");
            vLine.style.opacity = "0.3";
            svg.appendChild(vLine);
        }
        container.appendChild(svg);
    };

    // === UTILITY FUNCTIONS ===

    // Helper to get CSS variable value and convert to pixels
    const varToPx = (varName) => {
        return parseFloat(getComputedStyle(document.documentElement).getPropertyValue(varName));
    };


    // === EVENT LISTENERS ===
    window.addEventListener('scroll', handleHeaderScroll);
    
    // === RUN INITIALIZATIONS ===
    initPreloader();
    initMuteButton();
    initMobileNav();
    initScrollAnimations();
    initNavHighlighting();
    createSiliconWaferSVG();

});

