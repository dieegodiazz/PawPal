document.addEventListener('DOMContentLoaded', function () {
    const petImageInput = document.getElementById('pet-image');
    const imagePreview = document.getElementById('image-preview');

    petImageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
            imagePreview.src = '#';
        }
    });
});

function handleFileSelection(input) {
    // No actualizamos el <span id="file-name">, se mantiene vacío

    // Mostrar el botón de eliminar si hay un archivo seleccionado
    const removeFileBtn = document.getElementById("remove-file-btn");
    if (input.files.length > 0) {
        removeFileBtn.style.display = "inline-block";
    } else {
        removeFileBtn.style.display = "none";
    }
}

function removeFile() {
    const fileInput = document.getElementById("pet-image");
    const fileNameLabel = document.getElementById("file-name");
    const removeFileBtn = document.getElementById("remove-file-btn");
    const imagePreview = document.getElementById("image-preview");

    // Eliminar el archivo seleccionado
    fileInput.value = "";
    fileNameLabel.textContent = "";

    // Ocultar el botón de eliminar
    removeFileBtn.style.display = "none";

    // Ocultar la previsualización de la imagen y limpiar su src
    imagePreview.style.display = "none";
    imagePreview.src = "#";
}