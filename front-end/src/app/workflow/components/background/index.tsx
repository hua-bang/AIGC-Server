import React from "react";
import ReactFlowDemo from "./react-flow-demo";

const Background = () => {
  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="flex justify-center items-center h-full">
        <ReactFlowDemo />
      </div>
    </div>
  );
};

export default Background;
