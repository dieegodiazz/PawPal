document.addEventListener('DOMContentLoaded', function () {
    const profilesContainer = document.querySelector('.profiles');
    const adminButton = document.querySelector('.admin-btn');
    let isAdminMode = false; // Estado para saber si estamos en modo administración

    // Obtener los perfiles del localStorage
    const perfiles = JSON.parse(localStorage.getItem('perfiles')) || [];

    // Mostrar cada perfil dinámico
    perfiles.forEach((perfil, index) => {
        const profileDiv = createProfileElement(perfil, index);
        profilesContainer.insertBefore(profileDiv, profilesContainer.querySelector('.add-profile'));
    });

    // Alternar modo administración
    adminButton.addEventListener('click', function () {
        isAdminMode = !isAdminMode; // Cambiar el estado
        const deleteButtons = document.querySelectorAll('.delete-profile');
        deleteButtons.forEach(button => {
            button.style.display = isAdminMode ? 'inline-block' : 'none'; // Mostrar u ocultar botones
        });
    });

    // Crear un elemento de perfil
    function createProfileElement(perfil, index) {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');
        profileDiv.style.position = 'relative'; // Hacer que el contenedor sea relativo para posicionar el botón

        // Crear la imagen del perfil (si existe)
        if (perfil.imagen) {
            const img = document.createElement('img');
            img.src = perfil.imagen;
            img.alt = perfil.nombre;
            img.classList.add('profile-img');
            profileDiv.appendChild(img);
        }

        // Crear el nombre del perfil
        const name = document.createElement('p');
        name.textContent = perfil.nombre;
        profileDiv.appendChild(name);

        // Crear el botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.classList.add('delete-profile');
        deleteButton.style.display = 'none'; // Ocultar por defecto
        deleteButton.addEventListener('click', function () {
            // Mostrar confirmación antes de eliminar
            const confirmDelete = confirm(`¿Estás seguro de que quieres eliminar el perfil de "${perfil.nombre}"?`);
            if (confirmDelete) {
                // Eliminar el perfil del almacenamiento local
                perfiles.splice(index, 1);
                localStorage.setItem('perfiles', JSON.stringify(perfiles));

                // Eliminar el perfil del DOM
                profileDiv.remove();

                // Opcional: Recargar la página para reflejar los cambios
                window.location.reload();
            }
        });
        profileDiv.appendChild(deleteButton);

        return profileDiv;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const manageButton = document.querySelector('.manage-button');
    const deleteButtons = document.querySelectorAll('.delete-button');
    let isAdminMode = false;

    manageButton.addEventListener('click', function () {
        isAdminMode = !isAdminMode; // Alternar el modo de administración
        deleteButtons.forEach(button => {
            button.style.display = isAdminMode ? 'block' : 'none'; // Mostrar u ocultar botones
        });
        manageButton.textContent = isAdminMode ? 'Cancelar' : 'Administrar mascotas'; // Cambiar texto del botón
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const deleteButtons = document.querySelectorAll('.delete-button');
    const modal = document.getElementById('delete-modal');
    const confirmDeleteButton = document.getElementById('confirm-delete');
    const cancelDeleteButton = document.getElementById('cancel-delete');
    const manageButton = document.querySelector('.manage-button');
    let profileToDelete = null; // Guardará el perfil que se desea eliminar
    let isAdminMode = false; // Estado para saber si estamos en modo administración

    // Alternar modo administración
    manageButton.addEventListener('click', function () {
        isAdminMode = !isAdminMode; // Cambiar el estado
        toggleDeleteButtons(isAdminMode);
        manageButton.textContent = isAdminMode ? 'Cancelar administración' : 'Administrar mascotas';
    });

    // Mostrar el modal al hacer clic en un botón de eliminar
    deleteButtons.forEach(button => {
        button.addEventListener('click', function () {
            profileToDelete = this.closest('.profile'); // Guardar el perfil asociado
            modal.style.display = 'flex'; // Mostrar el modal
        });
    });

    // Confirmar eliminación
    confirmDeleteButton.addEventListener('click', function () {
        if (profileToDelete) {
            profileToDelete.remove(); // Eliminar el perfil del DOM
            profileToDelete = null; // Resetear la variable
        }
        modal.style.display = 'none'; // Ocultar el modal
    });

    // Cancelar eliminación
    cancelDeleteButton.addEventListener('click', function () {
        profileToDelete = null; // Resetear la variable
        modal.style.display = 'none'; // Ocultar el modal
        isAdminMode = false; // Desactivar el modo de administración
        toggleDeleteButtons(isAdminMode); // Ocultar los botones de eliminar
        manageButton.textContent = 'Administrar mascotas'; // Restablecer el texto del botón
    });

    // Cerrar el modal si se hace clic fuera del contenido
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            profileToDelete = null; // Resetear la variable
            modal.style.display = 'none'; // Ocultar el modal
        }
    });

    // Función para mostrar u ocultar los botones de eliminar
    function toggleDeleteButtons(show) {
        deleteButtons.forEach(button => {
            button.style.display = show ? 'block' : 'none';
        });
    }
});