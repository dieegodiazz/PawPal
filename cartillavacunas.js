document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM para cartillavacunas.html
    const vaccinesList = document.getElementById('vaccines-list');
    const pendingVaccinesList = document.getElementById('pending-vaccines-list');
    const deleteVaccineModal = document.getElementById('delete-vaccine-modal');
    const deleteVaccineMessage = document.getElementById('delete-vaccine-message');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
    const deleteSuccessModal = document.getElementById('delete-success-modal');
    const successOkBtn = document.getElementById('success-ok-btn');
    const moveVaccineModal = document.getElementById('move-vaccine-modal');
    const moveVaccineMessage = document.getElementById('move-vaccine-message');
    const confirmMoveBtn = document.getElementById('confirm-move-btn');
    const cancelMoveBtn = document.getElementById('cancel-move-btn');
    const moveSuccessModal = document.getElementById('move-success-modal');
    const moveOkBtn = document.getElementById('move-ok-btn');
    const registerVaccineBtn = document.getElementById('register-vaccine-btn');
    
    if (registerVaccineBtn) {
        registerVaccineBtn.addEventListener('click', () => {
            window.location.href = 'registrar_vacuna.html';
        });
    }

    // Vacunas registradas por defecto (fechas en el pasado)
    let vaccines = JSON.parse(localStorage.getItem('vaccines')) || [
        {
            name: 'Rabia',
            date: '2024-10-01',
            vet: 'Dr. Martínez',
            notes: 'Primera dosis administrada'
        },
        {
            name: 'Parvovirus',
            date: '2024-11-15',
            vet: 'Dra. López',
            notes: 'Refuerzo anual'
        },
        {
            name: 'Moquillo',
            date: '2025-01-10',
            vet: 'Dr. Sánchez',
            notes: 'Dosis inicial'
        },
        {
            name: 'Hepatitis Canina',
            date: '2025-02-20',
            vet: 'Dra. Gómez',
            notes: 'Vacunación completa'
        }
    ];

    // Vacunas pendientes por defecto (fechas en el futuro)
    let pendingVaccines = JSON.parse(localStorage.getItem('pendingVaccines')) || [
        {
            name: 'Leptospirosis',
            date: '2025-06-15',
            vet: 'Dr. Pérez',
            notes: 'Programada para refuerzo'
        },
        {
            name: 'Bordetella',
            date: '2025-07-01',
            vet: 'Dra. Fernández',
            notes: 'Pendiente de cita'
        },
        {
            name: 'Tos de las Perreras',
            date: '2025-08-10',
            vet: 'Dr. Vega',
            notes: 'Programada'
        }
    ];

    // Función para mostrar vacunas (registradas o pendientes)
    function displayVaccines(list, container, type) {
        container.innerHTML = '';

        if (list.length === 0) {
            const noVaccines = document.createElement('div');
            noVaccines.className = 'vaccine-card-empty';
            noVaccines.innerHTML = '<span class="reminder-title">No hay vacunas pendientes registradas.</span>';
            container.appendChild(noVaccines);
            return;
        }

        list.forEach((vaccine, index) => {
            const vaccineDiv = document.createElement('div');
            vaccineDiv.className = `vaccine-card ${type === 'registered' ? 'vaccine-card-registered' : 'vaccine-card-pending'}`;

            vaccineDiv.innerHTML = `
                <div class="vaccine-info">
                    <div>
                        <span class="vaccine-name">${vaccine.name}</span>
                    </div>
                    <div>
                        <span class="vaccine-date">Fecha: ${vaccine.date}</span>
                    </div>
                    <div>
                        <span class="vaccine-vet">Vet: ${vaccine.vet}</span>
                    </div>
                </div>
                ${type === 'pending' ? `
                    <i class="fas fa-times delete-icon" data-index="${index}" data-name="${vaccine.name}"></i>
                    <i class="fas fa-check move-icon" data-index="${index}" data-name="${vaccine.name}"></i>
                ` : ''}
            `;
            container.appendChild(vaccineDiv);
        });

        // Añadir eventos para los íconos de "X" y "TIC" en vacunas pendientes
        if (type === 'pending') {
            const deleteIcons = container.querySelectorAll('.delete-icon');
            deleteIcons.forEach(icon => {
                icon.addEventListener('click', () => {
                    const index = icon.getAttribute('data-index');
                    const name = icon.getAttribute('data-name');
                    showDeleteModal(index, name);
                });
            });

            const moveIcons = container.querySelectorAll('.move-icon');
            moveIcons.forEach(icon => {
                icon.addEventListener('click', () => {
                    const index = icon.getAttribute('data-index');
                    const name = icon.getAttribute('data-name');
                    showMoveModal(index, name);
                });
            });
        }
    }

    // Función para mostrar el modal de confirmación de eliminación
    function showDeleteModal(index, name) {
        if (deleteVaccineMessage && deleteVaccineModal) {
            deleteVaccineMessage.textContent = `¿Está seguro de que desea eliminar la vacuna ${name}?`;
            deleteVaccineModal.style.display = 'flex';
        }

        if (confirmDeleteBtn && cancelDeleteBtn) {
            confirmDeleteBtn.onclick = () => {
                pendingVaccines.splice(index, 1);
                localStorage.setItem('pendingVaccines', JSON.stringify(pendingVaccines));
                hideDeleteModal();
                showSuccessModal();
            };

            cancelDeleteBtn.onclick = () => {
                hideDeleteModal();
            };
        }
    }

    // Función para ocultar el modal de confirmación de eliminación
    function hideDeleteModal() {
        if (deleteVaccineModal) {
            deleteVaccineModal.style.display = 'none';
        }
        if (confirmDeleteBtn) {
            confirmDeleteBtn.onclick = null;
        }
        if (cancelDeleteBtn) {
            cancelDeleteBtn.onclick = null;
        }
    }

    // Función para mostrar el modal de éxito de eliminación
    function showSuccessModal() {
        if (deleteSuccessModal) {
            deleteSuccessModal.style.display = 'flex';
        }
        if (successOkBtn) {
            successOkBtn.onclick = () => {
                hideSuccessModal();
                if (pendingVaccinesList) {
                    displayVaccines(pendingVaccines, pendingVaccinesList, 'pending');
                }
            };
        }
    }

    // Función para ocultar el modal de éxito de eliminación
    function hideSuccessModal() {
        if (deleteSuccessModal) {
            deleteSuccessModal.style.display = 'none';
        }
        if (successOkBtn) {
            successOkBtn.onclick = null;
        }
    }

    // Función para mostrar el modal de confirmación de movimiento
    function showMoveModal(index, name) {
        if (moveVaccineMessage && moveVaccineModal) {
            moveVaccineMessage.textContent = `¿Está seguro de que desea mover la vacuna ${name} a vacunas registradas?`;
            moveVaccineModal.style.display = 'flex';
        }

        if (confirmMoveBtn && cancelMoveBtn) {
            confirmMoveBtn.onclick = () => {
                const vaccineToMove = pendingVaccines.splice(index, 1)[0];
                vaccines.push(vaccineToMove);
                localStorage.setItem('pendingVaccines', JSON.stringify(pendingVaccines));
                localStorage.setItem('vaccines', JSON.stringify(vaccines));
                hideMoveModal();
                showMoveSuccessModal();
            };

            cancelMoveBtn.onclick = () => {
                hideMoveModal();
            };
        }
    }

    // Función para ocultar el modal de confirmación de movimiento
    function hideMoveModal() {
        if (moveVaccineModal) {
            moveVaccineModal.style.display = 'none';
        }
        if (confirmMoveBtn) {
            confirmMoveBtn.onclick = null;
        }
        if (cancelMoveBtn) {
            cancelMoveBtn.onclick = null;
        }
    }

    // Función para mostrar el modal de éxito de movimiento
    function showMoveSuccessModal() {
        if (moveSuccessModal) {
            moveSuccessModal.style.display = 'flex';
        }
        if (moveOkBtn) {
            moveOkBtn.onclick = () => {
                hideMoveSuccessModal();
                if (vaccinesList && pendingVaccinesList) {
                    displayVaccines(vaccines, vaccinesList, 'registered');
                    displayVaccines(pendingVaccines, pendingVaccinesList, 'pending');
                }
            };
        }
    }

    // Función para ocultar el modal de éxito de movimiento
    function hideMoveSuccessModal() {
        if (moveSuccessModal) {
            moveSuccessModal.style.display = 'none';
        }
        if (moveOkBtn) {
            moveOkBtn.onclick = null;
        }
    }

    // Inicializar las listas de vacunas
    if (vaccinesList && pendingVaccinesList) {
        displayVaccines(vaccines, vaccinesList, 'registered');
        displayVaccines(pendingVaccines, pendingVaccinesList, 'pending');
    }

    // Guardar las listas en localStorage (para persistencia inicial)
    localStorage.setItem('vaccines', JSON.stringify(vaccines));
    localStorage.setItem('pendingVaccines', JSON.stringify(pendingVaccines));

    // Elementos del DOM para registrar_vacuna.html
    const petForm = document.getElementById('pet-form');
    const newReminderBtn = document.getElementById('new-reminder-btn');
    const modal = document.getElementById('delete-modal');
    const confirmBtn = document.getElementById('confirm-delete');

    if (newReminderBtn && petForm && modal && confirmBtn) {
        newReminderBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const inputs = petForm.querySelectorAll('input[required], select[required]');
            inputs.forEach(input => input.classList.remove('invalid'));

            if (!petForm.checkValidity()) {
                inputs.forEach(input => {
                    if (!input.validity.valid) {
                        input.classList.add('invalid');
                    }
                });
                petForm.reportValidity();
                return;
            }

            const name = petForm.querySelector('#reminder-desc').value.trim();
            const date = petForm.querySelector('#reminder-date').value;
            const vet = petForm.querySelector('#reminder-doct').value.trim();
            const status = petForm.querySelector('#vaccine-status').value;

            const newVaccine = {
                name: name,
                date: date,
                vet: vet,
                notes: status === 'aplicada' ? 'Vacunación completa' : 'Programada'
            };

            if (status === 'aplicada') {
                vaccines.push(newVaccine);
                localStorage.setItem('vaccines', JSON.stringify(vaccines));
            } else if (status === 'pendiente') {
                pendingVaccines.push(newVaccine);
                localStorage.setItem('pendingVaccines', JSON.stringify(pendingVaccines));
            }

            modal.style.display = 'flex';

            confirmBtn.onclick = () => {
                modal.style.display = 'none';
                confirmBtn.onclick = null;
                petForm.reset();
                window.location.href = 'cartillavacunas.html';
            };
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });

        // Opciones del menú
        const inicio = navMenu.querySelector('a[href="#inicio"]');
        const cambiarMascota = navMenu.querySelector('a[href="#cambiarmascota"]');
        const cerrarSesion = navMenu.querySelector('a[href="#cerrarsesion"]');

        if (inicio) {
            inicio.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'index.html';
            });
        }
        if (cambiarMascota) {
            cambiarMascota.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'inicio.html';
            });
        }
        if (cerrarSesion) {
            cerrarSesion.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'login.html';
            });
        }
    }
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