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
        }
    });
});

function updateFileName(input) {
    const fileName = input.files.length > 0 ? input.files[0].name : "Ningún archivo seleccionado";
    document.getElementById("file-name").textContent = fileName;
}