/* eslint-disable react/display-name */
"use client";

import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import LLMNodeContent from "./content";

const LLMNode = memo(({ data, isConnectable }: any) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ left: 5, opacity: 0 }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <LLMNodeContent />
      <Handle
        type="source"
        position={Position.Right}
        style={{ right: 5, opacity: 0 }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </>
  );
});

export default LLMNode;
