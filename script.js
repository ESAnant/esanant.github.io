document.addEventListener('DOMContentLoaded', () => {
    // --- CORE INITIALIZATION ---
    const portfolio = {
        lastScrollY: window.scrollY,
        ticking: false,
        sections: document.querySelectorAll('.premium-section'),
        navLinks: document.querySelectorAll('.nav-link'),
        header: document.querySelector('.premium-header'),
        preloader: document.getElementById('preloader'),
        progressBar: document.querySelector('.progress-bar'),

        init() {
            this.initPreloader();
            this.initEventListeners();
            lucide.createIcons();
        },

        // --- EVENT LISTENERS ---
        initEventListeners() {
            window.addEventListener('scroll', () => this.onScroll());
            document.querySelector('#mobile-menu-toggle').addEventListener('click', this.toggleMobileMenu);
            document.querySelectorAll('.premium-nav .nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    const nav = document.querySelector('.premium-nav');
                    if (nav.classList.contains('mobile-active')) {
                        this.toggleMobileMenu();
                    }
                });
            });
            this.initExperienceTabs();
            this.initScrollToTop();
        },

        // --- PRELOADER ---
        initPreloader() {
            document.body.style.overflow = 'hidden';
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 20;
                this.progressBar.style.width = `${Math.min(progress, 100)}%`;
                if (progress >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        this.preloader.classList.add('loaded');
                        document.body.style.overflow = '';
                        this.startPageAnimations();
                    }, 500);
                }
            }, 200);
        },

        // --- PAGE LOAD ANIMATIONS ---
        startPageAnimations() {
            // Animate hero text
            const heroContent = document.querySelector('.hero-content');
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
            
            // Start typing effect for subtitle
            const subtitle = document.querySelector('.hero-subtitle');
            if (subtitle) {
                const phrases = [
                    "Master's Graduate in Electrical Engineering.",
                    "Specializing in VLSI & Computer Architecture.",
                    "Passionate about semiconductor innovation."
                ];
                let phraseIndex = 0;
                let charIndex = 0;
                let isDeleting = false;

                const type = () => {
                    const currentPhrase = phrases[phraseIndex];
                    let displayText;

                    if (isDeleting) {
                        displayText = currentPhrase.substring(0, charIndex--);
                    } else {
                        displayText = currentPhrase.substring(0, charIndex++);
                    }
                    
                    subtitle.innerHTML = `${displayText}<span class="typing-cursor">|</span>`;

                    let typeSpeed = isDeleting ? 50 : 120;

                    if (!isDeleting && charIndex === currentPhrase.length) {
                        typeSpeed = 2000; // Pause at end
                        isDeleting = true;
                    } else if (isDeleting && charIndex === 0) {
                        isDeleting = false;
                        phraseIndex = (phraseIndex + 1) % phrases.length;
                    }

                    setTimeout(type, typeSpeed);
                };
                type();
            }
        },

        // --- SCROLL HANDLING ---
        onScroll() {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.updateOnScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        },
        
        updateOnScroll() {
            const scrollY = window.scrollY;

            // Header style and visibility
            if (scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
            if (scrollY > this.lastScrollY && scrollY > this.header.offsetHeight) {
                this.header.classList.add('hidden');
            } else {
                this.header.classList.remove('hidden');
            }
            this.lastScrollY = scrollY;
            
            // Section visibility animations
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - window.innerHeight * 0.75;
                if (scrollY > sectionTop) {
                    section.classList.add('is-visible');
                }
            });

            // Update active nav link
            let currentSectionId = '';
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop - this.header.offsetHeight;
                const sectionHeight = section.offsetHeight;
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    currentSectionId = section.id;
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
            
            // Scroll to top button visibility
            const scrollToTopBtn = document.querySelector('.scroll-to-top');
            if (scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        },
        
        // --- UI COMPONENTS ---
        toggleMobileMenu() {
            const toggleBtn = document.getElementById('mobile-menu-toggle');
            const nav = document.querySelector('.premium-nav');
            toggleBtn.classList.toggle('is-active');
            nav.classList.toggle('mobile-active');
        },

        initExperienceTabs() {
            const tabContainer = document.querySelector('.experience-tabs');
            const contentContainer = document.querySelector('.experience-content');

            tabContainer.addEventListener('click', (e) => {
                const clickedTab = e.target.closest('.tab-btn');
                if (!clickedTab) return;

                // Update tabs
                tabContainer.querySelector('.active').classList.remove('active');
                clickedTab.classList.add('active');

                // Update content
                contentContainer.querySelector('.active').classList.remove('active');
                const targetPanelId = clickedTab.dataset.tab;
                document.getElementById(targetPanelId).classList.add('active');
            });
        },
        
        initScrollToTop() {
            const scrollBtn = document.querySelector('.scroll-to-top');
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    };

    // --- Start Everything ---
    portfolio.init();
});

// Add a simple style for the typing cursor directly in the JS
const style = document.createElement('style');
style.innerHTML = `
    .typing-cursor {
        animation: blink 0.7s infinite;
        color: var(--accent-gold);
    }
    @keyframes blink {
        50% { opacity: 0; }
    }
    .hero-content {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
`;
document.head.appendChild(style);
