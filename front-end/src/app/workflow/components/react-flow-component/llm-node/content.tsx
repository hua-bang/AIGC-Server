import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Info,
  MoreHorizontal,
  AlignJustify,
  Users,
  X,
} from "lucide-react";

const LLMNodeContent = () => {
  const [isInputExpanded, setIsInputExpanded] = useState(true);
  const [isOutputExpanded, setIsOutputExpanded] = useState(true);
  const [inputs, setInputs] = useState([
    { name: "input1", value: "LLM - output" },
  ]);
  const [outputs, setOutputs] = useState([
    { name: "output", type: "String", description: "总结的标题，不超过 50 字" },
  ]);

  const addInput = () => setInputs([...inputs, { name: "", value: "" }]);
  const removeInput = (index: number) =>
    setInputs(inputs.filter((_, i) => i !== index));

  const addOutput = () =>
    setOutputs([...outputs, { name: "", type: "String", description: "" }]);
  const removeOutput = (index: number) =>
    setOutputs(outputs.filter((_, i) => i !== index));

  return (
    <div className="w-80 bg-white rounded-lg shadow-md border border-gray-200 text-xs">
      <div className="flex items-center justify-between p-2 border-b border-gray-200">
        <div className="flex items-center">
          <div className="bg-gray-800 text-white p-1 rounded mr-2">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 15C21 16.6569 16.9706 18 12 18C7.02944 18 3 16.6569 3 15M21 15C21 13.3431 16.9706 12 12 12C7.02944 12 3 13.3431 3 15M21 15V9M3 15V9M21 9C21 10.6569 16.9706 12 12 12C7.02944 12 3 10.6569 3 9M21 9C21 7.34315 16.9706 6 12 6C7.02944 6 3 7.34315 3 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h2 className="font-semibold text-sm">LLM</h2>
        </div>
        <MoreHorizontal size={14} className="text-gray-500" />
      </div>

      <div className="p-2">
        <p className="text-xs text-gray-600 mb-2">
          Invoke the large language model, generate responses using variables
          and prompt words.
        </p>

        <div className="flex mb-2">
          <button className="flex-1 bg-blue-50 text-blue-600 py-1 px-2 rounded-l text-xs font-medium">
            Single time
          </button>
          <button className="flex-1 bg-gray-100 text-gray-500 py-1 px-2 rounded-r text-xs">
            Batch processing
          </button>
        </div>

        <div className="mb-2">
          <div className="flex items-center justify-between border rounded p-1">
            <div className="flex items-center">
              <div className="bg-gray-800 text-white p-1 rounded mr-1">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 15C21 16.6569 16.9706 18 12 18C7.02944 18 3 16.6569 3 15M21 15C21 13.3431 16.9706 12 12 12C7.02944 12 3 13.3431 3 15M21 15V9M3 15V9M21 9C21 10.6569 16.9706 12 12 12C7.02944 12 3 10.6569 3 9M21 9C21 7.34315 16.9706 6 12 6C7.02944 6 3 7.34315 3 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-xs">GPT-4o</span>
              <span className="ml-1 text-xs text-gray-500">128K</span>
            </div>
            <div className="flex items-center">
              <Info size={10} className="mr-1 text-gray-400" />
              <ChevronDown size={14} className="text-gray-400" />
              <AlignJustify size={14} className="ml-1 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium flex items-center">
              Input
              <Info size={10} className="ml-1 text-gray-400" />
            </span>
            <div className="flex items-center">
              <div className="flex items-center text-xs text-gray-500 mr-1">
                <input type="checkbox" className="mr-1 w-3 h-3" />
                <span className="text-xs">Bot Chat History</span>
              </div>
              <button onClick={() => setIsInputExpanded(!isInputExpanded)}>
                {isInputExpanded ? (
                  <ChevronUp size={14} />
                ) : (
                  <ChevronDown size={14} />
                )}
              </button>
            </div>
          </div>
          {isInputExpanded && (
            <div className="border rounded p-1">
              {inputs.map((input, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-1"
                >
                  <input
                    className="border rounded p-1 text-xs w-1/3 mr-1"
                    placeholder="Name"
                    value={input.name}
                    onChange={(e) => {
                      const newInputs = [...inputs];
                      newInputs[index].name = e.target.value;
                      setInputs(newInputs);
                    }}
                  />
                  <div className="flex items-center w-2/3">
                    <select className="border rounded p-1 text-xs mr-1 w-1/3">
                      <option>Reference</option>
                    </select>
                    <input
                      className="border rounded p-1 text-xs flex-grow"
                      placeholder="Value"
                      value={input.value}
                      onChange={(e) => {
                        const newInputs = [...inputs];
                        newInputs[index].value = e.target.value;
                        setInputs(newInputs);
                      }}
                    />
                    <button onClick={() => removeInput(index)} className="ml-1">
                      <X size={12} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
              <button onClick={addInput} className="text-blue-600 text-xs">
                + Add
              </button>
            </div>
          )}
        </div>

        <div className="mb-2">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium flex items-center">
              Prompt
              <Info size={10} className="ml-1 text-gray-400" />
            </span>
            <Users size={14} className="text-gray-400" />
          </div>
          <textarea
            className="w-full h-20 border rounded p-1 text-xs"
            defaultValue="..."
          />
        </div>

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
                <div
                  key={index}
                  className="flex justify-between items-center mb-1"
                >
                  <input
                    className="border rounded p-1 text-xs w-1/4 mr-1"
                    placeholder="Name"
                    value={output.name}
                    onChange={(e) => {
                      const newOutputs = [...outputs];
                      newOutputs[index].name = e.target.value;
                      setOutputs(newOutputs);
                    }}
                  />
                  <select
                    className="border rounded p-1 text-xs w-1/4 mr-1"
                    value={output.type}
                    onChange={(e) => {
                      const newOutputs = [...outputs];
                      newOutputs[index].type = e.target.value;
                      setOutputs(newOutputs);
                    }}
                  >
                    <option>String</option>
                    <option>Number</option>
                    <option>Boolean</option>
                  </select>
                  <input
                    className="border rounded p-1 text-xs flex-grow"
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
      </div>
    </div>
  );
};

export default LLMNodeContent;
