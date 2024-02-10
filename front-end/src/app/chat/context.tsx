import React from "react";
import { Chat } from "../typings/chat";

export interface ChatConfigValue {

  chat: Chat | undefined;

  handleChatChange: (nextChat: Chat) => void;

  renderMenuCollapsedIcon?: () => JSX.Element;
}

export const ChatConfigContext = React.createContext<ChatConfigValue | null>(null);

export const useChatConfigContext = () => React.useContext(ChatConfigContext);