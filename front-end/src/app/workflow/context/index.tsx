import React from "react";
import {
  Edge,
  Node,
  OnEdgesChange,
  OnNodesChange,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { WorkflowNodeType } from "../typings";

export type WorkflowContextValue = {
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  onNodesChange: OnNodesChange;

  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onEdgesChange: OnEdgesChange;
} | null;

export const WorkflowContext = React.createContext<WorkflowContextValue>(null);

const defaultInitialNodes: Node[] = [
  {
    id: "start",
    type: WorkflowNodeType.Start,
    data: { label: "Node 1" },
    position: { x: 80, y: 400 },
  },
  {
    id: "end-4",
    type: WorkflowNodeType.End,
    data: { label: "end data" },
    position: { x: 800, y: 400 },
  },
];

interface WorkflowProviderProps {
  initialNodes?: Node[];
  initialEdges?: Edge[];
}

export const WorkflowProvider = (
  props: React.PropsWithChildren<WorkflowProviderProps>
) => {
  const { initialNodes = defaultInitialNodes, initialEdges = [] } = props;

  const [nodes, setNodes, onNodesChange] = useNodesState(
    props.initialNodes ?? initialNodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <WorkflowContext.Provider
      value={{
        nodes,
        setNodes,
        onNodesChange,
        edges,
        setEdges,
        onEdgesChange,
      }}
    >
      {props.children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflowContext = () => React.useContext(WorkflowContext);
