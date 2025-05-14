document.addEventListener('DOMContentLoaded', () => {
    // Determine which page is loaded based on the document title
    const pageTitle = document.title;

    if (pageTitle === 'Recordatorios') {
        // Code for recordatorios.html

        // Menu Toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        menuToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        // Help Tooltip Toggle
        const helpIcon = document.querySelector('.help-icon');
        const helpTooltip = document.getElementById('help-tooltip');
        if (helpIcon && helpTooltip) {
            helpIcon.addEventListener('click', () => {
                helpTooltip.style.display = helpTooltip.style.display === 'block' ? 'none' : 'block';
            });
        }

        // Calendar Logic
        const calendarGrid = document.getElementById('calendar-grid');
        const currentMonthSpan = document.getElementById('current-month');
        const prevMonthBtn = document.getElementById('prev-month');
        const nextMonthBtn = document.getElementById('next-month');
        const remindersList = document.getElementById('reminders-list');
        const reminderCount = document.querySelector('.reminder-count');

        let currentDate = new Date(); // Fecha actual del sistema
        let selectedDate = new Date(); // Por defecto, selecciona el día actual

        // Load reminders from localStorage or use default ones
        let allReminders = JSON.parse(localStorage.getItem('reminders')) || [
            { date: '2025-04-20', time: '13:30', title: 'Reponer pienso', color: '#FFC107' },
            { date: '2025-04-20', time: '18:00', title: 'Pasear a Toby', color: '#4CAF50' },
            { date: '2025-04-20', time: '20:30', title: 'Dar medicina', color: '#F44336' },
            { date: '2025-04-21', time: '09:00', title: 'Cita veterinario', color: '#4CAF50' },
            { date: '2025-04-21', time: '15:00', title: 'Comprar juguete', color: '#FFC107' },
            { date: '2025-04-22', time: '11:00', title: 'Baño', color: '#F44336' },
        ];

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

            // Adjust firstDay for Monday start (0 = Monday, 6 = Sunday)
            const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

            // Add empty slots for days before the 1st
            for (let i = 0; i < adjustedFirstDay; i++) {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'calendar-date disabled';
                dayDiv.textContent = prevMonthDays - adjustedFirstDay + i + 1;
                calendarGrid.appendChild(dayDiv);
            }

            // Add days of the current month
            for (let day = 1; day <= daysInMonth; day++) {
                const dayDiv = document.createElement('div');
                dayDiv.className = 'calendar-date';
                dayDiv.textContent = day;

                // Resaltar el día actual
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

            // Add days of the next month to fill the grid
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
            
            filteredReminders.forEach(reminder => {
                const reminderDiv = document.createElement('div');
                reminderDiv.className = 'reminder-item';
                reminderDiv.setAttribute('data-time', reminder.time);
                reminderDiv.setAttribute('data-date', reminder.date);
                reminderDiv.innerHTML = `
                    <span class="reminder-icon" style="background-color: ${reminder.color};"></span>
                    ${reminder.title}
                    <span class="reminder-time">${reminder.time}h</span>
                `;
                remindersList.appendChild(reminderDiv);
            });

            updateReminderCount();
        }

        function updateReminderCount() {
            const count = remindersList.children.length;
            reminderCount.textContent = count;
        }

        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendar();
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendar();
        });

        // Initial setup
        updateCalendar();
        updateReminders();

        // Navigate to nuevo_recordatorio.html when "Nuevo Recordatorio" button is clicked
        const newReminderBtn = document.getElementById('new-reminder-btn');
        newReminderBtn.addEventListener('click', () => {
            window.location.href = 'nuevo_recordatorio.html';
        });
    } else if (pageTitle === 'Nuevo Recordatorio') {
        // Code for nuevo_recordatorio.html

        // Menu Toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        menuToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        // File Input Handling
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

        // Form Submission
        const petForm = document.getElementById('pet-form');
        const newReminderBtn = document.getElementById('new-reminder-btn');
        const modal = document.getElementById('delete-modal');
        const confirmBtn = document.getElementById('confirm-delete');

        newReminderBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Reset invalid class on all inputs
            const inputs = petForm.querySelectorAll('input[required]');
            inputs.forEach(input => input.classList.remove('invalid'));

            // Trigger HTML5 validation
            if (!petForm.checkValidity()) {
                // Add invalid class to empty required fields
                inputs.forEach(input => {
                    if (!input.validity.valid) {
                        input.classList.add('invalid');
                    }
                });
                petForm.reportValidity();
                return;
            }

            // Get form values
            const description = petForm.querySelector('#reminder-desc').value.trim();
            const date = petForm.querySelector('#reminder-date').value;
            const time = petForm.querySelector('#reminder-time').value;
            const sound = petForm.querySelector('#reminder-sound').files[0] ? petForm.querySelector('#reminder-sound').files[0].name : null;

            const reminderData = {
                description: description,
                date: date,
                time: time || '00:00', // Default time if not provided
                sound: sound,
            };

            // Load existing reminders from localStorage
            let allReminders = JSON.parse(localStorage.getItem('reminders')) || [
                { date: '2025-04-20', time: '13:30', title: 'Reponer pienso', color: '#FFC107' },
                { date: '2025-04-20', time: '18:00', title: 'Pasear a Toby', color: '#4CAF50' },
                { date: '2025-04-20', time: '20:30', title: 'Dar medicina', color: '#F44336' },
                { date: '2025-04-21', time: '09:00', title: 'Cita veterinario', color: '#4CAF50' },
                { date: '2025-04-21', time: '15:00', title: 'Comprar juguete', color: '#FFC107' },
                { date: '2025-04-22', time: '11:00', title: 'Baño', color: '#F44336' },
            ];

            // Define colors for new reminders (cycle through a predefined set)
            const colors = ['#FFC107', '#4CAF50', '#F44336'];
            const newReminder = {
                date: reminderData.date,
                time: reminderData.time,
                title: reminderData.description,
                color: colors[allReminders.length % colors.length], // Cycle through colors
            };

            // Add the new reminder to the array
            allReminders.push(newReminder);

            // Save updated reminders to localStorage
            localStorage.setItem('reminders', JSON.stringify(allReminders));

            // Show modal
            modal.style.display = 'flex';

            // Handle modal accept button
            confirmBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                window.location.href = 'recordatorios.html';
            });
        });

        // Remove invalid class when the user starts typing
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