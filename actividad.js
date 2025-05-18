document.addEventListener('DOMContentLoaded', () => {
    // Selecciona el botón del tooltip y el recuadro de ayuda
    const helpIcon = document.querySelector('.help-icon');
    const helpTooltip = document.querySelector('.help-tooltip');

    // Evento para mostrar el recuadro de ayuda al hacer clic en el botón del tooltip
    helpIcon.addEventListener('click', function (event) {
        event.stopPropagation();
        helpTooltip.style.display = helpTooltip.style.display === 'block' ? 'none' : 'block';
    });

    // Evento para cerrar el recuadro si se hace clic fuera de él
    window.addEventListener('click', function (event) {
        if (!helpTooltip.contains(event.target) && event.target !== helpIcon) {
            helpTooltip.style.display = 'none';
        }
    });

    // Cerrar el tooltip al hacer scroll hacia abajo
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop && helpTooltip.style.display === 'block') {
            helpTooltip.style.display = 'none';
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Para manejar scroll hacia arriba
    });

    // Gráficas de barras
    const ctx1 = document.getElementById('chart1').getContext('2d');
    new Chart(ctx1, {
        type: 'bar',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Movimiento activo (hrs)',
                data: [2.5, 3.4, 2.8, 3.0, 2.9, 3.2, 2.7],
                backgroundColor: '#ff6200',
                borderColor: '#ff6200',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 4
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    const ctx2 = document.getElementById('chart2').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Energía en actividad (kcal)',
                data: [120, 159, 130, 145, 140, 150, 135],
                backgroundColor: '#ff6200',
                borderColor: '#ff6200',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 200
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    const ctx3 = document.getElementById('chart3').getContext('2d');
    new Chart(ctx3, {
        type: 'bar',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Energía en reposo (kcal)',
                data: [380, 405, 390, 400, 395, 410, 385],
                backgroundColor: '#ff6200',
                borderColor: '#ff6200',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 500
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Gráficas de progreso
    const ctx7 = document.getElementById('progressChart1').getContext('2d');
    new Chart(ctx7, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [85, 15],
                backgroundColor: ['#00cc00', '#dcdcdc'],
                borderWidth: 0
            }]
        },
        options: {
            circumference: 180,
            rotation: 270,
            cutout: '70%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });

    const ctx8 = document.getElementById('progressChart2').getContext('2d');
    new Chart(ctx8, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [80, 20],
                backgroundColor: ['#00cc00', '#dcdcdc'],
                borderWidth: 0
            }]
        },
        options: {
            circumference: 180,
            rotation: 270,
            cutout: '70%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });

    const ctx9 = document.getElementById('progressChart3').getContext('2d');
    new Chart(ctx9, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [101, -1],
                backgroundColor: ['#00cc00', '#dcdcdc'],
                borderWidth: 0
            }]
        },
        options: {
            circumference: 180,
            rotation: 270,
            cutout: '70%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false }
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // Alterna la visibilidad del menú
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        // Opción Inicio
        const inicio = navMenu.querySelector('a[href="#inicio"]');
        if (inicio) {
            inicio.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }

        // Opción Cambiar de Mascota
        const cambiarMascota = navMenu.querySelector('a[href="#cambiarmascota"]');
        if (cambiarMascota) {
            cambiarMascota.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'inicio.html';
            });
        }

        // Opción Cartilla Vacunas
        const cartillaVacunas = navMenu.querySelector('a[href="#cartillavacunas"]');
        if (cartillaVacunas) {
            cartillaVacunas.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'cartillavacunas.html';
            });
        }

        // Opción Cerrar Sesión
        const cerrarSesion = navMenu.querySelector('a[href="#cerrarsesion"]');
        if (cerrarSesion) {
            cerrarSesion.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'login.html';
            });
        }
    }
});