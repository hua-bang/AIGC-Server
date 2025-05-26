import express from 'express';
import cors from 'cors';
import { randomUUID } from 'node:crypto';
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { InitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

// 创建 Express 应用
const app = express();
const PORT = process.env.PORT || 3003;

// 中间件
app.use(cors());
app.use(express.json());

// 存储传输实例的 Map
const transports: { [sessionId: string]: StreamableHTTPServerTransport } = {};

// 检查是否为初始化请求的辅助函数
function isInitializeRequest(body: any): body is InitializeRequest {
  return body && body.method === 'initialize';
}

// 创建 MCP 服务器实例
function createMCPServer(): McpServer {
  const server = new McpServer({
    name: "demo-http-server",
    version: "1.0.0"
  });

  // 添加一个简单的计算工具
  server.tool("add",
    "Add two numbers together",
    {
      a: z.number().describe("First number"),
      b: z.number().describe("Second number")
    },
    async ({ a, b }) => ({
      content: [{
        type: "text",
        text: `计算结果: ${a} + ${b} = ${a + b}`
      }]
    })
  );

  // 添加一个乘法工具
  server.tool("multiply",
    "Multiply two numbers",
    {
      x: z.number().describe("First number"),
      y: z.number().describe("Second number")
    },
    async ({ x, y }) => ({
      content: [{
        type: "text",
        text: `计算结果: ${x} × ${y} = ${x * y}`
      }]
    })
  );

  // 添加一个获取时间的工具
  server.tool("get-time",
    "Get current time",
    {},
    async () => ({
      content: [{
        type: "text",
        text: `当前时间: ${new Date().toLocaleString('zh-CN')}`
      }]
    })
  );

  // 添加一个问候工具
  server.tool("greet",
    "Greet someone",
    {
      name: z.string().describe("Name of the person to greet")
    },
    async ({ name }) => ({
      content: [{
        type: "text",
        text: `你好, ${name}! 欢迎使用 MCP HTTP 服务器! 🎉`
      }]
    })
  );

  // 添加一个静态资源
  server.resource(
    "server-info",
    "server://info",
    { description: "Information about this MCP server" },
    async (uri) => ({
      contents: [{
        uri: uri.href,
        text: JSON.stringify({
          name: "Demo HTTP MCP Server",
          version: "1.0.0",
          transport: "Streamable HTTP",
          capabilities: ["tools", "resources"],
          tools: ["add", "multiply", "get-time", "greet"],
          started: new Date().toISOString()
        }, null, 2),
        mimeType: "application/json"
      }]
    })
  );

  // 添加一个动态资源模板
  server.resource(
    "echo",
    new ResourceTemplate("echo://{message}", { list: undefined }),
    { description: "Echo back a message" },
    async (uri, { message }) => ({
      contents: [{
        uri: uri.href,
        text: `回声: ${message}`,
        mimeType: "text/plain"
      }]
    })
  );

  return server;
}

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    activeSessions: Object.keys(transports).length
  });
});

// 主要的 MCP 端点 - 处理 POST 请求
app.post('/mcp', async (req, res) => {
  try {
    // 检查现有会话ID
    const sessionId = req.headers['mcp-session-id'] as string | undefined;
    let transport: StreamableHTTPServerTransport;

    if (sessionId && transports[sessionId]) {
      // 重用现有传输
      transport = transports[sessionId];
      console.log(`🔄 重用会话: ${sessionId}`);
    } else if (!sessionId && isInitializeRequest(req.body)) {
      // 新的初始化请求
      console.log('🆕 创建新会话...');

      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (sessionId) => {
          // 存储传输实例
          transports[sessionId] = transport;
          console.log(`✅ 会话已创建: ${sessionId}`);
        }
      });

      // 清理传输当关闭时
      transport.onclose = () => {
        if (transport.sessionId) {
          delete transports[transport.sessionId];
          console.log(`🧹 会话已清理: ${transport.sessionId}`);
        }
      };

      // 创建并连接 MCP 服务器
      const server = createMCPServer();
      await server.connect(transport);
    } else {
      // 无效请求
      res.status(400).json({
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: 'Bad Request: 无效的会话ID或初始化请求',
        },
        id: null,
      });
      return;
    }

    // 处理请求
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('❌ 处理 MCP 请求时出错:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

// 处理会话请求的通用函数
const handleSessionRequest = async (req: express.Request, res: express.Response) => {
  const sessionId = req.headers['mcp-session-id'] as string | undefined;

  if (!sessionId || !transports[sessionId]) {
    res.status(400).json({
      error: 'Invalid or missing session ID',
      availableSessions: Object.keys(transports)
    });
    return;
  }

  const transport = transports[sessionId];
  try {
    // 对于 GET 请求，可以尝试建立 SSE 连接
    if (req.method === 'GET') {
      console.log(`🌊 尝试建立 SSE 连接 for session ${sessionId}`);

      // 检查是否支持 SSE（StreamableHTTPServerTransport 内置支持）
      try {
        await transport.handleRequest(req, res);
        console.log(`✅ SSE 连接已建立 for session ${sessionId}`);
      } catch (error) {
        console.log(`❌ SSE 不支持，返回 405:`, error);
        // 如果不支持 SSE，返回 405
        res.status(405).set('Allow', 'POST, DELETE').json({
          jsonrpc: '2.0',
          error: {
            code: -32000,
            message: 'Method Not Allowed: SSE not supported',
          },
          id: null,
        });
      }
    } else {
      // 对于其他请求（DELETE 等）
      await transport.handleRequest(req, res);
    }
  } catch (error) {
    console.error(`❌ 处理会话请求失败 (${sessionId}):`, error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Session request failed' });
    }
  }
};

// 处理 GET 请求 - 用于服务器到客户端的通知
app.get('/mcp', handleSessionRequest);

// 处理 DELETE 请求 - 用于会话终止
app.delete('/mcp', handleSessionRequest);

// 显示服务器状态的端点
app.get('/', (req, res) => {
  res.json({
    name: "Demo HTTP MCP Server",
    version: "1.0.0",
    transport: "Streamable HTTP",
    endpoints: {
      mcp: "/mcp",
      health: "/health",
      status: "/"
    },
    activeSessions: Object.keys(transports).length,
    capabilities: ["tools", "resources"],
    tools: ["add", "multiply", "get-time", "greet"],
    resources: ["server-info", "echo://{message}"],
    documentation: "访问 /mcp 端点来与 MCP 服务器交互"
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 MCP HTTP 服务器已启动!`);
  console.log(`📍 服务器地址: http://localhost:${PORT}`);
  console.log(`🔗 MCP 端点: http://localhost:${PORT}/mcp`);
  console.log(`💚 健康检查: http://localhost:${PORT}/health`);
  console.log(`📊 状态页面: http://localhost:${PORT}/`);
  console.log('');
  console.log('可用工具:');
  console.log('  - add: 两数相加');
  console.log('  - multiply: 两数相乘');
  console.log('  - get-time: 获取当前时间');
  console.log('  - greet: 问候某人');
  console.log('');
  console.log('可用资源:');
  console.log('  - server://info: 服务器信息');
  console.log('  - echo://{message}: 回声消息');
});
