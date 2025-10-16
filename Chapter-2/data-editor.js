// 数据编辑器功能
class DataEditor {
    constructor() {
        this.currentData = {};
        this.initializeDefaultData();
    }

    // 初始化默认数据
    initializeDefaultData() {
        this.currentData = {
            lineChart: {
                days: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
                maxTemp: [32, 33, 34, 34, 33, 31, 30, 29, 30, 29, 26, 23, 21, 25, 31],
                minTemp: [19, 19, 20, 22, 22, 21, 22, 16, 18, 18, 17, 14, 15, 16, 16]
            },
            barChart: {
                labels: ["FY2013", "FY2014", "FY2015", "FY2016", "FY2017", "FY2018", "FY2019"],
                gmvData: [10770, 16780, 24440, 30920, 37670, 48200, 57270]
            },
            horizontalBar: {
                labels: [
                    "家政、家教、保姆等生活服务", "飞机票、火车票", "家具", "手机、手机配件",
                    "计算机及其配套产品", "汽车用品", "通信充值、游戏充值", "个人护理用品",
                    "书报杂志及音像制品", "餐饮、旅游、住宿", "家用电器",
                    "食品、饮料、烟酒、保健品", "家庭日杂用品", "保险、演出票务",
                    "服装、鞋帽、家用纺织品", "数码产品", "其他商品和服务", "工艺品、收藏品"
                ],
                data: [0.959, 0.951, 0.935, 0.924, 0.893, 0.892, 0.865, 0.863, 
                       0.860, 0.856, 0.854, 0.835, 0.826, 0.816, 0.798, 0.765, 0.763, 0.67]
            },
            areaChart: {
                months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                companyA: [198, 215, 245, 222, 200, 236, 201, 253, 236, 200, 266, 290],
                companyB: [203, 236, 200, 236, 269, 216, 298, 333, 301, 349, 360, 368],
                companyC: [185, 205, 226, 199, 238, 200, 250, 209, 246, 219, 253, 288]
            },
            pieChart: {
                labels: ['购物', '人情往来', '餐饮美食', '通信物流', '生活日用', '交通出行', '休闲娱乐', '其他'],
                data: [800, 100, 1000, 200, 300, 200, 200, 200]
            },
            radarChart: {
                labels: ['研究型(I)', '艺术型(A)', '社会型(S)', '企业型(E)', '传统型(C)', '现实型(R)'],
                data: [
                    [0.40, 0.32, 0.35, 0.30, 0.30, 0.88],
                    [0.85, 0.35, 0.30, 0.40, 0.40, 0.30],
                    [0.43, 0.89, 0.30, 0.28, 0.22, 0.30],
                    [0.30, 0.25, 0.48, 0.85, 0.45, 0.40],
                    [0.20, 0.38, 0.87, 0.45, 0.32, 0.28],
                    [0.34, 0.31, 0.38, 0.40, 0.92, 0.28]
                ]
            },
            errorBar: {
                seasons: ['春季', '夏季', '秋季'],
                species: ['树种1', '树种2', '树种3', '树种4'],
                data: [
                    [2.04, 1.57, 1.63],
                    [1.69, 1.61, 1.64],
                    [4.65, 4.99, 4.94],
                    [3.39, 2.33, 4.10]
                ],
                errors: [
                    [0.16, 0.08, 0.10],
                    [0.27, 0.14, 0.14],
                    [0.34, 0.32, 0.29],
                    [0.23, 0.23, 0.39]
                ]
            }
        };
    }

    // 创建数据编辑表格
    createDataTable(chartType, dataKey, data, isLabels = false) {
        const container = document.createElement('div');
        container.className = 'data-table-container';
        
        const title = document.createElement('h4');
        title.textContent = isLabels ? '标签数据' : '数值数据';
        container.appendChild(title);

        const table = document.createElement('table');
        table.className = 'data-table';
        
        // 创建表头
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>索引</th><th>值</th><th>操作</th>';
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // 创建表体
        const tbody = document.createElement('tbody');
        data.forEach((value, index) => {
            const row = this.createDataRow(chartType, dataKey, index, value, isLabels);
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // 添加新行按钮
        const addButton = document.createElement('button');
        addButton.textContent = '添加新行';
        addButton.className = 'add-row-btn';
        addButton.onclick = () => this.addNewRow(chartType, dataKey, tbody, isLabels);

        container.appendChild(table);
        container.appendChild(addButton);
        
        return container;
    }

    // 创建数据行
    createDataRow(chartType, dataKey, index, value, isLabels) {
        const row = document.createElement('tr');
        
        const indexCell = document.createElement('td');
        indexCell.textContent = index;
        
        const valueCell = document.createElement('td');
        const input = document.createElement('input');
        input.type = isLabels ? 'text' : 'number';
        input.value = value;
        input.step = isLabels ? undefined : '0.01';
        input.onchange = () => this.updateData(chartType, dataKey, index, input.value, isLabels);
        valueCell.appendChild(input);
        
        const actionCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '删除';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => this.deleteRow(chartType, dataKey, index, row);
        actionCell.appendChild(deleteBtn);
        
        row.appendChild(indexCell);
        row.appendChild(valueCell);
        row.appendChild(actionCell);
        
        return row;
    }

    // 更新数据
    updateData(chartType, dataKey, index, value, isLabels) {
        if (!this.currentData[chartType] || !this.currentData[chartType][dataKey]) return;
        
        if (isLabels) {
            this.currentData[chartType][dataKey][index] = value;
        } else {
            this.currentData[chartType][dataKey][index] = parseFloat(value) || 0;
        }
        
        // 触发图表更新
        this.updateChart(chartType);
    }

    // 添加新行
    addNewRow(chartType, dataKey, tbody, isLabels) {
        const data = this.currentData[chartType][dataKey];
        const newIndex = data.length;
        const newValue = isLabels ? `新项目${newIndex + 1}` : 0;
        
        data.push(newValue);
        
        const newRow = this.createDataRow(chartType, dataKey, newIndex, newValue, isLabels);
        tbody.appendChild(newRow);
        
        this.updateChart(chartType);
    }

    // 删除行
    deleteRow(chartType, dataKey, index, rowElement) {
        if (this.currentData[chartType][dataKey].length <= 1) {
            alert('至少需要保留一行数据！');
            return;
        }
        
        this.currentData[chartType][dataKey].splice(index, 1);
        rowElement.remove();
        
        // 重新编号
        const tbody = rowElement.parentNode;
        Array.from(tbody.children).forEach((row, newIndex) => {
            row.children[0].textContent = newIndex;
        });
        
        this.updateChart(chartType);
    }

    // 更新图表
    updateChart(chartType) {
        switch(chartType) {
            case 'lineChart':
                updateLineChartWithData();
                break;
            case 'barChart':
                updateBarChartWithData();
                break;
            case 'horizontalBar':
                updateHorizontalBarWithData();
                break;
            case 'areaChart':
                updateAreaChartWithData();
                break;
            case 'pieChart':
                updatePieChartWithData();
                break;
            case 'radarChart':
                updateRadarChartWithData();
                break;
            case 'errorBar':
                updateErrorBarChartWithData();
                break;
        }
    }

    // 显示数据编辑器
    showDataEditor(chartType) {
        const modal = document.getElementById('dataEditorModal');
        const content = document.getElementById('dataEditorContent');
        
        content.innerHTML = '';
        
        const title = document.createElement('h3');
        title.textContent = `编辑 ${this.getChartTitle(chartType)} 数据`;
        content.appendChild(title);
        
        const data = this.currentData[chartType];
        
        // 根据图表类型创建相应的编辑界面
        switch(chartType) {
            case 'lineChart':
                content.appendChild(this.createDataTable(chartType, 'maxTemp', data.maxTemp));
                content.appendChild(this.createDataTable(chartType, 'minTemp', data.minTemp));
                break;
            case 'barChart':
                content.appendChild(this.createDataTable(chartType, 'labels', data.labels, true));
                content.appendChild(this.createDataTable(chartType, 'gmvData', data.gmvData));
                break;
            case 'horizontalBar':
                content.appendChild(this.createDataTable(chartType, 'labels', data.labels, true));
                content.appendChild(this.createDataTable(chartType, 'data', data.data));
                break;
            case 'areaChart':
                content.appendChild(this.createDataTable(chartType, 'companyA', data.companyA));
                content.appendChild(this.createDataTable(chartType, 'companyB', data.companyB));
                content.appendChild(this.createDataTable(chartType, 'companyC', data.companyC));
                break;
            case 'pieChart':
                content.appendChild(this.createDataTable(chartType, 'labels', data.labels, true));
                content.appendChild(this.createDataTable(chartType, 'data', data.data));
                break;
        }
        
        modal.style.display = 'block';
    }

    // 获取图表标题
    getChartTitle(chartType) {
        const titles = {
            'lineChart': '折线图',
            'barChart': '柱形图',
            'horizontalBar': '条形图',
            'areaChart': '堆积面积图',
            'pieChart': '饼图',
            'radarChart': '雷达图',
            'errorBar': '误差棒图'
        };
        return titles[chartType] || '图表';
    }

    // 导入数据
    importData(chartType, jsonData) {
        try {
            const data = JSON.parse(jsonData);
            this.currentData[chartType] = { ...this.currentData[chartType], ...data };
            this.updateChart(chartType);
            alert('数据导入成功！');
        } catch (error) {
            alert('数据格式错误，请检查JSON格式！');
        }
    }

    // 导出数据
    exportData(chartType) {
        const data = this.currentData[chartType];
        const jsonString = JSON.stringify(data, null, 2);
        
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${chartType}_data.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    // 重置数据
    resetData(chartType) {
        if (confirm('确定要重置为默认数据吗？')) {
            this.initializeDefaultData();
            this.updateChart(chartType);
            alert('数据已重置！');
        }
    }
}

// 创建全局数据编辑器实例
const dataEditor = new DataEditor();