document.addEventListener('DOMContentLoaded', function () {
  // Header: efeito ao rolar
  const header = document.querySelector('.header');
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    if (currentScroll > lastScroll && currentScroll > 200) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
  });

  // Menu mobile
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      this.classList.toggle('active');
      const spans = this.querySelectorAll('span');
      if (this.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Scroll suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        const spans = mobileMenuToggle.querySelectorAll('span');
        spans.forEach((span) => (span.style = ''));
      }
    });
  });

  // Carrossel de depoimentos
  const testimonials = document.querySelectorAll('.testimonial');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentTestimonial = 0;
  function showTestimonial(index) {
    testimonials.forEach((el, i) => {
      el.classList.toggle('active', i === index);
    });
  }
  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }
  function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
  }
  if (prevBtn && nextBtn && testimonials.length > 0) {
    prevBtn.addEventListener('click', prevTestimonial);
    nextBtn.addEventListener('click', nextTestimonial);
    setInterval(nextTestimonial, 5000);
  }

  // Animações no scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('animate-in');
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('.service-card, .about-content, .testimonial').forEach((el) => observer.observe(el));

  // Efeito parallax simples no hero
  const heroImage = document.querySelector('.hero-image');
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroImage) heroImage.style.transform = `translateY(${scrolled * -0.5}px)`;
  });

  // CTAs: pequenos efeitos e modais simples
  function showModal(title) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close" aria-label="Fechar">&times;</span>
        <h2>${title}</h2>
        <p>Nossa equipe está pronta para atender você:</p>
        <div class="modal-buttons">
          <a href="https://wa.me/5562999520149" class="btn-whatsapp">WhatsApp</a>
          <a href="tel:+556232073834" class="btn-phone">Ligar</a>
        </div>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector('.close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
  }

  document.querySelectorAll('.cta-button, .btn-primary, .btn-secondary').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      if (this.tagName.toLowerCase() === 'a' && this.getAttribute('href')?.startsWith('#')) return; // âncora
      e.preventDefault();
      this.style.transform = 'scale(0.95)';
      setTimeout(() => (this.style.transform = ''), 150);
      if (this.textContent.includes('Orçamento')) showModal('Solicitar Orçamento');
      if (this.textContent.includes('Especialista')) showModal('Falar com Especialista');
    });
  });

  // Botão voltar ao topo
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '↑';
  scrollTopBtn.className = 'scroll-top-btn';
  document.body.appendChild(scrollTopBtn);
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) scrollTopBtn.classList.add('show');
    else scrollTopBtn.classList.remove('show');
  });
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Marca body como carregado para possíveis efeitos
  document.body.classList.add('loaded');
});

// Estilos adicionais injetados via JS
const additionalStyles = `
  .modal { position: fixed; z-index: 2000; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; animation: fadeIn 0.3s ease; }
  .modal-content { background: #fff; padding: 2rem; border-radius: 20px; text-align: center; max-width: 500px; width: 90%; position: relative; animation: slideUp 0.3s ease; }
  .close { position: absolute; right: 20px; top: 20px; font-size: 28px; cursor: pointer; color: #999; transition: color 0.3s ease; }
  .close:hover { color: #EA0E0F; }
  .modal-buttons { display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap; }
  .scroll-top-btn { position: fixed; bottom: 30px; right: 30px; width: 50px; height: 50px; background: #EA0E0F; color: #fff; border: none; border-radius: 50%; font-size: 20px; cursor: pointer; opacity: 0; visibility: hidden; transition: all 0.3s ease; z-index: 1000; box-shadow: 0 4px 15px rgba(234, 14, 15, 0.3); }
  .scroll-top-btn.show { opacity: 1; visibility: visible; }
  .scroll-top-btn:hover { background: #d00d0e; transform: scale(1.1); }
  .nav-menu.active { display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: #fff; box-shadow: 0 10px 30px rgba(0,0,0,0.1); padding: 1rem; animation: slideDown 0.3s ease; }
  @keyframes slideDown { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: translateY(0);} }
  @keyframes slideUp { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
  .animate-in { animation: fadeInUp 0.8s ease forwards; }
  @media (max-width: 768px) { .nav-menu.active { position: fixed; top: 80px; height: calc(100vh - 80px); overflow-y: auto; } }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);