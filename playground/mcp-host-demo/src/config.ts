// src/config.ts - 配置管理（更新版）

import { readFileSync } from 'fs';
import { join } from 'path';
import { MCPHostConfig } from './mcp-host';
import { TransportType } from './mcp-client';

export function loadConfig(): MCPHostConfig {
  // 从环境变量获取 API Key
  const openaiApiKey = process.env.OPENAI_API_KEY;
  if (!openaiApiKey) {
    throw new Error('请设置 OPENAI_API_KEY 环境变量');
  }

  // 默认配置
  let config: Partial<MCPHostConfig> = {
    openaiApiKey,
    model: 'openai/gpt-4o-mini',
    strategy: 'function_calling',
    servers: {}
  };

  // 从配置文件加载
  try {
    const configPath = join(process.cwd(), 'mcp-config.json');
    const configContent = readFileSync(configPath, 'utf-8');
    const fileConfig = JSON.parse(configContent);

    // 合并配置，文件配置优先
    config = { ...config, ...fileConfig, openaiApiKey };

    console.log('✅ 已加载配置文件: mcp-config.json');
  } catch (error) {
    console.warn('⚠️ 未找到 mcp-config.json，使用默认配置');

    // 使用默认的 save-to-notion-mcp 配置
    config.servers = {
      "save-to-notion-mcp": {
        "name": "save-to-notion-mcp",
        "transportType": TransportType.STDIO,
        "command": "npx",
        "args": ["save-to-notion-mcp"]
      }
    };
  }

  // 验证配置
  validateConfig(config as MCPHostConfig);

  return config as MCPHostConfig;
}

function validateConfig(config: MCPHostConfig): void {
  if (!config.openaiApiKey) {
    throw new Error('OpenAI API Key 未设置');
  }

  if (!config.servers || Object.keys(config.servers).length === 0) {
    throw new Error('至少需要配置一个 MCP 服务器');
  }

  // 验证策略
  const validStrategies = ['function_calling', 'prompt_driven', 'keyword_matching'];
  if (config.strategy && !validStrategies.includes(config.strategy)) {
    throw new Error(`无效的策略: ${config.strategy}. 可用策略: ${validStrategies.join(', ')}`);
  }

  // 验证服务器配置
  for (const [name, serverConfig] of Object.entries(config.servers)) {
    if (!serverConfig.name) {
      throw new Error(`服务器 ${name} 配置不完整，需要 name 字段`);
    }

    // 验证传输类型
    if (!serverConfig.transportType) {
      throw new Error(`服务器 ${name} 缺少 transportType 字段`);
    }

    if (!Object.values(TransportType).includes(serverConfig.transportType as TransportType)) {
      throw new Error(`服务器 ${name} 的 transportType 无效: ${serverConfig.transportType}. 可用类型: ${Object.values(TransportType).join(', ')}`);
    }

    // 根据传输类型验证特定字段
    switch (serverConfig.transportType) {
      case TransportType.STDIO:
        if (!('command' in serverConfig)) {
          throw new Error(`stdio 传输的服务器 ${name} 需要 command 字段`);
        }
        break;
      case TransportType.HTTP:
        if (!('url' in serverConfig)) {
          throw new Error(`HTTP 传输的服务器 ${name} 需要 url 字段`);
        }
        break;
    }
  }
}

// 创建示例配置文件
export function createExampleConfig(): string {
  const exampleConfig = {
    "model": "gpt-4o",
    "strategy": "function_calling",
    "servers": {
      // stdio 传输示例
      "save-to-notion-mcp": {
        "name": "save-to-notion-mcp",
        "transportType": "stdio",
        "command": "npx",
        "args": ["save-to-notion-mcp"]
      },
      // 另一个 stdio 传输示例
      "filesystem": {
        "name": "filesystem-server",
        "transportType": "stdio",
        "command": "node",
        "args": ["./servers/filesystem/index.js"],
        "env": {
          "ROOT_PATH": "/Users/username/documents"
        }
      },
      // HTTP 传输示例
      "remote-weather": {
        "name": "remote-weather",
        "transportType": "http",
        "url": "http://localhost:3000/mcp"
      }
    }
  };

  return JSON.stringify(exampleConfig, null, 2);
}

// 配置工具函数
export class ConfigManager {
  static getDefaultConfig(): Partial<MCPHostConfig> {
    return {
      model: 'gpt-4o',
      strategy: 'function_calling',
      servers: {
        "save-to-notion-mcp": {
          "name": "save-to-notion-mcp",
          "transportType": TransportType.STDIO,
          "command": "npx",
          "args": ["save-to-notion-mcp"]
        }
      }
    };
  }

  static validateServerConfig(config: any): boolean {
    if (!config.name || !config.transportType) {
      return false;
    }

    switch (config.transportType) {
      case TransportType.STDIO:
        return !!(config.command);
      case TransportType.HTTP:
        return !!(config.url);
      default:
        return false;
    }
  }

  static mergeConfigs(base: Partial<MCPHostConfig>, override: Partial<MCPHostConfig>): MCPHostConfig {
    return {
      ...base,
      ...override,
      servers: {
        ...base.servers,
        ...override.servers
      }
    } as MCPHostConfig;
  }
}