// ==========================================================================
// FUNNGRO INTERACTIVE PLATFORM SCRIPT & MOTION CONTROLLER
// Designed & Developed with Precision by Hariom Bhati
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initSpotlightEffect();
  initTeenCalculator();
  initCompanyCalculator();
  initFaqAccordion();
  initModals();
  initCategoryFilters();
});

// 1. Page Preloader Fade-out Controller
function initPreloader() {
  const preloader = document.getElementById('page-preloader');
  if (!preloader) return;

  // Fade out preloader smoothly after page assets load
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.remove(), 600);
    }, 800);
  });

  // Fallback safety timeout in case load event already fired
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.remove(), 600);
    }
  }, 1800);
}

// 2. Spotlight Mouse Tracking Effect for Cards (Emil Kowalski Motion Touch)
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

// 3. Teen Earning Calculator (Smooth Reactive State & Number Formatting)
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

    const monthlyIncome = hours * rate * 4;

    if (hoursVal) hoursVal.textContent = `${hours} hrs / week`;
    estimatedEarn.textContent = `₹${monthlyIncome.toLocaleString('en-IN')}`;
  }

  hoursSlider.addEventListener('input', updateCalculation);
  skillSelect.addEventListener('change', updateCalculation);
  updateCalculation();
}

// 4. Company Cost Savings Estimator
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

    const totalAgency = count * agencyAvg;
    const totalFunngro = count * funngroAvg;
    const savingsPercent = Math.round(((totalAgency - totalFunngro) / totalAgency) * 100);

    if (projCountVal) projCountVal.textContent = `${count} Projects / Month`;
    agencyCostEl.textContent = `₹${totalAgency.toLocaleString('en-IN')}`;
    funngroCostEl.textContent = `₹${totalFunngro.toLocaleString('en-IN')}`;
    
    if (savingsPercentEl) {
      savingsPercentEl.textContent = `Save ${savingsPercent}% on Budget`;
    }
  }

  projCountSlider.addEventListener('input', updateSavings);
  updateSavings();
}

// 5. Category Filter Buttons Grid
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
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          requestAnimationFrame(() => {
            card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 6. Smooth FAQ Accordion
function initFaqAccordion() {
  const faqBoxes = document.querySelectorAll('.faq-box');

  faqBoxes.forEach(box => {
    const header = box.querySelector('.faq-box-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = box.classList.contains('open');

        // Close all other boxes
        faqBoxes.forEach(b => b.classList.remove('open'));

        // Toggle current box
        if (!isOpen) {
          box.classList.add('open');
        }
      });
    }
  });
}

// 7. Modal Dialog Controller
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

// Global Form Submit Handler with Custom Notification Toast
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
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  toast.innerHTML = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}
