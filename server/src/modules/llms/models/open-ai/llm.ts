import { OpenAI } from 'openai';
import { ChatLLM } from '../../base/chat-llm';
import { OpenAILLMPrompt, OpenAILLMResponse } from './typings';
import {
  MODEL_NAME,
  DEFAULT_MAX_TOKEN,
  defaultVisionModel,
  getDefaultClientOptions,
  defaultImageModel,
  defaultModel,
} from './config';
import { CompletionGenerator } from './completion-generator';
import { Injectable } from '@nestjs/common';
import { DrawLLM } from '../../base/draw-llm';
import { getCurrentWeather } from 'src/utils/get-current-weather';

@Injectable()
export class OpenAILLM
  implements ChatLLM<OpenAILLMPrompt, OpenAILLMResponse>, DrawLLM<string, any>
{
  public modelName = MODEL_NAME;
  instance: OpenAI | undefined;

  constructor(private completionGenerator: CompletionGenerator) {
    this.instance = new OpenAI(getDefaultClientOptions());
  }

  async call(prompt: OpenAILLMPrompt): Promise<OpenAILLMResponse> {
    return this.generate([prompt]);
  }

  async generate(prompts: OpenAILLMPrompt[]): Promise<OpenAILLMResponse> {
    const completionBody = this.completionGenerator.generateBody(prompts);
    const completion = await this.instance?.chat.completions.create(
      completionBody,
    );

    return this.processOpenAILLMResponse(completion);
  }

  async chat(
    prompt: OpenAILLMPrompt | Array<OpenAILLMPrompt>,
  ): Promise<OpenAILLMResponse> {
    const finalPrompt = Array.isArray(prompt) ? prompt : [prompt];

    return this.generate(finalPrompt);
  }

  /**
   * this function to chat with vision
   */
  chatWithVision = async (
    prompts: Array<OpenAI.Chat.Completions.ChatCompletionMessageParam>,
  ) => {
    const completion = await this.instance.chat.completions.create({
      model: defaultVisionModel,
      messages: prompts,
      max_tokens: DEFAULT_MAX_TOKEN,
    });

    return this.processOpenAILLMResponse(completion);
  };

  /**
   * process openai response to our response
   * @param completion the completion is the response from openai
   * @returns { OpenAILLMResponse }
   */
  processOpenAILLMResponse(
    completion: OpenAI.Chat.Completions.ChatCompletion,
  ): OpenAILLMResponse {
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
      generations,
      generateText,
      llmOutput: completion,
    };
  }

  /**
   * Prompt to Image
   * @param prompt the prompt of generate image
   * @returns {Promise<{ url: string; }>}
   */
  async draw(prompt: string) {
    return await this.instance.images.generate({
      model: defaultImageModel,
      n: 1,
      prompt,
      size: '1024x1024',
    });
  }

  async drawWithChat(prompts: OpenAILLMPrompt[]): Promise<OpenAILLMResponse> {
    const messages: OpenAILLMPrompt[] = [
      ...(prompts || []),
      {
        role: 'system',
        content:
          '你需要基于上方的对话，总结出一句 prompt， 用于 绘画大模型（如 Dall-E-3）来进行生成',
      },
    ];

    const chatVisionRes = await this.chatWithVision(
      messages as unknown as Array<OpenAI.Chat.Completions.ChatCompletionMessageParam>,
    );

    const { generateText: promptForDraw } = chatVisionRes;

    const res = await this.draw(promptForDraw);

    const urls = res.data.map((item) => item.url);

    const contents = urls.map((url) => ({
      type: 'image_url',
      image_url: url,
    }));

    const generations = [
      [
        {
          text: promptForDraw,
          generationInfo: {
            index: 0,
            message: {
              role: 'assistant',
              content: contents,
            },
            finish_reason: 'stop',
          },
        },
      ],
    ];

    return {
      generateText: promptForDraw,
      generations,
      llmOutput: chatVisionRes.llmOutput,
    };
  }

  async functionCall(
    prompts: OpenAILLMPrompt[],
    tools: OpenAI.Chat.Completions.ChatCompletionTool[],
  ) {
    const completionBody = this.completionGenerator.generateBody(prompts);
    const response = await this.instance?.chat.completions.create({
      ...completionBody,
      tools,
      tool_choice: 'auto', // auto is default, but we'll be explicit
    });
    const responseMessage = response.choices[0].message;

    const toolCalls = responseMessage.tool_calls;
    if (!toolCalls) {
      return this.processOpenAILLMResponse(response);
    }

    const { messages } = completionBody;

    if (responseMessage.tool_calls) {
      const availableFunctions = {
        get_current_weather: getCurrentWeather,
      };
      messages.push(responseMessage);
      for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name;
        const functionToCall = availableFunctions[functionName];
        const functionArgs = JSON.parse(toolCall.function.arguments);
        const functionResponse = functionToCall(functionArgs);
        messages.push({
          tool_call_id: toolCall.id,
          role: 'tool',
          content: functionResponse,
        });
      }
      return await this.generate(messages as OpenAILLMPrompt[]);
    }
  }
}
