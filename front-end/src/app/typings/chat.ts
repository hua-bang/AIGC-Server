import { ChatType } from "./llm";
import { PromptItem } from "./prompt";

export interface Chat {
  /**
   * 提示词数组
   */
  prompt: Array<PromptItem>;
  /**
   * 模型
   */
  modelName?: "open-ai" | "wen-xin" | string;

  /**
   * 聊天类型
   */
  chatType: ChatType;

  /**
   * 会话id
   */
  id?: string;
}
