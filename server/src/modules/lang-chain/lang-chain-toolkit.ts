import { Calculator } from 'langchain/tools/calculator';
import { SerpAPI, Tool } from 'langchain/tools';
import { getEnvConfig } from 'src/utils/env';

export class LangChainToolkit {
  private tools: Tool[] = [];

  constructor() {
    this.tools = [new SerpAPI(getEnvConfig('SERP_API_KEY')), new Calculator()];
  }

  /**
   * addTool
   * @param tool the tool to add
   */
  addTool(tool: Tool) {
    this.tools.push(tool);
  }

  getTools() {
    return this.tools;
  }
}
