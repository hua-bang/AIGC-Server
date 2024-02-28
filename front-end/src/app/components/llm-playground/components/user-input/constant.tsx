import { ChatType } from "@/app/typings/llm";
import { BookMinus, FileImage, MessageSquareText } from "lucide-react";

interface ChatTypeItem {
  type: ChatType;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export const ChatTypeOptions: ChatTypeItem[] = [
  {
    type: ChatType.Chat,
    label: "文本回答",
    description: "Chat with the bot",
    icon: <MessageSquareText size={16} />,
  },
  {
    type: ChatType.Vision,
    label: "图片识别",
    description: "Upload an image and get a description",
    icon: <FileImage size={16} />,
  },
  {
    type: ChatType.Docs,
    label: "文档查询",
    disabled: true,
    description: "Get a document from the bot",
    icon: <BookMinus size={16} />,
  },
];
