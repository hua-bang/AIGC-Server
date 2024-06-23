import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info, X } from "lucide-react";

const OutputParams = () => {
  const [isOutputExpanded, setIsOutputExpanded] = useState(true);

  const [outputs, setOutputs] = useState([
    { name: "", type: "string", description: "" },
  ]);

  const addOutput = () =>
    setOutputs([...outputs, { name: "", type: "String", description: "" }]);
  const removeOutput = (index: number) =>
    setOutputs(outputs.filter((_, i) => i !== index));

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium flex items-center">
          Output
          <Info size={10} className="ml-1 text-gray-400" />
        </span>
        <div className="flex items-center">
          <span className="text-xs text-gray-500 mr-1">Output format</span>
          <Info size={10} className="text-gray-400" />
          <ChevronDown size={14} className="text-gray-400 mx-1" />
          <button onClick={() => setIsOutputExpanded(!isOutputExpanded)}>
            {isOutputExpanded ? (
              <ChevronUp size={14} />
            ) : (
              <ChevronDown size={14} />
            )}
          </button>
        </div>
      </div>
      {isOutputExpanded && (
        <div className="border rounded p-1">
          {outputs.map((output, index) => (
            <div key={index} className="flex justify-between items-center mb-1">
              <input
                className="border rounded p-1 text-left text-xs w-1/4 mr-1"
                placeholder="Name"
                value={output.name}
                onChange={(e) => {
                  const newOutputs = [...outputs];
                  newOutputs[index].name = e.target.value;
                  setOutputs(newOutputs);
                }}
              />
              <select
                className="border rounded p-1 text-left text-xs w-1/4 mr-1"
                value={output.type}
                onChange={(e) => {
                  const newOutputs = [...outputs];
                  newOutputs[index].type = e.target.value;
                  setOutputs(newOutputs);
                }}
              >
                <option>string</option>
                <option>Number</option>
                <option>Boolean</option>
              </select>
              <input
                className="border rounded p-1 text-xs text-left flex-grow"
                placeholder="Description"
                value={output.description}
                onChange={(e) => {
                  const newOutputs = [...outputs];
                  newOutputs[index].description = e.target.value;
                  setOutputs(newOutputs);
                }}
              />
              <button onClick={() => removeOutput(index)} className="ml-1">
                <X size={12} className="text-gray-400" />
              </button>
            </div>
          ))}
          <button onClick={addOutput} className="text-blue-600 text-xs">
            + Add
          </button>
        </div>
      )}
    </div>
  );
};

export default OutputParams;
