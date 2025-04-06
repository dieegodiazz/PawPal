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

function redirectToFacebook() {
    window.location.href = 'https://www.facebook.com/'; 
}

function redirectToInstagram() {
    window.location.href = 'https://www.instagram.com/'; 
}   

function redirectToTwitter() {
    window.location.href = 'https://twitter.com/'; 
}

function redirectToGoogle() {
    window.location.href = 'https://accounts.google.com/signin'; 
}