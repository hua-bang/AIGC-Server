export enum WorkflowNodeType {
  Plugin = 1,
  LLM = 2,
  Code = 3,
  KnowLedge = 4,
  Workflow = 5,
  Condition = 6,
  Message = 7,
  Variable = 8,
  Database = 9,
}

export interface WorkflowNode {
  name: string;
  imgUrl: string;
  type: WorkflowNodeType;
}
