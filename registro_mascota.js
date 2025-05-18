document.addEventListener('DOMContentLoaded', function () {
    const petForm = document.getElementById('pet-form');
    const petImageInput = document.getElementById('pet-image');
    const imagePreview = document.getElementById('image-preview');
    const fileNameLabel = document.getElementById('file-name');
    const removeFileBtn = document.getElementById('remove-file-btn');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // Handle image preview
    petImageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
                fileNameLabel.textContent = file.name;
                removeFileBtn.style.display = 'inline-block';
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
            imagePreview.src = '#';
            fileNameLabel.textContent = 'Ningún archivo seleccionado';
            removeFileBtn.style.display = 'none';
        }
    });

    // Handle form submission
    petForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Collect form data
        const petName = document.getElementById('pet-name').value.trim();
        const petType = document.getElementById('pet-type').value.trim();
        const petBreed = document.getElementById('pet-breed').value.trim() || '';
        const petAge = document.getElementById('pet-age').value || '';
        const petImage = imagePreview.src !== '#' && imagePreview.style.display !== 'none'
            ? imagePreview.src
            : 'imagenes/default-pet.jpg';

        // Create pet profile object
        const petProfile = {
            nombre: petName,
            tipo: petType,
            raza: petBreed,
            edad: petAge,
            imagen: petImage
        };

        // Store in localStorage
        let profiles = JSON.parse(localStorage.getItem('perfiles')) || [];
        profiles.push(petProfile);
        localStorage.setItem('perfiles', JSON.stringify(profiles));

        // Redirect to inicio.html with a query parameter
        window.location.href = 'inicio.html?registered=true';
    });

    // Remove file selection
    removeFileBtn.addEventListener('click', function () {
        petImageInput.value = '';
        fileNameLabel.textContent = 'Ningún archivo seleccionado';
        removeFileBtn.style.display = 'none';
        imagePreview.style.display = 'none';
        imagePreview.src = '#';
    });

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
                    window.location.href = 'inicio.html';
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