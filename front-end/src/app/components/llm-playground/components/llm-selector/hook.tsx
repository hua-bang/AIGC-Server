"use client";
import classnames from "classnames";
import { DownOutlined } from "@ant-design/icons";
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

export interface LLMSelectorOptions {
  className?: string;
}

const LLMOptions: Array<LLMItem> = [
  {
    key: "open-ai",
    label: "ChatGPT",
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
            <div>
              {llmLabel} <DownOutlined className={styles.selectLLMIcon} />
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
