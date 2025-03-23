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

## 安装

```bash
npm install
```

## 配置

1. 复制环境变量模板：
```bash
cp .env.example .env
```

2. 在 `.env` 文件中设置以下变量：
```env
NOTION_API_KEY=your_notion_api_key
NOTION_DATABASE_ID=your_notion_database_id
NOTION_URL_DATABASE_ID=your_notion_url_database_id  # 用于保存URL总结的数据库
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

## 使用方法

### 启动服务器
```bash
npm run dev
```

### 工具调用示例

1. 保存聊天对话：
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

2. 保存网页总结：
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

### 启动生产环境
```bash
npm start
```

## 目录结构

```
save-to-notion-mcp/
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

## 错误处理

- 如果保存失败，会返回详细的错误信息
- 检查 Notion API Key 和数据库 ID 是否正确
- 确保数据库结构符合要求

## 许可证

ISC 