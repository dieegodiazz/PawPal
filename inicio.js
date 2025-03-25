document.addEventListener('DOMContentLoaded', function () {
    const profilesContainer = document.querySelector('.profiles');
    const adminButton = document.querySelector('.admin-button');
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