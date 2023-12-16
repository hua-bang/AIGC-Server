import { ChatType } from "../typings/llm";
import { PromptItem } from "../typings/prompt";

export interface ChatParams {
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
}
