// === PREMIUM PORTFOLIO INITIALIZATION ===
class PremiumPortfolio {
    constructor() {
        this.isLoaded = false;
        this.scrollY = 0;
        this.lastScrollY = 0;
        this.ticking = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializePreloader();
        this.initializeAnimations();
        this.initializeMobileMenu();
        this.initializeScrollEffects();
        this.initializeNavigation();
        this.initializeExperienceTabs();
        this.initializeHeroAnimations();
        this.initializeProjectAnimations();
        this.initializeSkillsAnimations();
        this.initializeTypingEffects();
        this.initializeParticleSystem();
        this.initializeScrollToTop();
        this.initializePerformanceOptimizations();
        this.initializeAccessibility();
    }

    setupEventListeners() {
        window.addEventListener('load', () => this.handleWindowLoad());
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    }

    // === PREMIUM PRELOADER ===
    initializePreloader() {
        const preloader = document.getElementById('preloader');
        const progressBar = document.querySelector('.progress-bar');
        const loaderChip = document.querySelector('.loader-chip');
        
        // Animate progress bar
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            if (progressBar) {
                progressBar.style.width = `${progress}%`;
            }
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => this.hidePreloader(), 500);
            }
        }, 100);

        // Animate loader chip
        if (loaderChip) {
            loaderChip.addEventListener('animationiteration', () => {
                this.animateChipPins();
            });
        }
    }

    animateChipPins() {
        const pins = document.querySelectorAll('.chip-pins .pin');
        pins.forEach((pin, index) => {
            setTimeout(() => {
                pin.style.transform = 'scale(1.2)';
                pin.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.8)';
                
                setTimeout(() => {
                    pin.style.transform = 'scale(1)';
                    pin.style.boxShadow = 'none';
                }, 200);
            }, index * 100);
        });
    }

    hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('loaded');
            document.body.style.overflow = 'visible';
            this.isLoaded = true;
            this.startMainAnimations();
        }
    }

    // === HERO ANIMATIONS ===
    initializeHeroAnimations() {
        this.animateHeroTitle();
        this.animateHeroStats();
        this.animateChipShowcase();
        this.initializeFloatingChips();
    }

    animateHeroTitle() {
        const titleLines = document.querySelectorAll('.hero-title .title-line');
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, (index + 1) * 300);
        });
    }

    animateHeroStats() {
        const stats = document.querySelectorAll('.stat-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const numberElement = element.querySelector('.stat-number');
        const finalNumber = numberElement.textContent;
        const isMultiplier = finalNumber.includes('x');
        const hasPlus = finalNumber.includes('+');
        
        let targetValue = parseFloat(finalNumber);
        let currentValue = 0;
        const increment = targetValue / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const counter = setInterval(() => {
            currentValue += increment;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
            }
            
            let displayValue = Math.floor(currentValue);
            if (isMultiplier) displayValue += 'x';
            if (hasPlus) displayValue += '+';
            
            numberElement.textContent = displayValue;
        }, stepTime);
    }

    animateChipShowcase() {
        const mainChip = document.querySelector('.premium-chip');
        const coreUnits = document.querySelectorAll('.core-unit');
        
        if (mainChip) {
            setTimeout(() => {
                mainChip.style.opacity = '1';
                mainChip.style.transform = 'translateY(0) scale(1)';
            }, 800);
        }

        coreUnits.forEach((unit, index) => {
            setTimeout(() => {
                unit.style.opacity = '1';
                unit.style.transform = 'scale(1)';
            }, 1000 + (index * 200));
        });
    }

    initializeFloatingChips() {
        const floatingChips = document.querySelectorAll('.float-chip');
        floatingChips.forEach((chip, index) => {
            chip.style.animationDelay = `${index * 2}s`;
            chip.addEventListener('mouseenter', () => this.handleChipHover(chip));
            chip.addEventListener('mouseleave', () => this.handleChipLeave(chip));
        });
    }

    handleChipHover(chip) {
        chip.style.transform = 'translateY(-10px) scale(1.1)';
        chip.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.3)';
    }

    handleChipLeave(chip) {
        chip.style.transform = 'translateY(0) scale(1)';
        chip.style.boxShadow = 'var(--shadow-large)';
    }

    // === MOBILE MENU ===
    initializeMobileMenu() {
        const menuToggle = document.getElementById('mobile-menu-toggle');
        const nav = document.querySelector('.premium-nav');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let isMenuOpen = false;

        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            
            menuToggle.classList.toggle('is-active', isMenuOpen);
            nav.classList.toggle('mobile-active', isMenuOpen);
            nav.classList.toggle('is-open', isMenuOpen);
            document.body.classList.toggle('blur', isMenuOpen);
            
            if (isMenuOpen) {
                this.animateNavLinks(navLinks);
            }
        };

        menuToggle.addEventListener('click', toggleMenu);
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (isMenuOpen) toggleMenu();
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMenu();
            }
        });
    }

    animateNavLinks(links) {
        links.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // === SCROLL EFFECTS ===
    initializeScrollEffects() {
        const header = document.querySelector('.premium-header');
        const sections = document.querySelectorAll('.premium-section');
        
        // Intersection Observer for sections
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    this.triggerSectionAnimations(entry.target);
                }
            });
        }, {
            rootMargin: '-10% 0px -10% 0px',
            threshold: 0.1
        });

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    triggerSectionAnimations(section) {
        const sectionId = section.id;
        
        switch(sectionId) {
            case 'about':
                this.animateAboutSection();
                break;
            case 'experience':
                this.animateExperienceSection();
                break;
            case 'projects':
                this.animateProjectsSection();
                break;
            case 'research':
                this.animateResearchSection();
                break;
            case 'contact':
                this.animateContactSection();
                break;
        }
    }

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                this.updateScrollEffects();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    updateScrollEffects() {
        const header = document.querySelector('.premium-header');
        const currentScrollY = window.scrollY;
        
        // Header visibility
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll direction
        if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        this.lastScrollY = currentScrollY;
    }

    // === NAVIGATION ===
    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        // Smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.premium-header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active link highlighting
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
        }, {
            rootMargin: '-20% 0px -80% 0px'
        });

        sections.forEach(section => {
            navObserver.observe(section);
        });
    }

    // === EXPERIENCE TABS ===
    initializeExperienceTabs() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.getAttribute('data-tab');
                
                // Remove active classes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanels.forEach(p => p.classList.remove('active'));
                
                // Add active classes
                btn.classList.add('active');
                const targetPanel = document.getElementById(targetTab);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                    this.animateTabContent(targetPanel);
                }
            });
        });
    }

    animateTabContent(panel) {
        const achievements = panel.querySelectorAll('.achievement-list li');
        const techChips = panel.querySelectorAll('.tech-chip');
        
        achievements.forEach((achievement, index) => {
            setTimeout(() => {
                achievement.style.opacity = '1';
                achievement.style.transform = 'translateX(0)';
            }, index * 100);
        });

        techChips.forEach((chip, index) => {
            setTimeout(() => {
                chip.style.opacity = '1';
                chip.style.transform = 'translateY(0)';
            }, 300 + (index * 50));
        });
    }

    // === SECTION ANIMATIONS ===
    animateAboutSection() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const skillCategories = document.querySelectorAll('.skill-category');
        
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });

        skillCategories.forEach((category, index) => {
            setTimeout(() => {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
                this.animateSkillBadges(category);
            }, index * 150);
        });
    }

    animateSkillBadges(category) {
        const badges = category.querySelectorAll('.skill-badge');
        badges.forEach((badge, index) => {
            setTimeout(() => {
                badge.style.opacity = '1';
                badge.style.transform = 'scale(1)';
            }, index * 50);
        });
    }

    animateProjectsSection() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    animateResearchSection() {
        const researchCards = document.querySelectorAll('.research-card');
        researchCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 250);
        });
    }

    animateContactSection() {
        const contactChip = document.querySelector('.contact-chip');
        const connectionLines = document.querySelectorAll('.connection-lines .line');
        
        if (contactChip) {
            contactChip.style.opacity = '1';
            contactChip.style.transform = 'scale(1)';
        }

        connectionLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = line.classList.contains('line-1') ? 'translateY(0)' : 
                                     line.classList.contains('line-2') ? 'translateX(0)' : 'translateY(0)';
            }, index * 300);
        });
    }

    // === TYPING EFFECTS ===
    initializeTypingEffects() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            
            setTimeout(() => {
                this.typeText(subtitle, text, 50);
            }, 1500);
        }
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                this.addCursor(element);
            }
        }, speed);
    }

    addCursor(element) {
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        cursor.style.animation = 'cursorBlink 1s infinite';
        element.appendChild(cursor);
        
        setTimeout(() => {
            cursor.remove();
        }, 3000);
    }

    // === SKILLS ANIMATIONS ===
    initializeSkillsAnimations() {
        const skillBadges = document.querySelectorAll('.skill-badge');
        
        skillBadges.forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                badge.style.transform = 'translateY(-3px) scale(1.05)';
                badge.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.3)';
            });
            
            badge.addEventListener('mouseleave', () => {
                badge.style.transform = 'translateY(0) scale(1)';
                badge.style.boxShadow = 'none';
            });
        });
    }

    // === PROJECT ANIMATIONS ===
    initializeProjectAnimations() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const visual = card.querySelector('.project-visual');
                if (visual) {
                    visual.style.transform = 'scale(1.05)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                const visual = card.querySelector('.project-visual');
                if (visual) {
                    visual.style.transform = 'scale(1)';
                }
            });
        });
    }

    // === PARTICLE SYSTEM ===
    initializeParticleSystem() {
        const canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        
        document.body.appendChild(canvas);
        this.startParticleSystem(canvas);
    }

    startParticleSystem(canvas) {
        const ctx = canvas.getContext('2d');
        const particles = [];
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        const createParticle = () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            color: `hsl(${Math.random() * 60 + 160}, 70%, 60%)`
        });
        
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color;
                ctx.globalAlpha = particle.opacity;
                ctx.fill();
                
                // Draw connections
                particles.slice(index + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = '#d4af37';
                        ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        };
        
        resizeCanvas();
        
        // Initialize particles
        const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
        
        animate();
        
        window.addEventListener('resize', resizeCanvas);
    }

    // === SCROLL TO TOP ===
    initializeScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '<i data-lucide="chevron-up"></i>';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border: 2px solid var(--accent-gold);
            background: var(--premium-white);
            color: var(--accent-gold);
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-medium);
        `;
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        scrollBtn.addEventListener('mouseenter', () => {
            scrollBtn.style.transform = 'scale(1.1)';
            scrollBtn.style.boxShadow = 'var(--shadow-large)';
        });
        
        scrollBtn.addEventListener('mouseleave', () => {
            scrollBtn.style.transform = 'scale(1)';
            scrollBtn.style.boxShadow = 'var(--shadow-medium)';
        });
    }

    // === PERFORMANCE OPTIMIZATIONS ===
    initializePerformanceOptimizations() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // Debounce resize events
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 250);
        });
    }

    // === ACCESSIBILITY ===
    initializeAccessibility() {
        // Focus management
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--accent-gold)';
                element.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', () => {
                element.style.outline = 'none';
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    // === EVENT HANDLERS ===
    handleWindowLoad() {
        this.isLoaded = true;
        document.body.classList.add('loaded');
    }

    handleResize() {
        // Recalculate dimensions and update animations
        this.updateDimensions();
    }

    handleKeydown(e) {
        // Handle keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.scrollToSection('prev');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.scrollToSection('next');
                    break;
            }
        }
    }

    scrollToSection(direction) {
        const sections = ['hero', 'about', 'experience', 'projects', 'research', 'contact'];
        const currentSection = sections.find(id => {
            const element = document.getElementById(id);
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        });
        
        const currentIndex = sections.indexOf(currentSection);
        let targetIndex;
        
        if (direction === 'next' && currentIndex < sections.length - 1) {
            targetIndex = currentIndex + 1;
        } else if (direction === 'prev' && currentIndex > 0) {
            targetIndex = currentIndex - 1;
        }
        
        if (targetIndex !== undefined) {
            const targetSection = document.getElementById(sections[targetIndex]);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    updateDimensions() {
        // Update canvas dimensions and recalculate positions
        const canvas = document.getElementById('particle-canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }

    startMainAnimations() {
        // Start main animations after preloader
        setTimeout(() => {
            this.animateHeroContent();
        }, 300);
    }

    animateHeroContent() {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }
    }
}

// === ADDITIONAL ANIMATIONS ===
const additionalStyles = `
@keyframes cursorBlink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

.typing-cursor {
    color: var(--accent-gold);
    font-weight: 300;
    animation: cursorBlink 1s infinite;
}

.skill-badge {
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.3s ease;
}

.timeline-item {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.5s ease;
}

.skill-category {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.6s ease;
}

.project-card {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.research-card {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.achievement-list li {
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.3s ease;
}

.tech-chip {
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
}

.connection-lines .line {
    opacity: 0;
    transition: all 0.5s ease;
}

.line-1 { transform: translateY(-20px); }
.line-2 { transform: translateX(20px); }
.line-3 { transform: translateY(20px); }

.keyboard-navigation *:focus {
    outline: 2px solid var(--accent-gold) !important;
    outline-offset: 2px !important;
}

.hero-content {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;
}

.premium-chip {
    opacity: 0;
    transform: translateY(50px) scale(0.8);
    transition: all 1s ease;
}

.core-unit {
    opacity: 0;
    transform: scale(0);
    transition: all 0.5s ease;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the premium portfolio
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new PremiumPortfolio();
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PremiumPortfolio;
}
