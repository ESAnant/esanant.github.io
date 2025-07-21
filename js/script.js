/*------------------------------------------------------------------
[Master JavaScript V16 - The Definitive Portfolio Edition]

Project:    The Definitive ECE Portfolio for Edidi Sai Anant
Author:     Production-Ready Implementation
Version:    16.0 - Final Polish
Features:   Complete Interactive Experience with Performance Optimization
-------------------------------------------------------------------*/

'use strict';

// ===== CONFIGURATION & CONSTANTS =====
const CONFIG = {
    loading: {
        duration: 3000,
        minLoadTime: 2500,
        dischargeDelay: 2000
    },
    cursor: {
        enabled: !('ontouchstart' in window),
        smoothness: 0.15,
        hoverScale: 1.5
    },
    animations: {
        revealOffset: 0.15,
        staggerDelay: 0.1,
        scrollOffset: '20%'
    },
    background: {
        particleCount: window.innerWidth > 768 ? 120 : 60,
        connectionDistance: 120,
        mouseRadius: 150
    },
    performance: {
        enableParticles: true,
        enableCursor: !('ontouchstart' in window),
        enableAnimations: !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
};

// ===== PROJECT DATA =====
const PROJECTS_DATA = [
    {
        id: 'fpga-mlp-accelerator',
        category: 'Hardware Acceleration',
        title: "FPGA Hardware Accelerator for MLP Neural Network",
        tags: ['FPGA', 'HLS', 'Verilog', 'Xilinx Vivado', 'Neural Networks'],
        description: "Developed a comprehensive hardware accelerator on the Xilinx Zynq-7000 FPGA platform to dramatically improve MLP neural network inference performance. The project encompassed implementation across multiple abstraction levels including software prototyping, High-Level Synthesis (HLS), and RTL Verilog coding, with a primary focus on prediction accuracy optimization.",
        highlights: [
            "Achieved significant inference speed improvements through advanced optimization techniques",
            "Implemented sophisticated optimization strategies including pipelining, loop unrolling, and array partitioning",
            "Comprehensive performance profiling and analysis across multiple implementation approaches",
            "Resource utilization optimization achieving optimal area-performance trade-offs"
        ],
        technologies: ['RTL Design', 'AMBA Protocol', 'Xilinx Vivado', 'Verilog HDL', 'High-Level Synthesis', 'FPGA Architecture']
    },
    {
        id: 'digital-circuit-standard-cell',
        category: 'VLSI Design',
        title: "Digital Circuit Design and Standard Cell IP Development",
        tags: ['Cadence Virtuoso', 'VLSI', '40nm Technology', 'Standard Cell IP'],
        description: "Contributed to the comprehensive development of a ring oscillator Standard Cell IP using advanced hierarchical design methodologies in Cadence Virtuoso. The project specifically targeted efficiency optimization for 40nm technology node, with primary focus on minimizing silicon area while maintaining optimal Performance, Voltage, and Temperature (PVT) characteristics.",
        highlights: [
            "Implemented sophisticated hierarchical design approach for maximum reusability and maintainability",
            "Achieved optimal PVT optimization specifically tailored for 40nm technology constraints",
            "Maintained strict compliance with DRC (Design Rule Check) and LVS (Layout Versus Schematic) standards",
            "Developed area-optimized ring oscillator architecture with superior performance characteristics"
        ],
        technologies: ['Cadence Virtuoso Layout Editor', 'DRC/LVS Verification', '40nm Process Technology', 'PVT Analysis', 'Standard Cell Design']
    },
    {
        id: 'in-memory-compute-circuit',
        category: 'Emerging Technologies',
        title: "In-Memory Compute Circuit for Neural Network Acceleration",
        tags: ['NeuroSim', 'PyTorch', 'Quantization', 'In-Memory Computing'],
        description: "Engineered an innovative in-memory compute circuit utilizing NeuroSim and MuMax3 simulation frameworks to accelerate neural network computations directly within memory arrays. The research concentrated on developing advanced quantization and optimization strategies to significantly enhance both model accuracy and computational efficiency.",
        highlights: [
            "Pioneered novel in-memory computing architecture for neural network acceleration",
            "Developed and implemented advanced quantization strategies for optimal performance",
            "Conducted comprehensive multi-precision analysis comparing float64, float32, int8, and int4 data types",
            "Achieved remarkable improvements in computational speed and resource utilization efficiency"
        ],
        technologies: ['NeuroSim Framework', 'MuMax3 Simulation', 'PyTorch', 'Quantization Algorithms', 'Memory Array Design', 'Neural Network Optimization']
    },
    {
        id: 'vlsi-interconnect-modeling',
        category: 'IC Design',
        title: "VLSI Interconnect Modelling and Simulation",
        tags: ['Digital IC Design', 'Cadence Virtuoso', '45nm Technology', 'Signal Integrity'],
        description: "Led comprehensive optimization of critical processor interconnects utilizing advanced Elmore RC delay models and Cadence Virtuoso simulation environment for a sophisticated 2-core processor design at the 45nm technology node. The project focused intensively on navigating complex energy-delay trade-offs to enhance signal integrity and achieve superior overall system performance.",
        highlights: [
            "Successfully optimized interconnect design for 2-core processor architecture",
            "Performed detailed energy-delay trade-off analysis for optimal performance",
            "Implemented advanced signal integrity improvement techniques",
            "Achieved significant system-level performance enhancement through interconnect optimization"
        ],
        technologies: ['Elmore RC Models', 'Cadence Virtuoso', '45nm Process Technology', 'Signal Integrity Analysis', 'Multi-core Architecture', 'Performance Optimization']
    }
];

// ===== MAIN APPLICATION CLASS =====
class PortfolioApp {
    constructor() {
        this.isLoaded = false;
        this.scrollPosition = 0;
        this.activeSection = 'hero';
        this.components = {};
        
        this.init();
    }
    
    init() {
        // Bind methods to preserve context
        this.onDOMReady = this.onDOMReady.bind(this);
        this.onWindowLoad = this.onWindowLoad.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        
        // Initialize based on document state
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', this.onDOMReady);
        } else {
            this.onDOMReady();
        }
        
        window.addEventListener('load', this.onWindowLoad);
    }
    
    onDOMReady() {
        console.log('🚀 Portfolio App: DOM Ready');
        
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Initialize GSAP
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        
        // Initialize core components
        this.initializeComponents();
        this.setupEventListeners();
        this.updateCurrentYear();
    }
    
    onWindowLoad() {
        console.log('🎯 Portfolio App: Window Loaded');
        this.isLoaded = true;
        
        // Initialize resource-heavy components
        this.components.background?.init();
        this.components.projects?.init();
        this.components.animations?.init();
        
        // Hide loader after minimum time
        setTimeout(() => {
            this.components.loader?.hide();
            this.startMainAnimations();
        }, CONFIG.loading.minLoadTime);
    }
    
    initializeComponents() {
        // Initialize components in order of priority
        this.components.cursor = new CustomCursor();
        this.components.loader = new LoadingScreen();
        this.components.navigation = new SmoothNavigation();
        this.components.background = new ParticleBackground();
        this.components.projects = new InteractiveProjects();
        this.components.animations = new ScrollAnimations();
        
        // Initialize synchronous components
        if (CONFIG.performance.enableCursor) {
            this.components.cursor.init();
        }
        
        this.components.loader.init();
        this.components.navigation.init();
    }
    
    setupEventListeners() {
        // Throttled scroll handler
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
                scrollTimeout = null;
            }, 16); // ~60fps
        }, { passive: true });
        
        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(this.handleResize, 250);
        }, { passive: true });
        
        // Visibility change handler
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.components.background?.pause();
            } else {
                this.components.background?.resume();
            }
        });
    }
    
    handleScroll() {
        this.scrollPosition = window.pageYOffset;
        this.updateActiveSection();
        this.updateHeaderState();
    }
    
    handleResize() {
        this.components.background?.handleResize();
        this.components.navigation?.handleResize();
    }
    
    updateActiveSection() {
        const sections = document.querySelectorAll('.content-section');
        const scrollPos = window.pageYOffset + window.innerHeight / 2;
        
        let current = 'hero';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                current = section.id;
            }
        });
        
        if (current !== this.activeSection) {
            this.activeSection = current;
            this.components.navigation?.updateActive(current);
        }
    }
    
    updateHeaderState() {
        const header = document.getElementById('main-header');
        if (header) {
            header.classList.toggle('scrolled', this.scrollPosition > 100);
        }
    }
    
    startMainAnimations() {
        if (!CONFIG.performance.enableAnimations) return;
        
        // Hero entrance animation with enhanced timing
        const tl = gsap.timeline();
        
        tl.from('.hero-badge', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-title .title-line', {
            duration: 1.2,
            y: 60,
            opacity: 0,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.4')
        .from('.hero-subtitle', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.6')
        .from('.hero-stats .stat-item', {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.15,
            ease: 'back.out(1.7)'
        }, '-=0.4')
        .from('.hero-cta > *', {
            duration: 0.6,
            y: 20,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.3');
    }
    
    updateCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

// ===== CUSTOM CURSOR CLASS =====
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorInner = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.isHovering = false;
    }
    
    init() {
        if (!CONFIG.cursor.enabled) return;
        
        this.cursor = document.getElementById('custom-cursor');
        this.cursorInner = this.cursor?.querySelector('.cursor-inner');
        
        if (!this.cursor || !this.cursorInner) return;
        
        this.setupEventListeners();
        this.animate();
        
        console.log('✨ Custom Cursor: Initialized');
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }, { passive: true });
        
        // Enhanced interactive elements detection
        const interactiveElements = `
            a, button, 
            [data-cursor="pointer"], 
            .project-card, 
            .skill-tag, 
            .nav-link,
            .cta-primary,
            .cta-secondary,
            .social-link,
            .resume-download,
            .expand-icon
        `;
        
        document.addEventListener('mouseenter', (e) => {
            if (e.target.matches(interactiveElements)) {
                this.setHover(true);
            }
        }, true);
        
        document.addEventListener('mouseleave', (e) => {
            if (e.target.matches(interactiveElements)) {
                this.setHover(false);
            }
        }, true);
        
        // Handle cursor visibility
        document.addEventListener('mouseleave', () => {
            gsap.to(this.cursor, { duration: 0.3, opacity: 0 });
        });
        
        document.addEventListener('mouseenter', () => {
            gsap.to(this.cursor, { duration: 0.3, opacity: 1 });
        });
    }
    
    setHover(isHovering) {
        this.isHovering = isHovering;
        this.cursorInner.classList.toggle('hover', isHovering);
    }
    
    animate() {
        // Smooth cursor following with easing
        this.currentX += (this.mouseX - this.currentX) * CONFIG.cursor.smoothness;
        this.currentY += (this.mouseY - this.currentY) * CONFIG.cursor.smoothness;
        
        if (this.cursor) {
            this.cursor.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== LOADING SCREEN CLASS =====
class LoadingScreen {
    constructor() {
        this.loadingScreen = null;
        this.sphere = null;
        this.progressBar = null;
        this.startTime = Date.now();
    }
    
    init() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.sphere = document.querySelector('.pulse-sphere');
        this.progressBar = document.querySelector('.progress-bar');
        
        if (!this.loadingScreen) return;
        
        // Prevent body scroll during loading
        document.body.style.overflow = 'hidden';
        
        this.animateProgress();
        console.log('⏳ Loading Screen: Initialized');
    }
    
    animateProgress() {
        if (!this.progressBar) return;
        
        gsap.to(this.progressBar, {
            duration: CONFIG.loading.duration / 1000,
            width: '100%',
            ease: 'power2.out'
        });
    }
    
    hide() {
        if (!this.loadingScreen) return;
        
        const elapsedTime = Date.now() - this.startTime;
        const remainingTime = Math.max(0, CONFIG.loading.minLoadTime - elapsedTime);
        
        setTimeout(() => {
            this.playDischargeAnimation();
        }, remainingTime);
    }
    
    playDischargeAnimation() {
        const tl = gsap.timeline({
            onComplete: () => {
                this.loadingScreen.classList.add('hidden');
                document.body.style.overflow = '';
                console.log('✅ Loading Screen: Hidden');
            }
        });
        
        // Enhanced discharge effect
        tl.to(this.sphere, {
            duration: 0.6,
            scale: 1.3,
            opacity: 1,
            ease: 'power2.out'
        })
        .to(this.sphere, {
            duration: 0.8,
            scale: 0.1,
            opacity: 0,
            ease: 'power3.in'
        }, '-=0.2')
        .to('.loading-text, .loading-progress', {
            duration: 0.4,
            opacity: 0,
            y: -30,
            ease: 'power2.in'
        }, '-=0.6')
        .to(this.loadingScreen, {
            duration: 0.8,
            opacity: 0,
            ease: 'power2.inOut'
        }, '-=0.4');
    }
}

// ===== PARTICLE BACKGROUND CLASS =====
class ParticleBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.animationId = null;
        this.isAnimating = false;
    }
    
    init() {
        if (!CONFIG.performance.enableParticles) return;
        
        this.canvas = document.getElementById('particle-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.createParticles();
        this.setupMouseInteraction();
        this.start();
        
        console.log('🌟 Particle Background: Initialized');
    }
    
    setupCanvas() {
        this.handleResize();
        this.canvas.style.filter = 'blur(0.5px)';
    }
    
    handleResize() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        // Recreate particles on resize
        if (this.particles.length > 0) {
            this.createParticles();
        }
    }
    
    createParticles() {
        this.particles = [];
        const particleCount = Math.min(CONFIG.background.particleCount, window.innerWidth * 0.1);
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.6 + 0.2,
                connections: []
            });
        }
    }
    
    setupMouseInteraction() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        }, { passive: true });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Handle boundaries
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
                particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
                particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            }
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < CONFIG.background.mouseRadius) {
                const force = (CONFIG.background.mouseRadius - distance) / CONFIG.background.mouseRadius;
                particle.x -= dx * force * 0.003;
                particle.y -= dy * force * 0.003;
            }
            
            // Update connections
            particle.connections = [];
            this.particles.forEach(other => {
                if (particle !== other) {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < CONFIG.background.connectionDistance) {
                        particle.connections.push({
                            particle: other,
                            distance: distance
                        });
                    }
                }
            });
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections
        this.particles.forEach(particle => {
            particle.connections.forEach(connection => {
                const opacity = Math.max(0, (1 - connection.distance / CONFIG.background.connectionDistance) * 0.15);
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(connection.particle.x, connection.particle.y);
                this.ctx.strokeStyle = `rgba(0, 169, 255, ${opacity})`;
                this.ctx.lineWidth = 1;
                this.ctx.stroke();
            });
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 169, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
    }
    
    animate() {
        if (!this.isAnimating) return;
        
        this.updateParticles();
        this.drawParticles();
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    start() {
        this.isAnimating = true;
        this.animate();
    }
    
    pause() {
        this.isAnimating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
    
    resume() {
        if (!this.isAnimating) {
            this.start();
        }
    }
}

// ===== SMOOTH NAVIGATION CLASS =====
class SmoothNavigation {
    constructor() {
        this.header = null;
        this.navLinks = null;
        this.mobileToggle = null;
        this.isScrolling = false;
    }
    
    init() {
        this.header = document.getElementById('main-header');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        
        console.log('🧭 Navigation: Initialized');
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection && !this.isScrolling) {
                    this.scrollToSection(targetSection);
                }
            });
        });
    }
    
    scrollToSection(section) {
        this.isScrolling = true;
        
        const offsetTop = section.offsetTop - 80; // Account for header height
        
        if (typeof gsap !== 'undefined') {
            gsap.to(window, {
                duration: 1.2,
                scrollTo: { y: offsetTop },
                ease: 'power3.inOut',
                onComplete: () => {
                    this.isScrolling = false;
                }
            });
        } else {
            // Fallback smooth scroll
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            setTimeout(() => {
                this.isScrolling = false;
            }, 1200);
        }
    }
    
    updateActive(sectionId) {
        this.navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('active', isActive);
        });
    }
    
    setupMobileMenu() {
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => {
                this.header.classList.toggle('mobile-menu-open');
            });
        }
    }
    
    handleResize() {
        // Handle any resize-specific navigation logic
        if (window.innerWidth > 768) {
            this.header?.classList.remove('mobile-menu-open');
        }
    }
}

// ===== INTERACTIVE PROJECTS CLASS =====
class InteractiveProjects {
    constructor() {
        this.projectsGrid = null;
        this.projectCards = [];
    }
    
    init() {
        this.projectsGrid = document.querySelector('.project-grid');
        if (!this.projectsGrid) return;
        
        this.renderProjects();
        this.setupInteractions();
        console.log('📂 Interactive Projects: Initialized');
    }
    
    renderProjects() {
        PROJECTS_DATA.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('project-card', 'reveal');
            card.innerHTML = `
                <div class="project-header">
                    <div>
                        <div class="project-category">${project.category}</div>
                        <h3 class="project-title">${project.title}</h3>
                    </div>
                    <i data-lucide="plus" class="expand-icon"></i>
                </div>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-details">
                    <p class="project-description">${project.description}</p>
                    <div class="project-highlights">
                        <h4>Key Highlights</h4>
                        <ul>
                            ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="project-technologies">
                        <h4>Technologies</h4>
                        <div class="tech-list">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
            this.projectsGrid.appendChild(card);
            lucide.createIcons({ icons: { plus: lucide.icons.plus } });
        });
    }
    
    setupInteractions() {
        this.projectsGrid.addEventListener('click', (e) => {
            const expandIcon = e.target.closest('.expand-icon');
            if (!expandIcon) return;
            
            const card = expandIcon.closest('.project-card');
            if (card) {
                card.classList.toggle('expanded');
                const icon = expandIcon.querySelector('svg');
                if (icon) {
                    icon.remove();
                }
                if (card.classList.contains('expanded')) {
                    lucide.createIcons({ icons: { x: lucide.icons.x } });
                } else {
                    lucide.createIcons({ icons: { plus: lucide.icons.plus } });
                }
            }
        });
    }
}

// ===== SCROLL ANIMATIONS CLASS =====
class ScrollAnimations {
    constructor() {
        this.observer = null;
    }
    
    init() {
        if (!CONFIG.performance.enableAnimations) return;
        
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
            threshold: CONFIG.animations.revealOffset
        });
        
        document.querySelectorAll('.reveal').forEach(el => {
            this.observer.observe(el);
        });
        
        this.setupScrollTriggers();
        console.log('🎭 Scroll Animations: Initialized');
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    setupScrollTriggers() {
        gsap.utils.toArray('.content-section').forEach(section => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top bottom-=100',
                toggleClass: { targets: section, className: 'active-section' },
                once: false
            });
        });
    }
}

// Initialize the app
const app = new PortfolioApp();
