// Enhanced Portfolio JavaScript with Circuit Theme & Advanced Animations
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initThemeToggle();
    initEnhancedCursor();
    initCircuitBackground();
    initScrollEffects();
    initNavigation();
    initScrollToTop();
    initAdvancedAnimations();
    initParticleEffects();
});

// Enhanced Preloader with Charge Ball Animation
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    // Create the enhanced preloader HTML structure
    const preloaderHTML = `
        <div class="loader-container">
            <div class="charge-ball"></div>
            <div class="pcb-container">
                <div class="pcb-board">
                    <div class="circuit-trace trace-1"></div>
                    <div class="circuit-trace trace-2"></div>
                    <div class="circuit-trace trace-3"></div>
                    <div class="circuit-trace trace-4"></div>
                    <div class="component comp-1"></div>
                    <div class="component comp-2"></div>
                    <div class="component comp-3"></div>
                </div>
            </div>
            <div class="loader-text">INITIALIZING</div>
        </div>
    `;
    
    preloader.innerHTML = preloaderHTML;
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
                // Initialize circuit background after preloader is hidden
                initCircuitBackground();
            }, 800);
        }, 7000); // Wait for full animation sequence
    });
}

// Theme Toggle with Enhanced Transitions
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition effect
        body.style.transition = 'all 0.3s ease';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Reinitialize circuit background with new theme
        setTimeout(initCircuitBackground, 300);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.innerHTML = theme === 'dark' ? '☀️' : '🌙';
}

// Enhanced Custom Cursor with Circuit Effects
function initEnhancedCursor() {
    const cursor = document.getElementById('cursor');
    const hoverElements = document.querySelectorAll('a, button, .project-card, .cert-item, .skill-category, .social-link, .cv-btn, .contact-btn');
    
    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        // Smooth cursor following
        function updateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            cursorX += dx * 0.1;
            cursorY += dy * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(updateCursor);
        }
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        updateCursor();
        
        // Enhanced hover effects
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursor.classList.add('hover');
                this.style.transform = 'translateY(-2px)';
            });
            
            element.addEventListener('mouseleave', function() {
                cursor.classList.remove('hover');
                this.style.transform = 'translateY(0)';
            });
        });
        
        // Add magnetic effect to special elements
        const magneticElements = document.querySelectorAll('.social-link, .cv-btn, .contact-btn');
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0) translateY(0)';
            });
        });
    }
}

// Circuit Background Animation
function initCircuitBackground() {
    const existingBg = document.querySelector('.circuit-bg');
    if (existingBg) existingBg.remove();
    
    const circuitBg = document.createElement('div');
    circuitBg.className = 'circuit-bg';
    document.body.appendChild(circuitBg);
    
    // Add floating circuit nodes
    createFloatingNodes();
}

function createFloatingNodes() {
    const nodeCount = 20;
    const container = document.querySelector('.circuit-bg');
    
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.style.position = 'absolute';
        node.style.width = '4px';
        node.style.height = '4px';
        node.style.backgroundColor = 'var(--circuit-color)';
        node.style.borderRadius = '50%';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animation = `circuitPulse ${2 + Math.random() * 3}s ease-in-out infinite alternate`;
        node.style.animationDelay = Math.random() * 2 + 's';
        
        container.appendChild(node);
    }
    
    // Add CSS animation for circuit pulse
    if (!document.querySelector('#circuitAnimations')) {
        const style = document.createElement('style');
        style.id = 'circuitAnimations';
        style.textContent = `
            @keyframes circuitPulse {
                0% { opacity: 0.3; transform: scale(1); }
                100% { opacity: 0.8; transform: scale(1.2); box-shadow: 0 0 10px var(--circuit-color); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Scroll Effects
function initScrollEffects() {
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    animateElements(entry.target);
                }, index * 100);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

function animateElements(section) {
    const animatableElements = section.querySelectorAll('.project-card, .timeline-item, .cert-item, .skill-category');
    animatableElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Enhanced Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
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
    }, {
        threshold: 0.5
    });
    
    sections.forEach(section => {
        navObserver.observe(section);
    });
    
    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Enhanced header hide/show on scroll
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Scroll to Top with Circuit Effect
function initScrollToTop() {
    const scrollTopBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        // Add circuit effect
        this.style.animation = 'circuitActivate 0.3s ease';
        
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        setTimeout(() => {
            this.style.animation = '';
        }, 300);
    });
}

// Advanced Animations and Effects
function initAdvancedAnimations() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Staggered animations for grids
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
    });
    
    // Interactive project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px var(--shadow-color)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
    });
    
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-50px)';
        item.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Skill category hover effects
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('mouseenter', function() {
            const skills = this.querySelectorAll('.skill-items span');
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.transform = 'scale(1.05)';
                    skill.style.background = 'var(--gradient-1)';
                    skill.style.color = 'white';
                }, index * 50);
            });
        });
        
        category.addEventListener('mouseleave', function() {
            const skills = this.querySelectorAll('.skill-items span');
            skills.forEach(skill => {
                skill.style.transform = 'scale(1)';
                skill.style.background = '';
                skill.style.color = '';
            });
        });
    });
}

// Particle Effects for Enhanced Visual Appeal
function initParticleEffects() {
    // Add subtle particle effect on button clicks
    const buttons = document.querySelectorAll('.cv-btn, .contact-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    if (!document.querySelector('#rippleAnimation')) {
        const style = document.createElement('style');
        style.id = 'rippleAnimation';
        style.textContent = `
            @keyframes ripple {
                to {
                    width: 100px;
                    height: 100px;
                    opacity: 0;
                }
            }
            @keyframes circuitActivate {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); box-shadow: 0 0 20px var(--accent-primary); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }
}

// Enhanced Loading Performance
function optimizePerformance() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    const debouncedScrollHandler = () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Handle scroll-dependent animations here
        }, 16); // ~60fps
    };
    
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Add error handling for missing elements
function safeElementQuery(selector, callback) {
    const element = document.querySelector(selector);
    if (element && callback) {
        callback(element);
    }
}

// Export functions for potential external use
window.PortfolioAnimations = {
    initEnhancedCursor,
    initCircuitBackground,
    initAdvancedAnimations
};
