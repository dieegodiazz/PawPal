document.addEventListener('DOMContentLoaded', () => {
    // Elementos de calendario
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthSpan = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const symptomsList = document.getElementById('symptoms-list');

    let currentDate = new Date();
    let selectedDate = new Date();

    // Función para asignar color según la gravedad del síntoma
    function assignColorBySeverity(severity) {
        const lowerSeverity = severity.toLowerCase();
        if (lowerSeverity === 'leve') {
            return '#4CAF50'; // Verde
        } else if (lowerSeverity === 'moderado') {
            return '#FFC107'; // Amarillo
        } else if (lowerSeverity === 'grave') {
            return '#F44336'; // Rojo
        } else {
            return '#9E9E9E'; // Gris (por defecto)
        }
    }

    // Síntomas de ejemplo (solo si no hay en localStorage)
    let pathologicalSymptoms = JSON.parse(localStorage.getItem('sintomas')) || [
        { date: '2025-05-18', time: '10:00', description: 'Cojera leve en pata delantera', severity: 'leve', gravedad: 'Leve' },
        { date: '2025-05-18', time: '14:30', description: 'Estornudos frecuentes', severity: 'moderado', gravedad: 'Moderado' },
        { date: '2025-05-20', time: '09:00', description: 'Pérdida de apetito', severity: 'grave', gravedad: 'Grave' },
    ];

    // Normalizar los síntomas para asegurar consistencia
    pathologicalSymptoms = pathologicalSymptoms.map(s => ({
        fecha: s.fecha || s.date,
        hora: s.hora || s.time || '00:00',
        descripcion: s.descripcion || s.description,
        gravedad: s.gravedad || s.severity,
        color: assignColorBySeverity((s.gravedad || s.severity || '').toLowerCase())
    }));

    function updateCalendar() {
        calendarGrid.innerHTML = `
            <div class="calendar-day">Lun</div>
            <div class="calendar-day">Mar</div>
            <div class="calendar-day">Mié</div>
            <div class="calendar-day">Jue</div>
            <div class="calendar-day">Vie</div>
            <div class="calendar-day">Sáb</div>
            <div class="calendar-day">Dom</div>
        `;

        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthDays = new Date(year, month, 0).getDate();

        const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        currentMonthSpan.textContent = monthNames[month];

        const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

        for (let i = 0; i < adjustedFirstDay; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-date disabled';
            dayDiv.textContent = prevMonthDays - adjustedFirstDay + i + 1;
            calendarGrid.appendChild(dayDiv);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-date';
            dayDiv.textContent = day;

            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayDiv.classList.add('today');
            }
            if (day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                dayDiv.classList.add('selected');
            }

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasSymptoms = pathologicalSymptoms.some(symptom => symptom.fecha === dateStr);
            if (hasSymptoms) {
                const dot = document.createElement('span');
                dot.className = 'event-dot';
                dayDiv.appendChild(dot);
            }

            dayDiv.addEventListener('click', () => {
                document.querySelectorAll('.calendar-date').forEach(d => d.classList.remove('selected'));
                dayDiv.classList.add('selected');
                selectedDate = new Date(year, month, day);
                updateSymptoms();
            });

            calendarGrid.appendChild(dayDiv);
        }

        const totalSlots = adjustedFirstDay + daysInMonth;
        const remainingSlots = (7 - (totalSlots % 7)) % 7;
        for (let i = 1; i <= remainingSlots; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-date disabled';
            dayDiv.textContent = i;
            calendarGrid.appendChild(dayDiv);
        }
    }

    function updateSymptoms() {
        symptomsList.innerHTML = '';

        // Lee los síntomas guardados en localStorage
        let sintomas = JSON.parse(localStorage.getItem('sintomas')) || [];

        // Filtra por la fecha seleccionada
        const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
        const symptomsForDate = sintomas.map(s => ({
            fecha: s.fecha,
            hora: s.hora || '00:00',
            descripcion: s.descripcion,
            gravedad: s.gravedad,
            color: assignColorBySeverity((s.gravedad || '').toLowerCase())
        })).filter(s => s.fecha === selectedDateStr);

        if (symptomsForDate.length === 0) {
            const noSymptoms = document.createElement('div');
            noSymptoms.className = 'symptom-card';
            noSymptoms.innerHTML = '<span class="symptom-title">No hay síntomas registrados para esta fecha.</span>';
            symptomsList.appendChild(noSymptoms);
            return;
        }

        symptomsForDate.forEach(sintoma => {
            const symptomDiv = document.createElement('div');
            symptomDiv.className = 'symptom-card';
            symptomDiv.style.borderLeft = `4px solid ${sintoma.color}`;
            symptomDiv.innerHTML = `
                <span class="symptom-title">${sintoma.descripcion}</span>
                <span class="symptom-time">${sintoma.hora}h</span>
            `;
            symptomsList.appendChild(symptomDiv);
        });
    }

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    });

    // Inicia todo
    updateCalendar();
    updateSymptoms();
});

document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const addSymptomBtn = document.getElementById('new-reminder-btn');
    const modal = document.getElementById('delete-modal');
    const confirmBtn = document.getElementById('confirm-delete');
    const form = document.getElementById('pet-form');
    const descInput = document.getElementById('synt-desc');
    const dateInput = document.getElementById('synt-date');
    const timeInput = document.getElementById('synt-time');
    const severityInput = document.getElementById('synt-grav');

    // Función para validar el formulario
    function isFormValid() {
        return (
            descInput.value.trim() !== '' &&
            dateInput.value !== '' &&
            timeInput.value !== '' &&
            severityInput.value.trim() !== ''
        );
    }

    // Función para mostrar el modal
    function showModal() {
        modal.style.display = 'flex';
    }

    // Función para ocultar el modal
    function hideModal() {
        modal.style.display = 'none';
    }

    // Función para asignar color según la gravedad del síntoma
    function assignColorBySeverity(severity) {
        const lowerSeverity = severity.toLowerCase();
        if (lowerSeverity === 'leve') {
            return '#4CAF50'; // Verde
        } else if (lowerSeverity === 'moderado') {
            return '#FFC107'; // Amarillo
        } else if (lowerSeverity === 'grave') {
            return '#F44336'; // Rojo
        } else {
            return '#9E9E9E'; // Gris (por defecto)
        }
    }

    // Manejar el clic en "Añadir Síntoma"
    addSymptomBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Evitar comportamiento por defecto

        if (isFormValid()) {
            showModal();
        } else {
            // Marcar campos vacíos como inválidos
            [descInput, dateInput, timeInput, severityInput].forEach(input => {
                if (!input.value.trim()) {
                    input.classList.add('invalid');
                } else {
                    input.classList.remove('invalid');
                }
            });
            alert('Por favor, completa todos los campos.');
        }
    });

    // Manejar el clic en "OK" del modal
    confirmBtn.addEventListener('click', () => {
        // Obtener los valores del formulario
        const newSymptom = {
            fecha: dateInput.value, // Formato: YYYY-MM-DD
            hora: timeInput.value, // Formato: HH:MM
            descripcion: descInput.value.trim(),
            gravedad: severityInput.value.trim(),
            color: assignColorBySeverity(severityInput.value.trim().toLowerCase())
        };

        // Cargar síntomas existentes desde localStorage
        let symptoms = JSON.parse(localStorage.getItem('sintomas')) || [];

        // Añadir el nuevo síntoma
        symptoms.push(newSymptom);

        // Guardar en localStorage
        localStorage.setItem('sintomas', JSON.stringify(symptoms));

        // Limpiar el formulario
        form.reset();

        // Ocultar el modal
        hideModal();

        // Redirigir a calpatologico.html
        window.location.href = 'calpatologico.html';
    });

    // Opcional: Remover la clase 'invalid' al cambiar el valor de los inputs
    [descInput, dateInput, timeInput, severityInput].forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('invalid');
        });
    });
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