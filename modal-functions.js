// 模态框相关函数
let currentEditingChart = null;

// 关闭数据编辑器
function closeDataEditor() {
    document.getElementById('dataEditorModal').style.display = 'none';
    document.getElementById('jsonInput').value = '';
    currentEditingChart = null;
}

// 处理文件导入
function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const jsonData = JSON.parse(e.target.result);
            if (currentEditingChart) {
                dataEditor.currentData[currentEditingChart] = { 
                    ...dataEditor.currentData[currentEditingChart], 
                    ...jsonData 
                };
                dataEditor.updateChart(currentEditingChart);
                dataEditor.showDataEditor(currentEditingChart); // 刷新编辑器
                alert('数据导入成功！');
            }
        } catch (error) {
            alert('文件格式错误，请检查JSON格式！');
        }
    };
    reader.readAsText(file);
    
    // 清空文件输入
    event.target.value = '';
}

// 从文本区域导入
function importFromTextarea() {
    const jsonText = document.getElementById('jsonInput').value.trim();
    if (!jsonText) {
        alert('请输入JSON数据！');
        return;
    }
    
    try {
        const jsonData = JSON.parse(jsonText);
        if (currentEditingChart) {
            dataEditor.currentData[currentEditingChart] = { 
                ...dataEditor.currentData[currentEditingChart], 
                ...jsonData 
            };
            dataEditor.updateChart(currentEditingChart);
            dataEditor.showDataEditor(currentEditingChart); // 刷新编辑器
            document.getElementById('jsonInput').value = '';
            alert('数据导入成功！');
        }
    } catch (error) {
        alert('JSON格式错误，请检查格式！');
    }
}

// 重写数据编辑器的显示函数以设置当前编辑的图表
const originalShowDataEditor = dataEditor.showDataEditor;
dataEditor.showDataEditor = function(chartType) {
    currentEditingChart = chartType;
    originalShowDataEditor.call(this, chartType);
};

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('dataEditorModal');
    if (event.target === modal) {
        closeDataEditor();
    }
};