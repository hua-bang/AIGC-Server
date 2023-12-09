"use client";
import { useLLMSelector } from "./hook";

export interface LLMSelectorProps {
  className?: string;
}

const LLMSelector: React.FC<LLMSelectorProps> = ({ className }) => {
  const { llm, renderSelector } = useLLMSelector({ className });

  return renderSelector();
};

export default LLMSelector;
