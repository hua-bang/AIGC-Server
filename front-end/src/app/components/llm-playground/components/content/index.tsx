import { PromptItem } from "@/app/typings/prompt";
import classnames from "classnames";
import PromptRender from "../prompt-render";
import { LLMItem } from "@/app/typings/llm";
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
  const renderContent = () => {
    if (!prompts?.length) {
      return <div>no Content</div>;
    }

    return (
      <>
        {prompts.map((prompt, index) => {
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
            />
          </div>
        )}
      </>
    );
  };

  return <div className={classnames(className)}>{renderContent()}</div>;
};

export default Content;
