import { PromptItem } from "@/app/typings/prompt";
import classnames from "classnames";
import PromptRender from "../prompt-render";
import { LLMItem } from "@/app/typings/llm";
import styles from "./index.module.css";
import { useEffect, useRef } from "react";
import { ArrowDownOutlined } from "@ant-design/icons";
import Image from "next/image";
import Bot from "@/app/asserts/images/bot.png";

interface ContentProps {
  className?: string;
  prompts?: PromptItem[];
  llmInstance?: LLMItem;
  loading?: boolean;
}

const Content: React.FC<ContentProps> = ({
  className,
  prompts,
  llmInstance,
  loading,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const renderContent = (promptList: PromptItem[]) => {
    return (
      <>
        {promptList.map((prompt, index) => {
          return (
            <div
              key={index}
              style={{ marginBottom: 16, width: "100%", overflowX: "scroll" }}
            >
              <PromptRender llmInstance={llmInstance} prompt={prompt} />
            </div>
          );
        })}
        {loading && (
          <div
            key="loading"
            style={{ marginBottom: 16, width: "100%", overflowX: "scroll" }}
          >
            <PromptRender
              llmInstance={llmInstance}
              prompt={{
                role: llmInstance?.key || "assistant",
                content: "内容生成中....",
              }}
              loading={true}
            />
          </div>
        )}
      </>
    );
  };

  const renderScrollToBottomBtn = () => {
    if (!prompts?.length) {
      return null;
    }

    return (
      <div className={styles.scrollToBottomBtn}>
        <ArrowDownOutlined
          onClick={() => {
            scrollToBottom();
          }}
        />
      </div>
    );
  };

  useEffect(() => {
    if (!prompts?.length) {
      return;
    }

    scrollToBottom();
  }, [prompts]);

  return (
    <>
      <div className={classnames(className)}>
        {!prompts?.length ? (
          <div className={styles.empty}>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Image
                style={{ borderRadius: "35%" }}
                alt="logo"
                width={120}
                height={120}
                src={Bot}
              />
            </div>
            <h3>How can I help you today?</h3>
          </div>
        ) : (
          <div className={styles.contentWrapper} ref={containerRef}>
            {renderContent(prompts)}
          </div>
        )}
        {renderScrollToBottomBtn()}
      </div>
    </>
  );
};

export default Content;
