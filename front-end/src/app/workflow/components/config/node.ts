import { WorkflowNodeType } from "../../typings";
import { EndNode, LLMNode, StartNode, CodeNode } from "../react-flow-component";

export const WorkflowDefaultNodeTypes = {
  [WorkflowNodeType.LLM]: LLMNode,
  [WorkflowNodeType.Start]: StartNode,
  [WorkflowNodeType.End]: EndNode,
  [WorkflowNodeType.Code]: CodeNode,
};
