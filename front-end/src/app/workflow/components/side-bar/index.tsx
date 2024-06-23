import React from "react";
import { WorkflowNodeCategoryArr } from "../../config";
import { useWorkflowContext } from "../../context";
import { WorkflowNodeType } from "../../typings";
import { Node } from "reactflow";

const Sidebar = () => {
  const { setNodes } = useWorkflowContext() || {};

  const addNode = (workflowNodeType: WorkflowNodeType) => {
    const nextNode: Node = {
      id: `${Math.random()}`,
      type: workflowNodeType,
      data: { label: "node " },
      position: { x: 80, y: 700 },
    };

    setNodes?.((prev) => [...prev, nextNode]);
  };

  return (
    <div className="w-60 bg-[#f7f7fa] p-4 border-r overflow-y-auto">
      <ul className="flex flex-col gap-[12px]">
        {WorkflowNodeCategoryArr.map((item) => (
          <li
            key={item.name}
            onClick={() => {
              addNode(item.nodeType);
            }}
            className="py-2 px-2 cursor-pointer bg-[#fdfbf9] flex items-center gap-[8px] rounded-[8px] hover:translate-y-[-5px] shadow-md hover:bg-[#fff] hover:shadow-indigo-200 transition-all"
          >
            <img width={28} height={28} src={item.imgUrl} /> {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
