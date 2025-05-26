# MCP 传输方式支持

本项目现在支持多种 MCP (Model Context Protocol) 传输方式，可以根据不同的使用场景选择合适的传输方式。

## 支持的传输方式

### 1. stdio 传输（StdioClientTransport）

**适用场景：**
- 本地命令行工具
- 子进程通信
- 开发和测试环境

**配置示例：**
```typescript
import { TransportType } from './src/mcp-client';

const stdioConfig = {
  name: 'weather-stdio',
  transportType: TransportType.STDIO,
  command: 'node',
  args: ['../weather/build/index.js'],
  env: {
    API_KEY: process.env.API_KEY
  }
};
```

**特点：**
- ✅ 简单直接的进程间通信
- ✅ 适合本地工具集成
- ✅ 低延迟
- ❌ 仅限本地使用

### 2. Streamable HTTP 传输（StreamableHTTPClientTransport）

**适用场景：**
- 远程 MCP 服务器
- Web 应用集成
- 微服务架构
- 生产环境部署

**配置示例：**
```typescript
import { TransportType } from './src/mcp-client';

const httpConfig = {
  name: 'weather-http',
  transportType: TransportType.HTTP,
  url: 'http://localhost:3000/mcp'
};
```

**特点：**
- ✅ 支持远程服务器
- ✅ 支持流式传输
- ✅ 支持会话管理
- ✅ 适合生产环境
- ✅ 支持负载均衡
- ❌ 网络延迟较高

## 使用方法

### 基本用法

```typescript
import { MCPClientManager, TransportType } from './src/mcp-client';

const manager = new MCPClientManager();

// 添加 stdio 客户端
manager.addClient('local-weather', {
  name: 'local-weather',
  transportType: TransportType.STDIO,
  command: 'weather-server',
  args: ['--port', '8080']
});

// 添加 HTTP 客户端
manager.addClient('remote-weather', {
  name: 'remote-weather',
  transportType: TransportType.HTTP,
  url: 'https://api.weather.com/mcp'
});

// 连接所有客户端
await manager.connectAll();

// 使用特定传输方式调用工具
const result = await manager.callTool('remote-weather', 'get-forecast', {
  location: 'San Francisco'
});
```

### 在 MCPHost 中使用

```typescript
import { MCPHost } from './src/mcp-host';
import { TransportType } from './src/mcp-client';

const host = new MCPHost({
  openaiApiKey: 'your-api-key',
  servers: {
    // 本地工具
    'local-tools': {
      name: 'local-tools',
      transportType: TransportType.STDIO,
      command: 'mcp-tools',
      args: ['--config', 'tools.json']
    },
    
    // 远程服务
    'cloud-services': {
      name: 'cloud-services',
      transportType: TransportType.HTTP,
      url: 'https://mcp.yourservice.com/api'
    }
  }
});

await host.initialize();
```

## 错误处理与重连

### 连接错误处理

```typescript
try {
  await client.connect();
} catch (error) {
  if (error.message.includes('connection refused')) {
    console.log('服务器未启动，尝试使用备用服务器');
    // 切换到备用传输方式
  }
}
```

### 自动降级

可以实现客户端自动从 HTTP 降级到 stdio 的逻辑：

```typescript
async function createResilientClient(name: string, httpUrl: string, stdioCommand: string) {
  try {
    // 首先尝试 HTTP 传输
    const httpClient = new MCPClient({
      name: name,
      transportType: TransportType.HTTP,
      url: httpUrl
    });
    
    await httpClient.connect();
    return httpClient;
  } catch (error) {
    console.log('HTTP 连接失败，降级到 stdio');
    
    // 降级到 stdio 传输
    const stdioClient = new MCPClient({
      name: name,
      transportType: TransportType.STDIO,
      command: stdioCommand
    });
    
    await stdioClient.connect();
    return stdioClient;
  }
}
```

## 性能考虑

### stdio vs HTTP 性能对比

| 特性 | stdio | HTTP |
|------|-------|------|
| 延迟 | 极低 (~1ms) | 中等 (~10-100ms) |
| 吞吐量 | 高 | 中等 |
| 资源消耗 | 低 | 中等 |
| 并发能力 | 受限于进程 | 高 |
| 扩展性 | 本地限制 | 无限扩展 |

### 选择建议

- **开发阶段**：优先使用 stdio，调试方便
- **生产环境**：使用 HTTP，支持分布式部署
- **混合场景**：本地工具用 stdio，远程服务用 HTTP

## 调试技巧

### 启用调试日志

```typescript
// 在环境变量中设置
process.env.MCP_DEBUG = 'true';

// 或在代码中启用
import { setDebugMode } from './src/mcp-client';
setDebugMode(true);
```

### 查看连接状态

```typescript
console.log('连接状态:', manager.getConnectionStatus());
// 输出: { 'local-weather': true, 'remote-weather': false }
```

## 常见问题

### Q: HTTP 传输连接失败怎么办？
A: 检查 URL 是否正确，服务器是否启动，防火墙设置等。

### Q: stdio 传输找不到命令？
A: 确保命令在 PATH 中，或使用绝对路径。

### Q: 如何实现负载均衡？
A: 使用多个 HTTP 传输配置，实现客户端负载均衡逻辑。

## 更多信息

- [MCP 官方文档](https://modelcontextprotocol.io/)
- [传输协议规范](https://modelcontextprotocol.io/docs/concepts/transports)
- [TypeScript SDK 文档](https://github.com/modelcontextprotocol/typescript-sdk) 