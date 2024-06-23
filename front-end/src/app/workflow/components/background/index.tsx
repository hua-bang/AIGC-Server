import React from "react";
import ReactFlowContentBackGround from "../react-flow-component/react-flow-background";
import { useWorkflowContext } from "../../context";

const Background = () => {
  const workflowContextValue = useWorkflowContext();

  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="flex justify-center items-center h-full">
        {workflowContextValue && (
          <ReactFlowContentBackGround
            nodes={workflowContextValue.nodes}
            edges={workflowContextValue.edges}
            setNodes={workflowContextValue.setNodes}
            setEdges={workflowContextValue.setEdges}
            onEdgesChange={workflowContextValue.onEdgesChange}
            onNodesChange={workflowContextValue.onNodesChange}
          />
        )}
      </div>
    </div>
  );
};

export default Background;
