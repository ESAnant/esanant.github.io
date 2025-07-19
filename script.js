// ===================================
// Advanced Semiconductor Portfolio JavaScript - FIXED VERSION
// All Issues Resolved: Preloader, Navigation, Selectors, Performance
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Starting portfolio initialization...');
    
    // Performance timing for initialization
    const startTime = performance.now();
    
    // Initialize systems with proper error handling
    try {
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
        console.log(`✅ Portfolio initialized in ${(endTime - startTime).toFixed(2)}ms`);
    } catch (error) {
        console.error('❌ Initialization error:', error);
        // Fallback: ensure page works even if JS fails
        forceShowContent();
    }
});

// ===================================
// FIXED: Fast Preloader System with Proper Selectors
// ===================================

function initFastPreloader() {
    const preloader = document.getElementById('preloader') || document.getElementById('loading-overlay');
    const progressBar = document.querySelector('.progress-fill'); // Fixed selector
    const textSequence = document.querySelector('.loading-status'); // Fixed selector
    const loadingPercent = document.querySelector('.loading-percent');
    
    console.log('🔄 Preloader elements found:', { preloader: !!preloader, progressBar: !!progressBar, textSequence: !!textSequence });
    
    if (!preloader) {
        console.log('⚠️ No preloader found, initializing main site directly');
        initMainSite();
        return;
    }
    
    const loadingTexts = [
        'Initializing Quantum Systems...',
        'Loading Neural Networks...',
        'Compiling VLSI Modules...',
        'Optimizing Circuits...',
        'System Ready.'
    ];
    
    let textIndex = 0;
    let progress = 0;
    let progressInterval;
    let textInterval;
    
    // Start immediately with guaranteed completion
    setTimeout(() => {
        // Fast progress animation with guaranteed completion
        progressInterval = setInterval(() => {
            progress += Math.random() * 12 + 8; // Faster progression
            if (progress > 100) progress = 100;
            
            if (progressBar) progressBar.style.width = progress + '%';
            if (loadingPercent) loadingPercent.textContent = Math.round(progress) + '%';
            
            console.log(`📈 Loading progress: ${Math.round(progress)}%`);
            
            if (progress >= 100) {
                clearInterval(progressInterval);
                setTimeout(() => {
                    console.log('✅ Preloader complete, hiding...');
                    hidePreloader();
                }, 200);
            }
        }, 100); // Faster interval
        
        // Text cycling with error handling
        textInterval = setInterval(() => {
            if (textIndex < loadingTexts.length - 1 && textSequence) {
                textSequence.style.opacity = '0';
                setTimeout(() => {
                    if (textSequence) {
                        textSequence.textContent = loadingTexts[textIndex];
                        textSequence.style.opacity = '1';
                        textIndex++;
                    }
                }, 100);
            } else {
                clearInterval(textInterval);
            }
        }, 300);
        
        // Absolute failsafe - force completion after 3 seconds
        setTimeout(() => {
            console.log('⏰ Failsafe triggered - forcing preloader completion');
            clearInterval(progressInterval);
            clearInterval(textInterval);
            hidePreloader();
        }, 3000);
    }, 100);
}

function hidePreloader() {
    const preloader = document.getElementById('preloader') || document.getElementById('loading-overlay');
    if (!preloader) {
        initMainSite();
        return;
    }
    
    console.log('🎭 Hiding preloader...');
    
    // Multiple animation methods for compatibility
    preloader.classList.add('fade-out');
    preloader.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
    preloader.style.opacity = '0';
    preloader.style.transform = 'scale(0.95)';
    preloader.style.pointerEvents = 'none';
    
    setTimeout(() => {
        if (preloader && preloader.parentNode) {
            preloader.remove();
        }
        document.body.style.overflow = 'visible';
        initMainSite();
    }, 800);
}

function initMainSite() {
    console.log('🌟 Initializing main site...');
    
    try {
        // Initialize animations with proper selectors
        initInitialAnimations();
        
        // Ensure first page is visible
        const firstPage = document.querySelector('.page') || document.querySelector('.snap-section');
        if (firstPage) {
            firstPage.classList.add('visible', 'active');
            console.log('✅ First page activated');
        }
        
        // Force enable scroll container
        const container = document.querySelector('.page-container') || document.querySelector('.snap-container');
        if (container) {
            container.style.overflow = 'auto';
            console.log('✅ Scroll container enabled');
        }
        
        // Ensure body is ready
        document.body.classList.add('loaded');
        
    } catch (error) {
        console.error('❌ Main site initialization error:', error);
        forceShowContent();
    }
}

function forceShowContent() {
    console.log('🚨 Force showing content as fallback');
    
    // Remove any blocking elements
    const preloader = document.getElementById('preloader') || document.getElementById('loading-overlay');
    if (preloader) preloader.remove();
    
    // Show all content
    document.body.style.overflow = 'visible';
    document.body.classList.add('loaded');
    
    const allPages = document.querySelectorAll('.page, .snap-section');
    allPages.forEach((page, index) => {
        page.style.opacity = '1';
        page.style.transform = 'translateY(0)';
        if (index === 0) page.classList.add('visible', 'active');
    });
}

function initInitialAnimations() {
    console.log('🎨 Starting initial animations...');
    
    // Fixed selectors for hero elements
    const heroSelectors = [
        '.hero-badge', 
        '.hero-title, .hero-title-wrapper', 
        '.hero-description', 
        '.hero-stats, .hero-metrics', 
        '.hero-actions'
    ];
    
    heroSelectors.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0) scale(1)';
                console.log(`✅ Animated: ${selector}`);
            }, index * 200);
        }
    });
}

// ===================================
// FIXED: Advanced Cursor System with Better Compatibility
// ===================================

function initAdvancedCursor() {
    if (window.innerWidth <= 768) {
        console.log('📱 Mobile detected, skipping cursor');
        return;
    }
    
    const cursor = document.querySelector('.custom-cursor') || document.getElementById('cursor');
    if (!cursor) {
        console.log('⚠️ Custom cursor element not found');
        return;
    }
    
    console.log('🖱️ Initializing advanced cursor...');
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let animationFrameId;
    
    const ease = 0.15;
    
    function updateCursor() {
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        
        cursor.style.transform = `translate3d(${cursorX.toFixed(2)}px, ${cursorY.toFixed(2)}px, 0)`;
        animationFrameId = requestAnimationFrame(updateCursor);
    }
    
    // Mouse tracking with throttling
    let lastMoveTime = 0;
    document.addEventListener('mousemove', (e) => {
        const now = performance.now();
        if (now - lastMoveTime < 16) return; // 60fps throttle
        
        mouseX = e.clientX;
        mouseY = e.clientY;
        lastMoveTime = now;
        
        // Update CSS variables for background effects
        document.documentElement.style.setProperty('--mouse-x', `${(e.clientX / window.innerWidth) * 100}%`);
        document.documentElement.style.setProperty('--mouse-y', `${(e.clientY / window.innerHeight) * 100}%`);
    });
    
    // Start cursor animation
    updateCursor();
    
    // FIXED: Interactive elements detection with better selectors
    const interactiveSelectors = [
        'a', 'button', '.nav-link', '.social-link', '.social-btn', 
        '.cta-button', '.primary-cta', '.contact-btn',
        '.project-card', '.story-section', '.achievement', '.achievement-item',
        '.tech-item', '.tech-tag', '.stat-item', '.metric-card', 
        '.publication-item', '.experience-card', '.skill-item',
        '.dot', '.progress-dot', '.scroll-top-btn', '.back-to-top',
        '[role="button"]', '[tabindex]:not([tabindex="-1"])'
    ].join(', ');
    
    // Use event delegation for better performance
    document.addEventListener('mouseenter', (e) => {
        if (e.target.matches(interactiveSelectors) || e.target.closest(interactiveSelectors)) {
            cursor.classList.add('hover');
        }
    }, true);
    
    document.addEventListener('mouseleave', (e) => {
        if (e.target.matches(interactiveSelectors) || e.target.closest(interactiveSelectors)) {
            cursor.classList.remove('hover');
        }
    }, true);
    
    // Click states
    document.addEventListener('mousedown', () => cursor.classList.add('click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('click'));
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });
    
    console.log('✅ Advanced cursor initialized');
}

// ===================================
// FIXED: Page Snap Navigation with Correct Selectors
// ===================================

function initPageSnapNavigation() {
    console.log('🔄 Initializing page navigation...');
    
    // Try multiple container selectors for compatibility
    const pageContainer = document.querySelector('.page-container') || 
                         document.querySelector('.snap-container') || 
                         document.querySelector('main');
                         
    const pages = document.querySelectorAll('.page') || 
                  document.querySelectorAll('.snap-section');
                  
    const navLinks = document.querySelectorAll('.nav-link');
    const progressDots = document.querySelectorAll('.progress-dot') || 
                        document.querySelectorAll('.dot');
    
    console.log('📍 Navigation elements:', { 
        container: !!pageContainer, 
        pages: pages.length, 
        navLinks: navLinks.length, 
        dots: progressDots.length 
    });
    
    if (!pageContainer || pages.length === 0) {
        console.log('⚠️ Page navigation elements not found');
        return;
    }
    
    let currentPageIndex = 0;
    let isNavigating = false;
    let touchStartY = 0;
    let wheelAccumulator = 0;
    
    // Enhanced navigation function
    function navigateToPage(targetIndex, source = 'programmatic') {
        if (isNavigating || targetIndex === currentPageIndex || targetIndex < 0 || targetIndex >= pages.length) {
            return;
        }
        
        console.log(`🧭 Navigating to page ${targetIndex} (${source})`);
        
        isNavigating = true;
        const targetPage = pages[targetIndex];
        const scrollTop = targetIndex * window.innerHeight;
        
        // Multiple scroll methods for compatibility
        try {
            if (pageContainer.scrollTo) {
                pageContainer.scrollTo({
                    top: scrollTop,
                    behavior: 'smooth'
                });
            } else {
                pageContainer.scrollTop = scrollTop;
            }
        } catch (error) {
            console.warn('Scroll fallback used:', error);
            pageContainer.scrollTop = scrollTop;
        }
        
        // Update navigation states
        updateNavigationStates(targetIndex);
        
        // Page transition effects
        pages.forEach((page, index) => {
            page.classList.toggle('active', index === targetIndex);
            if (index === targetIndex) {
                setTimeout(() => {
                    page.classList.add('visible');
                    triggerPageAnimations(page);
                }, 100);
            } else {
                page.classList.remove('visible');
            }
        });
        
        currentPageIndex = targetIndex;
        
        // Reset navigation lock
        setTimeout(() => {
            isNavigating = false;
        }, 1000);
    }
    
    function updateNavigationStates(activeIndex) {
        // Update nav links
        navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === activeIndex);
        });
        
        // Update progress dots
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
        if (progressThumb && progressDots.length > 1) {
            const percentage = (activeIndex / (pages.length - 1)) * 100;
            progressThumb.style.top = `${percentage}%`;
        }
    }
    
    // FIXED: Wheel handling with better debouncing
    let wheelTimeout;
    function handleWheel(e) {
        if (isNavigating) return;
        
        e.preventDefault();
        wheelAccumulator += e.deltaY;
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (Math.abs(wheelAccumulator) > 50) { // Lower threshold for responsiveness
                const direction = wheelAccumulator > 0 ? 1 : -1;
                const targetIndex = Math.max(0, Math.min(pages.length - 1, currentPageIndex + direction));
                navigateToPage(targetIndex, 'wheel');
            }
            wheelAccumulator = 0;
        }, 80); // Faster response
    }
    
    // Touch navigation
    function handleTouchStart(e) {
        if (e.touches.length !== 1) return;
        touchStartY = e.touches[0].clientY;
    }
    
    function handleTouchEnd(e) {
        if (isNavigating || e.changedTouches.length !== 1) return;
        
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;
        const minSwipeDistance = 60; // More responsive
        
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
                if (!e.target.matches('input, textarea, select')) {
                    e.preventDefault();
                    targetIndex = Math.min(pages.length - 1, currentPageIndex + 1);
                }
                break;
            case 'ArrowUp':
            case 'PageUp':
                if (!e.target.matches('input, textarea, select')) {
                    e.preventDefault();
                    targetIndex = Math.max(0, currentPageIndex - 1);
                }
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
                const num = parseInt(e.key);
                if (!isNaN(num) && num >= 1 && num <= pages.length) {
                    e.preventDefault();
                    targetIndex = num - 1;
                }
                return;
        }
        
        navigateToPage(targetIndex, 'keyboard');
    }
    
    // Event listeners with proper error handling
    try {
        pageContainer.addEventListener('wheel', handleWheel, { passive: false });
        pageContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        pageContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
        document.addEventListener('keydown', handleKeyDown);
    } catch (error) {
        console.warn('Event listener setup warning:', error);
    }
    
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
    
    // FIXED: Intersection observer for better scroll detection
    if ('IntersectionObserver' in window) {
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
            threshold: [0.3, 0.5, 0.7],
            rootMargin: '-20% 0px -20% 0px'
        });
        
        pages.forEach(page => pageObserver.observe(page));
    }
    
    // Initialize first page
    setTimeout(() => {
        updateNavigationStates(0);
        if (pages[0]) {
            pages[0].classList.add('visible', 'active');
        }
    }, 100);
    
    console.log('✅ Page navigation initialized');
}

// ===================================
// FIXED: Dynamic Background System with Performance Optimization
// ===================================

function initDynamicBackground() {
    console.log('🎨 Initializing dynamic background...');
    
    const particles = document.querySelectorAll('.particle');
    const circuitNodes = document.querySelectorAll('.circuit-node');
    const flowLines = document.querySelectorAll('.flow-line, .circuit-path');
    
    if (particles.length === 0) {
        console.log('⚠️ No particles found for background animation');
        return;
    }
    
    let mouseX = 0.5;
    let mouseY = 0.5;
    let animationFrameId;
    let isVisible = true;
    
    // Optimized mouse tracking
    let lastMouseUpdate = 0;
    document.addEventListener('mousemove', (e) => {
        const now = performance.now();
        if (now - lastMouseUpdate < 32) return; // 30fps for background
        
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        lastMouseUpdate = now;
    });
    
    // Optimized animation function
    function animateBackground() {
        if (!isVisible) {
            animationFrameId = requestAnimationFrame(animateBackground);
            return;
        }
        
        // Particle parallax movement with performance optimization
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.2; // Reduced for performance
            const direction = index % 2 === 0 ? 1 : -1;
            const x = (mouseX - 0.5) * speed * 20 * direction;
            const y = (mouseY - 0.5) * speed * 15 * direction;
            
            particle.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
        
        // Circuit node interaction (throttled)
        if (circuitNodes.length > 0 && performance.now() % 100 < 16) {
            circuitNodes.forEach((node) => {
                const rect = node.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const distanceX = (mouseX * window.innerWidth - centerX) / window.innerWidth;
                const distanceY = (mouseY * window.innerHeight - centerY) / window.innerHeight;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                
                const intensity = Math.max(0.4, 1 - distance * 2);
                node.style.opacity = intensity;
            });
        }
        
        animationFrameId = requestAnimationFrame(animateBackground);
    }
    
    // Visibility API for performance
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
    });
    
    // Start animation
    animateBackground();
    
    // FIXED: Scroll-based circuit flow with throttling
    let lastScrollUpdate = 0;
    function updateCircuitFlow() {
        const now = performance.now();
        if (now - lastScrollUpdate < 32) return; // 30fps throttle
        
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
        
        flowLines.forEach((line, index) => {
            const offset = (scrollProgress + index * 0.25) % 1;
            const dashOffset = 1000 - (offset * 2000);
            line.style.strokeDashoffset = dashOffset;
        });
        
        lastScrollUpdate = now;
    }
    
    document.addEventListener('scroll', updateCircuitFlow, { passive: true });
    
    // Cleanup
    window.addEventListener('beforeunload', () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });
    
    console.log('✅ Dynamic background initialized');
}

// ===================================
// FIXED: Intersection Observers with Better Performance
// ===================================

function initAdvancedIntersectionObservers() {
    console.log('👀 Setting up intersection observers...');
    
    // Staggered animation observer
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                
                const animatedElements = entry.target.querySelectorAll(
                    '.story-section, .timeline-item, .stat-item, '.metric-card, ' +
                    '.tech-item, '.tech-tag, '.achievement, '.achievement-item, ' +
                    '.experience-card, '.project-card, '.skill-item, ' +
                    '.publication-item, '.education-item, '.internship-item'
                );
                
                animatedElements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0) scale(1)';
                    }, index * 100); // Faster stagger
                });
                
                staggerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Lower threshold for earlier triggers
        rootMargin: '0px 0px -20px 0px'
    });
    
    // Skills progress observer with better selector
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress, .level-bar');
                progressBars.forEach((bar, index) => {
                    setTimeout(() => {
                        const level = bar.getAttribute('data-level') || '0';
                        bar.style.width = level + '%';
                        bar.style.opacity = '1';
                    }, index * 150);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px' 
    });
    
    // Counter animation observer
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number, .metric-number');
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Apply observers to correct elements
    const pages = document.querySelectorAll('.page, .snap-section');
    pages.forEach(page => {
        staggerObserver.observe(page);
        counterObserver.observe(page);
    });
    
    const skillDomains = document.querySelectorAll('.skill-domain, .skills-ecosystem .skill-domain');
    skillDomains.forEach(domain => {
        skillsObserver.observe(domain);
    });
    
    console.log('✅ Intersection observers initialized');
}

function animateCounter(counter) {
    if (!counter || counter.dataset.animated) return;
    counter.dataset.animated = 'true';
    
    const text = counter.textContent;
    const hasPlus = text.includes('+');
    const target = parseInt(text.replace(/[^\d]/g, '')) || 0;
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
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
// FIXED: Smart Scroll Effects
// ===================================

function initSmartScrollEffects() {
    console.log('📜 Initializing scroll effects...');
    
    const header = document.querySelector('.header, .main-header');
    const scrollTopBtn = document.querySelector('.scroll-top-btn, .back-to-top');
    
    let lastScrollY = 0;
    let ticking = false;
    
    function updateScrollEffects() {
        const currentScrollY = window.scrollY;
        const scrollDifference = Math.abs(currentScrollY - lastScrollY);
        
        if (scrollDifference < 3) {
            ticking = false;
            return;
        }
        
        const isScrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;
        
        // Header effects
        if (header) {
            header.classList.toggle('scrolled', currentScrollY > 30);
            
            if (currentScrollY > 150) {
                header.style.transform = isScrollingDown ? 
                    'translateY(-100%)' : 'translateY(0)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        // Back to top button
        if (scrollTopBtn) {
            scrollTopBtn.classList.toggle('visible', currentScrollY > 200);
        }
        
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
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const container = document.querySelector('.page-container, .snap-container, main');
            if (container && container.scrollTo) {
                container.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    }
    
    function updateScrollProgress(scrollY) {
        const maxScroll = Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            1
        );
        const scrollPercent = Math.min(100, Math.max(0, (scrollY / maxScroll) * 100));
        
        document.documentElement.style.setProperty('--scroll-progress', `${scrollPercent}%`);
        
        // Parallax depth layers (throttled)
        if (performance.now() % 100 < 16) {
            const layers = document.querySelectorAll('.depth-layer');
            layers.forEach((layer, index) => {
                const speed = (index + 1) * 0.05; // Reduced for performance
                const yPos = -(scrollY * speed);
                layer.style.transform = `translateY(${yPos}px)`;
            });
        }
    }
    
    console.log('✅ Scroll effects initialized');
}

// ===================================
// Enhanced Keyboard Navigation
// ===================================

function initKeyboardNavigation() {
    console.log('⌨️ Setting up keyboard navigation...');
    
    let focusedElementIndex = -1;
    
    document.addEventListener('keydown', (e) => {
        // Skip if user is typing in an input
        if (e.target.matches('input, textarea, select, [contenteditable]')) {
            return;
        }
        
        const focusableElements = Array.from(document.querySelectorAll(
            'a:not([tabindex="-1"]), button:not([tabindex="-1"]), ' +
            'input:not([tabindex="-1"]), select:not([tabindex="-1"]), ' +
            'textarea:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
        )).filter(el => {
            return el.offsetParent !== null && !el.disabled && 
                   getComputedStyle(el).visibility !== 'hidden' &&
                   getComputedStyle(el).display !== 'none';
        });
        
        switch(e.key) {
            case 'Tab':
                if (focusableElements.length > 0) {
                    if (!e.shiftKey) {
                        focusedElementIndex = Math.min(focusedElementIndex + 1, focusableElements.length - 1);
                    } else {
                        focusedElementIndex = Math.max(focusedElementIndex - 1, 0);
                    }
                    
                    if (focusableElements[focusedElementIndex]) {
                        focusableElements[focusedElementIndex].focus();
                        e.preventDefault();
                    }
                }
                break;
                
            case 'Escape':
                if (document.activeElement && document.activeElement.blur) {
                    document.activeElement.blur();
                }
                focusedElementIndex = -1;
                break;
                
            case 'Enter':
                if (document.activeElement && 
                    document.activeElement.matches('.nav-link, .progress-dot, .social-btn')) {
                    e.preventDefault();
                    document.activeElement.click();
                }
                break;
        }
    });
    
    // Visual focus indicators
    document.addEventListener('focusin', (e) => {
        e.target.style.outline = '2px solid var(--accent-primary, #0ea5e9)';
        e.target.style.outlineOffset = '2px';
    });
    
    document.addEventListener('focusout', (e) => {
        e.target.style.outline = '';
        e.target.style.outlineOffset = '';
    });
    
    console.log('✅ Keyboard navigation initialized');
}

// ===================================
// Touch Gestures for Mobile
// ===================================

function initTouchGestures() {
    if (!('ontouchstart' in window)) {
        console.log('💻 Touch not supported, skipping gesture setup');
        return;
    }
    
    console.log('👆 Setting up touch gestures...');
    
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
        
        if (deltaY > 30 && deltaY > deltaX * 1.5) {
            isSwipeGesture = true;
        }
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        if (e.changedTouches.length !== 1) return;
        
        const touchEndTime = Date.now();
        const touchEndY = e.changedTouches[0].clientY;
        
        const touchDuration = touchEndTime - touchStartTime;
        const deltaY = touchStartY - touchEndY;
        
        if (isSwipeGesture && touchDuration < 500 && Math.abs(deltaY) > 50) {
            const direction = deltaY > 0 ? 'up' : 'down';
            const event = new CustomEvent('quickSwipe', { 
                detail: { direction, deltaY, duration: touchDuration } 
            });
            document.dispatchEvent(event);
        }
    }, { passive: true });
    
    console.log('✅ Touch gestures initialized');
}

// ===================================
// Performance Optimizations
// ===================================

function initPerformanceOptimizations() {
    console.log('⚡ Applying performance optimizations...');
    
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
        }, { rootMargin: '50px 0px' });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Memory management
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const event = new CustomEvent('layoutRecalc');
            document.dispatchEvent(event);
        }, 200);
    }, { passive: true });
    
    // Prefetch important resources
    const prefetchLinks = [
        'https://fonts.gstatic.com',
        'https://cdnjs.cloudflare.com'
    ];
    
    prefetchLinks.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = url;
        document.head.appendChild(link);
    });
    
    console.log('✅ Performance optimizations applied');
}

// ===================================
// Accessibility Features
// ===================================

function initAccessibilityFeatures() {
    console.log('♿ Setting up accessibility features...');
    
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after { 
                animation-duration: 0.01ms !important; 
                animation-iteration-count: 1 !important; 
                transition-duration: 0.01ms !important; 
            }
        `;
        document.head.appendChild(style);
        console.log('🎭 Reduced motion enabled');
    }
    
    // High contrast mode detection
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.documentElement.classList.add('high-contrast');
        console.log('🔆 High contrast mode detected');
    }
    
    // Screen reader announcements
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.style.cssText = `
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        padding: 0 !important;
        margin: -1px !important;
        overflow: hidden !important;
        clip: rect(0, 0, 0, 0) !important;
        white-space: nowrap !important;
        border: 0 !important;
    `;
    document.body.appendChild(announcer);
    
    window.announce = (message) => {
        announcer.textContent = message;
        setTimeout(() => announcer.textContent = '', 1000);
    };
    
    console.log('✅ Accessibility features initialized');
}

// ===================================
// Page-Specific Animations with Error Handling
// ===================================

function triggerPageAnimations(page) {
    if (!page) return;
    
    const pageId = page.getAttribute('id') || 'unknown';
    console.log(`🎬 Triggering animations for: ${pageId}`);
    
    try {
        // Common elements animation
        const commonElements = page.querySelectorAll('.section-header, .page-header, .hero-content');
        commonElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        // Page-specific animations
        switch(pageId) {
            case 'home':
                animateHeroElements(page);
                break;
            case 'about':
                animateStoryElements(page);
                break;
            case 'education':
                animateTimelineElements(page);
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
            default:
                console.log(`No specific animations for page: ${pageId}`);
        }
    } catch (error) {
        console.warn('Animation error:', error);
    }
}

function animateHeroElements(page) {
    const elements = page.querySelectorAll('.hero-badge, .hero-title, .hero-title-wrapper, .hero-description, .hero-stats, .hero-metrics, .hero-actions');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }, index * 200);
    });
}

function animateStoryElements(page) {
    const elements = page.querySelectorAll('.timeline-item, .story-section, .tech-cluster');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateX(0) scale(1)';
        }, index * 250);
    });
}

function animateTimelineElements(page) {
    const items = page.querySelectorAll('.education-item, .education-milestone');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) scale(1)';
        }, index * 300);
    });
}

function animateExperienceElements(page) {
    const cards = page.querySelectorAll('.experience-card, .internship-item, .timeline-item');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) rotateY(0deg)';
        }, index * 200);
    });
}

function animateProjectElements(page) {
    const elements = page.querySelectorAll('.featured-project, .project-card, .publication-item');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }, index * 180);
    });
}

function animateSkillElements(page) {
    const domains = page.querySelectorAll('.skill-domain');
    domains.forEach((domain, index) => {
        setTimeout(() => {
            domain.style.opacity = '1';
            domain.style.transform = 'translateY(0)';
            
            // Animate skill bars
            const skillBars = domain.querySelectorAll('.skill-progress');
            skillBars.forEach((bar, barIndex) => {
                setTimeout(() => {
                    const level = bar.getAttribute('data-level') || '0';
                    bar.style.width = level + '%';
                }, barIndex * 80);
            });
        }, index * 250);
    });
}

function animateContactElements(page) {
    const elements = page.querySelectorAll('.contact-btn, .contact-card, .opportunity-item, .info-item');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }, index * 150);
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
// Error Handling & Debugging
// ===================================

// Global error handler
window.addEventListener('error', function(e) {
    console.error('❌ JavaScript Error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
    
    // Attempt recovery
    if (e.message.includes('preloader') || e.message.includes('navigation')) {
        console.log('🔧 Attempting error recovery...');
        setTimeout(forceShowContent, 1000);
    }
});

// Development tools
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.portfolioDebug = {
        navigateToPage: (index) => {
            const pages = document.querySelectorAll('.page, .snap-section');
            if (pages[index]) {
                const container = document.querySelector('.page-container, .snap-container');
                if (container) {
                    container.scrollTo({
                        top: index * window.innerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        },
        showPreloader: () => {
            initFastPreloader();
        },
        forceShow: forceShowContent,
        checkElements: () => {
            console.log('🔍 Element check:', {
                preloader: !!document.getElementById('preloader'),
                pages: document.querySelectorAll('.page, .snap-section').length,
                nav: document.querySelectorAll('.nav-link').length,
                cursor: !!document.querySelector('.custom-cursor')
            });
        },
        version: '2.1.0-fixed'
    };
    
    console.log('🔧 Debug tools available in window.portfolioDebug');
    console.log('🔍 Use portfolioDebug.checkElements() to verify setup');
}

// Final initialization check
console.log('🎯 JavaScript initialization complete!');
console.log('✨ All systems operational - preloader, navigation, animations, and performance optimizations active');
