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
        style={{ left: 5, opacity: 0 }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <CodeNodeContent />
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

export default CodeNode;
