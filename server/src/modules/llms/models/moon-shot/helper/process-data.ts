import OpenAI from 'openai';
import { MoonShotLLMResponse } from '../typings';

/**
 * process moonshot response to our response
 * @param completion the completion is the response from openai
 * @returns { MoonShotLLMResponse }
 */
export const processMoonShotLLMResponse = (
  completion: OpenAI.Chat.Completions.ChatCompletion,
): MoonShotLLMResponse => {
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
