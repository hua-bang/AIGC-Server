"use client";
import useLayout, { useLayoutOptions } from "@/app/hooks/use-layout";
import styles from "./index.module.scss";
import { Chat } from "@/app/typings/chat";
import ChatItem from "@/app/components/chat-item";
import React, { ReactNode, useRef } from "react";
import useSetting from "@/app/hooks/use-setting";
import { useRouter } from "next/navigation";
import { getIsMobile } from "@/app/utils/mobile";
import { useToast } from "@/components/ui/use-toast";
import { Clapperboard, Github, Menu, TerminalSquare } from "lucide-react";

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
        <div
          className={styles.chatFeaturesItem}
          onClick={() => {
            if (getIsMobile()) {
              menuCollapsedInfoRef.current?.setCollapsed(false);
            }
            router.push("/chat/scene");
          }}
        >
          <Clapperboard size={14} />
          Scene
        </div>
        <div
          className={styles.chatFeaturesItem}
          onClick={() => {
            toast({
              title: "Plugin Coming Soon",
              description:
                "Plugin is not available yet. Please wait for the next update.",
            });
          }}
        >
          <TerminalSquare size={14} />
          Plugin
        </div>
      </div>

      <div className={styles.chatList}>
        {list.map((chatItem) => (
          <ChatItem
            onClick={() => {
              if (!chatItem.id || !onSelectChat) {
                return;
              }

              onSelectChat?.(chatItem.id);

              router.push(`/chat?chatId=${chatItem.id}`);

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
            <Github
              size={16}
              strokeWidth={2}
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
    defaultCollapsed: !getIsMobile(),
  });

  menuCollapsedInfoRef.current = {
    collapsed,
    setCollapsed,
    renderLayout,
  };

  const renderMenuCollapsedIcon = () => {
    return (
      <Menu
        size={16}
        className="cursor-pointer"
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
