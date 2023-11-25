import { WenXinLLMPrompt } from './typings';

export class PromptGenerator {
  generatePrompts(prompts: WenXinLLMPrompt[] | string[]) {
    let messages: WenXinLLMPrompt[] = [];

    if (prompts.length === 1) {
      const [promptValue] = prompts;

      const content =
        typeof promptValue === 'string' ? promptValue : promptValue.content;

      messages = [{ role: 'user', content }];
    } else {
      const nextMessages = prompts.map((prompt) =>
        typeof prompt === 'string' ? { role: 'user', content: prompt } : prompt,
      );
      messages = nextMessages as WenXinLLMPrompt[];
    }

    return messages;
  }
}
