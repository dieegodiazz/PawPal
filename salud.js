document.addEventListener('DOMContentLoaded', () => {
    // Tooltip handling
    const helpIcon = document.querySelector('.help-icon');
    const helpTooltip = document.getElementById('help-tooltip');

    if (helpIcon && helpTooltip) {
        // Show/hide tooltip when clicking the help icon
        helpIcon.addEventListener('click', () => {
            helpTooltip.style.display = helpTooltip.style.display === 'block' ? 'none' : 'block';
        });

        // Hide tooltip when scrolling
        window.addEventListener('scroll', () => {
            if (helpTooltip.style.display === 'block') {
                helpTooltip.style.display = 'none';
            }
        });

        // Close tooltip when clicking outside
        document.addEventListener('click', (event) => {
            if (!helpIcon.contains(event.target) && !helpTooltip.contains(event.target)) {
                helpTooltip.style.display = 'none';
            }
        });
    }

    // Button redirections
    const healthButtons = Array.from(document.getElementsByClassName('health-button'));

    // Cartilla Vacunas button
    const cartillaBtn = healthButtons.find(btn => 
        btn.textContent.replace(/\s/g, '').toLowerCase().includes('cartillavacunas')
    );
    if (cartillaBtn) {
        cartillaBtn.addEventListener('click', () => {
            window.location.href = 'cartillavacunas.html';
        });
    }

    // Monitorización de Constantes button
    const monitorBtn = healthButtons.find(btn => 
        btn.textContent.replace(/\s/g, '').toLowerCase().includes('monitorizacióndeconstantes')
    );
    if (monitorBtn) {
        monitorBtn.addEventListener('click', () => {
            window.location.href = 'constantes.html';
        });
    }

    // Calendario Patológico button
    const calendarioBtn = healthButtons.find(btn => 
        btn.textContent.replace(/\s/g, '').toLowerCase().includes('calendariopatológico')
    );
    if (calendarioBtn) {
        calendarioBtn.addEventListener('click', () => {
            window.location.href = 'calpatologico.html';
        });
    }

    // Menu toggle and navigation
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            // Toggle menu visibility
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });

        // Menu item redirections
        const menuItems = [
            { href: '#inicio', url: 'index.html' },
            { href: '#cambiarmascota', url: 'inicio.html' },
            { href: '#cartillavacunas', url: 'cartillavacunas.html' },
            { href: '#cerrarsesion', url: 'login.html' }
        ];

        menuItems.forEach(item => {
            const link = navMenu.querySelector(`a[href="${item.href}"]`);
            if (link) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = item.url;
                    // Close menu after clicking
                    navMenu.style.display = 'none';
                });
            }
        });
    }
});