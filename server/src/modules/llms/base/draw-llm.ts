import { BaseLLM } from '.';

type BaseDrawLLMPrompt = any;
type BaseDrawLLMResponse = any;

export interface DrawLLM<
  TPrompt extends BaseDrawLLMPrompt = BaseDrawLLMResponse,
  TResponse extends BaseDrawLLMResponse = BaseDrawLLMResponse,
> extends BaseLLM<TPrompt, TResponse> {
  // 特定于绘图的方法和属性
  draw(prompt: TPrompt): Promise<TResponse>;

  drawWithChat(prompts: any): Promise<any>;
}
