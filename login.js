document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');

    // Captura el evento de envío del formulario
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario
        window.location.href = 'inicio.html'; // Redirige a la página inicio.html
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".carousel-image");
    let currentIndex = 0;

    // Función para mostrar la imagen actual
    const showImage = (index) => {
        images.forEach((image, i) => {
            image.classList.remove("active"); // Oculta todas las imágenes
            if (i === index) {
                image.classList.add("active"); // Muestra solo la imagen actual
            }
        });
    };

    // Cambia automáticamente a la siguiente imagen cada 3 segundos
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length; // Calcula el índice de la siguiente imagen
        showImage(currentIndex);
    }, 4000); // Cambia cada 4 segundos
});

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((element, index) => {
        // Retrasa ligeramente la animación de cada elemento
        element.style.animationDelay = `${index * 0.2}s`;
    });
});

function redirectToRegister() {
    // Aplica la clase de animación de salida al body
    document.body.classList.add('slide-out-left');

    // Espera a que termine la animación antes de redirigir
    setTimeout(() => {
        window.location.href = 'register.html'; // Redirige a la página de registro
    }, 700); // El tiempo debe coincidir con la duración de la animación (0.7s)
}

function redirectToLogin() {
    // Aplica la clase de animación de salida al body
    document.body.classList.add('slide-out-left');

    // Espera a que termine la animación antes de redirigir
    setTimeout(() => {
        window.location.href = 'login.html'; // Redirige a la página de inicio de sesión
    }, 700); // El tiempo debe coincidir con la duración de la animación (0.7s)
}

function redirectToGoogle() {
    window.location.href = 'https://accounts.google.com/signin'; 
}

document.addEventListener('DOMContentLoaded', function() {
    // Menú sándwich desplegable
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
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
    }

    // Opción "Inicio", "Iniciar sesión" y "Sobre Nosotros" del menú sándwich
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
        // Sobre Nosotros
        const aboutLink = links.find(a => a.textContent.trim().toLowerCase() === 'sobre nosotros');
        if (aboutLink) {
            aboutLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'aboutus.html';
            });
        }

        // FAQ
        const faqLink = links.find(a => a.textContent.trim().toLowerCase() === 'faq');
        if (faqLink) {
            faqLink.addEventListener('click', function(e) {
                e.preventDefault();
                window.location.href = 'faq.html';
            });
        }
    }
    
    const googleIcon = document.querySelector('.google-icon');
    if (googleIcon) {
        googleIcon.addEventListener('click', function() {
            window.open('https://accounts.google.com/signin', '_blank');
        });
    }

    // Redirigir al pulsar el botón de iniciar sesión si los campos están rellenos
    const loginForm = document.querySelector('.right-section.login form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('correo').value.trim();
            const password = document.getElementById('password').value.trim();
            if (email !== '' && password !== '') {
                window.location.href = 'inicio.html';
            } else {
                // Opcional: mostrar un mensaje de error si algún campo está vacío
                alert('Por favor, rellena ambos campos.');
            }
        });
    }
});