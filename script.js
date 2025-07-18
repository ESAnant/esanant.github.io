/*
 *  SCRIPT.JS
 *  Cyber-minimal portfolio — interactivity & motion
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- PRELOADER ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
      }
    }, 400);
  });

  /* ---------- VANTA DOTS BACKGROUND ---------- */
  if (window.VANTA && document.getElementById('vanta-bg')) {
    VANTA.DOTS({
      el: '#vanta-bg',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x00e1ff,          // accent colour
      color2: 0xffffff,
      backgroundColor: 0x010413,
      size: 2.2,
      spacing: 28.0,
    });
  }

  /* ---------- CUSTOM CURSOR ---------- */
  const cursor = document.getElementById('cursor');
  if (cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top  = `${e.clientY}px`;
    });

    const hoverables = document.querySelectorAll(
      'a, button, .project, .chip, .cta, .nav-link'
    );
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  /* ---------- SECTION FADE-IN ---------- */
  const sections = document.querySelectorAll('main section');
  const appearObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        appearObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  sections.forEach(sec => {
    if (!sec.classList.contains('section-visible')) appearObserver.observe(sec);
  });

  /* ---------- ACTIVE NAV LINK ---------- */
  const navLinks = document.querySelectorAll('.nav-link');
  const activeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link =>
          link.classList.toggle(
            'active',
            link.getAttribute('href').slice(1) === id
          )
        );
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(sec => activeObserver.observe(sec));

  /* ---------- HEADER HIDE / SHOW ---------- */
  const header = document.querySelector('.header');
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const currY = window.scrollY;
    if (currY > lastY && currY > 150) {
      header.style.top = '-100px';
    } else {
      header.style.top = '0';
    }
    lastY = currY;
  });

  /* ---------- SCROLL-TO-TOP ---------- */
  const toTopBtn = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      toTopBtn.classList.add('show');
    } else {
      toTopBtn.classList.remove('show');
    }
  });
  toTopBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
});
