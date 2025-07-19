// ===================================
// Enhanced Semiconductor Portfolio JavaScript
// Apple-Style Smooth Scrolling & Advanced Interactions
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all systems
    initSmoothLoader();
    initAppleStyleNavigation();
    initOptimizedCursor();
    initIntersectionObservers();
    initThemeToggle();
    initScrollEffects();
    initAdvancedAnimations();
    initParticleSystem();
    initScrollToTop();
    initTypingAnimations();
    initKeyboardNavigation();
    
    // Remove preloader after initialization
    setTimeout(() => {
        hidePreloader();
    }, 3000);
});

// ===================================
// Smooth Loading Screen (Optimized)
// ===================================

function initSmoothLoader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    // Add completion class for final animation
    setTimeout(() => {
        preloader.classList.add('completing');
    }, 2500);
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    
    setTimeout(() => {
        preloader.remove();
        // Enable body interactions
        document.body.style.overflow = 'auto';
    }, 500);
}

// ===================================
// Apple-Style Smooth Navigation
// ===================================

function initAppleStyleNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    let isScrolling = false;
    let currentSection = 0;
    
    // Smooth scroll configuration
    const scrollConfig = {
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
    };
    
    // Enhanced smooth scroll with Apple-style centering
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (isScrolling) return;
            isScrolling = true;
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Calculate perfect center position
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + 
                                     window.pageYOffset - 
                                     (window.innerHeight / 2) + 
                                     (targetSection.offsetHeight / 2) + 
                                     headerHeight;
                
                // Apple-style smooth scroll[7][8]
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
                
                // Update active states
                updateActiveNavLink(link);
                currentSection = index;
                
                // Reset scrolling flag
                setTimeout(() => {
                    isScrolling = false;
                }, 1000);
            }
        });
    });
    
    // Keyboard navigation (Apple-style)
    document.addEventListener('keydown', (e) => {
        if (e.altKey || e.metaKey) {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    navigateToSection(Math.max(0, currentSection - 1));
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    navigateToSection(Math.min(sections.length - 1, currentSection + 1));
                    break;
            }
        }
    });
    
    function navigateToSection(index) {
        if (navLinks[index]) {
            navLinks[index].click();
        }
    }
    
    function updateActiveNavLink(activeLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
}

// ===================================
// Optimized Cursor (No Lag)
// ===================================

function initOptimizedCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor || window.innerWidth <= 768) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const ease = 0.15;
    
    // Smooth cursor movement with RAF
    function updateCursor() {
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Start cursor animation
    updateCursor();
    
    // Simple hover effects (no magnetic lag)
    const hoverElements = document.querySelectorAll('a, button, .project-card, .social-link');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// ===================================
// Advanced Intersection Observers
// ===================================

function initIntersectionObservers() {
    // Main sections observer for smooth reveals
    const sectionsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger timeline animations
                const timelineItems = entry.target.querySelectorAll('.timeline-item');
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Navigation observer for Apple-style active states[11][12]
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                
                if (activeLink) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.6,
        rootMargin: '-20% 0px -20% 0px'
    });
    
    // Observe all sections
    document.querySelectorAll('.section, #home').forEach(section => {
        sectionsObserver.observe(section);
        navObserver.observe(section);
    });
    
    // Project cards stagger animation observer
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.project-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            }
        });
    }, { threshold: 0.2 });
    
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        // Initially hide project cards
        projectsGrid.querySelectorAll('.project-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        projectsObserver.observe(projectsGrid);
    }
}

// ===================================
// Theme Toggle System
// ===================================

function initThemeToggle() {
    const themeBtn = document.querySelector('.theme-btn');
    const themeIcon = themeBtn?.querySelector('i');
    
    if (!themeBtn) return;
    
    // Get saved theme or default to dark
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Smooth theme transition
        document.documentElement.style.transition = 'all 0.3s ease';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(newTheme);
        
        // Remove transition after change
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    });
    
    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ===================================
// Advanced Scroll Effects
// ===================================

function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let isScrollingDown = false;
    
    // Apple-style header behavior
    function handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);
        
        // Only process significant scroll changes
        if (scrollDifference < 5) return;
        
        isScrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;
        
        if (header) {
            // Add/remove scrolled class
            header.classList.toggle('scrolled', currentScrollY > 100);
            
            // Apple-style hide/show on scroll
            if (currentScrollY > 300) {
                header.style.transform = isScrollingDown ? 
                    'translateY(-100%)' : 'translateY(0)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        // Update scroll progress
        updateScrollProgress();
    }
    
    // Throttled scroll handler
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(handleScroll, 10);
    }, { passive: true });
    
    function updateScrollProgress() {
        const scrollPercent = (window.scrollY / 
            (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
    }
}

// ===================================
// Scroll to Top Button
// ===================================

function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (!scrollTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        const shouldShow = window.scrollY > 500;
        scrollTopBtn.classList.toggle('visible', shouldShow);
    });
    
    // Smooth scroll to top[15]
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// Advanced Animations
// ===================================

function initAdvancedAnimations() {
    // Staggered skill items animation
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach(category => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillItems = entry.target.querySelectorAll('.skill-items span');
                    skillItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0) scale(1)';
                        }, index * 50);
                    });
                }
            });
        }, { threshold: 0.3 });
        
        // Initially hide skill items
        const skillItems = category.querySelectorAll('.skill-items span');
        skillItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px) scale(0.9)';
            item.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        observer.observe(category);
    });
    
    // Enhanced project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Animate tags
            const tags = card.querySelectorAll('.tag');
            tags.forEach((tag, index) => {
                setTimeout(() => {
                    tag.style.transform = 'translateY(-2px) scale(1.05)';
                }, index * 30);
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const tags = card.querySelectorAll('.tag');
            tags.forEach(tag => {
                tag.style.transform = 'translateY(0) scale(1)';
            });
        });
    });
}

// ===================================
// Optimized Particle System
// ===================================

function initParticleSystem() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    const particles = particlesContainer.querySelectorAll('.particle');
    
    // Add random movement variations
    particles.forEach((particle, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 8 + Math.random() * 4;
        const randomScale = 0.8 + Math.random() * 0.4;
        
        particle.style.animationDelay = `${randomDelay}s`;
        particle.style.animationDuration = `${randomDuration}s`;
        particle.style.transform = `scale(${randomScale})`;
        
        // Add subtle mouse interaction
        document.addEventListener('mousemove', (e) => {
            if (Math.random() > 0.95) { // Only occasionally react
                const rect = particle.getBoundingClientRect();
                const distance = Math.sqrt(
                    Math.pow(e.clientX - rect.left, 2) + 
                    Math.pow(e.clientY - rect.top, 2)
                );
                
                if (distance < 100) {
                    particle.style.transform = `scale(${randomScale * 1.2}) translateX(${(e.clientX - rect.left) * 0.1}px)`;
                    
                    setTimeout(() => {
                        particle.style.transform = `scale(${randomScale})`;
                    }, 1000);
                }
            }
        });
    });
}

// ===================================
// Typing Animations
// ===================================

function initTypingAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startTypingAnimation(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Add typing effect to specific elements
    const typingElements = document.querySelectorAll('.hero-subtitle, .section-title');
    
    typingElements.forEach(element => {
        observer.observe(element);
    });
    
    function startTypingAnimation(element) {
        const text = element.textContent;
        const typingClass = 'typing-animation';
        
        if (element.classList.contains(typingClass)) return;
        
        element.classList.add(typingClass);
        element.innerHTML = '';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.innerHTML += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                element.classList.add('typing-complete');
            }
        }, 50);
    }
}

// ===================================
// Keyboard Navigation
// ===================================

function initKeyboardNavigation() {
    let focusedElement = null;
    const focusableElements = 'a, button, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', (e) => {
        const focusableElementsList = Array.from(
            document.querySelectorAll(focusableElements)
        ).filter(el => el.offsetParent !== null);
        
        const currentIndex = focusableElementsList.indexOf(document.activeElement);
        
        switch(e.key) {
            case 'Tab':
                // Custom tab behavior for better UX
                if (e.shiftKey) {
                    if (currentIndex > 0) {
                        e.preventDefault();
                        focusableElementsList[currentIndex - 1].focus();
                    }
                } else {
                    if (currentIndex < focusableElementsList.length - 1) {
                        e.preventDefault();
                        focusableElementsList[currentIndex + 1].focus();
                    }
                }
                break;
                
            case 'Escape':
                // Close any open modals or reset focus
                if (document.activeElement) {
                    document.activeElement.blur();
                }
                break;
                
            case 'Enter':
                // Enhanced enter key behavior
                if (document.activeElement && document.activeElement.tagName === 'A') {
                    e.preventDefault();
                    document.activeElement.click();
                }
                break;
        }
    });
}

// ===================================
// Performance Monitoring
// ===================================

function initPerformanceMonitoring() {
    // Monitor scroll performance
    let scrollCount = 0;
    let scrollStart = Date.now();
    
    window.addEventListener('scroll', () => {
        scrollCount++;
        
        // Log performance every 100 scroll events
        if (scrollCount % 100 === 0) {
            const elapsed = Date.now() - scrollStart;
            const fps = Math.round(1000 / (elapsed / scrollCount));
            
            if (fps < 30) {
                console.warn('Scroll performance below 30fps:', fps);
            }
            
            scrollCount = 0;
            scrollStart = Date.now();
        }
    });
    
    // Monitor memory usage
    if ('memory' in performance) {
        setInterval(() => {
            const memory = performance.memory;
            if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
                console.warn('High memory usage detected');
            }
        }, 30000);
    }
}

// ===================================
// Utility Functions
// ===================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Check if element is in viewport
function isInViewport(element, threshold = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Enhanced easing functions
const easing = {
    easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeOutQuart: (t) => 1 - (--t) * t * t * t,
    easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t
};

// ===================================
// Initialize Performance Monitoring
// ===================================

// Start performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    initPerformanceMonitoring();
}

// Export for debugging
window.portfolioDebug = {
    hidePreloader,
    updateScrollProgress: () => updateScrollProgress(),
    isInViewport,
    easing
};
