// Enhanced Portfolio JavaScript with Charge Ball Loading & iPad OS Magnetic Effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initChargeLoader();
    initThemeToggle();
    initMagneticCursor();
    initFloatingParticles();
    initScrollEffects();
    initNavigation();
    initMagneticElements();
    initAdvancedAnimations();
    initScrollToTop();
});

// Charge Ball Loading Screen
function initChargeLoader() {
    const preloader = document.getElementById('preloader');
    
    // Create enhanced charge ball loading HTML
    const loaderHTML = `
        <div class="charge-container">
            <div class="charge-ball"></div>
            <div class="impact-ring"></div>
            <div class="website-reveal"></div>
        </div>
    `;
    
    preloader.innerHTML = loaderHTML;
    
    // Auto-hide preloader after animation sequence
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Initialize floating particles after loading
                initFloatingParticles();
                // Start main animations
                document.body.classList.add('loaded');
            }, 600);
        }, 5500); // Wait for complete charge ball animation
    });
}

// Enhanced Theme Toggle with Smooth Transitions
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
        body.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Update particles for new theme
        setTimeout(() => {
            updateParticleColors();
            body.style.transition = '';
        }, 400);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
}

// iPad OS-Style Magnetic Cursor
function initMagneticCursor() {
    const cursor = document.getElementById('cursor');
    const magneticElements = document.querySelectorAll('a, button, .project-card, .skill-category, .social-link, .cv-btn, .contact-btn, .cert-item');
    
    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let currentElement = null;
        
        // Smooth cursor following with spring physics
        function updateCursor() {
            if (currentElement) {
                const rect = currentElement.getBoundingClientRect();
                const elementCenterX = rect.left + rect.width / 2;
                const elementCenterY = rect.top + rect.height / 2;
                
                // Magnetic attraction to element center
                const attractionStrength = 0.15;
                const dx = (elementCenterX - cursorX) * attractionStrength + (mouseX - cursorX) * 0.1;
                const dy = (elementCenterY - cursorY) * attractionStrength + (mouseY - cursorY) * 0.1;
                
                cursorX += dx;
                cursorY += dy;
            } else {
                // Normal following behavior
                const dx = (mouseX - cursorX) * 0.1;
                const dy = (mouseY - cursorY) * 0.1;
                
                cursorX += dx;
                cursorY += dy;
            }
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(updateCursor);
        }
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        updateCursor();
        
        // Magnetic hover effects
        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.classList.add('magnetic');
                currentElement = this;
                
                // Add magnetic pull to element
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // Add subtle magnetic attraction animation to element
                const rect = this.getBoundingClientRect();
                const elementCenterX = rect.left + rect.width / 2;
                const elementCenterY = rect.top + rect.height / 2;
                
                // Calculate pull direction
                const pullX = (mouseX - elementCenterX) * 0.03;
                const pullY = (mouseY - elementCenterY) * 0.03;
                
                this.style.transform = `translate(${pullX}px, ${pullY}px) translateY(-2px)`;
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.classList.remove('magnetic');
                currentElement = null;
                
                this.style.transform = 'translate(0, 0) translateY(0)';
            });
            
            // Enhanced magnetic movement within element
            element.addEventListener('mousemove', function(e) {
                if (currentElement === this) {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    const moveX = x * 0.1;
                    const moveY = y * 0.1;
                    
                    this.style.transform = `translate(${moveX}px, ${moveY}px) translateY(-2px)`;
                }
            });
        });
    }
}

// Floating Particle Background Animation
function initFloatingParticles() {
    // Remove existing particles
    const existingContainer = document.querySelector('.floating-particles');
    if (existingContainer) existingContainer.remove();
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'floating-particles';
    document.body.appendChild(particleContainer);
    
    const particleCount = 6;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation duration and delay
        const duration = 4 + Math.random() * 4;
        const delay = Math.random() * 2;
        
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        particleContainer.appendChild(particle);
        
        // Add pulse animation
        setTimeout(() => {
            particle.style.animation += `, particlePulse ${duration * 2}s ease-in-out infinite`;
        }, delay * 1000);
    }
}

function updateParticleColors() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        // Force style recalculation for CSS custom properties
        particle.style.opacity = '0.4';
        setTimeout(() => {
            particle.style.opacity = '';
        }, 50);
    });
}

// Add particle pulse animation to CSS dynamically
function addParticleAnimations() {
    if (!document.querySelector('#particleAnimations')) {
        const style = document.createElement('style');
        style.id = 'particleAnimations';
        style.textContent = `
            @keyframes particlePulse {
                0%, 100% { 
                    box-shadow: 0 0 0 0 var(--particle-color);
                    transform: scale(1);
                }
                50% { 
                    box-shadow: 0 0 10px 5px transparent;
                    transform: scale(1.2);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Scroll Effects with Stagger Animation
function initScrollEffects() {
    const sections = document.querySelectorAll('.section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animations for child elements
                const animatableElements = entry.target.querySelectorAll('.project-card, .skill-category, .cert-item');
                animatableElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe sections
    sections.forEach(section => observer.observe(section));
    
    // Separate observer for timeline items
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => timelineObserver.observe(item));
}

// Enhanced Navigation with Active State Management
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.header');
    
    // Update active nav link on scroll
    const navObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => navObserver.observe(section));
    
    // Smooth scroll with offset
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced header hide/show with smooth transitions
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
            header.style.opacity = '0.95';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Magnetic Elements with Advanced Interactions
function initMagneticElements() {
    const buttons = document.querySelectorAll('.cv-btn, .contact-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const skillCategories = document.querySelectorAll('.skill-category');
    
    // Enhanced button interactions
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Project card interactions
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Animate project tags
            const tags = this.querySelectorAll('.tag');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            const tags = this.querySelectorAll('.tag');
            tags.forEach(tag => {
                tag.style.transform = 'translateY(0)';
            });
        });
    });
    
    // Skill category interactions
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            const skills = this.querySelectorAll('.skill-items span');
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.transform = 'translateY(-3px) scale(1.05)';
                }, index * 30);
            });
        });
        
        category.addEventListener('mouseleave', function() {
            const skills = this.querySelectorAll('.skill-items span');
            skills.forEach(skill => {
                skill.style.transform = 'translateY(0) scale(1)';
            });
        });
    });
}

// Advanced Animations and Effects
function initAdvancedAnimations() {
    addParticleAnimations();
    
    // Parallax effect for hero section
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.2}px)`;
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
    
    // Add shimmer effect to interactive elements
    const interactiveElements = document.querySelectorAll('.social-link, .cv-btn, .contact-btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (!this.querySelector('.shimmer')) {
                const shimmer = document.createElement('div');
                shimmer.className = 'shimmer';
                shimmer.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    animation: shimmer 0.8s ease-out;
                    pointer-events: none;
                `;
                this.appendChild(shimmer);
                
                setTimeout(() => shimmer.remove(), 800);
            }
        });
    });
    
    // Add CSS for shimmer animation
    if (!document.querySelector('#shimmerAnimation')) {
        const style = document.createElement('style');
        style.id = 'shimmerAnimation';
        style.textContent = `
            @keyframes shimmer {
                0% { left: -100%; }
                100% { left: 100%; }
            }
            
            @keyframes ripple {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Scroll to Top with Magnetic Effect
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    let isVisible = false;
    
    function toggleScrollButton() {
        const shouldShow = window.pageYOffset > 300;
        
        if (shouldShow && !isVisible) {
            scrollTopBtn.classList.add('visible');
            isVisible = true;
        } else if (!shouldShow && isVisible) {
            scrollTopBtn.classList.remove('visible');
            isVisible = false;
        }
    }
    
    window.addEventListener('scroll', toggleScrollButton, { passive: true });
    
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add click animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Smooth scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Performance Optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const debouncedScrollHandler = (callback) => {
        return function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(callback, 16); // ~60fps
        };
    };
    
    // Intersection Observer for lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalAssets = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap'
    ];
    
    criticalAssets.forEach(asset => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = asset;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Error Handling and Fallbacks
function handleErrors() {
    window.addEventListener('error', function(e) {
        console.warn('Portfolio Error:', e.message);
        
        // Fallback for missing elements
        if (e.message.includes('cursor')) {
            document.body.style.cursor = 'auto';
        }
    });
    
    // Check for WebGL support for potential future enhancements
    function hasWebGLSupport() {
        try {
            const canvas = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
        } catch (e) {
            return false;
        }
    }
    
    if (!hasWebGLSupport()) {
        console.warn('WebGL not supported, falling back to CSS animations');
    }
}

// Initialize all systems
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformance();
    handleErrors();
});

// Export for potential external use
window.PortfolioEnhanced = {
    initMagneticCursor,
    initFloatingParticles,
    initChargeLoader,
    updateParticleColors
};

// Add smooth page transitions
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, reduce animations
        document.body.style.animationPlayState = 'paused';
    } else {
        // Page is visible, resume animations
        document.body.style.animationPlayState = 'running';
    }
});
