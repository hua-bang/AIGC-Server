# MCP 配置文件迁移指南

## 概述

随着 Streamable HTTP 传输支持的加入，`mcp-config.json` 配置文件的格式需要进行更新。本指南将帮助您将现有配置迁移到新格式。

## 变更内容

### 主要变更

1. **新增必需字段**: `transportType`
2. **配置结构优化**: 根据传输类型进行不同的配置验证
3. **新增传输类型**: 支持 `stdio` 和 `http` 两种传输方式

## 迁移步骤

### 1. 旧配置格式

```json
{
  "servers": {
    "save-to-notion-mcp": {
      "name": "save-to-notion-mcp",
      "command": "npx",
      "args": ["save-to-notion-mcp"],
      "env": {
        "NOTION_API_KEY": "your-api-key"
      }
    }
  }
}
```

### 2. 新配置格式

```json
{
  "servers": {
    "save-to-notion-mcp": {
      "name": "save-to-notion-mcp",
      "transportType": "stdio",
      "command": "npx", 
      "args": ["save-to-notion-mcp"],
      "env": {
        "NOTION_API_KEY": "your-api-key"
      }
    }
  }
}
```

### 3. 主要变更

- ✅ **添加 `transportType`**: 必须指定为 `"stdio"` 或 `"http"`
- ✅ **保持兼容性**: 现有的 `command`, `args`, `env` 字段保持不变

## 完整配置示例

### 混合传输配置

```json
{
  "model": "gpt-4o",
  "strategy": "function_calling",
  "servers": {
    "local-notion": {
      "name": "local-notion",
      "transportType": "stdio",
      "command": "npx",
      "args": ["save-to-notion-mcp"],
      "env": {
        "NOTION_API_KEY": "secret_xxx",
        "NOTION_DATABASE_ID": "xxx"
      }
    },
    "weather-service": {
      "name": "weather-service", 
      "transportType": "stdio",
      "command": "node",
      "args": ["../weather/build/index.js"],
      "env": {
        "NWS_API_KEY": "your-weather-api-key"
      }
    },
    "remote-api": {
      "name": "remote-api",
      "transportType": "http",
      "url": "https://api.example.com/mcp"
    },
    "local-http": {
      "name": "local-http",
      "transportType": "http", 
      "url": "http://localhost:3000/mcp"
    }
  }
}
```

## 配置字段说明

### 通用字段

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `name` | string | ✅ | 服务器名称标识 |
| `transportType` | "stdio" \| "http" | ✅ | 传输类型 |

### stdio 传输特有字段

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `command` | string | ✅ | 执行命令 |
| `args` | string[] | ❌ | 命令参数 |
| `env` | object | ❌ | 环境变量 |

### HTTP 传输特有字段

| 字段 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `url` | string | ✅ | MCP 服务器 URL |

## 验证配置

更新配置后，可以运行以下命令验证配置是否正确：

```bash
npm run build
npm start
```

如果配置有误，系统会给出具体的错误提示。

## 常见错误及解决方案

### 错误 1: 缺少 transportType 字段

```
Error: 服务器 save-to-notion-mcp 缺少 transportType 字段
```

**解决方案**: 为每个服务器配置添加 `transportType` 字段

### 错误 2: 无效的传输类型

```
Error: 服务器 xxx 的 transportType 无效: invalid. 可用类型: stdio, http
```

**解决方案**: 确保 `transportType` 只能是 `"stdio"` 或 `"http"`

### 错误 3: stdio 传输缺少 command 字段

```
Error: stdio 传输的服务器 xxx 需要 command 字段
```

**解决方案**: 为 stdio 传输添加 `command` 字段

### 错误 4: HTTP 传输缺少 url 字段

```
Error: HTTP 传输的服务器 xxx 需要 url 字段
```

**解决方案**: 为 HTTP 传输添加 `url` 字段

## 向后兼容性

- ✅ 现有的 stdio 传输配置只需添加 `transportType: "stdio"` 即可
- ✅ 所有现有字段（`command`, `args`, `env`）保持不变
- ✅ 配置验证会给出明确的错误提示

## 推荐配置

### 开发环境

```json
{
  "model": "gpt-4o-mini",
  "strategy": "function_calling", 
  "servers": {
    "local-tools": {
      "name": "local-tools",
      "transportType": "stdio",
      "command": "your-mcp-server",
      "args": ["--dev"]
    }
  }
}
```

### 生产环境

```json
{
  "model": "gpt-4o",
  "strategy": "function_calling",
  "servers": {
    "production-api": {
      "name": "production-api", 
      "transportType": "http",
      "url": "https://mcp.yourservice.com/api"
    }
  }
}
```

## 其他资源

- [传输方式详细文档](./README-TRANSPORTS.md)
- [完整使用示例](./example-usage.ts)
- [MCP 官方文档](https://modelcontextprotocol.io/) 