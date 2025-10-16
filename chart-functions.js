// 初始化所有图表
let charts = {};

// 标签切换函数
function showTab(tabName) {
    // 隐藏所有标签内容
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // 移除所有按钮的激活状态
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 显示选中的标签内容
    document.getElementById(tabName).classList.add('active');
    
    // 激活对应的按钮
    event.currentTarget.classList.add('active');
    
    // 调整图表大小
    setTimeout(() => {
        if (charts[tabName + 'Chart']) {
            charts[tabName + 'Chart'].resize();
        }
    }, 100);
}

// 初始化图表
function initCharts() {
    // 初始化所有图表容器
    const chartIds = ['line', 'bar', 'barh', 'area', 'histogram', 'pie', 'scatter', 'box', 'radar', 'errorbar'];
    chartIds.forEach(id => {
        const chartDom = document.getElementById(id + 'Chart');
        if (chartDom) {
            charts[id + 'Chart'] = echarts.init(chartDom);
        }
    });
    
    // 初始化默认图表
    updateLineChart();
    updateBarChart();
    updateBarhChart();
    updateAreaChart();
    updateHistogramChart();
    updatePieChart();
    updateScatterChart();
    updateBoxChart();
    updateRadarChart();
    updateErrorbarChart();
}

// 折线图更新函数
function updateLineChart() {
    const maxTemp = document.getElementById('lineMaxTemp').value.split(',').map(Number);
    const minTemp = document.getElementById('lineMinTemp').value.split(',').map(Number);
    const xData = Array.from({length: maxTemp.length}, (_, i) => i + 1);
    
    const option = {
        title: {
            text: '未来15天温度趋势',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['最高气温', '最低气温'],
            top: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: xData,
            name: '天数'
        },
        yAxis: {
            type: 'value',
            name: '温度(°C)'
        },
        series: [
            {
                name: '最高气温',
                type: 'line',
                data: maxTemp,
                smooth: true,
                lineStyle: {
                    width: 3
                }
            },
            {
                name: '最低气温',
                type: 'line',
                data: minTemp,
                smooth: true,
                lineStyle: {
                    width: 3
                }
            }
        ]
    };
    
    charts.lineChart.setOption(option);
}

// 柱形图更新函数
function updateBarChart() {
    const data = document.getElementById('barData').value.split(',').map(Number);
    const labels = document.getElementById('barLabels').value.split(',');
    
    const option = {
        title: {
            text: '阿里巴巴GMV数据',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: labels,
            axisLabel: {
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
            name: 'GMV(亿元)'
        },
        series: [{
            data: data,
            type: 'bar',
            itemStyle: {
                color: '#5470c6'
            }
        }]
    };
    
    charts.barChart.setOption(option);
}

// 条形图更新函数
function updateBarhChart() {
    const data = document.getElementById('barhData').value.split(',').map(Number);
    const labels = [
        "家政、家教、保姆等生活服务", "飞机票、火车票", "家具", "手机、手机配件",
        "计算机及其配套产品", "汽车用品", "通信充值、游戏充值", "个人护理用品",
        "书报杂志及音像制品", "餐饮、旅游、住宿", "家用电器",
        "食品、饮料、烟酒、保健品", "家庭日杂用品", "保险、演出票务",
        "服装、鞋帽、家用纺织品", "数码产品", "其他商品和服务", "工艺品、收藏品"
    ].slice(0, data.length);
    
    const option = {
        title: {
            text: '各商品种类网购替代率',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            name: '替代率'
        },
        yAxis: {
            type: 'category',
            data: labels,
            axisLabel: {
                interval: 0,
                width: 100,
                overflow: 'break'
            }
        },
        series: [{
            name: '替代率',
            type: 'bar',
            data: data,
            itemStyle: {
                color: '#91cc75'
            }
        }]
    };
    
    charts.barhChart.setOption(option);
}

// 面积图更新函数
function updateAreaChart() {
    const dataA = document.getElementById('areaDataA').value.split(',').map(Number);
    const dataB = document.getElementById('areaDataB').value.split(',').map(Number);
    const dataC = document.getElementById('areaDataC').value.split(',').map(Number);
    const xData = Array.from({length: dataA.length}, (_, i) => i + 1);
    
    const option = {
        title: {
            text: '物流公司物流费用统计',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['公司A', '公司B', '公司C'],
            top: 30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xData,
            name: '月份'
        },
        yAxis: {
            type: 'value',
            name: '费用(万元)'
        },
        series: [
            {
                name: '公司A',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: dataA
            },
            {
                name: '公司B',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: dataB
            },
            {
                name: '公司C',
                type: 'line',
                stack: '总量',
                areaStyle: {},
                data: dataC
            }
        ]
    };
    
    charts.areaChart.setOption(option);
}

// 直方图更新函数
function updateHistogramChart() {
    const data = document.getElementById('histogramData').value.split(',').map(Number);
    const bins = parseInt(document.getElementById('histogramBins').value);
    
    // 计算直方图数据
    const min = Math.min(...data);
    const max = Math.max(...data);
    const binWidth = (max - min) / bins;
    const histogramData = Array(bins).fill(0);
    
    data.forEach(value => {
        const binIndex = Math.min(Math.floor((value - min) / binWidth), bins - 1);
        histogramData[binIndex]++;
    });
    
    const xLabels = Array.from({length: bins}, (_, i) => {
        const start = min + i * binWidth;
        const end = min + (i + 1) * binWidth;
        return `${start.toFixed(0)}-${end.toFixed(0)}`;
    });
    
    const option = {
        title: {
            text: '学生成绩分布直方图',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: xLabels,
            name: '分数区间',
            axisLabel: {
                rotate: 45
            }
        },
        yAxis: {
            type: 'value',
            name: '学生人数'
        },
        series: [{
            data: histogramData,
            type: 'bar',
            itemStyle: {
                color: '#fac858'
            }
        }]
    };
    
    charts.histogramChart.setOption(option);
}

// 饼图更新函数
function updatePieChart() {
    const data = document.getElementById('pieData').value.split(',').map(Number);
    const labels = document.getElementById('pieLabels').value.split(',');
    
    const pieData = data.map((value, index) => ({
        value: value,
        name: labels[index] || `分类${index + 1}`
    }));
    
    const option = {
        title: {
            text: '支付宝月账单分布',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            top: 'middle'
        },
        series: [{
            name: '消费金额',
            type: 'pie',
            radius: '50%',
            data: pieData,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    
    charts.pieChart.setOption(option);
}

// 散点图更新函数
function updateScatterChart() {
    const points = document.getElementById('scatterData').value.split(';').map(pair => {
        const [x, y] = pair.split(',').map(Number);
        return [x, y];
    });
    
    const option = {
        title: {
            text: '汽车速度与制动距离关系',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'value',
            name: '速度(km/h)'
        },
        yAxis: {
            type: 'value',
            name: '制动距离(m)'
        },
        series: [{
            data: points,
            type: 'scatter',
            symbolSize: 10,
            itemStyle: {
                color: '#ee6666'
            }
        }]
    };
    
    charts.scatterChart.setOption(option);
}

// 箱形图更新函数
function updateBoxChart() {
    const data2018 = document.getElementById('boxData2018').value.split(',').map(Number);
    const data2017 = document.getElementById('boxData2017').value.split(',').map(Number);
    
    const option = {
        title: {
            text: '2017-2018年发电量统计',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        xAxis: {
            type: 'category',
            data: ['2018年', '2017年']
        },
        yAxis: {
            type: 'value',
            name: '发电量(亿千瓦时)'
        },
        series: [{
            name: '发电量',
            type: 'boxplot',
            data: [
                {
                    value: data2018,
                    itemStyle: {
                        color: '#73c0de'
                    }
                },
                {
                    value: data2017,
                    itemStyle: {
                        color: '#5470c6'
                    }
                }
            ]
        }]
    };
    
    charts.boxChart.setOption(option);
}

// 雷达图更新函数
function updateRadarChart() {
    const data1 = document.getElementById('radarData1').value.split(',').map(Number);
    const data2 = document.getElementById('radarData2').value.split(',').map(Number);
    const data3 = document.getElementById('radarData3').value.split(',').map(Number);
    
    const indicator = [
        { name: '研究型', max: 1 },
        { name: '艺术型', max: 1 },
        { name: '社会型', max: 1 },
        { name: '企业型', max: 1 },
        { name: '常规型', max: 1 },
        { name: '现实型', max: 1 }
    ];
    
    const option = {
        title: {
            text: '霍兰德职业兴趣测试',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        radar: {
            indicator: indicator
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: data1,
                    name: '测试1',
                    areaStyle: {}
                },
                {
                    value: data2,
                    name: '测试2',
                    areaStyle: {}
                },
                {
                    value: data3,
                    name: '测试3',
                    areaStyle: {}
                }
            ]
        }]
    };
    
    charts.radarChart.setOption(option);
}

// 误差棒图更新函数
function updateErrorbarChart() {
    const data1 = document.getElementById('errorbarData1').value.split(',').map(Number);
    const data2 = document.getElementById('errorbarData2').value.split(',').map(Number);
    const errorData = document.getElementById('errorbarError').value.split(',').map(Number);
    
    const seasons = ['春季', '夏季', '秋季'];
    
    const option = {
        title: {
            text: '细根生物量统计',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: seasons
        },
        yAxis: {
            type: 'value',
            name: '生物量(g)'
        },
        series: [
            {
                name: '树种1',
                type: 'line',
                data: data1,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            },
            {
                name: '树种2',
                type: 'line',
                data: data2,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            }
        ]
    };
    
    charts.errorbarChart.setOption(option);
}

// 重置数据函数
function resetLineData() {
    document.getElementById('lineMaxTemp').value = '32,33,34,34,33,31,30,29,30,29,26,23,21,25,31';
    document.getElementById('lineMinTemp').value = '19,19,20,22,22,21,22,16,18,18,17,14,15,16,16';
    updateLineChart();
}

function resetBarData() {
    document.getElementById('barData').value = '10770,16780,24440,30920,37670,48200,57270';
    document.getElementById('barLabels').value = 'FY2013,FY2014,FY2015,FY2016,FY2017,FY2018,FY2019';
    updateBarChart();
}

function resetBarhData() {
    document.getElementById('barhData').value = '0.959,0.951,0.935,0.924,0.893,0.892,0.865,0.863,0.860,0.856,0.854,0.835,0.826,0.816,0.798,0.765,0.763,0.67';
    updateBarhChart();
}

function resetAreaData() {
    document.getElementById('areaDataA').value = '198,215,245,222,200,236,201,253,236,200,266,290';
    document.getElementById('areaDataB').value = '203,236,200,236,269,216,298,333,301,349,360,368';
    document.getElementById('areaDataC').value = '185,205,226,199,238,200,250,209,246,219,253,288';
    updateAreaChart();
}

function resetHistogramData() {
    document.getElementById('histogramData').value = '62,75,88,59,94,65,72,68,81,84,79,92,76,63,71,69,78,85,90,67,73,88,91,65,72,80,85,62,76,91,88,85,79,68,72,75,83,81,77,90,96,65,74,76,82,85,88,91,73,69';
    document.getElementById('histogramBins').value = '10';
    updateHistogramChart();
}

function resetPieData() {
    document.getElementById('pieData').value = '800,100,1000,200,300,200,200,200';
    document.getElementById('pieLabels').value = '购物,人情往来,餐饮美食,通信物流,生活日用,交通出行,休闲娱乐,其他';
    updatePieChart();
}

function resetScatterData() {
    document.getElementById('scatterData').value = '10,0.5;20,2.0;30,4.4;40,7.9;50,12.3;60,17.7;70,24.1;80,31.5;90,39.9;100,49.2;110,59.5;120,70.8;130,83.1;140,96.4;150,110.7;160,126.0;170,142.2;180,159.4;190,177.6;200,196.8';
    updateScatterChart();
}

function resetBoxData() {
    document.getElementById('boxData2018').value = '5200,5254.5,5283.4,5107.8,5443.3,5550.6,6400.2,6404.9,5483.1,5330.2,5543,6199.9';
    document.getElementById('boxData2017').value = '4605.2,4710.3,5168.9,4767.2,4947,5203,6047.4,5945.5,5219.6,5038.1,5196.3,5698.6';
    updateBoxChart();
}

function resetRadarData() {
    document.getElementById('radarData1').value = '0.40,0.32,0.35,0.30,0.30,0.88';
    document.getElementById('radarData2').value = '0.85,0.35,0.30,0.40,0.40,0.30';
    document.getElementById('radarData3').value = '0.43,0.89,0.30,0.28,0.22,0.30';
    updateRadarChart();
}

function resetErrorbarData() {
    document.getElementById('errorbarData1').value = '2.04,1.57,1.63';
    document.getElementById('errorbarData2').value = '1.69,1.61,1.64';
    document.getElementById('errorbarError').value = '0.16,0.08,0.10,0.27,0.14,0.14';
    updateErrorbarChart();
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    
    // 窗口大小变化时调整图表
    window.addEventListener('resize', function() {
        Object.values(charts).forEach(chart => {
            chart.resize();
        });
    });
});