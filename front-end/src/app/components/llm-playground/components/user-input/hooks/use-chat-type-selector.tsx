import { Tabs } from "antd";
import { ChatTypeOptions } from "../constant";
import { useState } from "react";
import { ChatType } from "@/app/typings/llm";

export const useChatTypeSelector = () => {
  const [chatType, setChatType] = useState<ChatType>(ChatType.Vision);

  const renderChatTypeSelector = () => {
    const tabItems = ChatTypeOptions.map((chatTypeItem) => {
      return {
        key: chatTypeItem.type,
        label: chatTypeItem.label,
        icon: chatTypeItem.icon,
        disabled: chatTypeItem.disabled,
      };
    });

    return (
      <Tabs
        activeKey={chatType}
        onChange={(key) => {
          setChatType(key as ChatType);
        }}
        items={tabItems}
      />
    );
  };

  return {
    chatType,
    setChatType,
    renderChatTypeSelector,
  };
};
