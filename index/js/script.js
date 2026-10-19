/* ============================================================
   MIRIAN RODRIGUES — Interações cinematográficas
============================================================ */

(() => {
  'use strict';

  /* ============== CONFIG: número do WhatsApp ============== */
  // >>>>>> Número da Mirian: (85) 8459-7587 <<<<<<
  // Formato: código do país + DDD + número, apenas dígitos.
  const WHATSAPP_NUMBER = '559891686901';

  const WHATSAPP_BASE_MESSAGE =
    'Olá, Mirian! Conheci seu trabalho pelo site e gostaria de saber mais sobre o acompanhamento nutricional.';

  /* ============== ABERTURA CINEMATOGRÁFICA ============== */
  const intro = document.getElementById('intro');
  if (intro) {
    const hideIntro = () => {
      intro.classList.add('hide');
      document.body.style.overflow = '';
    };
    document.body.style.overflow = 'hidden';
    // Tempo suficiente para a animação completa + leitura da tagline
    setTimeout(hideIntro, 4400);
    // Fallback para caso o usuário clique antes
    intro.addEventListener('click', hideIntro);
  }

  /* ============== HEADER SCROLL ============== */
  const header = document.getElementById('header');
  const onScroll = () => {
    if (window.scrollY > 30) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ============== MENU HAMBURGUER ============== */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  /* ============== ACTIVE LINK NO SCROLL ============== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a');
  const setActiveLink = () => {
    const offset = window.innerHeight * 0.35;
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.getBoundingClientRect().top;
      if (top - offset < 0) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  };
  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* ============== SCROLL REVEAL ============== */
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || '0', 10);
          setTimeout(() => entry.target.classList.add('revealed'), delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('revealed'));
  }

  /* ============== PARALLAX SUAVE NAS IMAGENS ============== */
  const parallaxTargets = document.querySelectorAll('.hero-image-frame, .sobre-frame, .ebook-cover');
  if (parallaxTargets.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      parallaxTargets.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const speed = 0.06;
          const offset = (rect.top - window.innerHeight / 2) * speed;
          el.style.transform = `translateY(${offset.toFixed(2)}px)`;
        }
      });
    }, { passive: true });
  }

  /* ============== MÁSCARA DE TELEFONE ============== */
  const telInput = document.getElementById('telefone');
  if (telInput) {
    telInput.addEventListener('input', (e) => {
      let v = e.target.value.replace(/\D/g, '').slice(0, 11);
      if (v.length > 10) v = v.replace(/^(\d{2})(\d{5})(\d{0,4}).*/, '($1) $2-$3');
      else if (v.length > 6) v = v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
      else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
      else if (v.length > 0) v = v.replace(/^(\d{0,2})/, '($1');
      e.target.value = v;
    });
  }

  /* ============== FORMULÁRIO -> WHATSAPP ============== */
  const form = document.getElementById('formCadastro');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = (form.querySelector('#nome')?.value || '').trim();
      const telefone = (form.querySelector('#telefone')?.value || '').trim();
      const atendimento = (form.querySelector('input[name="atendimento"]:checked')?.value || '').trim();
      const objetivo = (form.querySelector('input[name="objetivo"]:checked')?.value || '').trim();

      if (!nome || !telefone || !atendimento || !objetivo) {
        alert('Por favor, preencha seu nome, WhatsApp, tipo de atendimento e objetivo.');
        return;
      }

      const texto =
        `Olá, Mirian! Conheci seu trabalho pelo site e gostaria de saber mais sobre o acompanhamento nutricional.\n\n` +
        `*Nome:* ${nome}\n` +
        `*WhatsApp:* ${telefone}\n` +
        `*Atendimento:* ${atendimento}\n` +
        `*Objetivo:* ${objetivo}`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
      window.open(url, '_blank');
    });
  }

  /* ============== BOTÃO FLUTUANTE WHATSAPP ============== */
  const fab = document.getElementById('whatsappFab');
  if (fab) {
    fab.addEventListener('click', (e) => {
      e.preventDefault();
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_BASE_MESSAGE)}`;
      window.open(url, '_blank');
    });
  }

  /* ============== ANO NO RODAPÉ ============== */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
