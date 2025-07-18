/* === GLOBAL DESIGN TOKENS & BASE STYLES === */
:root {
    /* Muted Dark/Light Theme Palette */
    --bg-color: #f8f9fa; /* Off-white for a soft, clean background */
    --text-color: #212529; /* Dark grey for crisp, readable text */
    --primary-accent: #007aff; /* A professional, Apple-inspired blue */
    --secondary-accent: #6c757d; /* Muted grey for secondary elements */
    --card-bg: #ffffff; /* Pure white for cards to pop */
    --border-color: #dee2e6; /* Light border for subtle separation */
    --shadow-color: rgba(0, 0, 0, 0.05);

    /* Typography */
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --font-mono: 'JetBrains Mono', "SF Mono", "Fira Code", monospace;

    /* Spacing & Sizing */
    --header-height: 70px;
    --max-width: 1100px;
    --border-radius: 12px;
    --transition-speed: 0.3s;
}

/* Dark Mode Override (Optional - can be toggled with JS) */
body.dark-mode {
    --bg-color: #121212;
    --text-color: #e0e0e0;
    --primary-accent: #0a84ff;
    --secondary-accent: #8e8e93;
    --card-bg: #1c1c1e;
    --border-color: #38383a;
    --shadow-color: rgba(0, 0, 0, 0.2);
}

/* === GENERAL SETUP === */
*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    scroll-behavior: smooth;
    font-size: 16px;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: var(--font-primary);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
    transition: background-color var(--transition-speed), color var(--transition-speed);
}

main {
    padding-top: var(--header-height);
}

/* === PRELOADER & MUTE BUTTON === */
#preloader {
    position: fixed;
    inset: 0;
    background: var(--bg-color);
    display: grid;
    place-items: center;
    z-index: 10000;
    opacity: 1;
    transition: opacity 0.5s ease-in-out, visibility 0.5s;
}
#preloader.loaded {
    opacity: 0;
    visibility: hidden;
}
.loader-chip {
    width: 50px;
    height: 50px;
    background: var(--secondary-accent);
    border-radius: 8px;
    animation: pulse 1.5s infinite ease-in-out;
}
#preloader p {
    font-family: var(--font-mono);
    color: var(--secondary-accent);
    margin-top: 1rem;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

#mute-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    cursor: pointer;
    display: grid;
    place-items: center;
    z-index: 1001;
    color: var(--secondary-accent);
    box-shadow: 0 4px 15px var(--shadow-color);
    transition: all var(--transition-speed) ease;
}
#mute-btn:hover {
    transform: translateY(-3px);
    color: var(--primary-accent);
}

/* === HEADER & NAVIGATION === */
.premium-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-height);
    background: hsla(0, 0%, 100%, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color);
    z-index: 1000;
    transition: all var(--transition-speed) ease, transform 0.4s ease;
}
body.dark-mode .premium-header {
    background: rgba(28, 28, 30, 0.75);
}
.premium-header.scrolled {
    box-shadow: 0 2px 10px var(--shadow-color);
}
.premium-header.hidden {
    transform: translateY(-100%);
}

.header-content {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 2rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.premium-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
    color: var(--text-color);
    font-weight: 600;
    font-size: 1.1rem;
    font-family: var(--font-mono);
}
.chip-design {
    width: 32px;
    height: 32px;
    background-color: var(--text-color);
    border-radius: 6px;
}
body.dark-mode .chip-design {
    background-color: var(--bg-color);
}

.premium-nav ul {
    display: flex;
    list-style: none;
    gap: 1.5rem;
}
.nav-link {
    text-decoration: none;
    color: var(--secondary-accent);
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.5rem 0.25rem;
    position: relative;
    transition: color var(--transition-speed) ease;
}
.nav-link:hover, .nav-link.active {
    color: var(--text-color);
}
.nav-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--primary-accent);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform var(--transition-speed) ease;
}
.nav-link.active::after {
    transform: scaleX(1);
}
.nav-num {
    color: var(--primary-accent);
    font-family: var(--font-mono);
    margin-right: 0.4rem;
}

/* === MOBILE NAVIGATION === */
.mobile-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    z-index: 1002;
}
.toggle-line {
    width: 24px;
    height: 2px;
    background: var(--text-color);
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
}
.mobile-toggle.is-active .toggle-line:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
}
.mobile-toggle.is-active .toggle-line:nth-child(2) {
    opacity: 0;
}
.mobile-toggle.is-active .toggle-line:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
}


/* === GENERIC SECTION STYLING === */
.premium-section {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 6rem 2rem;
    opacity: 0; /* Initially hidden for scroll animations */
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.premium-section.is-visible {
    opacity: 1;
    transform: translateY(0);
}

.section-header {
    margin-bottom: 3rem;
    text-align: center;
}
.section-name {
    font-size: 2.5rem;
    font-weight: 700;
    position: relative;
    display: inline-block;
}
.section-name .section-num {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 400;
    color: var(--primary-accent);
    position: absolute;
    top: -1rem;
    left: 50%;
    transform: translateX(-50%);
}

/* === HERO SECTION === */
.premium-hero {
    min-height: calc(100vh - var(--header-height));
    display: flex;
    align-items: center;
    text-align: center;
    padding: 4rem 2rem;
}
.hero-title {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1rem;
}
.hero-title .title-line {
    display: block;
}
.hero-description {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    max-width: 650px;
    margin: 0 auto 2rem;
    color: var(--secondary-accent);
}
.highlight {
    color: var(--text-color);
    font-weight: 600;
}
.hero-actions {
    display: flex;
    justify-content: center;
    gap: 1rem;
}
.premium-btn {
    padding: 0.8rem 1.8rem;
    border-radius: 100px;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all var(--transition-speed) ease;
    border: 1px solid transparent;
}
.btn-primary {
    background-color: var(--primary-accent);
    color: #fff;
    border-color: var(--primary-accent);
}
.btn-primary:hover {
    filter: brightness(1.1);
    transform: translateY(-2px);
}
.btn-secondary {
    background-color: transparent;
    color: var(--primary-accent);
    border-color: var(--primary-accent);
}
.btn-secondary:hover {
    background-color: var(--primary-accent);
    color: #fff;
}
.silicon-wafer-container {
    margin-top: 3rem;
    display: grid;
    place-items: center;
}
.silicon-wafer-container svg {
    width: 150px;
    height: 150px;
    stroke: var(--primary-accent);
    opacity: 0.7;
}

/* === ABOUT SECTION === */
.about-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 4rem;
    align-items: start;
}
.lead-text {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 1.5rem;
}
blockquote {
    border-left: 3px solid var(--primary-accent);
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: var(--secondary-accent);
}
.skills-showcase {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    padding: 2rem;
    position: sticky;
    top: calc(var(--header-height) + 2rem);
}
.skills-showcase h3 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
}
.skill-category h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 0.75rem;
    color: var(--text-color);
}
.skill-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
.skill-badge {
    background-color: var(--bg-color);
    border: 1px solid var(--border-color);
    padding: 0.4rem 0.8rem;
    border-radius: 6px;
    font-size: 0.85rem;
    font-family: var(--font-mono);
}

/* === EXPERIENCE TIMELINE === */
.timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
}
.timeline::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 20px;
    width: 2px;
    background: var(--border-color);
}
.timeline-item {
    position: relative;
    padding-left: 50px;
    margin-bottom: 3rem;
}
.timeline-marker {
    position: absolute;
    left: 0;
    top: 5px;
    width: 42px;
    height: 42px;
    background: var(--bg-color);
    border: 2px solid var(--border-color);
    border-radius: 50%;
    display: grid;
    place-items: center;
    color: var(--primary-accent);
}
.timeline-content .timeline-date {
    font-family: var(--font-mono);
    color: var(--secondary-accent);
    font-size: 0.85rem;
}
.timeline-content h4 {
    margin: 0.25rem 0;
    font-size: 1.2rem;
}
.timeline-content .institution {
    font-weight: 500;
    color: var(--secondary-accent);
}
.timeline-content .description {
    margin-top: 0.5rem;
    color: var(--secondary-accent);
    font-size: 0.95rem;
}

/* === PROJECTS GRID === */
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
}
.project-card {
    background-color: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    overflow: hidden;
    transition: transform var(--transition-speed) ease, box-shadow var(--transition-speed) ease;
}
.project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px var(--shadow-color);
}
.project-content {
    padding: 1.5rem;
}
.project-tag {
    font-family: var(--font-mono);
    color: var(--primary-accent);
    font-size: 0.8rem;
    font-weight: 500;
}
.project-title {
    font-size: 1.25rem;
    margin: 0.5rem 0 1rem;
}
.project-description {
    font-size: 0.95rem;
    color: var(--secondary-accent);
    line-height: 1.6;
    margin-bottom: 1.5rem;
}
.project-links {
    display: flex;
    gap: 1.5rem;
}
.project-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: var(--text-color);
    font-weight: 500;
    transition: color var(--transition-speed) ease;
}
.project-link:hover {
    color: var(--primary-accent);
}


/* === CONTACT SECTION === */
.contact-container {
    text-align: center;
    max-width: 600px;
    margin: 0 auto;
}
.contact-container p {
    font-size: 1.1rem;
    color: var(--secondary-accent);
    margin-bottom: 2rem;
}
.contact-email {
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--primary-accent);
    text-decoration: none;
    margin-bottom: 2.5rem;
    position: relative;
}
.contact-email::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--primary-accent);
    transform: scaleX(0);
    transition: transform 0.3s ease;
}
.contact-email:hover::after {
    transform: scaleX(1);
}
.contact-socials {
    display: flex;
    justify-content: center;
    gap: 2rem;
}
.social-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--secondary-accent);
    text-decoration: none;
    transition: color var(--transition-speed) ease, transform var(--transition-speed) ease;
}
.social-link:hover {
    color: var(--primary-accent);
    transform: translateY(-2px);
}

/* === FOOTER === */
.premium-footer {
    text-align: center;
    padding: 2rem;
    margin-top: 4rem;
    border-top: 1px solid var(--border-color);
    color: var(--secondary-accent);
    font-size: 0.9rem;
}

/* === RESPONSIVE DESIGN === */
@media (max-width: 992px) {
    .about-grid {
        grid-template-columns: 1fr;
    }
    .skills-showcase {
        position: static;
        margin-top: 3rem;
    }
}

@media (max-width: 768px) {
    /* Tablet & Mobile Styles */
    .premium-nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--bg-color);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        transform: translateY(-100%);
        transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
        display: flex;
    }
    .premium-nav.is-open {
        transform: translateY(0);
    }
    .premium-nav ul {
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }
    .nav-link {
        font-size: 1.5rem;
    }

    .mobile-toggle {
        display: flex;
    }
    .header-content {
        padding: 0 1rem;
    }
    .premium-section {
        padding: 4rem 1rem;
    }
    .section-name {
        font-size: 2rem;
    }
    .projects-grid {
        grid-template-columns: 1fr;
    }
}
