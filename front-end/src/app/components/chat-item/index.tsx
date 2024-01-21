import { Chat } from "@/app/typings/chat";
import React from "react";
import styles from "./index.module.scss";
import { getChatTitle } from "./helper";
import classnames from "classnames";

const ChatItem: React.FC<ChatItemProps> = ({
  active = false,
  data,
  onClick,
}) => {
  const { prompt = [] } = data;

  const title = getChatTitle(data);

  return (
    <div
      onClick={onClick}
      className={classnames(
        styles.chatItem,
        active ? styles.active : undefined
      )}
    >
      <div className={styles.chatItemTitle}>{title}</div>
      <div className={styles.chatItemTip}>{prompt.length} messages</div>
    </div>
  );
};

export interface ChatItemProps {
  active?: boolean;
  data: Chat;
  onClick?: () => void;
}

export default ChatItem;
