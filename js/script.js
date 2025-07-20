/*------------------------------------------------------------------
[Master JavaScript V13 - The Digital Architect Edition]

Project:    The Definitive ECE Portfolio
Author:     AI Assistant for Edidi Sai Anant
Version:    13.0
-------------------------------------------------------------------*/

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- PROJECT DATA ---
    const projectsData = [
        {
            title: "FPGA Hardware Accelerator for MLP Neural Network",
            description: "Developed a hardware accelerator on a Xilinx Zynq-7000 FPGA to dramatically improve MLP neural network inference times. Implemented and profiled designs in software, HLS, and Verilog, utilizing advanced optimization techniques like pipelining, loop unrolling, and array partitioning to achieve significant gains in speed and power efficiency.",
            tags: ['FPGA', 'HLS', 'Verilog', 'Xilinx Vivado']
        },
        {
            title: "Digital Circuit Design and Standard Cell IP Development",
            description: "Contributed to the creation of a ring oscillator Standard Cell IP using a hierarchical design approach in Cadence Virtuoso. The project targeted 40nm technology, with a primary focus on minimizing silicon area while optimizing for Performance, Voltage, and Temperature (PVT) variations. Ensured absolute design integrity through strict adherence to DRC and LVS standards.",
            tags: ['Cadence Virtuoso', 'VLSI', '40nm', 'Standard Cell']
        },
        {
            title: "In-Memory Compute Circuit for Neural Network Acceleration",
            description: "Engineered a novel in-memory compute circuit using NeuroSim and MuMax3 to accelerate neural network computations directly within memory arrays. The work concentrated on quantization and optimization strategies to boost model accuracy and efficiency. Conducted extensive simulations in PyTorch to analyze and compare model performance with various data types.",
            tags: ['NeuroSim', 'PyTorch', 'Quantization', 'In-Memory Compute']
        },
        {
            title: "VLSI Interconnect Modelling and Simulation",
            description: "Optimized critical processor interconnects for a 2-core processor design at the 45nm technology node. Utilized Elmore RC delay models and Cadence Virtuoso for precise simulation and analysis, focusing on navigating the complex energy-delay trade-offs to enhance signal integrity and overall system performance in a complex VLSI environment.",
            tags: ['Digital IC Design', 'Cadence', '45nm', 'Signal Integrity']
        }
    ];

    // --- 1. INITIALIZATION & SETUP ---
    lucide.createIcons();
    const loader = document.getElementById('loader');

    // --- 2. VORTEX LOADER ANIMATION ---
    const canvas = document.getElementById('vortex-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let particles = [];
        let t = 0;
        const numParticles = 2500;

        class Particle {
            constructor() {
                this.x = width * 0.5;
                this.y = height * 0.5;
                this.angle = Math.random() * Math.PI * 2;
                this.radius = Math.random() * 150 + 50;
                this.speed = Math.random() * 0.1 + 0.05;
                this.size = Math.random() * 1.5 + 0.5;
            }
            update() {
                this.radius -= this.speed * 2;
                if (this.radius < 0) this.radius = 0;
                this.x = width * 0.5 + Math.cos(this.angle) * this.radius;
                this.y = height * 0.5 + Math.sin(this.angle) * this.radius;
                this.angle += this.speed;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 169, 255, ${this.radius / 150})`;
                ctx.fill();
            }
        }

        function initParticles() {
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }

        let animationFrame;
        function animateLoader() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            animationFrame = requestAnimationFrame(animateLoader);
        }

        initParticles();
        animateLoader();

        setTimeout(() => {
            cancelAnimationFrame(animationFrame);
            // Discharge animation
            ctx.fillStyle = '#00A9FF';
            ctx.beginPath();
            ctx.arc(width / 2, height / 2, 5, 0, Math.PI * 2);
            ctx.fill();
            gsap.to(ctx.canvas, {
                duration: 0.5,
                opacity: 0,
                onComplete: () => loader.classList.add('hidden')
            });
        }, 2000); // End loader animation after 2s
    }

    // --- 3. GSAP ANIMATIONS & SCROLL TRIGGERS ---
    gsap.registerPlugin(ScrollTrigger);

    // Section reveal animations
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        gsap.fromTo(section,
            { autoAlpha: 0, y: 50 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Horizontal scroll for Journey section
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        gsap.to(timeline, {
            x: () => -(timeline.scrollWidth - document.documentElement.clientWidth),
            ease: "none",
            scrollTrigger: {
                trigger: ".journey-wrapper",
                start: "top top",
                end: () => "+=" + (timeline.scrollWidth - document.documentElement.clientWidth),
                scrub: true,
                pin: true,
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });
    }


    // --- 4. INTERACTIVE PROJECT CARDS ---
    const projectGrid = document.querySelector('.project-grid');
    if (projectGrid) {
        // Populate grid
        projectsData.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card';
            const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');

            card.innerHTML = `
                <div class="project-card-inner">
                    <div class="project-header">
                        <h4>${project.title}</h4>
                        <i class="expand-icon" data-lucide="plus"></i>
                    </div>
                    <div class="project-details">
                        <p>${project.description}</p>
                        <div class="project-tags">${tagsHTML}</div>
                    </div>
                </div>
            `;
            projectGrid.appendChild(card);
            lucide.createIcons({
                nodes: [card.querySelector('.expand-icon')]
            });
        });

        // Add event listeners
        projectGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (card) {
                card.classList.toggle('open');
            }
        });
        
        // 3D Tilt Effect
        projectGrid.addEventListener('mousemove', (e) => {
            const card = e.target.closest('.project-card');
            if (card) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const { width, height } = rect;
                const rotateX = (y / height - 0.5) * -15; // Invert for natural feel
                const rotateY = (x / width - 0.5) * 15;
                
                gsap.to(card, {
                    duration: 0.4,
                    rotationX: rotateX,
                    rotationY: rotateY,
                    ease: "power2.out"
                });
            }
        });

        projectGrid.addEventListener('mouseleave', (e) => {
             const card = e.target.closest('.project-card');
             if(card) {
                gsap.to(card, {
                    duration: 0.4,
                    rotationX: 0,
                    rotationY: 0,
                    ease: "power2.out"
                });
             }
        });
    }

    // --- 5. FOOTER DYNAMIC YEAR ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
