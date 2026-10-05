/**
 * Developer Portfolio System - Alex Kumar
 * Vanilla JS Interaction Script
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initActiveNavOnScroll();
  initContactForm();
  initAlgorithmVisualizerDemo();
  initResumeDownloadHint();
});

/**
 * Mobile navigation menu toggle and handling
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close when clicking outside the navbar
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      if (navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });
}

/**
 * Scroll spy using IntersectionObserver to highlight active nav link
 */
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Contact form handling with validation and simulated feedback
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !statusEl || !submitBtn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.userName.value.trim();
    const email = form.userEmail.value.trim();
    const subject = form.userSubject.value.trim();
    const message = form.userMessage.value.trim();

    // Basic validation
    if (!name || !email || !subject || !message) {
      showStatus('Please fill in all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus('Please provide a valid email address.', 'error');
      return;
    }

    // Submit state
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span>Sending...</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
    `;
    showStatus('', '');

    // Simulate async network request
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      showStatus('✓ Message sent successfully! I will get back to you within 24 hours.', 'success');
      form.reset();

      setTimeout(() => {
        statusEl.textContent = '';
        statusEl.className = 'form-status';
      }, 6000);
    }, 1200);
  });

  function showStatus(msg, type) {
    statusEl.textContent = msg;
    statusEl.className = `form-status ${type}`;
  }
}

/**
 * Subtle interactive animation for the algorithm visualizer preview bars
 */
function initAlgorithmVisualizerDemo() {
  const barsContainer = document.getElementById('visualizerBars');
  if (!barsContainer) return;

  const bars = barsContainer.querySelectorAll('.viz-bar');
  if (!bars.length) return;

  // Animate heights periodically on hover or idle
  let interval = null;

  function randomizeBars() {
    const heights = [35, 60, 45, 95, 70, 80];
    // Shuffle heights slightly
    const shuffled = [...heights].sort(() => Math.random() - 0.5);
    bars.forEach((bar, idx) => {
      bar.style.height = `${shuffled[idx]}%`;
    });
  }

  barsContainer.addEventListener('mouseenter', () => {
    randomizeBars();
    interval = setInterval(randomizeBars, 600);
  });

  barsContainer.addEventListener('mouseleave', () => {
    if (interval) clearInterval(interval);
    // Reset to initial aesthetic proportions
    const defaults = [38, 64, 48, 92, 75, 85];
    bars.forEach((bar, idx) => {
      bar.style.height = `${defaults[idx]}%`;
    });
  });
}

/**
 * Resume Download notification / handler
 */
function initResumeDownloadHint() {
  const downloadBtn = document.getElementById('downloadResumeBtn');
  if (!downloadBtn) return;

  downloadBtn.addEventListener('click', (e) => {
    // If a PDF is attached later, this can link directly to it.
    // For now, smooth scroll to contact section or prompt
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      e.preventDefault();
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
