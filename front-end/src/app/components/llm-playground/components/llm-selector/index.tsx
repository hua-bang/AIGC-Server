"use client";
import { Dropdown, MenuProps } from "antd";
import classnames from "classnames";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.module.css";
import { useState } from "react";

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
  const [llm, setLLM] = useState<string>(LLMOptions[0]?.key as string);

  const handleSelectLLM: MenuProps["onClick"] = (e) => {
    setLLM(e.key);
  };

  const llmLabel = LLMOptions.find((option) => option?.key === llm)?.label;

  return (
    <div className={classnames(className, styles.llmSelector)}>
      <Dropdown menu={{ items: LLMOptions, onClick: handleSelectLLM }}>
        <div className={styles.selectLLMText}>
          {llmLabel} <DownOutlined className={styles.selectLLMIcon} />
        </div>
      </Dropdown>
    </div>
  );
};

export default LLMSelector;
