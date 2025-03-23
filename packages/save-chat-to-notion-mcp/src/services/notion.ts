import { Client } from "@notionhq/client";

interface ChatData {
  title: string;
  summary: string[];
  conversation: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  databaseId: string;
}

export class NotionService {
  constructor(private notion: Client) { }

  async saveChat({ title, summary, conversation, databaseId }: ChatData): Promise<string> {
    try {
      // 创建 Notion 页面
      const response = await this.notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          title: {
            title: [
              {
                text: {
                  content: title,
                },
              },
            ],
          },
          summary: {
            rich_text: [
              {
                text: {
                  content: summary.join("\n• "),
                },
              },
            ],
          },
        },
        children: [
          {
            object: "block",
            type: "heading_2",
            heading_2: {
              rich_text: [{ type: "text", text: { content: "Summary" } }],
            },
          },
          ...summary.map((point) => ({
            object: "block",
            type: "bulleted_list_item",
            bulleted_list_item: {
              rich_text: [{ type: "text", text: { content: point } }],
            },
          })),
          {
            object: "block",
            type: "heading_2",
            heading_2: {
              rich_text: [{ type: "text", text: { content: "Original Conversation" } }],
            },
          },
          ...conversation.map((msg) => ({
            object: "block",
            type: "paragraph",
            paragraph: {
              rich_text: [
                {
                  type: "text",
                  text: { content: `${msg.role}: ${msg.content}` },
                },
              ],
            },
          })),
        ] as any,
      });

      return response.id;
    } catch (error) {
      console.error("Error saving to Notion:", error);
      throw error;
    }
  }
} 