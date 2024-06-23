/* eslint-disable react/display-name */
"use client";

import React, { memo } from "react";
import { Handle, Position } from "reactflow";

const NormalNode = memo(({ data, isConnectable }: any) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
      <div className="bg-[#fff] p-[15px] border-[1px] border-black rounded-[4px]">
        <div className="bg-[#fff] rounded-[5px]">这个是 LLM 节点</div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
        onConnect={(params) => console.log("handle onConnect", params)}
        isConnectable={isConnectable}
      />
    </>
  );
});

export default NormalNode;
