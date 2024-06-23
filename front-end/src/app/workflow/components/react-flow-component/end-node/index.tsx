"use client";

import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import EndNodeContent from "./content";

interface EndNodeData {
  name?: string;
}

const EndNode = (props: NodeProps<EndNodeData>) => {
  const { isConnectable } = props;
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ left: 5, opacity: 0 }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <EndNodeContent />
    </>
  );
};

export default EndNode;
