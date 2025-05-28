const express = require('express');
const app = express();

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

  res.write('data: Hello World\n\n');

  setInterval(() => {
    res.write(`data: Hello World ${new Date().toISOString()}\n\n`);
  }, 1000);

  res.on('close', () => {
    console.log('Client disconnected');
  });
})

// 处理预检请求
app.options('/sse', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.status(200).end();
});

app.listen(3050, () => {
  console.log('Server is running on port 3050');
});