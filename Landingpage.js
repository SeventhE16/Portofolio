document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active nav link highlight on click & scroll
  const sections = [
    { id: 'home', link: document.querySelector('.nav-link[href="#home"]') },
    { id: 'about', link: document.querySelector('.nav-link[href="#about"]') },
    { id: 'project', link: document.querySelector('.nav-link[href="#project"]') },
    { id: 'testimonials', link: document.querySelector('.nav-link[href="#testimonials"]') },
  ];

  const updateActiveNav = () => {
    const scrollPos = window.scrollY + 180;
    let current = sections[0];
    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el && el.offsetTop <= scrollPos) {
        current = sec;
      }
    });
    navLinks.forEach((l) => l.classList.remove('active'));
    if (current && current.link) {
      current.link.classList.add('active');
    }
  };

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // Toast Helper
  const toastBanner = document.getElementById('toastBanner');
  let toastTimer;
  function showToast(message) {
    if (!toastBanner) return;
    toastBanner.textContent = message;
    toastBanner.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastBanner.hidden = true;
    }, 3400);
  }

  const blogNavLink = document.getElementById('blogNavLink');
  if (blogNavLink) {
    blogNavLink.addEventListener('click', () => {
      showToast('Blog section coming soon — viewing client stories.');
    });
  }

  // 2. Scroll Reveal Animation
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // 3. Interactive Services Carousel (SAM PROJECT - Service states)
  const serviceCards = Array.from(document.querySelectorAll('.service-card'));
  const serviceBars = Array.from(document.querySelectorAll('#serviceBars .pager-bar'));
  const topIndicator = document.getElementById('serviceTopIndicator');
  const servicePrev = document.getElementById('servicePrev');
  const serviceNext = document.getElementById('serviceNext');
  let activeServiceIndex = 1;

  function setActiveService(index) {
    const total = serviceCards.length;
    activeServiceIndex = ((index % total) + total) % total;

    serviceCards.forEach((card, idx) => {
      card.classList.toggle('is-active', idx === activeServiceIndex);
    });
    serviceBars.forEach((bar, idx) => {
      bar.classList.toggle('is-active', idx === activeServiceIndex);
    });
    if (topIndicator) {
      topIndicator.setAttribute('data-active', String(activeServiceIndex));
    }
  }

  serviceCards.forEach((card, idx) => {
    card.addEventListener('click', () => setActiveService(idx));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActiveService(idx);
      }
    });
  });

  serviceBars.forEach((bar, idx) => {
    bar.addEventListener('click', () => setActiveService(idx));
  });

  if (servicePrev) {
    servicePrev.addEventListener('click', () => setActiveService(activeServiceIndex - 1));
  }
  if (serviceNext) {
    serviceNext.addEventListener('click', () => setActiveService(activeServiceIndex + 1));
  }

  // 4. Interactive Stats Highlight
  const statCards = Array.from(document.querySelectorAll('.stat-card'));
  const statBars = Array.from(document.querySelectorAll('.stats-bars .stat-bar'));
  statCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      statCards.forEach((c, i) => c.classList.toggle('is-featured', i === idx));
      statBars.forEach((b, i) => b.classList.toggle('is-active', i === idx));
    });
  });

  // 5. Testimonial Controls
  const tDots = Array.from(document.querySelectorAll('#testimonialDots .t-dot'));
  const tPrev = document.getElementById('testimonialPrev');
  const tNext = document.getElementById('testimonialNext');
  const tQuoteBlock = document.getElementById('testimonialQuoteBlock');
  let activeTestimonialDot = 0;

  function updateTestimonialIndicator(nextIdx) {
    activeTestimonialDot = ((nextIdx % tDots.length) + tDots.length) % tDots.length;
    tDots.forEach((dot, idx) => dot.classList.toggle('is-active', idx === activeTestimonialDot));
    if (tQuoteBlock) {
      tQuoteBlock.style.opacity = '0.45';
      setTimeout(() => {
        tQuoteBlock.style.opacity = '1';
      }, 150);
    }
  }

  if (tPrev) tPrev.addEventListener('click', () => updateTestimonialIndicator(activeTestimonialDot - 1));
  if (tNext) tNext.addEventListener('click', () => updateTestimonialIndicator(activeTestimonialDot + 1));

  // 6. Modal System (Project Details & Download CV)
  const modal = document.getElementById('portfolioModal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  const projectDetails = {
    pos: {
      tag: 'Mobile Application • UMKM POS',
      title: 'Kembang Jaya POS',
      image: 'assets/project-kembang-jaya-pos.png',
      url: 'https://drive.google.com/file/d/1CnEsw_KLaFVYk3fG2fkNCZ_e5z5_g6zw/view?usp=sharing',
      ctaLabel: 'Open Portfolio',
      description:
        'A digital point-of-sale and business recapitulation mobile app built for Depot Kayu Kembang Jaya to replace manual paper-and-pen bookkeeping during busy hours.',
      highlights: [
        'Sales, purchase, and timber inventory tracking (Penjualan, Pembelian, Stok)',
        'Automated net profit & margin calculation to prevent uncalculated discount losses',
        'Daily and multi-day revenue & profit chart with transaction history',
        'Zero monthly subscription fees tailored for independent local businesses',
      ],
    },
    landing: {
      tag: 'Web Design & Frontend • Company Profile',
      title: 'Landing Page Kembang Jaya',
      image: 'assets/project-landing-page-kembang-jaya.png',
      url: 'https://seventhe16.github.io/CodingCamp-220925-Muhammad_Farel_Assadida/',
      ctaLabel: 'Visit Live Site',
      description:
        'A responsive web storefront and product catalog for Depot Kayu Kembang Jaya, showcasing construction timber grades, custom woodworking services, and instant inquiry actions.',
      highlights: [
        'Responsive desktop and mobile layout tailored for construction buyers',
        'Clear catalog browsing for wood varieties, retail & wholesale pricing',
        'Direct stock & price inquiry integration with location visibility',
      ],
    },
    budget: {
      tag: 'Web & Mobile UI • Financial Tracker',
      title: 'Budget App — Seventh System',
      image: 'assets/project-budget-app.png',
      url: 'https://seventh-budget-ui.vercel.app/',
      ctaLabel: 'Visit Live App',
      description:
        'A structured personal finance and expense analytics interface supporting weekly/daily budgeting, expense input, and visual spending distribution.',
      highlights: [
        'Weekly and daily budget allocation trackers',
        'Real-time expense analysis bar charts and monthly history overview',
        'Synchronized dark-mode layout across desktop and mobile screens',
      ],
    },
  };

  function openModal(htmlContent) {
    if (!modal || !modalBody) return;
    modalBody.innerHTML = htmlContent;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.btn-view-details').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-project');
      const data = projectDetails[key];
      if (!data) return;

      const listItems = data.highlights.map((item) => `<li>${item}</li>`).join('');
      openModal(`
        <img src="${data.image}" alt="${data.title}" class="modal-preview-img" />
        <span class="modal-tag">${data.tag}</span>
        <h3 class="modal-heading" id="modalTitle">${data.title}</h3>
        <p class="modal-desc">${data.description}</p>
        <ul class="modal-highlights">${listItems}</ul>
        <div class="modal-actions">
          <a href="${data.url}" target="_blank" rel="noopener noreferrer" class="btn-primary">
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            <span>${data.ctaLabel}</span>
          </a>
          <a href="mailto:mfarelassadida@gmail.com?subject=Inquiry%20regarding%20${encodeURIComponent(data.title)}" class="btn-outline">Discuss Project</a>
          <button type="button" class="btn-outline" id="modalDismissBtn">Close</button>
        </div>
      `);

      const dismissBtn = document.getElementById('modalDismissBtn');
      if (dismissBtn) dismissBtn.addEventListener('click', closeModal);
    });
  });

  const downloadCvBtn = document.getElementById('downloadCvBtn');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', () => {
      openModal(`
        <span class="modal-tag">Curriculum Vitae Overview</span>
        <h3 class="modal-heading" id="modalTitle">Farel Assadida</h3>
        <p class="modal-desc">
          <strong>Role:</strong> Frontend &amp; Mobile Developer Enthusiast<br />
          <strong>Core Tools:</strong> Adobe Photoshop, Figma, HTML5, CSS3, XML<br />
          <strong>Services:</strong> Administration, Mobile App Design, Web Design<br />
          <strong>Location:</strong> Desa Langkap, Kecamatan Kedungwuni, Kabupaten Pekalongan<br />
          <strong>Contact:</strong> 0856 0002 2221 &bull; mfarelassadida@gmail.com
        </p>
        <ul class="modal-highlights">
          <li>01 Clients Order &bull; 03 Completed Projects &bull; 4.5 Stars Rating &bull; 06 Months Of Experience</li>
          <li>Featured Works: Kembang Jaya POS, Landing Page Kembang Jaya, Budget App</li>
        </ul>
        <div class="modal-actions">
          <button type="button" class="btn-primary" id="printCvBtn">Save / Print as PDF</button>
          <a href="mailto:mfarelassadida@gmail.com?subject=Request%20Full%20CV%20-%20Farel%20Assadida" class="btn-outline">Request PDF via Email</a>
        </div>
      `);

      const printCvBtn = document.getElementById('printCvBtn');
      if (printCvBtn) {
        printCvBtn.addEventListener('click', () => {
          closeModal();
          window.print();
        });
      }
    });
  }

  const moreProjectsBtn = document.getElementById('moreProjectsBtn');
  if (moreProjectsBtn) {
    moreProjectsBtn.addEventListener('click', () => {
      showToast('All 3 featured projects are displayed above. Contact me for full archive!');
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hidden) {
      closeModal();
    }
  });
});
