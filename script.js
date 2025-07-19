// ===================================
// Advanced Semiconductor Portfolio JavaScript
// Page Snapping Navigation with Optimized Performance
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all systems with improved performance
    initFastLoader();
    initPageSnappingNavigation();
    initPrecisionCursor();
    initAdvancedIntersectionObservers();
    initEnhancedThemeToggle();
    initSmartScrollEffects();
    initParallaxBackground();
    initAdvancedAnimations();
    initKeyboardNavigation();
    initPerformanceOptimizations();
    
    // Faster preloader removal (1.5s instead of 3s)
    setTimeout(() => {
        hidePreloader();
    }, 1500);
});

// ===================================
// Fast Loading System (1.5s)
// ===================================

function initFastLoader() {
    const preloader = document.getElementById('preloader');
    const progressBar = document.querySelector('.progress-bar');
    const textSequence = document.querySelector('.text-sequence');
    
    if (!preloader) return;
    
    const loadingTexts = [
        'Initializing Quantum Systems...',
        'Loading Neural Networks...',
        'Compiling VLSI Modules...',
        'System Ready.'
    ];
    
    let textIndex = 0;
    
    // Fast text cycling
    const textInterval = setInterval(() => {
        if (textIndex < loadingTexts.length - 1) {
            textSequence.textContent = loadingTexts[textIndex];
            textIndex++;
        } else {
            clearInterval(textInterval);
        }
    }, 350);
    
    // Add completion effect
    setTimeout(() => {
        preloader.classList.add('completing');
    }, 1200);
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    preloader.style.transition = 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    preloader.style.opacity = '0';
    preloader.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        preloader.remove();
        document.body.style.overflow = 'visible';
        
        // Trigger initial page animations
        triggerPageAnimations();
    }, 600);
}

// ===================================
// Page Snapping Navigation System
// ===================================

function initPageSnappingNavigation() {
    const pageContainer = document.querySelector('.page-container');
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressDots = document.querySelectorAll('.dot');
    
    let currentPageIndex = 0;
    let isNavigating = false;
    let touchStartY = 0;
    let wheelTimeout = null;
    
    // Enhanced smooth scroll configuration
    const scrollConfig = {
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
    };
    
    // Navigation function with Apple-style easing
    function navigateToPage(targetIndex, source = 'programmatic') {
        if (isNavigating || targetIndex === currentPageIndex) return;
        
        isNavigating = true;
        const targetPage = pages[targetIndex];
        
        if (targetPage) {
            // Calculate precise scroll position for perfect centering
            const scrollTop = targetIndex * window.innerHeight;
            
            // Use native smooth scroll for best performance
            pageContainer.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            });
            
            // Update states immediately for responsive UI
            updateNavigationStates(targetIndex);
            currentPageIndex = targetIndex;
            
            // Add page transition effects
            pages.forEach((page, index) => {
                page.classList.toggle('active', index === targetIndex);
                if (index === targetIndex) {
                    setTimeout(() => {
                        page.classList.add('visible');
                        triggerPageAnimations(page);
                    }, 100);
                }
            });
            
            // Reset navigation lock after animation
            setTimeout(() => {
                isNavigating = false;
            }, 800);
        }
    }
    
    // Update navigation states
    function updateNavigationStates(activeIndex) {
        // Update nav links
        navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === activeIndex);
        });
        
        // Update progress dots
        progressDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }
    
    // Enhanced wheel handling with momentum
    let wheelMomentum = 0;
    function handleWheel(e) {
        if (isNavigating) return;
        
        wheelMomentum += e.deltaY;
        
        if (wheelTimeout) clearTimeout(wheelTimeout);
        
        wheelTimeout = setTimeout(() => {
            if (Math.abs(wheelMomentum) > 50) {
                const direction = wheelMomentum > 0 ? 1 : -1;
                const targetIndex = Math.max(0, Math.min(pages.length - 1, currentPageIndex + direction));
                navigateToPage(targetIndex, 'wheel');
            }
            wheelMomentum = 0;
        }, 50);
    }
    
    // Touch navigation for mobile
    function handleTouchStart(e) {
        touchStartY = e.touches[0].clientY;
    }
    
    function handleTouchEnd(e) {
        if (isNavigating) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        
        if (Math.abs(deltaY) > 50) {
            const direction = deltaY > 0 ? 1 : -1;
            const targetIndex = Math.max(0, Math.min(pages.length - 1, currentPageIndex + direction));
            navigateToPage(targetIndex, 'touch');
        }
    }
    
    // Keyboard navigation
    function handleKeyDown(e) {
        if (isNavigating) return;
        
        let targetIndex = currentPageIndex;
        
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
            case ' ':
                e.preventDefault();
                targetIndex = Math.min(pages.length - 1, currentPageIndex + 1);
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                targetIndex = Math.max(0, currentPageIndex - 1);
                break;
            case 'Home':
                e.preventDefault();
                targetIndex = 0;
                break;
            case 'End':
                e.preventDefault();
                targetIndex = pages.length - 1;
                break;
        }
        
        if (targetIndex !== currentPageIndex) {
            navigateToPage(targetIndex, 'keyboard');
        }
    }
    
    // Nav link click handlers
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage(index, 'nav');
        });
    });
    
    // Progress dot click handlers
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            navigateToPage(index, 'dot');
        });
    });
    
    // Event listeners with passive options for performance
    pageContainer.addEventListener('wheel', handleWheel, { passive: false });
    pageContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    pageContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    
    // Initialize first page
    setTimeout(() => {
        updateNavigationStates(0);
        pages[0].classList.add('visible', 'active');
        triggerPageAnimations(pages[0]);
    }, 100);
    
    // Intersection observer for scroll position tracking
    const pageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const pageIndex = Array.from(pages).indexOf(entry.target);
                if (pageIndex !== currentPageIndex && !isNavigating) {
                    currentPageIndex = pageIndex;
                    updateNavigationStates(pageIndex);
                }
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-10% 0px -10% 0px'
    });
    
    pages.forEach(page => pageObserver.observe(page));
}

// ===================================
// Precision Cursor System (Fixed Hover States)
// ===================================

function initPrecisionCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor || window.innerWidth <= 768) return;
    
    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorRing = cursor.querySelector('.cursor-ring');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    // Optimized easing for smooth movement
    const ease = 0.18;
    const ringEase = 0.12;
    
    // High-performance cursor animation
    function updateCursor() {
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        requestAnimationFrame(updateCursor);
    }
    
    // Mouse movement tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Start cursor animation
    updateCursor();
    
    // Enhanced hover detection for all interactive elements
    const interactiveElements = document.querySelectorAll(`
        a, button, 
        .nav-link, .social-link, .cta-button, .contact-btn,
        .project-card, .skill-item, .experience-card,
        .story-section, .tech-item, .achievement,
        .dot, .theme-btn, .scroll-top-btn,
        .stat-item, .publication-item,
        [role="button"], [tabindex]:not([tabindex="-1"])
    `);
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
        
        element.addEventListener('mousedown', () => {
            cursor.classList.add('click');
        });
        
        element.addEventListener('mouseup', () => {
            cursor.classList.remove('click');
        });
    });
    
    // Text selection detection
    const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');
    textElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('text');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('text');
        });
    });
}

// ===================================
// Advanced Intersection Observers
// ===================================

function initAdvancedIntersectionObservers() {
    // Staggered element animation observer
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll('.story-section, .stat-item, .tech-item, .achievement');
                elements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('animate-in');
                    }, index * 150);
                });
            }
        });
    }, { 
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Page content observer
    const contentObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger specific page animations
                const pageType = entry.target.getAttribute('id');
                triggerPageSpecificAnimations(pageType, entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Skills animation observer
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const levelBars = entry.target.querySelectorAll('.level-bar');
                levelBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.style.transform = 'scaleX(1)';
                        bar.style.transformOrigin = 'left';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });
    
    // Observe all relevant sections
    document.querySelectorAll('.page').forEach(page => {
        contentObserver.observe(page);
        staggerObserver.observe(page);
    });
    
    document.querySelectorAll('.skill-domain').forEach(domain => {
        skillsObserver.observe(domain);
    });
}

// ===================================
// Enhanced Theme Toggle
// ===================================

function initEnhancedThemeToggle() {
    const themeBtn = document.querySelector('.theme-btn');
    const themeIcon = themeBtn?.querySelector('i');
    const themeRipple = themeBtn?.querySelector('.theme-ripple');
    
    if (!themeBtn) return;
    
    // Get saved theme or default to dark
    const currentTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeBtn.addEventListener('click', (e) => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Create ripple effect
        const rect = themeBtn.getBoundingClientRect();
        const rippleX = e.clientX - rect.left;
        const rippleY = e.clientY - rect.top;
        
        themeRipple.style.left = rippleX + 'px';
        themeRipple.style.top = rippleY + 'px';
        themeRipple.style.transform = 'translate(-50%, -50%) scale(0)';
        
        // Smooth theme transition with ripple
        requestAnimationFrame(() => {
            document.documentElement.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            
            themeRipple.style.transform = 'translate(-50%, -50%) scale(1)';
            
            updateThemeIcon(newTheme);
            
            // Clean up
            setTimeout(() => {
                document.documentElement.style.transition = '';
                themeRipple.style.transform = 'translate(-50%, -50%) scale(0)';
            }, 300);
        });
    });
    
    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        
        themeIcon.style.transform = 'rotate(180deg) scale(0.8)';
        
        setTimeout(() => {
            themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            themeIcon.style.transform = 'rotate(0deg) scale(1)';
        }, 150);
    }
}

// ===================================
// Smart Scroll Effects
// ===================================

function initSmartScrollEffects() {
    const header = document.querySelector('.header');
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    let lastScrollY = 0;
    let scrollTimeout;
    
    function handleScroll() {
        const currentScrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);
        
        // Only process significant scroll changes for performance
        if (scrollDifference < 5) return;
        
        const isScrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;
        
        // Header visibility logic
        if (header) {
            header.classList.toggle('scrolled', currentScrollY > 100);
            
            // Auto-hide header when scrolling down (except at top)
            if (currentScrollY > 200) {
                header.style.transform = isScrollingDown ? 
                    'translateY(-100%)' : 'translateY(0)';
                header.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        // Scroll to top button
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', currentScrollY > 500);
        }
        
        // Update scroll progress for background effects
        updateScrollProgress(currentScrollY);
    }
    
    // Throttled scroll handler for performance
    function throttledScroll() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 16); // ~60fps
    }
    
    document.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Scroll to top functionality
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            document.querySelector('.page-container').scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    function updateScrollProgress(scrollY) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(100, (scrollY / maxScroll) * 100);
        
        document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
        
        // Update background layers based on scroll
        const layers = document.querySelectorAll('.depth-layer');
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.05;
            const yPos = scrollY * speed;
            layer.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ===================================
// Parallax Background System
// ===================================

function initParallaxBackground() {
    const particles = document.querySelectorAll('.particle');
    const circuitNodes = document.querySelectorAll('.circuit-node');
    
    // Mouse-based parallax
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Update CSS custom properties for depth layers
        document.documentElement.style.setProperty('--mouse-x', `${mouseX * 100}%`);
        document.documentElement.style.setProperty('--mouse-y', `${mouseY * 100}%`);
        
        // Parallax particle movement
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Circuit node glow intensity
        circuitNodes.forEach((node, index) => {
            const distance = Math.sqrt(
                Math.pow(mouseX - 0.5, 2) + Math.pow(mouseY - 0.5, 2)
            );
            const intensity = Math.max(0.3, 1 - distance * 2);
            node.style.opacity = intensity;
        });
    });
    
    // Scroll-based circuit animation
    let animationId;
    function animateCircuit() {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        const circuitLines = document.querySelectorAll('.flow-line');
        
        circuitLines.forEach((line, index) => {
            const offset = (scrollPercent + index * 0.25) % 1;
            const dashOffset = 1000 - (offset * 2000);
            line.style.strokeDashoffset = dashOffset;
        });
        
        animationId = requestAnimationFrame(animateCircuit);
    }
    
    // Start circuit animation
    animateCircuit();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationId) cancelAnimationFrame(animationId);
    });
}

// ===================================
// Advanced Animations
// ===================================

function initAdvancedAnimations() {
    // Typing animation for hero subtitle
    function initTypingAnimation() {
        const typingElements = document.querySelectorAll('.title-subtitle');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            element.textContent = '';
            element.style.borderRight = '2px solid var(--accent-primary)';
            
            let index = 0;
            const typeInterval = setInterval(() => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                } else {
                    clearInterval(typeInterval);
                    setTimeout(() => {
                        element.style.borderRight = 'none';
                    }, 1000);
                }
            }, 80);
        });
    }
    
    // Counter animation for hero stats
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent);
                    const increment = target / 30; // 30 frames for smooth animation
                    let current = 0;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }
    
    // Initialize animations
    setTimeout(initTypingAnimation, 800);
    animateCounters();
}

// ===================================
// Keyboard Navigation
// ===================================

function initKeyboardNavigation() {
    let focusedElementIndex = -1;
    const focusableElements = 'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    document.addEventListener('keydown', (e) => {
        const focusableList = Array.from(document.querySelectorAll(focusableElements))
            .filter(el => el.offsetParent !== null && !el.disabled);
        
        switch(e.key) {
            case 'Tab':
                // Enhanced tab navigation
                if (!e.shiftKey) {
                    focusedElementIndex = Math.min(focusedElementIndex + 1, focusableList.length - 1);
                } else {
                    focusedElementIndex = Math.max(focusedElementIndex - 1, 0);
                }
                
                if (focusableList[focusedElementIndex]) {
                    focusableList[focusedElementIndex].focus();
                    e.preventDefault();
                }
                break;
                
            case 'Escape':
                // Clear focus and return to navigation
                if (document.activeElement) {
                    document.activeElement.blur();
                }
                focusedElementIndex = -1;
                break;
                
            case 'Enter':
                // Enhanced enter behavior for navigation
                if (document.activeElement && document.activeElement.classList.contains('nav-link')) {
                    e.preventDefault();
                    document.activeElement.click();
                }
                break;
        }
    });
}

// ===================================
// Performance Optimizations
// ===================================

function initPerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
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
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Debounce resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate layout if needed
            const event = new CustomEvent('layoutRecalc');
            document.dispatchEvent(event);
        }, 250);
    }, { passive: true });
    
    // Memory cleanup
    window.addEventListener('beforeunload', () => {
        // Clear intervals and animations
        document.querySelectorAll('*').forEach(el => {
            el.removeEventListener?.();
        });
    });
}

// ===================================
// Page-Specific Animations
// ===================================

function triggerPageAnimations(page) {
    if (!page) {
        // Trigger hero animations
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-stats, .hero-actions');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
        return;
    }
    
    const pageId = page.getAttribute('id');
    
    switch(pageId) {
        case 'journey':
            animateStorySection(page);
            break;
        case 'education':
            animateTimeline(page);
            break;
        case 'experience':
            animateExperienceCards(page);
            break;
        case 'innovations':
            animateProjectCards(page);
            break;
        case 'expertise':
            animateSkillBars(page);
            break;
        case 'connect':
            animateContactElements(page);
            break;
    }
}

function triggerPageSpecificAnimations(pageType, pageElement) {
    const elements = pageElement.querySelectorAll('.animate-on-scroll');
    
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate-in');
        }, index * 100);
    });
}

function animateStorySection(page) {
    const storySections = page.querySelectorAll('.story-section');
    storySections.forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateX(0)';
        }, index * 300);
    });
}

function animateTimeline(page) {
    const timelineItems = page.querySelectorAll('.education-milestone');
    timelineItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0) scale(1)';
        }, index * 400);
    });
}

function animateExperienceCards(page) {
    const cards = page.querySelectorAll('.experience-card, .timeline-item');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
    });
}

function animateProjectCards(page) {
    const featured = page.querySelector('.project-featured');
    const cards = page.querySelectorAll('.project-card');
    
    if (featured) {
        featured.style.opacity = '1';
        featured.style.transform = 'scale(1)';
    }
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotate(0deg)';
        }, index * 150);
    });
}

function animateSkillBars(page) {
    const skillBars = page.querySelectorAll('.level-bar');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            bar.style.width = bar.style.getPropertyValue('--level') || '0%';
        }, index * 100);
    });
}

function animateContactElements(page) {
    const elements = page.querySelectorAll('.contact-btn, .opportunity-item, .info-item');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
    });
}

// ===================================
// Utility Functions
// ===================================

// Enhanced debounce with immediate option
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle function for high-frequency events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check element visibility
function isElementVisible(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

// Smooth easing functions
const easingFunctions = {
    easeOutCubic: t => 1 - Math.pow(1 - t, 3),
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeOutQuart: t => 1 - (--t) * t * t * t,
    easeInOutBack: t => {
        const c1 = 1.70158;
        const c2 = c1 * 1.525;
        return t < 0.5
            ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
            : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
    }
};
