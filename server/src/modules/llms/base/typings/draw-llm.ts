import { BaseLLM } from '..';

export abstract class DrawLLM<TPrompt, TResponse> extends BaseLLM<
  TPrompt,
  TResponse
> {
  // 特定于绘图的方法和属性
  abstract draw(prompt: TPrompt): Promise<TResponse>;
}
