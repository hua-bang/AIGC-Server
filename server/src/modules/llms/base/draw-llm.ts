import { BaseLLM } from '.';

export interface DrawLLM<TPrompt, TResponse>
  extends BaseLLM<TPrompt, TResponse> {
  // 特定于绘图的方法和属性
  draw(prompt: TPrompt): Promise<TResponse>;
}
