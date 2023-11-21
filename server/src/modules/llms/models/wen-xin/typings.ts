// support plain string and ChatCompletionMessageParam Form openai
export type WenXinLLMPrompt =
  | string
  | {
      role: 'user' | 'assistant';
      content: string;
    };

/**
 * 文心一言的类型文件
 * docs: https://cloud.baidu.com/doc/WENXINWORKSHOP/s/4lilb2lpf
 */
export interface WenXinLLMInput {
  /**
   * messages: 包含 WenXinLLMPrompt 对象的数组。
   * 每个 WenXinLLMPrompt 表示一条对话消息，整个数组构成了对话的上下文。
   * 这些消息按照特定的顺序排列（如用户与助手交替），用以模拟真实的对话流程。
   */
  messages: WenXinLLMPrompt[];

  /**
   * stream (可选): 一个布尔值，指示是否以流式接口的形式返回数据。
   * 当设置为 true 时，数据将以流的形式返回，适用于需要连续数据的场景。
   */
  stream?: boolean;

  /**
   * temperature (可选): 一个浮点数，用于控制输出的随机性。
   * 值越高，输出的随机性越大；值越低，输出越趋于确定性。
   * 用于调整生成文本的创造性和多样性。
   */
  temperature?: number;

  /**
   * top_p (可选): 一个浮点数，影响输出文本的多样性。
   * 值越大，生成的文本多样性越强；值越小，文本趋于常见和预测性。
   * 用于控制文本生成的范围和多样性。
   */
  top_p?: number;

  /**
   * penalty_score (可选): 一个浮点数，用于给已生成的 token 增加惩罚，
   * 减少重复生成的现象。值越大，对重复内容的惩罚越大。
   */
  penalty_score?: number;

  /**
   * system (可选): 一个字符串，用于定义模型的人设或角色。
   * 这可以是任何字符串，通常用于个性化或定制模型的行为。
   */
  system?: string;

  /**
   * user_id (可选): 一个字符串，表示最终用户的唯一标识符。
   * 用于监视和检测滥用行为，防止接口的恶意调用。
   */
  user_id?: string;
}

interface Usage {
  /**
   * prompt_tokens: 表示问题中的 token 数量。
   */
  prompt_tokens: number;

  /**
   * completion_tokens: 表示回答中的 token 数量。
   */
  completion_tokens: number;

  /**
   * total_tokens: 表示问题和回答中 token 的总数。
   */
  total_tokens: number;
}

/**
 * 文心一言的类型文件
 * docs: https://cloud.baidu.com/doc/WENXINWORKSHOP/s/4lilb2lpf
 */
export interface WenXinLLMOutput {
  /**
   * id: 本轮对话的唯一标识符。
   */
  id: string;

  /**
   * object: 回包类型。例如，'chat.completion' 表示多轮对话返回。
   */
  object: string;

  /**
   * created: 对话创建的时间戳。
   */
  created: number;

  /**
   * sentence_id: 表示当前子句的序号。仅在流式接口模式下返回。
   */
  sentence_id?: number;

  /**
   * is_end: 表示当前子句是否是最后一句。仅在流式接口模式下返回。
   */
  is_end?: boolean;

  /**
   * is_truncated: 当前生成的结果是否被截断。
   */
  is_truncated: boolean;

  /**
   * result: 对话返回的结果。
   */
  result: string;

  /**
   * need_clear_history: 表示用户输入是否存在安全风险，是否需要关闭当前会话并清理历史会话信息。
   * true 表示存在风险，false 表示无风险。
   */
  need_clear_history: boolean;

  /**
   * ban_round: 当 need_clear_history 为 true 时，此字段指示存在敏感信息的对话轮数。
   * 如果敏感信息在当前问题中，ban_round 为 -1。
   */
  ban_round?: number;

  /**
   * usage: 提供 token 统计信息，包括问题和回答中的 token 数量。
   */
  usage: Usage;
}

export interface WenXinLLMResponse {
  /** the string response of ai */
  generateText: string;
  /** the response of llm  */
  llmOutput: WenXinLLMOutput;
}
