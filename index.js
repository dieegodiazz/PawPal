document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  // Alternar visibilidad del menú
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que el click se propague al document
    navMenu.style.display = navMenu.style.display === "flex" ? "none" : "flex";
  });

  // Cerrar el menú al hacer clic en un enlace
  const menuLinks = navMenu.querySelectorAll("a");
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.style.display = "none";
    });
  });

  // Cerrar el menú al hacer clic fuera de él
  document.addEventListener("click", (e) => {
    if (
      navMenu.style.display === "flex" &&
      !navMenu.contains(e.target) &&
      e.target !== menuToggle
    ) {
      navMenu.style.display = "none";
    }
  });

  // Slider de imágenes
  const fotos = [
    'imagenes/foto1.jpg',
    'imagenes/foto2.jpg',
    'imagenes/foto3.jpg',
    'imagenes/foto4.jpg',
    'imagenes/foto5.jpg',
    'imagenes/foto6.jpg',
    'imagenes/foto7.jpg',
  ];

  let fotoActual = 0;
  const img = document.getElementById('slider-foto');
  if (img) {
    setInterval(() => {
      fotoActual = (fotoActual + 1) % fotos.length;
      img.src = fotos[fotoActual];
    }, 5000);
  }
});