// 使用自定义数据更新折线图
function updateLineChartWithData() {
    const ctx = document.getElementById('lineChartCanvas').getContext('2d');
    const data = dataEditor.currentData.lineChart;
    
    if (charts.lineChart) {
        charts.lineChart.destroy();
    }

    charts.lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.days.map(day => `${day}日`),
            datasets: [{
                label: '最高气温',
                data: data.maxTemp,
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4,
                fill: false
            }, {
                label: '最低气温',
                data: data.minTemp,
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

// 2.2 柱形图
function updateBarChart() {
    const ctx = document.getElementById('barChartCanvas').getContext('2d');
    const chartType = document.getElementById('barChartType').value;
    
    const labels = dataEditor.currentData.barChart.labels;
    const gmvData = dataEditor.currentData.barChart.gmvData;

    if (charts.barChart) {
        charts.barChart.destroy();
    }

    let datasets = [];

    switch(chartType) {
        case 'normal':
            datasets = [{
                label: 'GMV (亿元)',
                data: gmvData,
                backgroundColor: '#667eea',
                borderColor: '#667eea',
                borderWidth: 1
            }];
            break;
        case 'grouped':
            datasets = [{
                label: '淘宝GMV',
                data: gmvData.map(val => val * 0.6),
                backgroundColor: '#ff6b6b'
            }, {
                label: '天猫GMV',
                data: gmvData.map(val => val * 0.4),
                backgroundColor: '#4ecdc4'
            }];
            break;
        case 'stacked':
            datasets = [{
                label: '淘宝GMV',
                data: gmvData.map(val => val * 0.6),
                backgroundColor: '#ff6b6b'
            }, {
                label: '天猫GMV',
                data: gmvData.map(val => val * 0.4),
                backgroundColor: '#4ecdc4'
            }];
            break;
    }

    charts.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '阿里巴巴GMV统计'
                }
            },
            scales: {
                x: {
                    stacked: chartType === 'stacked'
                },
                y: {
                    stacked: chartType === 'stacked',
                    title: {
                        display: true,
                        text: 'GMV (亿元)'
                    }
                }
            }
        }
    });
}

// 使用自定义数据更新柱形图
function updateBarChartWithData() {
    const ctx = document.getElementById('barChartCanvas').getContext('2d');
    const chartType = document.getElementById('barChartType').value;
    
    const labels = dataEditor.currentData.barChart.labels;
    const gmvData = dataEditor.currentData.barChart.gmvData;
    
    if (charts.barChart) {
        charts.barChart.destroy();
    }

    let datasets = [];

    switch(chartType) {
        case 'normal':
            datasets = [{
                label: 'GMV (亿元)',
                data: gmvData,
                backgroundColor: '#667eea',
                borderColor: '#667eea',
                borderWidth: 1
            }];
            break;
        case 'grouped':
            datasets = [{
                label: '淘宝GMV',
                data: gmvData.map(val => val * 0.6),
                backgroundColor: '#ff6b6b'
            }, {
                label: '天猫GMV',
                data: gmvData.map(val => val * 0.4),
                backgroundColor: '#4ecdc4'
            }];
            break;
        case 'stacked':
            datasets = [{
                label: '淘宝GMV',
                data: gmvData.map(val => val * 0.6),
                backgroundColor: '#ff6b6b'
            }, {
                label: '天猫GMV',
                data: gmvData.map(val => val * 0.4),
                backgroundColor: '#4ecdc4'
            }];
            break;
    }

    charts.barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '阿里巴巴GMV统计'
                }
            },
            scales: {
                x: {
                    stacked: chartType === 'stacked'
                },
                y: {
                    stacked: chartType === 'stacked',
                    title: {
                        display: true,
                        text: 'GMV (亿元)'
                    }
                }
            }
        }
    });
}

// 2.3 条形图
function updateHorizontalBar() {
    const ctx = document.getElementById('horizontalBarCanvas').getContext('2d');
    const itemCount = parseInt(document.getElementById('itemCount').value);
    
    const allLabels = dataEditor.currentData.horizontalBar.labels;
    const allData = dataEditor.currentData.horizontalBar.data;
    
    const labels = allLabels.slice(0, itemCount);
    const data = allData.slice(0, itemCount);

// 使用自定义数据更新条形图
function updateHorizontalBarWithData() {
    const ctx = document.getElementById('horizontalBarCanvas').getContext('2d');
    const itemCount = parseInt(document.getElementById('itemCount').value);
    
    const allLabels = dataEditor.currentData.horizontalBar.labels;
    const allData = dataEditor.currentData.horizontalBar.data;
    
    const labels = allLabels.slice(0, Math.min(itemCount, allLabels.length));
    const data = allData.slice(0, Math.min(itemCount, allData.length));

    if (charts.horizontalBar) {
        charts.horizontalBar.destroy();
    }

    if (charts.horizontalBar) {
        charts.horizontalBar.destroy();
    }

    charts.horizontalBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '网购替代率',
                data: data,
                backgroundColor: '#45b7d1',
                borderColor: '#45b7d1',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '各商品种类的网购替代率'
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 1,
                    title: {
                        display: true,
                        text: '替代率'
                    }
                }
            }
        }
    });
}

// 使用自定义数据更新条形图的完整函数
function updateHorizontalBarWithData() {
    const ctx = document.getElementById('horizontalBarCanvas').getContext('2d');
    const itemCount = parseInt(document.getElementById('itemCount').value);
    
    const allLabels = dataEditor.currentData.horizontalBar.labels;
    const allData = dataEditor.currentData.horizontalBar.data;
    
    const labels = allLabels.slice(0, Math.min(itemCount, allLabels.length));
    const data = allData.slice(0, Math.min(itemCount, allData.length));

    if (charts.horizontalBar) {
        charts.horizontalBar.destroy();
    }

    charts.horizontalBar = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '网购替代率',
                data: data,
                backgroundColor: '#45b7d1',
                borderColor: '#45b7d1',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '各商品种类的网购替代率'
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 1,
                    title: {
                        display: true,
                        text: '替代率'
                    }
                }
            }
        }
    });
}