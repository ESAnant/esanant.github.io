// === ULTIMATE PORTFOLIO SCRIPT ===
// We use a class to encapsulate all functionality and keep the global scope clean.
class UltimatePortfolio {
    constructor() {
        // Element cache
        this.elements = {
            preloader: document.getElementById('preloader'),
            progressBar: document.querySelector('.progress-bar'),
            loadSound: document.getElementById('load-sound'),
            muteBtn: document.getElementById('mute-btn'),
            header: document.getElementById('main-header'),
            mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
            nav: document.getElementById('main-nav'),
            navLinks: document.querySelectorAll('.nav-link'),
            sections: document.querySelectorAll('.content-section, #hero'),
            scrollToTopBtn: document.getElementById('scroll-to-top'),
            heroVisualContainer: document.getElementById('interactive-visual')
        };

        // State variables
        this.lastScrollY = window.scrollY;
        this.isSoundMuted = true; // Muted by default for a better UX

        this.init();
    }

    // --- INITIALIZATION ---
    init() {
        this.initPreloader();
        this.initEventListeners();
        this.initAudio();
        this.initMobileNav();
        this.initScrollAnimations();
        this.initNavHighlighting();
        this.initScrollToTop();
        
        // Load Three.js dynamically to avoid blocking initial render
        this.loadThreeJS().then(() => {
            if (this.elements.heroVisualContainer) {
                this.initHeroVisual();
            }
        }).catch(error => console.error("Could not load Three.js", error));

        // Fallback for Lucide icons if not loaded
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    initPreloader() {
        // Simulate loading progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 20;
            if (progress > 100) progress = 100;
            this.elements.progressBar.style.width = `${progress}%`;

            if (progress === 100) {
                clearInterval(interval);
                window.addEventListener('load', () => {
                    setTimeout(() => {
                        this.elements.preloader.classList.add('loaded');
                        document.body.style.overflow = '';
                        this.elements.header.style.opacity = '1';
                    }, 500);
                });
            }
        }, 150);
    }

    initEventListeners() {
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        this.elements.scrollToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        this.elements.muteBtn.addEventListener('click', () => this.toggleMute());
    }
    
    // --- CORE FEATURES ---
    
    initAudio() {
        this.elements.loadSound.muted = this.isSoundMuted;
        this.updateMuteIcon();

        // Autoplay requires user interaction. We'll play it on the first click.
        const playOnFirstInteraction = () => {
            this.elements.loadSound.play().catch(() => {});
            window.removeEventListener('click', playOnFirstInteraction);
        };
        window.addEventListener('click', playOnFirstInteraction, { once: true });
    }

    initMobileNav() {
        this.elements.mobileMenuToggle.addEventListener('click', () => {
            const isActive = this.elements.nav.classList.toggle('mobile-active');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.elements.nav.classList.contains('mobile-active')) {
                    this.elements.nav.classList.remove('mobile-active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    initScrollAnimations() {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -150px 0px' });

        this.elements.sections.forEach(section => observer.observe(section));
    }

    initNavHighlighting() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.elements.navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, { rootMargin: `-50% 0px -50% 0px` });

        document.querySelectorAll('section[id]').forEach(section => {
            if (section.id) observer.observe(section);
        });
    }

    initScrollToTop() {
        const observer = new IntersectionObserver(entries => {
            const heroEntry = entries[0];
            this.elements.scrollToTopBtn.classList.toggle('visible', !heroEntry.isIntersecting);
        });
        observer.observe(document.getElementById('hero'));
    }

    // --- HERO VISUAL (THREE.JS) ---

    loadThreeJS() {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    initHeroVisual() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        this.elements.heroVisualContainer.appendChild(renderer.domElement);

        // Particle Geometry
        const particlesGeometry = new THREE.BufferGeometry;
        const count = 5000;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 10;
        }
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        // Particle Material
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            sizeAttenuation: true,
            color: 0x007aff,
            transparent: true,
            opacity: 0.5
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particles);

        camera.position.z = 5;
        
        // Mouse movement interaction
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            particles.rotation.y += 0.0002;
            particles.rotation.x += 0.0002;
            
            // Add subtle mouse tracking to the camera
            camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.02;
            camera.position.y += (mouseY * 0.1 - camera.position.y) * 0.02;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    // --- EVENT HANDLERS & UTILITIES ---

    handleScroll() {
        const currentScrollY = window.scrollY;

        // Hide header on scroll down, show on scroll up
        if (currentScrollY > this.lastScrollY && currentScrollY > this.elements.header.clientHeight) {
            this.elements.header.classList.add('hidden');
        } else {
            this.elements.header.classList.remove('hidden');
        }

        this.lastScrollY = currentScrollY;
    }
    
    toggleMute() {
        this.isSoundMuted = !this.isSoundMuted;
        this.elements.loadSound.muted = this.isSoundMuted;
        this.updateMuteIcon();
    }
    
    updateMuteIcon() {
        const icon = this.isSoundMuted ? "volume-x" : "volume-2";
        this.elements.muteBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
        lucide.createIcons();
    }
}

// Instantiate the portfolio logic once the DOM is ready.
document.addEventListener('DOMContentLoaded', () => {
    new UltimatePortfolio();
});
