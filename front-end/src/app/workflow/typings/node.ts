import { OutputParameter } from ".";

export enum WorkflowNodeType {
  Start = "start",
  End = "end",
  Plugin = "plugin",
  LLM = "llm",
  Code = "code",
  KnowLedge = "knowledge",
  Workflow = "workflow",
  Condition = "condition",
  Message = "message",
  Variable = "variable",
  Database = "database",
}

export interface WorkflowNodeCategory {
  name: string;
  imgUrl: string;
  nodeType: WorkflowNodeType;
}

export interface ReactFlowNodeMeta {
  position: {
    x: number;
    y: number;
  };
}

export interface ReactFlowNode {
  id: string;
  type: string;
  meta: ReactFlowNodeMeta;
}

export interface WorkflowNodeData {
  outputs: OutputParameter[];
}

export interface WorkflowNode extends ReactFlowNode {
  data: {};
}
