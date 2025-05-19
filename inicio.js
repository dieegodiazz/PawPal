document.addEventListener('DOMContentLoaded', function () {
    const manageButton = document.querySelector('.manage-button');
    const profileGrid = document.querySelector('.profile-grid');
    const deleteModal = document.getElementById('delete-modal');
    const confirmDeleteButton = document.getElementById('confirm-delete');
    const cancelDeleteButton = document.getElementById('cancel-delete');
    const successModal = document.getElementById('success-modal');
    const successOkButton = document.getElementById('success-ok');
    const registerSuccessModal = document.getElementById('register-success-modal');
    const registerSuccessOkButton = document.getElementById('register-success-ok');
    const addProfile = document.querySelector('.add-profile');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    let profileToDelete = null;
    let isAdminMode = false;

    // Load profiles from localStorage or use default profiles
    let profiles = JSON.parse(localStorage.getItem('perfiles')) || [];

    // Render profiles
    function renderProfiles() {
        // Clear existing profiles except the add-profile button
        document.querySelectorAll('.profile:not(.add-profile)').forEach(profile => profile.remove());
        // Add profiles from localStorage
        profiles.forEach((perfil, index) => {
            const profileDiv = createProfileElement(perfil, index);
            profileGrid.insertBefore(profileDiv, addProfile);
        });
    }

    // Initial render
    renderProfiles();

    // Check for registration success
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('registered') === 'true') {
        registerSuccessModal.style.display = 'flex';
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Toggle admin mode
    manageButton.addEventListener('click', function () {
        isAdminMode = !isAdminMode;
        toggleDeleteButtons(isAdminMode);
        manageButton.textContent = isAdminMode ? 'Cancelar administración' : 'Administrar mascotas';
    });

    // Redirect when clicking the add profile button
    if (addProfile) {
        addProfile.addEventListener('click', function () {
            window.location.href = 'registro_mascota.html';
        });
    }

    // Show confirmation modal when clicking a delete button
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();
            profileToDelete = this.closest('.profile');
            deleteModal.style.display = 'flex';
        });
    });

    // Confirm deletion and show success modal
    confirmDeleteButton.addEventListener('click', function () {
        if (profileToDelete) {
            const index = Array.from(profileGrid.querySelectorAll('.profile:not(.add-profile)')).indexOf(profileToDelete);
            if (index !== -1) {
                profiles.splice(index, 1);
                localStorage.setItem('perfiles', JSON.stringify(profiles));
                profileToDelete.remove();
            }
            profileToDelete = null;
        }
        deleteModal.style.display = 'none';
        successModal.style.display = 'flex';
    });

    // Cancel deletion
    cancelDeleteButton.addEventListener('click', function () {
        profileToDelete = null;
        deleteModal.style.display = 'none';
        isAdminMode = false;
        toggleDeleteButtons(isAdminMode);
        manageButton.textContent = 'Administrar mascotas';
    });

    // Close success modal on OK
    if (successOkButton) {
        successOkButton.addEventListener('click', function () {
            successModal.style.display = 'none';
        });
    }

    // Close register success modal on OK
    if (registerSuccessOkButton) {
        registerSuccessOkButton.addEventListener('click', function () {
            registerSuccessModal.style.display = 'none';
        });
    }

    // Close modals if clicking outside content
    window.addEventListener('click', function (event) {
        if (event.target === deleteModal) {
            profileToDelete = null;
            deleteModal.style.display = 'none';
        }
        if (event.target === successModal) {
            successModal.style.display = 'none';
        }
        if (event.target === registerSuccessModal) {
            registerSuccessModal.style.display = 'none';
        }
    });

    // Function to toggle delete buttons
    function toggleDeleteButtons(show) {
        document.querySelectorAll('.delete-button').forEach(button => {
            button.style.display = show ? 'block' : 'none';
        });
    }

    // Function to create a profile element
    function createProfileElement(perfil, index) {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        const deleteButton = document.createElement('div');
        deleteButton.textContent = '-';
        deleteButton.classList.add('delete-button');
        deleteButton.style.display = isAdminMode ? 'block' : 'none';
        deleteButton.addEventListener('click', function (e) {
            e.stopPropagation();
            profileToDelete = profileDiv;
            deleteModal.style.display = 'flex';
        });
        profileDiv.appendChild(deleteButton);

        const img = document.createElement('img');
        img.src = perfil.imagen;
        img.alt = perfil.nombre;
        profileDiv.appendChild(img);

        const name = document.createElement('p');
        name.textContent = perfil.nombre;
        profileDiv.appendChild(name);

        // Add click event for redirection
        profileDiv.addEventListener('click', function (e) {
            if (!isAdminMode && !e.target.classList.contains('delete-button')) {
                window.location.href = 'menu.html';
            }
        });

        return profileDiv;
    }

    // Menu toggle functionality
    if (menuToggle && navMenu) {
        // Toggle menu visibility
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        // Close menu when clicking a link
        const menuLinks = navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.style.display = 'none';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (
                navMenu.style.display === 'flex' &&
                !navMenu.contains(e.target) &&
                e.target !== menuToggle
            ) {
                navMenu.style.display = 'none';
            }
        });

        // Specific actions for menu options
        menuLinks.forEach(link => {
            const text = link.textContent.trim().toLowerCase();
            if (text === 'inicio') {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    window.location.href = 'index.html';
                });
            }
            if (text === 'cerrar sesión') {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    window.location.href = 'login.html';
                });
            }
            if (text === 'escanear tag') {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
                            .then(function (stream) {
                                alert('Cámara activada para escanear el tag (implementa aquí tu lógica de escaneo).');
                                stream.getTracks().forEach(track => track.stop());
                            })
                            .catch(function (err) {
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