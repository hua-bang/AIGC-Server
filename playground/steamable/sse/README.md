# Server-Sent Events (SSE) 完整示例

这个示例展示了 SSE 的完整功能，包括所有可用的参数和事件类型。

## SSE 格式说明

SSE 消息格式由以下字段组成，每个字段占一行，以 `字段名: 值` 的格式：

### 1. `data` - 数据字段
```
data: Hello World
data: {"message": "JSON data", "timestamp": "2023-12-01T10:00:00Z"}
```
- 包含实际要发送的数据
- 可以是纯文本或 JSON 字符串
- 可以有多行 `data` 字段，客户端会自动合并

### 2. `id` - 消息标识符
```
id: 123
data: Some message
```
- 为每条消息分配唯一标识符
- 用于断线重连时的消息恢复
- 客户端可以通过 `event.lastEventId` 获取

### 3. `event` - 事件类型
```
event: heartbeat
data: {"type": "ping"}
```
- 指定事件类型，客户端可以监听特定事件
- 如果不指定，默认触发 `onmessage` 事件
- 客户端使用 `addEventListener(eventType, handler)` 监听

### 4. `retry` - 重连间隔
```
retry: 3000
```
- 设置客户端重连间隔时间（毫秒）
- 只需要发送一次，客户端会记住这个值
- 默认值通常是 3000ms（3秒）

### 5. 消息结束标记
每条完整的 SSE 消息必须以两个换行符 `\n\n` 结束。

## 完整的 SSE 消息示例

```
retry: 3000
id: 1
event: user-login
data: {"userId": 123, "username": "john_doe", "timestamp": "2023-12-01T10:00:00Z"}

```

## 服务器端实现要点

### 1. 设置正确的 HTTP 头
```javascript
res.setHeader('Content-Type', 'text/event-stream');
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('Connection', 'keep-alive');
res.setHeader('Access-Control-Allow-Origin', '*'); // CORS
```

### 2. 发送不同类型的事件
```javascript
// 连接事件
res.write('retry: 3000\n');
res.write('id: 0\n');
res.write('event: connection\n');
res.write('data: {"message": "Connected"}\n\n');

// 心跳事件
res.write('id: 1\n');
res.write('event: heartbeat\n');
res.write('data: {"type": "ping"}\n\n');

// 数据更新事件
res.write('id: 2\n');
res.write('event: data-update\n');
res.write('data: {"value": 42}\n\n');

// 默认消息（不指定 event）
res.write('id: 3\n');
res.write('data: Hello World\n\n');
```

## 客户端实现要点

### 1. 创建 EventSource 连接
```javascript
const eventSource = new EventSource('http://localhost:3050/sse');
```

### 2. 监听默认消息
```javascript
eventSource.onmessage = (event) => {
  console.log('Message ID:', event.lastEventId);
  console.log('Data:', event.data);
};
```

### 3. 监听特定事件类型
```javascript
eventSource.addEventListener('heartbeat', (event) => {
  console.log('Heartbeat received:', event.data);
});

eventSource.addEventListener('data-update', (event) => {
  const data = JSON.parse(event.data);
  console.log('Data update:', data);
});
```

### 4. 处理连接状态
```javascript
eventSource.onopen = () => {
  console.log('Connected');
};

eventSource.onerror = (event) => {
  console.log('Error or reconnecting...');
};
```

## 运行示例

1. 启动服务器：
```bash
cd server
node index.js
```

2. 打开客户端：
```bash
cd client
# 用浏览器打开 index.html
open index.html
```

## 事件类型说明

本示例包含以下事件类型：

- **connection**: 连接建立时发送
- **heartbeat**: 定期心跳检测
- **data-update**: 数据更新通知
- **milestone**: 里程碑事件
- **默认消息**: 不指定事件类型的普通消息

## 最佳实践

1. **消息 ID 管理**: 使用递增的数字作为消息 ID
2. **事件类型**: 为不同类型的数据使用不同的事件类型
3. **错误处理**: 客户端应该处理连接错误和重连
4. **资源清理**: 服务器端应该在客户端断开时清理定时器
5. **CORS 设置**: 跨域访问时需要正确设置 CORS 头

## 浏览器兼容性

SSE 在现代浏览器中都有很好的支持：
- Chrome 6+
- Firefox 6+
- Safari 5+
- Edge 79+
- IE 不支持（可以使用 polyfill） 