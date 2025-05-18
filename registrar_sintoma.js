document.addEventListener("DOMContentLoaded", () => {
    const btnRegistrar = document.getElementById("new-reminder-btn");
    const modal = document.getElementById("delete-modal");
    const btnOK = document.getElementById("confirm-delete");

    btnRegistrar.addEventListener("click", () => {
        const desc = document.getElementById("synt-desc").value.trim();
        const date = document.getElementById("synt-date").value;
        const time = document.getElementById("synt-time").value;
        const grav = document.getElementById("synt-grav").value.trim();

        // Validación simple
        if (!desc || !date || !time || !grav) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        const sintoma = {
            descripcion: desc,
            fecha: date,
            hora: time,
            gravedad: grav
        };

        // Guardar en localStorage agrupado por fecha
        let sintomas = JSON.parse(localStorage.getItem("sintomas")) || {};
        if (!sintomas[date]) {
            sintomas[date] = [];
        }
        sintomas[date].push(sintoma);
        localStorage.setItem("sintomas", JSON.stringify(sintomas));

        // Mostrar modal
        modal.style.display = "flex";
    });

    btnOK.addEventListener("click", () => {
        // Ocultar modal y redirigir
        document.getElementById("delete-modal").style.display = "none";
        window.location.href = "calpatologico.html";
    });

    // Cierre modal al hacer clic fuera del contenido
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
