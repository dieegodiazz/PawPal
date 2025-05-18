document.addEventListener('DOMContentLoaded', () => {
    const pageTitle = document.title;

    // Función para asignar color según título del recordatorio
    function assignColorByTitle(title) {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('paseo') || lowerTitle.includes('pasear')) {
            return '#4CAF50'; // Verde
        } else if (lowerTitle.includes('comida') || lowerTitle.includes('pienso') || lowerTitle.includes('alimentar')) {
            return '#FFC107'; // Amarillo
        } else if (lowerTitle.includes('medicina') || lowerTitle.includes('medicación')) {
            return '#F44336'; // Rojo
        } else if (lowerTitle.includes('veterinario') || lowerTitle.includes('cita')) {
            return '#2196F3'; // Azul
        } else if (lowerTitle.includes('baño')) {
            return '#9C27B0'; // Violeta
        } else {
            return '#9E9E9E'; // Gris (otros)
        }
    }

    if (pageTitle === 'Recordatorios') {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        menuToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        const helpIcon = document.querySelector('.help-icon');
        const helpTooltip = document.getElementById('help-tooltip');
        if (helpIcon && helpTooltip) {
            helpIcon.addEventListener('click', () => {
                helpTooltip.style.display = helpTooltip.style.display === 'block' ? 'none' : 'block';
            });
        }

        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonthSpan = document.getElementById('current-month');
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');
        const remindersList = document.getElementById('reminders-list');
        const reminderCount = document.querySelector('.reminder-count');

        let currentDate = new Date();
        let selectedDate = new Date();

        let allReminders = JSON.parse(localStorage.getItem('reminders')) || [
            { date: '2025-04-20', time: '13:30', title: 'Reponer pienso' },
            { date: '2025-04-20', time: '18:00', title: 'Pasear a Toby' },
            { date: '2025-04-20', time: '20:30', title: 'Dar medicina' },
            { date: '2025-04-21', time: '09:00', title: 'Cita veterinario' },
            { date: '2025-04-21', time: '15:00', title: 'Comprar juguete' },
            { date: '2025-04-22', time: '11:00', title: 'Baño' },
        ];

        allReminders = allReminders.map(reminder => ({
            ...reminder,
            color: assignColorByTitle(reminder.title)
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

            const monthNames = [
                'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
            ];
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
                if (
                    day === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear()
                ) {
                    dayDiv.classList.add('today');
                }

                if (day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                    dayDiv.classList.add('selected');
                }

                dayDiv.addEventListener('click', () => {
                    document.querySelectorAll('.calendar-date').forEach(d => d.classList.remove('selected'));
                    dayDiv.classList.add('selected');
                    selectedDate = new Date(year, month, day);
                    updateReminders();
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

        function updateReminders() {
            const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
            remindersList.innerHTML = '';
            const filteredReminders = allReminders.filter(reminder => reminder.date === selectedDateStr);

            if (filteredReminders.length === 0) {
                const noRemindersDiv = document.createElement('div');
                noRemindersDiv.className = 'reminder-item';
                noRemindersDiv.innerHTML = '<span class="reminder-title">No hay recordatorios registrados para esta fecha.</span>';
                remindersList.appendChild(noRemindersDiv);
            } else {
                filteredReminders.forEach(reminder => {
                    const reminderDiv = document.createElement('div');
                    reminderDiv.className = 'reminder-item';
                    reminderDiv.setAttribute('data-time', reminder.time);
                    reminderDiv.setAttribute('data-date', reminder.date);
                    reminderDiv.style.borderLeft = `4px solid ${reminder.color}`;
                    reminderDiv.innerHTML = `
                        ${reminder.title}
                        <span class="reminder-time">${reminder.time}h</span>
                    `;
                    remindersList.appendChild(reminderDiv);
                });
            }

            updateReminderCount();
        }

        function updateReminderCount() {
            const selectedDateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
            const filteredReminders = allReminders.filter(reminder => reminder.date === selectedDateStr);
            reminderCount.textContent = filteredReminders.length;
        }

        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar();
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar();
        });

        updateCalendar();
        updateReminders();

        const newReminderBtn = document.getElementById('new-reminder-btn');
        newReminderBtn.addEventListener('click', () => {
            window.location.href = 'nuevo_recordatorio.html';
        });
    } else if (pageTitle === 'Nuevo Recordatorio') {
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        menuToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        const soundInput = document.getElementById('reminder-sound');
        const soundLabel = document.querySelector('.custom-file-label');

        soundInput.addEventListener('change', () => {
            if (soundInput.files.length > 0) {
                soundLabel.textContent = soundInput.files[0].name;
                soundLabel.classList.add('selected');
            } else {
                soundLabel.textContent = 'Seleccionar sonido';
                soundLabel.classList.remove('selected');
            }
        });

        const petForm = document.getElementById('pet-form');
        const newReminderBtn = document.getElementById('new-reminder-btn');
        const modal = document.getElementById('delete-modal');
        const confirmBtn = document.getElementById('confirm-delete');

        newReminderBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const inputs = petForm.querySelectorAll('input[required]');
            inputs.forEach(input => input.classList.remove('invalid'));

            if (!petForm.checkValidity()) {
                inputs.forEach(input => {
                    if (!input.validity.valid) {
                        input.classList.add('invalid');
                    }
                });
                petForm.reportValidity();
                return;
            }

            const description = petForm.querySelector('#reminder-desc').value.trim();
            const date = petForm.querySelector('#reminder-date').value;
            const time = petForm.querySelector('#reminder-time').value;
            const sound = petForm.querySelector('#reminder-sound').files[0] ? petForm.querySelector('#reminder-sound').files[0].name : null;

            const reminderData = {
                description,
                date,
                time: time || '00:00',
                sound,
            };

            let allReminders = JSON.parse(localStorage.getItem('reminders')) || [];

            const newReminder = {
                date: reminderData.date,
                time: reminderData.time,
                title: reminderData.description,
                color: assignColorByTitle(reminderData.description)
            };

            allReminders.push(newReminder);
            localStorage.setItem('reminders', JSON.stringify(allReminders));

            modal.style.display = 'flex';

            confirmBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                window.location.href = 'recordatorios.html';
            });
        });

        const inputs = petForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.validity.valid) {
                    input.classList.remove('invalid');
                }
            });
        });
    }
});
