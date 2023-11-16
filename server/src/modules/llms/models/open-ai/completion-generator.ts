import OpenAI from 'openai';
import { OpenAILLMPrompt } from './typings';
import { defaultModel } from './config';
import { ChatCompletionMessageParam } from 'openai/resources';

export class CompletionGenerator {
  generateBody(prompts: OpenAILLMPrompt[]) {
    const completionBody: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming =
      {
        messages: [],
        model: defaultModel,
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
