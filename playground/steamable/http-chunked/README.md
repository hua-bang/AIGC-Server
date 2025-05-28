# HTTP/1.1 Chunked Transfer Encoding 演示

这是一个完整的 HTTP/1.1 Chunked Transfer Encoding 演示项目，展示了如何在服务端和客户端实现分块传输编码。

## 🌟 特性

- **实时文本流传输** - 演示基础的分块数据传输
- **JSON 数据流** - 展示如何分块传输 JSON 数据
- **大文件传输** - 模拟大量数据的高效分块传输
- **现代化 UI** - 美观的用户界面，实时显示传输状态
- **完整的错误处理** - 包含连接中断、错误恢复等处理
- **性能监控** - 实时显示传输速度、进度等统计信息

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 启动生产服务器

```bash
npm start
```

服务器将在 `http://localhost:3000` 启动。

## 📖 API 端点

### GET /
- 返回客户端演示页面

### GET /chunked-data
- **描述**: 基础文本数据的分块传输
- **响应类型**: `text/plain`
- **传输编码**: `chunked`
- **行为**: 每秒发送一个文本块，总共 10 个块

### GET /chunked-json
- **描述**: JSON 数据的分块传输
- **响应类型**: `application/json`
- **传输编码**: `chunked`
- **行为**: 分块构建 JSON 对象，包含 5 个项目

### GET /chunked-large-data
- **描述**: 大数据量的分块传输
- **响应类型**: `text/plain`
- **传输编码**: `chunked`
- **行为**: 传输 100KB 数据，每块 1KB

## 🔧 技术实现

### 服务端 (Node.js + TypeScript)

服务端使用原生 Node.js HTTP 模块实现，关键特性：

1. **设置 Transfer-Encoding 头**:
   ```typescript
   res.writeHead(200, {
     'Transfer-Encoding': 'chunked',
     'Content-Type': 'text/plain'
   });
   ```

2. **分块发送数据**:
   ```typescript
   res.write(chunk); // 发送数据块
   res.end();        // 结束传输
   ```

3. **错误处理**:
   ```typescript
   req.on('close', () => {
     // 处理客户端断开连接
   });
   ```

### 客户端 (Vanilla JavaScript)

客户端使用现代 Fetch API 和 ReadableStream：

1. **创建请求**:
   ```javascript
   const response = await fetch('/chunked-data');
   const reader = response.body.getReader();
   ```

2. **读取数据流**:
   ```javascript
   while (true) {
     const { done, value } = await reader.read();
     if (done) break;
     // 处理接收到的数据块
   }
   ```

3. **取消请求**:
   ```javascript
   const controller = new AbortController();
   fetch(url, { signal: controller.signal });
   controller.abort(); // 取消请求
   ```

## 🎯 使用场景

Chunked Transfer Encoding 适用于以下场景：

1. **实时数据流** - 聊天应用、实时日志、股票价格等
2. **大文件传输** - 在不知道文件大小的情况下传输大文件
3. **动态内容生成** - 服务端渲染、数据库查询结果等
4. **流式 API 响应** - AI 模型输出、搜索结果等

## 📊 性能优势

- **内存效率**: 不需要将整个响应加载到内存中
- **用户体验**: 用户可以立即看到部分内容，无需等待完整响应
- **网络利用**: 可以在生成内容的同时传输数据
- **错误恢复**: 可以在传输过程中处理错误

## 🛠️ 开发

### 项目结构

```
http-chunked/
├── server/
│   └── index.ts          # 服务端代码
├── client/
│   └── index.html        # 客户端页面
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript 配置
└── README.md            # 项目文档
```

### 开发命令

- `npm run dev` - 启动开发服务器（支持热重载）
- `npm run build` - 构建 TypeScript 代码
- `npm start` - 启动生产服务器

## 🔍 调试

### 查看 HTTP 头

使用浏览器开发者工具的网络面板，可以看到：

```
Transfer-Encoding: chunked
Content-Type: text/plain
Cache-Control: no-cache
Connection: keep-alive
```

### 服务器日志

服务器会输出详细的日志信息：

```
🚀 HTTP Chunked Transfer Encoding Demo Server running on http://localhost:3000
Starting chunked transfer...
Sending chunk 1: Chunk 1: 2024-01-01T12:00:00.000Z
Sending chunk 2: Chunk 2: 2024-01-01T12:00:01.000Z
...
Chunked transfer completed
```

## 📚 相关资源

- [RFC 7230 - HTTP/1.1 Message Syntax and Routing](https://tools.ietf.org/html/rfc7230#section-4.1)
- [MDN - Transfer-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Transfer-Encoding)
- [Node.js HTTP Documentation](https://nodejs.org/api/http.html)
- [Fetch API - ReadableStream](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream)

## �� 许可证

MIT License 