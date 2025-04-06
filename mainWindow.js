document.addEventListener('DOMContentLoaded', function() {
    const btnLogin = document.getElementById('btn-login');

    btnLogin.addEventListener('click', function() {
        window.location.href = 'login.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const showMoreButton = document.querySelector('.show-more');
    const infoContainer = document.querySelector('#info-container');

    if (showMoreButton && infoContainer) {
        // Oculta el botón al hacer clic
        showMoreButton.addEventListener('click', (event) => {
            event.preventDefault(); // Evita el comportamiento predeterminado del enlace
            infoContainer.scrollIntoView({ behavior: 'smooth' }); // Desplazamiento suave
            showMoreButton.style.display = 'none'; // Oculta el botón
        });

        // Detecta si el contenedor info-container está visible
        window.addEventListener('scroll', () => {
            const infoContainerTop = infoContainer.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            // Si el contenedor está visible, oculta el botón
            if (infoContainerTop <= windowHeight / 2) {
                showMoreButton.style.display = 'none';
            } else if (window.scrollY === 0) {
                // Si el usuario vuelve al inicio, muestra el botón
                showMoreButton.style.display = 'inline-block';
            }
        });
    }
});