# Save Chat to Notion MCP

一个基于 Model Context Protocol (MCP) 的服务器，用于将聊天对话和网页总结保存到 Notion。

## 功能特点

### 1. 保存聊天对话 (save_chat)
- 将完整的对话历史保存到 Notion
- 支持对话标题和摘要
- 自动格式化对话内容
- 生成直接访问的 Notion 链接

### 2. 保存网页总结 (save_url_summary)
- 保存网页链接和总结到 Notion
- 创建可点击的书签预览
- 支持结构化的总结要点
- 自动生成 Notion 页面链接

## 快速开始

### 使用 npx（推荐）

无需安装，直接运行：
```bash
npx save-chat-to-notion-mcp
```

### 全局安装

```bash
npm install -g save-chat-to-notion-mcp
save-chat-to-notion-mcp
```

### 本地开发

```bash
git clone <repository-url>
cd save-chat-to-notion-mcp
npm install
npm run dev
```

## MCP Host 配置

### Cursor 配置
1. 在 Cursor 的设置中找到 MCP 配置部分
2. 添加新的 MCP Server：
```json
{
  "servers": [
    {
      "name": "save-chat-to-notion",
      "command": "npx save-chat-to-notion-mcp",
      "cwd": "."
    }
  ]
}
```

### Claude Desktop 配置
1. 打开 Claude Desktop 的设置
2. 在 MCP Servers 部分添加：
```json
{
  "save-chat-to-notion": {
    "command": "npx save-chat-to-notion-mcp",
    "cwd": "."
  }
}
```

### 其他 MCP Host
对于其他支持 MCP 的应用，确保：
1. 指定正确的启动命令：`npx save-chat-to-notion-mcp`
2. 设置工作目录（通常为 "."）
3. 配置服务器名称为 `save-chat-to-notion`

## 环境配置

在运行目录下创建 `.env` 文件：

```env
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
```

## Notion 数据库设置

### 聊天对话数据库
需要包含以下属性：
- `title`：标题 (Title 类型)
- `summary`：总结 (Rich Text 类型)

### URL总结数据库
需要包含以下属性：
- `title`：标题 (Title 类型)
- `link`：链接 (URL 类型)
- `summary`：总结 (Rich Text 类型)

## 可用工具

### 1. save_chat
将聊天对话保存到 Notion。

**参数：**
- `title`: string - 对话标题
- `summary`: string[] - 对话要点数组
- `conversation`: Array<{role: "user" | "assistant", content: string}> - 对话内容

**示例：**
```typescript
const result = await client.invokeTool("save_chat", {
  title: "对话标题",
  summary: [
    "对话要点1",
    "对话要点2"
  ],
  conversation: [
    { role: "user", content: "用户消息" },
    { role: "assistant", content: "助手回复" }
  ]
});
```

### 2. save_url_summary
保存网页链接和总结到 Notion。

**参数：**
- `title`: string - 文章标题
- `link`: string - 文章链接 (必须是有效的 URL)
- `summary`: string[] - 总结要点数组
- `databaseId`: string (可选) - 自定义数据库 ID

**示例：**
```typescript
const result = await client.invokeTool("save_url_summary", {
  title: "文章标题",
  link: "https://example.com/article",
  summary: [
    "文章要点1",
    "文章要点2"
  ]
});
```

## 开发

### 构建
```bash
npm run build
```

### 启动开发环境
```bash
npm run dev
```

### 发布新版本
```bash
npm version patch # 或 minor 或 major
npm publish
```

## 目录结构

```
save-chat-to-notion-mcp/
├── src/
│   ├── index.ts          # 主入口文件
│   └── services/
│       └── notion.ts     # Notion 服务实现
├── .env                  # 环境变量
├── .env.example         # 环境变量模板
├── package.json         # 项目配置
└── tsconfig.json        # TypeScript 配置
```

## 注意事项

1. 确保 Notion API Key 具有适当的权限
2. 数据库必须包含所需的属性字段
3. 环境变量必须正确设置
4. 网页链接必须是有效的 URL 格式
5. MCP Host 必须正确配置工作目录和启动命令

## 错误处理

- 如果保存失败，会返回详细的错误信息
- 检查 Notion API Key 和数据库 ID 是否正确
- 确保数据库结构符合要求
- 验证 MCP Host 配置是否正确

## 许可证

ISC 