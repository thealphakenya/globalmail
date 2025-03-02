// performance.js
function loadPerformanceData() {
    const statsDiv = document.getElementById("performanceStats");

    const performanceStats = `
        <p>App Uptime: 99.9%</p>
        <p>AI Response Time: 0.2s</p>
        <p>Total Users: 1500</p>
    `;
    
    statsDiv.innerHTML = performanceStats;
}

window.onload = loadPerformanceData;
