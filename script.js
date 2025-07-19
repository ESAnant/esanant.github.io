document.addEventListener('DOMContentLoaded', () => {
    // Systems Initialization
    initPreloader();
    initPageSnappingNavigation();
    initPrecisionCursor();
    initThemeToggle();
    initScrollAnimations();
    initParallaxBackground();
});

// Preloader System
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const texts = ['Calibrating Silicon...', 'Aligning Photolithography...', 'System Ready.'];
    const textSequence = document.querySelector('.text-sequence');
    let textIndex = 0;
    
    const textInterval = setInterval(() => {
        textIndex++;
        if (textSequence && textIndex < texts.length) {
            textSequence.textContent = texts[textIndex];
        } else {
            clearInterval(textInterval);
        }
    }, 500);

    setTimeout(() => hidePreloader(preloader), 1500);
}

function hidePreloader(preloader) {
    preloader.style.opacity = '0';
    preloader.style.transform = 'scale(0.95)';
    setTimeout(() => {
        preloader.remove();
        document.body.style.overflow = '';
        document.querySelector('.page')?.classList.add('visible');
    }, 600);
}

// Page Snapping Navigation System
function initPageSnappingNavigation() {
    const container = document.querySelector('.page-container');
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const dots = document.querySelectorAll('.dot');
    if (!container || pages.length === 0) return;

    let currentPageIndex = 0;
    let isNavigating = false;
    let wheelTimeout;

    const navigateToPage = (index) => {
        if (isNavigating || index === currentPageIndex) return;
        isNavigating = true;
        
        document.getElementById('cursor')?.classList.remove('hover', 'text');

        pages[index]?.scrollIntoView({ behavior: 'smooth' });
        updateActiveStates(index);
        currentPageIndex = index;

        setTimeout(() => isNavigating = false, 1000);
    };

    const updateActiveStates = (index) => {
        pages.forEach((page, i) => page.classList.toggle('visible', i === index));
        navLinks.forEach((link, i) => link.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        if (wheelTimeout) clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (isNavigating) return;
            const direction = e.deltaY > 0 ? 1 : -1;
            const nextIndex = Math.max(0, Math.min(pages.length - 1, currentPageIndex + direction));
            navigateToPage(nextIndex);
        }, 50);
    }, { passive: false });
    
    navLinks.forEach((link, i) => link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToPage(i);
    }));

    dots.forEach((dot, i) => dot.addEventListener('click', () => navigateToPage(i)));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
                const index = Array.from(pages).indexOf(entry.target);
                if (!isNavigating) {
                     updateActiveStates(index);
                     currentPageIndex = index;
                }
            }
        });
    }, { threshold: 0.6 });

    pages.forEach(page => observer.observe(page));
}

// Precision Cursor System
function initPrecisionCursor() {
    const cursor = document.getElementById('cursor');
    if (!cursor || window.innerWidth <= 768) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const ease = 0.15;

    function updateCursor() {
        cursorX += (mouseX - cursorX) * ease;
        cursorY += (mouseY - cursorY) * ease;
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
        requestAnimationFrame(updateCursor);
    }
    
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const interactiveElements = document.querySelectorAll('a, button, .dot, .project-card, .social-link');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
    
    const textElements = document.querySelectorAll('p, span, h1, h2, h3, h4');
     textElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('text'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('text'));
    });

    updateCursor();
}

// Theme Toggle System
function initThemeToggle() {
    const themeBtn = document.querySelector('.theme-btn');
    if (!themeBtn) return;
    
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    themeBtn.addEventListener('click', () => {
        let currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });
}

// Scroll-Triggered Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}


// Parallax Background System
function initParallaxBackground() {
    const particles = document.querySelectorAll('.particle');
    let animationFrameId;

    const animateCircuit = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) || 0;
        document.querySelectorAll('.flow-line').forEach((line, index) => {
            const offset = (scrollPercent * 2 + index * 0.25) % 1;
            line.style.strokeDashoffset = 1000 - offset * 2000;
        });
        animationFrameId = requestAnimationFrame(animateCircuit);
    };

    const handleVisibilityChange = () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            animateCircuit();
        }
    };
    
    document.addEventListener('mousemove', e => {
        if (window.innerWidth <= 768) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        
        particles.forEach((p, i) => {
            const speed = (i % 4 + 1) * 0.25;
            p.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);
    animateCircuit();
}
