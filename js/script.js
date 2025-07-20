/*------------------------------------------------------------------
[Master JavaScript V12 - The Genesis Edition]

Project:    The Definitive ECE Portfolio
Author:     AI Assistant for Edidi Sai Anant
Version:    12.0
-------------------------------------------------------------------*/

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // --- PROJECT DATA ---
    const projectsData = [
        {
            title: "FPGA Hardware Accelerator for MLP Neural Network",
            description: "Developed a hardware accelerator on a Xilinx Zynq-7000 FPGA to dramatically improve MLP neural network inference times. Implemented and profiled designs in software, HLS, and Verilog, utilizing advanced optimization techniques like pipelining, loop unrolling, and array partitioning to achieve significant gains in speed and power efficiency.",
            techIcons: ['devicon-xilinx-plain', 'devicon-cplusplus-plain', 'devicon-verilog-plain'],
            tags: ['FPGA', 'HLS', 'Verilog', 'Xilinx Vivado']
        },
        {
            title: "Digital Circuit Design and Standard Cell IP Development",
            description: "Contributed to the creation of a ring oscillator Standard Cell IP using a hierarchical design approach in Cadence Virtuoso. The project targeted 40nm technology, with a primary focus on minimizing silicon area while optimizing for Performance, Voltage, and Temperature (PVT) variations. Ensured absolute design integrity through strict adherence to DRC and LVS standards.",
            techIcons: ['devicon-labview-plain', 'devicon-matlab-plain', 'devicon-python-plain'], // Using LabVIEW as a placeholder for Cadence
            tags: ['Cadence Virtuoso', 'VLSI', '40nm', 'Standard Cell']
        },
        {
            title: "In-Memory Compute Circuit for Neural Network Acceleration",
            description: "Engineered a novel in-memory compute circuit using NeuroSim and MuMax3 to accelerate neural network computations directly within memory arrays. The work concentrated on quantization and optimization strategies to boost model accuracy and efficiency. Conducted extensive simulations in PyTorch to analyze and compare model performance with various data types (float64, float32, int8, int4).",
            techIcons: ['devicon-pytorch-plain', 'devicon-python-plain', 'devicon-jupyter-plain'],
            tags: ['NeuroSim', 'PyTorch', 'Quantization', 'In-Memory Compute']
        },
        {
            title: "VLSI Interconnect Modelling and Simulation",
            description: "Optimized critical processor interconnects for a 2-core processor design at the 45nm technology node. Utilized Elmore RC delay models and Cadence Virtuoso for precise simulation and analysis, focusing on navigating the complex energy-delay trade-offs to enhance signal integrity and overall system performance in a complex VLSI environment.",
            techIcons: ['devicon-labview-plain', 'devicon-linux-plain'], // Placeholder for Cadence
            tags: ['Digital IC Design', 'Cadence', '45nm', 'Signal Integrity']
        }
    ];


    // --- 1. INITIALIZATION ---
    lucide.createIcons();
    const loader = document.getElementById('loader');

    // Hide loader after animations
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2800);


    // --- 2. "THE SPARK" LOADER ANIMATION ---
    const canvas = document.getElementById('spark-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let sparks = [];
        let a = 0;

        class Spark {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.dir = Math.random() * (Math.PI * 2);
                this.speed = Math.random() * 2 + 0.5;
                this.life = 1;
                this.size = Math.random() * 2 + 1;
            }
            update() {
                this.x += Math.cos(this.dir) * this.speed;
                this.y += Math.sin(this.dir) * this.speed;
                this.life -= 0.015;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(184, 115, 51, ${this.life})`;
                ctx.fill();
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            let cx = width / 2 + (Math.cos(a) * 200);
            let cy = height / 2 + (Math.sin(a) * 200);
            sparks.push(new Spark(cx, cy));
            a += 0.04;

            for (let i = sparks.length - 1; i >= 0; i--) {
                sparks[i].update();
                sparks[i].draw();
                if (sparks[i].life <= 0) {
                    sparks.splice(i, 1);
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }


    // --- 3. MAGNETIC CURSOR & ELEMENTS ---
    const cursor = document.querySelector('.cursor');
    if (!window.matchMedia("(pointer: coarse)").matches && cursor) {
        const cursorDot = cursor.querySelector('.cursor-dot');
        const magneticElements = document.querySelectorAll('.magnetic');

        let mouseX = 0, mouseY = 0;
        gsap.to({}, 0.016, {
            repeat: -1,
            onRepeat: () => {
                gsap.set(cursor, {
                    css: {
                        left: mouseX,
                        top: mouseY,
                    },
                });
            },
        });
        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        magneticElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(cursorDot, 0.3, { scale: 3, opacity: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(cursorDot, 0.3, { scale: 1, opacity: 1 });
                gsap.to(el, 0.3, { x: 0, y: 0 });
            });
            el.addEventListener('mousemove', e => {
                const { clientX, clientY } = e;
                const { left, top, width, height } = el.getBoundingClientRect();
                const x = clientX - (left + width / 2);
                const y = clientY - (top + height / 2);
                const strength = el.dataset.strength || 30;
                gsap.to(el, 0.3, { x: x / strength, y: y / strength });
            });
        });
    } else if(cursor) {
        cursor.style.display = 'none';
    }


    // --- 4. SCROLL-REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.reveal) * 150 || 0;
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => revealObserver.observe(el));


    // --- 5. "FOCUS VIEW" PROJECT INTERACTION ---
    const projectsContainer = document.querySelector('.projects-container');
    const projectGrid = document.querySelector('.project-grid');
    const focusView = document.querySelector('.project-focus-view');
    const focusViewContent = focusView.querySelector('.focus-view-content');
    const closeFocusBtn = document.querySelector('.close-focus-view');

    // Populate Project Grid
    if(projectGrid) {
        projectsData.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card magnetic';
            card.dataset.strength = '20';
            card.dataset.index = index;

            const techIconsHTML = project.techIcons.map(iconClass => `<i class="${iconClass}"></i>`).join('');

            card.innerHTML = `
                <h4>${project.title}</h4>
                <div class="project-tech-icons">${techIconsHTML}</div>
            `;
            projectGrid.appendChild(card);
        });
    }

    // Handle card click
    if(projectGrid) {
        projectGrid.addEventListener('click', (e) => {
            const card = e.target.closest('.project-card');
            if (!card) return;

            const projectIndex = card.dataset.index;
            const project = projectsData[projectIndex];

            // Populate focus view
            const tagsHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
            focusViewContent.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">${tagsHTML}</div>
            `;

            projectsContainer.classList.add('focus-active');
        });
    }

    // Handle close button click
    if(closeFocusBtn) {
        closeFocusBtn.addEventListener('click', () => {
            projectsContainer.classList.remove('focus-active');
        });
    }


    // --- 6. FOOTER DYNAMIC YEAR ---
    const yearSpan = document.getElementById('current-year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
