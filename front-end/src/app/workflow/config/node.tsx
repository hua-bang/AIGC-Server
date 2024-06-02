import { WorkflowNode, WorkflowNodeType } from "../typings";

export const WorkflowNodeArr: WorkflowNode[] = [
  {
    name: "Plugin",
    imgUrl:
      "https://llm-flow-1258926018.cos.ap-shanghai.myqcloud.com/llm-flow%2Ficon-Api.png",
    type: WorkflowNodeType.Plugin,
  },
  {
    name: "LLM",
    imgUrl:
      "https://llm-flow-1258926018.cos.ap-shanghai.myqcloud.com/llm-flow%2Ficon-LLM.png",
    type: WorkflowNodeType.LLM,
  },
  {
    name: "Code",
    imgUrl:
      "https://llm-flow-1258926018.cos.ap-shanghai.myqcloud.com/llm-flow%2Ficon-Code.png",
    type: WorkflowNodeType.Code,
  },
  {
    name: "Condition",
    imgUrl:
      "https://llm-flow-1258926018.cos.ap-shanghai.myqcloud.com/llm-flow%2Ficon-Condition.png",
    type: WorkflowNodeType.Condition,
  },
];
