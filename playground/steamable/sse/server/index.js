const express = require('express');
const app = express();
const cors = require('cors');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/sse', (req, res) => {
  // 添加CORS头部
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', "no-cache");
  res.setHeader('Connection', 'keep-alive');

  let messageId = 1;

  // 发送初始连接信息，包含 retry 参数
  res.write('retry: 3000\n'); // 客户端重连间隔 3 秒
  res.write('id: 0\n');
  res.write('event: connection\n');
  res.write('data: {"message": "Connected to SSE server", "timestamp": "' + new Date().toISOString() + '"}\n\n');

  // 定期发送不同类型的事件
  const interval = setInterval(() => {
    // 发送心跳事件
    if (messageId % 3 === 0) {
      res.write(`id: ${messageId}\n`);
      res.write('event: heartbeat\n');
      res.write(`data: {"type": "heartbeat", "timestamp": "${new Date().toISOString()}"}\n\n`);
    }
    // 发送数据更新事件
    else if (messageId % 3 === 1) {
      res.write(`id: ${messageId}\n`);
      res.write('event: data-update\n');
      res.write(`data: {"type": "update", "value": ${Math.random()}, "timestamp": "${new Date().toISOString()}"}\n\n`);
    }
    // 发送默认消息事件（不指定 event 类型）
    else {
      res.write(`id: ${messageId}\n`);
      res.write(`data: Hello World ${new Date().toISOString()}\n\n`);
    }

    messageId++;

    // 每 10 条消息发送一次特殊事件
    if (messageId % 10 === 0) {
      res.write(`id: ${messageId}\n`);
      res.write('event: milestone\n');
      res.write(`data: {"message": "Reached message ${messageId}", "timestamp": "${new Date().toISOString()}"}\n\n`);
      messageId++;
    }
  }, 2000);

  res.on('close', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
})


// 支持跨域
app.use(cors());

app.listen(3050, () => {
  console.log('Server is running on port 3050');
});