# Portafolio Personal Interactivo — JuanFe Rios

## Cómo usar
1. Abre `index.html` en tu navegador.
2. Edita texto e info en `index.html` (secciones Acerca, Habilidades, Proyectos y Contacto).
3. Estilos en `styles.css` (colores en `:root`).
4. Lógica y validaciones en `script.js`.

## Cumplimiento de requisitos
- HTML semántico: `header`, `nav`, `main`, `section`, `footer`, `h1-h6`, `p`, `ul/ol`, `img`, `a`.
- Formulario funcional con validación en tiempo real y envío vía `mailto`.
- CSS con Grid y Flex, variables CSS, diseño responsive.
- JS: menú hamburguesa, validación del formulario, manipulación del DOM (barras de progreso, modal de proyectos), event listeners.


/* =========
   Footer
   ========= */
.site-footer{ border-top: 1px solid #1f2937; margin-top: 2rem; }
.footer-inner{ display: flex; align-items: center; justify-content: space-between; padding: 1.2rem 0; }
.socials a{ color: var(--muted); text-decoration: none; margin-left: .75rem; }
.socials a:hover{ color: var(--text); }

/* =========
   Contact
   ========= */
form{ background: linear-gradient(180deg, var(--surface), var(--card)); border: 1px solid #1f2937; border-radius: var(--radius); padding: 1rem; box-shadow: var(--shadow); }
.form-grid{ display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
label{ display: grid; gap: .35rem; }
label.full{ grid-column: 1 / -1; }
input, textarea{ width: 100%; background: #0b1a32; border: 1px solid #243246; color: var(--text); border-radius: .8rem; padding: .75rem .9rem; font: inherit; outline: none; }
input:focus, textarea:focus{ border-color: var(--accent); box-shadow: 0 0 0 4px var(--ring); }
.error{ color: #fca5a5; min-height: 1.1em; }
input[aria-invalid="true"], textarea[aria-invalid="true"]{ border-color: #f87171; }

