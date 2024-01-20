import OpenAI from 'openai';
import { Tool } from '../../../../../typings/tool';

export interface ToolsInfo {
  tools: OpenAI.Chat.Completions.ChatCompletionTool[];
  functionMap: Record<string, (...args: any[]) => string>;
}

/**
 * generate tool for openai
 * @param tools
 * @returns { ToolsInfo }
 */
export const getToolsInfo = (tools: Tool[]): ToolsInfo => {
  const toolsForLLM: OpenAI.Chat.Completions.ChatCompletionTool[] = [];
  const availableFunctions: Record<string, (...args: any[]) => string> = {};

  tools.forEach((tool) => {
    const { type, call } = tool;
    toolsForLLM.push({
      function: tool.function,
      type: type as 'function',
    });
    availableFunctions[tool.function.name] = call;
  });

  return {
    tools: toolsForLLM,
    functionMap: availableFunctions,
  };
};
