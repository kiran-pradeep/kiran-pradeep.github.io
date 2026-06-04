/* ========================================
   KIRAN PRADEEP — PERSONAL PORTFOLIO
   js/main.js
   ======================================== */

// ── Navbar: add scrolled class ──────────────────────────────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile nav toggle ────────────────────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.textContent = '☰';
  });
});

// ── Scroll reveal ─────────────────────────────────────────────────────────────
// Adds .reveal class to cards and timeline items, then triggers via IntersectionObserver.
const revealTargets = [
  '.exp-card',
  '.project-card',
  '.timeline-item',
  '.stat-card',
  '.skills-group',
  '.pub-card',
  '.contact-item',
  '.about-text',
  '.about-stats',
];

revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 60}ms`;
  });
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── Active nav link highlight on scroll ─────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach(sec => sectionObserver.observe(sec));

// ── Add active nav link style ─────────────────────────────────────────────────
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--text) !important; }`;
document.head.appendChild(style);
