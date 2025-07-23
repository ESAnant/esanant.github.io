// script.js
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const header = document.querySelector('.main-header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const mainContainer = document.querySelector('main');
  const sections = document.querySelectorAll('section');

  // Animated background canvas setup
  const canvas = document.getElementById('interactive-bg');
  const ctx = canvas.getContext('2d');
  let particlesArray = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Particle class for animated hardware-inspired background
  class Particle {
    constructor(x, y, size, speedX, speedY, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.speedX = speedX;
      this.speedY = speedY;
      this.color = color;
      this.baseX = x;
      this.baseY = y;
      this.angle = Math.random() * Math.PI * 2;
      this.radius = 10 + Math.random() * 15;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 6;
      ctx.fill();
    }

    update() {
      this.angle += 0.01;
      this.x = this.baseX + Math.cos(this.angle) * this.radius;
      this.y = this.baseY + Math.sin(this.angle) * this.radius * 0.7;
      this.draw();
    }
  }

  function initParticles() {
    particlesArray = [];
    const spacing = 80;
    const cols = Math.floor(window.innerWidth / spacing);
    const rows = Math.floor(window.innerHeight / spacing);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const posX = x * spacing + spacing / 2;
        const posY = y * spacing + spacing / 2;
        particlesArray.push(
          new Particle(posX, posY, 3, 0, 0, 'rgba(211,138,92,0.8)')
        );
      }
    }
  }
  initParticles();

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((p) => p.update());
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // Loader hide and reveal main content after delay
  setTimeout(() => {
    loader.classList.add('hidden');
    header.classList.add('visible');
    document.querySelector('#hero').classList.add('visible');
    mainContainer.style.opacity = '1';
  }, 1500);

  // Intersection Observer for section visibility and nav highlights
  const observerOptions = {
    root: mainContainer,
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) =>
          link.classList.toggle('active', link.dataset.section === id)
        );
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  // Smooth scroll and nav link click handling
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // For accessibility: focus the section
        target.focus();
      }
    });
  });

  // Flip-card keyboard accessibility
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach((card) => {
    const inner = card.querySelector('.card-inner');

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const expanded = inner.getAttribute('aria-expanded') === 'true';
        inner.style.transform = expanded ? 'none' : 'rotateY(180deg)';
        inner.setAttribute('aria-expanded', (!expanded).toString());
      }
    });

    card.addEventListener('mouseenter', () => {
      inner.style.transform = 'rotateY(180deg)';
      inner.setAttribute('aria-expanded', 'true');
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'none';
      inner.setAttribute('aria-expanded', 'false');
    });
  });
});
