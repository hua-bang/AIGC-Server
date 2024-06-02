import React from "react";
import { WorkflowNodeArr } from "../../config";
import { Image } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    "Plugin",
    "LLM",
    "Code",
    "Knowledge",
    "Workflow",
    "Condition",
    "Message",
    "Variable",
    "Database",
  ];

  return (
    <div className="w-60 bg-gray-50 p-4 border-r border-gray-300 overflow-y-auto">
      <ul>
        {WorkflowNodeArr.map((item) => (
          <li
            key={item.name}
            className="py-2 px-2 hover:bg-gray-200 cursor-pointer flex items-center gap-[8px]"
          >
            <img width={28} height={28} src={item.imgUrl} /> {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
