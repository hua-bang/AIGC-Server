import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { Client } from "@notionhq/client";
import { NotionService } from "./services/notion";

// 创建 MCP server 实例
const server = new McpServer({
  name: "SaveChatToNotion",
  version: "1.0.0",
});

// 初始化 Notion 客户端
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const notionService = new NotionService(notion);

// 定义保存聊天工具
server.tool(
  "save_chat",
  "Save the chat conversation to Notion with a title and summary",
  {
    title: z.string().describe("The title for the chat"),
    summary: z.array(z.string()).describe("Array of summary points for the chat"),
    conversation: z.array(
      z.object({
        role: z.enum(["user", "assistant"]).describe("The role of the message sender"),
        content: z.string().describe("The content of the message"),
      })
    ).describe("Available conversation history (may be partial; include as many relevant messages as possible, with most recent messages prioritized if complete history isn't available)")
  } as any,
  // @ts-ignore
  async ({ title, summary, conversation }: any) => {
    try {
      // 保存到 Notion
      const pageId = await notionService.saveChat({
        title,
        summary,
        conversation,
        databaseId: process.env.NOTION_DATABASE_ID || '',
      });

      return {
        content: [
          {
            type: "text",
            text: `Successfully saved chat to Notion. Page ID: ${pageId}, Link: ${`https://www.notion.so/${pageId.replace(/-/g, "")}`}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error saving chat:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error saving chat: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// 定义保存URL总结工具
server.tool(
  "save_url_summary",
  "Save a URL and its summary to Notion",
  {
    title: z.string().describe("The title of the article"),
    link: z.string().url().describe("The URL of the article"),
    summary: z.array(z.string()).describe("Array of summary points for the article"),
  } as any,
  // @ts-ignore
  async ({ title, link, summary }: any) => {
    try {
      // 保存到 Notion
      const pageId = await notionService.saveUrlSummary({
        title,
        link,
        summary,
        databaseId: process.env.NOTION_URL_DATABASE_ID || '',
      });

      return {
        content: [
          {
            type: "text",
            text: `Successfully saved URL summary to Notion. Page ID: ${pageId}, Link: ${`https://www.notion.so/${pageId.replace(/-/g, "")}`}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error saving URL summary:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error saving URL summary: ${error instanceof Error ? error.message : "Unknown error"}`,
          },
        ],
      };
    }
  }
);

// 启动服务器
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("SaveChatToNotion MCP Server is running...");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
