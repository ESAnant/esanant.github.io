// Enhanced Portfolio JavaScript with Dramatic Charge Ball & Ultra-Smooth Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all systems
    initDramaticChargeLoader();
    initThemeToggle();
    initUltraSmoothCursor();
    initFloatingEnergyParticles();
    initScrollEffects();
    initNavigation();
    initMagneticInteractions();
    initAdvancedAnimations();
    initScrollToTop();
    initTypingAnimations();
});

// Dramatic Charge Ball Loading Screen
function initDramaticChargeLoader() {
    const preloader = document.getElementById('preloader');
    
    // Create enhanced dramatic charge ball HTML
    const loaderHTML = `
        <div class="charge-container">
            <div class="charge-ball">
                <div class="spark"></div>
                <div class="spark"></div>
                <div class="spark"></div>
                <div class="spark"></div>
                <div class="spark"></div>
                <div class="spark"></div>
                <div class="spark"></div>
                <div class="spark"></div>
            </div>
            <div class="energy-ring"></div>
            <div class="energy-ring"></div>
            <div class="energy-ring"></div>
            <div class="explosion-wave"></div>
            <div class="explosion-wave"></div>
            <div class="explosion-wave"></div>
            <div class="loading-text">INITIALIZING PORTFOLIO</div>
        </div>
    `;
    
    preloader.innerHTML = loaderHTML;
    
    // Enhanced loading sequence with dramatic timing
    window.addEventListener('load', function() {
        setTimeout(() => {
            // Add screen flash effect before fade
            document.body.style.background = 'var(--charge-color)';
            setTimeout(() => {
                document.body.style.background = '';
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    // Initialize post-loading effects
                    initFloatingEnergyParticles();
                    document.body.classList.add('loaded');
                    // Trigger hero animations
                    triggerHeroSequence();
                }, 800);
            }, 100);
        }, 6200); // Extended timing for full dramatic effect
    });
}

// Trigger hero entrance animations
function triggerHeroSequence() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const socialLinks = document.querySelectorAll('.social-link');
    const cvBtn = document.querySelector('.cv-btn');
    
    // Stagger hero element animations
    setTimeout(() => {
        if (heroTitle) heroTitle.style.animation = 'heroFadeIn 1s ease-out forwards';
    }, 200);
    
    setTimeout(() => {
        if (heroSubtitle) heroSubtitle.style.animation = 'heroFadeIn 1s ease-out forwards';
    }, 400);
    
    setTimeout(() => {
        if (heroDescription) heroDescription.style.animation = 'heroFadeIn 1s ease-out forwards';
    }, 600);
    
    // Animate social links individually
    socialLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.animation = 'heroFadeIn 0.8s ease-out forwards';
        }, 800 + (index * 100));
    });
    
    setTimeout(() => {
        if (cvBtn) cvBtn.style.animation = 'heroFadeIn 1s ease-out forwards';
    }, 1200);
}

// Advanced Theme Toggle with Smooth Transitions
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add smooth transition
        body.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Create theme transition effect
        createThemeTransitionEffect(newTheme);
        
        setTimeout(() => {
            updateEnergyParticleColors();
            body.style.transition = '';
        }, 500);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
}

function createThemeTransitionEffect(newTheme) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${newTheme === 'dark' ? '#0a0b0d' : '#fefefe'};
        opacity: 0;
        pointer-events: none;
        z-index: 9998;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '0.3';
        setTimeout(() => {
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
        }, 200);
    }, 50);
}

// Ultra-Smooth iPad OS-Style Magnetic Cursor
function initUltraSmoothCursor() {
    const cursor = document.getElementById('cursor');
    const magneticElements = document.querySelectorAll('.magnetic-element');
    
    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let currentMagneticElement = null;
        let magneticStrength = 0;
        
        // Ultra-smooth cursor following with momentum physics
        function updateCursor() {
            let targetX = mouseX;
            let targetY = mouseY;
            
            // Apply magnetic attraction if hovering over magnetic element
            if (currentMagneticElement) {
                const rect = currentMagneticElement.getBoundingClientRect();
                const elementCenterX = rect.left + rect.width / 2;
                const elementCenterY = rect.top + rect.height / 2;
                
                // Calculate magnetic pull with smooth interpolation
                const magneticPullX = (elementCenterX - mouseX) * magneticStrength;
                const magneticPullY = (elementCenterY - mouseY) * magneticStrength;
                
                targetX = mouseX + magneticPullX;
                targetY = mouseY + magneticPullY;
            }
            
            // Smooth interpolation with momentum
            const ease = currentMagneticElement ? 0.08 : 0.12;
            const dx = (targetX - cursorX) * ease;
            const dy = (targetY - cursorY) * ease;
            
            cursorX += dx;
            cursorY += dy;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(updateCursor);
        }
        
        // Mouse move handler with throttling
        let mouseMoveTimeout;
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Clear previous timeout
            clearTimeout(mouseMoveTimeout);
            mouseMoveTimeout = setTimeout(() => {
                // Additional smooth calculations can be added here
            }, 16); // ~60fps
        }, { passive: true });
        
        updateCursor();
        
        // Enhanced magnetic interactions
        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.classList.add('magnetic');
                currentMagneticElement = this;
                magneticStrength = 0;
                
                // Smooth magnetic strength ramp-up
                const strengthRamp = setInterval(() => {
                    magneticStrength = Math.min(magneticStrength + 0.02, 0.15);
                    if (magneticStrength >= 0.15) clearInterval(strengthRamp);
                }, 16);
                
                // Element magnetic response
                this.style.transition = 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Add subtle hover glow
                if (this.classList.contains('social-link') || this.classList.contains('cv-btn') || this.classList.contains('contact-btn')) {
                    this.style.boxShadow = '0 8px 25px var(--shadow-color)';
                }
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.classList.remove('magnetic');
                currentMagneticElement = null;
                magneticStrength = 0;
                
                this.style.transform = '';
                this.style.boxShadow = '';
            });
            
            // Advanced magnetic movement within elements
            element.addEventListener('mousemove', function(e) {
                if (currentMagneticElement === this) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    const moveIntensity = 0.08;
                    const moveX = x * moveIntensity;
                    const moveY = y * moveIntensity;
                    
                    this.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-3px)`;
                }
            });
        });
    }
}

// Enhanced Floating Energy Particles
function initFloatingEnergyParticles() {
    const existingContainer = document.querySelector('.floating-particles');
    if (existingContainer) existingContainer.remove();
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    document.body.appendChild(particleContainer);
    
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        createEnergyParticle(particleContainer, i);
    }
    
    // Add particle interaction effects
    addParticleInteractionEffects();
}

function createEnergyParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning with more spread
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Varied animation properties
    const duration = 6 + Math.random() * 4;
    const delay = Math.random() * 3;
    const scale = 0.8 + Math.random() * 0.4;
    
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.transform = `scale(${scale})`;
    
    container.appendChild(particle);
    
    // Add dynamic glow effect
    setTimeout(() => {
        particle.style.boxShadow = `0 0 ${4 + Math.random() * 6}px var(--particle-color)`;
    }, delay * 1000);
}

function updateEnergyParticleColors() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        particle.style.animation = 'none';
        setTimeout(() => {
            particle.style.animation = '';
        }, 50);
    });
}

function addParticleInteractionEffects() {
    // Add mouse interaction with particles
    document.addEventListener('mousemove', function(e) {
        const particles = document.querySelectorAll('.particle');
        
        particles.forEach(particle => {
            const rect = particle.getBoundingClientRect();
            const particleX = rect.left + rect.width / 2;
            const particleY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(e.clientX - particleX, 2) + Math.pow(e.clientY - particleY, 2)
            );
            
            if (distance < 100) {
                const intensity = (100 - distance) / 100;
                const moveX = (e.clientX - particleX) * intensity * 0.1;
                const moveY = (e.clientY - particleY) * intensity * 0.1;
                
                particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + intensity * 0.2})`;
                particle.style.opacity = 0.3 + intensity * 0.4;
            } else {
                particle.style.transform = '';
                particle.style.opacity = '';
            }
        });
    }, { passive: true });
}

// Advanced Scroll Effects with Performance Optimization
function initScrollEffects() {
    const sections = document.querySelectorAll('.section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: [0.1, 0.3, 0.5],
        rootMargin: '0px 0px -80px 0px'
    };
    
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger section-specific animations
                triggerSectionAnimations(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => sectionObserver.observe(section));
    
    // Timeline items observer
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => timelineObserver.observe(item));
}

function triggerSectionAnimations(section) {
    const animatableElements = section.querySelectorAll(
        '.project-card, .skill-category, .cert-item, .publication-item'
    );
    
    animatableElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            
            // Add entry animation based on element type
            if (element.classList.contains('project-card')) {
                element.style.animation = 'projectCardEntrance 0.8s ease-out forwards';
            } else if (element.classList.contains('skill-category')) {
                element.style.animation = 'skillCategoryEntrance 0.6s ease-out forwards';
            }
        }, index * 120);
    });
}

// Enhanced Navigation with Smooth Active States
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.header');
    
    // Intersection observer for active nav states
    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const activeId = entry.target.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                        
                        // Add active state animation
                        link.style.animation = 'navLinkActive 0.3s ease-out';
                        setTimeout(() => {
                            link.style.animation = '';
                        }, 300);
                    }
                });
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
    });
    
    sections.forEach(section => navObserver.observe(section));
    
    // Smooth scroll with enhanced easing
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                // Custom smooth scroll with easing
                smoothScrollTo(targetPosition, 800);
                
                // Add click feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
    
    // Advanced header behavior
    initAdvancedHeaderBehavior(header);
}

function smoothScrollTo(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    const startTime = performance.now();
    
    function animation(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (easeInOutCubic)
        const ease = progress < 0.5 
            ? 4 * progress * progress * progress 
            : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;
        
        window.scrollTo(0, start + (distance * ease));
        
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }
    
    requestAnimationFrame(animation);
}

function initAdvancedHeaderBehavior(header) {
    let lastScrollTop = 0;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset;
            const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            
            if (scrollTop > 100) {
                if (scrollDirection === 'down' && scrollTop > lastScrollTop + 50) {
                    header.style.transform = 'translateY(-100%)';
                    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
                } else if (scrollDirection === 'up') {
                    header.style.transform = 'translateY(0)';
                    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
                }
            } else {
                header.style.transform = 'translateY(0)';
                header.style.boxShadow = '';
            }
            
            lastScrollTop = scrollTop;
        }, 10);
    }, { passive: true });
}

// Enhanced Magnetic Interactions
function initMagneticInteractions() {
    const buttons = document.querySelectorAll('.cv-btn, .contact-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // Enhanced button interactions with ripple effects
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
        
        // Add hover sound effect simulation through haptic feedback
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Enhanced project card interactions
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Stagger tag animations
            const tags = this.querySelectorAll('.tag');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-3px)';
                    tag.style.boxShadow = '0 4px 12px rgba(212, 151, 76, 0.25)';
                }, index * 60);
            });
            
            // Animate project icon
            const icon = this.querySelector('.project-header i');
            if (icon) {
                icon.style.animation = 'projectIconSpin 0.6s ease-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            
            const tags = this.querySelectorAll('.tag');
            tags.forEach(tag => {
                tag.style.transform = '';
                tag.style.boxShadow = '';
            });
            
            const icon = this.querySelector('.project-header i');
            if (icon) {
                icon.style.animation = '';
            }
        });
    });
    
    // Skill category wave effects
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            const skills = this.querySelectorAll('.skill-items span');
            
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.transform = 'translateY(-4px) scale(1.05)';
                    skill.style.background = 'var(--gradient-1)';
                    skill.style.color = 'white';
                    skill.style.boxShadow = '0 4px 12px rgba(212, 151, 76, 0.3)';
                }, index * 40);
            });
        });
        
        category.addEventListener('mouseleave', function() {
            const skills = this.querySelectorAll('.skill-items span');
            skills.forEach(skill => {
                skill.style.transform = '';
                skill.style.background = '';
                skill.style.color = '';
                skill.style.boxShadow = '';
            });
        });
    });
}

function createRippleEffect(element, event) {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: translate(-50%, -50%);
        animation: rippleExpand 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Advanced Animations and Effects
function initAdvancedAnimations() {
    addCustomAnimations();
    initParallaxEffects();
    initTextAnimations();
}

function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes projectCardEntrance {
            0% { opacity: 0; transform: translateY(30px) scale(0.95); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes skillCategoryEntrance {
            0% { opacity: 0; transform: translateY(20px) rotateX(10deg); }
            100% { opacity: 1; transform: translateY(0) rotateX(0); }
        }
        
        @keyframes projectIconSpin {
            0% { transform: scale(1) rotate(0deg); }
            50% { transform: scale(1.1) rotate(5deg); }
            100% { transform: scale(1) rotate(0deg); }
        }
        
        @keyframes navLinkActive {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes rippleExpand {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

function initParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero && scrolled < window.innerHeight) {
            const parallaxSpeed = scrolled * 0.15;
            hero.style.transform = `translateY(${parallaxSpeed}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

function initTextAnimations() {
    // Add typing effect to hero description
    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc) {
        const originalText = heroDesc.textContent;
        heroDesc.textContent = '';
        
        setTimeout(() => {
            typeText(heroDesc, originalText, 50);
        }, 1500);
    }
}

function typeText(element, text, speed) {
    let index = 0;
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Typing Animations for Dynamic Content
function initTypingAnimations() {
    // Add subtle typing animation to section titles
    const observerOptions = {
        threshold: 0.7,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target;
                const originalText = title.textContent;
                title.textContent = '';
                title.style.borderRight = '2px solid var(--accent-primary)';
                
                setTimeout(() => {
                    typeText(title, originalText, 80);
                    setTimeout(() => {
                        title.style.borderRight = 'none';
                    }, originalText.length * 80 + 500);
                }, 200);
                
                titleObserver.unobserve(title);
            }
        });
    }, observerOptions);
    
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => titleObserver.observe(title));
}

// Enhanced Scroll to Top
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    let isVisible = false;
    
    function updateScrollButton() {
        const shouldShow = window.pageYOffset > 400;
        
        if (shouldShow && !isVisible) {
            scrollTopBtn.classList.add('visible');
            scrollTopBtn.style.animation = 'bounceIn 0.5s ease-out';
            isVisible = true;
        } else if (!shouldShow && isVisible) {
            scrollTopBtn.classList.remove('visible');
            isVisible = false;
        }
    }
    
    window.addEventListener('scroll', updateScrollButton, { passive: true });
    
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Smooth scroll to top
        smoothScrollTo(0, 1000);
    });
}

// Performance Optimization and Error Handling
function optimizePerformance() {
    // Intersection Observer polyfill check
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported, falling back to scroll events');
        initFallbackScrollHandling();
    }
    
    // Preload critical resources
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];
    
    criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'style';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    });
    
    // Add bounce animation for scroll-to-top
    const bounceStyle = document.createElement('style');
    bounceStyle.textContent = `
        @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.3) translateY(20px); }
            50% { opacity: 1; transform: scale(1.05) translateY(-5px); }
            70% { transform: scale(0.95) translateY(2px); }
            100% { opacity: 1; transform: scale(1) translateY(0); }
        }
    `;
    document.head.appendChild(bounceStyle);
}

function initFallbackScrollHandling() {
    // Fallback for browsers without IntersectionObserver
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const viewportHeight = window.innerHeight;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < viewportHeight * 0.8) {
                section.classList.add('visible');
            }
        });
    }, { passive: true });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformance();
    
    // Add global error handling
    window.addEventListener('error', function(e) {
        console.warn('Portfolio Error:', e.message);
        
        // Graceful fallbacks
        if (e.message.includes('cursor')) {
            document.body.style.cursor = 'auto';
        }
        
        if (e.message.includes('animation')) {
            document.querySelectorAll('*').forEach(el => {
                el.style.animation = 'none';
            });
        }
    });
});

// Export functions for external use
window.PortfolioEnhanced = {
    initUltraSmoothCursor,
    initFloatingEnergyParticles,
    initDramaticChargeLoader,
    updateEnergyParticleColors,
    smoothScrollTo,
    createRippleEffect
};

// Add page visibility handling for performance
document.addEventListener('visibilitychange', function() {
    const particles = document.querySelectorAll('.particle');
    
    if (document.hidden) {
        // Pause animations when tab is hidden
        particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab is visible
        particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
    }
});
