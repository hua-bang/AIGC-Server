"use client";
import useLayout, { useLayoutOptions } from "@/app/hooks/use-layout";
import { AppstoreOutlined, CodeOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

export const useChatLayout = (options: useLayoutOptions) => {
  const leftContent = (
    <div className={styles.chatMenu}>
      <div>
        <div className={styles.chatMenuHeader}>AI assistant</div>
        <div className={styles.chatDescription}>
          ChatBot is your AI assistant.
        </div>
      </div>

      <div className={styles.chatFeatures}>
        <div className={styles.chatFeaturesItem}>
          <AppstoreOutlined />
          Topic
        </div>
        <div className={styles.chatFeaturesItem}>
          <CodeOutlined />
          Plugin
        </div>
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
