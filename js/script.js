/*------------------------------------------------------------------
[Master JavaScript V15 - The Definitive Interactive Portfolio]

Project:    The Definitive ECE Portfolio for Edidi Sai Anant
Author:     Enhanced for production-ready deployment
Version:    15.0 - Professional Edition
Features:   Custom Cursor, Loading Animations, Scroll Effects, 
           Interactive Projects, Background Animation, GSAP Integration
-------------------------------------------------------------------*/

'use strict';

// ===== GLOBAL CONFIGURATION =====
const CONFIG = {
    loading: {
        duration: 3000,
        minLoadTime: 2500
    },
    cursor: {
        enabled: !('ontouchstart' in window),
        smoothness: 0.15
    },
    animations: {
        revealOffset: 0.2,
        staggerDelay: 0.1
    },
    background: {
        particleCount: 150,
        connectionDistance: 100
    }
};

// ===== PROJECT DATA =====
const PROJECTS_DATA = [
    {
        id: 'digital-circuit-design',
        title: "Digital Circuit Design and Standard Cell IP Development",
        category: "VLSI Design",
        tags: ['Cadence Virtuoso', 'VLSI', '40nm Technology', 'Standard Cell IP'],
        description: "Contributed to the creation of a ring oscillator Standard Cell IP using a hierarchical design approach in Cadence Virtuoso, targeting efficiency in 40nm technology with a focus on minimizing area while optimizing energy-performance. Ensured design integrity through strict adherence to DRC and LVS standards.",
        technologies: ['Cadence Virtuoso Layout Editor', 'DRC/LVS Verification', '40nm Process Technology'],
        highlights: [
            "Hierarchical design methodology implementation",
            "PVT optimization for 40nm technology node",
            "Strict DRC and LVS compliance verification",
            "Area-optimized ring oscillator architecture"
        ]
    },
    {
        id: 'fpga-mlp-accelerator',
        title: "FPGA Hardware Accelerator for MLP Neural Network",
        category: "Hardware Acceleration",
        tags: ['FPGA', 'HLS', 'Verilog', 'Xilinx Vivado', 'Neural Networks'],
        description: "Developed a hardware accelerator on the Xilinx Zynq-7000 FPGA to improve MLP neural network inference. Implemented designs in software, HLS, and Verilog, focusing on prediction accuracy. Conducted profiling and optimization using pipelining, loop unrolling, and array partitioning, achieving significant speed and efficiency gains.",
        technologies: ['RTL Design', 'AMBA', 'Xilinx Vivado', 'Verilog HDL', 'High-Level Synthesis'],
        highlights: [
            "Significant inference speed improvements",
            "Advanced optimization techniques implementation",
            "Multi-platform design approach (SW/HLS/RTL)",
            "Resource utilization optimization"
        ]
    },
    {
        id: 'in-memory-compute',
        title: "In-Memory Compute Circuit for Neural Network Acceleration",
        category: "Memory Technology",
        tags: ['NeuroSim', 'PyTorch', 'Quantization', 'In-Memory Computing'],
        description: "Designed an in-memory compute circuit using NeuroSim and MuMax3 to accelerate neural network computations. Focused on quantization and optimization techniques to enhance accuracy and efficiency. Conducted simulations in PyTorch, comparing different data types (float64, float32, int8, int4) to analyze model performance.",
        technologies: ['NeuroSim', 'MuMax3', 'PyTorch', 'Quantization Algorithms'],
        highlights: [
            "Novel in-memory computing architecture",
            "Advanced quantization strategies",
            "Multi-precision data type analysis",
            "Significant computational efficiency gains"
        ]
    },
    {
        id: 'vlsi-interconnect-modeling',
        title: "VLSI Interconnect Modelling and Simulation",
        category: "IC Design",
        tags: ['Digital IC Design', 'Cadence', '45nm Technology', 'Signal Integrity'],
        description: "Engaged in optimizing processor interconnects using Elmore RC models and Cadence Virtuoso for a 2-core processor at 45nm technology, focusing on energy-delay tradeoffs to enhance system efficiency. Combined theory with practice to address VLSI design challenges, improving signal integrity and system performance.",
        technologies: ['Elmore RC Models', 'Cadence Virtuoso', '45nm Process', 'Signal Integrity Analysis'],
        highlights: [
            "2-core processor interconnect optimization",
            "Energy-delay tradeoff analysis",
            "Advanced signal integrity improvements",
            "System-level performance enhancement"
        ]
    }
];

// ===== APPLICATION CLASS =====
class PortfolioApp {
    constructor() {
        this.isLoaded = false;
        this.scrollPosition = 0;
        this.activeSection = 'home';
        
        // Initialize components
        this.cursor = new CustomCursor();
        this.loader = new LoadingScreen();
        this.background = new AnimatedBackground();
        this.navigation = new SmoothNavigation();
        this.projects = new InteractiveProjects();
        this.animations = new ScrollAnimations();
        
        this.init();
    }
    
    init() {
        // Wait for DOM and all resources
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
        
        window.addEventListener('load', () => this.onWindowLoad());
    }
    
    onDOMReady() {
        // Initialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Initialize GSAP
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        
        // Start components that don't need full load
        this.cursor.init();
        this.loader.init();
        this.navigation.init();
        this.setupEventListeners();
        this.updateCurrentYear();
    }
    
    onWindowLoad() {
        this.isLoaded = true;
        
        // Initialize remaining components
        this.background.init();
        this.projects.init();
        this.animations.init();
        
        // Start the app
        setTimeout(() => {
            this.loader.hide();
            this.startMainAnimations();
        }, CONFIG.loading.minLoadTime);
    }
    
    setupEventListeners() {
        // Scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            this.scrollPosition = window.pageYOffset;
            
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.updateActiveSection();
            }, 100);
        }, { passive: true });
        
        // Resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.background.handleResize();
            }, 250);
        }, { passive: true });
        
        // Visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.background.pause();
            } else {
                this.background.resume();
            }
        });
    }
    
    updateActiveSection() {
        const sections = document.querySelectorAll('.section-container');
        let current = 'home';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                current = section.id;
            }
        });
        
        if (current !== this.activeSection) {
            this.activeSection = current;
            this.navigation.updateActive(current);
        }
    }
    
    startMainAnimations() {
        // Hero entrance animation
        const heroTimeline = gsap.timeline();
        
        heroTimeline
            .from('.hero-badge', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: 'power3.out'
            })
            .from('.hero-title .title-line', {
                duration: 1,
                y: 50,
                opacity: 0,
                stagger: 0.2,
                ease: 'power3.out'
            }, '-=0.3')
            .from('.hero-subtitle', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: 'power3.out'
            }, '-=0.5')
            .from('.hero-stats .stat-item', {
                duration: 0.6,
                y: 20,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.3')
            .from('.hero-cta .cta-primary, .hero-cta .cta-secondary', {
                duration: 0.6,
                y: 20,
                opacity: 0,
                stagger: 0.1,
                ease: 'power2.out'
            }, '-=0.2');
    }
    
    updateCurrentYear() {
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
}

// ===== CUSTOM CURSOR =====
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
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // Interactive elements
        const interactiveElements = 'a, button, [data-cursor="pointer"], .project-card, .skill-tag, .nav-link';
        
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
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            gsap.to(this.cursor, { duration: 0.2, opacity: 0 });
        });
        
        document.addEventListener('mouseenter', () => {
            gsap.to(this.cursor, { duration: 0.2, opacity: 1 });
        });
    }
    
    setHover(isHovering) {
        this.isHovering = isHovering;
        this.cursorInner.classList.toggle('hover', isHovering);
    }
    
    animate() {
        // Smooth following animation
        this.currentX += (this.mouseX - this.currentX) * CONFIG.cursor.smoothness;
        this.currentY += (this.mouseY - this.currentY) * CONFIG.cursor.smoothness;
        
        if (this.cursor) {
            this.cursor.style.transform = `translate3d(${this.currentX}px, ${this.currentY}px, 0)`;
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===== LOADING SCREEN =====
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
        
        if (this.progressBar) {
            this.animateProgress();
        }
        
        // Add discharge animation elements
        this.createDischargeEffect();
    }
    
    animateProgress() {
        gsap.to(this.progressBar, {
            duration: CONFIG.loading.duration / 1000,
            width: '100%',
            ease: 'power2.out'
        });
    }
    
    createDischargeEffect() {
        // Create additional visual elements for the discharge effect
        if (this.sphere) {
            const rings = [];
            for (let i = 0; i < 3; i++) {
                const ring = document.createElement('div');
                ring.className = 'discharge-ring';
                ring.style.cssText = `
                    position: absolute;
                    inset: ${-20 * (i + 1)}px;
                    border: 2px solid var(--accent-primary);
                    border-radius: 50%;
                    opacity: 0;
                `;
                this.sphere.appendChild(ring);
                rings.push(ring);
            }
            this.dischargeRings = rings;
        }
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
        const timeline = gsap.timeline({
            onComplete: () => {
                this.loadingScreen.classList.add('hidden');
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Discharge rings animation
        if (this.dischargeRings) {
            timeline.to(this.dischargeRings, {
                duration: 0.6,
                scale: 2,
                opacity: 1,
                stagger: 0.1,
                ease: 'power2.out'
            });
            
            timeline.to(this.dischargeRings, {
                duration: 0.4,
                scale: 3,
                opacity: 0,
                ease: 'power2.in'
            }, '-=0.2');
        }
        
        // Sphere vaporization
        timeline.to(this.sphere, {
            duration: 0.8,
            scale: 0.1,
            opacity: 0,
            ease: 'power2.in'
        }, '-=0.6');
        
        // Loading text fade
        timeline.to('.loading-text, .loading-progress', {
            duration: 0.4,
            opacity: 0,
            y: -20,
            ease: 'power2.in'
        }, '-=0.6');
        
        // Final screen fade
        timeline.to(this.loadingScreen, {
            duration: 0.6,
            opacity: 0,
            ease: 'power2.inOut'
        }, '-=0.2');
    }
}

// ===== ANIMATED BACKGROUND =====
class AnimatedBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.isAnimating = false;
    }
    
    init() {
        this.canvas = document.getElementById('bg-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.createParticles();
        this.start();
    }
    
    setupCanvas() {
        this.handleResize();
        this.canvas.style.filter = 'blur(0.5px)';
    }
    
    handleResize() {
        if (!this.canvas) return;
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        
        for (let i = 0; i < CONFIG.background.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.2,
                connections: []
            });
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
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
        
        // Draw connections first
        this.particles.forEach(particle => {
            particle.connections.forEach(connection => {
                const opacity = (1 - connection.distance / CONFIG.background.connectionDistance) * 0.1;
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(connection.particle.x, connection.particle.y);
                this.ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                this.ctx.stroke();
            });
        });
        
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
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

// ===== SMOOTH NAVIGATION =====
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
        this.setupScrollSpy();
        this.setupMobileMenu();
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    this.scrollToSection(targetSection);
                }
            });
        });
    }
    
    scrollToSection(section) {
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        
        gsap.to(window, {
            duration: 1.2,
            scrollTo: {
                y: section,
                offsetY: 80
            },
            ease: 'power3.inOut',
            onComplete: () => {
                this.isScrolling = false;
            }
        });
    }
    
    setupScrollSpy() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                        this.updateActive(entry.target.id);
                    }
                });
            },
            {
                threshold: [0.5],
                rootMargin: '-40px 0px -40px 0px'
            }
        );
        
        document.querySelectorAll('.section-container').forEach(section => {
            observer.observe(section);
        });
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
}

// ===== INTERACTIVE PROJECTS =====
class InteractiveProjects {
    constructor() {
        this.projectsGrid = null;
        this.projectCards = [];
    }
    
    init() {
        this.projectsGrid = document.querySelector('.projects-grid');
        if (!this.projectsGrid) return;
        
        this.renderProjects();
        this.setupInteractions();
    }
    
    renderProjects() {
        this.projectsGrid.innerHTML = '';
        
        PROJECTS_DATA.forEach((project, index) => {
            const card = this.createProjectCard(project, index);
            this.projectsGrid.appendChild(card);
            this.projectCards.push(card);
        });
        
        // Reinitialize Lucide icons
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
    
    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-project-id', project.id);
        card.style.setProperty('--animation-delay', `${index * 0.1}s`);
        
        const tagsHTML = project.tags.map(tag => 
            `<span class="project-tag">${tag}</span>`
        ).join('');
        
        const highlightsHTML = project.highlights.map(highlight =>
            `<li>${highlight}</li>`
        ).join('');
        
        card.innerHTML = `
            <div class="project-card-header">
                <div class="project-category">${project.category}</div>
                <button class="project-expand-btn" aria-label="Expand project details">
                    <i data-lucide="plus" class="expand-icon"></i>
                </button>
            </div>
            <div class="project-card-content">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-tags">${tagsHTML}</div>
                <div class="project-details">
                    <p class="project-description">${project.description}</p>
                    <div class="project-highlights">
                        <h4>Key Achievements:</h4>
                        <ul>${highlightsHTML}</ul>
                    </div>
                    <div class="project-technologies">
                        <h4>Technologies:</h4>
                        <div class="tech-list">
                            ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        return card;
    }
    
    setupInteractions() {
        this.projectsGrid.addEventListener('click', (e) => {
            const expandBtn = e.target.closest('.project-expand-btn');
            if (expandBtn) {
                const card = expandBtn.closest('.project-card');
                this.toggleProjectCard(card);
            }
        });
        
        // 3D hover effects
        this.setupHoverEffects();
    }
    
    toggleProjectCard(card) {
        const isExpanded = card.classList.contains('expanded');
        const icon = card.querySelector('.expand-icon');
        const details = card.querySelector('.project-details');
        
        if (isExpanded) {
            // Collapse
            card.classList.remove('expanded');
            gsap.to(details, {
                duration: 0.4,
                height: 0,
                opacity: 0,
                ease: 'power2.inOut'
            });
            gsap.to(icon, {
                duration: 0.3,
                rotation: 0,
                ease: 'power2.out'
            });
        } else {
            // Expand
            card.classList.add('expanded');
            
            // Get natural height
            gsap.set(details, { height: 'auto' });
            const naturalHeight = details.offsetHeight;
            gsap.set(details, { height: 0 });
            
            gsap.to(details, {
                duration: 0.6,
                height: naturalHeight,
                opacity: 1,
                ease: 'power2.out'
            });
            gsap.to(icon, {
                duration: 0.3,
                rotation: 45,
                ease: 'power2.out'
            });
        }
    }
    
    setupHoverEffects() {
        this.projectCards.forEach(card => {
            const handleMouseMove = (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * -5;
                const rotateY = (x - centerX) / centerX * 5;
                
                gsap.to(card, {
                    duration: 0.4,
                    rotationX: rotateX,
                    rotationY: rotateY,
                    transformPerspective: 1000,
                    ease: 'power2.out'
                });
            };
            
            const handleMouseLeave = () => {
                gsap.to(card, {
                    duration: 0.6,
                    rotationX: 0,
                    rotationY: 0,
                    ease: 'elastic.out(1, 0.5)'
                });
            };
            
            card.addEventListener('mousemove', handleMouseMove);
            card.addEventListener('mouseleave', handleMouseLeave);
        });
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.observers = [];
    }
    
    init() {
        this.setupRevealAnimations();
        this.setupParallaxEffects();
        this.setupCounterAnimations();
    }
    
    setupRevealAnimations() {
        const revealElements = document.querySelectorAll(
            '.section-header, .about-content > *, .education-item, .experience-card, .project-card, .publication-card, .contact-content'
        );
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateReveal(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: CONFIG.animations.revealOffset,
                rootMargin: '0px 0px -50px 0px'
            }
        );
        
        revealElements.forEach(element => {
            // Set initial state
            gsap.set(element, { 
                y: 50, 
                opacity: 0,
                rotationX: 15
            });
            observer.observe(element);
        });
        
        this.observers.push(observer);
    }
    
    animateReveal(element) {
        gsap.to(element, {
            duration: 0.8,
            y: 0,
            opacity: 1,
            rotationX: 0,
            ease: 'power3.out',
            delay: Math.random() * 0.2
        });
    }
    
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-visual, .circuit-animation');
        
        parallaxElements.forEach(element => {
            gsap.to(element, {
                yPercent: -50,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    }
    
    setupCounterAnimations() {
        const counterElements = document.querySelectorAll('[data-counter]');
        
        counterElements.forEach(element => {
            const target = parseInt(element.getAttribute('data-counter'));
            
            ScrollTrigger.create({
                trigger: element,
                start: "top 80%",
                onEnter: () => {
                    gsap.to(element, {
                        duration: 2,
                        innerText: target,
                        roundProps: "innerText",
                        ease: "power2.out"
                    });
                }
            });
        });
    }
    
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        ScrollTrigger.killAll();
    }
}

// ===== PERFORMANCE MONITOR =====
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.lastTime = performance.now();
        this.frameCount = 0;
    }
    
    update() {
        const now = performance.now();
        this.frameCount++;
        
        if (now >= this.lastTime + 1000) {
            this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
            this.frameCount = 0;
            this.lastTime = now;
            
            // Adjust quality based on performance
            this.adjustQuality();
        }
    }
    
    adjustQuality() {
        if (this.fps < 30) {
            // Reduce particle count for better performance
            CONFIG.background.particleCount = Math.max(50, CONFIG.background.particleCount * 0.8);
            console.log('Performance optimization: Reduced particle count');
        }
    }
}

// ===== INITIALIZE APPLICATION =====
let portfolioApp;
const performanceMonitor = new PerformanceMonitor();

// Start the application
document.addEventListener('DOMContentLoaded', () => {
    portfolioApp = new PortfolioApp();
});

// Performance monitoring
function monitorPerformance() {
    performanceMonitor.update();
    requestAnimationFrame(monitorPerformance);
}

if (window.location.hostname !== 'localhost') {
    requestAnimationFrame(monitorPerformance);
}

// Export for debugging
window.PortfolioApp = PortfolioApp;
window.portfolioDebug = {
    app: () => portfolioApp,
    performance: () => performanceMonitor,
    config: CONFIG
};

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});
