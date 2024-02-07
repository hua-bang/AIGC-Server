"use client";
import useLayout, { useLayoutOptions } from "@/app/hooks/use-layout";
import {
  AppstoreOutlined,
  CodeOutlined,
  GithubOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import { Chat } from "@/app/typings/chat";
import ChatItem from "@/app/components/chat-item";
import { message } from "antd";
import React, { ReactNode, useRef } from "react";
import useSetting from "@/app/hooks/use-setting";
import { getWindow } from "@/app/utils/window";

export const useChatLayout = (options: UseChatLayoutOptions) => {
  const { list = [], selectChatId, onSelectChat } = options;

  const renderMenuCollapsedIconRef = useRef<() => ReactNode>();

  const { renderSetting } = useSetting();

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
          <div className={styles.bottomIcon}>{renderSetting()}</div>
          <div className={styles.bottomIcon}>
            <GithubOutlined
              onClick={() => {
                window.open("https://github.com/hua-bang/AIGC-Server");
              }}
            />
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
    defaultCollapsed:  (getWindow()?.innerWidth || 0) > 700
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
