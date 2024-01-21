"use client";
import useLayout, { useLayoutOptions } from "@/app/hooks/use-layout";
import {
  AppstoreOutlined,
  CodeOutlined,
  GithubOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import { Chat } from "@/app/typings/chat";
import ChatItem from "@/app/components/chat-item";
import { message } from "antd";
import React, { ReactNode, useRef } from "react";

export const useChatLayout = (options: UseChatLayoutOptions) => {
  const { list = [], selectChatId, onSelectChat } = options;

  const renderMenuCollapsedIconRef = useRef<() => ReactNode>();

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
      <div className={styles.bottomArea}>
        <div className={styles.leftContent}>
          <div className={styles.bottomIcon}>
            <SettingOutlined />
          </div>
          <div className={styles.bottomIcon}>
            <GithubOutlined />
          </div>
        </div>
        <div className={styles.rightContent}>
          <div className={styles.bottomIcon}>
            {renderMenuCollapsedIconRef.current?.()}
          </div>
        </div>
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

  renderMenuCollapsedIconRef.current = renderMenuCollapsedIcon;

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
