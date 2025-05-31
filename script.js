document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.menu-flotante nav ul li a');
  const secciones = document.querySelectorAll('section');

  // Función para activar el link según el id de la sección visible
  function activarLinkPorScroll() {
    let scrollPos = window.scrollY + 100; // Ajusta el offset para el header fijo
    let index = secciones.length;

    while (index-- && scrollPos < secciones[index].offsetTop) {}
    
    links.forEach(link => link.classList.remove('activo'));
    if (index >= 0) {
      const id = secciones[index].id;
      const linkActivo = document.querySelector('.menu-flotante nav ul li a[href="#${id}"]');
      if (linkActivo) {
        linkActivo.classList.add('activo');
      }
    }
  }

  // Evento scroll para actualizar el menú
  window.addEventListener('scroll', activarLinkPorScroll);

  // Evento click para desplazamiento suave y activar el link
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const destino = document.querySelector(href);
        if (destino) {
          destino.scrollIntoView({ behavior: 'smooth' });
          // Actualizar clases manualmente para que sea instantáneo al clic
          links.forEach(l => l.classList.remove('activo'));
          link.classList.add('activo');
        }
      }
    });
  });

  // Activar link al cargar la página según scroll actual
  activarLinkPorScroll();
});