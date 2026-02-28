// =====================================================
//  PORTFOLIO JAVASCRIPT
//  AI Engineer & Mobile Developer
// =====================================================

'use strict';

// ─── DOM READY ───
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTypedText();
  initParticles();
  initCounters();
  initTabs();
  initCertTabs();
  initSkillTooltips();
  initScrollReveal();
  initLangBars();
  initAccuracyBars();
  initNeuralNetworks();
  initContactForm();
  initBackToTop();
  initActiveNavLinks();
  initPhotoUpload();
});

// ─── NAVBAR ───
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    if (curr > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = curr;
  });

  menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-mobile-open');
    const spans = menuToggle.querySelectorAll('span');
    if (document.body.classList.contains('nav-mobile-open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('nav-mobile-open');
      const spans = menuToggle.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });
}

// ─── ACTIVE NAV LINKS ───
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active-link');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active-link');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => observer.observe(sec));
}

// ─── TYPED TEXT ───
function initTypedText() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'AI Engineer',
    'Mobile App Developer',
    'وكيل ذكاء اصطناعي',
    'مطور تطبيقات موبايل',
    'Machine Learning Expert',
    'Flutter Developer'
  ];

  let phraseIdx = 0, charIdx = 0, isDeleting = false;
  const speed = { type: 80, delete: 40, pause: 2000 };

  function type() {
    const current = phrases[phraseIdx];

    if (!isDeleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, speed.pause);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
    }

    setTimeout(type, isDeleting ? speed.delete : speed.type);
  }

  type();
}

// ─── FLOATING PARTICLES ───
function initParticles() {
  const container = document.getElementById('particles');
  if (!container) return;

  const count = 35;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const x = Math.random() * 100;
    const dur = 8 + Math.random() * 15;
    const delay = Math.random() * 15;
    const dx = (Math.random() - 0.5) * 200 + 'px';
    const size = 1.5 + Math.random() * 2.5;
    const opacity = 0.3 + Math.random() * 0.5;

    p.style.cssText = `
      left: ${x}%;
      width: ${size}px;
      height: ${size}px;
      opacity: ${opacity};
      animation-duration: ${dur}s;
      animation-delay: -${delay}s;
      --dx: ${dx};
    `;
    container.appendChild(p);
  }
}

// ─── COUNTING ANIMATION ───
function initCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCount(el, 0, target, 1500);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function animateCount(el, start, end, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(start + (end - start) * eased);
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

// ─── TABS (PROJECTS) ───
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById('tab-' + tab);
      if (target) {
        target.classList.add('active');
        // Trigger accuracy bars animation
        target.querySelectorAll('.accuracy-fill').forEach(el => {
          const acc = el.dataset.acc;
          setTimeout(() => { el.style.width = acc + '%'; }, 100);
        });
      }
    });
  });
}

// ─── CERT TABS ───
function initCertTabs() {
  const ctabBtns = document.querySelectorAll('.cert-tab-btn');
  const ctabContents = document.querySelectorAll('.cert-content');

  ctabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.ctab;

      ctabBtns.forEach(b => b.classList.remove('active'));
      ctabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById('ctab-' + tab);
      if (target) target.classList.add('active');
    });
  });
}

// ─── SKILL TOOLTIPS ───
function initSkillTooltips() {
  const tooltip = document.getElementById('skillTooltip');
  const bubbles = document.querySelectorAll('.skill-bubble');

  if (!tooltip) return;

  bubbles.forEach(bubble => {
    bubble.addEventListener('mouseenter', e => {
      const level = bubble.dataset.level;
      const name = bubble.dataset.name;
      tooltip.textContent = `${name}: ${level}%`;
      tooltip.style.opacity = '1';
    });

    bubble.addEventListener('mousemove', e => {
      tooltip.style.top = (e.clientY - 40) + 'px';
      tooltip.style.left = (e.clientX - tooltip.offsetWidth / 2) + 'px';
    });

    bubble.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });
}

// ─── SCROLL REVEAL ───
function initScrollReveal() {
  const sections = document.querySelectorAll('.about-card, .project-card, .cert-card, .skill-category, .channel-item, .section-header');

  sections.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (i % 4) * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(el => observer.observe(el));
}

// ─── LANGUAGE BARS ───
function initLangBars() {
  const bars = document.querySelectorAll('.bar-fill[data-w]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const w = el.dataset.w;
        setTimeout(() => { el.style.width = w + '%'; }, 200);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(b => observer.observe(b));
}

// ─── ACCURACY BARS ───
function initAccuracyBars() {
  const fills = document.querySelectorAll('.accuracy-fill[data-acc]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const acc = el.dataset.acc;
        setTimeout(() => { el.style.width = acc + '%'; }, 300);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
}

// ─── NEURAL NETWORK ANIMATION (SVG) ───
function initNeuralNetworks() {
  const containers = document.querySelectorAll('.neural-net-anim');

  containers.forEach(container => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 120 100');
    svg.setAttribute('width', '120');
    svg.setAttribute('height', '100');

    const layers = [
      { x: 15, nodes: [20, 40, 60, 80] },
      { x: 45, nodes: [15, 35, 55, 75, 92] },
      { x: 75, nodes: [25, 50, 75] },
      { x: 105, nodes: [35, 65] }
    ];

    const colors = ['#00d4ff', '#7c3aed'];

    // Draw connections
    for (let li = 0; li < layers.length - 1; li++) {
      layers[li].nodes.forEach(y1 => {
        layers[li + 1].nodes.forEach(y2 => {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', layers[li].x);
          line.setAttribute('y1', y1);
          line.setAttribute('x2', layers[li + 1].x);
          line.setAttribute('y2', y2);
          line.setAttribute('stroke', colors[0]);
          line.setAttribute('stroke-width', '0.4');
          line.setAttribute('stroke-opacity', '0.2');

          // Animate some connections
          if (Math.random() > 0.6) {
            const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            anim.setAttribute('attributeName', 'stroke-opacity');
            anim.setAttribute('values', '0.1;0.6;0.1');
            anim.setAttribute('dur', (1.5 + Math.random() * 2) + 's');
            anim.setAttribute('repeatCount', 'indefinite');
            anim.setAttribute('begin', (Math.random() * 2) + 's');
            line.appendChild(anim);
          }

          svg.appendChild(line);
        });
      });
    }

    // Draw nodes
    layers.forEach((layer, li) => {
      layer.nodes.forEach(y => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', layer.x);
        circle.setAttribute('cy', y);
        circle.setAttribute('r', '4');
        circle.setAttribute('fill', li === layers.length - 1 ? colors[1] : colors[0]);
        circle.setAttribute('fill-opacity', '0.8');

        const anim = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
        anim.setAttribute('attributeName', 'fill-opacity');
        anim.setAttribute('values', '0.4;1;0.4');
        anim.setAttribute('dur', (1 + Math.random() * 2) + 's');
        anim.setAttribute('repeatCount', 'indefinite');
        anim.setAttribute('begin', (Math.random() * 2) + 's');
        circle.appendChild(anim);

        svg.appendChild(circle);
      });
    });

    container.appendChild(svg);
  });
}

// ─── CONTACT FORM ───
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.querySelector('span').textContent;

    btn.querySelector('span').textContent = 'جاري الإرسال...';
    btn.disabled = true;

    // Simulate sending
    setTimeout(() => {
      btn.querySelector('span').textContent = '✅ تم الإرسال!';
      successMsg.classList.add('visible');
      form.reset();

      setTimeout(() => {
        btn.querySelector('span').textContent = originalText;
        btn.disabled = false;
        successMsg.classList.remove('visible');
      }, 4000);
    }, 1500);
  });
}

// ─── BACK TO TOP ───
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ─── PHOTO UPLOAD ───
function initPhotoUpload() {
  const photoEl = document.getElementById('profilePhoto');
  if (!photoEl) return;

  // Create hidden file input
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.style.display = 'none';
  document.body.appendChild(input);

  photoEl.addEventListener('click', () => input.click());

  input.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      photoEl.innerHTML = `<img src="${ev.target.result}" alt="صورتك الشخصية" />`;
    };
    reader.readAsDataURL(file);
  });
}

// ─── EDITABLE TAGLINE ───
(function initEditableTagline() {
  const tagline = document.getElementById('hero-tagline');
  if (!tagline) return;

  tagline.setAttribute('title', 'انقر لتعديل الشعار');

  tagline.addEventListener('click', () => {
    const current = tagline.textContent.replace(/[✦\s]+/g, ' ').trim();
    const newText = prompt('أدخل شعارك المختصر:', current);
    if (newText && newText.trim()) {
      tagline.textContent = `✦ ${newText.trim()} ✦`;
    }
  });
})();

// ─── DOWNLOAD CV ───
// الزر مرتبط مباشرة بملف cv.pdf في مجلد المشروع

// ─── SMOOTH SCROLL ENHANCEMENT ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - navH - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── PARALLAX SUBTLE EFFECT ON HERO ───
(function initHeroParallax() {
  const grid = document.querySelector('.hero-bg-grid');
  if (!grid) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    grid.style.transform = `translateY(${y * 0.3}px)`;
  });
})();

