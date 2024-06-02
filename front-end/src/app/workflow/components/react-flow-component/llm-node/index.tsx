/* eslint-disable react/display-name */
"use client";

import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const LLMNode = memo(({ data, isConnectable }: any) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div className="bg-[#fff] p-[15px] border-[1px] border-black rounded-[4px]">
        <div className="bg-[#fff] rounded-[5px]">这个是 LLM 节点</div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        style={{ bottom: 0, background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </>
  );
});

export default LLMNode;