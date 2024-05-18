"use client";
import classnames from "classnames";
import styles from "./index.module.css";
import { useState } from "react";
import { LLMItem } from "@/app/typings/llm";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export interface LLMSelectorOptions {
  className?: string;
}

const LLMOptions: Array<LLMItem> = [
  {
    key: "open-ai",
    label: "ChatGPT",
  },
  {
    key: "moon-shot",
    label: "月之暗面",
  },
];

export const useLLMSelector = (llmSelectorOptions?: LLMSelectorOptions) => {
  const [llm, setLLM] = useState<string>(LLMOptions[0]?.key as string);

  const llmInstance = LLMOptions.find((option) => option?.key === llm);

  const llmLabel = llmInstance?.label;

  const renderSelector = () => {
    return (
      <div
        className={classnames(
          llmSelectorOptions?.className,
          styles.llmSelector
        )}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center">
              {llmLabel}{" "}
              <ChevronDown size={16} className={styles.selectLLMIcon} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[100px]">
            <DropdownMenuRadioGroup value={llm} onValueChange={setLLM}>
              {LLMOptions.map((option) => (
                <DropdownMenuRadioItem key={option.key} value={option.key}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  };

  return {
    llm,
    setLLM,
    llmInstance,
    renderSelector,
  };
};
