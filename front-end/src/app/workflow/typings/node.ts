import { Node } from "reactflow";
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

export interface WorkflowNodeDataMeta {
  title: string;
  icon: string;
  description: string;
  subTitle: string;
}

export interface WorkflowNodeData {
  outputs: OutputParameter[];
  nodeMeta: WorkflowNodeDataMeta;
}

export interface WorkflowNode extends Node {
  data: WorkflowNodeData;
  meta: ReactFlowNodeMeta;
}
