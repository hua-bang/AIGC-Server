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
    <div className="w-60 bg-[#f7f7fa] p-4 border-r overflow-y-auto">
      <ul className="flex flex-col gap-[12px]">
        {WorkflowNodeArr.map((item) => (
          <li
            key={item.name}
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
