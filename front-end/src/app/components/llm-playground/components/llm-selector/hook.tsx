"use client";
import { Dropdown, MenuProps } from "antd";
import classnames from "classnames";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { useState } from "react";
import { LLMItem } from "@/app/typings/llm";

export interface LLMSelectorOptions {
  className?: string;
}

const LLMOptions: Array<LLMItem> = [
  {
    key: "open-ai",
    label: "ChatGPT",
  },
  {
    key: "wen-xin",
    label: "文心一言",
  },
];

export const useLLMSelector = (llmSelectorOptions?: LLMSelectorOptions) => {
  const [llm, setLLM] = useState<string>(LLMOptions[0]?.key as string);

  const handleSelectLLM: MenuProps["onClick"] = (e) => {
    setLLM(e.key);
  };

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
        <Dropdown menu={{ items: LLMOptions, onClick: handleSelectLLM }}>
          <div className={styles.selectLLMText}>
            {llmLabel} <DownOutlined className={styles.selectLLMIcon} />
          </div>
        </Dropdown>
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
