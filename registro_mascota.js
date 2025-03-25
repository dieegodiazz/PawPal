document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.login-form');
    const fotoInput = document.getElementById('foto');
    const preview = document.getElementById('preview');
    const removePhotoButton = document.getElementById('remove-photo');

    let imageData = null; // Variable para almacenar la imagen en base64

    // Mostrar vista previa de la imagen seleccionada
    fotoInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageData = e.target.result; // Guardar la imagen en base64
                preview.src = imageData;
                preview.style.display = 'block';
                removePhotoButton.style.display = 'inline-block'; // Mostrar el botón de eliminar
            };
            reader.readAsDataURL(file);
        } else {
            resetPreview();
        }
    });

    // Eliminar la selección de la imagen
    removePhotoButton.addEventListener('click', function () {
        fotoInput.value = ''; // Reinicia el campo de archivo
        resetPreview();
    });

    // Función para reiniciar la vista previa
    function resetPreview() {
        imageData = null; // Reinicia la imagen almacenada
        preview.src = '#';
        preview.style.display = 'none';
        removePhotoButton.style.display = 'none';
    }

    // Manejar el envío del formulario
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita el envío del formulario

        const nombre = document.getElementById('nombre').value;

        // Obtener los perfiles existentes del localStorage
        const perfiles = JSON.parse(localStorage.getItem('perfiles')) || [];

        // Agregar el nuevo perfil
        perfiles.push({
            nombre: nombre,
            imagen: imageData, // Puede ser null si no se seleccionó una imagen
        });

        // Guardar los perfiles actualizados en el localStorage
        localStorage.setItem('perfiles', JSON.stringify(perfiles));

        // Redirigir a inicio.html
        window.location.href = 'inicio.html';
    });
});