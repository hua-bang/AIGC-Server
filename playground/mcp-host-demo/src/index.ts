// src/index.ts - 主入口文件
import { createMCPHost, MCPHostConfig } from './mcp-host';
import { loadConfig } from './config';
import { config as loadEnv } from 'dotenv';

// 在文件顶部自动加载环境变量
loadEnv();

async function main() {
  try {
    // 加载配置
    const config = loadConfig();

    // 创建并初始化 Host
    const host = await createMCPHost(config);

    console.log('\n🤖 MCP Host 已准备就绪！');
    console.log(`🔧 调用策略: ${config.strategy || 'function_calling'}`);
    console.log(`📊 连接状态:`, host.getConnectionStatus());
    console.log(`🛠️ 可用工具:`, host.getAvailableTools().map(t => t.name));

    // 示例对话
    const userMessage = "请帮我把这个想法保存到 Notion: '今天学习了 MCP 协议的分层架构'";
    console.log(`\n👤 用户: ${userMessage}`);

    const response = await host.chat(userMessage);
    console.log(`\n🤖 GPT: ${response}`);

    await host.cleanup();

  } catch (error) {
    console.error('❌ 程序执行失败:', error);
    process.exit(1);
  }
}

async function interactiveMode() {
  const readline = await import('readline');

  try {
    const config = loadConfig();
    const host = await createMCPHost(config);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    console.log('\n🤖 MCP Host 交互模式启动！');
    console.log(`🔧 当前策略: ${config.strategy || 'function_calling'}`);
    console.log(`📊 连接状态:`, host.getConnectionStatus());
    console.log('💡 输入 "quit", "exit" 或 "!quit" 退出');
    console.log('🔄 输入 "!refresh" 刷新工具列表');
    console.log('📋 输入 "!tools" 查看可用工具');
    console.log('📊 输入 "!status" 查看连接状态');
    console.log('---');

    const chat = async (): Promise<void> => {
      return new Promise((resolve) => {
        rl.question('\n👤 您: ', async (userInput) => {
          const input = userInput.trim();

          // 退出命令
          if (['quit', 'exit', '!quit'].includes(input.toLowerCase())) {
            rl.close();
            await host.cleanup();
            console.log('\n👋 再见！');
            resolve();
            return;
          }

          // 特殊命令
          if (input.startsWith('!')) {
            try {
              switch (input.toLowerCase()) {
                case '!refresh':
                  await host.refreshTools();
                  console.log('✅ 工具列表已刷新');
                  break;

                case '!tools':
                  const tools = host.getAvailableTools();
                  console.log('\n📋 可用工具:');
                  tools.forEach(tool => {
                    console.log(`  • ${tool.name}: ${tool.description} (${tool._serverName})`);
                  });
                  break;

                case '!status':
                  const status = host.getConnectionStatus();
                  console.log('\n📊 连接状态:');
                  Object.entries(status).forEach(([name, connected]) => {
                    console.log(`  • ${name}: ${connected ? '✅ 已连接' : '❌ 未连接'}`);
                  });
                  break;

                default:
                  console.log('❓ 未知命令。可用命令: !refresh, !tools, !status, !quit');
              }
            } catch (error) {
              console.error('❌ 命令执行失败:', error);
            }

            await chat();
            return;
          }

          // 空输入
          if (!input) {
            await chat();
            return;
          }

          // 正常对话
          try {
            console.log('\n🤔 思考中...');
            const response = await host.chat(input);
            console.log(`\n🤖 GPT: ${response}`);
          } catch (error) {
            console.error('\n❌ 错误:', error);
          }

          await chat();
        });
      });
    };

    await chat();

  } catch (error) {
    console.error('❌ 交互模式失败:', error);
    process.exit(1);
  }
}

// 配置示例函数
function showConfigExample() {
  console.log(`
📝 配置文件示例 (mcp-config.json):

{
  "openaiApiKey": "your_openai_api_key",
  "model": "gpt-4o",
  "strategy": "function_calling",
  "servers": {
    "save-to-notion-mcp": {
      "name": "save-to-notion-mcp",
      "command": "npx",
      "args": ["save-to-notion-mcp"]
    }
  }
}

🔧 可用策略:
  • function_calling: 使用 OpenAI Function Calling (推荐)
  • prompt_driven: 基于提示词的工具调用
  • keyword_matching: 关键词匹配触发工具

🚀 运行方式:
  npm run dev              # 单次运行示例
  npm run dev:interactive  # 交互模式
  npm run dev -- --config # 显示配置示例
`);
}

// 根据命令行参数选择运行模式
const args = process.argv.slice(2);

if (args.includes('--interactive') || args.includes('-i')) {
  interactiveMode();
} else if (args.includes('--config') || args.includes('-c')) {
  showConfigExample();
} else {
  main();
}
