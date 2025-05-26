# MCP HTTP Server Demo

这是一个简单的 Streamable HTTP MCP (Model Context Protocol) 服务器示例，展示了如何创建基于 HTTP 的 MCP 服务器。

## 功能特性

- ✅ **Streamable HTTP 传输** - 支持最新的 MCP 传输协议
- ✅ **会话管理** - 支持多客户端并发连接
- ✅ **工具系统** - 提供多个示例工具
- ✅ **资源系统** - 支持静态和动态资源
- ✅ **健康检查** - 内置监控端点
- ✅ **CORS 支持** - 支持跨域请求

## 快速开始

### 1. 安装依赖

```bash
cd playground/mcp-server-demo
npm install
```

### 2. 构建项目

```bash
npm run build
```

### 3. 启动服务器

```bash
npm start
```

服务器将在 `http://localhost:3000` 启动。

### 4. 开发模式

```bash
npm run dev
```

这会启动 TypeScript 监听模式和自动重启。

## API 端点

### 主要端点

- **POST/GET/DELETE `/mcp`** - MCP 协议端点
- **GET `/`** - 服务器状态和文档
- **GET `/health`** - 健康检查

### 使用示例

#### 查看服务器状态
```bash
curl http://localhost:3000/
```

#### 健康检查
```bash
curl http://localhost:3000/health
```

## 可用工具

### 1. add - 两数相加
```json
{
  "name": "add",
  "description": "Add two numbers together",
  "parameters": {
    "a": "number - First number",
    "b": "number - Second number"
  }
}
```

### 2. multiply - 两数相乘  
```json
{
  "name": "multiply", 
  "description": "Multiply two numbers",
  "parameters": {
    "x": "number - First number",
    "y": "number - Second number"
  }
}
```

### 3. get-time - 获取当前时间
```json
{
  "name": "get-time",
  "description": "Get current time",
  "parameters": {}
}
```

### 4. greet - 问候某人
```json
{
  "name": "greet",
  "description": "Greet someone", 
  "parameters": {
    "name": "string - Name of the person to greet"
  }
}
```

## 可用资源

### 1. 服务器信息
- **URI**: `server://info`
- **描述**: 获取服务器详细信息
- **格式**: JSON

### 2. 回声消息
- **URI**: `echo://{message}`
- **描述**: 回声指定消息
- **格式**: 纯文本
- **示例**: `echo://Hello%20World`

## 在 MCP 客户端中使用

### 配置 MCP 客户端

在你的 `mcp-config.json` 中添加：

```json
{
  "servers": {
    "demo-http-server": {
      "name": "demo-http-server",
      "transportType": "http",
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

### 在 MCP Host Demo 中测试

1. 启动 HTTP 服务器：
   ```bash
   cd playground/mcp-server-demo
   npm start
   ```

2. 修改 `mcp-host-demo` 的配置：
   ```json
   {
     "servers": {
       "demo-http": {
         "name": "demo-http",
         "transportType": "http", 
         "url": "http://localhost:3000/mcp"
       }
     }
   }
   ```

3. 运行 MCP 客户端：
   ```bash
   cd ../mcp-host-demo
   npm start
   ```

## 架构说明

### 会话管理

服务器使用会话ID来管理多个客户端连接：

1. 客户端发送初始化请求（不带会话ID）
2. 服务器创建新会话并返回会话ID
3. 后续请求必须包含会话ID头：`mcp-session-id`

### 传输流程

```
客户端                    HTTP服务器
  |                          |
  |-- POST /mcp (初始化) ---->|
  |<-- 会话ID + 初始化响应 ----|
  |                          |
  |-- POST /mcp (工具调用) -->|
  |<-- 工具响应 --------------|
  |                          |
  |-- GET /mcp (获取通知) --->|
  |<-- SSE 流 ---------------|
  |                          |
  |-- DELETE /mcp (关闭) ---->|
  |<-- 确认 ------------------|
```

### 错误处理

服务器提供详细的错误信息：

- **400 Bad Request** - 无效的会话ID或请求格式
- **500 Internal Server Error** - 服务器内部错误
- **404 Not Found** - 会话不存在

## 扩展示例

### 添加新工具

```typescript
server.tool("weather",
  "Get weather information",
  {
    city: z.string().describe("City name")
  },
  async ({ city }) => {
    // 实现天气查询逻辑
    return {
      content: [{
        type: "text",
        text: `${city} 的天气是晴朗的`
      }]
    };
  }
);
```

### 添加新资源

```typescript
server.resource(
  "config",
  "config://app",
  "Application configuration",
  async (uri) => ({
    contents: [{
      uri: uri.href,
      text: JSON.stringify(appConfig, null, 2),
      mimeType: "application/json"
    }]
  })
);
```

## 部署

### Docker 部署

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### 环境变量

- `PORT` - 服务器端口（默认：3000）
- `NODE_ENV` - 环境模式（development/production）

## 故障排查

### 常见问题

1. **端口被占用**
   ```bash
   # 查找占用端口的进程
   lsof -i :3000
   # 或修改端口
   PORT=3001 npm start
   ```

2. **CORS 错误**
   - 确保客户端域名在 CORS 配置中
   - 检查请求头设置

3. **会话丢失**
   - 检查客户端是否正确发送会话ID头
   - 查看服务器日志了解会话创建情况

### 调试模式

启用详细日志：

```bash
DEBUG=mcp:* npm start
```

## 更多资源

- [MCP 官方文档](https://modelcontextprotocol.io/)
- [Streamable HTTP 规范](https://modelcontextprotocol.io/docs/concepts/transports)
- [TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) 