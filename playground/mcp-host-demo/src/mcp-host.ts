import OpenAI from 'openai';
import { MCPClientManager, MCPTool, MCPServerConfig, TransportType } from './mcp-client';

export interface MCPHostConfig {
  openaiApiKey: string;
  model?: string;
  servers: Record<string, MCPServerConfig>;
  strategy?: 'function_calling' | 'prompt_driven' | 'keyword_matching';
}

// 工具调用策略接口
interface ToolCallStrategy {
  handleChat(message: string, tools: MCPTool[], prevMessages: OpenAI.Chat.ChatCompletionMessageParam[]): Promise<string>;
}


class FunctionCallingStrategy implements ToolCallStrategy {
  constructor(private openai: OpenAI, private clientManager: MCPClientManager, private model: string) { }

  async handleChat(message: string, tools: MCPTool[], prevMessages: OpenAI.Chat.ChatCompletionMessageParam[]): Promise<string> {
    const openaiTools = this.formatToolsForOpenAI(tools);

    console.log(`💬 [Function Calling] 用户消息: ${message}`);

    // 初始对话
    let messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      ...(prevMessages || []),
      { role: "user", content: message }
    ];

    const completion = await this.openai.chat.completions.create({
      model: this.model,
      messages,
      tools: openaiTools.length > 0 ? openaiTools : undefined,
      tool_choice: openaiTools.length > 0 ? "auto" : undefined,
      max_tokens: 4000,
    });

    const assistantMessage = completion.choices[0].message;

    if (!assistantMessage) {
      throw new Error("No assistant message received");
    }

    messages.push(assistantMessage);

    if (assistantMessage.tool_calls) {
      for (const toolCall of assistantMessage.tool_calls) {
        const toolName = toolCall.function.name;
        const toolArgs = JSON.parse(toolCall.function.arguments);

        try {
          const result = await this.clientManager.findAndCallTool(toolName, toolArgs);

          messages.push({
            role: "tool",
            content: JSON.stringify(result),
            tool_call_id: toolCall.id,
          });
        } catch (error) {
          console.error(`[Function Calling] 工具调用失败: ${toolName}`, error);
          messages.push({
            role: "tool",
            content: `工具调用失败: ${toolName}`,
            tool_call_id: toolCall.id,
          });
        }
      }

      // 获取最终回复
      const finalCompletion = await this.openai.chat.completions.create({
        model: this.model,
        messages,
        max_tokens: 4000,
      });

      return finalCompletion.choices[0]?.message?.content || '工具执行完成';
    }

    return assistantMessage.content || '工具执行完成';
  }

  private formatToolsForOpenAI(tools: MCPTool[]) {
    return tools.map(tool => ({
      type: "function" as const,
      function: {
        name: tool.name,
        description: tool.description,
        parameters: tool.inputSchema,
      },
    }));
  }
}

class PromptDrivenStrategy implements ToolCallStrategy {
  constructor(private openai: OpenAI, private clientManager: MCPClientManager, private model: string) { }

  async handleChat(message: string, tools: MCPTool[], prevMessages: OpenAI.Chat.ChatCompletionMessageParam[]): Promise<string> {
    const systemPrompt = this.generateSystemPrompt(tools);

    console.log(`💬 [Prompt Driven] 用户消息: ${message}`);

    // 第一次对话
    const completion = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        { role: "system", content: systemPrompt },
        ...(prevMessages || []),
        { role: "user", content: message }
      ],
      max_tokens: 4000,
    });

    const response = completion.choices[0]?.message?.content || '';

    // 解析工具调用
    const toolCalls = this.parseToolCalls(response);

    if (toolCalls.length === 0) {
      return response;
    }

    // 执行工具并获取最终回复
    let finalResponse = response;

    for (const toolCall of toolCalls) {
      try {
        const result = await this.clientManager.findAndCallTool(toolCall.name, toolCall.args);

        // 将结果反馈给模型
        const followUpCompletion = await this.openai.chat.completions.create({
          model: this.model,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
            { role: "assistant", content: response },
            { role: "user", content: `工具 ${toolCall.name} 执行完成，结果：${JSON.stringify(result)}` }
          ],
          max_tokens: 4000,
        });

        finalResponse = followUpCompletion.choices[0]?.message?.content || '';
      } catch (error) {
        finalResponse += `\n\n⚠️ 工具 ${toolCall.name} 执行失败: ${error}`;
      }
    }

    return finalResponse;
  }

  private generateSystemPrompt(tools: MCPTool[]): string {
    const toolDescriptions = tools.map(tool =>
      `- ${tool.name}: ${tool.description}`
    ).join('\n');

    return `你是一个智能助手，可以使用以下工具：

可用工具：
${toolDescriptions}

当需要使用工具时，请在回复中使用格式：
[TOOL_CALL: 工具名称]
参数: {"key": "value"}
[/TOOL_CALL]`;
  }

  private parseToolCalls(response: string): Array<{ name: string, args: any }> {
    const toolCalls: Array<{ name: string, args: any }> = [];
    const regex = /\[TOOL_CALL:\s*(\w+)\]\s*参数:\s*({.*?})\s*\[\/TOOL_CALL\]/gs;

    let match;
    while ((match = regex.exec(response)) !== null) {
      try {
        const toolName = match[1];
        const args = JSON.parse(match[2]);
        toolCalls.push({ name: toolName, args });
      } catch (error) {
        console.error('解析工具调用失败:', error);
      }
    }

    return toolCalls;
  }
}

export class MCPHost {
  private openai: OpenAI;
  private clientManager: MCPClientManager;
  private strategy: ToolCallStrategy;
  private config: MCPHostConfig;
  private availableTools: MCPTool[] = [];
  private prevMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

  constructor(config: MCPHostConfig) {
    this.config = config;

    // 检查是否有自定义的 API URL，如果没有或者有问题，使用官方 API
    const openaiConfig: any = {
      apiKey: config.openaiApiKey,
      baseURL: process.env.OPENAI_API_URL,
    };

    this.openai = new OpenAI(openaiConfig);

    this.clientManager = new MCPClientManager();

    // 根据配置选择策略
    const model = config.model || 'openai/gpt-4o-mini';
    const strategyType = config.strategy || 'prompt_driven';

    switch (strategyType) {
      case 'prompt_driven':
        this.strategy = new PromptDrivenStrategy(this.openai, this.clientManager, model);
        break;
      default:
        this.strategy = new FunctionCallingStrategy(this.openai, this.clientManager, model);
    }
  }

  async initialize(): Promise<void> {
    console.log('🚀 初始化 MCP Host...');

    // 添加客户端
    for (const [serverName, serverConfig] of Object.entries(this.config.servers)) {
      this.clientManager.addClient(serverName, serverConfig);
    }

    // 连接所有客户端
    await this.clientManager.connectAll();

    // 收集可用工具
    this.availableTools = await this.clientManager.collectAllTools();
    console.log(`📦 共发现 ${this.availableTools.length} 个工具:`,
      this.availableTools.map(t => t.name));
  }

  async chat(message: string): Promise<string> {
    try {
      const response = await this.strategy.handleChat(message, this.availableTools, this.prevMessages);
      this.prevMessages.push({ role: "user", content: message }, { role: "assistant", content: response });
      return response;
    } catch (error) {
      console.error('❌ 对话处理失败:', error);
      throw error;
    }
  }

  // 获取可用工具
  getAvailableTools(): MCPTool[] {
    return [...this.availableTools];
  }

  // 获取连接状态
  getConnectionStatus(): Record<string, boolean> {
    return this.clientManager.getConnectionStatus();
  }

  // 刷新工具列表
  async refreshTools(): Promise<void> {
    this.availableTools = await this.clientManager.collectAllTools();
    console.log(`🔄 工具列表已刷新，共 ${this.availableTools.length} 个工具`);
  }

  // 清理资源
  async cleanup(): Promise<void> {
    console.log('🧹 清理 MCP Host 资源...');
    await this.clientManager.disconnectAll();
    this.availableTools = [];
  }
}

// 使用示例
export async function createMCPHost(config: MCPHostConfig): Promise<MCPHost> {
  const host = new MCPHost(config);
  await host.initialize();
  return host;
}