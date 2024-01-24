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
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { DrawLLM } from '../../base/draw-llm';
import { Tool } from '../../../../typings/tool';
import { ToolsInfo, getToolsInfo } from './helper/get-tool-info';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class OpenAILLM
  implements ChatLLM<OpenAILLMPrompt, OpenAILLMResponse>, DrawLLM<string, any>
{
  public modelName = MODEL_NAME;
  instance: OpenAI | undefined;

  constructor(
    private completionGenerator: CompletionGenerator,
    @Inject(REQUEST) private request: Request,
  ) {
    try {
      this.instance = new OpenAI(getDefaultClientOptions());
    } catch {}
  }

  getInstance(): OpenAI | undefined {
    if (this.instance) {
      return this.instance;
    }

    console.log('this.request.headers ', this.request.headers);

    const { openai_api_key, Openai_api_key } = this.request.headers as any;

    const key = openai_api_key || Openai_api_key;

    if (!key) {
      throw new HttpException('openai_api_key is required', 200);
    }

    try {
      return new OpenAI({
        ...getDefaultClientOptions(),
        apiKey: key,
      });
    } catch {
      throw new HttpException('openai_api_key is error', 200);
    }
  }

  async call(prompt: OpenAILLMPrompt): Promise<OpenAILLMResponse> {
    return this.generate([prompt]);
  }

  async generate(prompts: OpenAILLMPrompt[]): Promise<OpenAILLMResponse> {
    const completionBody = this.completionGenerator.generateBody(prompts);
    const completion = await this.getInstance()?.chat.completions.create(
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
    const completion = await this.getInstance()?.chat.completions.create({
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
      message: completion.choices[0].message,
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
    return await this.getInstance()?.images.generate({
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

  /**
   * 使用 OpenAI 聊天模型异步调用函数以生成回应。此函数主要处理与聊天模型的交互，处理工具调用，并管理消息流程。
   *
   * @param {OpenAILLMPrompt[]} prompts - 发送至聊天模型的提示数组。
   * @param {Tool[]} tools - 与聊天模型一起使用的工具数组。
   * @returns {Promise<Object>} - 处理后的聊天模型响应，包括任何工具调用。
   */
  async functionCall(prompts: OpenAILLMPrompt[], tools: Tool[]) {
    const completionBody = this.completionGenerator.generateBody(prompts);
    const { tools: toolsForLLM, functionMap } = getToolsInfo(tools);
    const response = await this.getInstance()?.chat.completions.create({
      ...completionBody,
      tools: toolsForLLM,
      tool_choice: 'auto', // auto is default, but we'll be explicit
    });
    const responseMessage = response.choices[0].message;

    const toolCalls = responseMessage.tool_calls;

    if (!toolCalls) {
      return this.processOpenAILLMResponse(response);
    }
    const { messages } = completionBody;

    return await this.processToolCalls(
      toolCalls,
      [...messages, responseMessage],
      functionMap,
    );
  }

  /**
   * 处理聊天模型响应中的工具调用。此函数遍历每个工具调用，执行相应的函数，并组装最终要返回的消息序列。
   *
   * @param {OpenAI.Chat.Completions.ChatCompletionMessageToolCall[]} toolCalls - 聊天模型响应中的工具调用数组。
   * @param {OpenAI.Chat.Completions.ChatCompletionMessageParam[]} messages - 消息数组，这些消息是处理中的一部分。
   * @param {ToolsInfo['functionMap']} functionMap - 工具名称与相应函数的映射。
   * @returns {Promise<OpenAILLMPrompt[]>} - 最终生成的消息序列。
   */
  async processToolCalls(
    toolCalls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
    messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    functionMap: ToolsInfo['functionMap'],
  ) {
    const nextMessages = [...messages];
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const functionToCall = functionMap[functionName];
      const functionArgs = JSON.parse(toolCall.function.arguments);
      const functionResponse = functionToCall(functionArgs);
      nextMessages.push({
        tool_call_id: toolCall.id,
        role: 'tool',
        content: functionResponse,
      });
    }
    return await this.generate(nextMessages as OpenAILLMPrompt[]);
  }
}
