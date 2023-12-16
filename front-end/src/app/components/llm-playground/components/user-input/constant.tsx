import { ChatType } from "./tyings";

import {
  CommentOutlined,
  FileImageOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

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
    icon: <CommentOutlined />,
  },
  {
    type: ChatType.Vision,
    label: "图片识别",
    disabled: true,
    description: "Upload an image and get a description",
    icon: <FileImageOutlined />,
  },
  {
    type: ChatType.Docs,
    label: "文档查询",
    disabled: true,
    description: "Get a document from the bot",
    icon: <FileTextOutlined />,
  },
];
