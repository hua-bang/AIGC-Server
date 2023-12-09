"use client";
import { useLLMSelector } from "./hook";

export interface LLMSelectorProps {
  className?: string;
}

const LLMOptions = [
  {
    key: "open-ai",
    label: "ChatGPT",
  },
  {
    key: "wen-xin",
    label: "文心一言",
  },
];

const LLMSelector: React.FC<LLMSelectorProps> = ({ className }) => {
  const { llm, renderSelector } = useLLMSelector({ className });

  return renderSelector();
};

export default LLMSelector;
