import { WorkflowNodeCategory, WorkflowNodeType } from "../typings";

export const WorkflowNodeCategoryArr: WorkflowNodeCategory[] = [
  {
    name: "Plugin",
    imgUrl:
      "https://llm-flow-1258926018.cos.ap-shanghai.myqcloud.com/llm-flow%2Ficon-Api.png",
    nodeType: WorkflowNodeType.Plugin,
  },
  {
    name: "LLM",
    imgUrl:
      "https://llm-flow-1258926018.cos.ap-shanghai.myqcloud.com/llm-flow%2Ficon-LLM.png",
    nodeType: WorkflowNodeType.LLM,
  },
  {
    name: "Code",
    imgUrl:
      "https://llm-flow-1258926018.cos.ap-shanghai.myqcloud.com/llm-flow%2Ficon-Code.png",
    nodeType: WorkflowNodeType.Code,
  },
  {
    name: "Condition",
    imgUrl:
      "https://llm-flow-1258926018.cos.ap-shanghai.myqcloud.com/llm-flow%2Ficon-Condition.png",
    nodeType: WorkflowNodeType.Condition,
  },
];
