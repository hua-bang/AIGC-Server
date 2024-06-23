import React, { useState } from "react";
import {
  ChevronDown,
  Info,
  MoreHorizontal,
  AlignJustify,
  Users,
} from "lucide-react";
import { InputParams } from "../input-params";
import OutputParams from "../output-params";

const LLMNodeContent = () => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 text-xs">
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
        <InputParams />
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
        <OutputParams />
      </div>
    </div>
  );
};

export default LLMNodeContent;
