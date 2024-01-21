"use client";
import useLayout, { useLayoutOptions } from "@/app/hooks/use-layout";
import {
  AppstoreOutlined,
  CodeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import { Chat } from "@/app/typings/chat";
import ChatItem from "@/app/components/chat-item";
import { message } from "antd";

export const useChatLayout = (options: UseChatLayoutOptions) => {
  const { list = [], selectChatId, onSelectChat } = options;

  const handleFeatureClick = () => {
    message.info("Coming soon");
  };

  const leftContent = (
    <div className={styles.chatMenu}>
      <div>
        <div className={styles.chatMenuHeader}>AI assistant</div>
        <div className={styles.chatDescription}>
          ChatBot is your AI assistant.
        </div>
      </div>

      <div className={styles.chatFeatures}>
        <div className={styles.chatFeaturesItem} onClick={handleFeatureClick}>
          <AppstoreOutlined />
          Topic
        </div>
        <div className={styles.chatFeaturesItem} onClick={handleFeatureClick}>
          <CodeOutlined />
          Plugin
        </div>
      </div>

      <div className={styles.chatList}>
        {list.map((chatItem) => (
          <ChatItem
            onClick={() => {
              chatItem.id && onSelectChat?.(chatItem.id);
            }}
            key={chatItem.id}
            active={chatItem.id === selectChatId}
            data={chatItem}
          />
        ))}
      </div>
    </div>
  );

  const { renderLayout, collapsed, setCollapsed } = useLayout({
    ...options,
    leftContent,
  });

  const renderMenuCollapsedIcon = () => {
    const MenuIcon = collapsed ? MenuFoldOutlined : MenuUnfoldOutlined;

    return (
      <MenuIcon
        onClick={() => {
          setCollapsed((prev) => !prev);
        }}
      />
    );
  };

  return {
    renderLayout,
    renderMenuCollapsedIcon,
  };
};

interface UseChatLayoutOptions extends useLayoutOptions {
  list?: Chat[];
  selectChatId?: string;
  onSelectChat?: (chatId: string) => void;
}

export default useChatLayout;
