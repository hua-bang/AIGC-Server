const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 3090;

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  // 设置 CORS 头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);

  // 提供静态文件服务
  if (url.pathname === '/' || url.pathname === '/index.html') {
    const clientPath = path.join(process.cwd(), 'client', 'index.html');
    fs.readFile(clientPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  // Chunked Transfer Encoding 演示端点
  if (url.pathname === '/chunked-data') {
    console.log('Starting chunked transfer...');

    // 设置响应头，启用 chunked transfer encoding
    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    let counter = 0;
    const maxChunks = 10;

    // 模拟数据流，每秒发送一个 chunk
    const interval = setInterval(() => {
      counter++;
      const chunk = `Chunk ${counter}: ${new Date().toISOString()}\n`;

      console.log(`Sending chunk ${counter}: ${chunk.trim()}`);
      res.write(chunk);

      if (counter >= maxChunks) {
        clearInterval(interval);
        res.end('\nAll chunks sent successfully!');
        console.log('Chunked transfer completed');
      }
    }, 1000);

    // 处理客户端断开连接
    req.on('close', () => {
      clearInterval(interval);
      console.log('Client disconnected');
    });

    return;
  }

  // JSON 数据的 chunked 传输演示
  if (url.pathname === '/chunked-json') {
    console.log('Starting chunked JSON transfer...');

    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache'
    });

    // 模拟大型 JSON 数据的分块传输
    const data = {
      status: 'streaming',
      items: []
    };

    // 发送开始部分
    res.write('{"status":"streaming","items":[');

    let itemCount = 0;
    const maxItems = 5;

    const interval = setInterval(() => {
      itemCount++;
      const item = {
        id: itemCount,
        name: `Item ${itemCount}`,
        timestamp: new Date().toISOString(),
        data: `Sample data for item ${itemCount}`
      };

      const itemJson = JSON.stringify(item);
      const chunk = itemCount === 1 ? itemJson : ',' + itemJson;

      console.log(`Sending JSON chunk ${itemCount}`);
      res.write(chunk);

      if (itemCount >= maxItems) {
        clearInterval(interval);
        res.end(']}');
        console.log('Chunked JSON transfer completed');
      }
    }, 1500);

    req.on('close', () => {
      clearInterval(interval);
      console.log('Client disconnected from JSON stream');
    });

    return;
  }

  // 大文件的 chunked 传输演示
  if (url.pathname === '/chunked-large-data') {
    console.log('Starting large data chunked transfer...');

    res.writeHead(200, {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked',
      'Cache-Control': 'no-cache'
    });

    // 模拟大量数据的分块传输
    let bytesSent = 0;
    const totalBytes = 1024 * 100; // 100KB
    const chunkSize = 1024; // 1KB per chunk

    const sendChunk = () => {
      if (bytesSent >= totalBytes) {
        res.end('\n--- Transfer Complete ---');
        console.log(`Large data transfer completed: ${bytesSent} bytes sent`);
        return;
      }

      const remainingBytes = Math.min(chunkSize, totalBytes - bytesSent);
      const chunk = 'x'.repeat(remainingBytes) + '\n';

      res.write(chunk);
      bytesSent += remainingBytes;

      console.log(`Sent ${bytesSent}/${totalBytes} bytes`);

      // 使用 setImmediate 来避免阻塞事件循环
      setImmediate(sendChunk);
    };

    sendChunk();

    req.on('close', () => {
      console.log('Client disconnected from large data stream');
    });

    return;
  }

  // 404 处理
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log(`🚀 HTTP Chunked Transfer Encoding Demo Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving client files from ./client/`);
  console.log(`🔗 Available endpoints:`);
  console.log(`   GET /                    - Client demo page`);
  console.log(`   GET /chunked-data        - Basic chunked text data`);
  console.log(`   GET /chunked-json        - Chunked JSON data`);
  console.log(`   GET /chunked-large-data  - Large data chunked transfer`);
});

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
