import { PromptItem } from "@/app/typings/prompt";
import classnames from "classnames";
interface ContentProps {
  className?: string;
  prompts?: PromptItem[];
}

const Content: React.FC<ContentProps> = ({ className, prompts }) => {
  const renderContent = () => {
    if (!prompts?.length) {
      return <div>no Content</div>;
    }
    return prompts.map((prompt, index) => {
      return <div key={index}>{prompt.content}</div>;
    });
  };

  return <div className={classnames(className)}>{renderContent()}</div>;
};

export default Content;
