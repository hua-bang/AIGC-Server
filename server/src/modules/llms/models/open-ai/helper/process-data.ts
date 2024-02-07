import OpenAI from 'openai';
import { OpenAILLMResponse } from '../typings';

/**
 * process openai response to our response
 * @param completion the completion is the response from openai
 * @returns { OpenAILLMResponse }
 */
export const processOpenAILLMResponse = (
  completion: OpenAI.Chat.Completions.ChatCompletion,
): OpenAILLMResponse => {
  const generateText = completion.choices[0].message.content;

  const generations = [
    [
      {
        text: generateText,
        generationInfo: completion.choices[0],
      },
    ],
  ];

  return {
    message: completion.choices[0].message,
    generations,
    generateText,
    llmOutput: completion,
  };
};
