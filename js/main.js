// Enhanced Portfolio with Cool Animations and Snap Navigation
class CoolECEPortfolio {
    constructor() {
        this.currentSection = 0;
        this.sections = document.querySelectorAll('.snap-section');
        this.navDots = document.querySelectorAll('.nav-dot');
        this.snapContainer = document.getElementById('snapContainer');
        this.isScrolling = false;
        
        this.init();
    }

    init() {
        this.showLoader();
        this.setupParticleBackground();
        this.setupSnapNavigation();
        this.setupScrollAnimations();
        this.setupCounterAnimations();
        this.setupFlipCardInteractions();
        this.setupEventListeners();
        
        // Hide loader after 4 seconds (longer for fun animation)
        setTimeout(() => {
            this.hideLoader();
            this.revealSections();
        }, 4000);
    }

    showLoader() {
        const loader = document.getElementById('loader');
        document.body.style.overflow = 'hidden';
    }

    hideLoader() {
        const loader = document.getElementById('loader');
        loader.classList.add('fade-out');
        document.body.style.overflow = 'auto';
        
        setTimeout(() => {
            loader.style.display = 'none';
        }, 800);
    }

    setupParticleBackground() {
        const canvas = document.getElementById('particleCanvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let connectionNodes = [];
        
        // Resize canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        // Create particles with ECE theme
        function createParticles() {
            particles = [];
            const particleCount = Math.floor((canvas.width * canvas.height) / 12000);
            
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 3 + 1,
                    speedX: (Math.random() - 0.5) * 0.3,
                    speedY: (Math.random() - 0.5) * 0.3,
                    opacity: Math.random() * 0.6 + 0.2,
                    color: Math.random() > 0.7 ? '#0066ff' : '#00ff88',
                    pulse: Math.random() * Math.PI * 2
                });
            }
            
            // Create connection nodes
            connectionNodes = [];
            for (let i = 0; i < 5; i++) {
                connectionNodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: 30 + Math.random() * 20,
                    pulse: Math.random() * Math.PI * 2
                });
            }
        }
        
        // Animate particles
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Update and draw particles
            particles.forEach((particle, index) => {
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.pulse += 0.02;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;
                
                // Pulsing effect
                const pulseFactor = 0.5 + 0.5 * Math.sin(particle.pulse);
                const currentOpacity = particle.opacity * pulseFactor;
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = particle.color + Math.floor(currentOpacity * 255).toString(16).padStart(2, '0');
                ctx.fill();
                
                // Add glow effect for special particles
                if (particle.size > 2) {
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                    ctx.fillStyle = particle.color + '20';
                    ctx.fill();
                }
            });
            
            // Draw connection nodes
            connectionNodes.forEach(node => {
                node.pulse += 0.01;
                const pulseFactor = 0.3 + 0.7 * Math.sin(node.pulse);
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius * pulseFactor, 0, Math.PI * 2);
                ctx.strokeStyle = '#00ff88' + '20';
                ctx.lineWidth = 2;
                ctx.stroke();
            });
            
            // Connect nearby particles with neural network style
            particles.forEach((particleA, indexA) => {
                particles.forEach((particleB, indexB) => {
                    if (indexA !== indexB) {
                        const distance = Math.hypot(particleA.x - particleB.x, particleA.y - particleB.y);
                        if (distance < 120) {
                            const opacity = (1 - distance / 120) * 0.3;
                            ctx.beginPath();
                            ctx.moveTo(particleA.x, particleA.y);
                            ctx.lineTo(particleB.x, particleB.y);
                            ctx.strokeStyle = `#00ff88${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
                            ctx.lineWidth = 1;
                            ctx.stroke();
                        }
                    }
                });
            });
            
            requestAnimationFrame(animateParticles);
        }
        
        resizeCanvas();
        createParticles();
        animateParticles();
        
        window.addEventListener('resize', () => {
            resizeCanvas();
            createParticles();
        });
    }

    setupSnapNavigation() {
        // Snap scroll behavior
        this.snapContainer.addEventListener('scroll', this.throttle(() => {
            this.updateActiveSection();
        }, 100));
        
        // Navigation dots
        this.navDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.scrollToSection(index);
            });
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                this.scrollToSection(Math.min(this.currentSection + 1, this.sections.length - 1));
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                this.scrollToSection(Math.max(this.currentSection - 1, 0));
            }
        });
        
        // Wheel navigation with better control
        let wheelTimeout;
        this.snapContainer.addEventListener('wheel', (e) => {
            if (this.isScrolling) return;
            
            clearTimeout(wheelTimeout);
            wheelTimeout = setTimeout(() => {
                if (Math.abs(e.deltaY) > 50) { // Only trigger on significant wheel movement
                    if (e.deltaY > 0 && this.currentSection < this.sections.length - 1) {
                        this.scrollToSection(this.currentSection + 1);
                    } else if (e.deltaY < 0 && this.currentSection > 0) {
                        this.scrollToSection(this.currentSection - 1);
                    }
                }
            }, 100);
        });
    }

    scrollToSection(index) {
        if (this.isScrolling || index === this.currentSection) return;
        
        this.isScrolling = true;
        this.currentSection = index;
        
        const targetSection = this.sections[index];
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        this.updateNavDots();
        
        setTimeout(() => {
            this.isScrolling = false;
        }, 1000);
    }

    updateActiveSection() {
        const scrollTop = this.snapContainer.scrollTop;
        const sectionHeight = window.innerHeight;
        const newSection = Math.round(scrollTop / sectionHeight);
        
        if (newSection !== this.currentSection && newSection >= 0 && newSection < this.sections.length) {
            this.currentSection = newSection;
            this.updateNavDots();
        }
    }

    updateNavDots() {
        this.navDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSection);
        });
    }

    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Special animations for different sections
                    if (entry.target.classList.contains('about-section')) {
                        this.animateSkillCards();
                    }
                    if (entry.target.classList.contains('experience-section')) {
                        this.animateExperienceCards();
                    }
                    if (entry.target.classList.contains('projects-section')) {
                        this.animateProjectCards();
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        this.sections.forEach(section => {
            observer.observe(section);
        });
    }

    animateSkillCards() {
        const skillCards = document.querySelectorAll('.flip-card');
        skillCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 200);
        });
    }

    animateExperienceCards() {
        const expCards = document.querySelectorAll('.experience-flip-card');
        expCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) rotateX(0)';
            }, index * 300);
        });
    }

    animateProjectCards() {
        const projectCards = document.querySelectorAll('.project-flip-card');
        projectCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 250);
        });
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.7 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
                
                // Add completion effect
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }
        }, 16);
    }

    setupFlipCardInteractions() {
        // Skills flip cards
        const skillCards = document.querySelectorAll('.flip-card');
        skillCards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('clicked');
            });
            
            // Auto-flip demo on page load
            setTimeout(() => {
                card.addEventListener('mouseenter', () => {
                    if (!card.classList.contains('clicked')) {
                        card.querySelector('.flip-card-inner').style.transform = 'rotateY(180deg)';
                    }
                });
                
                card.addEventListener('mouseleave', () => {
                    if (!card.classList.contains('clicked')) {
                        card.querySelector('.flip-card-inner').style.transform = 'rotateY(0deg)';
                    }
                });
            }, 1000);
        });

        // Experience flip cards with enhanced interactions
        const experienceCards = document.querySelectorAll('.experience-flip-card');
        experienceCards.forEach(card => {
            let flipTimeout;
            
            card.addEventListener('mouseenter', () => {
                clearTimeout(flipTimeout);
                card.querySelector('.experience-flip-inner').style.transform = 'rotateY(180deg)';
                
                // Add company badge animation
                const badge = card.querySelector('.company-badge');
                badge.style.transform = 'rotate(360deg) scale(1.1)';
                setTimeout(() => {
                    badge.style.transform = 'rotate(0deg) scale(1)';
                }, 600);
            });
            
            card.addEventListener('mouseleave', () => {
                flipTimeout = setTimeout(() => {
                    card.querySelector('.experience-flip-inner').style.transform = 'rotateY(0deg)';
                }, 300);
            });
            
            card.addEventListener('click', () => {
                const inner = card.querySelector('.experience-flip-inner');
                const currentTransform = inner.style.transform;
                inner.style.transform = currentTransform.includes('180deg') ? 'rotateY(0deg)' : 'rotateY(180deg)';
            });
        });

        // Project flip cards with cool effects
        const projectCards = document.querySelectorAll('.project-flip-card');
        projectCards.forEach(card => {
            let flipTimeout;
            
            card.addEventListener('mouseenter', () => {
                clearTimeout(flipTimeout);
                card.querySelector('.project-flip-inner').style.transform = 'rotateY(180deg)';
                
                // Add icon pulse effect
                const icon = card.querySelector('.project-icon');
                icon.style.animation = 'none';
                setTimeout(() => {
                    icon.style.animation = 'iconPulse 0.6s ease';
                }, 10);
            });
            
            card.addEventListener('mouseleave', () => {
                flipTimeout = setTimeout(() => {
                    card.querySelector('.project-flip-inner').style.transform = 'rotateY(0deg)';
                }, 300);
            });
            
            card.addEventListener('click', () => {
                const inner = card.querySelector('.project-flip-inner');
                const currentTransform = inner.style.transform;
                inner.style.transform = currentTransform.includes('180deg') ? 'rotateY(0deg)' : 'rotateY(180deg)';
            });
        });
    }

    setupEventListeners() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                
                // Map section IDs to section indices
                const sectionMap = {
                    'contact': 6,
                    'research': 5,
                    'projects': 4,
                    'experience': 3,
                    'education': 2,
                    'about': 1,
                    'home': 0
                };
                
                const sectionIndex = sectionMap[targetId];
                if (sectionIndex !== undefined) {
                    this.scrollToSection(sectionIndex);
                }
            });
        });

        // Add cool processor interactions
        this.setupProcessorInteractions();
        
        // Add publication card interactions
        this.setupPublicationInteractions();
    }

    setupProcessorInteractions() {
        const processorChip = document.querySelector('.processor-chip');
        const ioPins = document.querySelectorAll('.io-pin');
        
        if (processorChip) {
            processorChip.addEventListener('click', () => {
                // Trigger enhanced processing animation
                processorChip.style.animation = 'none';
                setTimeout(() => {
                    processorChip.style.animation = 'chipProcessing 1s ease-in-out';
                }, 10);
            });
        }
        
        // IO Pin interactions
        ioPins.forEach(pin => {
            pin.addEventListener('click', () => {
                // Create signal pulse effect
                const signal = document.createElement('div');
                signal.style.position = 'absolute';
                signal.style.width = '4px';
                signal.style.height = '4px';
                signal.style.background = '#00ff88';
                signal.style.borderRadius = '50%';
                signal.style.boxShadow = '0 0 10px #00ff88';
                signal.style.pointerEvents = 'none';
                
                const rect = pin.getBoundingClientRect();
                const container = document.querySelector('.processor-container');
                const containerRect = container.getBoundingClientRect();
                
                signal.style.left = (rect.left - containerRect.left) + 'px';
                signal.style.top = (rect.top - containerRect.top) + 'px';
                
                container.appendChild(signal);
                
                // Animate signal to chip center
                setTimeout(() => {
                    signal.style.transition = 'all 0.5s ease';
                    signal.style.left = '50%';
                    signal.style.top = '50%';
                    signal.style.transform = 'translate(-50%, -50%)';
                    signal.style.opacity = '0';
                }, 10);
                
                setTimeout(() => {
                    signal.remove();
                }, 600);
            });
        });
    }

    setupPublicationInteractions() {
        const pubCards = document.querySelectorAll('.publication-card');
        pubCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const icon = card.querySelector('.pub-icon i');
                icon.style.transform = 'rotateY(180deg) scale(1.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                const icon = card.querySelector('.pub-icon i');
                icon.style.transform = 'rotateY(0deg) scale(1)';
            });
        });
    }

    revealSections() {
        // Staggered section reveals
        this.sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('visible');
            }, index * 200);
        });
    }

    throttle(func, limit) {
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
}

// Performance monitoring
class PerformanceMonitor {
    static init() {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`🚀 Cool ECE Portfolio loaded in ${Math.round(loadTime)}ms`);
        });
    }
}

// Add some extra
