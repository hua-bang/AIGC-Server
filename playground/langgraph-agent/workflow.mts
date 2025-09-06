// agent.mts

// IMPORTANT - Add your API keys here. Be careful not to publish them.
process.env.BASE_URL = "http://localhost:11434/v1";
process.env.OPENAI_API_KEY = "sk-...";
process.env.TAVILY_API_KEY = "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";

import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver, MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { createReactAgent, ToolNode } from "@langchain/langgraph/prebuilt";
import * as tslab from "tslab";
import { writeFileSync } from "node:fs";


const tools = [
  new TavilySearchResults({ maxResults: 3 }),
]
const toolNode = new ToolNode(tools);

const model = new ChatOpenAI({
  temperature: 0,
  model: 'parasail/parasail-deepseek-v3-0324',
  configuration: {
    baseURL: 'https://router.requesty.ai/v1',
    apiKey: "",
  }
}).bindTools(tools);


function shouldContinue({ messages }: typeof MessagesAnnotation.State) {
  const lastMessage = messages[messages.length - 1] as AIMessage;

  // If the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage.tool_calls?.length) {
    return "tools";
  }
  // Otherwise, we stop (reply to the user) using the special "__end__" node
  return "__end__";
}

async function callModel(state: typeof MessagesAnnotation.State) {
  const response = await model.invoke(state.messages);

  return {
    messages: [response],
  };
}

const workflow = new StateGraph(MessagesAnnotation)
  .addNode('agent', callModel)
  .addEdge("__start__", 'agent')
  .addNode("tools", toolNode)
  .addEdge("tools", 'agent')
  .addConditionalEdges("agent", shouldContinue)


// Finally, we compile it into a LangChain Runnable.
const app = workflow.compile();

const graph = await app.getGraphAsync();
const image = await graph.drawMermaidPng();
const graphStateArrayBuffer = await image.arrayBuffer();

const filePath = "./graphState.png";
writeFileSync(filePath, new Uint8Array(graphStateArrayBuffer));

// // Use the agent
// const finalState = await app.invoke({
//   messages: [new HumanMessage("what is the weather in sf")],
// });
// console.log(finalState.messages[finalState.messages.length - 1].content);

// const nextState = await app.invoke({
//   // Including the messages from the previous run gives the LLM context.
//   // This way it knows we're asking about the weather in NY
//   messages: [...finalState.messages, new HumanMessage("what about ny")],
// });
// console.log(nextState.messages[nextState.messages.length - 1].content);