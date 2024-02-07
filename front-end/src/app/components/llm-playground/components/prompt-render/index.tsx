import { PromptItem } from "@/app/typings/prompt";
import React, { useMemo } from "react";
import { Image } from "antd";
import styles from "./index.module.css";
import { LLMItem } from "@/app/typings/llm";
import { Markdown } from "@/app/components/markdown";
import classnames from "classnames";

const PromptRender: React.FC<PromptRenderProps> = (props) => {
  const { prompt, llmInstance, loading } = props;

  const imgArr = useMemo(() => {
    const { content } = prompt;
    if (typeof content === "string") {
      return undefined;
    }

    const res = content.reduce((acc, curr) => {
      if (curr.type === "image_url" && curr.image_url) {
        acc.push(curr.image_url.url);
      }
      return acc;
    }, [] as string[]);
    return res;
  }, [prompt]);

  const renderPromptContent = () => {
    if (typeof prompt.content === "string") {
      return prompt.content;
    }
    const content: string = prompt.content.reduce((acc, curr) => {
      if (curr.type !== "text") {
        return acc;
      }

      return `${acc} \n ${curr.text}`;
    }, "");

    return content;
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerImg}>
        {prompt.role === "user" ? (
          <div className={styles.userAvatar}>🧑‍💻</div>
        ) : (
          <Image
            style={{ borderRadius: "30%" }}
            alt="logo"
            preview={false}
            width={40}
            src={
              "https://files.oaiusercontent.com/file-NApY0rCxRGeqNC3z1Ha33WG0?se=2123-10-17T02%3A03%3A58Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Da15730bf-2048-47f4-b826-e02a67e31788.png&sig=FgYSAua12finxV6tdKL9BTJaDtHChokO77KKdMbI30U%3D"
            }
          />
        )}
      </div>
      <div style={{ maxWidth: 'calc(100% - 52px)' }}>
        <div className={styles.promptLabel}>
          {prompt.role === "user" ? "User" : llmInstance?.label}
        </div>
        <div className={styles.promptContent}>
          <div>
            {imgArr?.length ? (
              <Image.PreviewGroup>
                {imgArr.map((img) => {
                  return <Image width={200} key={img} src={img} />;
                })}
              </Image.PreviewGroup>
            ) : undefined}
          </div>

          <div
            className={classnames(
              styles.markdownWrapper,
              prompt.role === "user" ? styles.userMarkdownWrapper : undefined
            )}
          >
            <Markdown
              content={renderPromptContent() as string}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export interface PromptRenderProps {
  prompt: PromptItem;
  llmInstance?: LLMItem;
  loading?: boolean;
}

export default PromptRender;
