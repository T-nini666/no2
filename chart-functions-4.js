// 2.10 误差棒图
function updateErrorBarChart() {
    const ctx = document.getElementById('errorBarCanvas').getContext('2d');
    const showErrors = document.getElementById('showErrorBars').checked;
    
    const seasons = ['春季', '夏季', '秋季'];
    const species = ['树种1', '树种2', '树种3', '树种4'];
    const data = [
        [2.04, 1.57, 1.63],
        [1.69, 1.61, 1.64],
        [4.65, 4.99, 4.94],
        [3.39, 2.33, 4.10]
    ];
    const errors = [
        [0.16, 0.08, 0.10],
        [0.27, 0.14, 0.14],
        [0.34, 0.32, 0.29],
        [0.23, 0.23, 0.39]
    ];
    
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4'];

    if (charts.errorBarChart) {
        charts.errorBarChart.destroy();
    }

    const datasets = [];
    
    for (let i = 0; i < species.length; i++) {
        datasets.push({
            label: species[i],
            data: data[i],
            backgroundColor: colors[i],
            borderColor: colors[i],
            borderWidth: 1,
            errorBars: showErrors ? {
                '+': errors[i],
                '-': errors[i]
            } : undefined
        });
    }

    charts.errorBarChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: seasons,
            datasets: datasets
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '4个树种不同季节的细根生物量'
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '生物量 (g/m²)'
                    }
                }
            }
        }
    });
}