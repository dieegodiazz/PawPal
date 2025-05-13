document.addEventListener('DOMContentLoaded', function () {
    // Configurar el mapa con Leaflet
    var map = L.map('map').setView([40.960779, -5.669634], 15); // Coordenadas de Nueva York como ejemplo (ajusta según necesites)

    // Añadir capa de mapa base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    // Añadir marcador en un sitio exacto
    L.marker([40.960779, -5.669634]) // Coordenadas del marcador (ajusta según necesites)
        .addTo(map)
        .bindPopup('Mascota geolocalizada aquí.')
        .openPopup();

    // Opcional: Añadir un círculo rojo como en la captura (simulando un área)
    L.circle([40.960779, -5.669634], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.2,
        radius: 100 // Radio en metros
    }).addTo(map);

    // Lógica para el modal de "Mascota Perdida" y "Mascota Encontrada"
    const lostPetButton = document.querySelector('.lost-pet-btn');
    const modal = document.getElementById('delete-modal'); // Ventana modal
    const confirmButton = document.getElementById('confirm-delete'); // Botón Aceptar en el modal
    const cancelButton = document.getElementById('cancel-delete'); // Botón Cancelar en el modal

    // Evento para abrir el modal al pulsar "Mascota Perdida"
    lostPetButton.addEventListener('click', function () {
        modal.querySelector('.modal-content p').textContent = '¿Está seguro de que su mascota está perdida?';
        modal.style.display = 'flex'; // Mostrar el modal
    });

    // Evento para el botón "Aceptar" en el modal para "Mascota Perdida"
    confirmButton.addEventListener('click', function () {
        if (lostPetButton.classList.contains('lost-pet-btn')) {
            // Cambiar el texto y la clase del botón
            lostPetButton.textContent = 'Mascota Encontrada';
            lostPetButton.classList.remove('lost-pet-btn');
            lostPetButton.classList.add('found-pet-btn');
        } else if (lostPetButton.classList.contains('found-pet-btn')) {
            // Cambiar el texto y la clase del botón para "Mascota Perdida"
            lostPetButton.textContent = 'Mascota Perdida';
            lostPetButton.classList.remove('found-pet-btn');
            lostPetButton.classList.add('lost-pet-btn');
        }
        modal.style.display = 'none'; // Cerrar el modal
    });

    // Evento para el botón "Cancelar" en el modal
    cancelButton.addEventListener('click', function () {
        modal.style.display = 'none'; // Cerrar el modal sin realizar cambios
    });

    // Cerrar el modal si se hace clic fuera del contenido
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none'; // Cerrar el modal sin realizar cambios
        }
    });

    // Evento para abrir el modal al pulsar "Mascota Encontrada"
    lostPetButton.addEventListener('click', function () {
        if (lostPetButton.classList.contains('found-pet-btn')) {
            modal.querySelector('.modal-content p').textContent = '¿Ha encontrado su mascota?';
            modal.style.display = 'flex'; // Mostrar el modal
        }
    });

    // Lógica para el tooltip de ayuda
    const helpIcon = document.querySelector('.help-icon');
    const helpTooltip = document.getElementById('help-tooltip');

    helpIcon.addEventListener('click', function () {
        helpTooltip.style.display = helpTooltip.style.display === 'block' ? 'none' : 'block';
    });

    // Cerrar el tooltip si se hace clic fuera de él
    document.addEventListener('click', function (event) {
        if (!helpIcon.contains(event.target) && !helpTooltip.contains(event.target)) {
            helpTooltip.style.display = 'none';
        }
    });
});