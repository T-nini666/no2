// 2.4 堆积面积图
function updateAreaChart() {
    const ctx = document.getElementById('areaChartCanvas').getContext('2d');
    const variation = parseFloat(document.getElementById('areaVariation').value);
    
    const months = dataEditor.currentData.areaChart.months;
    const baseDataA = dataEditor.currentData.areaChart.companyA;
    const baseDataB = dataEditor.currentData.areaChart.companyB;
    const baseDataC = dataEditor.currentData.areaChart.companyC;
    
    const dataA = baseDataA.map(val => val * variation);
    const dataB = baseDataB.map(val => val * variation);
    const dataC = baseDataC.map(val => val * variation);

// 使用自定义数据更新堆积面积图
function updateAreaChartWithData() {
    const ctx = document.getElementById('areaChartCanvas').getContext('2d');
    const variation = parseFloat(document.getElementById('areaVariation').value);
    
    const months = dataEditor.currentData.areaChart.months;
    const baseDataA = dataEditor.currentData.areaChart.companyA;
    const baseDataB = dataEditor.currentData.areaChart.companyB;
    const baseDataC = dataEditor.currentData.areaChart.companyC;
    
    const dataA = baseDataA.map(val => val * variation);
    const dataB = baseDataB.map(val => val * variation);
    const dataC = baseDataC.map(val => val * variation);

    if (charts.areaChart) {
        charts.areaChart.destroy();
    }

    if (charts.areaChart) {
        charts.areaChart.destroy();
    }

    charts.areaChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: '公司A',
                data: dataA,
                backgroundColor: 'rgba(255, 107, 107, 0.6)',
                borderColor: '#ff6b6b',
                fill: true
            }, {
                label: '公司B',
                data: dataB,
                backgroundColor: 'rgba(78, 205, 196, 0.6)',
                borderColor: '#4ecdc4',
                fill: true
            }, {
                label: '公司C',
                data: dataC,
                backgroundColor: 'rgba(102, 126, 234, 0.6)',
                borderColor: '#667eea',
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '物流公司物流费用统计'
                }
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: '费用 (万元)'
                    }
                }
            }
        }
    });
}

// 使用自定义数据更新堆积面积图的完整函数
function updateAreaChartWithData() {
    const ctx = document.getElementById('areaChartCanvas').getContext('2d');
    const variation = parseFloat(document.getElementById('areaVariation').value);
    
    const months = dataEditor.currentData.areaChart.months;
    const baseDataA = dataEditor.currentData.areaChart.companyA;
    const baseDataB = dataEditor.currentData.areaChart.companyB;
    const baseDataC = dataEditor.currentData.areaChart.companyC;
    
    const dataA = baseDataA.map(val => val * variation);
    const dataB = baseDataB.map(val => val * variation);
    const dataC = baseDataC.map(val => val * variation);

    if (charts.areaChart) {
        charts.areaChart.destroy();
    }

    charts.areaChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: '公司A',
                data: dataA,
                backgroundColor: 'rgba(255, 107, 107, 0.6)',
                borderColor: '#ff6b6b',
                fill: true
            }, {
                label: '公司B',
                data: dataB,
                backgroundColor: 'rgba(78, 205, 196, 0.6)',
                borderColor: '#4ecdc4',
                fill: true
            }, {
                label: '公司C',
                data: dataC,
                backgroundColor: 'rgba(102, 126, 234, 0.6)',
                borderColor: '#667eea',
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '物流公司物流费用统计'
                }
            },
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: '费用 (万元)'
                    }
                }
            }
        }
    });
}

// 2.5 直方图
function updateHistogram() {
    const ctx = document.getElementById('histogramCanvas').getContext('2d');
    const samples = parseInt(document.getElementById('histogramSamples').value);
    const bins = parseInt(document.getElementById('histogramBins').value);
    
    // 生成正态分布随机数据
    const data = [];
    for (let i = 0; i < samples; i++) {
        data.push(Math.random() * 100);
    }
    
    // 计算直方图数据
    const binWidth = 100 / bins;
    const histogramData = new Array(bins).fill(0);
    const labels = [];
    
    for (let i = 0; i < bins; i++) {
        const start = i * binWidth;
        const end = (i + 1) * binWidth;
        labels.push(`${start.toFixed(1)}-${end.toFixed(1)}`);
        
        data.forEach(value => {
            if (value >= start && value < end) {
                histogramData[i]++;
            }
        });
    }

    if (charts.histogram) {
        charts.histogram.destroy();
    }

    charts.histogram = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '频次',
                data: histogramData,
                backgroundColor: '#96ceb4',
                borderColor: '#96ceb4',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '随机数据分布直方图'
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '频次'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: '数值范围'
                    }
                }
            }
        }
    });
}

// 2.6 饼图
function updatePieChart() {
    const ctx = document.getElementById('pieChartCanvas').getContext('2d');
    const chartType = document.getElementById('pieChartType').value;
    const foodExpense = parseInt(document.getElementById('foodExpense').value);
    
    const labels = dataEditor.currentData.pieChart.labels;
    const baseData = [...dataEditor.currentData.pieChart.data];
    baseData[2] = foodExpense; // 更新餐饮美食支出
    const total = baseData.reduce((sum, val) => sum + val, 0);

// 使用自定义数据更新饼图
function updatePieChartWithData() {
    const ctx = document.getElementById('pieChartCanvas').getContext('2d');
    const chartType = document.getElementById('pieChartType').value;
    const foodExpense = parseInt(document.getElementById('foodExpense').value);
    
    const labels = dataEditor.currentData.pieChart.labels;
    const baseData = [...dataEditor.currentData.pieChart.data];
    baseData[2] = foodExpense; // 更新餐饮美食支出
    const total = baseData.reduce((sum, val) => sum + val, 0);

    if (charts.pieChart) {
        charts.pieChart.destroy();
    }

    if (charts.pieChart) {
        charts.pieChart.destroy();
    }

    charts.pieChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                data: baseData,
                backgroundColor: [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
                    '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '支付宝月账单报告'
                },
                legend: {
                    position: 'right'
                }
            }
        }
    });
}

// 使用自定义数据更新饼图的完整函数
function updatePieChartWithData() {
    const ctx = document.getElementById('pieChartCanvas').getContext('2d');
    const chartType = document.getElementById('pieChartType').value;
    const foodExpense = parseInt(document.getElementById('foodExpense').value);
    
    const labels = dataEditor.currentData.pieChart.labels;
    const baseData = [...dataEditor.currentData.pieChart.data];
    baseData[2] = foodExpense; // 更新餐饮美食支出
    const total = baseData.reduce((sum, val) => sum + val, 0);

    if (charts.pieChart) {
        charts.pieChart.destroy();
    }

    charts.pieChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                data: baseData,
                backgroundColor: [
                    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4',
                    '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '支付宝月账单报告'
                },
                legend: {
                    position: 'right'
                }
            }
        }
    });
}