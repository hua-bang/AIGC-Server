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
import React, { ReactNode, useRef } from "react";
import useSetting from "@/app/hooks/use-setting";
import { useRouter } from "next/navigation";
import { getIsMobile } from "@/app/utils/mobile";
import { useToast } from "@/components/ui/use-toast"

export const useChatLayout = (options: UseChatLayoutOptions) => {
  const { list = [], selectChatId, onSelectChat } = options;

  const menuCollapsedInfoRef = useRef<ReturnType<typeof useLayout> | null>();

  const renderMenuCollapsedIconRef = useRef<() => ReactNode>();

  const router = useRouter();

  const { renderSetting } = useSetting();

  const { toast } = useToast();


  const leftContent = (
    <div className={styles.chatMenu}>
      <div>
        <div className={styles.chatMenuHeader}>AI assistant</div>
        <div className={styles.chatDescription}>
          ChatBot is your AI assistant.
        </div>
      </div>

      <div className={styles.chatFeatures}>
        <div className={styles.chatFeaturesItem} onClick={() => {
          if (getIsMobile()) {
            menuCollapsedInfoRef.current?.setCollapsed(false);
          }
          router.push("/chat/scene");
        }}>
          <AppstoreOutlined />
          Scene
        </div>
        <div className={styles.chatFeaturesItem} onClick={() => {
          toast({
            title: "Plugin Coming Soon",
            description: "Plugin is not available yet. Please wait for the next update.",
          })
        }}>
          <CodeOutlined />
          Plugin
        </div>
      </div>

      <div className={styles.chatList}>
        {list.map((chatItem) => (
          <ChatItem
            onClick={() => {
              if(!chatItem.id || !onSelectChat) {
                return;
              }

              onSelectChat?.(chatItem.id);
              
              if (getIsMobile()) {
                menuCollapsedInfoRef.current?.setCollapsed(false);
              }
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
    defaultCollapsed: !getIsMobile()
  });

  menuCollapsedInfoRef.current = {
    collapsed, 
    setCollapsed,
    renderLayout
  }

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
