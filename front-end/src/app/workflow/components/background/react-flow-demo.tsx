"use client";
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import LLMNode from "../react-flow-component/llm-node";
import StartNode from "../react-flow-component/start-node";
import NormalNode from "../react-flow-component/normal-node";
import EndNode from "../react-flow-component/end-node";
import CodeNode from "../react-flow-component/code-node";

const initialNodes = [
  {
    id: "start",
    type: "startNode",
    data: { label: "Node 1" },
    position: { x: 80, y: 400 },
  },
  {
    id: "llmNode-1",
    type: "llmNode",
    data: { label: "Node 2" },
    position: { x: 600, y: 50 },
  },
  {
    id: "normal-3",
    type: "llmNode",
    data: { label: "Node 3" },
    position: { x: 600, y: 700 },
  },
  {
    id: "normal-4",
    type: "codeNode",
    data: { label: "Node 4" },
    position: { x: 1000, y: 250 },
  },
  {
    id: "end-4",
    type: "endNode",
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

const hide = (hidden: any) => (nodeOrEdge: any) => {
  nodeOrEdge.hidden = hidden;
  return nodeOrEdge;
};

const nodeTypes = {
  llmNode: LLMNode,
  startNode: StartNode,
  normalNode: NormalNode,
  endNode: EndNode,
  codeNode: CodeNode,
};

const ReactFlowDemo = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [hidden, setHidden] = useState(false);

  const onConnect = useCallback(
    (params: any) => setEdges((els) => addEdge(params, els)),
    []
  );

  useEffect(() => {
    setNodes((nds) => nds.map(hide(hidden)));
    setEdges((eds) => eds.map(hide(hidden)));
  }, [hidden]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
    >
      <MiniMap />
      <Controls />
      <div style={{ position: "absolute", left: 10, top: 10, zIndex: 4 }} />
    </ReactFlow>
  );
};

export default ReactFlowDemo;
