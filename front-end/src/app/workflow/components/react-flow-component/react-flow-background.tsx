"use client";
import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  OnNodesChange,
  Edge,
  Node,
  OnEdgesChange,
} from "reactflow";
import "reactflow/dist/style.css";
import { WorkflowNodeType } from "../../typings";
import { WorkflowDefaultNodeTypes } from "../config";

const initialNodes = [
  {
    id: "start",
    type: WorkflowNodeType.Start,
    data: { label: "Node 1" },
    position: { x: 80, y: 400 },
  },
  {
    id: "llmNode-1",
    type: WorkflowNodeType.LLM,
    data: { label: "Node 2" },
    position: { x: 600, y: 50 },
  },
  {
    id: "normal-3",
    type: WorkflowNodeType.LLM,
    data: { label: "Node 3" },
    position: { x: 600, y: 700 },
  },
  {
    id: "normal-4",
    type: WorkflowNodeType.Code,
    data: { label: "Node 4" },
    position: { x: 1000, y: 250 },
  },
  {
    id: "end-4",
    type: WorkflowNodeType.End,
    data: { label: "end data" },
    position: { x: 1600, y: 400 },
  },
];

const initialEdges = [
  { id: "e1-2", source: "start", target: "llmNode-1" },
  { id: "e1-3", source: "start", target: "normal-3" },
  { id: "e3-4", source: "normal-3", target: "normal-4" },
  { id: "e3-43", source: "llmNode-1", target: "normal-4" },
  { id: "e4-end", source: "normal-4", target: "end-4" },
];

const ReactFlowContentBackGround: React.FC<ReactFlowContentBackGroundProps> = ({
  nodes,
  setNodes,
  onNodesChange,

  edges,
  setEdges,
  onEdgesChange,
}) => {
  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={WorkflowDefaultNodeTypes}
      fitView
    >
      <MiniMap />
      <Controls />
      <div style={{ position: "absolute", left: 10, top: 10, zIndex: 4 }} />
    </ReactFlow>
  );
};

interface ReactFlowContentBackGroundProps {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  onNodesChange: OnNodesChange;

  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onEdgesChange: OnEdgesChange;
}

export default ReactFlowContentBackGround;
