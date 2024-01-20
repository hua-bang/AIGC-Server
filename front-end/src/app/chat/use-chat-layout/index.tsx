"use client";
import useLayout, { useLayoutOptions } from "@/app/hooks/use-layout";
import styles from "./index.module.scss";

export const useChatLayout = (options: useLayoutOptions) => {
  const leftContent = (
    <div className={styles.chatMenu}>
      <div className={styles.chatMenuHeader}>ChatBot</div>
      <div className={styles.chatDescription}>
        ChatBot is your AI assistant.
      </div>
    </div>
  );

  const { renderLayout } = useLayout({
    ...options,
    leftContent,
  });

  return {
    renderLayout,
  };
};

export default useChatLayout;
