import { PromptItem } from "@/app/typings/prompt";
import React, { useMemo } from "react";
import styles from "./index.module.css";
import { LLMItem } from "@/app/typings/llm";
import { Markdown } from "@/app/components/markdown";
import classnames from "classnames";
import Image from "next/image";
import Bot from "@/app/asserts/images/bot.png";

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
            width={40}
            height={40}
            src={Bot}
          />
        )}
      </div>
      <div style={{ maxWidth: "calc(100% - 52px)" }}>
        <div className={styles.promptLabel}>
          {prompt.role === "user" ? "User" : llmInstance?.label}
        </div>
        <div className={styles.promptContent}>
          <div>
            {imgArr?.length
              ? imgArr.map((img) => {
                  return <Image height={200} width={200} key={img} src={img} />;
                })
              : undefined}
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
