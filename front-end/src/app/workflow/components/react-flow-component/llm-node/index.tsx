/* eslint-disable react/display-name */
"use client";
import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import LLMNodeContent from "./content";

export const LLMNode = memo(({ data, isConnectable }: any) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <LLMNodeContent />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  );
});

export default LLMNode;
