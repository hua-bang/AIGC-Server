import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { MoonShotLLMPrompt } from './typings';
import { DEFAULT_MODEL } from './config';

export class CompletionGenerator {
  generateBody(prompts: MoonShotLLMPrompt[]) {
    const completionBody: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming =
      {
        messages: [],
        model: DEFAULT_MODEL,
      };

    if (prompts.length === 1) {
      const [promptValue] = prompts;

      const content =
        typeof promptValue === 'string' ? promptValue : promptValue.content;

      completionBody.messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content },
      ];
    } else {
      const nextMessages = prompts.map((prompt) =>
        typeof prompt === 'string' ? { role: 'user', content: prompt } : prompt,
      );
      completionBody.messages = nextMessages as ChatCompletionMessageParam[];
    }

    return completionBody;
  }
}
