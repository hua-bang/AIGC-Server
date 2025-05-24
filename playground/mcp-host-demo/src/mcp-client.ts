import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

export interface MCPServerConfig {
  name: string;
  command: string;
  args?: string[];
  env?: Record<string, string>;
}

export interface MCPTool {
  name: string;
  description?: string;
  inputSchema: any;
  _serverName?: string;
}

export interface MCPResource {
  uri: string;
  name: string;
  description?: string;
  mimeType?: string;
}

export class MCPClient {
  private client: Client;
  private transport: StdioClientTransport;
  private config: MCPServerConfig;
  private connected: boolean = false;

  constructor(config: MCPServerConfig) {
    this.config = config;

    this.transport = new StdioClientTransport({
      command: config.command,
      args: config.args,
      env: config.env,
    });

    this.client = new Client(
      {
        name: "mcp-client",
        version: "1.0.0"
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );
  }

  async connect() {
    if (this.connected) {
      console.warn("Already connected to MCP server");
      return;
    }

    try {
      await this.client.connect(this.transport);
      this.connected = true;
      console.log(`Connected to MCP server: ${this.config.name}`);
    } catch (error) {
      console.error("Failed to connect to MCP server:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.connected) {
      return;
    }

    try {
      await this.client.close();
      this.connected = false;
      console.log(`🔌 MCP Client 已断开: ${this.config.name}`);
    } catch (error) {
      console.error(`❌ MCP Client 断开失败 (${this.config.name}):`, error);
      throw error;
    }
  }

  // 检查连接状态
  isConnected(): boolean {
    return this.connected;
  }

  // 获取服务器名称
  getServerName(): string {
    return this.config.name;
  }

  async listTools(): Promise<MCPTool[]> {
    this.ensureConnected();

    try {
      const response = await this.client.listTools();

      // 为工具添加服务器标记
      return response.tools.map(tool => ({
        ...tool,
        _serverName: this.config.name,
      })) as any;
    } catch (error) {
      console.error(`获取工具列表失败 (${this.config.name}):`, error);
      throw error;
    }
  }

  // 调用工具
  async callTool(name: string, arguments_: Record<string, any>): Promise<any> {
    this.ensureConnected();

    try {
      console.log(`🔨 [${this.config.name}] 调用工具: ${name}`);
      console.log(`📝 [${this.config.name}] 参数:`, arguments_);

      const response = await this.client.callTool({
        name,
        arguments: arguments_,
      });

      console.log(`✅ [${this.config.name}] 工具执行成功:`, response);
      return response;
    } catch (error) {
      console.error(`❌ [${this.config.name}] 调用工具 ${name} 失败:`, error);
      throw error;
    }
  }

  // 获取资源列表
  async listResources(): Promise<MCPResource[]> {
    this.ensureConnected();

    try {
      const response = await this.client.listResources();

      return response.resources as any;
    } catch (error) {
      console.error(`获取资源列表失败 (${this.config.name}):`, error);
      throw error;
    }
  }

  // 读取资源
  async readResource(uri: string): Promise<any> {
    this.ensureConnected();

    try {
      const response = await this.client.request(
        {
          method: "resources/read",
          params: { uri },
        },
        ReadResourceRequestSchema
      );

      return response;
    } catch (error) {
      console.error(`读取资源失败 (${this.config.name}):`, error);
      throw error;
    }
  }


  // 获取服务器信息
  async getServerInfo(): Promise<any> {
    this.ensureConnected();

    try {
      return this.client.getServerVersion();
    } catch (error) {
      console.error(`获取服务器信息失败 (${this.config.name}):`, error);
      throw error;
    }
  }

  // 检查连接状态（私有方法）
  private ensureConnected(): void {
    if (!this.connected) {
      throw new Error(`MCP Client ${this.config.name} 未连接`);
    }
  }
}

export class MCPClientManager {
  private clients: Map<string, MCPClient> = new Map();

  addClient(name: string, config: MCPServerConfig): MCPClient {
    if (this.clients.has(name)) {
      throw new Error(`Client ${name} already exists`);
    }

    const client = new MCPClient(config);
    this.clients.set(name, client);
    return client;
  }

  // 获取客户端
  getClient(name: string): MCPClient | undefined {
    return this.clients.get(name);
  }

  // 获取所有客户端
  getAllClients(): MCPClient[] {
    return Array.from(this.clients.values());
  }

  // 连接所有客户端
  async connectAll(): Promise<void> {
    const connectPromises = Array.from(this.clients.values()).map(
      client => client.connect().catch(error => {
        console.error(`客户端连接失败: ${client.getServerName()}`, error);
        // 不抛出错误，允许其他客户端继续连接
      })
    );

    await Promise.all(connectPromises);
  }

  // 断开所有客户端
  async disconnectAll(): Promise<void> {
    const disconnectPromises = Array.from(this.clients.values()).map(
      client => client.disconnect().catch(error => {
        console.error(`客户端断开失败: ${client.getServerName()}`, error);
      })
    );

    await Promise.all(disconnectPromises);
    this.clients.clear();
  }

  // 收集所有工具
  async collectAllTools(): Promise<MCPTool[]> {
    const allTools: MCPTool[] = [];

    for (const client of this.clients.values()) {
      if (client.isConnected()) {
        try {
          const tools = await client.listTools();
          allTools.push(...tools);
        } catch (error) {
          console.error(`收集工具失败: ${client.getServerName()}`, error);
        }
      }
    }

    return allTools;
  }

  // 调用特定服务器的工具
  async callTool(serverName: string, toolName: string, args: Record<string, any>): Promise<any> {
    const client = this.clients.get(serverName);
    if (!client) {
      throw new Error(`客户端 ${serverName} 不存在`);
    }

    return await client.callTool(toolName, args);
  }

  // 查找工具并调用（自动找到对应的服务器）
  async findAndCallTool(toolName: string, args: Record<string, any>): Promise<any> {
    for (const client of this.clients.values()) {
      if (client.isConnected()) {
        try {
          const tools = await client.listTools();
          const tool = tools.find(t => t.name === toolName);

          if (tool) {
            return await client.callTool(toolName, args);
          }
        } catch (error) {
          console.error(`查找工具失败: ${client.getServerName()}`, error);
        }
      }
    }

    throw new Error(`工具 ${toolName} 未找到`);
  }

  // 获取连接状态
  getConnectionStatus(): Record<string, boolean> {
    const status: Record<string, boolean> = {};

    for (const [name, client] of this.clients) {
      status[name] = client.isConnected();
    }

    return status;
  }
}

export async function createMCPClients(): Promise<MCPClientManager> {
  const manager = new MCPClientManager();

  return manager;
}