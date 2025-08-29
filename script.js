// Utilidades
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Año en footer
$('#year').textContent = new Date().getFullYear();

// Menú hamburguesa responsive
const menuToggle = $('#menuToggle');
const siteNav = $('#siteNav');
menuToggle.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Cerrar nav al hacer click en un link en móviles
$$('#siteNav a').forEach(a => a.addEventListener('click', () => {
  siteNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// Habilidades: animar barras en scroll
const skillObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const bars = $$('.progress .bar', entry.target);
      bars.forEach(bar => {
        const target = parseInt(bar.dataset.percent, 10) || 0;
        bar.style.width = target + '%';
        // Contador numérico
        const val = bar.closest('.skill').querySelector('.skill-val');
        animateCounter(val, target, 900);
      });
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

$('#skills') && skillObserver.observe($('#skills'));

function animateCounter(el, to, duration){
  let start = 0;
  const t0 = performance.now();
  function tick(now){
    const p = Math.min((now - t0) / duration, 1);
    const val = Math.round(start + (to - start) * p);
    el.textContent = val + '%';
    if(p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Projects: abrir modal con más info
const modal = $('#projectModal');
$$('.project-card').forEach(card => {
  const open = () => {
    $('#modalTitle').textContent = card.dataset.title;
    $('#modalDesc').textContent = card.dataset.desc;
    $('#modalTech').textContent = 'Tecnologías: ' + card.dataset.tech;
    modal.showModal();
  };
  card.addEventListener('click', e => {
    if(e.target.matches('button')) open();
  });
  card.addEventListener('keyup', e => {
    if(e.key === 'Enter') open();
  });
});

// Contacto: validación en tiempo real + envío por mailto
const form = $('#contactForm');
const inputs = $$('input[required], textarea[required]', form);
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function validateField(input){
  let valid = true;
  let msg = '';
  if(input.name === 'email'){
    valid = emailRegex.test(input.value.trim());
    if(!valid) msg = 'Ingresa un correo válido.';
  }else{
    const min = input.getAttribute('minlength') ? parseInt(input.getAttribute('minlength'), 10) : 1;
    valid = input.value.trim().length >= min;
    if(!valid) msg = `Debe tener al menos ${min} caracteres.`;
  }
  input.setAttribute('aria-invalid', valid ? 'false' : 'true');
  input.closest('label').querySelector('.error').textContent = msg;
  return valid;
}

// Tiempo real
inputs.forEach(input => {
  input.addEventListener('input', () => {
    validateField(input);
    toggleSubmit();
  });
  input.addEventListener('blur', () => validateField(input));
});

function toggleSubmit(){
  const allValid = inputs.every(validateField);
  form.querySelector('button[type="submit"]').disabled = !allValid;
}

form.addEventListener('reset', () => {
  setTimeout(() => {
    inputs.forEach(i => {
      i.setAttribute('aria-invalid', 'false');
      i.closest('label').querySelector('.error').textContent = '';
    });
    toggleSubmit();
  }, 0);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Construir mailto si es válido
  if(inputs.every(validateField)){
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const subject = form.elements['subject'].value.trim();
    const message = form.elements['message'].value.trim();
    const body = encodeURIComponent(`Hola, soy ${name} (${email}).\n\n${message}`);
    const mailto = `mailto:juanfe.rios@example.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailto;
  }
});

// Accesibilidad: cerrar modal con Esc si está abierto (dialog lo maneja, pero por si acaso)
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && typeof modal.close === 'function'){
    try { modal.close(); } catch(_) {}
  }
});