import { PromptItem } from "@/app/typings/prompt";
import React from "react";
import { Image } from "antd";
import styles from "./index.module.css";
import mdRenderer from "./helper/md-renderer";

const PromptRender: React.FC<PromptRenderProps> = (props) => {
  const { prompt } = props;

  const renderPromptContent = () => {
    if (typeof prompt.content === "string") {
      return mdRenderer.parse(prompt.content);
    }

    return "---";
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerImg}>
        <Image
          style={{ borderRadius: "50%" }}
          alt="logo"
          preview={false}
          width={40}
          src="https://files.oaiusercontent.com/file-NApY0rCxRGeqNC3z1Ha33WG0?se=2123-10-17T02%3A03%3A58Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Da15730bf-2048-47f4-b826-e02a67e31788.png&sig=FgYSAua12finxV6tdKL9BTJaDtHChokO77KKdMbI30U%3D"
        />
      </div>
      <div>
        <div className={styles.promptLabel}>ChatGPT</div>
        <div
          className={styles.promptContent}
          dangerouslySetInnerHTML={{
            __html: renderPromptContent(),
          }}
        ></div>
      </div>
    </div>
  );
};

export interface PromptRenderProps {
  prompt: PromptItem;
}

export default PromptRender;
