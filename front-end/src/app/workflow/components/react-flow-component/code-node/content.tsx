import React from "react";
import { ChevronDown, MoreHorizontal, PlusCircle, X } from "lucide-react";

const CodeNodeContent = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-teal-500 rounded flex items-center justify-center">
            <code className="text-white text-xs">{"/}"}</code>
          </div>
          <span className="font-medium text-gray-700">Code</span>
        </div>
        <MoreHorizontal className="text-gray-400" />
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-600 mb-4">
          Write code to process input variables to generate return values.
        </p>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Input</span>
            <ChevronDown className="text-gray-400" />
          </div>
          <div className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
            <input
              type="text"
              value="input"
              className="bg-transparent text-sm"
              readOnly
            />
            <select className="bg-transparent text-sm text-gray-700">
              <option>Reference</option>
            </select>
            <select className="bg-transparent text-sm text-gray-400">
              <option>Please select</option>
            </select>
            <button className="text-gray-400">
              <X size={16} />
            </button>
          </div>
          <button className="mt-2 text-sm text-blue-600 font-medium flex items-center">
            <PlusCircle size={16} className="mr-1" /> Add
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Code</span>
            <button className="text-sm text-blue-600">Edit in IDE</button>
          </div>
          <div className="bg-gray-900 rounded p-4 font-mono text-sm text-gray-300">
            <pre>{`async function main({ params }: Args): Promise<Ou
  const ret = {
    "key0": params.input + params.input,
    "key1": ["hello", "world"],
    "key2": {
      "key21": "hi"
    },
  };
  
  return ret;`}</pre>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Output</span>
            <ChevronDown className="text-gray-400" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value="key0"
                className="bg-gray-50 text-sm"
                readOnly
              />
              <select className="bg-gray-50 text-sm text-gray-700">
                <option>String</option>
              </select>
              <button className="text-gray-400">
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value="key1"
                className="bg-gray-50 text-sm"
                readOnly
              />
              <select className="bg-gray-50 text-sm text-gray-700">
                <option>Array&lt;String&gt;</option>
              </select>
              <button className="text-gray-400">
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value="key2"
                className="bg-gray-50 text-sm"
                readOnly
              />
              <select className="bg-gray-50 text-sm text-gray-700">
                <option>Object</option>
              </select>
              <button className="text-gray-400">
                <X size={16} />
              </button>
            </div>
            <div className="ml-4 flex items-center space-x-2">
              <input
                type="text"
                value="key21"
                className="bg-gray-50 text-sm"
                readOnly
              />
              <select className="bg-gray-50 text-sm text-gray-700">
                <option>String</option>
              </select>
              <button className="text-gray-400">
                <X size={16} />
              </button>
            </div>
          </div>
          <button className="mt-2 text-sm text-blue-600 font-medium flex items-center">
            <PlusCircle size={16} className="mr-1" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeNodeContent;
