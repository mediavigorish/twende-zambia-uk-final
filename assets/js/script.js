/**
 * Twende Zambia UK — Interactivity Engine (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyNavbar();
  initMobileMenu();
  initStatsCounters();
  initBackToTop();
  initLightbox();
  initNewsletterForm();
  initContactForm();
  initJoinForm();
});

/* ==========================================================
   1. Sticky Header / Navbar on Scroll
   ========================================================== */
function initStickyNavbar() {
  const header = document.getElementById('navbar-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-md', 'py-3');
      header.classList.remove('bg-white', 'py-5', 'shadow-sm');
    } else {
      header.classList.add('bg-white', 'py-5', 'shadow-sm');
      header.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-md', 'py-3');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Trigger instantly on load
}

/* ==========================================================
   2. Mobile Hamburger Menu
   ========================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-button');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');

  if (!menuBtn || !mobileMenu) return;

  const openBar = () => {
    mobileMenu.classList.remove('translate-x-full');
    if (overlay) overlay.classList.remove('hidden', 'pointer-events-none');
    document.body.style.overflow = 'hidden'; // Lock scrolling
  };

  const closeBar = () => {
    mobileMenu.classList.add('translate-x-full');
    if (overlay) overlay.classList.add('hidden', 'pointer-events-none');
    document.body.style.overflow = ''; // Restore scrolling
  };

  menuBtn.addEventListener('click', openBar);
  if (closeBtn) closeBtn.addEventListener('click', closeBar);
  if (overlay) overlay.addEventListener('click', closeBar);

  // Close when clicking a link (anchors on the same page)
  const links = mobileMenu.querySelectorAll('a');
  links.forEach(l => {
    l.addEventListener('click', closeBar);
  });
}

/* ==========================================================
   3. Animate counters on scroll (Intersection Observer)
   ========================================================== */
function initStatsCounters() {
  const statsSection = document.getElementById('statistics-section');
  const counters = document.querySelectorAll('.animate-counter');

  if (!counters.length) return;

  const runCounters = () => {
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
      const duration = 2000; // Animation duration in ms
      const stepTime = 20;   // Update every 20ms
      const stepCount = duration / stepTime;
      const increment = target / stepCount;
      let currentVal = 0;

      const updateCounter = () => {
        currentVal += increment;
        if (currentVal >= target) {
          counter.textContent = target.toLocaleString();
        } else {
          counter.textContent = Math.floor(currentVal).toLocaleString();
          setTimeout(updateCounter, stepTime);
        }
      };

      updateCounter();
    });
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCounters();
          observerInstance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (statsSection) {
      observer.observe(statsSection);
    } else {
      // Fallback if no wrapping stats section identifier is present
      counters.forEach(c => observer.observe(c));
    }
  } else {
    // Fallback if no intersection observer support
    runCounters();
  }
}

/* ==========================================================
   4. Back To Top Controller
   ========================================================== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.style.display = 'flex';
      setTimeout(() => { btn.style.opacity = '1'; }, 10);
    } else {
      btn.style.opacity = '0';
      setTimeout(() => { if (window.scrollY <= 400) btn.style.display = 'none'; }, 300);
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================
   5. Vanilla Lightbox Gallery
   ========================================================== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  // Find all standard links to lightbox trigger images
  const triggers = document.querySelectorAll('.lightbox-trigger');
  if (!triggers.length || !lightbox) return;

  let currentIdx = 0;
  const imageSources = [];
  const imageCaptions = [];

  // Parse items
  triggers.forEach((trigger, idx) => {
    const fullSizeUrl = trigger.getAttribute('data-image') || trigger.querySelector('img')?.src;
    const captionText = trigger.getAttribute('data-caption') || trigger.querySelector('h3')?.textContent || 'Twende Zambia UK Community';
    
    imageSources.push(fullSizeUrl);
    imageCaptions.push(captionText);

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      currentIdx = idx;
      openLightbox();
    });
  });

  const openLightbox = () => {
    updateLightboxContent();
    lightbox.style.display = 'block';
    // Small delay to trigger neat CSS transition
    setTimeout(() => {
      lightbox.classList.add('active');
    }, 50);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    setTimeout(() => {
      lightbox.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
  };

  const updateLightboxContent = () => {
    if (lightboxImg) {
      lightboxImg.src = imageSources[currentIdx];
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = imageCaptions[currentIdx];
    }
  };

  const showNext = () => {
    currentIdx = (currentIdx + 1) % imageSources.length;
    updateLightboxContent();
  };

  const showPrev = () => {
    currentIdx = (currentIdx - 1 + imageSources.length) % imageSources.length;
    updateLightboxContent();
  };

  // Click bindings
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Close lightbox if clicking black backdrop
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-wrap')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.style.display === 'block') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });
}

/* ==========================================================
   6. Footer Newsletter Sign Up Banner
   ========================================================== */
function initNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    if (!emailInput || !emailInput.value.trim()) return;

    // Show a modern notification instead of window.alert to comply with iframe specs
    showModernFeedback(
      'Newsletter Subscription Successful!',
      `Thank you! We have added ${emailInput.value.trim()} to our Twende Zambia UK mailing list. We will stay in touch regarding updates.`
    );
    emailInput.value = '';
  });
}

/* ==========================================================
   7. Contact Page Form Validation & Custom Success UI
   ========================================================== */
function initContactForm() {
  const form = document.getElementById('community-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value.trim();
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !message) {
      showErrorBanner('Please fill in all required fields (Name, Email, and Message).');
      return;
    }

    // Success response UI
    showModernFeedback(
      'Message Received Successfully!',
      `Dear ${name}, thank you for reaching out to Twende Zambia UK. Our support team will review your inquiry and contact you at ${email} shortly.`
    );
    form.reset();
  });
}

/* ==========================================================
   8. Membership Application Form / Interactive Price Calculator
   ========================================================== */
function initJoinForm() {
  const form = document.getElementById('membership-application-form');
  if (!form) return;

  // Real-time Fee Live Preview elements if they exist
  const adultQtyInput = document.getElementById('qty-adults');
  const childQtyInput = document.getElementById('qty-children');
  const sumAdults = document.getElementById('calc-adults-total');
  const sumChildren = document.getElementById('calc-children-total');
  const sumTotal = document.getElementById('calc-grand-total');

  const recalculateFees = () => {
    if (!adultQtyInput || !childQtyInput) return;

    const adultsCount = Math.max(0, parseInt(adultQtyInput.value, 10) || 0);
    const childrenCount = Math.max(0, parseInt(childQtyInput.value, 10) || 0);

    const adultsCost = adultsCount * 10;
    const childrenCost = childrenCount * 5;
    const totalCost = adultsCost + childrenCost;

    if (sumAdults) sumAdults.textContent = `£${adultsCost}`;
    if (sumChildren) sumChildren.textContent = `£${childrenCost}`;
    if (sumTotal) sumTotal.textContent = `£${totalCost}`;
  };

  if (adultQtyInput && childQtyInput) {
    adultQtyInput.addEventListener('input', recalculateFees);
    childQtyInput.addEventListener('input', recalculateFees);
    recalculateFees(); // Init values
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const firstName = document.getElementById('member-firstname')?.value.trim();
    const lastName = document.getElementById('member-lastname')?.value.trim();
    const email = document.getElementById('member-email')?.value.trim();
    const phone = document.getElementById('member-phone')?.value.trim();
    const address = document.getElementById('member-address')?.value.trim();
    const agreedTerms = document.getElementById('member-terms')?.checked;

    if (!firstName || !lastName || !email || !phone || !agreedTerms) {
      showErrorBanner('Please complete all required fields and accept the community terms and commitment.');
      return;
    }

    const adultsCount = adultQtyInput ? parseInt(adultQtyInput.value, 10) || 0 : 0;
    const childrenCount = childQtyInput ? parseInt(childQtyInput.value, 10) || 0 : 0;
    const totalFee = (adultsCount * 10) + (childrenCount * 5);

    showModernFeedback(
      'Application Submitted!',
      `Thank you, ${firstName} ${lastName}! Your Twende Zambia UK registration is processing. A representative will contact you at ${phone} to complete your background checklist, assist with your £${totalFee} annual membership dues, and invite you to our exclusive WhatsApp Group.`
    );
    form.reset();
    if (adultQtyInput) adultQtyInput.value = '1';
    if (childQtyInput) childQtyInput.value = '0';
    recalculateFees();
  });
}

/* ==========================================================
   Feedback Banner UI Engine (Avoids iframe window.alert blocks)
   ========================================================== */
function showModernFeedback(title, message) {
  // Check if there is already a modal/active alert, dismiss it
  const existing = document.getElementById('custom-success-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.id = 'custom-success-overlay';
  overlay.className = 'fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[3000] p-4 animate-fade-in';
  
  overlay.innerHTML = `
    <div class="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border-t-8 border-[#009A44] transform scale-95 transition-transform duration-300">
      <div class="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6 mx-auto">
        <svg class="w-8 h-8 text-[#009A44]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </div>
      <h3 class="text-2xl font-bold text-gray-900 text-center mb-3 font-display">${title}</h3>
      <p class="text-gray-600 text-center leading-relaxed text-sm lg:text-base">${message}</p>
      <div class="mt-8 flex justify-center">
        <button id="close-feedback-btn" class="bg-black hover:bg-[#E57200] text-white font-medium px-8 py-3 rounded-xl transition duration-200">
          Close Window
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  // Trigger scale on add
  setTimeout(() => {
    overlay.querySelector('div').classList.remove('scale-95');
    overlay.querySelector('div').classList.add('scale-100');
  }, 10);

  const closeBtn = overlay.querySelector('#close-feedback-btn');
  closeBtn.addEventListener('click', () => {
    overlay.querySelector('div').classList.remove('scale-100');
    overlay.querySelector('div').classList.add('scale-95');
    setTimeout(() => {
      overlay.remove();
    }, 200);
  });
}

function showErrorBanner(message) {
  const existing = document.getElementById('custom-error-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'custom-error-toast';
  toast.className = 'fixed top-6 left-1/2 transform -translate-x-1/2 bg-red-600 text-white rounded-xl shadow-lg px-6 py-3 font-medium flex items-center gap-3 z-[3000] border border-red-500 animate-fade-in text-sm lg:text-base';
  
  toast.innerHTML = `
    <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
    </svg>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
