// === ULTIMATE SEMICONDUCTOR PORTFOLIO SCRIPT ===
class SemiconductorPortfolio {
    constructor() {
        // Core state management
        this.isLoaded = false;
        this.isMobileMenuOpen = false;
        this.lastScrollY = 0;
        this.ticking = false;
        this.soundEnabled = true;
        this.currentSection = 'hero';
        
        // Performance optimization
        this.observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -100px 0px'
        };
        
        // Animation delays for staggered effects
        this.animationDelays = {
            hero: 300,
            about: 200,
            experience: 250,
            projects: 200,
            research: 300,
            contact: 200
        };
        
        this.initialize();
    }

    // === INITIALIZATION ===
    initialize() {
        this.setupEventListeners();
        this.initializePreloader();
        this.initializeNavigation();
        this.initializeMobileMenu();
        this.initializeScrollAnimations();
        this.initializeHeroAnimations();
        this.initializeInteractiveElements();
        this.initializeSoundSystem();
        this.initializeScrollToTop();
        this.initializePerformanceOptimizations();
        this.initializeAccessibility();
        this.initializeLucideIcons();
        this.initializeAppleInspiredTouches();
    }

    setupEventListeners() {
        // Use passive listeners for better performance
        window.addEventListener('load', () => this.handleWindowLoad());
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        window.addEventListener('resize', () => this.handleResize());
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
        
        // Touch events for mobile
        document.addEventListener('touchstart', () => this.handleTouchStart(), { passive: true });
    }

    // === PREMIUM PRELOADER SYSTEM ===
    initializePreloader() {
        const preloader = document.getElementById('preloader');
        const progressBar = document.querySelector('.progress-bar');
        
        if (!preloader || !progressBar) return;

        // Realistic loading progression
        let progress = 0;
        const milestones = [15, 30, 45, 60, 75, 90, 100];
        let currentMilestone = 0;
        
        const updateProgress = () => {
            if (currentMilestone < milestones.length) {
                const target = milestones[currentMilestone];
                const increment = (target - progress) * 0.1;
                progress += increment;
                
                if (progress >= target - 1) {
                    progress = target;
                    currentMilestone++;
                }
                
                progressBar.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    setTimeout(() => this.hidePreloader(), 800);
                } else {
                    requestAnimationFrame(updateProgress);
                }
            }
        };
        
        // Start loading simulation
        setTimeout(updateProgress, 500);
        
        // Add premium loading effects
        this.addLoadingEffects();
    }

    addLoadingEffects() {
        const wafer = document.querySelector('.wafer-animation');
        const circuitPaths = document.querySelectorAll('.circuit-paths::before, .circuit-paths::after');
        
        if (wafer) {
            // Add subtle color transitions
            const colors = ['#007aff', '#5856d6', '#af52de', '#ff375f'];
            let colorIndex = 0;
            
            const cycleColors = () => {
                wafer.style.borderColor = colors[colorIndex];
                colorIndex = (colorIndex + 1) % colors.length;
            };
            
            this.colorInterval = setInterval(cycleColors, 1000);
        }
    }

    hidePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('loaded');
            document.body.style.overflow = 'visible';
            this.isLoaded = true;
            
            // Clear intervals
            if (this.colorInterval) {
                clearInterval(this.colorInterval);
            }
            
            // Start main animations with stagger
            setTimeout(() => this.startMainAnimations(), 300);
            this.playStartupSound();
        }
    }

    // === NAVIGATION SYSTEM ===
    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('section[id]');
        
        // Smooth scroll with easing
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);
                
                // Close mobile menu if open
                if (this.isMobileMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });

        // Active link highlighting with smooth transitions
        this.initializeNavHighlighting(sections, navLinks);
    }

    initializeNavHighlighting(sections, navLinks) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    this.currentSection = id;
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { rootMargin: '-20% 0px -80% 0px' });

        sections.forEach(section => observer.observe(section));
    }

    scrollToSection(targetId) {
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            const headerHeight = document.querySelector('.premium-header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            // Smooth scroll with custom easing
            this.smoothScrollTo(targetPosition, 1000);
        }
    }

    smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        const ease = (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            
            window.scrollTo(0, startPosition + distance * ease(progress));
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }

    // === MOBILE MENU SYSTEM ===
    initializeMobileMenu() {
        const menuToggle = document.getElementById('mobile-toggle');
        const nav = document.querySelector('.main-nav');
        const navItems = document.querySelectorAll('.nav-item');
        
        if (!menuToggle || !nav) return;

        menuToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking nav items
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (this.isMobileMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.toggleMobileMenu();
            }
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (this.isMobileMenuOpen && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
                this.toggleMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const menuToggle = document.getElementById('mobile-toggle');
        const nav = document.querySelector('.main-nav');
        
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        
        menuToggle.classList.toggle('is-active', this.isMobileMenuOpen);
        nav.classList.toggle('mobile-active', this.isMobileMenuOpen);
        
        document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
        
        if (this.isMobileMenuOpen) {
            this.animateNavItems();
        }
    }

    animateNavItems() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
                item.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }, index * 100);
        });
    }

    // === SCROLL ANIMATIONS ===
    initializeScrollAnimations() {
        const sections = document.querySelectorAll('.content-section');
        const header = document.querySelector('.premium-header');
        
        // Section fade-in animations with stagger
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    this.triggerSectionSpecificAnimations(entry.target);
                }
            });
        }, this.observerOptions);

        sections.forEach(section => sectionObserver.observe(section));

        // Header scroll effects
        this.initializeHeaderScrollEffects(header);
    }

    initializeHeaderScrollEffects(header) {
        let lastScrollY = 0;
        let ticking = false;
        
        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class for styling
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    }

    triggerSectionSpecificAnimations(section) {
        const sectionId = section.id;
        const delay = this.animationDelays[sectionId] || 200;
        
        setTimeout(() => {
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
        }, delay);
    }

    // === HERO ANIMATIONS ===
    initializeHeroAnimations() {
        if (!this.isLoaded) return;
        
        this.animateHeroTitle();
        this.animateHeroStats();
        this.animateChipShowcase();
        this.initializeFloatingElements();
    }

    animateHeroTitle() {
        const titleLines = document.querySelectorAll('.title-line');
        const subtitle = document.querySelector('.hero-subtitle');
        const greeting = document.querySelector('.hero-greeting');
        
        // Animate greeting first
        if (greeting) {
            setTimeout(() => {
                greeting.style.opacity = '1';
                greeting.style.transform = 'translateY(0)';
            }, 200);
        }
        
        // Animate title lines with stagger
        titleLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 500 + (index * 200));
        });
        
        // Animate subtitle
        if (subtitle) {
            setTimeout(() => {
                subtitle.style.opacity = '1';
                subtitle.style.transform = 'translateY(0)';
            }, 1200);
        }
    }

    animateHeroStats() {
        const stats = document.querySelectorAll('.stat-item');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    this.animateStatCard(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        stats.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const numberElement = element.querySelector('.stat-number');
        const finalText = numberElement.textContent;
        
        // Handle different number formats
        const hasPlus = finalText.includes('+');
        const hasLetters = /[a-zA-Z]/.test(finalText);
        
        if (hasLetters && !hasPlus) {
            // For "45nm" type values, just animate appearance
            numberElement.style.opacity = '0';
            setTimeout(() => {
                numberElement.style.opacity = '1';
                numberElement.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    numberElement.style.transform = 'scale(1)';
                }, 200);
            }, 300);
            return;
        }
        
        let targetValue = parseInt(finalText);
        if (isNaN(targetValue)) return;
        
        let currentValue = 0;
        const duration = 1500;
        const startTime = performance.now();
        
        const counter = (timestamp) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            currentValue = Math.floor(targetValue * easeOut);
            
            let displayValue = currentValue;
            if (hasPlus) displayValue += '+';
            
            numberElement.textContent = displayValue;
            
            if (progress < 1) {
                requestAnimationFrame(counter);
            }
        };
        
        requestAnimationFrame(counter);
    }

    animateStatCard(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 100);
    }

    animateChipShowcase() {
        const mainChip = document.querySelector('.main-chip');
        const coreUnits = document.querySelectorAll('.core-unit');
        const connectionLines = document.querySelectorAll('.connection-line');
        const orbitChips = document.querySelectorAll('.orbit-chip');
        
        // Main chip animation
        if (mainChip) {
            setTimeout(() => {
                mainChip.style.opacity = '1';
                mainChip.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 1000);
        }
        
        // Core units animation
        coreUnits.forEach((unit, index) => {
            setTimeout(() => {
                unit.style.opacity = '1';
                unit.style.transform = 'scale(1)';
            }, 1200 + (index * 150));
        });
        
        // Connection lines animation
        connectionLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
            }, 1400 + (index * 100));
        });
        
        // Orbit chips animation
        orbitChips.forEach((chip, index) => {
            setTimeout(() => {
                chip.style.opacity = '1';
                chip.style.transform = 'scale(1)';
            }, 1600 + (index * 200));
        });
    }

    initializeFloatingElements() {
        const orbitChips = document.querySelectorAll('.orbit-chip');
        
        orbitChips.forEach((chip, index) => {
            chip.style.animationDelay = `${index * 5}s`;
            
            // Add hover effects
            chip.addEventListener('mouseenter', () => {
                chip.style.transform = 'scale(1.15)';
                chip.style.boxShadow = '0 15px 35px rgba(0, 122, 255, 0.4)';
                chip.style.zIndex = '10';
            });
            
            chip.addEventListener('mouseleave', () => {
                chip.style.transform = 'scale(1)';
                chip.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
                chip.style.zIndex = '1';
            });
        });
    }

    // === SECTION-SPECIFIC ANIMATIONS ===
    animateAboutSection() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const skillCategories = document.querySelectorAll('.skill-category');
        const storyCard = document.querySelector('.story-card');
        
        // Animate story card
        if (storyCard) {
            storyCard.style.opacity = '1';
            storyCard.style.transform = 'translateY(0)';
        }
        
        // Animate timeline items
        timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
        
        // Animate skill categories
        skillCategories.forEach((category, index) => {
            setTimeout(() => {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
                this.animateSkillItems(category);
            }, index * 150);
        });
    }

    animateSkillItems(category) {
        const skillItems = category.querySelectorAll('.skill-tag');
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, index * 50);
        });
    }

    animateExperienceSection() {
        const experienceItems = document.querySelectorAll('.experience-item');
        experienceItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 300);
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
        const certCategories = document.querySelectorAll('.cert-category');
        
        researchCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 250);
        });
        
        certCategories.forEach((category, index) => {
            setTimeout(() => {
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
            }, 500 + (index * 200));
        });
    }

    animateContactSection() {
        const contactItems = document.querySelectorAll('.contact-item');
        const socialLinks = document.querySelectorAll('.social-link');
        
        contactItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        socialLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 300 + (index * 100));
        });
    }

    // === APPLE-INSPIRED TOUCHES ===
    initializeAppleInspiredTouches() {
        this.initializePremiumHovers();
        this.initializeParallaxEffects();
        this.initializeMagneticButtons();
        this.initializeFluidCursors();
    }

    initializePremiumHovers() {
        // Premium card hover effects
        const cards = document.querySelectorAll('.project-card, .research-card, .experience-content, .story-card, .skill-category');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
            });
            
            card.addEventListener('mouseleave', (e) => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '';
            });
        });
        
        // Button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0)';
            });
        });
    }

    initializeParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-visual, .floating-particles');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        }, { passive: true });
    }

    initializeMagneticButtons() {
        const magneticElements = document.querySelectorAll('.btn, .nav-item, .social-link');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    initializeFluidCursors() {
        // Create custom cursor for premium interactions
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(0, 122, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Hide default cursor on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.background = 'rgba(0, 122, 255, 0.6)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'rgba(0, 122, 255, 0.8)';
            });
        });
    }

    // === SOUND SYSTEM ===
    initializeSoundSystem() {
        const soundToggle = document.getElementById('sound-toggle');
        
        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                this.toggleSound();
            });
        }
        
        this.updateSoundIcon();
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.updateSoundIcon();
        
        // Add haptic feedback simulation
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    }

    updateSoundIcon() {
        const soundToggle = document.getElementById('sound-toggle');
        if (soundToggle) {
            const icon = soundToggle.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', this.soundEnabled ? 'volume-2' : 'volume-x');
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        }
    }

    playStartupSound() {
        if (this.soundEnabled) {
            const startupSound = document.getElementById('startup-sound');
            if (startupSound) {
                startupSound.volume = 0.3;
                startupSound.play().catch(() => {
                    // Autoplay was prevented
                });
            }
        }
    }

    // === SCROLL TO TOP ===
    initializeScrollToTop() {
        const scrollBtn = document.getElementById('scroll-to-top');
        if (!scrollBtn) return;

        let isVisible = false;
        
        const toggleVisibility = () => {
            const shouldShow = window.scrollY > 400;
            if (shouldShow !== isVisible) {
                isVisible = shouldShow;
                scrollBtn.classList.toggle('visible', isVisible);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });

        scrollBtn.addEventListener('click', () => {
            this.smoothScrollTo(0, 1000);
        });
    }

    // === PERFORMANCE OPTIMIZATIONS ===
    initializePerformanceOptimizations() {
        this.initializeLazyLoading();
        this.initializeIntersectionObserver();
        this.initializeDebouncing();
    }

    initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
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
        }
    }

    initializeIntersectionObserver() {
        // Optimize animations by only running when elements are visible
        const animatedElements = document.querySelectorAll('.hero-visual, .chip-showcase, .orbit-chip');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        });

        animatedElements.forEach(element => observer.observe(element));
    }

    initializeDebouncing() {
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
        this.initializeFocusManagement();
        this.initializeKeyboardNavigation();
        this.initializeReducedMotion();
        this.initializeARIA();
    }

    initializeFocusManagement() {
        const focusableElements = document.querySelectorAll(
            'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        focusableElements.forEach(element => {
            element.addEventListener('focus', () => {
                element.style.outline = '2px solid var(--accent-primary)';
                element.style.outlineOffset = '2px';
            });

            element.addEventListener('blur', () => {
                element.style.outline = 'none';
            });
        });
    }

    initializeKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    initializeReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            const style = document.createElement('style');
            style.textContent = `
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    initializeARIA() {
        // Add ARIA labels dynamically
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const text = item.textContent.trim();
            item.setAttribute('aria-label', `Navigate to ${text} section`);
        });
        
        // Update ARIA states
        const mobileToggle = document.getElementById('mobile-toggle');
        if (mobileToggle) {
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
    }

    // === LUCIDE ICONS ===
    initializeLucideIcons() {
        const initIcons = () => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            } else {
                setTimeout(initIcons, 100);
            }
        };
        
        initIcons();
    }

    // === EVENT HANDLERS ===
    handleWindowLoad() {
        this.isLoaded = true;
        document.body.classList.add('loaded');
        
        // Initialize hero animations after load
        setTimeout(() => {
            this.initializeHeroAnimations();
        }, 500);
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
        const currentScrollY = window.scrollY;
        this.lastScrollY = currentScrollY;
        
        // Update parallax elements
        const parallaxElements = document.querySelectorAll('.floating-particles');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(currentScrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    handleResize() {
        // Update responsive elements
        this.updateDimensions();
        
        // Close mobile menu if viewport changes
        if (this.isMobileMenuOpen && window.innerWidth > 768) {
            this.toggleMobileMenu();
        }
    }

    updateDimensions() {
        // Update any dimension-dependent calculations
        const heroHeight = window.innerHeight;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.minHeight = `${heroHeight}px`;
        }
    }

    handleKeydown(e) {
        // Global keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.scrollToSection('hero');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.scrollToSection('contact');
                    break;
            }
        }
        
        // Section navigation with arrow keys
        if (e.altKey) {
            const sections = ['hero', 'about', 'experience', 'projects', 'research', 'contact'];
            const currentIndex = sections.indexOf(this.currentSection);
            
            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                e.preventDefault();
                this.scrollToSection(sections[currentIndex + 1]);
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                this.scrollToSection(sections[currentIndex - 1]);
            }
        }
    }

    handleVisibilityChange() {
        // Pause animations when tab is not visible
        if (document.hidden) {
            document.body.classList.add('tab-hidden');
        } else {
            document.body.classList.remove('tab-hidden');
        }
    }

    handleTouchStart() {
        // Add touch class for mobile-specific styles
        document.body.classList.add('touch-device');
    }

    // === UTILITY METHODS ===
    startMainAnimations() {
        // Stagger main section animations
        const sections = document.querySelectorAll('.content-section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // === CLEANUP ===
    destroy() {
        // Clean up event listeners and intervals
        if (this.colorInterval) {
            clearInterval(this.colorInterval);
        }
        
        // Remove custom cursor
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.remove();
        }
    }
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the portfolio
    const portfolio = new SemiconductorPortfolio();
    
    // Make it globally accessible for debugging
    window.portfolio = portfolio;
    
    // Add loading complete indicator
    window.addEventListener('load', () => {
        console.log('🚀 Ultimate Semiconductor Portfolio loaded successfully!');
        console.log('🎯 All systems optimized for maximum performance');
        console.log('✨ Apple-inspired interactions activated');
    });
});

// === EXPORT FOR POTENTIAL MODULE USAGE ===
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SemiconductorPortfolio;
}

// === GLOBAL ERROR HANDLING ===
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});
