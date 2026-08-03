// ==========================================================================
// FUNNGRO INTERACTIVE PLATFORM - GSAP & EMIL KOWALSKI MOTION SUITE
// Designed & Developed with Precision by Hariom Bhati
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initGsapAnimations();
  initSpotlightEffect();
  initTeenCalculator();
  initCompanyCalculator();
  initFaqAccordion();
  initModals();
  initCategoryFilters();
});

// 1. Page Preloader Controller
function initPreloader() {
  const preloader = document.getElementById('page-preloader');
  if (!preloader) return;

  function hideLoader() {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      if (preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 600);
  }

  if (document.readyState === 'complete') {
    setTimeout(hideLoader, 400);
  } else {
    window.addEventListener('load', () => setTimeout(hideLoader, 400));
    setTimeout(hideLoader, 1000);
  }
}

// 2. GSAP Motion & ScrollTrigger Controller
function initGsapAnimations() {
  if (typeof gsap === 'undefined') return;

  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Hero Section Stagger Entrance
  gsap.from('.hero-chip, .hero-h1, .hero-desc, .hero-actions, .hero-metrics > div', {
    opacity: 0,
    y: 35,
    duration: 0.85,
    stagger: 0.1,
    ease: 'power3.out',
    delay: 0.1
  });

  // Hero Card Entrance
  gsap.from('.hero-image-banner, .interactive-card', {
    opacity: 0,
    scale: 0.94,
    y: 30,
    duration: 0.95,
    stagger: 0.18,
    ease: 'power3.out',
    delay: 0.3
  });

  // ScrollTrigger for Cards
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.utils.toArray('.spotlight-card, .roadmap-card').forEach((card) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 35,
        duration: 0.7,
        ease: 'power2.out'
      });
    });

    // Parallax background glow orbs
    gsap.to('.glow-orb-green', {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5
      },
      y: 200,
      x: 60
    });
  }

  // Magnetic Hover Physics for Primary Buttons
  const magneticBtns = document.querySelectorAll('.btn-primary, .btn-blue');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, { x: x * 0.22, y: y * 0.22, duration: 0.3, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });
}

// 3. Spotlight Mouse Tracking Effect (Emil Kowalski Touch)
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.spotlight-card, .interactive-card, .roadmap-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// 4. Teen Earning Calculator (with GSAP Reactive Count-up)
let earnState = { val: 0 };
function initTeenCalculator() {
  const hoursSlider = document.getElementById('hoursSlider');
  const hoursVal = document.getElementById('hoursVal');
  const skillSelect = document.getElementById('skillSelect');
  const estimatedEarn = document.getElementById('estimatedEarn');

  if (!hoursSlider || !skillSelect || !estimatedEarn) return;

  const hourlyRates = {
    webdev: 420,
    content: 280,
    design: 350,
    social: 260,
    video: 380,
    research: 220
  };

  function updateCalculation() {
    const hours = parseInt(hoursSlider.value);
    const skill = skillSelect.value;
    const rate = hourlyRates[skill] || 280;
    const targetIncome = hours * rate * 4;

    if (hoursVal) hoursVal.textContent = `${hours} hrs / week`;

    if (typeof gsap !== 'undefined') {
      gsap.to(earnState, {
        val: targetIncome,
        duration: 0.45,
        ease: 'power2.out',
        onUpdate: () => {
          estimatedEarn.textContent = `₹${Math.round(earnState.val).toLocaleString('en-IN')}`;
        }
      });
    } else {
      estimatedEarn.textContent = `₹${targetIncome.toLocaleString('en-IN')}`;
    }
  }

  hoursSlider.addEventListener('input', updateCalculation);
  skillSelect.addEventListener('change', updateCalculation);
  updateCalculation();
}

// 5. Company Cost Savings Estimator (with GSAP Count-up)
let savingsState = { agency: 0, funngro: 0 };
function initCompanyCalculator() {
  const projCountSlider = document.getElementById('projCountSlider');
  const projCountVal = document.getElementById('projCountVal');
  const agencyCostEl = document.getElementById('agencyCost');
  const funngroCostEl = document.getElementById('funngroCost');
  const savingsPercentEl = document.getElementById('savingsPercent');

  if (!projCountSlider || !agencyCostEl || !funngroCostEl) return;

  function updateSavings() {
    const count = parseInt(projCountSlider.value);
    const agencyAvg = 38000;
    const funngroAvg = 12500;

    const targetAgency = count * agencyAvg;
    const targetFunngro = count * funngroAvg;
    const savingsPercent = Math.round(((targetAgency - targetFunngro) / targetAgency) * 100);

    if (projCountVal) projCountVal.textContent = `${count} Projects / Month`;

    if (typeof gsap !== 'undefined') {
      gsap.to(savingsState, {
        agency: targetAgency,
        funngro: targetFunngro,
        duration: 0.45,
        ease: 'power2.out',
        onUpdate: () => {
          agencyCostEl.textContent = `₹${Math.round(savingsState.agency).toLocaleString('en-IN')}`;
          funngroCostEl.textContent = `₹${Math.round(savingsState.funngro).toLocaleString('en-IN')}`;
        }
      });
    } else {
      agencyCostEl.textContent = `₹${targetAgency.toLocaleString('en-IN')}`;
      funngroCostEl.textContent = `₹${targetFunngro.toLocaleString('en-IN')}`;
    }

    if (savingsPercentEl) {
      savingsPercentEl.textContent = `Save ${savingsPercent}% on Budget`;
    }
  }

  projCountSlider.addEventListener('input', updateSavings);
  updateSavings();
}

// 6. Category Filter Grid
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.spotlight-card[data-category]');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(card, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 7. Smooth FAQ Accordion
function initFaqAccordion() {
  const faqBoxes = document.querySelectorAll('.faq-box');

  faqBoxes.forEach(box => {
    const header = box.querySelector('.faq-box-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = box.classList.contains('open');

        faqBoxes.forEach(b => b.classList.remove('open'));

        if (!isOpen) {
          box.classList.add('open');
          const body = box.querySelector('.faq-box-body');
          if (typeof gsap !== 'undefined' && body) {
            gsap.fromTo(body, { opacity: 0, y: -5 }, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' });
          }
        }
      });
    }
  });
}

// 8. Modal Dialog Controller
function initModals() {
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloses = document.querySelectorAll('.modal-close');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      const targetModal = document.querySelector(targetId) || document.getElementById('profileModal');
      if (targetModal) {
        targetModal.classList.add('active');
        const card = targetModal.querySelector('.modal-card');
        if (typeof gsap !== 'undefined' && card) {
          gsap.fromTo(card, { scale: 0.88, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' });
        }
      }
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      modalOverlays.forEach(overlay => overlay.classList.remove('active'));
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}

// Global Form Submit Handler with Toast Notification
function handleFormSubmit(event) {
  event.preventDefault();
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  modalOverlays.forEach(overlay => overlay.classList.remove('active'));

  showNotificationToast('✨ Application received! Our team will reach out to you within 2 hours.');
  return false;
}

function showNotificationToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: #5FDD96;
    color: #050806;
    padding: 16px 28px;
    border-radius: 16px;
    font-weight: 800;
    font-size: 0.98rem;
    box-shadow: 0 10px 40px rgba(7, 171, 95, 0.4);
    z-index: 999999;
    transform: translateY(20px);
    opacity: 0;
  `;
  toast.innerHTML = message;
  document.body.appendChild(toast);

  if (typeof gsap !== 'undefined') {
    gsap.to(toast, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out(1.5)' });
    setTimeout(() => {
      gsap.to(toast, { y: 20, opacity: 0, duration: 0.3, onComplete: () => toast.remove() });
    }, 3500);
  } else {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
    setTimeout(() => toast.remove(), 3500);
  }
}
