# PowerShell Web Server Script
$port = 8000
$url = "http://localhost:$port"

# 创建HTTP监听器
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("$url/")
$listener.Start()

Write-Host "Web server started at: $url" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop server" -ForegroundColor Yellow

# 启动浏览器
Start-Process $url

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        # 获取请求的文件路径
        $localPath = $request.Url.LocalPath
        if ($localPath -eq "/") {
            $localPath = "/index.html"
        }
        
        $filePath = Join-Path $PWD $localPath.TrimStart('/')
        
        if (Test-Path $filePath) {
            # 设置内容类型
            $extension = [System.IO.Path]::GetExtension($filePath)
            switch ($extension) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css" { $response.ContentType = "text/css" }
                ".js" { $response.ContentType = "application/javascript" }
                ".json" { $response.ContentType = "application/json" }
                default { $response.ContentType = "text/plain" }
            }
            
            # 读取并发送文件内容
            $content = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            # 404 错误
            $response.StatusCode = 404
            $errorContent = [System.Text.Encoding]::UTF8.GetBytes("404 - File Not Found")
            $response.ContentLength64 = $errorContent.Length
            $response.OutputStream.Write($errorContent, 0, $errorContent.Length)
        }
        
        $response.Close()
    }
} catch {
    Write-Host "Server error: $_" -ForegroundColor Red
} finally {
    $listener.Stop()
    Write-Host "Server stopped" -ForegroundColor Red
}