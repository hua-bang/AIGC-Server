import { ChatTypeOptions } from "../constant";
import { useState } from "react";
import { ChatType } from "@/app/typings/llm";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const useChatTypeSelector = () => {
  const [chatType, setChatType] = useState<ChatType>(ChatType.Chat);

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
        className="py-2 bg-white w-full rounded-md overflow-x-scroll"
        style={{ backgroundColor: "var(--white2)" }}
        value={chatType}
        onValueChange={(value) => {
          setChatType(value as ChatType);
        }}
      >
        <TabsList className="p-0" style={{ background: "var(--white2)" }}>
          {tabItems.map((tabItem) => {
            return (
              <TabsTrigger key={tabItem.key} value={tabItem.key}>
                <div className="flex items-center">
                  {tabItem.icon}
                  <div className="ml-2">{tabItem.label}</div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    );
  };

  return {
    chatType,
    setChatType,
    renderChatTypeSelector,
  };
};
