// agent.mts

// IMPORTANT - Add your API keys here. Be careful not to publish them.
process.env.BASE_URL = "http://localhost:11434/v1";
process.env.OPENAI_API_KEY = "sk-...";
process.env.TAVILY_API_KEY = "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";

import { TavilySearchResults } from "@langchain/community/tools/tavily_search";
import { ChatOpenAI } from "@langchain/openai";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const agentTools = [
  new TavilySearchResults({ maxResults: 3 }),
]

const agentModel = new ChatOpenAI({
  temperature: 0,
  model: 'parasail/parasail-deepseek-v3-0324',
  configuration: {
    baseURL: 'https://router.requesty.ai/v1',
    apiKey: "",
  }
});

const agentCheckPointer = new MemorySaver();

const agent = createReactAgent({
  llm: agentModel,
  tools: agentTools,
  checkpointer: agentCheckPointer,
});

// Now it's time to use!
const agentFinalState = await agent.invoke(
  { messages: [new HumanMessage("what is the current weather in sf")] },
  { configurable: { thread_id: "42" } },
);

console.log(
  agentFinalState.messages[agentFinalState.messages.length - 1].content,
);

const agentNextState = await agent.invoke(
  { messages: [new HumanMessage("what about ny")] },
  { configurable: { thread_id: "42" } },
);

console.log(
  agentNextState.messages[agentNextState.messages.length - 1].content,
);