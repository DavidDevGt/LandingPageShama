'use strict';
/* ═══════════════════════════════════════════════
   FERRETERÍA SHAMA — main.js
   Vanilla JS, zero dependencies. 2025 CTO rewrite.
═══════════════════════════════════════════════ */

// ── MOBILE MENU ──────────────────────────────────
const toggle = document.getElementById('navToggle');
const nav    = document.getElementById('mainNav');

const navClose = document.getElementById('navClose');

const openMenu  = () => {
  nav?.classList.add('open');
  document.body.style.overflow = 'hidden';
  toggle?.setAttribute('aria-expanded', 'true');
  if (navClose) navClose.style.display = 'flex';
};
const closeMenu = () => {
  nav?.classList.remove('open');
  document.body.style.overflow = '';
  toggle?.setAttribute('aria-expanded', 'false');
  // Restore focus to hamburger so keyboard users don't get lost
  toggle?.focus();
};

toggle?.addEventListener('click', openMenu);
navClose?.addEventListener('click', closeMenu);
document.querySelectorAll('.nav__list a').forEach(l => l.addEventListener('click', closeMenu));
nav?.addEventListener('click', e => { if (e.target === nav) closeMenu(); });

// ── HEADER SCROLL SHADOW ─────────────────────────
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── ANIMATED HERO CATEGORIES ─────────────────────
const catEl = document.querySelector('.hero__categories');
if (catEl) {
  const cats = ['FERRETERÍA 🔧', 'PLOMERÍA 🚿', 'ELÉCTRICOS ⚡', 'PINTURAS 🎨', 'HERRAMIENTAS 🛠️'];
  let i = 0;
  catEl.textContent = cats[0];
  catEl.style.transition = 'opacity .3s ease, transform .3s ease';

  setInterval(() => {
    catEl.style.opacity = '0';
    catEl.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      catEl.textContent = cats[i = (i + 1) % cats.length];
      catEl.style.opacity = '1';
      catEl.style.transform = 'translateY(0)';
    }, 320);
  }, 2800);
}

// ── STATS COUNTER ANIMATION ──────────────────────
function countUp(el, target, dur = 1600) {
  const start  = performance.now();
  const suffix = el.dataset.suffix || '';
  const step   = ts => {
    const p    = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);            // ease-out cubic
    el.textContent = Math.floor(ease * target) + suffix;
    p < 1 ? requestAnimationFrame(step) : (el.textContent = target + suffix);
  };
  requestAnimationFrame(step);
}

const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    countUp(e.target, +e.target.dataset.target);
    statObs.unobserve(e.target);
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-target]').forEach(el => statObs.observe(el));

// ── SCROLL FADE-IN ───────────────────────────────
const fadeObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      fadeObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fade-in').forEach(el => fadeObs.observe(el));

// ── LIGHTBOX ─────────────────────────────────────
const lb    = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');

if (lb && lbImg) {
  let lbOpener = null; // Track which element opened the lightbox for focus-return

  const onLbKey = e => { if (e.key === 'Escape') closeLb(); };

  document.querySelectorAll('[data-lb]').forEach(item => {
    item.addEventListener('click', () => {
      lbOpener = item;
      lbImg.src = item.dataset.lb;
      lbImg.alt = item.querySelector('img')?.alt || 'Imagen ampliada';
      lb.classList.add('active');
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onLbKey);
      // Move focus to close button for keyboard users
      setTimeout(() => document.getElementById('lbClose')?.focus(), 50);
    });
  });

  const closeLb = () => {
    lb.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onLbKey); // cleanup
    setTimeout(() => { lbImg.src = ''; }, 400);
    lbOpener?.focus(); // Return focus to trigger element
    lbOpener = null;
  };

  document.getElementById('lbClose')?.addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
}

// ── CONTACT FORM (FormSubmit.co) ─────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    const msg = form.querySelector('.form-msg');

    btn.disabled    = true;
    btn.textContent = '⏳ Enviando…';

    try {
      const res = await fetch(form.action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        msg.className   = 'form-msg ok';
        msg.textContent = '✅ ¡Mensaje recibido! Te contactamos muy pronto.';
        form.reset();
        window.gtag?.('event', 'form_submit', { event_category: 'contact', event_label: 'Cotización Web' });
      } else {
        throw new Error('server');
      }
    } catch {
      msg.className   = 'form-msg err';
      msg.textContent = '❌ No se pudo enviar. Escríbenos directo por WhatsApp 👇';
    } finally {
      btn.disabled    = false;
      btn.textContent = '📩 Enviar Cotización';
    }
  });
}

// ── WHATSAPP EVENT TRACKING ──────────────────────
document.querySelectorAll('[data-wa]').forEach(el => {
  el.addEventListener('click', () => {
    window.gtag?.('event', 'whatsapp_click', {
      event_category: 'contact',
      event_label:    el.dataset.wa || 'button'
    });
  });
});

// ── GALLERY KEYBOARD ACCESS (WCAG 2.1.1) ─────────
document.querySelectorAll('[data-lb]').forEach(item => {
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});
