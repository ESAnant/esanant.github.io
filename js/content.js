window.PORTFOLIO_DATA = {
  profile: {
    name: "Edidi Sai Anant",
    email: "esanant@gmail.com",
    linkedin: "https://www.linkedin.com/in/sai-anant/",
    github: "https://github.com/ESAnant",
    resume: "assets/docs/Edidi_Sai_Anant_Resume.pdf",
    currentTitle: "NAND Electrical Failure Analysis Engineer",
    location: "Singapore"
  },

  typedRoles: [
    "failure signatures",
    "debug systems",
    "automation loops",
    "AI-assisted workflows",
    "semiconductor tools"
  ],

  principles: [
    { label: "evidence first", detail: "debug decisions should come from measurements, not guesses" },
    { label: "repeatable", detail: "good tools make the next loop easier" },
    { label: "clear handoff", detail: "analysis is only useful when the signature is communicated well" },
    { label: "human-controlled AI", detail: "AI helps structure work; engineers keep judgement" }
  ],

  workflow: [
    {
      step: "01",
      title: "Verify",
      description: "Confirm the failure electrically and separate noise from signal before jumping into conclusions.",
      icon: "fa-solid fa-wave-square"
    },
    {
      step: "02",
      title: "Localize",
      description: "Narrow the signature, connect it to process or product context, and keep the path traceable.",
      icon: "fa-solid fa-crosshairs"
    },
    {
      step: "03",
      title: "Explain",
      description: "Turn debug output into clean notes, plots, and reports that help teams align quickly.",
      icon: "fa-solid fa-diagram-project"
    },
    {
      step: "04",
      title: "Automate",
      description: "Convert repeated steps into scripts, checks, dashboards, or AI-assisted workflows with review built in.",
      icon: "fa-solid fa-robot"
    }
  ],

  education: [
    {
      degree: "Master of Science, Electrical Engineering",
      institution: "National University of Singapore",
      date: "2023 — 2025",
      notes: "Graduate Assistant for EE2028 Microcontroller Programming and Interfacing and CG3207 Computer Architecture.",
      courses: ["VLSI Digital Circuit Design", "Memory Technologies", "Embedded Hardware System Design", "Computer Architecture"]
    },
    {
      degree: "Bachelor of Technology, Electronics and Communication Engineering",
      institution: "SRM Institute of Science and Technology",
      date: "2019 — 2023",
      notes: "Built a strong base across digital electronics, semiconductor devices, communication systems, and embedded design.",
      courses: ["Semiconductor Device Modelling", "Analog Circuits", "VLSI Design", "ARM Embedded Systems", "Microcontrollers"]
    }
  ],

  experience: [
    {
      title: "NAND Electrical Failure Analysis Engineer",
      company: "Micron Technology · NTI / NAND R&D",
      date: "Current",
      location: "Singapore",
      tags: ["NAND", "Electrical FA", "Yield", "Tools", "Automation", "AI Workflows"],
      bullets: [
        "Work in Micron's NTI / NAND R&D environment with a focus on failure-analysis thinking, engineering tools, automation, and team productivity.",
        "Support workflows where electrical verification, failure signatures, structured analysis, and clear communication matter.",
        "Build and improve internal utilities at a high level: repeatable scripts, workflow aids, documentation support, and AI-assisted productivity ideas.",
        "Keep professional work intentionally high-level here to respect confidentiality while still showing the engineering direction."
      ]
    },
    {
      title: "Graduate Assistant",
      company: "National University of Singapore",
      date: "Aug 2024 — Nov 2024",
      location: "Singapore",
      tags: ["Teaching", "Microcontrollers", "Computer Architecture", "Lab Systems"],
      bullets: [
        "Oversaw lab sessions and assisted with assignments and grading for EE2028 Microcontroller Programming and Interfacing and CG3207 Computer Architecture.",
        "Guided students through lab work and gave practical feedback on debugging and implementation quality.",
        "Collaborated with faculty to overhaul lab materials and improve process clarity."
      ]
    },
    {
      title: "Project Intern",
      company: "Maven Silicon",
      date: "Dec 2022 — Jan 2023",
      location: "Bangalore, India · Remote",
      tags: ["RTL", "Verilog", "AMBA", "Synthesis"],
      bullets: [
        "Designed an AHB-to-APB bridge to support communication between AMBA bus protocols.",
        "Broke the system into modular blocks, wrote Verilog RTL, and connected design intent to gate-level understanding.",
        "Strengthened habits around clean decomposition, interface clarity, and verification readiness."
      ]
    },
    {
      title: "Embedded Systems Intern",
      company: "Sandeepani School of Embedded System Design",
      date: "Jun 2022 — Jul 2022",
      location: "Bangalore, India · Remote",
      tags: ["SystemVerilog", "UART", "Verification", "QuestaSim"],
      bullets: [
        "Worked on UART protocol development and verification using Verilog HDL.",
        "Performed functional verification of a half adder with SystemVerilog and QuestaSim.",
        "Practiced coverage-oriented thinking through random stimulus generation and functional coverage concepts."
      ]
    }
  ],

  projects: [
    {
      title: "NAND FA Workflow Tooling",
      category: ["fa", "automation"],
      status: "Current direction",
      summary: "High-level professional focus: tools and automation that support FA-style workflows, debug traceability, and team execution in an R&D setting.",
      highlights: ["failure signatures", "repeatable flows", "team tools"],
      tech: ["Python", "automation", "dashboards", "documentation"]
    },
    {
      title: "AI-Assisted Engineering Notes",
      category: ["ai", "automation"],
      status: "Current direction",
      summary: "Human-in-the-loop AI concepts for organizing notes, retrieving context, summarizing repeated work, and making team knowledge easier to reuse.",
      highlights: ["human review", "knowledge retrieval", "clean summaries"],
      tech: ["LLM workflows", "prompting", "Python", "process design"]
    },
    {
      title: "VLSI Interconnect Modelling",
      category: ["vlsi"],
      status: "NUS project",
      summary: "Optimized processor interconnects using Elmore RC models and Cadence Virtuoso for a 2-core processor at 45nm technology.",
      highlights: ["45nm", "energy-delay", "signal integrity"],
      tech: ["Cadence Virtuoso", "SPICE", "Elmore delay", "VLSI"]
    },
    {
      title: "Standard Cell IP: Ring Oscillator",
      category: ["vlsi"],
      status: "NUS project",
      summary: "Developed a ring oscillator standard-cell IP with hierarchical design in Cadence Virtuoso, targeting compact layout and PVT awareness at 40nm.",
      highlights: ["40nm", "DRC/LVS", "layout discipline"],
      tech: ["Cadence", "layout", "DRC", "LVS"]
    },
    {
      title: "FPGA Hardware Accelerator for MLP",
      category: ["fpga", "ai"],
      status: "NUS project",
      summary: "Built an MLP inference accelerator on Xilinx Zynq-7000 using software, HLS, and Verilog paths with profiling-driven optimization.",
      highlights: ["Zynq-7000", "MLP inference", "loop unrolling"],
      tech: ["FPGA", "HLS", "Verilog", "Xilinx Vitis"]
    },
    {
      title: "In-Memory Compute Circuit",
      category: ["vlsi", "ai"],
      status: "NUS project",
      summary: "Explored compute-in-memory for neural-network acceleration using NeuroSim, MuMax3, PyTorch, and quantization comparisons.",
      highlights: ["CIM", "quantization", "model efficiency"],
      tech: ["NeuroSim", "MuMax3", "PyTorch", "int8/int4"]
    },
    {
      title: "AHB–APB Bridge with Error Detection",
      category: ["vlsi"],
      status: "Publication-linked",
      summary: "Designed a bus bridge with reversible-logic-based error detection and correction ideas for improved data integrity.",
      highlights: ["AMBA", "data integrity", "RTL"],
      tech: ["Verilog", "RTL", "AMBA", "simulation"]
    },
    {
      title: "Autonomous Vehicle Safety Control",
      category: ["embedded"],
      status: "Patent-linked",
      summary: "System concept for detecting driver medical distress and triggering an automated vehicle response to improve safety.",
      highlights: ["safety", "IoT", "monitoring"],
      tech: ["embedded systems", "sensors", "IoT"]
    }
  ],

  publications: [
    {
      type: "Publication",
      title: "Improving Data Integrity with Reversible Logic-based Error Detection and Correction Module on AHB-APB Bridge",
      meta: "IEEE · 2023",
      description: "Research connecting RTL bus-bridge design with data-integrity techniques."
    },
    {
      type: "Publication",
      title: "A Survey on Affordable Internet of Things (IoT) Enabled Healthcare Systems",
      meta: "Grenze International Journal of Engineering and Technology · 2022",
      description: "Survey of affordable IoT-enabled healthcare system approaches."
    },
    {
      type: "Patent",
      title: "A System for Controlling an Autonomous Vehicle and a Method Thereof",
      meta: "Patent No. 202341043496 · Issued 2025",
      description: "Autonomous-vehicle safety concept for detecting medical distress and triggering a safer response."
    }
  ],

  skills: [
    {
      title: "Failure Analysis Direction",
      items: ["electrical verification", "failure signatures", "yield-oriented thinking", "root-cause communication", "debug traceability"]
    },
    {
      title: "Automation & AI",
      items: ["Python automation", "workflow design", "LLM-assisted workflows", "documentation systems", "dashboard thinking", "process improvement"]
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
      items: ["NAND memory", "VLSI design", "memory technologies", "computer architecture", "embedded systems", "FPGA acceleration"]
    },
    {
      title: "Embedded Platforms",
      items: ["Arduino", "Raspberry Pi", "NodeMCU", "UART", "microcontrollers", "sensors"]
    }
  ],

  certifications: [
    "Python for Data Science, AI & Development — IBM / Coursera",
    "Building a RISC-V CPU Core — edX / Linux Foundation",
    "Embedded Systems Essentials with Arm — Arm Education",
    "IoT Systems and Industrial Applications with Design Thinking — EPFL / edX",
    "Introduction to IoT and Digital Transformation — Cisco",
    "PCB Design — Internshala"
  ]
};
