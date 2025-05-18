document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  // Alternar visibilidad del menú
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
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

  // Botón "¡Regístrate Ahora!"
  const registerBtn = document.querySelector('.btn-primary');
  if (registerBtn) {
    registerBtn.addEventListener('click', function() {
      window.location.href = 'register.html';
    });
  }

  // Opción "Inicio" e "Iniciar sesión" del menú sándwich
  if (navMenu) {
    const links = Array.from(navMenu.getElementsByTagName('a'));
    // Inicio
    const inicioLink = links.find(a => a.textContent.trim().toLowerCase() === 'inicio');
    if (inicioLink) {
      inicioLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'index.html';
      });
    }
    // Iniciar sesión
    const loginLink = links.find(a => a.textContent.trim().toLowerCase() === 'iniciar sesión');
    if (loginLink) {
      loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.href = 'login.html';
      });
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
    // Botón "¡Regístrate Ahora!"
    const registerBtn = document.querySelector('.btn-primary');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            window.location.href = 'register.html';
        });
    }

    // Opción "Inicio" del menú sándwich
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        const inicioLink = Array.from(navMenu.getElementsByTagName('a'))
            .find(a => a.textContent.trim().toLowerCase() === 'inicio');
        if (inicioLink) {
            inicioLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }
    }

    // Ocultar/mostrar el texto "Ver más info" al hacer scroll
    const verMasBtn = document.querySelector('.btn-secondary');
    let lastScrollTop = 0;

    if (verMasBtn) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop && scrollTop > 50) {
                // Scroll hacia abajo: ocultar
                verMasBtn.style.opacity = '0';
                verMasBtn.style.pointerEvents = 'none';
            } else if (scrollTop < lastScrollTop || scrollTop <= 10) {
                // Scroll hacia arriba: mostrar
                verMasBtn.style.opacity = '1';
                verMasBtn.style.pointerEvents = 'auto';
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });
    }

    // Redirigir al pulsar el botón de registrarse si los campos están rellenos
    const registerForm = document.querySelector('form'); // O usa un selector más específico si tienes varios forms
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Cambia los IDs según los campos de tu formulario
            const nombre = document.getElementById('nombre')?.value.trim();
            const correo = document.getElementById('correo')?.value.trim();
            const password = document.getElementById('password')?.value.trim();
            // Añade más campos si es necesario

            if (nombre && correo && password) {
                window.location.href = 'inicio.html';
            } else {
                alert('Por favor, rellena todos los campos.');
            }
        });
    }
});