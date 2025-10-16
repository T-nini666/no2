// 全局变量存储图表实例
let charts = {};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCharts();
    updateAllRangeValues();
});

// 导航功能
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.chart-section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');
            
            // 更新按钮状态
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 更新显示的部分
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// 初始化所有图表
function initializeCharts() {
    updateLineChart();
    updateBarChart();
    updateHorizontalBar();
    updateAreaChart();
    updateHistogram();
    updatePieChart();
    updateScatterChart();
    updateBoxPlot();
    updateRadarChart();
    updateErrorBarChart();
}

// 更新所有范围输入的显示值
function updateAllRangeValues() {
    const ranges = document.querySelectorAll('input[type="range"]');
    ranges.forEach(range => {
        const valueSpan = document.getElementById(range.id + 'Value');
        if (valueSpan) {
            valueSpan.textContent = range.value;
            range.addEventListener('input', () => {
                valueSpan.textContent = range.value;
            });
        }
    });
}

// 2.1 折线图
function updateLineChart() {
    const ctx = document.getElementById('lineChartCanvas').getContext('2d');
    const tempRange = parseFloat(document.getElementById('tempRange').value);
    
    // 基础数据
    const days = Array.from({length: 15}, (_, i) => i + 4);
    const baseMaxTemp = [32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31];
    const baseMinTemp = [19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16];
    
    // 根据用户输入调整温度
    const maxTemp = baseMaxTemp.map(temp => temp + (Math.random() - 0.5) * tempRange);
    const minTemp = baseMinTemp.map(temp => temp + (Math.random() - 0.5) * tempRange);

    if (charts.lineChart) {
        charts.lineChart.destroy();
    }

    charts.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: days.map(day => `${day}日`),
            datasets: [{
                label: '最高气温',
                data: maxTemp,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4,
                fill: false
            }, {
                label: '最低气温',
                data: minTemp,
                borderColor: '#4ecdc4',
                backgroundColor: 'rgba(78, 205, 196, 0.1)',
                tension: 0.4,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '未来15天气温变化'
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: '温度 (°C)'
                    }
                }
            }
        }
    });
}