"use client";

import React from "react";
import { Handle, NodeProps, Position } from "reactflow";

interface StartNodeData {
  name?: string;
}

const StartNode = (props: NodeProps<StartNodeData>) => {
  const { isConnectable } = props;
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
        <div className="bg-[#fff] rounded-[5px]">开始</div>
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
};

export default StartNode;
