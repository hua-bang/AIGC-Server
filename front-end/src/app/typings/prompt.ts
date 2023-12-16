export type ChatVisionContent = Array<{
  type: string;
  text?: string;
  image_url?: {
    url: string;
  };
}>;

export interface PromptItem {
  role: "user" | string;
  content: string | ChatVisionContent;
}
