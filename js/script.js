/* ============================================
   MAIN SCRIPT — Portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Initialize Lucide Icons ----
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ---- DOM References ----
  const floatingNav = document.getElementById('floating-nav');
  const burger      = document.getElementById('nav-burger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const navLinks    = document.querySelectorAll('.floating-nav__link');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');
  const sections    = document.querySelectorAll('section[id]');

  // ---- Hamburger Toggle ----
  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', toggleMenu);

  // Close menu when a mobile link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // ---- Navbar Scroll Effect ----
  function handleScroll() {
    const scrollY = window.scrollY;

    // Add/remove "scrolled" class for subtle visual change
    if (scrollY > 60) {
      floatingNav.classList.add('scrolled');
    } else {
      floatingNav.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    let currentSection = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ============================================
  // PROJECTS SECTION: FILTER & SLIDER & MODAL
  // ============================================
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-slide-card');
  const track        = document.getElementById('projects-track');
  const prevBtn      = document.getElementById('projects-prev');
  const nextBtn      = document.getElementById('projects-next');
  const dotsContainer= document.getElementById('projects-dots');

  // Modal elements
  const projectModal  = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose    = document.getElementById('modal-close');
  const modalImg      = document.getElementById('modal-img');
  const modalBadge    = document.getElementById('modal-badge');
  const modalTitle    = document.getElementById('modal-title');
  const modalDesc     = document.getElementById('modal-desc');
  const modalFeatures = document.getElementById('modal-features');
  const modalTechs    = document.getElementById('modal-techs');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalRepoLink = document.getElementById('modal-repo-link');
  const modalPrevImg  = document.getElementById('modal-prev-img');
  const modalNextImg  = document.getElementById('modal-next-img');
  const modalCounter  = document.getElementById('modal-counter');
  const modalDots     = document.getElementById('modal-dots');

  // Database Proyek untuk Modal Detail
  const projectsData = {
    '1': {
      title: 'Web Wisata Alam Lejja',
      category: 'Web Developer',
      desc: 'Sebuah website yang menampilkan informasi wisata alam Lejja, termasuk galeri foto, deskripsi lokasi, dan fasilitas yang tersedia.',
      features: [
        'Tampilan responsif dan ramah pengguna',
        'Galeri foto yang menarik',
        'Deskripsi lokasi yang detail',
        'Informasi fasilitas yang tersedia'
      ],
      techs: ['HTML5', 'JavaScript', 'Tailwind CSS', 'Node.js'],
      images: [
        'assets/images/project0/project01.png',
        'assets/images/project0/project02.png',
        'assets/images/project0/project03.png',
        'assets/images/project0/project04.png',
        'assets/images/project0/project05.png'
      ],
      liveLink: 'https://aliefnarfan.github.io/WEB_PROFIL_LEJJA/',
      repoLink: 'https://github.com/aliefnarfan/WEB_PROFIL_LEJJA'
    },
    '2': {
      title: 'Rak Buku Alief',
      category: 'Web Developer',
      desc: 'Sebuah website yang menampilkan informasi tentang rak buku Alief, termasuk galeri foto, deskripsi lokasi, dan fasilitas yang tersedia.',
      features: [
        'Tampilan responsif dan ramah pengguna',
        'Katalog buku yang menarik',
        'Forum diskusi untuk pengunjung',
        'Peminjaman buku secara online'
      ],
      techs: ['HTML5', 'JavaScript', 'Tailwind CSS', 'Node.js'],
      images: [
        'assets/images/project1/project11.png',
        'assets/images/project1/project12.png',
        'assets/images/project1/project13.png',
        'assets/images/project1/project14.png',
        'assets/images/project1/project15.png'
      ],
      liveLink: 'https://aliefnarfan.github.io/WEB-RAK-BUKU-ALIEF/',
      repoLink: 'https://github.com/aliefnarfan/WEB-RAK-BUKU-ALIEF'
    },
    '3': {
      title: 'Infografis TIX ID',
      category: 'Graphic Design',
      desc: 'Desain infografis untuk kampanye digital TIX ID, menampilkan informasi penting tentang layanan dan model bisnis yang ditawarkan.',
      features: [
        'Desain visual yang menarik dan informatif',
        'Penggunaan tipografi yang jelas dan mudah dibaca',
        'Warna dan ikonografi yang konsisten dengan brand TIX ID',
        'Format siap cetak dan digital untuk berbagai platform'
      ],
      techs: ['Adobe Illustrator', 'Canva', 'Typography', 'Packaging 3D'],
      images: [
        'assets/images/project2/project21.png',
        'assets/images/project2/project22.png',
        'assets/images/project2/project23.png'
      ],
      liveLink: 'https://behance.net/',
      repoLink: 'https://github.com/'
    },
    '4': {
      title: 'Poster Coming Soon Event Organisasi',
      category: 'Graphic Design',
      desc: 'Desain poster untuk event organisasi yang akan datang.',
      features: [
        'Desain visual yang menarik dan informatif',
        'Penggunaan tipografi yang jelas dan mudah dibaca',
        'Warna dan ikonografi yang konsisten dengan brand organisasi',
        'Format siap cetak dan digital untuk berbagai platform'
      ],
      techs: ['Canva', 'Photoshop', 'Typography', 'Print Design'],
      images: [
        'assets/images/project3/project31.png',
        'assets/images/project3/project32.png'
      ],
      liveLink: 'https://github.com/',
      repoLink: 'https://github.com/'
    },
  };

  let currentSlide = 0;
  let activeFilter = 'all';

  // Helper: get visible (unfiltered) cards
  function getVisibleCards() {
    return Array.from(projectCards).filter(card => !card.classList.contains('is-hidden'));
  }

  // Determine cards visible per view based on window width
  function getCardsPerView() {
    const width = window.innerWidth;
    if (width > 1024) return 3;
    if (width > 768)  return 2;
    return 1;
  }

  // Update slider position and controls
  function updateSlider() {
    if (!track) return;

    const visibleCards = getVisibleCards();
    const cardsPerView = getCardsPerView();
    const maxSlide = Math.max(0, visibleCards.length - cardsPerView);

    // Clamp currentSlide
    if (currentSlide > maxSlide) {
      currentSlide = maxSlide;
    }
    if (currentSlide < 0) {
      currentSlide = 0;
    }

    if (visibleCards.length === 0) {
      track.style.transform = 'translateX(0px)';
      if (prevBtn) prevBtn.disabled = true;
      if (nextBtn) nextBtn.disabled = true;
      renderDots(0);
      return;
    }

    // Calculate translation offset based on card width and gap
    const firstCard = visibleCards[0];
    const cardRect = firstCard.getBoundingClientRect();
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 32;

    const shiftAmount = (cardRect.width + gap) * currentSlide;
    track.style.transform = `translateX(-${shiftAmount}px)`;

    // Update button states
    if (prevBtn) prevBtn.disabled = currentSlide === 0;
    if (nextBtn) nextBtn.disabled = currentSlide >= maxSlide;

    // Update pagination dots
    const totalPages = maxSlide + 1;
    renderDots(totalPages);
  }

  // Render pagination dots dynamically
  function renderDots(totalPages) {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';

    if (totalPages <= 1) return;

    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${i === currentSlide ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Pindah ke slide ${i + 1}`);
      dot.addEventListener('click', () => {
        currentSlide = i;
        updateSlider();
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Filter Projects by Category
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      activeFilter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (activeFilter === 'all' || category === activeFilter) {
          card.classList.remove('is-hidden');
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 40);
        } else {
          card.classList.add('is-hidden');
        }
      });

      // Reset to first slide on filter change
      currentSlide = 0;
      updateSlider();
    });
  });

  // Slider Navigation Buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const visibleCards = getVisibleCards();
      const maxSlide = Math.max(0, visibleCards.length - getCardsPerView());
      if (currentSlide < maxSlide) {
        currentSlide++;
        updateSlider();
      }
    });
  }

  // Window resize handler for slider
  window.addEventListener('resize', () => {
    updateSlider();
  }, { passive: true });

  // ============================================
  // PROJECT MODAL DIALOG & GALLERY SLIDER
  // ============================================
  let activeModalImages = [];
  let currentModalImgIndex = 0;

  function updateModalGallery() {
    if (!modalImg || activeModalImages.length === 0) return;

    // Smooth image transition
    modalImg.style.opacity = '0';
    setTimeout(() => {
      modalImg.src = activeModalImages[currentModalImgIndex];
      modalImg.style.opacity = '1';
    }, 120);

    // Update Counter
    if (modalCounter) {
      modalCounter.textContent = `${currentModalImgIndex + 1} / ${activeModalImages.length}`;
    }

    // Update Dots
    if (modalDots) {
      modalDots.innerHTML = '';
      activeModalImages.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = `modal-gallery__dot ${idx === currentModalImgIndex ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Gambar ${idx + 1}`);
        dot.addEventListener('click', () => {
          currentModalImgIndex = idx;
          updateModalGallery();
        });
        modalDots.appendChild(dot);
      });
    }
  }

  function openProjectModal(card) {
    if (!projectModal) return;

    const projectId = card.getAttribute('data-project-id');
    const data = projectsData[projectId] || {
      title: card.querySelector('.project-slide-card__title')?.textContent || 'Detail Proyek',
      category: card.querySelector('.project-slide-card__role-tag')?.textContent || 'Project',
      desc: card.querySelector('.project-slide-card__desc')?.textContent || '',
      features: ['Perancangan antarmuka modular & intuitif', 'Pengembangan kode bersih dan terstruktur'],
      techs: ['HTML', 'CSS', 'JavaScript'],
      images: [card.querySelector('.project-slide-card__img')?.getAttribute('src') || ''],
      liveLink: '#',
      repoLink: '#'
    };

    // Populate Left Column (Informasi)
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalBadge) modalBadge.textContent = data.category;
    if (modalDesc)  modalDesc.textContent = data.desc;

    // Populate Modul & Fitur Utama (Bullet Points)
    if (modalFeatures) {
      modalFeatures.innerHTML = '';
      data.features.forEach(feat => {
        const li = document.createElement('li');
        li.textContent = feat;
        modalFeatures.appendChild(li);
      });
    }

    // Populate Tech Stack & Tools (Badges)
    if (modalTechs) {
      modalTechs.innerHTML = '';
      data.techs.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'project-modal__tech-tag';
        span.textContent = tech;
        modalTechs.appendChild(span);
      });
    }

    // Populate Action Links
    if (modalLiveLink) modalLiveLink.href = data.liveLink || '#';
    if (modalRepoLink) modalRepoLink.href = data.repoLink || '#';

    // Populate Right Column (Media Showcase Slider)
    activeModalImages = data.images && data.images.length > 0
      ? data.images
      : [card.querySelector('.project-slide-card__img')?.getAttribute('src')];
    currentModalImgIndex = 0;
    updateModalGallery();

    // Show Modal
    projectModal.classList.add('open');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Refresh Lucide Icons inside modal
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('open');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Modal Gallery Navigation
  if (modalPrevImg) {
    modalPrevImg.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeModalImages.length > 0) {
        currentModalImgIndex = (currentModalImgIndex - 1 + activeModalImages.length) % activeModalImages.length;
        updateModalGallery();
      }
    });
  }

  if (modalNextImg) {
    modalNextImg.addEventListener('click', (e) => {
      e.stopPropagation();
      if (activeModalImages.length > 0) {
        currentModalImgIndex = (currentModalImgIndex + 1) % activeModalImages.length;
        updateModalGallery();
      }
    });
  }

  // Attach card click handlers
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      openProjectModal(card);
    });

    // Keyboard accessibility (Enter/Space on focused card)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProjectModal(card);
      }
    });
  });

  // Close modal events
  if (modalClose)    modalClose.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('open')) {
      closeProjectModal();
    }
  });

  // ============================================
  // SMOOTH SCROLLING FOR NAVIGATION LINKS
  // ============================================
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');

  allAnchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        e.preventDefault();

        // Calculate offset considering floating navbar height
        const navHeight = floatingNav ? floatingNav.offsetHeight : 60;
        const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - (navHeight + 20);

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          closeMenu();
        }
      }
    });
  });

  // ============================================
  // CV MODAL PREVIEW LOGIC
  // ============================================
  const cvBtn          = document.getElementById('cv-btn');
  const cvModal        = document.getElementById('cv-modal');
  const cvModalClose   = document.getElementById('cv-modal-close');
  const cvModalBackdrop= document.getElementById('cv-modal-backdrop');

  function openCvModal() {
    if (!cvModal) return;
    cvModal.classList.add('open');
    cvModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Kunci scroll halaman
  }

  function closeCvModal() {
    if (!cvModal) return;
    cvModal.classList.remove('open');
    cvModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Balikkan scroll halaman
  }

  if (cvBtn)           cvBtn.addEventListener('click', openCvModal);
  if (cvModalClose)    cvModalClose.addEventListener('click', closeCvModal);
  if (cvModalBackdrop) cvModalBackdrop.addEventListener('click', closeCvModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal && cvModal.classList.contains('open')) {
      closeCvModal();
    }
  });

  // ============================================
  // CONTACT FORM SUBMISSION
  // ============================================
  const contactForm     = document.getElementById('contact-form');
  const contactFeedback = document.getElementById('contact-feedback');
  const contactSubmitBtn= document.getElementById('contact-submit');

  let feedbackTimeout = null;

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.innerText = str;
    return div.innerHTML;
  }

  function showContactFeedback(message, type) {
    if (!contactFeedback) return;

    if(feedbackTimeout) {
      clearTimeout(feedbackTimeout);
    }

    contactFeedback.innerHTML = message;
    contactFeedback.className = `contact-form__feedback ${type}`;
    contactFeedback.style.display = 'block';

    // Auto-hide feedback after 6 seconds
    feedbackTimeout = setTimeout(() => {
      contactFeedback.style.display = 'none';
      contactFeedback.className = 'contact-form__feedback';
    }, 6000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput    = document.getElementById('contact-name');
      const phoneInput   = document.getElementById('contact-phone');
      const emailInput   = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const name    = nameInput ? nameInput.value.trim() : '';
      const phone   = phoneInput ? phoneInput.value.trim() : '';
      const email   = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Form validation
      if (!name || !email || !subject || !message) {
        showContactFeedback('Harap lengkapi semua field yang diperlukan (Nama, Email, Subjek, dan Pesan).', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showContactFeedback('Format email tidak valid. Silakan periksa kembali alamat email Anda.', 'error');
        return;
      }

      const contactData = {
        name: name,
        phone: phone,
        email: email,
        subject: subject,
        message: message,
        submittedAt: new Date().toLocaleString('id-ID', { timeZone: 'Asia/Makassar' })
      };

      try {
        let savedMessages = JSON.parse(localStorage.getItem('portfolio_contacts')) || [];
        if (!Array.isArray(savedMessages)) {
          savedMessages = [];
        }
        savedMessages.push(contactData);
        localStorage.setItem('portfolio_contacts', JSON.stringify(savedMessages));
      } catch (error) {
        console.error('Error saving contact message:', error);
        showContactFeedback('Terjadi kesalahan saat menyimpan pesan Anda. Silakan coba lagi.', 'error');
        return;
      }

      showContactFeedback(`✓ Terima kasih, <strong>${escapeHtml(name)}</strong>! Pesan Anda telah tersimpan di localStorage.`, 'success');
      contactForm.reset();

      // Temporary sending state
      const originalBtnHTML = contactSubmitBtn.innerHTML;
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.innerHTML = `<span>Sending...</span>`;

      setTimeout(() => {
        showContactFeedback(`✓ Terima kasih, <strong>${escapeHtml(name)}</strong>! Pesan Anda berhasil terkirim. Saya akan segera merespons.`, 'success');
        contactForm.reset();

        contactSubmitBtn.disabled = false;
        contactSubmitBtn.innerHTML = originalBtnHTML;

        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }, 700);
    });
  }

  // Run initial slider setup
  updateSlider();

});
