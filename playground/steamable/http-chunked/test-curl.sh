#!/bin/bash

# HTTP/1.1 Chunked Transfer Encoding 测试脚本
# 使用 curl 命令行工具测试各种 chunked 端点

echo "🌊 HTTP/1.1 Chunked Transfer Encoding 测试"
echo "=========================================="
echo ""

# 检查服务器是否运行
echo "📡 检查服务器状态..."
if ! curl -s --connect-timeout 3 http://localhost:3000 > /dev/null; then
    echo "❌ 服务器未运行，请先启动服务器："
    echo "   npm install && npm start"
    exit 1
fi
echo "✅ 服务器运行正常"
echo ""

# 测试基础文本数据流
echo "📝 测试基础文本数据流 (/chunked-data)"
echo "----------------------------------------"
echo "使用 curl 接收分块数据，显示传输过程..."
echo ""
curl -v -N http://localhost:3000/chunked-data 2>&1 | grep -E "(Transfer-Encoding|Chunk|^[<>]|^Chunk)"
echo ""
echo ""

# 测试 JSON 数据流
echo "📊 测试 JSON 数据流 (/chunked-json)"
echo "-----------------------------------"
echo "接收分块 JSON 数据..."
echo ""
curl -s -N http://localhost:3000/chunked-json | jq '.'
echo ""
echo ""

# 测试大数据传输（只显示前几行和统计信息）
echo "🚀 测试大数据传输 (/chunked-large-data)"
echo "--------------------------------------"
echo "传输 100KB 数据，显示传输统计..."
echo ""

# 使用 curl 下载并统计
start_time=$(date +%s)
curl -s -w "传输统计:\n连接时间: %{time_connect}s\n开始传输时间: %{time_starttransfer}s\n总时间: %{time_total}s\n下载大小: %{size_download} bytes\n平均速度: %{speed_download} bytes/s\n" \
     http://localhost:3000/chunked-large-data | head -5
echo "..."
echo "(显示前5行，实际传输了完整的 100KB 数据)"
echo ""

# 显示 HTTP 头信息
echo "🔍 查看 HTTP 响应头"
echo "-------------------"
echo "检查 Transfer-Encoding 头..."
echo ""
curl -I http://localhost:3000/chunked-data 2>/dev/null | grep -E "(HTTP|Transfer-Encoding|Content-Type|Cache-Control)"
echo ""

# 使用 curl 的详细模式显示分块信息
echo "🔬 详细分块传输分析"
echo "-------------------"
echo "使用 curl -v 查看详细的分块传输过程..."
echo ""
echo "命令: curl -v -N http://localhost:3000/chunked-data"
echo "注意观察以下关键信息："
echo "- Transfer-Encoding: chunked"
echo "- 每个数据块的十六进制长度"
echo "- 数据块内容"
echo "- 最后的 0 长度块表示传输结束"
echo ""

# 并发测试
echo "⚡ 并发连接测试"
echo "---------------"
echo "启动 3 个并发连接测试服务器处理能力..."
echo ""

# 启动 3 个后台 curl 进程
for i in {1..3}; do
    echo "启动连接 $i..."
    curl -s http://localhost:3000/chunked-data > /tmp/chunk_test_$i.log &
    pids[$i]=$!
done

# 等待所有进程完成
echo "等待所有连接完成..."
for i in {1..3}; do
    wait ${pids[$i]}
    lines=$(wc -l < /tmp/chunk_test_$i.log)
    echo "连接 $i 完成，接收了 $lines 行数据"
    rm -f /tmp/chunk_test_$i.log
done

echo ""
echo "✅ 所有测试完成！"
echo ""
echo "💡 提示："
echo "1. 在浏览器中访问 http://localhost:3000 查看可视化演示"
echo "2. 使用浏览器开发者工具的网络面板观察分块传输"
echo "3. 尝试在传输过程中刷新页面或关闭连接，观察服务器日志"
echo ""
echo "📚 更多测试命令："
echo "curl -v -N http://localhost:3000/chunked-data     # 查看详细传输过程"
echo "curl -s http://localhost:3000/chunked-json | jq   # 格式化 JSON 输出"
echo "curl -w '%{time_total}\\n' http://localhost:3000/chunked-large-data > /dev/null  # 测试传输时间" 