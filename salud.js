document.addEventListener('DOMContentLoaded', () => {
    const helpIcon = document.querySelector('.help-icon');
    const helpTooltip = document.getElementById('help-tooltip');

    // Show tooltip when clicking the help icon
    helpIcon.addEventListener('click', () => {
        helpTooltip.style.display = helpTooltip.style.display === 'block' ? 'none' : 'block';
    });

    // Hide tooltip when scrolling
    window.addEventListener('scroll', () => {
        if (helpTooltip.style.display === 'block') {
            helpTooltip.style.display = 'none';
        }
    });

    // Optional: Close tooltip when clicking outside
    document.addEventListener('click', (event) => {
        if (!helpIcon.contains(event.target) && !helpTooltip.contains(event.target)) {
            helpTooltip.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const monitorBtn = Array.from(document.getElementsByClassName('health-button'))
        .find(btn => btn.textContent.replace(/\s/g, '').toLowerCase().includes('monitorizacióndeconstantes'));
    if (monitorBtn) {
        monitorBtn.addEventListener('click', function() {
            window.location.href = 'constantes.html';
        });
    }
});