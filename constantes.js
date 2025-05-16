// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Vital Signs Simulation
    let heartRate = 74;
    let oxygenLevel = 95;
    let respRate = 20;
    let temperature = 38.2;

    const heartRateData = [74];
    const oxygenData = [95];
    const labels = [0];

    // Initialize Charts
    const heartRateChart = new Chart(document.getElementById('heartRateChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Frecuencia cardíaca',
                data: heartRateData,
                borderColor: '#ff4d4d',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: { 
                    display: false,
                    ticks: {
                        font: {
                            size: 12 // Increased font size for better visibility
                        }
                    }
                },
                y: { 
                    display: true,
                    min: 60,
                    max: 90,
                    ticks: {
                        font: {
                            size: 12 // Increased from 10 to 12 for better visibility
                        },
                        color: '#000' // Changed to black from #888
                    }
                }
            },
            plugins: { legend: { display: false } }
        }
    });

    const oxygenChart = new Chart(document.getElementById('oxygenChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Oxígeno',
                data: oxygenData,
                borderColor: '#ff4d4d',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: { 
                    display: false,
                    ticks: {
                        font: {
                            size: 12 // Increased font size
                        }
                    }
                },
                y: { 
                    display: true,
                    min: 90,
                    max: 100,
                    ticks: {
                        font: {
                            size: 12 // Increased from 10 to 12 for better visibility
                        },
                        color: '#000' // Changed to black from #888
                    }
                }
            },
            plugins: { legend: { display: false } }
        }
    });

    // Update Vital Signs
    setInterval(() => {
        // Simulate small fluctuations
        heartRate = Math.max(60, Math.min(90, heartRate + (Math.random() * 4 - 2)));
        oxygenLevel = Math.max(90, Math.min(100, oxygenLevel + (Math.random() * 2 - 1)));
        respRate = Math.max(15, Math.min(25, respRate + (Math.random() * 2 - 1)));
        temperature = Math.max(37, Math.min(39, temperature + (Math.random() * 0.4 - 0.2)));

        // Update displayed values
        document.getElementById('heart-rate').textContent = Math.round(heartRate);
        document.getElementById('oxygen-level').textContent = Math.round(oxygenLevel);
        document.getElementById('resp-rate').textContent = Math.round(respRate);
        document.getElementById('temperature').textContent = temperature.toFixed(1);

        // Update charts
        if (heartRateData.length > 10) {
            heartRateData.shift();
            oxygenData.shift();
            labels.shift();
        }
        heartRateData.push(heartRate);
        oxygenData.push(oxygenLevel);
        labels.push(labels.length);

        heartRateChart.update();
        oxygenChart.update();
    }, 2000); // Update every 2 seconds
});