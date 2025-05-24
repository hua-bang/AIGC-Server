// src/config.ts - 配置管理（更新版）

import { readFileSync } from 'fs';
import { join } from 'path';
import { MCPHostConfig } from './mcp-host.js';

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
    if (!serverConfig.name || !serverConfig.command) {
      throw new Error(`服务器 ${name} 配置不完整，需要 name 和 command 字段`);
    }
  }
}

// 创建示例配置文件
export function createExampleConfig(): string {
  const exampleConfig = {
    "model": "gpt-4o",
    "strategy": "function_calling",
    "servers": {
      "save-to-notion-mcp": {
        "name": "save-to-notion-mcp",
        "command": "npx",
        "args": ["save-to-notion-mcp"]
      },
      "filesystem": {
        "name": "filesystem-server",
        "command": "node",
        "args": ["./servers/filesystem/index.js"],
        "env": {
          "ROOT_PATH": "/Users/username/documents"
        }
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
          "command": "npx",
          "args": ["save-to-notion-mcp"]
        }
      }
    };
  }

  static validateServerConfig(config: any): boolean {
    return !!(config.name && config.command);
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