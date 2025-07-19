// ===================================
// Advanced Semiconductor Portfolio JavaScript
// Modern Interactive Features with Performance Optimization
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Performance timing for initialization
    const startTime = performance.now();
    
    // Initialize all systems with staggered loading for performance
    initFastPreloader();
    initAdvancedCursor();
    initPageSnapNavigation();
    initDynamicBackground();
    initAdvancedIntersectionObservers();
    initSmartScrollEffects();
    initKeyboardNavigation();
    initTouchGestures();
    initPerformanceOptimizations();
    initAccessibilityFeatures();
    
    // Log initialization performance
    const endTime = performance.now();
    console.log(`🚀 Portfolio initialized in ${(endTime - startTime).toFixed(2)}ms`);
});

// ===================================
// Fast Preloader System (1.5s duration)
// ===================================

function initFastPreloader() {
    const preloader = document.getElementById('loading-overlay');
    const progressBar = document.querySelector('.progress-fill');
    const loadingStatus = document.querySelector('.loading-status');
    const loadingPercent = document.querySelector('.loading-percent');
    
    if (!preloader) return;
    
    const loadingTexts = [
        'Initializing Quantum Systems...',
        'Loading Neural Networks...',
        'Compiling VLSI Modules...',
        'Optimizing Circuits...',
        'System Ready.'
    ];
    
    let textIndex = 0;
    let progress = 0;
    
    // Smooth progress animation
    const progressInterval = setInterval(() => {
        progress += Math.random() * 12 + 8;
        if (progress > 100) progress = 100;
        
        if (progressBar) progressBar.style.width = progress + '%';
        if (loadingPercent) loadingPercent.textContent = Math.round(progress) + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(hidePreloader, 300);
        }
    }, 120);
    
    // Text cycling with smoother transitions
    const textInterval = setInterval(() => {
        if (textIndex < loadingTexts.length - 1 && loadingStatus) {
            loadingStatus.style.opacity = '0';
            setTimeout(() => {
                loadingStatus.textContent = loadingTexts[textIndex];
                loadingStatus.style.opacity = '1';
                textIndex++;
            }, 150);
        } else {
            clearInterval(textInterval);
        }
    }, 250);
}

function hidePreloader() {
    const preloader = document.getElementById('loading-overlay');
    if (!preloader) return;
    
    preloader.classList.add('fade-out');
    
    setTimeout(() => {
        preloader.remove();
        document.body.style.overflow = 'visible';
        initInitialAnimations();
    }, 800);
}

function initInitialAnimations() {
    // Trigger hero section animations with stagger
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title-wrapper, .hero-description, .hero-metrics, .hero-actions');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
    });
    
    // Initialize first page visibility
    const firstPage = document.querySelector('.snap-section');
    if (firstPage) {
        firstPage.classList.add('visible', 'active');
    }
}

// ===================================
// Advanced Cursor System with Synchronized Effects
// ===================================

function initAdvancedCursor() {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor || window.innerWidth <= 768) return;
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let isHovered = false;
    
    const ease = 0.15;
    
    function updateCursor() {
        // Smooth interpolation for natural movement
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        
        // Apply transform with sub-pixel precision
        cursor.style.transform = `translate3d(${cursorX.toFixed(2)}px, ${cursorY.toFixed(2)}px, 0)`;
        
        requestAnimationFrame(updateCursor);
    }
    
    // High-frequency mouse tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update CSS custom properties for background effects
        document.documentElement.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
        document.documentElement.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
    });
    
    // Start cursor animation loop
    updateCursor();
    
    // Enhanced interaction detection with delegated events
    const interactiveSelectors = [
        'a', 'button', '.nav-link', '.social-btn', '.primary-cta', '.contact-cta',
        '.project-card', '.timeline-item', '.achievement-item', '.tech-tag',
        '.metric-card', '.publication-item', '.experience-card', '.skill-item',
        '.progress-dot', '.back-to-top', '.cert-item',
        '[role="button"]', '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
    
    // Use event delegation for better performance
    document.addEventListener('mouseenter', (e) => {
        if (e.target.closest(interactiveSelectors)) {
            cursor.classList.add('hover');
            isHovered = true;
        }
    }, true);
    
    document.addEventListener('mouseleave', (e) => {
        if (e.target.closest(interactiveSelectors)) {
            cursor.classList.remove('hover');
            isHovered = false;
        }
    }, true);
    
    // Click states
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
    
    // Text selection detection
    document.addEventListener('selectstart', () => {
        cursor.classList.add('text');
    });
    
    document.addEventListener('selectend', () => {
        cursor.classList.remove('text');
    });
    
    // Magnetic effect for special elements
    const magneticElements = document.querySelectorAll('.primary-cta, .contact-cta, .social-btn');
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseMoveHandler = (e) => {
                const deltaX = (e.clientX - centerX) * 0.15;
                const deltaY = (e.clientY - centerY) * 0.15;
                element.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
            };
            
            element.addEventListener('mousemove', mouseMoveHandler);
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
                element.removeEventListener('mousemove', mouseMoveHandler);
            }, { once: true });
        });
    });
}

// ===================================
// Page Snap Navigation System
// ===================================

function initPageSnapNavigation() {
    const snapContainer = document.querySelector('.snap-container');
    const pages = document.querySelectorAll('.snap-section');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressDots = document.querySelectorAll('.progress-dot');
    
    if (!snapContainer || pages.length === 0) return;
    
    let currentPageIndex = 0;
    let isNavigating = false;
    let touchStartY = 0;
    let wheelAccumulator = 0;
    
    // Enhanced navigation with momentum detection
    function navigateToPage(targetIndex, source = 'programmatic') {
        if (isNavigating || targetIndex === currentPageIndex || targetIndex < 0 || targetIndex >= pages.length) {
            return;
        }
        
        isNavigating = true;
        const targetPage = pages[targetIndex];
        const scrollTop = targetIndex * window.innerHeight;
        
        // Smooth scroll with custom easing
        snapContainer.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
        });
        
        // Update navigation states immediately
        updateNavigationStates(targetIndex);
        
        // Page transition effects
        pages.forEach((page, index) => {
            page.classList.toggle('active', index === targetIndex);
            if (index === targetIndex) {
                setTimeout(() => {
                    page.classList.add('visible');
                    triggerPageAnimations(page);
                }, 150);
            } else {
                page.classList.remove('visible');
            }
        });
        
        currentPageIndex = targetIndex;
        
        // Reset navigation lock with timeout
        setTimeout(() => {
            isNavigating = false;
        }, 1000);
        
        // Announce page change for accessibility
        if (window.announce) {
            const sectionName = targetPage.getAttribute('id') || 'section';
            window.announce(`Navigated to ${sectionName} section`);
        }
    }
    
    function updateNavigationStates(activeIndex) {
        // Update nav links
        navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === activeIndex);
        });
        
        // Update progress dots with animation
        progressDots.forEach((dot, index) => {
            const wasActive = dot.classList.contains('active');
            dot.classList.toggle('active', index === activeIndex);
            
            if (index === activeIndex && !wasActive) {
                dot.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    dot.style.transform = '';
                }, 200);
            }
        });
        
        // Update progress thumb
        const progressThumb = document.querySelector('.progress-thumb');
        if (progressThumb) {
            const percentage = (activeIndex / (pages.length - 1)) * 100;
            progressThumb.style.top = `${percentage}%`;
        }
    }
    
    // Enhanced wheel handling with acceleration
    function handleWheel(e) {
        if (isNavigating) return;
        
        e.preventDefault();
        wheelAccumulator += e.deltaY;
        
        // Debounced wheel detection
        clearTimeout(handleWheel.timeout);
        handleWheel.timeout = setTimeout(() => {
            if (Math.abs(wheelAccumulator) > 100) {
                const direction = wheelAccumulator > 0 ? 1 : -1;
                const targetIndex = Math.max(0, Math.min(pages.length - 1, currentPageIndex + direction));
                navigateToPage(targetIndex, 'wheel');
            }
            wheelAccumulator = 0;
        }, 100);
    }
    
    // Touch navigation with improved gesture detection
    function handleTouchStart(e) {
        if (e.touches.length !== 1) return;
        touchStartY = e.touches[0].clientY;
    }
    
    function handleTouchEnd(e) {
        if (isNavigating || e.changedTouches.length !== 1) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        const minSwipeDistance = 80;
        
        if (Math.abs(deltaY) > minSwipeDistance) {
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
            default:
                // Check for number key navigation
                const num = parseInt(e.key);
                if (!isNaN(num) && num >= 1 && num <= pages.length) {
                    e.preventDefault();
                    targetIndex = num - 1;
                }
                return;
        }
        
        navigateToPage(targetIndex, 'keyboard');
    }
    
    // Event listeners with optimized options
    snapContainer.addEventListener('wheel', handleWheel, { passive: false });
    snapContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    snapContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    
    // Navigation click handlers
    navLinks.forEach((link, index) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToPage(index, 'nav');
        });
    });
    
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            navigateToPage(index, 'dot');
        });
    });
    
    // Intersection observer for scroll position sync
    const pageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.7) {
                const pageIndex = Array.from(pages).indexOf(entry.target);
                if (pageIndex !== currentPageIndex && !isNavigating) {
                    currentPageIndex = pageIndex;
                    updateNavigationStates(pageIndex);
                }
            }
        });
    }, {
        threshold: [0.5, 0.7, 0.9],
        rootMargin: '-10% 0px -10% 0px'
    });
    
    pages.forEach(page => pageObserver.observe(page));
    
    // Initialize first page
    setTimeout(() => {
        updateNavigationStates(0);
        if (pages[0]) {
            pages[0].classList.add('visible', 'active');
        }
    }, 100);
}

// ===================================
// Dynamic Background System
// ===================================

function initDynamicBackground() {
    const particles = document.querySelectorAll('.particle');
    const circuitNodes = document.querySelectorAll('.circuit-node');
    const circuitPaths = document.querySelectorAll('.circuit-path');
    
    if (particles.length === 0) return;
    
    let mouseX = 0.5;
    let mouseY = 0.5;
    let animationFrameId;
    
    // Mouse-based parallax with smooth interpolation
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
    });
    
    function animateBackground() {
        // Particle parallax movement
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.3;
            const direction = index % 2 === 0 ? 1 : -1;
            const x = (mouseX - 0.5) * speed * 30 * direction;
            const y = (mouseY - 0.5) * speed * 20 * direction;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        // Circuit node glow based on mouse proximity
        circuitNodes.forEach((node, index) => {
            const rect = node.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const distanceX = (mouseX * window.innerWidth - centerX) / window.innerWidth;
            const distanceY = (mouseY * window.innerHeight - centerY) / window.innerHeight;
            const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
            
            const intensity = Math.max(0.4, 1 - distance * 2);
            node.style.opacity = intensity;
        });
        
        animationFrameId = requestAnimationFrame(animateBackground);
    }
    
    // Start background animation
    animateBackground();
    
    // Scroll-based circuit flow animation
    let lastScrollY = 0;
    function updateCircuitFlow() {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(1, scrollY / maxScroll);
        
        circuitPaths.forEach((path, index) => {
            const offset = (scrollProgress + index * 0.25) % 1;
            const dashOffset = 1000 - (offset * 2000);
            path.style.strokeDashoffset = dashOffset;
        });
        
        lastScrollY = scrollY;
    }
    
    // Throttled scroll listener
    document.addEventListener('scroll', throttle(updateCircuitFlow, 16), { passive: true });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
    });
}

// ===================================
// Advanced Intersection Observers
// ===================================

function initAdvancedIntersectionObservers() {
    // Staggered animation observer
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                const animatedElements = entry.target.querySelectorAll(
                    '.timeline-item, .metric-card, '.tech-tag, .achievement-item, ' +
                    '.experience-card, .project-card, '.skill-item, .publication-item, ' +
                    '.cert-item, '.education-item, '.internship-item'
                );
                
                animatedElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0) scale(1)';
                    }, index * 150);
                });
                
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Skills progress bar observer
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const level = bar.getAttribute('data-level') || '0';
                        bar.style.width = level + '%';
                        bar.style.opacity = '1';
                    }, index * 200);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px' 
    });
    
    // Counter animation observer
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.metric-number');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.7 });
    
    // Apply observers
    document.querySelectorAll('.snap-section').forEach(page => {
        staggerObserver.observe(page);
        counterObserver.observe(page);
    });
    
    document.querySelectorAll('.skill-domain').forEach(domain => {
        skillsObserver.observe(domain);
    });
}

function animateCounter(counter) {
    const text = counter.textContent;
    const hasPlus = text.includes('+');
    const target = parseInt(text.replace(/[^\d]/g, ''));
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Eased animation curve
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.round(easeOutQuart * target);
        
        counter.textContent = currentValue + (hasPlus ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===================================
// Smart Scroll Effects
// ===================================

function initSmartScrollEffects() {
    const header = document.querySelector('.main-header');
    const backToTop = document.querySelector('.back-to-top');
    
    let lastScrollY = 0;
    let ticking = false;
    
    function updateScrollEffects() {
        const currentScrollY = window.scrollY || document.documentElement.scrollTop;
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);
        
        // Only process significant scroll changes
        if (scrollDifference < 5) {
            ticking = false;
            return;
        }
        
        const isScrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;
        
        // Header effects
        if (header) {
            header.classList.toggle('scrolled', currentScrollY > 50);
            
            // Auto-hide header when scrolling down (except at top)
            if (currentScrollY > 200) {
                header.style.transform = isScrollingDown ? 
                    'translateY(-100%)' : 'translateY(0)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        // Back to top button
        if (backToTop) {
            backToTop.classList.toggle('visible', currentScrollY > 300);
        }
        
        // Update scroll-based variables
        updateScrollProgress(currentScrollY);
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    document.addEventListener('scroll', requestTick, { passive: true });
    
    // Back to top functionality
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            const snapContainer = document.querySelector('.snap-container');
            if (snapContainer) {
                snapContainer.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    function updateScrollProgress(scrollY) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
        
        document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
        
        // Parallax depth layers
        const layers = document.querySelectorAll('.depth-layer');
        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrollY * speed);
            layer.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// ===================================
// Keyboard Navigation Enhancement
// ===================================

function initKeyboardNavigation() {
    let focusedElementIndex = -1;
    
    // Enhanced tab navigation
    document.addEventListener('keydown', (e) => {
        const focusableElements = Array.from(document.querySelectorAll(
            'a:not([tabindex="-1"]), button:not([tabindex="-1"]), ' +
            'input:not([tabindex="-1"]), select:not([tabindex="-1"]), ' +
            'textarea:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
        )).filter(el => {
            return el.offsetParent !== null && !el.disabled && 
                   getComputedStyle(el).visibility !== 'hidden';
        });
        
        switch(e.key) {
            case 'Tab':
                // Custom tab behavior with visual feedback
                if (!e.shiftKey) {
                    focusedElementIndex = Math.min(focusedElementIndex + 1, focusableElements.length - 1);
                } else {
                    focusedElementIndex = Math.max(focusedElementIndex - 1, 0);
                }
                
                if (focusableElements[focusedElementIndex]) {
                    focusableElements[focusedElementIndex].focus();
                    e.preventDefault();
                }
                break;
                
            case 'Escape':
                if (document.activeElement) {
                    document.activeElement.blur();
                }
                focusedElementIndex = -1;
                break;
                
            case 'Enter':
                if (document.activeElement && 
                    document.activeElement.classList.contains('nav-link')) {
                    e.preventDefault();
                    document.activeElement.click();
                }
                break;
        }
    });
    
    // Visual focus indicators
    document.addEventListener('focusin', (e) => {
        e.target.style.outline = '2px solid var(--accent-primary)';
        e.target.style.outlineOffset = '2px';
    });
    
    document.addEventListener('focusout', (e) => {
        e.target.style.outline = '';
        e.target.style.outlineOffset = '';
    });
}

// ===================================
// Touch Gestures for Mobile
// ===================================

function initTouchGestures() {
    if (!('ontouchstart' in window)) return;
    
    let touchStartTime = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let isSwipeGesture = false;
    
    document.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        
        touchStartTime = Date.now();
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwipeGesture = false;
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length !== 1 || isSwipeGesture) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = Math.abs(touchX - touchStartX);
        const deltaY = Math.abs(touchY - touchStartY);
        
        // Determine if this is a swipe gesture
        if (deltaY > 50 && deltaY > deltaX * 2) {
            isSwipeGesture = true;
        }
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (e.changedTouches.length !== 1) return;
        
        const touchEndTime = Date.now();
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        
        const touchDuration = touchEndTime - touchStartTime;
        const deltaY = touchStartY - touchEndY;
        const deltaX = Math.abs(touchEndX - touchStartX);
        
        // Quick vertical swipe detection
        if (isSwipeGesture && touchDuration < 500 && Math.abs(deltaY) > 80 && deltaX < 100) {
            const direction = deltaY > 0 ? 'up' : 'down';
            const event = new CustomEvent('quickSwipe', { 
                detail: { direction, deltaY, duration: touchDuration } 
            });
            document.dispatchEvent(event);
        }
    }, { passive: true });
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
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy-load');
                        imageObserver.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    const criticalResources = [
        { url: 'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap', type: 'style' },
        { url: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css', type: 'style' }
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.url;
        link.as = resource.type;
        if (resource.type === 'style') {
            link.onload = () => {
                link.rel = 'stylesheet';
            };
        }
        document.head.appendChild(link);
    });
    
    // Memory management
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Recalculate layouts if needed
            const event = new CustomEvent('layoutRecalc');
            document.dispatchEvent(event);
        }, 250);
    }, { passive: true });
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        // Cancel any ongoing animations
        if (window.cancelAnimationFrame) {
            const animationFrames = [];
            // Clean up any stored animation frame IDs
            animationFrames.forEach(id => window.cancelAnimationFrame(id));
        }
    });
}

// ===================================
// Accessibility Features
// ===================================

function initAccessibilityFeatures() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--duration-fast', '0.01ms');
        document.documentElement.style.setProperty('--duration-normal', '0.01ms');
        document.documentElement.style.setProperty('--duration-medium', '0.01ms');
        document.documentElement.style.setProperty('--duration-slow', '0.01ms');
        
        // Disable animations
        const style = document.createElement('style');
        style.textContent = '*, *::before, *::after { animation-duration: 0.01ms !important; }';
        document.head.appendChild(style);
    }
    
    // High contrast mode detection
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.documentElement.classList.add('high-contrast');
    }
    
    // Screen reader announcements
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.position = 'absolute';
    announcer.style.width = '1px';
    announcer.style.height = '1px';
    announcer.style.padding = '0';
    announcer.style.margin = '-1px';
    announcer.style.overflow = 'hidden';
    announcer.style.clip = 'rect(0, 0, 0, 0)';
    announcer.style.whiteSpace = 'nowrap';
    announcer.style.border = '0';
    document.body.appendChild(announcer);
    
    window.announce = (message) => {
        announcer.textContent = message;
        setTimeout(() => {
            announcer.textContent = '';
        }, 1000);
    };
    
    // Enhanced skip links
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute !important;
        top: -40px;
        left: 6px;
        background: var(--accent-primary);
        color: white;
        padding: 8px 12px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10000;
        transition: top 0.3s;
        font-weight: 600;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// ===================================
// Page-Specific Animations
// ===================================

function triggerPageAnimations(page) {
    if (!page) return;
    
    const pageId = page.getAttribute('id');
    
    // Common page elements animation
    const commonElements = page.querySelectorAll('.section-header, .section-container');
    commonElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
    
    // Page-specific animations
    switch(pageId) {
        case 'home':
            animateHeroElements(page);
            break;
        case 'about':
            animateAboutElements(page);
            break;
        case 'education':
            animateEducationElements(page);
            break;
        case 'experience':
            animateExperienceElements(page);
            break;
        case 'projects':
            animateProjectElements(page);
            break;
        case 'skills':
            animateSkillElements(page);
            break;
        case 'contact':
            animateContactElements(page);
            break;
    }
}

function animateHeroElements(page) {
    const elements = page.querySelectorAll('.hero-badge, .hero-title-wrapper, .hero-description, .hero-metrics, .hero-actions');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }, index * 300);
    });
}

function animateAboutElements(page) {
    const timelineItems = page.querySelectorAll('.timeline-item');
    timelineItems.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) scale(1)';
        }, index * 400);
    });
}

function animateEducationElements(page) {
    const educationItems = page.querySelectorAll('.education-item');
    educationItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 500);
    });
}

function animateExperienceElements(page) {
    const experienceCards = page.querySelectorAll('.experience-card, .internship-item');
    experienceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateY(0deg)';
        }, index * 300);
    });
}

function animateProjectElements(page) {
    const projectElements = page.querySelectorAll('.featured-project, '.project-card, .publication-item');
    projectElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }, index * 250);
    });
}

function animateSkillElements(page) {
    const skillDomains = page.querySelectorAll('.skill-domain');
    skillDomains.forEach((domain, index) => {
        setTimeout(() => {
            domain.style.opacity = '1';
            domain.style.transform = 'translateY(0)';
            
            // Animate skill bars
            const skillBars = domain.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, barIndex) => {
                setTimeout(() => {
                    const level = bar.getAttribute('data-level') || '0';
                    bar.style.width = level + '%';
                }, barIndex * 100);
            });
        }, index * 400);
    });
}

function animateContactElements(page) {
    const contactElements = page.querySelectorAll('.contact-cta, '.opportunity-area, .info-item, .social-connection');
    contactElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
    });
}

// ===================================
// Utility Functions
// ===================================

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

function lerp(start, end, factor) {
    return start * (1 - factor) + end * factor;
}

// ===================================
// Enhanced Event Handlers
// ===================================

// Custom events for better component communication
document.addEventListener('pageChange', (e) => {
    console.log(`Page changed to: ${e.detail.pageName}`);
});

// Quick swipe event handler
document.addEventListener('quickSwipe', (e) => {
    console.log(`Quick swipe detected: ${e.detail.direction}`);
});

// Layout recalculation event
document.addEventListener('layoutRecalc', () => {
    console.log('Layout recalculated');
});

// ===================================
// Development Tools (for debugging)
// ===================================

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.portfolioDebug = {
        navigateToPage: (index) => {
            const pages = document.querySelectorAll('.snap-section');
            if (pages[index]) {
                const snapContainer = document.querySelector('.snap-container');
                snapContainer.scrollTo({
                    top: index * window.innerHeight,
                    behavior: 'smooth'
                });
            }
        },
        getPerformanceMetrics: () => {
            if (performance && performance.memory) {
                return {
                    memory: {
                        used: `${(performance.memory.usedJSHeapSize / 1048576).toFixed(2)} MB`,
                        allocated: `${(performance.memory.totalJSHeapSize / 1048576).toFixed(2)} MB`,
                        limit: `${(performance.memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
                    },
                    timing: performance.getEntriesByType('navigation')[0]
                };
            }
            return 'Performance API not available';
        },
        triggerPageAnimations,
        version: '2.0.0'
    };
    
    console.log('🔧 Debug tools available in window.portfolioDebug');
}

// ===================================
// Initialize Analytics (if needed)
// ===================================

function initAnalytics() {
    // Page view tracking
    function trackPageView(pageName) {
        console.log(`Page view: ${pageName}`);
        // Add your analytics code here (Google Analytics, etc.)
    }
    
    // Track initial page load
    trackPageView('Home');
    
    // Track page navigation
    document.addEventListener('pageChange', (e) => {
        trackPageView(e.detail.pageName);
    });
}

// Initialize analytics if needed
// initAnalytics();

console.log('🚀 Advanced Semiconductor Portfolio JavaScript initialized successfully!');
console.log('✨ Features: Page snapping, cursor sync, advanced animations, performance optimized');
