import { Chat } from "@/app/typings/chat";
import React from "react";
import styles from "./index.module.scss";
import { getChatTitle } from "./helper";
import classnames from "classnames";

const ChatItem: React.FC<ChatItemProps> = ({ active = false, data }) => {
  const { prompt = [] } = data;

  const title = getChatTitle(data);

  return (
    <div
      className={classnames(
        styles.chatItem,
        active ? styles.active : undefined
      )}
    >
      <div className={styles.chatItemTitle}>{title}</div>
      <div>{prompt.length} messages</div>
    </div>
  );
};

export interface ChatItemProps {
  active?: boolean;
  data: Chat;
}

export default ChatItem;
