// 2.7 散点图
function updateScatterChart() {
    const ctx = document.getElementById('scatterChartCanvas').getContext('2d');
    const pointCount = parseInt(document.getElementById('scatterPoints').value);
    const showTrend = document.getElementById('showTrendLine').checked;
    
    // 生成汽车速度与制动距离数据
    const data = [];
    for (let i = 0; i < pointCount; i++) {
        const speed = 10 + (i / pointCount) * 200;
        const distance = (speed * speed) / 400 + Math.random() * 20 - 10;
        data.push({x: speed, y: Math.max(0, distance)});
    }

    if (charts.scatterChart) {
        charts.scatterChart.destroy();
    }

    const datasets = [{
        label: '制动距离',
        data: data,
        backgroundColor: '#ff6b6b',
        borderColor: '#ff6b6b',
        pointRadius: 5
    }];

    if (showTrend) {
        // 添加趋势线
        const trendData = data.map(point => ({
            x: point.x,
            y: (point.x * point.x) / 400
        }));
        
        datasets.push({
            label: '趋势线',
            data: trendData,
            type: 'line',
            borderColor: '#4ecdc4',
            backgroundColor: 'transparent',
            pointRadius: 0,
            tension: 0.4
        });
    }

    charts.scatterChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '汽车速度与制动距离的关系'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: '速度 (km/h)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: '制动距离 (m)'
                    }
                }
            }
        }
    });
}

// 2.8 箱形图 (使用柱形图模拟)
function updateBoxPlot() {
    const ctx = document.getElementById('boxPlotCanvas').getContext('2d');
    
    // 2017和2018年发电量数据
    const data2018 = [5200, 5254.5, 5283.4, 5107.8, 5443.3, 5550.6, 6400.2, 6404.9, 5483.1, 5330.2, 5543, 6199.9];
    const data2017 = [4605.2, 4710.3, 5168.9, 4767.2, 4947, 5203, 6047.4, 5945.5, 5219.6, 5038.1, 5196.3, 5698.6];
    
    // 计算统计值
    function calculateStats(data) {
        const sorted = [...data].sort((a, b) => a - b);
        const q1 = sorted[Math.floor(sorted.length * 0.25)];
        const median = sorted[Math.floor(sorted.length * 0.5)];
        const q3 = sorted[Math.floor(sorted.length * 0.75)];
        const min = Math.min(...sorted);
        const max = Math.max(...sorted);
        return {min, q1, median, q3, max};
    }
    
    const stats2018 = calculateStats(data2018);
    const stats2017 = calculateStats(data2017);

    if (charts.boxPlot) {
        charts.boxPlot.destroy();
    }

    charts.boxPlot = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['2017年', '2018年'],
            datasets: [{
                label: '最小值',
                data: [stats2017.min, stats2018.min],
                backgroundColor: '#ff6b6b'
            }, {
                label: '第一四分位数',
                data: [stats2017.q1, stats2018.q1],
                backgroundColor: '#4ecdc4'
            }, {
                label: '中位数',
                data: [stats2017.median, stats2018.median],
                backgroundColor: '#45b7d1'
            }, {
                label: '第三四分位数',
                data: [stats2017.q3, stats2018.q3],
                backgroundColor: '#96ceb4'
            }, {
                label: '最大值',
                data: [stats2017.max, stats2018.max],
                backgroundColor: '#feca57'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '2017年和2018年全国发电量统计'
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '发电量 (亿千瓦时)'
                    }
                }
            }
        }
    });
}

// 2.9 雷达图
function updateRadarChart() {
    const ctx = document.getElementById('radarChartCanvas').getContext('2d');
    const personIndex = parseInt(document.getElementById('radarPerson').value);
    
    const radarData = [
        [0.40, 0.32, 0.35, 0.30, 0.30, 0.88],
        [0.85, 0.35, 0.30, 0.40, 0.40, 0.30],
        [0.43, 0.89, 0.30, 0.28, 0.22, 0.30],
        [0.30, 0.25, 0.48, 0.85, 0.45, 0.40],
        [0.20, 0.38, 0.87, 0.45, 0.32, 0.28],
        [0.34, 0.31, 0.38, 0.40, 0.92, 0.28]
    ];
    
    const labels = ['研究型(I)', '艺术型(A)', '社会型(S)', '企业型(E)', '传统型(C)', '现实型(R)'];

    if (charts.radarChart) {
        charts.radarChart.destroy();
    }

    charts.radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: `测试者${personIndex + 1}`,
                data: radarData[personIndex],
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                borderColor: '#667eea',
                borderWidth: 2,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '霍兰德职业兴趣测试'
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 1,
                    ticks: {
                        stepSize: 0.2
                    }
                }
            }
        }
    });
}