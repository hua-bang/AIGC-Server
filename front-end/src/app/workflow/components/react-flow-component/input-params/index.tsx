import React, { useState } from "react";
import { ChevronDown, ChevronUp, Info, X } from "lucide-react";
import { InputParamsValueTypeOptions } from "./constants";
import { InputParamsProps, InputParamsValueType } from "./typing";

export const InputParams: React.FC<InputParamsProps> = ({
  value = [],
  onChange,
}) => {
  const [isInputExpanded, setIsInputExpanded] = useState(true);

  const addInput = () =>
    onChange?.([
      ...(value || []),
      { name: "", value: "", type: InputParamsValueType.Reference },
    ]);
  const removeInput = (index: number) =>
    onChange?.((value || []).filter((_, i) => i !== index));

  return (
    <div className="mb-2">
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium flex items-center">
          Input
          <Info size={10} className="ml-1 text-gray-400" />
        </span>
        <div className="flex items-center">
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
          {(value || []).map((input, index) => (
            <div
              key={index}
              className="flex justify-between items-center mb-1 text-left"
            >
              <input
                className="border rounded p-1 text-xs text-left w-1/3 mr-1"
                placeholder="Name"
                value={input.name}
                onChange={(e) => {
                  const newInputs = [...(value || [])];
                  newInputs[index].name = e.target.value;
                  onChange?.(newInputs);
                }}
              />
              <div className="flex items-center w-2/3">
                <select className="border rounded p-1 text-left text-xs mr-1 w-2/3">
                  {InputParamsValueTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <input
                  className="border rounded p-1 text-xs text-left"
                  placeholder="Value"
                  value={input.value}
                  onChange={(e) => {
                    const newInputs = [...value];
                    newInputs[index].value = e.target.value;
                    onChange?.(newInputs);
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
  );
};
