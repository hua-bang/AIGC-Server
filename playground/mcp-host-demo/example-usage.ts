import { MCPHost } from './src/mcp-host';
import { TransportType } from './src/mcp-client';

// 示例：使用不同传输方式的 MCP 配置
const mcpConfig = {
  openaiApiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key',
  model: 'gpt-4',
  servers: {
    // stdio 传输方式 - 本地命令行工具
    'weather-stdio': {
      name: 'weather-stdio',
      transportType: TransportType.STDIO,
      command: 'node',
      args: ['../weather/build/index.js'],
      env: {
        NWS_API_KEY: process.env.NWS_API_KEY
      }
    },

    // HTTP 传输方式 - 远程服务器
    'weather-http': {
      name: 'weather-http',
      transportType: TransportType.HTTP,
      url: 'http://localhost:3000/mcp'
    },

    // 另一个 HTTP 服务示例
    'notion-http': {
      name: 'notion-http',
      transportType: TransportType.HTTP,
      url: 'https://your-mcp-server.com/mcp'
    }
  },
  strategy: 'function_calling' as const
};

async function main() {
  try {
    console.log('🚀 初始化 MCP Host with multiple transports...');

    const host = new MCPHost(mcpConfig);
    await host.initialize();

    console.log('📊 连接状态:', host.getConnectionStatus());

    // 测试 stdio 传输的工具调用
    const stdioResponse = await host.chat('帮我查看一下加州的天气预警信息');
    console.log('📨 Stdio Transport Response:', stdioResponse);

    // 测试 HTTP 传输的工具调用（如果可用）
    const httpResponse = await host.chat('通过HTTP服务获取天气信息');
    console.log('🌐 HTTP Transport Response:', httpResponse);

    // 清理资源
    await host.cleanup();

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// 如果直接运行此文件
if (require.main === module) {
  main().catch(console.error);
}

export { mcpConfig }; 