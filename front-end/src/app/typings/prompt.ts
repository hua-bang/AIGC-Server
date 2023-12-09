export interface PromptItem {
  role: "user" | string;
  content: string | Record<string, any>;
}
