/**
 * El Diario — main.js
 * JavaScript progresivo: todo funciona sin JS, esto mejora la experiencia.
 */

(function () {
  'use strict';

  // ============================================================
  // 1. TICKER DE ÚLTIMA HORA — duplicar items para loop continuo
  // ============================================================
  const ticker = document.getElementById('breaking-ticker');
  if (ticker) {
    // Duplicar los items para el efecto de loop sin pausa visible
    const items = ticker.innerHTML;
    ticker.innerHTML = items + items;
  }

  // Botón de cerrar el breaking news
  const bnClose = document.getElementById('bn-close');
  const bnBar   = document.querySelector('.breaking-news');
  if (bnClose && bnBar) {
    bnClose.addEventListener('click', () => {
      bnBar.classList.add('is-hidden');
      sessionStorage.setItem('bn-closed', '1');
    });
    // Recordar si el usuario lo cerró en esta sesión
    if (sessionStorage.getItem('bn-closed') === '1') {
      bnBar.classList.add('is-hidden');
    }
  }

  // ============================================================
  // 2. MENÚ HAMBURGUESA (móvil)
  // ============================================================
  const burger      = document.getElementById('nav-burger');
  const mobileNav   = document.getElementById('mobile-nav-overlay');
  const mobileClose = document.getElementById('mobile-nav-close');

  function openMobileNav() {
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (burger && mobileNav) {
    burger.addEventListener('click', openMobileNav);
    if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);

    // Cerrar al hacer click fuera del panel
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) closeMobileNav();
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileNav();
    });
  }

  // ============================================================
  // 3. BÚSQUEDA OVERLAY
  // ============================================================
  const searchToggle   = document.getElementById('search-toggle');
  const searchOverlay  = document.getElementById('search-overlay');
  const searchBackdrop = document.getElementById('search-backdrop');
  const searchClose    = document.getElementById('search-close');

  function openSearch() {
    searchOverlay.classList.add('is-open');
    searchBackdrop.classList.add('is-open');
    searchOverlay.setAttribute('aria-hidden', 'false');
    searchToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Foco en el input
    const input = searchOverlay.querySelector('input');
    if (input) setTimeout(() => input.focus(), 50);
  }

  function closeSearch() {
    searchOverlay.classList.remove('is-open');
    searchBackdrop.classList.remove('is-open');
    searchOverlay.setAttribute('aria-hidden', 'true');
    searchToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener('click', openSearch);
    if (searchClose)    searchClose.addEventListener('click', closeSearch);
    if (searchBackdrop) searchBackdrop.addEventListener('click', closeSearch);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
      // Atajos: / para abrir búsqueda (como GitHub, NYT)
      if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        openSearch();
      }
    });
  }

  // ============================================================
  // 4. BARRA DE PROGRESO DE LECTURA
  // ============================================================
  const progressBar = document.getElementById('reading-progress-bar');
  if (progressBar) {
    const article = document.querySelector('.article-body');

    function updateProgress() {
      if (!article) return;
      const articleTop    = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const scrollY       = window.scrollY || window.pageYOffset;
      const windowH       = window.innerHeight;
      const progress      = Math.max(0, Math.min(100,
        ((scrollY - articleTop + windowH * 0.15) / articleHeight) * 100
      ));
      progressBar.style.width = progress + '%';
      progressBar.parentElement.setAttribute('aria-valuenow', Math.round(progress));
    }

    // Throttle con requestAnimationFrame
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ============================================================
  // 5. BOTÓN "COPIAR ENLACE"
  // ============================================================
  document.querySelectorAll('.social-share__btn--copy').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const url = btn.dataset.url || window.location.href;
      try {
        await navigator.clipboard.writeText(url);
        btn.classList.add('is-copied');
        const span = btn.querySelector('span');
        const original = span ? span.textContent : '';
        if (span) span.textContent = '¡Copiado!';
        setTimeout(() => {
          btn.classList.remove('is-copied');
          if (span) span.textContent = original;
        }, 2000);
      } catch (err) {
        // Fallback para navegadores sin Clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
    });
  });

  // ============================================================
  // 6. LAZY LOADING DE IMÁGENES (nativo con polyfill)
  // ============================================================
  if ('loading' in HTMLImageElement.prototype) {
    // El navegador soporta loading="lazy" nativo — nada que hacer
  } else {
    // Polyfill básico con IntersectionObserver
    const images = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) img.src = img.dataset.src;
            observer.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });
      images.forEach((img) => observer.observe(img));
    }
  }

  // ============================================================
  // 7. NAVEGACIÓN — resaltar sección activa en la barra de nav
  // ============================================================
  const currentPath = window.location.pathname;
  document.querySelectorAll('.site-nav__link').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(link.dataset.section)) {
      link.classList.add('site-nav__link--active');
    }
  });

  // ============================================================
  // 8. STICKY HEADER — añadir clase al scroll
  // ============================================================
  const siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 60) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
      // Auto-ocultar header al bajar, mostrar al subir (como NYT)
      if (currentScroll > 200) {
        if (currentScroll > lastScroll) {
          siteHeader.classList.add('is-hidden-scroll');
        } else {
          siteHeader.classList.remove('is-hidden-scroll');
        }
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ============================================================
  // 9. TIEMPO RELATIVO — "Hace 2 horas"
  // ============================================================
  function relativeTime(dateStr) {
    const date = new Date(dateStr);
    const now  = new Date();
    const diff = Math.floor((now - date) / 1000); // segundos

    if (diff < 60)     return 'Hace un momento';
    if (diff < 3600)   return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400)  return `Hace ${Math.floor(diff / 3600)} h`;
    if (diff < 172800) return 'Ayer';
    return null; // Más de 2 días: usar la fecha formateada
  }

  document.querySelectorAll('time[datetime]').forEach((el) => {
    const dateStr = el.getAttribute('datetime');
    if (!dateStr) return;
    const rel = relativeTime(dateStr);
    if (rel) {
      el.setAttribute('title', el.textContent.trim());
      el.textContent = rel;
    }
  });

  // ============================================================
  // 10. COOKIE CONSENT BANNER
  // ============================================================
  const cookieBanner  = document.getElementById('cookie-banner');
  const cookieAccept  = document.getElementById('cookie-accept');
  const cookieReject  = document.getElementById('cookie-reject');
  const COOKIE_KEY    = 'ed-cookie-consent'; // 'ed' = El Diario

  function hideBanner() {
    if (!cookieBanner) return;
    cookieBanner.classList.remove('is-visible');
    cookieBanner.setAttribute('aria-hidden', 'true');
    // Devolver foco al body al cerrar
    document.body.focus();
  }

  function initCookieBanner() {
    if (!cookieBanner) return;
    const stored = localStorage.getItem(COOKIE_KEY);
    if (stored) return; // Ya decidió

    // Mostrar con pequeño delay para no bloquear el render inicial
    setTimeout(() => {
      cookieBanner.classList.add('is-visible');
      cookieBanner.setAttribute('aria-hidden', 'false');
    }, 800);
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'all');
      hideBanner();
    });
  }

  if (cookieReject) {
    cookieReject.addEventListener('click', () => {
      localStorage.setItem(COOKIE_KEY, 'essential');
      hideBanner();
    });
  }

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cookieBanner && cookieBanner.classList.contains('is-visible')) {
      localStorage.setItem(COOKIE_KEY, 'essential');
      hideBanner();
    }
  });

  initCookieBanner();

  // ============================================================
  // 11. TOONS SLIDER + LIGHTBOX
  // ============================================================
  const toonsSlider = document.getElementById('toons-slider');
  if (toonsSlider) {
    const track   = document.getElementById('toons-track');
    const items   = Array.from(track.querySelectorAll('.toons-slider__item'));
    const btnPrev = toonsSlider.querySelector('.toons-slider__btn--prev');
    const btnNext = toonsSlider.querySelector('.toons-slider__btn--next');
    let current = 0;

    function getVisible() {
      const w = window.innerWidth;
      if (w < 480)  return 2;
      if (w < 768)  return 3;
      if (w < 1100) return 4;
      return 5;
    }

    function updateSlider() {
      const visible = getVisible();
      const max = Math.max(0, items.length - visible);
      current = Math.min(current, max);
      const gapPx = window.innerWidth < 480 ? 12 : 16;
      const viewportW = track.parentElement.offsetWidth;
      const itemW = (viewportW - gapPx * (visible - 1)) / visible;
      track.style.transform = `translateX(-${current * (itemW + gapPx)}px)`;
      btnPrev.disabled = current === 0;
      btnNext.disabled = current >= max;
    }

    btnPrev.addEventListener('click', () => { current--; updateSlider(); });
    btnNext.addEventListener('click', () => { current++; updateSlider(); });
    window.addEventListener('resize', () => { current = 0; updateSlider(); }, { passive: true });
    updateSlider();

    // --- LIGHTBOX ---
    const lightbox   = document.getElementById('toons-lightbox');
    const lbImg      = document.getElementById('toons-lb-img');
    const lbCaption  = document.getElementById('toons-lb-caption');
    const lbClose    = document.getElementById('toons-lb-close');
    const lbPrev     = document.getElementById('toons-lb-prev');
    const lbNext     = document.getElementById('toons-lb-next');
    const lbBackdrop = document.getElementById('toons-lb-backdrop');
    let lbIndex = 0;

    function showLbSlide() {
      const item = items[lbIndex];
      lbImg.src        = item.dataset.src;
      lbImg.alt        = item.dataset.caption;
      lbCaption.textContent = item.dataset.caption;
      lbPrev.disabled  = lbIndex === 0;
      lbNext.disabled  = lbIndex === items.length - 1;
    }

    function openLightbox(index) {
      lbIndex = index;
      showLbSlide();
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    }

    items.forEach((item) => {
      item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index, 10)));
    });

    lbClose.addEventListener('click', closeLightbox);
    lbBackdrop.addEventListener('click', closeLightbox);
    lbPrev.addEventListener('click', () => { lbIndex--; showLbSlide(); });
    lbNext.addEventListener('click', () => { lbIndex++; showLbSlide(); });

    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape')      closeLightbox();
      if (e.key === 'ArrowLeft'  && lbIndex > 0)                { lbIndex--; showLbSlide(); }
      if (e.key === 'ArrowRight' && lbIndex < items.length - 1) { lbIndex++; showLbSlide(); }
    });
  }

  // ============================================================
  // 12. NEWSLETTER — envío AJAX a MailerLite (sin redirigir)
  // ============================================================
  document.querySelectorAll('.newsletter-box__form, .sidebar-newsletter').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn  = form.querySelector('button[type="submit"]');
      const email      = emailInput ? emailInput.value.trim() : '';
      if (!email) return;

      const originalText   = submitBtn.textContent;
      submitBtn.disabled   = true;
      submitBtn.textContent = '...';

      const body = `fields[email]=${encodeURIComponent(email)}&ml-submit=1&anticsrf=true`;

      fetch(form.action, {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            const msg = document.createElement('p');
            msg.className   = 'newsletter-success';
            msg.textContent = '¡Gracias! Revisa tu correo para confirmar.';
            form.replaceWith(msg);
          } else {
            submitBtn.disabled   = false;
            submitBtn.textContent = originalText;
          }
        })
        .catch(() => {
          // Fallback: submit normal si fetch falla
          form.removeAttribute('target');
          form.submit();
        });
    });
  });

})();
