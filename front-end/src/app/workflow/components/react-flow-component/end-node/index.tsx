"use client";

import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import EndNodeContent from "./content";

interface EndNodeData {
  name?: string;
}

export const EndNode = (props: NodeProps<EndNodeData>) => {
  const { isConnectable } = props;
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <EndNodeContent />
    </>
  );
};

export default EndNode;
