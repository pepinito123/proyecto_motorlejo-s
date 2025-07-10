document.addEventListener("DOMContentLoaded", () => {
  iniciarScrollReveal();
  activarNavegacion();
  enviarFormulario();
});

/* ================================
   Scroll Reveal personalizado
=================================== */
function iniciarScrollReveal() {
  const elementos = document.querySelectorAll("section, article, .caracteristica");

  const opciones = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entradas, observador) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("revelado");
        observador.unobserve(entrada.target); // Solo una vez
      }
    });
  }, opciones);

  elementos.forEach((el) => {
    el.classList.add("oculto");
    observer.observe(el);
  });
}

/* ================================
   Navegación activa según scroll
=================================== */
function activarNavegacion() {
  const secciones = document.querySelectorAll("section[id]");
  const enlacesNav = document.querySelectorAll("nav a");

  function actualizarNav() {
    const scrollY = window.pageYOffset;

    secciones.forEach((seccion) => {
      const top = seccion.offsetTop - 80;
      const height = seccion.offsetHeight;
      const id = seccion.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        enlacesNav.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", actualizarNav);
  actualizarNav(); // Al cargar
}

/* ================================
   Manejo del formulario
=================================== */
function enviarFormulario() {
  const form = document.querySelector("form");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    mostrarMensaje("✅ Tu mensaje ha sido enviado con éxito.");

    form.reset();
  });
}

/* ================================
   Mensaje flotante al usuario
=================================== */
function mostrarMensaje(mensaje) {
  const alerta = document.createElement("div");
  alerta.textContent = mensaje;
  alerta.className = "mensaje-flotante";

  document.body.appendChild(alerta);

  setTimeout(() => {
    alerta.classList.add("visible");
  }, 100);

  setTimeout(() => {
    alerta.classList.remove("visible");
    setTimeout(() => alerta.remove(), 400);
  }, 4000);
}
