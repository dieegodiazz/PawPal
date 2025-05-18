document.addEventListener('DOMContentLoaded', function() {
    // Botón Geolocalización
    const geoBtn = document.getElementById('geolocalizacion-btn');
    if (geoBtn) {
        geoBtn.addEventListener('click', function() {
            window.location.href = 'geolocalizacion.html';
        });
    }

    // Botón Salud
    const saludBtn = document.querySelector('.option-button.salud');
    if (saludBtn) {
        saludBtn.addEventListener('click', function() {
            window.location.href = 'salud.html';
        });
    }

    // Botón Actividad
    const actividadBtn = document.querySelector('.option-button.actividad');
    if (actividadBtn) {
        actividadBtn.addEventListener('click', function() {
            window.location.href = 'actividad.html';
        });
    }

    // Botón Recordatorios
    const recordatoriosBtn = document.querySelector('.option-button.recordatorios');
    if (recordatoriosBtn) {
        recordatoriosBtn.addEventListener('click', function() {
            window.location.href = 'recordatorios.html';
        });
    }

    // --- Menú sándwich igual que en inicio.html ---
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
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

        // Acciones específicas para las opciones del menú
        menuLinks.forEach(link => {
            const text = link.textContent.trim().toLowerCase();
            if (text === 'inicio') {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = 'index.html';
                });
            }
            if (text === 'cerrar sesión') {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.location.href = 'login.html';
                });
            }
            if (text === 'escanear tag') {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                        navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
                            .then(function(stream) {
                                alert('Cámara activada para escanear el tag (implementa aquí tu lógica de escaneo).');
                                stream.getTracks().forEach(track => track.stop());
                            })
                            .catch(function(err) {
                                alert('No se pudo acceder a la cámara: ' + err);
                            });
                    } else {
                        alert('La cámara no está soportada en este dispositivo/navegador.');
                    }
                });
            }
        });
    }
});