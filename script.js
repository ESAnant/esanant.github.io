// --- DOCUMENT READY & INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initializePreloader();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeExperienceTabs();
    initializeNavigationHighlight();
    initializeProjectAnimations();
    initializeChipAnimations();
    initializeTypingAnimation();
    initializeSkillsAnimation();
    initializeContactForm();
    initializeParticleBackground();
    lucide.createIcons();
});

// --- PRELOADER WITH CIRCUIT ANIMATION ---
function initializePreloader() {
    const preloader = document.getElementById('preloader');
    const circuitNodes = document.querySelectorAll('.circuit-node');
    
    // Animate circuit nodes in sequence
    circuitNodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.animationDelay = `${index * 0.5}s`;
        }, index * 200);
    });
    
    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.style.overflow = 'visible';
        }, 1500);
    });
}

// --- ADVANCED MOBILE MENU ---
function initializeMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const nav = document.getElementById('nav-links');
    const navLinks = nav.querySelectorAll('a');
    const body = document.body;
    
    let isMenuOpen = false;
    
    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        
        // Toggle classes with smooth transition
        menuToggle.classList.toggle('is-active', isMenuOpen);
        nav.classList.toggle('mobile-active', isMenuOpen);
        nav.classList.toggle('is-open', isMenuOpen);
        body.classList.toggle('blur', isMenuOpen);
        
        // Add staggered animation to menu items
        if (isMenuOpen) {
            navLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0)';
                }, index * 100);
            });
        } else {
            navLinks.forEach(link => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(20px)';
            });
        }
    };
    
    // Menu toggle event
    menuToggle.addEventListener('click', toggleMenu);
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) {
                toggleMenu();
            }
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });
}

// --- ENHANCED SCROLL EFFECTS ---
function initializeScrollEffects() {
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateScrollEffects = () => {
        const currentScrollY = window.scrollY;
        
        // Header scroll effects
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    };
    
    const requestScrollUpdate = () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    };
    
    window.addEventListener('scroll', requestScrollUpdate);
    
    // Intersection Observer for section animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Trigger specific animations for different sections
                if (entry.target.id === 'about') {
                    animateSkills();
                } else if (entry.target.id === 'projects') {
                    animateProjects();
                } else if (entry.target.id === 'research') {
                    animateResearchCards();
                }
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// --- EXPERIENCE TABS WITH SMOOTH TRANSITIONS ---
function initializeExperienceTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Add typing animation to the new content
            const activeContent = document.getElementById(tabId);
            const duties = activeContent.querySelectorAll('.experience-duties li');
            
            duties.forEach((duty, index) => {
                duty.style.opacity = '0';
                duty.style.transform = 'translateX(-20px)';
                
                setTimeout(() => {
                    duty.style.opacity = '1';
                    duty.style.transform = 'translateX(0)';
                    duty.style.transition = 'all 0.3s ease';
                }, index * 100);
            });
        });
    });
}

// --- NAVIGATION HIGHLIGHT WITH SMOOTH TRANSITIONS ---
function initializeNavigationHighlight() {
    const navLinks = document.querySelectorAll('#nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    const highlightObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`#nav-links a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        rootMargin: '-30% 0px -70% 0px'
    });
    
    sections.forEach(section => {
        highlightObserver.observe(section);
    });
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --- PROJECT ANIMATIONS ---
function initializeProjectAnimations() {
    const projectItems = document.querySelectorAll('.project-item');
    
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.2
    });
    
    projectItems.forEach(item => {
        projectObserver.observe(item);
    });
}

function animateProjects() {
    const projects = document.querySelectorAll('.project-item');
    
    projects.forEach((project, index) => {
        setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'translateY(0)';
            project.style.transition = 'all 0.6s ease';
        }, index * 200);
    });
}

// --- FLOATING CHIP ANIMATIONS ---
function initializeChipAnimations() {
    const chips = document.querySelectorAll('.chip-element');
    
    chips.forEach((chip, index) => {
        // Add random float animation
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;
        
        chip.style.animationDelay = `${randomDelay}s`;
        chip.style.animationDuration = `${randomDuration}s`;
        
        // Add interactive hover effects
        chip.addEventListener('mouseenter', () => {
            chip.style.transform = 'scale(1.1) translateY(-10px)';
            chip.style.transition = 'transform 0.3s ease';
        });
        
        chip.addEventListener('mouseleave', () => {
            chip.style.transform = 'scale(1) translateY(0)';
        });
    });
}

// --- TYPING ANIMATION FOR HERO SECTION ---
function initializeTypingAnimation() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let index = 0;
    const typeSpeed = 50;
    
    function typeText() {
        if (index < text.length) {
            heroSubtitle.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, typeSpeed);
        } else {
            // Add blinking cursor
            heroSubtitle.innerHTML += '<span class="cursor">|</span>';
            
            // Style the cursor
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                cursor.style.animation = 'blink 1s infinite';
            }
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeText, 1000);
}

// --- SKILLS ANIMATION ---
function initializeSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px) scale(1.05)';
            item.style.boxShadow = '0 5px 15px rgba(100, 255, 218, 0.3)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0) scale(1)';
            item.style.boxShadow = 'none';
        });
    });
}

function animateSkills() {
    const skillCategories = document.querySelectorAll('.skill-category');
    
    skillCategories.forEach((category, index) => {
        setTimeout(() => {
            category.style.opacity = '1';
            category.style.transform = 'translateY(0)';
            category.style.transition = 'all 0.5s ease';
            
            // Animate skill items within category
            const skillItems = category.querySelectorAll('.skill-item');
            skillItems.forEach((item, itemIndex) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                    item.style.transition = 'all 0.3s ease';
                }, itemIndex * 50);
            });
        }, index * 200);
    });
}

// --- RESEARCH CARDS ANIMATION ---
function animateResearchCards() {
    const researchCards = document.querySelectorAll('.research-card');
    
    researchCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.6s ease';
        }, index * 300);
    });
}

// --- CONTACT FORM ENHANCEMENTS ---
function initializeContactForm() {
    const contactButtons = document.querySelectorAll('.contact-buttons .button');
    
    contactButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-3px) scale(1.05)';
            button.style.boxShadow = '0 10px 25px rgba(100, 255, 218, 0.3)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = 'none';
        });
    });
}

// --- PARTICLE BACKGROUND SYSTEM ---
function initializeParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.1';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    const createParticle = () => {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2,
            color: `hsl(${Math.random() * 60 + 160}, 70%, 60%)`
        };
    };
    
    const updateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around screen edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
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
                    ctx.strokeStyle = '#64ffda';
                    ctx.globalAlpha = (100 - distance) / 100 * 0.2;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(updateParticles);
    };
    
    // Initialize particles
    const initParticles = () => {
        particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    };
    
    resizeCanvas();
    initParticles();
    updateParticles();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
}

// --- SCROLL-TO-TOP FUNCTIONALITY ---
function initializeScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i data-lucide="chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: 2px solid var(--accent);
        background: var(--dark-navy);
        color: var(--accent);
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        justify-content: center;
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
        scrollBtn.style.boxShadow = '0 5px 15px rgba(100, 255, 218, 0.3)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.transform = 'scale(1)';
        scrollBtn.style.boxShadow = 'none';
    });
}

// --- KEYBOARD NAVIGATION ---
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Navigation with arrow keys
        if (e.ctrlKey || e.metaKey) {
            const sections = ['hero', 'about', 'experience', 'projects', 'research', 'contact'];
            const currentSection = sections.find(id => {
                const element = document.getElementById(id);
                const rect = element.getBoundingClientRect();
                return rect.top <= 100 && rect.bottom >= 100;
            });
            
            const currentIndex = sections.indexOf(currentSection);
            
            if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
                e.preventDefault();
                const nextSection = document.getElementById(sections[currentIndex + 1]);
                nextSection.scrollIntoView({ behavior: 'smooth' });
            } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                e.preventDefault();
                const prevSection = document.getElementById(sections[currentIndex - 1]);
                prevSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// --- PERFORMANCE OPTIMIZATION ---
function initializePerformanceOptimizations() {
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
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Scroll handling code here
        }, 16);
    });
}

// --- DYNAMIC THEME SWITCHING ---
function initializeThemeSwitching() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i data-lucide="sun"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border: 1px solid var(--accent);
        background: var(--dark-navy);
        color: var(--accent);
        border-radius: 50%;
        cursor: pointer;
        z-index: 1001;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        themeToggle.innerHTML = isLight ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
        lucide.createIcons();
    });
}

// --- INITIALIZE ALL FEATURES ---
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initializePreloader();
    initializeMobileMenu();
    initializeScrollEffects();
    initializeExperienceTabs();
    initializeNavigationHighlight();
    initializeProjectAnimations();
    initializeChipAnimations();
    initializeTypingAnimation();
    initializeSkillsAnimation();
    initializeContactForm();
    
    // Enhanced features
    initializeParticleBackground();
    initializeScrollToTop();
    initializeKeyboardNavigation();
    initializePerformanceOptimizations();
    initializeThemeSwitching();
    
    // Initialize icons
    lucide.createIcons();
});

// --- CUSTOM CSS ADDITIONS ---
const additionalStyles = `
/* Cursor animation */
@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

.cursor {
    color: var(--accent);
    font-weight: 300;
    animation: blink 1s infinite;
}

/* Scroll to top button hover */
.scroll-to-top:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(100, 255, 218, 0.3);
}

/* Theme toggle hover */
.theme-toggle:hover {
    transform: scale(1.1);
    box-shadow: 0 3px 10px rgba(100, 255, 218, 0.3);
}

/* Project animations */
.project-item {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease;
}

.project-item.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Skill category animations */
.skill-category {
    opacity: 0;
    transform: translateY(20px);
}

.skill-category .skill-item {
    opacity: 0;
    transform: translateY(10px);
}

/* Research card animations */
.research-card {
    opacity: 0;
    transform: translateY(30px);
}

/* Light theme styles */
.light-theme {
    --dark-navy: #f8f9fa;
    --navy: #e9ecef;
    --light-navy: #dee2e6;
    --slate: #495057;
    --light-slate: #343a40;
    --lightest-slate: #212529;
    --white: #000000;
}

/* Mobile menu animations */
#nav-links.mobile-active a {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.3s ease;
}

/* Particle canvas */
#particle-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    opacity: 0.1;
}
`;

// Add the additional styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
