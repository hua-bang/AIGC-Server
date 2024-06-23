"use client";

import React from "react";
import { Handle, NodeProps, Position } from "reactflow";

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
      <div className="bg-[#fff] p-[15px] border-[1px] border-black rounded-[4px]">
        <div className="bg-[#fff] rounded-[5px]">结束</div>
      </div>
    </>
  );
};

export default EndNode;
