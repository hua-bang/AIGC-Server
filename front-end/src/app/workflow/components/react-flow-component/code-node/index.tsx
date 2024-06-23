/* eslint-disable react/display-name */
"use client";

import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import CodeNodeContent from "./content";

const CodeNode = memo(({ data, isConnectable }: NodeProps) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <CodeNodeContent />
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </>
  );
});

export default CodeNode;
