import { PromptItem } from "@/app/typings/prompt";
import classnames from "classnames";
import PromptRender from "../prompt-render";
import { LLMItem } from "@/app/typings/llm";
import styles from "./index.module.css";
import { Image } from "antd";

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
  const renderContent = (promptList: PromptItem[]) => {
    return (
      <>
        {promptList.map((prompt, index) => {
          return (
            <div key={index} style={{ marginBottom: 16 }}>
              <PromptRender llmInstance={llmInstance} prompt={prompt} />
            </div>
          );
        })}
        {loading && (
          <div key="loading" style={{ marginBottom: 16 }}>
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

  return (
    <div className={classnames(className)}>
      {!prompts?.length ? (
        <div className={styles.empty}>
          <div style={{ width: "100%", textAlign: "center" }}>
            <Image
              style={{ borderRadius: "35%" }}
              alt="logo"
              preview={false}
              width={120}
              src="https://files.oaiusercontent.com/file-NApY0rCxRGeqNC3z1Ha33WG0?se=2123-10-17T02%3A03%3A58Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Da15730bf-2048-47f4-b826-e02a67e31788.png&sig=FgYSAua12finxV6tdKL9BTJaDtHChokO77KKdMbI30U%3D"
            />
          </div>
          <h3>How can I help you today?</h3>
        </div>
      ) : (
        <div className={styles.contentWrapper}>{renderContent(prompts)}</div>
      )}
    </div>
  );
};

export default Content;
