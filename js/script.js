document.addEventListener('DOMContentLoaded', () => {

    // --- LOADER ---
    const loader = document.getElementById('loader');
    if (loader) {
        window.addEventListener('load', () => {
            // Delay hiding to ensure animations complete
            setTimeout(() => {
                loader.classList.add('hidden');
            }, 500); // Should be less than CSS transition-delay
        });
    }

    // --- CUSTOM CURSOR ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        // Dot interpolation for smooth follow
        dotX += (mouseX - dotX) * 0.7;
        dotY += (mouseY - dotY) * 0.7;
        
        // Outline interpolation for a slower, trailing effect
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;

        cursorDot.style.left = `${dotX}px`;
        cursorDot.style.top = `${dotY}px`;
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effect for cursor
    document.querySelectorAll('a, .project-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'var(--accent-gold)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--accent-copper)';
        });
    });

    // --- HERO PCB/PROCESSOR ANIMATION ---
    const heroAnimation = document.getElementById('hero-animation');
    if (heroAnimation) {
        const nodes = [];
        const numNodes = 20;

        // Create central core
        const core = document.createElement('div');
        core.classList.add('node');
        core.style.width = '50px';
        core.style.height = '50px';
        core.style.left = '50%';
        core.style.top = '50%';
        core.style.transform = 'translate(-50%, -50%)';
        core.style.backgroundColor = 'var(--accent-copper)';
        heroAnimation.appendChild(core);

        for (let i = 0; i < numNodes; i++) {
            const node = document.createElement('div');
            node.classList.add('node');
            heroAnimation.appendChild(node);
            nodes.push({
                el: node,
                angle: (i / numNodes) * 2 * Math.PI,
                radius: Math.random() * 100 + 100,
                speed: (Math.random() - 0.5) * 0.02
            });

            // Create lines connecting to core
            const line = document.createElement('div');
            line.classList.add('line');
            const dist = Math.sqrt(Math.pow(200 - 50, 2));
            line.style.width = `${nodes[i].radius}px`;
            line.style.left = '50%';
            line.style.top = '50%';
            line.style.transform = `rotate(${nodes[i].angle}rad)`;
            heroAnimation.appendChild(line);
            nodes[i].line = line;
        }

        const animateHero = () => {
            nodes.forEach(node => {
                node.angle += node.speed;
                const x = 50 + (node.radius / heroAnimation.offsetWidth * 100) * Math.cos(node.angle);
                const y = 50 + (node.radius / heroAnimation.offsetHeight * 100) * Math.sin(node.angle);
                node.el.style.left = `${x}%`;
                node.el.style.top = `${y}%`;
                node.line.style.transform = `rotate(${node.angle}rad)`;
            });
            requestAnimationFrame(animateHero);
        };
        animateHero();
    }
    
    // --- PROJECT CARD INJECTION ---
    const projectGrid = document.querySelector('.project-grid');
    const projects = [
        {
            title: "FPGA Hardware Accelerator for MLP",
            category: "Hardware Acceleration",
            desc: "Developed a hardware accelerator on a Xilinx Zynq-7000 FPGA to improve MLP neural network inference, implementing designs in HLS and Verilog.",
            tags: ["FPGA", "HLS", "Verilog", "Neural Networks"]
        },
        {
            title: "Digital Circuit & Standard Cell IP Dev",
            category: "VLSI Design",
            desc: "Created a ring oscillator Standard Cell IP in Cadence Virtuoso for 40nm technology, focusing on minimizing area while optimizing PVT.",
            tags: ["Cadence", "VLSI", "40nm", "DRC/LVS"]
        },
        {
            title: "In-Memory Compute Circuit",
            category: "Emerging Tech",
            desc: "Designed an in-memory compute circuit using NeuroSim and MuMax3 to accelerate neural networks, with a focus on quantization techniques.",
            tags: ["NeuroSim", "PyTorch", "Quantization", "IC Design"]
        },
        {
            title: "VLSI Interconnect Simulation",
            category: "IC Design",
            desc: "Optimized processor interconnects using Elmore RC models in Cadence for a 2-core processor at 45nm, enhancing signal integrity.",
            tags: ["Signal Integrity", "Cadence", "45nm", "RC Delay"]
        }
    ];

    if (projectGrid) {
        projects.forEach((p, i) => {
            const card = document.createElement('div');
            card.className = 'project-card reveal-up';
            card.style.setProperty('--delay', `${i * 0.15}s`);
            card.innerHTML = `
                <h4>${p.title}</h4>
                <p class="category">${p.category}</p>
                <p>${p.desc}</p>
                <div class="project-tags">
                    ${p.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            `;
            projectGrid.appendChild(card);
        });
    }


    // --- SCROLL-BASED REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-fade-left, .reveal-fade-right');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // --- FOOTER YEAR ---
    document.getElementById('year').textContent = new Date().getFullYear();

});
