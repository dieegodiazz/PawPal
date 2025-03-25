document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.login-form');

    // Captura el evento de envío del formulario
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario
        window.location.href = 'inicio.html'; // Redirige a la página inicio.html
    });
});