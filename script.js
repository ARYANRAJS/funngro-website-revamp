// ==========================================================================
// FUNNGRO INTERACTIVE PLATFORM SCRIPT & MOTION CONTROLLER
// Designed & Developed by Hariom Bhati
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initSpotlightEffect();
  initTeenCalculator();
  initCompanyCalculator();
  initFaqAccordion();
  initModals();
});

// 1. Spotlight Mouse Tracking Effect for Cards (Bespoke Human Touch)
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.spotlight-card, .interactive-card');

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

// 2. Teen Earning Calculator (Smooth Reactive State & Number Formatting)
function initTeenCalculator() {
  const hoursSlider = document.getElementById('hoursSlider');
  const hoursVal = document.getElementById('hoursVal');
  const skillSelect = document.getElementById('skillSelect');
  const estimatedEarn = document.getElementById('estimatedEarn');

  if (!hoursSlider || !skillSelect || !estimatedEarn) return;

  const hourlyRates = {
    webdev: 380,
    content: 260,
    design: 320,
    social: 240,
    video: 350,
    research: 210
  };

  function updateCalculation() {
    const hours = parseInt(hoursSlider.value);
    const skill = skillSelect.value;
    const rate = hourlyRates[skill] || 260;

    // Monthly income (4 weeks per month)
    const monthlyIncome = hours * rate * 4;

    hoursVal.textContent = `${hours} hrs / week`;
    
    // Smooth text update with currency format
    estimatedEarn.textContent = `₹${monthlyIncome.toLocaleString('en-IN')}`;
  }

  hoursSlider.addEventListener('input', updateCalculation);
  skillSelect.addEventListener('change', updateCalculation);
  updateCalculation();
}

// 3. Company Cost Savings Estimator
function initCompanyCalculator() {
  const projCountSlider = document.getElementById('projCountSlider');
  const projCountVal = document.getElementById('projCountVal');
  const agencyCostEl = document.getElementById('agencyCost');
  const funngroCostEl = document.getElementById('funngroCost');
  const savingsPercentEl = document.getElementById('savingsPercent');

  if (!projCountSlider || !agencyCostEl || !funngroCostEl) return;

  function updateSavings() {
    const count = parseInt(projCountSlider.value);
    
    const agencyAvg = 36000;
    const funngroAvg = 12000;

    const totalAgency = count * agencyAvg;
    const totalFunngro = count * funngroAvg;
    const savingsPercent = Math.round(((totalAgency - totalFunngro) / totalAgency) * 100);

    projCountVal.textContent = `${count} Projects / Month`;
    agencyCostEl.textContent = `₹${totalAgency.toLocaleString('en-IN')}`;
    funngroCostEl.textContent = `₹${totalFunngro.toLocaleString('en-IN')}`;
    
    if (savingsPercentEl) {
      savingsPercentEl.textContent = `Save ${savingsPercent}% on Budget`;
    }
  }

  projCountSlider.addEventListener('input', updateSavings);
  updateSavings();
}

// 4. Smooth FAQ Accordion
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

// 5. Modal Dialog Controller
function initModals() {
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloses = document.querySelectorAll('.modal-close');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = trigger.getAttribute('data-modal-target');
      const targetModal = document.querySelector(targetId) || document.getElementById('modalOverlay');
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
    background: #00E676;
    color: #032010;
    padding: 16px 28px;
    border-radius: 16px;
    font-weight: 800;
    font-size: 0.98rem;
    box-shadow: 0 10px 40px rgba(0, 230, 118, 0.4);
    z-index: 9999;
    transform: translateY(20px);
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  toast.innerHTML = message;
  document.body.appendChild(toast);

  // Trigger animation frame
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
