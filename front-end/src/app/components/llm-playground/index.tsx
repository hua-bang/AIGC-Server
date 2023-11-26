import Content from "./components/content";
import LLMSelector from "./components/llm-selector";
import UserInput from "./components/user-input";
import styles from './index.module.css'

const LLMPlayground = () => {

  return (
    <div className={styles.playground}>
      <LLMSelector className={styles.llmSelector} />
      <Content className={styles.llmContent}  />
      <UserInput className={styles.llmUserInput}  />
    </div>
  );
}

export default LLMPlayground;