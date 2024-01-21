"use client";
import useLayout, { useLayoutOptions } from "@/app/hooks/use-layout";
import { AppstoreOutlined, CodeOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { Chat } from "@/app/typings/chat";
import ChatItem from "@/app/components/chat-item";

export const useChatLayout = (options: UseChatLayoutOptions) => {
  const { list = [], selectChatId } = options;

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

      <div className={styles.chatList}>
        {list.map((chatItem) => (
          <ChatItem
            active={chatItem.id === selectChatId}
            key={chatItem.id}
            data={chatItem}
          />
        ))}
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

interface UseChatLayoutOptions extends useLayoutOptions {
  list?: Chat[];
  selectChatId?: string;
}

export default useChatLayout;
