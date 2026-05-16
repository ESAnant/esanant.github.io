window.PORTFOLIO_DATA = {
  profile: {
    name: "Edidi Sai Anant",
    email: "esanant@u.nus.edu",
    linkedin: "https://www.linkedin.com/in/sai-anant/",
    github: "https://github.com/ESAnant",
    resume: "assets/docs/Edidi_Sai_Anant_Resume.pdf"
  },

  focusAreas: [
    {
      icon: "fa-solid fa-screwdriver-wrench",
      title: "Tools for R&D",
      description: "Build and refine utilities that make engineering work easier to run, inspect, and repeat."
    },
    {
      icon: "fa-solid fa-robot",
      title: "Automation",
      description: "Turn recurring manual workflows into reliable scripts, checks, dashboards, and reusable flows."
    },
    {
      icon: "fa-solid fa-brain",
      title: "AI projects",
      description: "Explore controlled AI-assisted workflows for productivity, knowledge retrieval, and documentation."
    },
    {
      icon: "fa-solid fa-microchip",
      title: "Semiconductor fundamentals",
      description: "VLSI, embedded systems, computer architecture, memory technology, and digital design."
    }
  ],

  typedRoles: [
    "NAND R&D tools",
    "automation systems",
    "AI-assisted workflows",
    "VLSI and embedded projects",
    "clean engineering systems"
  ],

  education: [
    {
      degree: "Master of Science, Electrical Engineering",
      institution: "National University of Singapore",
      date: "2023 - 2025",
      courses: ["VLSI Digital Circuit Design", "Memory Technologies and Their Emerging Applications", "Embedded Hardware System Design"]
    },
    {
      degree: "Bachelor of Technology, Electronics and Communication Engineering",
      institution: "SRM Institute of Science and Technology",
      date: "2019 - 2023",
      courses: ["Digital Electronics", "Semiconductor Device Modelling", "Analog Electronic Circuits", "VLSI Design", "ARM-Based Embedded System Design"]
    }
  ],

  experience: [
    {
      title: "NTI / NAND R&D Team",
      company: "Micron Technology",
      date: "Current",
      location: "Singapore",
      tags: ["NAND R&D", "Tools", "Automation", "AI"],
      bullets: [
        "Work on tools and automation projects that support NAND R&D engineering workflows.",
        "Contribute to AI-assisted productivity ideas for team workflows while keeping confidentiality, accuracy, and engineering control in mind.",
        "Bridge semiconductor domain knowledge with practical scripting, process improvement, and maintainable internal tooling.",
        "Focus on dependable execution, clear communication, and reusable solutions for team needs."
      ]
    },
    {
      title: "Graduate Assistant",
      company: "National University of Singapore",
      date: "Aug 2024 - Nov 2024",
      location: "Singapore",
      tags: ["Teaching", "Computer Architecture", "Microcontrollers"],
      bullets: [
        "Oversaw laboratory sessions and assisted with assignments and grading for EE2028 Microcontroller Programming and Interfacing and CG3207 Computer Architecture.",
        "Provided guidance and feedback on lab work to strengthen student understanding.",
        "Collaborated with faculty to improve lab materials and workflow quality.",
        "Applied patient, reliable, and collaborative communication in an academic environment."
      ]
    },
    {
      title: "Project Intern",
      company: "Maven Silicon",
      date: "Dec 2022 - Jan 2023",
      location: "Bangalore, India · Remote",
      tags: ["RTL", "Verilog", "AMBA"],
      bullets: [
        "Designed an AHB to APB bridge for communication between bus protocols.",
        "Decomposed the design into modular components to improve manageability and verification readiness.",
        "Wrote functional RTL in Verilog HDL and translated RTL intent into gate-level schematic understanding.",
        "Integrated individual modules into a cohesive top-level system architecture."
      ]
    },
    {
      title: "Intern",
      company: "Sandeepani School of Embedded System Design",
      date: "Jun 2022 - Jul 2022",
      location: "Bangalore, India · Remote",
      tags: ["SystemVerilog", "Verification", "QuestaSim"],
      bullets: [
        "Worked on UART protocol development and verification using Verilog HDL.",
        "Performed functional verification for a half adder using SystemVerilog.",
        "Built familiarity with random stimulus generation, functional coverage, and object-oriented SystemVerilog concepts.",
        "Used QuestaSim for simulation and verification workflow practice."
      ]
    }
  ],

  projects: [
    {
      title: "NAND R&D Tooling & Automation",
      category: ["automation", "ai"],
      status: "Current focus",
      summary: "Internal team-oriented tooling and workflow automation for engineering productivity. Details intentionally stay high-level because this work is team and company-context specific.",
      highlights: ["Automation-first", "Reusable workflows", "AI-assisted productivity"],
      tech: ["Python", "Scripting", "Dashboards", "AI workflows"]
    },
    {
      title: "AI Workflow Concepts for Engineering Teams",
      category: ["ai", "automation"],
      status: "Professional focus",
      summary: "Exploring practical AI-assisted flows for documentation, knowledge retrieval, summaries, and repetitive engineering support tasks with human review in the loop.",
      highlights: ["Human-in-the-loop", "Documentation", "Knowledge workflows"],
      tech: ["LLM workflows", "Prompting", "Python", "Process design"]
    },
    {
      title: "VLSI Interconnect Modelling",
      category: ["vlsi"],
      status: "Academic project",
      summary: "Optimized processor interconnects using Elmore RC models and Cadence Virtuoso for a 2-core processor at 45nm technology, focusing on energy-delay tradeoffs.",
      highlights: ["45nm", "Energy-delay", "RC modeling"],
      tech: ["Cadence", "SPICE", "Elmore delay", "VLSI"]
    },
    {
      title: "Standard Cell IP Development",
      category: ["vlsi"],
      status: "Academic project",
      summary: "Created a ring oscillator standard cell IP using hierarchical design in Cadence Virtuoso, targeting area efficiency in 40nm technology.",
      highlights: ["40nm", "DRC/LVS", "Hierarchical design"],
      tech: ["Cadence Virtuoso", "Layout", "DRC", "LVS"]
    },
    {
      title: "FPGA Hardware Accelerator",
      category: ["fpga", "ai"],
      status: "Academic project",
      summary: "Developed a hardware accelerator on Xilinx Zynq-7000 FPGA to improve MLP neural network inference using pipelining and loop unrolling optimizations.",
      highlights: ["Zynq-7000", "MLP inference", "Loop unrolling"],
      tech: ["FPGA", "HLS", "Verilog", "Xilinx"]
    },
    {
      title: "In-Memory Compute Circuit",
      category: ["vlsi", "ai"],
      status: "Academic project",
      summary: "Designed an in-memory compute concept using NeuroSim and MuMax3 to accelerate neural network computations with quantization techniques.",
      highlights: ["Compute-in-memory", "Quantization", "Neural networks"],
      tech: ["NeuroSim", "MuMax3", "PyTorch"]
    },
    {
      title: "AHB-APB Bridge Design",
      category: ["vlsi"],
      status: "RTL project",
      summary: "Developed a synthesizable AHB to APB bridge with a reversible-logic-based error detection and correction module for stronger data integrity.",
      highlights: ["AMBA", "RTL", "Data integrity"],
      tech: ["Verilog", "RTL", "AMBA", "Simulation"]
    },
    {
      title: "Autonomous Vehicle Safety Control",
      category: ["embedded"],
      status: "Patent-linked project",
      summary: "Designed an intelligent system concept for autonomous vehicles that detects driver medical distress and responds automatically to improve safety.",
      highlights: ["Safety systems", "IoT", "Monitoring"],
      tech: ["Embedded systems", "IoT", "Sensors"]
    }
  ],

  publications: [
    {
      type: "Publication",
      title: "Improving Data Integrity with Reversible Logic-based Error Detection and Correction Module on AHB-APB Bridge",
      meta: "IEEE · Jun 1, 2023",
      description: "Research on enhancing data integrity in bus bridge architectures using reversible logic techniques."
    },
    {
      type: "Publication",
      title: "A Survey on Affordable Internet of Things (IoT) Enabled Healthcare Systems",
      meta: "Grenze Scientific Society · Jul 25, 2022",
      description: "Survey of cost-effective IoT approaches for healthcare systems."
    },
    {
      type: "Patent",
      title: "A System for Controlling an Autonomous Vehicle and a Method Thereof",
      meta: "Patent No. 202341043496 · Issued Mar 28, 2025",
      description: "System concept for detecting driver medical distress and triggering an automated response to improve vehicle safety."
    }
  ],

  skills: [
    {
      title: "Automation & AI",
      items: ["Python automation", "Scripting", "Workflow design", "LLM-assisted workflows", "Documentation systems", "Process improvement"]
    },
    {
      title: "Programming & HDL",
      items: ["Python", "C++", "Verilog", "SystemVerilog", "HLS", "LaTeX"]
    },
    {
      title: "EDA & Hardware Tools",
      items: ["Cadence Virtuoso", "QuestaSim", "Xilinx Vivado", "Xilinx Vitis", "SPICE", "Autodesk Eagle"]
    },
    {
      title: "Semiconductor & Systems",
      items: ["NAND R&D", "VLSI design", "Computer architecture", "Embedded systems", "Memory technologies", "FPGA acceleration"]
    },
    {
      title: "Embedded Platforms",
      items: ["Arduino", "Raspberry Pi", "NodeMCU", "Sensors", "UART", "Microcontrollers"]
    }
  ],

  certifications: [
    { provider: "Google", name: "Foundations of Project Management", date: "Nov 2024" },
    { provider: "Internshala", name: "Arduino", date: "Jan 2022" },
    { provider: "edX", name: "Building a RISC-V CPU Core", date: "Nov 2021" },
    { provider: "Coursera", name: "Python for Data Science, AI & Development", date: "Sep 2021" },
    { provider: "Internshala", name: "PCB Design", date: "Nov 2021" },
    { provider: "Cisco", name: "Introduction to IoT and Digital Transformation", date: "Oct 2021" }
  ]
};
